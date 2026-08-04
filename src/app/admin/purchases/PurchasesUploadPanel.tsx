"use client";

import { useState } from "react";
import SyncResultSummary, { type SyncResult } from "./SyncResultSummary";

export default function PurchasesUploadPanel({ onUploaded }: { onUploaded?: () => void }) {
  const [file, setFile]           = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError]         = useState("");
  const [result, setResult]       = useState<SyncResult | null>(null);

  async function handleUpload() {
    if (!file) return;
    setUploading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res  = await fetch("/api/admin/purchases/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Upload failed.");
      setResult(data);
      onUploaded?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-6 rounded-2xl border border-cherry-pink/30 bg-white p-6 shadow-sm">
      <div className="space-y-2">
        <p className="font-sans text-sm font-bold text-text-dark">Upload ToyyibPay report (Excel or CSV)</p>
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          className="font-sans text-sm"
        />
        <button
          type="button"
          onClick={handleUpload}
          disabled={!file || uploading}
          className="cursor-pointer rounded-xl bg-korean-red px-4 py-2 font-sans text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {uploading ? "Uploading..." : "Upload & Sync to Sheet"}
        </button>
      </div>

      {error && <p className="font-sans text-xs text-red-500">{error}</p>}
      {result && <SyncResultSummary result={result} />}
    </div>
  );
}
