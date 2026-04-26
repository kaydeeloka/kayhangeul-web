"use client";

import Image from "next/image";
import Link from "next/link";

const features = [
  "50+ Frasa Harian (Hangul + Audio)",
  "Panduan Sebutan (Romanization)",
  "Tips Budaya & Etika Sosial",
  "Akses Seumur Hidup",
];

export default function Product() {

  return (
    <section id="product" className="px-8 md:px-20 py-32 lg:py-0 bg-white">
      <div className="max-w-5xl mx-auto w-full">

        {/* Card */}
        <div className="bg-hanji-cream rounded-4xl border border-deep-pink/40 p-10 md:p-14 flex flex-col lg:flex-row gap-12 shadow-[0_8px_40px_rgba(248,177,186,0.25)]">

          {/* Left: image + discount badge */}
          <div className="relative lg:w-[40%] shrink-0 min-h-70">
            <div className="absolute -top-5 -left-5 bg-korean-red text-white px-5 py-3 rounded-2xl font-black text-base z-10 shadow-md">
              33% OFF
            </div>
            <div className="relative rounded-2xl overflow-hidden h-full min-h-70">
              <Image
                src="/img/traveler-mockup.png"
                alt="The Ultimate Pack"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                loading="eager"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right: content */}
          <div className="lg:w-[60%] flex flex-col justify-between gap-5 py-1">

            {/* Header */}
            <div className="space-y-2">
              <span className="inline-block border border-yellow-400 bg-yellow-50 text-yellow-700 text-[11px] font-sans font-bold px-3 py-1 rounded-full">
                Spring 2024 Edition
              </span>
              <h2 className="font-sans font-black text-4xl tracking-tighter leading-tight">
                The Ultimate Pack
              </h2>
              <p className="font-serif italic text-lg opacity-50">Korean Traveler&apos;s Complete Guide</p>
            </div>

            {/* Description */}
            <p className="font-sans text-base leading-relaxed opacity-60">
              Satu-satunya panduan digital yang anda perlukan. Mengandungi frasa
              harian Korea, fail audio sebutan lokal, dan tips travel eksklusif Seoul.
            </p>

            {/* Features */}
            <div>
              <p className="font-sans text-sm font-bold mb-2.5 flex items-center gap-2">
                <span>📚</span> Kandungan:
              </p>
              <ul className="space-y-1.5">
                {features.map((feature) => (
                  <li key={feature} className="font-sans text-sm opacity-70 flex items-start gap-2">
                    <span className="text-cherry-pink mt-0.5 shrink-0">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Price + CTA */}
            <div className="space-y-4">
              <div className="flex items-baseline gap-3">
                <span className="font-sans text-3xl font-black text-korean-red">RM 9.99</span>
                <span className="font-sans text-base opacity-30 line-through">RM 15</span>
              </div>
              <Link
                href="/kayhangeul-traveler"
                className="w-full bg-cherry-pink text-charcoal py-4 rounded-2xl font-sans font-bold text-sm tracking-widest transition-colors duration-300 hover:bg-korean-red hover:text-white text-center block"
              >
                지금 구매하기 Buy Now →
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
