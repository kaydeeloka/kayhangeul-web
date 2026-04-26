export default function Hero() {
  return (
    <section id="hero" className="relative px-8 md:px-20 pt-48 pb-20 overflow-hidden text-center">
      <div
        className="absolute -top-20 -left-20 w-[500px] h-[500px] -z-10 blur-[80px] opacity-50 pointer-events-none"
        style={{ background: "radial-gradient(circle, #FFDDE2 0%, rgba(255,255,255,0) 70%)" }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <span className="font-kr text-deep-pink font-bold tracking-widest text-sm mb-6 block uppercase">
          안녕하세요 — SELAMAT DATANG
        </span>

        <h1 className="text-6xl md:text-[110px] font-black tracking-tighter mb-10 uppercase leading-[0.85]">
          Bercakap Macam Lokal <br />
          <span className="font-serif italic font-light text-korean-blue lowercase">
            dalam 5 Minit.
          </span>
        </h1>

        <div className="max-w-2xl mx-auto space-y-10">
          <p className="text-xl md:text-2xl font-medium leading-relaxed opacity-70">
            Kuasai frasa harian Korea dengan{" "}
            <span className="text-deep-pink font-bold">panduan audio</span>{" "}
            yang direka khusus untuk pengembara Malaysia.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
            <a
              href="#product"
              className="bg-black text-white px-12 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-deep-pink transition-colors shadow-xl shadow-pink-200"
            >
              The Signature Guide
            </a>
            <a
              href="/gallery"
              className="border border-black/10 px-12 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors"
            >
              View Gallery
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
