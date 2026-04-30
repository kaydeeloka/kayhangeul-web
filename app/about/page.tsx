import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 px-8 md:px-20 pb-20 bg-warm-linen">
        {/* Hero */}
        <div className="max-w-7xl mx-auto">
          <span className="font-kr text-deep-pink font-bold tracking-widest text-sm uppercase block mb-4">
            안녕하세요 — Our Story
          </span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] mb-4">
            About Us
          </h1>
          <p className="font-serif italic text-xl md:text-2xl text-korean-blue max-w-2xl">
            A love letter to the Korean language.
          </p>
        </div>

        {/* Founder — negative margin to break out of main's px padding for full-width bg */}
        <section className="-mx-8 md:-mx-20 px-8 md:px-20 py-20 mt-20 bg-light-pink">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-5/12 shrink-0">
              <div className="relative aspect-3/4 rounded-[40px] overflow-hidden -rotate-2 hover:rotate-0 transition-all duration-700 shadow-2xl border-10 border-white">
                <Image
                  src="/img/kaydee.jpg"
                  alt="Kay — Founder"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>
            <div className="w-full md:w-7/12 space-y-6">
              <span className="font-sans text-crimson-pink font-bold text-xs uppercase tracking-[0.4em]">
                Founder
              </span>
              <h2 className="font-serif italic text-5xl md:text-6xl leading-none">
                Annyeong, I&apos;m Kay.
              </h2>
              <p className="font-sans text-base leading-relaxed text-text-mid">
                Tinggal di Seoul selama 5 tahun mengajar saya satu perkara: Bahasa adalah jambatan tercantik untuk memahami jiwa sebuah negara.
              </p>
              <p className="font-sans text-base leading-relaxed text-text-mid">
                KayHangeul lahir daripada keinginan untuk membantu pengembara Malaysia bercakap dengan yakin, memahami budaya, dan merasai Seoul seperti penduduk tempatan — bukan sekadar pelancong.
              </p>
              <div className="flex gap-12 pt-4">
                <div>
                  <p className="font-sans font-black text-3xl">500+</p>
                  <p className="font-sans text-xs uppercase tracking-widest font-bold opacity-40 mt-1">Copies Sold</p>
                </div>
                <div>
                  <p className="font-sans font-black text-3xl">5.0</p>
                  <p className="font-sans text-xs uppercase tracking-widest font-bold opacity-40 mt-1">Rating</p>
                </div>
                <div>
                  <p className="font-sans font-black text-3xl">5y</p>
                  <p className="font-sans text-xs uppercase tracking-widest font-bold opacity-40 mt-1">In Seoul</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="-mx-8 md:-mx-20 px-8 md:px-20 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <span className="font-sans text-crimson-pink font-bold text-xs uppercase tracking-[0.4em] block">
              Our Mission
            </span>
            <h2 className="font-sans font-black text-4xl md:text-5xl tracking-tighter">
              Language is the bridge.
            </h2>
            <p className="font-serif italic text-xl text-text-mid leading-relaxed max-w-2xl mx-auto">
              We believe every traveller deserves to connect beyond menus and maps — to share a laugh, ask for directions, and feel at home 6,000km away.
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
