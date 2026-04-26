export default function Hero() {
  return (
    <section id="hero" className="relative px-8 md:px-20 pt-28 pb-10 overflow-hidden text-center">
      <div
        className="absolute -top-20 -left-20 w-[500px] h-[500px] -z-10 blur-[80px] opacity-50 pointer-events-none"
        style={{ background: "radial-gradient(circle, #FFDDE2 0%, rgba(255,255,255,0) 70%)" }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <span className="font-kr text-deep-pink font-bold tracking-widest text-sm mb-6 block uppercase">
          안녕하세요 — SELAMAT DATANG
        </span>

        <h1 className="font-display tracking-tighter mb-6 uppercase leading-[0.9]">
          <span className="text-6xl md:text-[110px]">
            Bercakap Macam Lokal
          </span>
          <br />
          <span className="font-kr font-light text-4xl md:text-6xl text-korean-blue normal-case">
            dalam 5 Minit.
          </span>
        </h1>

        <div className="max-w-2xl mx-auto space-y-6">
          <p className="font-kr text-lg md:text-xl font-medium leading-relaxed opacity-70">
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
