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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body-Scroll-Lock + ESC-Schließen bei offenem Menü
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-[350ms] ease-out ${
          scrolled || menuOpen
            ? "border-b border-white/10 bg-ink-black/80 py-3 backdrop-blur-md"
            : "border-b border-transparent bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-7 px-6 lg:px-16">
          {/* Logo */}
          <a
            href="#top"
            onClick={() => setMenuOpen(false)}
            className="relative z-50 whitespace-nowrap font-display text-[21px] tracking-[0.08em]"
          >
            INK<span className="text-ink-neon">&amp;</span>SOUL
          </a>

          {/* Desktop-Links */}
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

          {/* Desktop-CTA */}
          <a
            href="#termin"
            className="hidden whitespace-nowrap rounded-[2px] border-[1.5px] border-ink-neon px-5 py-[11px] text-[11.5px] font-semibold uppercase tracking-[0.14em] text-ink-neon transition-all duration-300 hover:bg-ink-neon hover:text-ink-black hover:shadow-[0_0_24px_rgba(255,23,68,0.5)] md:inline-block"
          >
            Termin anfragen
          </a>

          {/* Burger (nur Mobile) */}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <span
              className={`block h-[2px] w-6 bg-ink-bone transition-all duration-300 ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-6 bg-ink-bone transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-6 bg-ink-bone transition-all duration-300 ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile-Menü-Overlay */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 flex flex-col bg-ink-black transition-opacity duration-300 md:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-1 flex-col justify-center gap-2 px-8">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`font-display text-4xl uppercase tracking-[0.02em] text-ink-bone transition-all duration-500 hover:text-ink-neon ${
                menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: menuOpen ? `${100 + i * 60}ms` : "0ms" }}
            >
              {link.label}
            </a>
          ))}

          <a
            href="#termin"
            onClick={() => setMenuOpen(false)}
            className={`mt-8 inline-block w-fit rounded-[2px] bg-ink-neon px-8 py-4 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-ink-black transition-all duration-500 ${
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{
              transitionDelay: menuOpen ? `${100 + NAV_LINKS.length * 60}ms` : "0ms",
            }}
          >
            Termin anfragen →
          </a>
        </nav>

        <div className="px-8 pb-10 text-[13px] text-ink-mute">
          <a
            href="https://instagram.com/inkandsoul.berlin"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-ink-neon"
          >
            ↗ @inkandsoul.berlin
          </a>
        </div>
      </div>
    </>
  );
}
