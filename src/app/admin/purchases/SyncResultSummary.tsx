export type SyncResult = {
  parsed: number;
  added: number;
  skipped: number;
  totalBill: number;
  totalNet: number;
  byMethod: Record<string, { count: number; bill: number; net: number }>;
};

export default function SyncResultSummary({ result }: { result: SyncResult }) {
  return (
    <div className="space-y-3 border-t border-cherry-pink/30 pt-4">
      <p className="font-sans text-sm text-text-mid">
        Parsed <strong>{result.parsed}</strong> rows — added <strong>{result.added}</strong> new,
        skipped <strong>{result.skipped}</strong> duplicate order IDs already in the sheet.
      </p>
      <p className="font-sans text-lg font-black text-korean-red">
        RM {result.totalNet.toFixed(2)} net (RM {result.totalBill.toFixed(2)} billed) in this sync
      </p>
      <div className="space-y-1">
        {Object.entries(result.byMethod).map(([method, stats]) => (
          <div key={method} className="flex items-center justify-between font-sans text-sm text-text-mid">
            <span>{method}</span>
            <span>{stats.count} · RM {stats.net.toFixed(2)} net</span>
          </div>
        ))}
      </div>
    </div>
  );
}
