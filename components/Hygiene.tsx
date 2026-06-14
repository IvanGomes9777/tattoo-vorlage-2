"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Sektion 05 — Hygiene & Sicherheit (Konzept I: Manifesto-Liste).
 *
 * Große redaktionelle Nummern 01–05, Neon-Trennstrich links,
 * Outline-Index, gestaffeltes riseX-Reveal, Vertrauens-Claim.
 */
type Item = { n: string; word: string; desc: string };

const ITEMS: Item[] = [
  {
    n: "01",
    word: "Steril.",
    desc: "Vollständig sterile Einweg-Materialien — Nadeln, Tuben & Handschuhe. Einmal benutzt, dann entsorgt. Kompromisslos.",
  },
  {
    n: "02",
    word: "Geprüft.",
    desc: "Zertifizierte Hygiene nach Infektionsschutzgesetz (§ 36 IfSG) — angemeldet und dokumentiert.",
  },
  {
    n: "03",
    word: "Kontrolliert.",
    desc: "Regelmäßige Kontrollen durch das Gesundheitsamt. Transparenz statt Versprechen.",
  },
  {
    n: "04",
    word: "Rein.",
    desc: "Hochwertige, vegane Farben — EU-konform und REACH-zertifiziert. Nur zugelassene Pigmente.",
  },
  {
    n: "05",
    word: "Aufgeklärt.",
    desc: "Ausführliches Aufklärungsgespräch vor jedem Tattoo. Tätowiert wird ausschließlich ab 18 Jahren, mit gültigem Ausweis.",
  },
];

export default function Hygiene() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".manifest-row").forEach((row) => {
        gsap.from(row.querySelectorAll(".reveal"), {
          opacity: 0,
          x: -40,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: row, start: "top 85%" },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hygiene"
      ref={rootRef}
      className="relative scroll-mt-24 bg-ink-black px-6 py-24 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-ink-neon">
            05 — Vertrauen
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.4rem,7vw,5.5rem)] leading-[0.95]">
            SAUBER. SICHER.
            <br />
            SORGENFREI.
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-ash">
            Kunst entsteht auf einer Grundlage: deiner Gesundheit. Unser
            Hygiene-Manifest — fünf Punkte, kein Spielraum.
          </p>
        </div>

        {/* Manifesto-Liste */}
        <ol className="border-t border-white/10">
          {ITEMS.map((item) => (
            <li
              key={item.n}
              className="manifest-row group grid grid-cols-[auto_1fr] items-start gap-6 border-b border-white/10 py-8 lg:grid-cols-[180px_1fr] lg:gap-10 lg:py-10"
            >
              {/* Outline-Index */}
              <span
                aria-hidden
                className="reveal select-none font-display text-[clamp(3rem,9vw,7rem)] leading-none text-transparent transition-colors duration-300 group-hover:text-ink-neon/10"
                style={{ WebkitTextStroke: "1.5px rgba(255,23,68,0.45)" }}
              >
                {item.n}
              </span>

              {/* Text mit Neon-Trennstrich */}
              <div className="reveal border-l-2 border-ink-neon/50 pl-6 transition-colors duration-300 group-hover:border-ink-neon lg:pl-8">
                <h3 className="font-display text-[clamp(1.6rem,4vw,2.6rem)] leading-none text-ink-bone">
                  {item.word}
                </h3>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-ash">
                  {item.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* Claim */}
        <p className="mt-14 max-w-3xl font-script text-3xl leading-snug text-ink-bone lg:text-4xl">
          „Deine Gesundheit ist die Grundlage unserer Kunst."
        </p>
      </div>
    </section>
  );
}
