"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  function redirectToPayment(amount: number, product: string) {
    // TODO: connect to payment provider
    console.log(`Redirecting to payment: ${product} — RM${amount / 100}`);
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 md:px-20 py-5 bg-white/70 backdrop-blur-xl border-b border-cherry-pink/20">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="KayHangeul"
          width={160}
          height={40}
          className="h-9 w-auto object-contain"
          priority
        />
      </Link>

      <div className="hidden lg:flex space-x-10 text-[10px] uppercase tracking-[0.3em] font-bold font-sans">
        <Link href="/" className="hover:text-cherry-pink transition-colors">Home</Link>
        <Link href="/library" className="hover:text-cherry-pink transition-colors">Library</Link>
        <Link href="/gallery" className="hover:text-cherry-pink transition-colors">Gallery</Link>
      </div>

      <button
        onClick={() => redirectToPayment(7500, "The Ultimate Pack")}
        className="bg-charcoal text-white px-6 py-2.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-widest transition-colors hover:bg-cherry-pink hover:text-charcoal"
      >
        Beli Sekarang
      </button>
    </nav>
  );
}
