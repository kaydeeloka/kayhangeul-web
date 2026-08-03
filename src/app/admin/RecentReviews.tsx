type Review = {
  row: number;
  date: string;
  name: string;
  rating: number;
  status: string;
};

const STATUS_STYLES: Record<string, string> = {
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-600",
  pending:  "bg-gray-100 text-text-light",
};

export default function RecentReviews({ reviews }: { reviews: Review[] }) {
  return (
    <div className="rounded-2xl border border-cherry-pink/30 bg-white p-6 shadow-sm">
      <p className="font-sans text-sm font-bold text-text-dark">Recent Reviews</p>
      <div className="mt-4 space-y-1">
        {reviews.map((r) => (
          <div key={r.row} className="-mx-2 flex items-center justify-between gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-warm-linen">
            <div className="min-w-0">
              <p className="truncate font-sans text-sm font-semibold text-text-dark">{r.name || "Anonymous"}</p>
              <p className="font-sans text-xs text-yellow-600">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</p>
            </div>
            <span className={`shrink-0 rounded-full px-2 py-0.5 font-sans text-xs font-bold uppercase ${STATUS_STYLES[r.status] ?? "bg-gray-100 text-text-light"}`}>
              {r.status}
            </span>
          </div>
        ))}
        {reviews.length === 0 && <p className="font-sans text-sm text-text-light">No reviews yet.</p>}
      </div>
    </div>
  );
}
