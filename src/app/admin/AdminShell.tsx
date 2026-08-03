import Link from "next/link";
import LogoutButton from "./LogoutButton";

const navLinks = [
  { href: "/admin",           label: "Dashboard" },
  { href: "/admin/purchases", label: "Purchases" },
  { href: "/admin/reviews",   label: "Reviews" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-warm-linen px-6 py-12 md:px-20">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <nav className="flex gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl px-4 py-2 font-sans text-sm font-bold text-text-dark transition-colors hover:bg-light-pink"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <LogoutButton />
        </div>
        {children}
      </div>
    </main>
  );
}
