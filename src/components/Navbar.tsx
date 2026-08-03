"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/library", label: "Library" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

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

      <div className="hidden lg:flex space-x-8 text-sm uppercase tracking-[0.25em] font-bold font-sans">
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`transition-colors hover:text-crimson-pink ${pathname === href ? "text-crimson-pink" : ""}`}
          >
            {label}
          </Link>
        ))}
      </div>

      <Link
        href="/library/traveler"
        className={`px-7 py-2.5 rounded-full text-xs font-sans font-bold uppercase tracking-widest transition-colors ${
          pathname === "/library/traveler"
            ? "bg-cherry-pink text-charcoal"
            : "bg-charcoal text-white hover:bg-cherry-pink hover:text-charcoal"
        }`}
      >
        Beli Sekarang
      </Link>
    </nav>
  );
}
