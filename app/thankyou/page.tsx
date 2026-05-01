import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const EBOOK_URL = process.env.NEXT_PUBLIC_EBOOK_URL ?? "";

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; status_id?: string }>;
}) {
  const { token, status_id } = await searchParams;

  const validToken = !!process.env.THANKYOU_TOKEN && token === process.env.THANKYOU_TOKEN;

  // status_id: 1=success, 2=pending, 3=fail. Default to success if no status_id (e.g. PayPal)
  const status = status_id === "2" ? "pending" : status_id === "3" ? "failed" : "success";
  const isSuccess = validToken && status === "success";

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 px-8 md:px-20 pb-20 bg-warm-linen flex items-center">
        <div className="max-w-2xl mx-auto w-full text-center space-y-10">

          {/* Icon */}
          <div className="flex justify-center">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center shadow-lg ${
              isSuccess ? "bg-light-pink" : status === "pending" ? "bg-yellow-50" : "bg-gray-100"
            }`}>
              {isSuccess && (
                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#ed155d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
              {status === "pending" && (
                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#ca8a04" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              )}
              {(status === "failed" || !validToken) && (
                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              )}
            </div>
          </div>

          {/* Success */}
          {isSuccess && (
            <>
              <div className="space-y-3">
                <span className="font-sans text-crimson-pink font-bold text-xs uppercase tracking-[0.4em] block">
                  Pembayaran Berjaya — Payment Successful
                </span>
                <h1 className="font-sans font-black text-5xl md:text-6xl tracking-tighter leading-tight">
                  Terima Kasih!
                </h1>
                <p className="font-serif italic text-xl text-korean-blue">
                  Your KayHangeul Traveler Pack is ready to download.
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-cherry-pink/30 shadow-[0_8px_40px_rgba(255,183,197,0.2)] p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-light-pink flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ed155d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="12" y1="18" x2="12" y2="12" />
                      <polyline points="9 15 12 18 15 15" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="font-sans font-black text-text-dark">KayHangeul Traveler Pack</p>
                    <p className="font-sans text-sm text-text-light">50 Frasa Korea Edisi Traveler · PDF</p>
                  </div>
                </div>

                <a
                  href={EBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-charcoal text-white py-4 rounded-2xl font-sans font-bold text-sm uppercase tracking-widest hover:bg-crimson-pink transition-colors duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download Ebook
                </a>

                <p className="font-sans text-xs text-text-light">
                  Pautan akan dibuka dalam tab baru. Simpan fail PDF ke peranti anda untuk akses offline.
                </p>
              </div>

              <div className="text-left bg-light-pink rounded-3xl p-6 border border-cherry-pink/30 space-y-3">
                <p className="font-sans font-bold text-text-dark text-sm">Langkah seterusnya:</p>
                {[
                  "Muat turun dan simpan PDF ke telefon atau laptop anda.",
                  "Buka fail audio yang disertakan untuk latih sebutan.",
                  "Guna panduan kecemasan sebelum terbang ke Seoul.",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="font-sans text-xs font-black text-crimson-pink mt-0.5 shrink-0">{i + 1}.</span>
                    <p className="font-sans text-sm text-text-mid">{step}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Pending */}
          {validToken && status === "pending" && (
            <>
              <div className="space-y-3">
                <span className="font-sans text-yellow-600 font-bold text-xs uppercase tracking-[0.4em] block">
                  Pembayaran Dalam Proses — Payment Pending
                </span>
                <h1 className="font-sans font-black text-4xl md:text-5xl tracking-tighter">
                  Tunggu Sebentar...
                </h1>
                <p className="font-serif italic text-xl text-text-mid">
                  Your payment is being processed.
                </p>
              </div>
              <div className="bg-white rounded-3xl border border-yellow-200 p-8 space-y-4">
                <p className="font-sans text-sm text-text-mid leading-relaxed">
                  Pembayaran anda sedang disahkan. Ini biasanya mengambil masa beberapa minit. Kami akan hantar pautan muat turun sebaik sahaja pembayaran disahkan.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center w-full bg-charcoal text-white py-4 rounded-2xl font-sans font-bold text-sm uppercase tracking-widest hover:bg-crimson-pink transition-colors duration-300"
                >
                  Hubungi Kami Jika Ada Masalah
                </Link>
              </div>
            </>
          )}

          {/* Failed or invalid */}
          {(status === "failed" || !validToken) && (
            <>
              <div className="space-y-3">
                <h1 className="font-sans font-black text-4xl md:text-5xl tracking-tighter">
                  {status === "failed" ? "Pembayaran Gagal" : "Halaman Tidak Sah"}
                </h1>
                <p className="font-serif italic text-xl text-text-mid">
                  {status === "failed"
                    ? "Your payment was not completed."
                    : "This page is only accessible after a completed purchase."}
                </p>
              </div>
              <div className="bg-white rounded-3xl border border-gray-200 p-8 space-y-4">
                <p className="font-sans text-sm text-text-mid leading-relaxed">
                  {status === "failed"
                    ? "Transaksi tidak berjaya. Sila cuba semula atau hubungi kami jika wang telah ditolak."
                    : "Jika anda telah membuat pembayaran dan tersesat di sini, sila hubungi kami dan kami akan hantar pautan muat turun terus ke e-mel anda."}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  {status === "failed" && (
                    <Link
                      href="/library/kayhangeul-traveler"
                      className="flex-1 flex items-center justify-center bg-charcoal text-white py-4 rounded-2xl font-sans font-bold text-sm uppercase tracking-widest hover:bg-crimson-pink transition-colors duration-300"
                    >
                      Cuba Semula
                    </Link>
                  )}
                  <Link
                    href="/contact"
                    className="flex-1 flex items-center justify-center border border-gray-200 text-text-dark py-4 rounded-2xl font-sans font-bold text-sm uppercase tracking-widest hover:border-crimson-pink hover:text-crimson-pink transition-colors duration-300"
                  >
                    Hubungi Kami
                  </Link>
                </div>
              </div>
            </>
          )}

          {/* Footer links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/library/kayhangeul-traveler" className="font-sans text-sm text-crimson-pink font-bold hover:underline">
              ← Kembali ke halaman produk
            </Link>
            {isSuccess && (
              <>
                <span className="hidden sm:block text-text-light">·</span>
                <Link href="/contact" className="font-sans text-sm text-text-light hover:text-crimson-pink transition-colors">
                  Ada masalah? Hubungi kami
                </Link>
              </>
            )}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
