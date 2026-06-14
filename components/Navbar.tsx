"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Künstler", href: "#kuenstler" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Ablauf", href: "#ablauf" },
  { label: "Stimmen", href: "#stimmen" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontakt", href: "#termin" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-[350ms] ease-out ${
        scrolled
          ? "border-b border-white/10 bg-ink-black/80 py-3 backdrop-blur-md"
          : "border-b border-transparent bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-7 px-6 lg:px-16">
        {/* Logo */}
        <a
          href="#top"
          className="whitespace-nowrap font-display text-[21px] tracking-[0.08em]"
        >
          INK<span className="text-ink-neon">&amp;</span>SOUL
        </a>

        {/* Links */}
        <div className="hidden flex-1 items-center justify-center gap-8 text-[12px] uppercase tracking-[0.14em] text-ink-ash md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors duration-200 hover:text-ink-bone"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#termin"
          className="whitespace-nowrap rounded-[2px] border-[1.5px] border-ink-neon px-5 py-[11px] text-[11.5px] font-semibold uppercase tracking-[0.14em] text-ink-neon transition-all duration-300 hover:bg-ink-neon hover:text-ink-black hover:shadow-[0_0_24px_rgba(255,23,68,0.5)]"
        >
          Termin anfragen
        </a>
      </div>
    </nav>
  );
}
