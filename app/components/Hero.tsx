export default function Hero() {
  return (
    <section id="hero" className="relative px-8 md:px-20 pt-28 pb-10 overflow-hidden text-center">
      <div
        className="absolute -top-20 -left-20 w-125 h-125 -z-10 blur-[80px] opacity-50 pointer-events-none"
        style={{ background: "radial-gradient(circle, #FFB7C5 0%, rgba(255,255,255,0) 70%)" }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <span className="font-sans text-cherry-pink font-bold tracking-widest text-sm mb-6 block uppercase">
          안녕하세요 — SELAMAT DATANG
        </span>

        <h1 className="tracking-tighter mb-6 leading-[0.9]">
          <span className="font-sans font-black text-6xl md:text-[110px] uppercase">
            Bercakap Macam Lokal
          </span>
          <br />
          <span className="font-serif italic font-light text-4xl md:text-7xl text-korean-blue lowercase">
            dalam 5 minit.
          </span>
        </h1>

        <div className="max-w-2xl mx-auto space-y-6">
          <p className="font-sans text-lg md:text-xl font-medium leading-relaxed opacity-70">
            Kuasai frasa harian Korea dengan{" "}
            <span className="text-korean-red font-bold">panduan audio</span>{" "}
            yang direka khusus untuk pengembara Malaysia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="#product"
              className="bg-charcoal text-white px-12 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-cherry-pink transition-colors"
            >
              View Collections
            </a>
            <a
              href="#about"
              className="border border-black/15 bg-white/60 px-12 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors"
            >
              Our Story
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
