"use client";

import Link from "next/link";

export default function Navbar() {
  function redirectToPayment(amount: number, product: string) {
    // TODO: connect to payment provider
    console.log(`Redirecting to payment: ${product} — RM${amount / 100}`);
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 md:px-20 py-6 bg-white/70 backdrop-blur-xl border-b border-pink-100">
      <div className="text-xl font-black tracking-tighter uppercase">
        <Link href="/">
          KAYHANGEUL{" "}
          <span className="text-xs align-top text-deep-pink">●</span>
        </Link>
      </div>

      <div className="hidden lg:flex space-x-10 text-[10px] uppercase tracking-[0.3em] font-extrabold">
        <Link href="/" className="hover:text-deep-pink transition-colors">Home</Link>
        <Link href="/library" className="hover:text-deep-pink transition-colors">Library</Link>
        <Link href="/gallery" className="hover:text-deep-pink transition-colors">Gallery</Link>
      </div>

      <button
        onClick={() => redirectToPayment(7500, "The Ultimate Pack")}
        className="bg-black text-white px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors hover:bg-deep-pink"
      >
        Beli Sekarang
      </button>
    </nav>
  );
}
