"use client";

import Image from "next/image";

const features = [
  "50+ Frasa Harian (Hangul + Audio)",
  "Panduan Sebutan (Romanization)",
  "Tips Budaya & Etika Sosial",
  "Akses Seumur Hidup",
];

export default function Product() {
  function redirectToPayment(amount: number, product: string) {
    // TODO: connect to payment provider
    console.log(`Redirecting to payment: ${product} — RM${amount / 100}`);
  }

  return (
    <section id="product" className="px-8 md:px-20 py-32 lg:py-0 bg-white">
      <div className="max-w-7xl mx-auto w-full">
        <div className="bg-white rounded-[48px] overflow-hidden flex flex-col lg:flex-row shadow-[0_30px_60px_rgba(248,177,186,0.15)] border border-soft-pink lg:h-[min(900px,calc(100vh-5rem))]">

          {/* Product image */}
          <div className="relative lg:w-[55%] bg-soft-pink group overflow-hidden min-h-[400px] lg:min-h-0">
            <Image
              src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1500"
              alt="The Ultimate Pack"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/5" />
            <div className="absolute top-10 left-10 bg-white px-6 py-2 rounded-full font-black text-[10px] tracking-widest uppercase z-10">
              Best Seller
            </div>
          </div>

          {/* Product details */}
          <div className="lg:w-[45%] p-12 lg:p-16 flex flex-col justify-center overflow-hidden">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-[10px] font-black text-deep-pink uppercase tracking-[0.4em]">
                  Spring 2024 Edition
                </p>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-[0.9]">
                  THE <br />ULTIMATE <br />PACK.
                </h2>
              </div>

              <p className="text-xl leading-relaxed opacity-60">
                Satu-satunya panduan digital yang anda perlukan. Mengandungi 50
                frasa harian Korea, fail audio sebutan lokal, dan tips travel
                eksklusif Seoul.
              </p>

              <ul className="space-y-3 text-sm font-bold opacity-80">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-4">
                    <span className="w-2 h-2 bg-deep-pink rounded-full flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="space-y-5 pt-2">
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-black">RM 75</span>
                  <span className="text-lg opacity-30 line-through">RM 120</span>
                </div>
                <button
                  onClick={() => redirectToPayment(7500, "The Ultimate Pack")}
                  className="bg-charcoal text-white px-12 py-6 rounded-3xl font-extrabold text-sm tracking-[0.1em] uppercase cursor-pointer transition-all duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:bg-deep-pink hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(248,177,186,0.4)] w-full md:w-auto"
                >
                  Dapatkan Sekarang
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
