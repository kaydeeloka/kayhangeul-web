"use client";

import Image from "next/image";
import Link from "next/link";
import { redirectToPayment } from "../lib/payment";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 md:px-20 py-3 bg-white/70 backdrop-blur-xl border-b border-cherry-pink/20">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="KayHangeul"
          width={180}
          height={50}
          className="h-11 w-auto object-contain"
          priority
        />
      </Link>

      <div className="hidden lg:flex space-x-8 text-xs uppercase tracking-[0.25em] font-bold font-sans">
        <Link href="/" className="hover:text-cherry-pink transition-colors">Home</Link>
        <Link href="/about" className="hover:text-cherry-pink transition-colors">About</Link>
        <Link href="/library" className="hover:text-cherry-pink transition-colors">Library</Link>
        <Link href="/gallery" className="hover:text-cherry-pink transition-colors">Gallery</Link>
        <Link href="/contact" className="hover:text-cherry-pink transition-colors">Contact</Link>
      </div>

      <button
        onClick={() => redirectToPayment(7500, "The Ultimate Pack")}
        className="bg-charcoal text-white px-7 py-2.5 rounded-full text-xs font-sans font-bold uppercase tracking-widest transition-colors hover:bg-cherry-pink hover:text-charcoal"
      >
        Beli Sekarang
      </button>
    </nav>
  );
}
