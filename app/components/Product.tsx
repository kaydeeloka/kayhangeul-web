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
      <div className="max-w-5xl mx-auto w-full">

        {/* Card */}
        <div className="bg-hanji-cream rounded-[2rem] border border-deep-pink/40 p-8 md:p-10 flex flex-col lg:flex-row gap-10 shadow-[0_8px_40px_rgba(248,177,186,0.25)]">

          {/* Left: image + discount badge */}
          <div className="relative lg:w-[40%] flex-shrink-0 min-h-[280px]">
            <div className="absolute -top-4 -left-4 bg-korean-red text-white px-4 py-2 rounded-xl font-black text-sm z-10 shadow-md">
              38% OFF
            </div>
            <div className="relative rounded-2xl overflow-hidden h-full min-h-[280px]">
              <Image
                src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1500"
                alt="The Ultimate Pack"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right: content */}
          <div className="lg:w-[60%] flex flex-col justify-between gap-5 py-1">

            {/* Header */}
            <div className="space-y-2">
              <span className="inline-block border border-yellow-400 bg-yellow-50 text-yellow-700 text-[11px] font-bold px-3 py-1 rounded-full">
                Spring 2024 Edition
              </span>
              <h2 className="text-4xl font-black tracking-tighter leading-tight">
                The Ultimate Pack
              </h2>
              <p className="text-sm opacity-50 font-medium">Korean Traveler&apos;s Complete Guide</p>
            </div>

            {/* Description */}
            <p className="text-base leading-relaxed opacity-60">
              Satu-satunya panduan digital yang anda perlukan. Mengandungi frasa
              harian Korea, fail audio sebutan lokal, dan tips travel eksklusif Seoul.
            </p>

            {/* Features */}
            <div>
              <p className="text-sm font-bold mb-2.5 flex items-center gap-2">
                <span>📚</span> Kandungan:
              </p>
              <ul className="space-y-1.5">
                {features.map((feature) => (
                  <li key={feature} className="text-sm opacity-70 flex items-start gap-2">
                    <span className="text-deep-pink mt-0.5 flex-shrink-0">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Price + CTA */}
            <div className="space-y-4">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-korean-red">RM 75</span>
                <span className="text-base opacity-30 line-through">RM 120</span>
              </div>
              <button
                onClick={() => redirectToPayment(7500, "The Ultimate Pack")}
                className="w-full bg-deep-pink text-white py-4 rounded-2xl font-bold text-sm tracking-widest transition-colors duration-300 hover:bg-korean-red cursor-pointer"
              >
                지금 구매하기 Buy Now →
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
