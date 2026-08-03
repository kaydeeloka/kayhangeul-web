"use client";

import Image from "next/image";

type Badge = "BEST" | "HOT" | "NEW";

interface Book {
  title: string;
  subtitle: string;
  price: number;
  badge: Badge;
  image: string;
}

const books: Book[] = [
  {
    title: "The Hangeul Pack",
    subtitle: "Complete guide to mastering Korean alphabet and pronunciation",
    price: 45,
    badge: "BEST",
    image: "/kayhangeul%20mockup.png",
  },
  {
    title: "Culture Guide",
    subtitle: "Explore Korean traditions, customs, and modern culture",
    price: 52,
    badge: "HOT",
    image: "/kayhangeul%20mockup.png",
  },
  {
    title: "Modern Slang",
    subtitle: "Learn contemporary Korean expressions and everyday phrases",
    price: 38,
    badge: "NEW",
    image: "/kayhangeul%20mockup.png",
  },
  {
    title: "Ultimate Pack",
    subtitle: "Everything you need to become fluent in Korean language",
    price: 89,
    badge: "BEST",
    image: "/kayhangeul%20mockup.png",
  },
];

export default function Library() {
  return (
    <section id="library" className="px-8 md:px-20 py-32 lg:py-0 bg-warm-linen">
      <div className="max-w-7xl mx-auto w-full">

        {/* Header */}
        <div className="flex items-start justify-between mb-12">
          <div>
            <h2 className="font-sans font-black text-5xl md:text-6xl tracking-tight">
              도서 라이브러리
            </h2>
            <p className="font-serif italic text-crimson-pink text-xl mt-2">Book Library</p>
          </div>
          <a
            href="/library"
            className="hidden sm:inline-flex items-center gap-1 border border-charcoal px-6 py-3 rounded-full text-sm font-sans font-bold hover:bg-charcoal hover:text-white transition-all duration-300 mt-3 shrink-0"
          >
            전체보기 View All →
          </a>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {books.map((book) => (
            <div
              key={book.title}
              className="bg-light-pink rounded-3xl border border-cherry-pink/40 p-4 flex flex-col gap-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 rounded-2xl overflow-hidden shrink-0">
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover"
                />
                <span className="font-sans font-black absolute top-3 left-3 bg-charcoal text-white text-[10px] px-3 py-1 rounded-full tracking-widest">
                  {book.badge}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 px-1">
                <h3 className="font-sans font-bold text-base text-text-dark leading-snug">
                  {book.title}
                </h3>
                <p className="font-sans text-sm text-text-mid leading-relaxed mt-1.5 mb-4">
                  {book.subtitle}
                </p>
                <p className="font-sans font-black text-xl text-text-dark mb-4">
                  RM {book.price}
                </p>
                <button
                  onClick={() => console.log(`Add to cart: ${book.title}`)}
                  className="mt-auto w-full bg-charcoal text-white py-3.5 rounded-xl font-sans font-bold text-sm hover:bg-cherry-pink hover:text-charcoal transition-colors duration-300 cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile view all */}
        <div className="sm:hidden mt-8 text-center">
          <a
            href="/library"
            className="border border-charcoal px-8 py-3 rounded-full font-sans font-bold text-sm inline-block hover:bg-charcoal hover:text-white transition-all"
          >
            전체보기 View All →
          </a>
        </div>

      </div>
    </section>
  );
}
