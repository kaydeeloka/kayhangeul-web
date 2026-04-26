import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="px-8 md:px-20 py-32 bg-soft-pink relative overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-20">
        <div className="w-full md:w-5/12">
          <div className="relative aspect-3/4 bg-white rounded-[40px] overflow-hidden -rotate-3 hover:rotate-0 transition-all duration-700 shadow-2xl border-12 border-white">
            <Image
              src="/img/kaydee.jpg"
              alt="Kay — Founder of KayHangeul"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover object-top"
              priority
            />
          </div>
        </div>

        <div className="w-full md:w-7/12 space-y-8 text-left">
          <span className="text-deep-pink font-black text-xs uppercase tracking-[0.4em]">
            Founder Story
          </span>
          <h3 className="font-serif text-5xl md:text-7xl italic leading-none">
            Annyeong, <br />I&apos;m Kaydee.
          </h3>
          <p className="text-xl leading-relaxed opacity-70 font-medium">
            Tinggal di Seoul selama 5 tahun mengajar saya satu perkara: Bahasa
            adalah jambatan tercantik untuk memahami jiwa sebuah negara.
          </p>
          <div className="pt-4 flex gap-12">
            <div>
              <p className="text-3xl font-black">500+</p>
              <p className="text-[9px] uppercase tracking-widest font-bold opacity-40">Copies Sold</p>
            </div>
            <div>
              <p className="text-3xl font-black">5.0</p>
              <p className="text-[9px] uppercase tracking-widest font-bold opacity-40">Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
