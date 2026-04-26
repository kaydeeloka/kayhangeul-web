"use client";

const menuLinks = [
  { label: "도서관 Library", href: "/library" },
  { label: "특가 Deals", href: "/deals" },
  { label: "고객센터 Support", href: "/support" },
  { label: "이용약관 Terms", href: "/terms" },
];

const contactLinks = [
  { label: "Email: hello@kayhangeul.com", href: "mailto:hello@kayhangeul.com" },
  { label: "Instagram", href: "#" },
  { label: "Kakao", href: "#" },
  { label: "WhatsApp", href: "#" },
];

export default function Footer() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="bg-charcoal text-white px-8 md:px-20 pt-20 pb-10 relative">

      {/* Main grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 pb-16">

        {/* Brand */}
        <div className="space-y-5">
          <h2 className="font-kr text-5xl font-bold text-white">케이한글</h2>
          <div className="space-y-1 text-sm opacity-60 leading-relaxed">
            <p className="font-kr">한국어와 한국 문화를 배울 수 있는 프리미엄 전자책 플랫폼</p>
            <p>Premium Korean language &amp; culture ebook platform</p>
          </div>
        </div>

        {/* Menu */}
        <div className="space-y-5">
          <h3 className="font-kr text-deep-pink font-bold text-sm tracking-widest">
            메뉴 Menu
          </h3>
          <ul className="space-y-3">
            {menuLinks.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="text-sm opacity-60 hover:opacity-100 hover:text-deep-pink transition-all"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-5">
          <h3 className="font-kr text-deep-pink font-bold text-sm tracking-widest">
            문의 Contact
          </h3>
          <ul className="space-y-3">
            {contactLinks.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="text-sm opacity-60 hover:opacity-100 hover:text-deep-pink transition-all"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto border-t border-white/10" />

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
        <p className="text-xs opacity-30">© 2026 KayHangeul. All rights reserved.</p>
        <div className="flex gap-6 text-xs opacity-30">
          <a href="/privacy" className="hover:opacity-100 transition-opacity">Privacy</a>
          <a href="/terms" className="hover:opacity-100 transition-opacity">Terms</a>
          <a href="/faq" className="hover:opacity-100 transition-opacity">FAQ</a>
        </div>
      </div>

      {/* Scroll to top */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-charcoal text-white flex items-center justify-center transition-all duration-300 shadow-[0_0_0_4px_rgba(255,183,197,0.5)] hover:shadow-[0_0_0_6px_rgba(255,183,197,0.6)] hover:bg-korean-red z-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>

    </footer>
  );
}
