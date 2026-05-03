import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 px-8 md:px-20 pb-20 bg-hanji-cream">
        <div className="max-w-7xl mx-auto">
          <span className="font-kr text-deep-pink font-bold tracking-widest text-sm uppercase block mb-4">
            도서 라이브러리
          </span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] mb-16">
            Library
          </h1>
          <p className="text-xl opacity-50 font-medium">Coming soon.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
