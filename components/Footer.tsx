/**
 * Footer — Quick-Links, Rechtliches, Studio-Kurzinfo, großer Wortmarken-Abschluss.
 *
 * Hinweis: Die Rechts-Links (#impressum etc.) sind Platzhalter-Anker —
 * für Impressum/Datenschutz/AGB werden noch echte Inhalte/Seiten benötigt.
 */
const QUICK = [
  { label: "Künstler", href: "#kuenstler" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Ablauf", href: "#ablauf" },
  { label: "Stimmen", href: "#stimmen" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontakt", href: "#termin" },
];

const LEGAL = [
  { label: "Impressum", href: "#impressum" },
  { label: "Datenschutz", href: "#datenschutz" },
  { label: "AGB", href: "#agb" },
  { label: "Aufklärungspflicht", href: "#aufklaerung" },
  { label: "Cookies", href: "#cookies" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink-black px-6 pt-14 lg:px-16 lg:pt-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-12 pb-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a
              href="#top"
              className="font-display text-2xl tracking-[0.08em]"
            >
              INK<span className="text-ink-neon">&amp;</span>SOUL
            </a>
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-ink-ash">
              Custom Tattoos von preisgekrönten Künstlern in Berlin-Kreuzberg.
              Deine Haut. Unsere Kunst.
            </p>
            <a
              href="https://instagram.com/inkandsoul.berlin"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-[13px] text-ink-bone transition-colors hover:text-ink-neon"
            >
              <span aria-hidden>↗</span> @inkandsoul.berlin
            </a>
          </div>

          {/* Quick-Links */}
          <nav className="lg:col-span-1" aria-label="Quick-Links">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute">
              Navigation
            </p>
            <ul className="mt-4 space-y-2.5">
              {QUICK.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-[14px] text-ink-ash transition-colors hover:text-ink-bone"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Rechtliches */}
          <nav className="lg:col-span-1" aria-label="Rechtliches">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute">
              Rechtliches
            </p>
            <ul className="mt-4 space-y-2.5">
              {LEGAL.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-[14px] text-ink-ash transition-colors hover:text-ink-bone"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Studio */}
          <div className="lg:col-span-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute">
              Studio
            </p>
            <address className="mt-4 space-y-2 text-[14px] not-italic text-ink-ash">
              <p>Oranienstraße 45<br />10969 Berlin-Kreuzberg</p>
              <p>
                <a href="tel:+493022233333" className="transition-colors hover:text-ink-bone">
                  +49 (0)30 222-3333
                </a>
              </p>
              <p>
                <a href="mailto:hello@inkandsoul.de" className="transition-colors hover:text-ink-bone">
                  hello@inkandsoul.de
                </a>
              </p>
              <p className="text-ink-mute">Di–Sa: 12:00–20:00</p>
            </address>
          </div>
        </div>

        {/* Bottom-Bar */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12.5px] text-ink-mute">
            © {year} INK &amp; SOUL Tattoo Berlin — Alle Rechte vorbehalten.
          </p>
          <p className="flex items-center gap-3 text-[12.5px] text-ink-mute">
            <span className="rounded-full border border-ink-neon/50 px-2.5 py-0.5 font-mono text-[11px] text-ink-neon">
              18+
            </span>
            Tätowieren erst ab 18 — mit gültigem Ausweis.
          </p>
        </div>

        {/* Große Wortmarke als Abschluss */}
        <div
          aria-hidden
          className="pointer-events-none select-none overflow-hidden whitespace-nowrap pb-1 text-center font-display leading-[0.85] text-transparent"
          style={{
            fontSize: "clamp(2.25rem, 15vw, 14rem)",
            WebkitTextStroke: "1px rgba(245,240,232,0.09)",
          }}
        >
          INK &amp; SOUL
        </div>
      </div>
    </footer>
  );
}
