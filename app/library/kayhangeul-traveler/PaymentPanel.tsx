"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

declare global {
  interface Window {
    grecaptcha: {
      ready(cb: () => void): void;
      execute(siteKey: string, options: { action: string }): Promise<string>;
    };
  }
}

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

const TOYYIBPAY_URL = "https://toyyibpay.com/KayHangeul-Traveler-Diskaun";
const PAYPAL_URL = "https://www.paypal.com/ncp/payment/MVQQW7DGDMQ5Q";

type ReviewStats = { count: number; average: number };

export default function PaymentPanel({
  initialReviewStats,
  initialPurchaseCount,
}: {
  initialReviewStats?: ReviewStats | null;
  initialPurchaseCount?: number | null;
}) {
  const [mounted, setMounted]                     = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedRating, setSelectedRating]       = useState(0);
  const [submitting, setSubmitting]               = useState(false);
  const [submitError, setSubmitError]             = useState("");
  const [submitted, setSubmitted]                 = useState(false);
  const [purchaseCount]                           = useState<number | null>(initialPurchaseCount ?? null);
  const [reviewStats]                             = useState<ReviewStats | null>(initialReviewStats ?? null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY || document.getElementById("recaptcha-script")) return;
    const script = document.createElement("script");
    script.id = "recaptcha-script";
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    document.head.appendChild(script);
  }, []);

  async function handleSubmit(event: { preventDefault(): void; currentTarget: HTMLFormElement }) {
    event.preventDefault();
    if (selectedRating === 0) {
      setSubmitError("Pilih rating terlebih dahulu.");
      return;
    }

    const form = event.currentTarget;

    setSubmitting(true);
    setSubmitError("");

    try {
      let recaptchaToken = "";
      if (RECAPTCHA_SITE_KEY) {
        recaptchaToken = await new Promise<string>((resolve, reject) => {
          window.grecaptcha.ready(async () => {
            try {
              const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: "submit_review" });
              resolve(token);
            } catch {
              reject(new Error("reCAPTCHA failed"));
            }
          });
        });
      }

      const name     = (form.elements.namedItem("name")     as HTMLInputElement).value;
      const location = (form.elements.namedItem("location") as HTMLInputElement).value;
      const data = {
        name:           location ? `${name}, ${location}` : name,
        rating:         selectedRating,
        review:         (form.elements.namedItem("review") as HTMLTextAreaElement).value,
        recaptchaToken,
      };

      const res = await fetch("/api/reviews", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(data),
      });

      if (!res.ok) throw new Error();

      form.reset();
      setSelectedRating(0);
      setSubmitted(true);
    } catch {
      setSubmitError("Gagal hantar review. Cuba lagi.");
    } finally {
      setSubmitting(false);
    }
  }

  function openModal() {
    setSelectedRating(0);
    setSubmitError("");
    setSubmitted(false);
    setIsReviewModalOpen(true);
  }

  return (
    <>
      <div className="space-y-3">
        <div className="flex justify-end">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-korean-red px-3 py-1 font-sans text-xs font-semibold text-white shadow-sm">
            <span aria-hidden="true">⭐</span>
            <span>
              {reviewStats && reviewStats.count > 0
                ? `${reviewStats.average}/5 (${reviewStats.count} reviews)`
                : "4.9/5 (328 reviews)"}
            </span>
          </p>
        </div>

        <div className="space-y-1">
          <p className="font-sans font-black text-3xl text-korean-red">RM 14.90</p>
          <div className="flex items-center gap-2">
            <span className="font-sans text-base text-text-light line-through">RM 29.90</span>
            <span className="rounded-full bg-korean-red px-2.5 py-0.5 text-xs font-black text-white">50% OFF</span>
          </div>
        </div>

        <p className="pt-1 font-sans text-xs font-bold uppercase tracking-widest text-text-light">Pilih kaedah pembayaran:</p>

        <Link
          href={TOYYIBPAY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full cursor-pointer items-center justify-between rounded-2xl bg-korean-blue px-6 py-4 font-sans text-sm font-bold tracking-wide text-white transition-opacity hover:opacity-90"
        >
          <span>🏦 Pay with FPX</span>
          <span className="text-xs font-normal opacity-70">Online Banking Malaysia</span>
        </Link>

        <Link
          href={PAYPAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full cursor-pointer items-center justify-between rounded-2xl bg-[#003087] px-6 py-4 font-sans text-sm font-bold tracking-wide text-white transition-opacity hover:opacity-90"
        >
          <span>🅿 Pay with PayPal</span>
          <span className="text-xs font-normal opacity-70">PayPal account</span>
        </Link>

        <Link
          href={PAYPAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full cursor-pointer items-center justify-between rounded-2xl bg-black px-6 py-4 font-sans text-sm font-bold tracking-wide text-white transition-opacity hover:opacity-80"
        >
          <span> Pay with Apple Pay</span>
          <span className="text-xs font-normal opacity-70">Apple Wallet</span>
        </Link>

        <Link
          href={PAYPAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full cursor-pointer items-center justify-between rounded-2xl bg-charcoal px-6 py-4 font-sans text-sm font-bold tracking-wide text-white transition-opacity hover:opacity-90"
        >
          <span>💳 Pay with Card</span>
          <span className="text-xs font-normal opacity-70">Visa / Mastercard</span>
        </Link>

        <p className="pt-1 text-center font-sans text-xs text-text-light">
          Semua transaksi diproses dengan selamat melalui ToyyibPay & PayPal🔒
        </p>

        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={openModal}
            className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-korean-red px-4 py-2 font-sans text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-90"
          >
            Add Review
          </button>
          <p className="text-right font-sans text-xs font-semibold text-text-light">
            {purchaseCount !== null ? `${purchaseCount.toLocaleString()} people bought this` : "people bought this"}
          </p>
        </div>
      </div>

      {mounted && isReviewModalOpen && createPortal(
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 px-4 py-6" onClick={() => setIsReviewModalOpen(false)}>
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="font-sans text-xl font-black text-text-dark">Tambah Review</h3>
                {!submitted && <p className="mt-1 font-sans text-sm text-text-light">Kongsikan pengalaman anda menggunakan KayHangeul Edisi Traveler supaya orang lain juga boleh membuat pilihan yang tepat.</p>}
              </div>
              <button
                type="button"
                onClick={() => setIsReviewModalOpen(false)}
                className="cursor-pointer rounded-md px-2 py-1 font-sans text-sm font-bold text-text-light transition-colors hover:bg-light-pink"
                aria-label="Close review modal"
              >
                ✕
              </button>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-6 text-center">
                <span className="text-5xl">🎉</span>
                <div>
                  <p className="font-sans text-lg font-black text-text-dark">Terima kasih atas review anda!</p>
                  <p className="mt-1 font-sans text-sm text-text-light">Your satisfaction is our top priority.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="cursor-pointer rounded-xl bg-korean-red px-6 py-2 font-sans text-sm font-bold text-white transition-opacity hover:opacity-90"
                >
                  Tutup
                </button>
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                required
                name="name"
                type="text"
                placeholder="Nama"
                className="w-full rounded-xl border border-cherry-pink/30 px-3 py-2 font-sans text-sm outline-none focus:border-korean-red"
              />
              <input
                name="location"
                type="text"
                placeholder="Dari mana anda? (contoh: KL, Johor, Singapore...)"
                className="w-full rounded-xl border border-cherry-pink/30 px-3 py-2 font-sans text-sm outline-none focus:border-korean-red"
              />
              <div className="rounded-xl border border-cherry-pink/30 px-3 py-2">
                <p className="mb-2 font-sans text-xs font-semibold text-text-light">Rating</p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setSelectedRating(star)}
                      aria-label={`${star} star`}
                      className="cursor-pointer text-2xl leading-none transition-transform hover:scale-110"
                    >
                      <span className={selectedRating >= star ? "text-yellow-500" : "text-gray-300"}>★</span>
                    </button>
                  ))}
                  <span className="ml-2 font-sans text-xs text-text-light">
                    {selectedRating > 0 ? `${selectedRating}/5` : "Pilih bintang"}
                  </span>
                </div>
              </div>
              <textarea
                required
                name="review"
                rows={10}
                placeholder="Tulis review anda..."
                className="w-full rounded-xl border border-cherry-pink/30 px-3 py-2 font-sans text-sm outline-none focus:border-korean-red"
              />

              {submitError && (
                <p className="font-sans text-xs text-red-500">{submitError}</p>
              )}

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="cursor-pointer rounded-xl border border-cherry-pink/30 px-4 py-2 font-sans text-sm font-bold text-text-light transition-colors hover:bg-light-pink"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="cursor-pointer rounded-xl bg-korean-red px-4 py-2 font-sans text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {submitting ? "Menghantar..." : "Submit Review"}
                </button>
              </div>
            </form>
            )}
          </div>
        </div>
      , document.body)}
    </>
  );
}
