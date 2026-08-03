type Purchase = {
  timestamp: string;
  order_id: string;
  net: number;
  name: string;
  payment_method: string;
};

export default function RecentPurchases({ purchases }: { purchases: Purchase[] }) {
  return (
    <div className="rounded-2xl border border-cherry-pink/30 bg-white p-6 shadow-sm">
      <p className="font-sans text-sm font-bold text-text-dark">Recent Purchases</p>
      <div className="mt-4 space-y-1">
        {purchases.map((p) => (
          <div key={p.order_id + p.timestamp} className="flex items-center justify-between gap-3 rounded-lg px-2 py-2 -mx-2 transition-colors hover:bg-warm-linen">
            <div className="min-w-0">
              <p className="truncate font-sans text-sm font-semibold text-text-dark">{p.name || "—"}</p>
              <p className="font-sans text-xs text-text-light">{p.timestamp} · {p.payment_method || "—"}</p>
            </div>
            <span className="shrink-0 font-sans text-sm font-bold text-korean-red">RM {p.net.toFixed(2)}</span>
          </div>
        ))}
        {purchases.length === 0 && <p className="font-sans text-sm text-text-light">No purchases yet.</p>}
      </div>
    </div>
  );
}
