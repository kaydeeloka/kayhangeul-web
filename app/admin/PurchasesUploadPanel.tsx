"use client";

import { useState } from "react";

type UploadResult = {
  parsed: number;
  added: number;
  skipped: number;
  totalRevenue: number;
  byMethod: Record<string, { count: number; revenue: number }>;
};

export default function PurchasesUploadPanel() {
  const [file, setFile]           = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError]         = useState("");
  const [result, setResult]       = useState<UploadResult | null>(null);

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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-6 rounded-2xl border border-cherry-pink/30 bg-white p-6">
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

      {result && (
        <div className="space-y-3 border-t border-cherry-pink/30 pt-4">
          <p className="font-sans text-sm text-text-mid">
            Parsed <strong>{result.parsed}</strong> rows — added <strong>{result.added}</strong> new,
            skipped <strong>{result.skipped}</strong> duplicate order IDs already in the sheet.
          </p>
          <p className="font-sans text-lg font-black text-korean-red">
            RM {result.totalRevenue.toFixed(2)} total revenue in this upload
          </p>
          <div className="space-y-1">
            {Object.entries(result.byMethod).map(([method, stats]) => (
              <div key={method} className="flex items-center justify-between font-sans text-sm text-text-mid">
                <span>{method}</span>
                <span>{stats.count} · RM {stats.revenue.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
