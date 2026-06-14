"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Sektion 02 — Die Künstler (Konzept C: Stacked Editorial Duo).
 *
 * Zwei alternierende Magazin-Reihen mit riesiger Outline-Index-Zahl (Parallax),
 * Portrait→Work-Crossfade bei Hover, Mini-3er-Galerie und Portfolio-CTA.
 *
 * TODO (echte Daten): Unsplash-Platzhalter durch echte Studio-Fotos ersetzen.
 */
type Artist = {
  id: string;
  index: string;
  name: string;
  specialty: string;
  quote: string;
  portrait: string;
  work: string;
  gallery: string[];
};

const U = (id: string, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const ARTISTS: Artist[] = [
  {
    id: "marco",
    index: "01",
    name: "MARCO RILEY",
    specialty: "Blackwork · Dotwork",
    quote: "10 Jahre Erfahrung. Inspiriert von Geometrie & Natur.",
    portrait: U("1500648767791-00dcc994a43e", 1000),
    work: U("1565058379802-bbe93b2f703a", 1000),
    gallery: [
      U("1611501275019-9b5cda994e8d", 400),
      U("1598371839696-5c5bb00bdc28", 400),
      U("1612459284970-e8f027596582", 400),
    ],
  },
  {
    id: "lena",
    index: "02",
    name: "LENA VOSS",
    specialty: "Fine-Line · Realism",
    quote: "Feine Linien, große Wirkung. Spezialistin für Portraits.",
    portrait: U("1438761681033-6461ffad8d80", 1000),
    work: U("1590246814883-57c511d0b7d8", 1000),
    gallery: [
      U("1604881988758-f76ad2f7aac1", 400),
      U("1611501275019-9b5cda994e8d", 400),
      U("1612459284970-e8f027596582", 400),
    ],
  },
];

export default function Kuenstler() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Reveal pro Reihe (gestaffelt)
      gsap.utils.toArray<HTMLElement>(".artist-row").forEach((row) => {
        gsap.from(row.querySelectorAll(".reveal"), {
          opacity: 0,
          y: 48,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: row,
            start: "top 78%",
          },
        });
      });

      // Outline-Index parallaxt langsam mit
      gsap.utils.toArray<HTMLElement>(".artist-index").forEach((el) => {
        gsap.to(el, {
          yPercent: -22,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="kuenstler"
      ref={rootRef}
      className="relative scroll-mt-24 bg-ink-black px-6 py-24 lg:px-16 lg:py-32"
    >
      {/* Section-Header */}
      <div className="mx-auto mb-16 max-w-[1280px] lg:mb-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-ink-neon">
          02 — Das Kollektiv
        </p>
        <h2 className="mt-4 font-display text-[clamp(2.4rem,7vw,5.5rem)] leading-[0.95]">
          DIE KÜNSTLER
        </h2>
        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-ash">
          Zwei Handschriften, ein Anspruch. Wähle den Stil, der zu dir passt —
          und den Menschen, dem du vertraust.
        </p>
      </div>

      {/* Künstler-Reihen */}
      <div className="mx-auto flex max-w-[1280px] flex-col gap-20 lg:gap-32">
        {ARTISTS.map((artist, i) => {
          const reversed = i % 2 === 1;
          return (
            <article
              key={artist.id}
              className={`artist-row relative grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                reversed ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* Portrait + Crossfade-Work */}
              <div className="reveal group relative">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[3px] bg-ink-coal">
                  {/* Portrait (SW) */}
                  <img
                    src={artist.portrait}
                    alt={`${artist.name} — Portrait`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:opacity-0"
                  />
                  {/* Werk (crossfade bei Hover) */}
                  <img
                    src={artist.work}
                    alt={`${artist.name} — Arbeit`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full scale-[1.04] object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-100 group-hover:opacity-100"
                  />
                  {/* Neon-Eckakzent */}
                  <span className="pointer-events-none absolute left-0 top-0 h-12 w-12 border-l-2 border-t-2 border-ink-neon opacity-70" />
                  <span className="pointer-events-none absolute bottom-0 right-0 h-12 w-12 border-b-2 border-r-2 border-ink-neon opacity-70" />
                  {/* Hover-Hint */}
                  <span className="pointer-events-none absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-bone/80 opacity-0 transition-opacity duration-500 group-hover:opacity-0 lg:opacity-100 lg:group-hover:opacity-0">
                    ▸ Hover für Arbeit
                  </span>
                </div>
              </div>

              {/* Text-Spalte */}
              <div className="relative">
                {/* Outline-Index */}
                <span
                  aria-hidden
                  className={`artist-index pointer-events-none absolute -top-16 select-none font-display text-[clamp(7rem,18vw,16rem)] leading-none text-transparent lg:-top-24 ${
                    reversed ? "right-0" : "left-0"
                  }`}
                  style={{ WebkitTextStroke: "1.5px rgba(255,23,68,0.22)" }}
                >
                  {artist.index}
                </span>

                <div className="relative">
                  <p className="reveal font-mono text-[11px] uppercase tracking-[0.3em] text-ink-neon">
                    {artist.specialty}
                  </p>
                  <h3 className="reveal mt-3 font-display text-[clamp(2rem,5vw,3.4rem)] leading-none">
                    {artist.name}
                  </h3>
                  <p className="reveal mt-5 max-w-md font-script text-2xl leading-snug text-ink-bone/90">
                    „{artist.quote}"
                  </p>

                  {/* Mini-Galerie */}
                  <div className="reveal mt-7 flex gap-3">
                    {artist.gallery.map((src, gi) => (
                      <a
                        key={gi}
                        href="#portfolio"
                        className="relative aspect-square w-20 overflow-hidden rounded-[3px] bg-ink-coal sm:w-24"
                        aria-label={`Arbeit von ${artist.name} ansehen`}
                      >
                        <img
                          src={src}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                      </a>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href="#portfolio"
                    className="reveal mt-8 inline-flex items-center gap-2 border-b border-ink-neon/60 pb-1 text-[12.5px] uppercase tracking-[0.14em] text-ink-bone transition-colors duration-200 hover:border-ink-neon hover:text-ink-neon"
                  >
                    {artist.name.split(" ")[0]}s Portfolio
                    <span aria-hidden>→</span>
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
