"use client";

import { useState } from "react";
import SyncResultSummary, { type SyncResult } from "./SyncResultSummary";

function toDateInput(date: Date): string {
  return date.toISOString().slice(0, 10);
}

const today = new Date();
const defaultEnd   = toDateInput(today);
const defaultStart = toDateInput(new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000));

export default function PayPalSyncPanel({ onSynced }: { onSynced?: () => void }) {
  const [startDate, setStartDate] = useState(defaultStart);
  const [endDate, setEndDate]     = useState(defaultEnd);
  const [syncing, setSyncing]     = useState(false);
  const [error, setError]         = useState("");
  const [result, setResult]       = useState<SyncResult | null>(null);

  async function handleSync() {
    setSyncing(true);
    setError("");
    setResult(null);

    try {
      const res  = await fetch("/api/admin/purchases/sync-paypal", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ startDate, endDate }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Sync failed.");
      setResult(data);
      onSynced?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sync failed.");
    } finally {
      setSyncing(false);
    }
  }

  return (
    <div className="space-y-6 rounded-2xl border border-cherry-pink/30 bg-white p-6 shadow-sm">
      <div className="space-y-2">
        <p className="font-sans text-sm font-bold text-text-dark">Sync PayPal transactions</p>
        <div className="flex flex-wrap items-end gap-3">
          <label className="flex flex-col gap-1 font-sans text-xs font-bold text-text-light">
            From
            <input
              type="date"
              value={startDate}
              max={endDate}
              onChange={(event) => setStartDate(event.target.value)}
              className="rounded-lg border border-cherry-pink/30 px-2.5 py-1.5 font-sans text-sm text-text-dark outline-none focus:border-korean-red"
            />
          </label>
          <label className="flex flex-col gap-1 font-sans text-xs font-bold text-text-light">
            To
            <input
              type="date"
              value={endDate}
              min={startDate}
              max={defaultEnd}
              onChange={(event) => setEndDate(event.target.value)}
              className="rounded-lg border border-cherry-pink/30 px-2.5 py-1.5 font-sans text-sm text-text-dark outline-none focus:border-korean-red"
            />
          </label>
          <button
            type="button"
            onClick={handleSync}
            disabled={syncing}
            className="cursor-pointer rounded-xl bg-korean-blue px-4 py-2 font-sans text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {syncing ? "Syncing..." : "Sync PayPal"}
          </button>
        </div>
        <p className="font-sans text-xs text-text-light">
          Pulls completed PayPal transactions in this date range directly from PayPal, including buyer country.
          Non-MYR amounts are converted to RM using the exchange rate at sync time.
        </p>
      </div>

      {error && <p className="font-sans text-xs text-red-500">{error}</p>}
      {result && <SyncResultSummary result={result} />}
    </div>
  );
}
