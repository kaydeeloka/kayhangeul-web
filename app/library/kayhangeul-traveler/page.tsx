import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from "next/image";
import PaymentPanel from "@/app/library/kayhangeul-traveler/PaymentPanel";

const features = [
  "50+ Frasa Harian Korea untuk situasi sebenar",
  "Panduan Sebutan Romanization yang tepat",
  "Fail Audio — dengar sebutan lokal sebenar",
  "Tips Budaya & Etika Sosial Seoul",
  "Panduan Kecemasan & Perubatan",
  "Frasa Belanja, Makan & Transport",
  "Akses Seumur Hidup + Kemaskini Percuma",
];

const highlights = [
  "Direka khas untuk pengembara Malaysia ke Korea",
  "Boleh guna offline — tiada internet diperlukan",
  "Format PDF yang cantik & mudah dibaca",
  "Sesuai untuk pemula — tiada asas diperlukan",
];

const staticReviews = [
  {
    name: "Ain, KL",
    text: "Mudah sangat guna masa di Seoul. Frasa memang kena dengan situasi sebenar.",
  },
  {
    name: "Faris, Johor",
    text: "Saya jenis cepat lupa, tapi format dia ringkas dan senang rujuk masa travel.",
  },
  {
    name: "Siti, Penang",
    text: "Audio dia membantu sebutan. Orang Korea terus faham apa saya nak cakap.",
  },
];

async function getReviewStats(): Promise<{ count: number; average: number } | null> {
  try {
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
    if (!scriptUrl) return null;
    const res = await fetch(`${scriptUrl}?action=review-stats`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data.count > 0 ? { count: data.count, average: data.average } : null;
  } catch {
    return null;
  }
}

export default async function KayHangeulTravelerPage() {
  const reviewStats = await getReviewStats();
  const ratingLabel = reviewStats
    ? `${reviewStats.average}/5`
    : "4.9/5";

  return (
    <>
      <Navbar />
      <main className="bg-warm-linen min-h-screen pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-12 items-start">

            {/* Left — Product details */}
            <div className="w-full lg:w-[60%] space-y-8">

              {/* Cover image */}
              <div className="relative rounded-3xl overflow-hidden aspect-video bg-light-pink shadow-lg">
                <Image
                  src="/img/traveler-cover.png"
                  alt="KayHangeul Traveler Pack"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-5 left-5 text-white">
                  <p className="font-sans font-black text-2xl uppercase tracking-tight">50 Frasa Korea Edisi Traveler</p>
                  <div className="flex items-center gap-2">
                    <p className="font-serif italic text-lg">KayHangeul Traveler Edition</p>
                    <p className="inline-flex items-center gap-1 rounded-full bg-black/35 px-2 py-0.5 font-sans text-xs font-semibold text-white">
                      <span>{ratingLabel}</span>
                      <span aria-hidden="true">⭐</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <span className="inline-block border border-yellow-400 bg-yellow-50 text-yellow-700 text-[11px] font-sans font-bold px-3 py-1 rounded-full">
                  Spring 2026 Edition
                </span>
                <h1 className="font-sans font-black text-4xl md:text-5xl tracking-tighter leading-tight">
                  KayHangeul Traveler Pack
                </h1>
                <p className="font-serif italic text-xl text-crimson-pink">
                  Bercakap macam lokal, dalam 5 minit.
                </p>
              </div>

              {/* Description */}
              <div className="font-sans text-base text-text-mid leading-relaxed space-y-3">
                <p>
                  Kalau anda rancang ke Korea tapi risau tak tahu cakap apa — panduan ini direka khas untuk anda. Tiada perlu belajar bertahun-tahun.
                </p>
                <p>
                  Dengan <strong className="text-text-dark">50+ frasa harian</strong> yang dipilih khas untuk situasi sebenar pengembara, anda boleh mula berkomunikasi dengan penduduk tempatan dari hari pertama.
                </p>
              </div>

              {/* What's inside */}
              <div>
                <p className="font-sans font-bold text-text-dark mb-3 flex items-center gap-2">
                  <span>📚</span> Kandungan Pakej:
                </p>
                <ul className="space-y-2">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 font-sans text-sm text-text-mid">
                      <span className="text-crimson-pink font-bold mt-0.5 shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Highlights */}
              <div className="bg-light-pink rounded-2xl p-6 border border-cherry-pink/30 space-y-3">
                <p className="font-sans font-bold text-text-dark text-sm">✨ Kenapa pilih KayHangeul?</p>
                {highlights.map((h) => (
                  <div key={h} className="flex items-start gap-2.5">
                    <span className="text-korean-blue shrink-0">→</span>
                    <p className="font-sans text-sm text-text-mid">{h}</p>
                  </div>
                ))}
              </div>

              {/* Reviews */}
              <div className="space-y-4">
                <p className="font-sans font-bold text-text-dark text-sm">💬 Review pengguna:</p>
                <div className="grid gap-3">
                  {staticReviews.map((review) => (
                    <div key={review.name} className="rounded-2xl border border-cherry-pink/20 bg-white p-4 shadow-sm">
                      <p className="font-sans text-sm text-text-mid">"{review.text}"</p>
                      <p className="font-sans text-xs font-bold text-korean-red mt-2">{review.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment buttons — mobile only (below content) */}
              <div className="lg:hidden">
                <PaymentPanel initialReviewStats={reviewStats} />
              </div>

            </div>

            {/* Right — Payment panel, desktop only, sticky */}
            <div className="hidden lg:block lg:w-[40%] lg:sticky lg:top-28">
              <div className="bg-white rounded-3xl border border-cherry-pink/30 shadow-[0_8px_40px_rgba(255,183,197,0.2)] p-8">
                <PaymentPanel initialReviewStats={reviewStats} />
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
