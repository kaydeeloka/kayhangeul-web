"use client";

import { useState } from "react";

export type ReviewRow = {
  row: number;
  date: string;
  name: string;
  rating: number;
  review: string;
  status: string;
};

const STATUS_STYLES: Record<string, string> = {
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-600",
  pending:  "bg-gray-100 text-text-light",
};

export default function ReviewsModerationView({ initialReviews }: { initialReviews: ReviewRow[] }) {
  const [reviews, setReviews]   = useState(initialReviews);
  const [updatingRow, setUpdatingRow] = useState<number | null>(null);
  const [error, setError]       = useState("");

  async function moderate(row: number, status: "approved" | "rejected") {
    setUpdatingRow(row);
    setError("");

    try {
      const res = await fetch("/api/admin/reviews/moderate", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ row, status }),
      });
      if (!res.ok) throw new Error();

      setReviews((prev) => prev.map((r) => (r.row === row ? { ...r, status } : r)));
    } catch {
      setError("Failed to update review.");
    } finally {
      setUpdatingRow(null);
    }
  }

  return (
    <div className="rounded-2xl border border-cherry-pink/30 bg-white p-6 shadow-sm">
      {error && <p className="mb-4 font-sans text-xs text-red-500">{error}</p>}

      <div className="space-y-4">
        {reviews.map((r) => (
          <div key={r.row} className="rounded-xl border border-cherry-pink/20 p-4 transition-colors hover:bg-warm-linen/40">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-sans text-sm font-bold text-text-dark">
                  {r.name || "Anonymous"} <span className="font-normal text-text-light">· {r.date}</span>
                </p>
                <p className="font-sans text-xs text-yellow-600">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</p>
              </div>
              <span className={`rounded-full px-2 py-0.5 font-sans text-xs font-bold uppercase ${STATUS_STYLES[r.status] ?? "bg-gray-100 text-text-light"}`}>
                {r.status}
              </span>
            </div>
            <p className="mt-2 font-sans text-sm text-text-mid">{r.review}</p>

            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => moderate(r.row, "approved")}
                disabled={updatingRow === r.row || r.status === "approved"}
                className="cursor-pointer rounded-lg bg-korean-red px-3 py-1.5 font-sans text-xs font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                Approve
              </button>
              <button
                type="button"
                onClick={() => moderate(r.row, "rejected")}
                disabled={updatingRow === r.row || r.status === "rejected"}
                className="cursor-pointer rounded-lg border border-cherry-pink/30 px-3 py-1.5 font-sans text-xs font-bold text-text-light transition-colors hover:bg-light-pink disabled:opacity-40"
              >
                Reject
              </button>
            </div>
          </div>
        ))}

        {reviews.length === 0 && <p className="py-6 text-center font-sans text-sm text-text-light">No reviews yet.</p>}
      </div>
    </div>
  );
}
