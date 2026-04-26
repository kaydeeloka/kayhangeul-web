import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

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

const TOYYIBPAY_URL = "https://toyyibpay.com/KayHangeul-Traveler-Diskaun";
const PAYPAL_URL = "https://www.paypal.com/ncp/payment/MVQQW7DGDMQ5Q";

function PaymentPanel() {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <p className="font-sans font-black text-3xl text-korean-red">RM 9.99</p>
        <div className="flex items-center gap-2">
          <span className="font-sans text-base text-text-light line-through">RM 15</span>
          <span className="bg-korean-red text-white text-xs font-black px-2.5 py-0.5 rounded-full">33% OFF</span>
        </div>
      </div>

      <p className="font-sans text-xs font-bold uppercase tracking-widest text-text-light pt-1">Pilih kaedah pembayaran:</p>

      <Link
        href={TOYYIBPAY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between w-full bg-korean-blue text-white px-6 py-4 rounded-2xl font-sans font-bold text-sm tracking-wide transition-opacity hover:opacity-90"
      >
        <span>🏦 Pay with FPX</span>
        <span className="text-xs font-normal opacity-70">Online Banking Malaysia</span>
      </Link>

      <Link
        href={PAYPAL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between w-full bg-[#003087] text-white px-6 py-4 rounded-2xl font-sans font-bold text-sm tracking-wide transition-opacity hover:opacity-90"
      >
        <span>🅿 Pay with PayPal</span>
        <span className="text-xs font-normal opacity-70">PayPal account</span>
      </Link>

      <Link
        href={PAYPAL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between w-full bg-black text-white px-6 py-4 rounded-2xl font-sans font-bold text-sm tracking-wide transition-opacity hover:opacity-80"
      >
        <span> Pay with Apple Pay</span>
        <span className="text-xs font-normal opacity-70">Apple Wallet</span>
      </Link>

      <Link
        href={PAYPAL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between w-full bg-charcoal text-white px-6 py-4 rounded-2xl font-sans font-bold text-sm tracking-wide transition-opacity hover:opacity-90"
      >
        <span>💳 Pay with Card</span>
        <span className="text-xs font-normal opacity-70">Visa / Mastercard</span>
      </Link>

      <p className="font-sans text-xs text-text-light text-center pt-1">
        Semua transaksi diproses dengan selamat melalui ToyyibPay & PayPal🔒
      </p>
    </div>
  );
}

export default function KayHangeulTravelerPage() {
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
                <img
                  src="/img/traveler-cover.png"
                  alt="KayHangeul Traveler Pack"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-5 left-5 text-white">
                  <p className="font-sans font-black text-2xl uppercase tracking-tight">The Ultimate Pack</p>
                  <p className="font-serif italic text-lg">KayHangeul Traveler Edition</p>
                </div>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <span className="inline-block border border-yellow-400 bg-yellow-50 text-yellow-700 text-[11px] font-sans font-bold px-3 py-1 rounded-full">
                  Spring 2024 Edition
                </span>
                <h1 className="font-sans font-black text-4xl md:text-5xl tracking-tighter leading-tight">
                  KayHangeul Traveler Pack
                </h1>
                <p className="font-serif italic text-xl text-cherry-pink">
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
                      <span className="text-cherry-pink font-bold mt-0.5 shrink-0">✓</span>
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

              {/* Payment buttons — mobile only (below content) */}
              <div className="lg:hidden">
                <PaymentPanel />
              </div>

            </div>

            {/* Right — Payment panel, desktop only, sticky */}
            <div className="hidden lg:block lg:w-[40%] lg:sticky lg:top-28">
              <div className="bg-white rounded-3xl border border-cherry-pink/30 shadow-[0_8px_40px_rgba(255,183,197,0.2)] p-8">
                <PaymentPanel />
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
