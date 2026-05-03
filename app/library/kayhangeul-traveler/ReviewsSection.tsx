"use client";

import { useState } from "react";

export type Review = { name: string; rating: number; review: string; date?: string };

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= rating ? "text-yellow-400" : "text-gray-200"}>★</span>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="rounded-2xl border border-cherry-pink/20 bg-white p-4 shadow-sm space-y-2">
      <div className="flex items-center justify-between">
        <StarRating rating={review.rating} />
        {review.date && <p className="font-sans text-xs text-text-light">{review.date}</p>}
      </div>
      <p className="font-sans text-sm text-text-mid">"{review.review}"</p>
      <p className="font-sans text-xs font-bold text-korean-red">{review.name}</p>
    </div>
  );
}

export default function ReviewsSection({ reviews }: { reviews: Review[] }) {
  const [open, setOpen] = useState(false);

  const preview = reviews.slice(0, 5);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-sans font-bold text-text-dark text-sm">Review pengguna:</p>
        {reviews.length > 5 && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="font-sans text-xs font-bold text-crimson-pink hover:underline cursor-pointer"
          >
            Lihat semua {reviews.length} review →
          </button>
        )}
      </div>

      <div className="grid gap-3">
        {preview.length > 0 ? (
          preview.map((r, i) => <ReviewCard key={i} review={r} />)
        ) : (
          <p className="font-sans text-sm text-text-light italic">Belum ada review. Jadilah yang pertama!</p>
        )}
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl flex flex-col max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-cherry-pink/20 shrink-0">
              <div>
                <h3 className="font-sans font-black text-lg text-text-dark">Semua Review</h3>
                <p className="font-sans text-xs text-text-light mt-0.5">{reviews.length} ulasan daripada pembeli</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="cursor-pointer rounded-xl px-3 py-1.5 font-sans text-sm font-bold text-text-light hover:bg-light-pink transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Scrollable list */}
            <div className="overflow-y-auto px-6 py-4 space-y-3">
              {reviews.map((r, i) => <ReviewCard key={i} review={r} />)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
