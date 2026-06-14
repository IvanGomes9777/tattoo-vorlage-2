"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Sektion 03 — Portfolio-Galerie (Konzept A + editoriale Lightbox aus E).
 *
 * Masonry-Wand (CSS-Columns), Filter nach Stil & Künstler mit weichem
 * Fade-Up-Reflow, Lightbox mit Werk-Detail & "Ähnliches anfragen"-CTA.
 *
 * Robust: feste aspect-ratio pro Kachel (kein Layout-Shift beim Laden),
 * keine FLIP-absolute-Tricks (die brechen im Column-Layout die Positionen).
 *
 * TODO (echte Daten): /public/works/* + Web-Platzhalter gegen echte Fotos tauschen.
 */
type Artist = "Marco" | "Lena";

type Work = {
  id: string;
  src: string;
  aspect: string; // reserviert Platz -> verhindert Springen beim Laden
  style: string;
  artist: Artist;
  title: string;
  duration: string;
  desc: string;
};

const U = (id: string, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const STYLES = [
  "Alle",
  "Blackwork",
  "Dotwork",
  "Geometric",
  "Fine-Line",
  "Realism",
] as const;

const ARTISTS = ["Alle", "Marco", "Lena"] as const;

const WORKS: Work[] = [
  {
    id: "w1",
    src: "/artists/marco-work.png",
    aspect: "4 / 5",
    style: "Blackwork",
    artist: "Marco",
    title: "Geometrischer Unterarm",
    duration: "ca. 6 Std · 2 Sessions",
    desc: "Custom-Design — bold Blackwork mit feinem Dotwork-Verlauf, inspiriert von heiliger Geometrie.",
  },
  {
    id: "w2",
    src: "/works/marco-dotwork-mandala.png",
    aspect: "3 / 4",
    style: "Dotwork",
    artist: "Marco",
    title: "Dotwork-Mandala",
    duration: "ca. 5 Std",
    desc: "Dichte Stippling-Schattierung, vollständig in Punkttechnik aufgebaut.",
  },
  {
    id: "w3",
    src: U("1611501275019-9b5cda994e8d", 900),
    aspect: "1 / 1",
    style: "Geometric",
    artist: "Marco",
    title: "Sacred Geometry",
    duration: "ca. 4 Std",
    desc: "Präzise Linienführung, symmetrisches geometrisches Muster am Unterarm.",
  },
  {
    id: "w4",
    src: "/works/marco-ornamental.png",
    aspect: "4 / 5",
    style: "Blackwork",
    artist: "Marco",
    title: "Ornamental Black",
    duration: "ca. 7 Std",
    desc: "Dekoratives Blackwork mit kräftigen Flächen und bewusstem Negativraum.",
  },
  {
    id: "w5",
    src: "/works/marco-dotwork-wolf.png",
    aspect: "3 / 4",
    style: "Dotwork",
    artist: "Marco",
    title: "Wolf — Dotwork",
    duration: "ca. 6 Std",
    desc: "Black-&-Grey-Wolf in gestippelter Schattierung, weiche Übergänge.",
  },
  {
    id: "w6",
    src: "/artists/lena-work.png",
    aspect: "4 / 5",
    style: "Fine-Line",
    artist: "Lena",
    title: "Botanische Linie",
    duration: "ca. 2,5 Std",
    desc: "Filigrane Single-Needle-Botanik mit zarten, präzisen Linien.",
  },
  {
    id: "w7",
    src: U("1581299894007-aaa50297cf16", 900),
    aspect: "4 / 5",
    style: "Fine-Line",
    artist: "Lena",
    title: "Minimal-Symbol",
    duration: "ca. 1,5 Std",
    desc: "Reduziertes, minimalistisches Motiv — perfekt als erstes Tattoo.",
  },
  {
    id: "w8",
    src: U("1604881988758-f76ad2f7aac1", 900),
    aspect: "3 / 4",
    style: "Realism",
    artist: "Lena",
    title: "Rose — Realism",
    duration: "ca. 5 Std",
    desc: "Black-&-Grey-Realismus mit weicher, fotorealistischer Schattierung.",
  },
  {
    id: "w9",
    src: U("1612459284970-e8f027596582", 900),
    aspect: "1 / 1",
    style: "Fine-Line",
    artist: "Lena",
    title: "Script Lettering",
    duration: "ca. 2 Std",
    desc: "Elegante handgeschriebene Schrift in feinster Single-Needle-Technik.",
  },
  {
    id: "w10",
    src: U("1559599101-f09722fb4948", 900),
    aspect: "1 / 1",
    style: "Realism",
    artist: "Lena",
    title: "Auge — Hyperrealism",
    duration: "ca. 4 Std",
    desc: "Hyperrealistisches Auge mit fein abgestufter Black-&-Grey-Schattierung.",
  },
];

export default function Portfolio() {
  const rootRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const firstRun = useRef(true);
  const [style, setStyle] = useState<string>("Alle");
  const [artist, setArtist] = useState<string>("Alle");
  const [active, setActive] = useState<Work | null>(null);

  const visible = useMemo(
    () =>
      WORKS.filter(
        (w) =>
          (style === "Alle" || w.style === style) &&
          (artist === "Alle" || w.artist === artist)
      ),
    [style, artist]
  );

  // Scroll-Reveal beim Eintreten der Sektion (Header + Bilder gestaffelt)
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from(".portfolio-head", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 78%" },
      });
      gsap.from(".work-tile", {
        opacity: 0,
        y: 50,
        scale: 0.96,
        duration: 0.7,
        ease: "power3.out",
        stagger: { each: 0.08, from: "start" },
        scrollTrigger: { trigger: gridRef.current, start: "top 82%" },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Filterwechsel: weicher Fade-Up (nicht beim ersten Render -> sonst Konflikt mit Reveal)
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (!gridRef.current) return;
    const tiles = gridRef.current.querySelectorAll(".work-tile");
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      gsap.set(tiles, { opacity: 1, y: 0 });
      return;
    }
    gsap.fromTo(
      tiles,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.05,
        overwrite: true,
      }
    );
  }, [visible]);

  // ESC schließt Lightbox + Body-Scroll-Lock
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = active ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section
      id="portfolio"
      ref={rootRef}
      className="relative scroll-mt-24 bg-ink-black px-6 py-24 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="portfolio-head mb-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-ink-neon">
            03 — Das Archiv
          </p>
          <h2
            id="stile"
            className="mt-4 scroll-mt-24 font-display text-[clamp(2.4rem,7vw,5.5rem)] leading-[0.95]"
          >
            UNSERE WERKE
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-ash">
            Eine Wand voller Geschichten. Filtere nach Stil oder Künstler —
            klicke ein Werk für Details.
          </p>
        </div>

        {/* Filter */}
        <div className="mb-10 space-y-4">
          <FilterRow
            label="Stil"
            options={STYLES as readonly string[]}
            value={style}
            onChange={setStyle}
          />
          <FilterRow
            label="Künstler"
            options={ARTISTS as readonly string[]}
            value={artist}
            onChange={setArtist}
          />
        </div>

        {/* Thumbnail-Raster: 3 pro Reihe (Mobile) -> 4 (Desktop), Tap -> Lightbox */}
        <div
          ref={gridRef}
          className="grid grid-cols-3 gap-1.5 sm:gap-3 lg:grid-cols-4 lg:gap-4"
        >
          {visible.map((w) => (
            <button
              key={w.id}
              onClick={() => setActive(w)}
              className="work-tile group relative aspect-square overflow-hidden rounded-[3px] bg-ink-coal text-left"
            >
              <img
                src={w.src}
                alt={`${w.title} — ${w.style} von ${w.artist}`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
              {/* Hover-Overlay (nur ab sm, wo Hover existiert) */}
              <div className="absolute inset-0 hidden flex-col justify-end bg-gradient-to-t from-ink-black/90 via-ink-black/10 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:flex">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-neon">
                  {w.style}
                </span>
                <span className="mt-1 text-sm font-semibold text-ink-bone">
                  {w.title}
                </span>
                <span className="text-[12px] text-ink-ash">{w.artist}</span>
              </div>
            </button>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="py-16 text-center text-ink-ash">
            Keine Werke für diese Kombination — wähle einen anderen Filter.
          </p>
        )}
      </div>

      {/* Lightbox (editorial) */}
      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-black/90 p-4 backdrop-blur-sm"
          style={{ animation: "lbIn .25s ease" }}
          onClick={() => setActive(null)}
        >
          <div
            className="relative grid max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-[4px] border border-white/10 bg-ink-coal md:grid-cols-2"
            style={{ animation: "lbCard .35s cubic-bezier(.2,.8,.2,1)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-ink-black">
              <img
                src={active.src}
                alt={active.title}
                className="h-full max-h-[50vh] w-full object-cover md:max-h-[90vh]"
              />
            </div>
            <div className="flex flex-col justify-center gap-4 p-8 lg:p-10">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-neon">
                {active.style}
              </span>
              <h3 className="font-display text-3xl leading-none">
                {active.title}
              </h3>
              <dl className="space-y-1 text-sm text-ink-ash">
                <div className="flex gap-2">
                  <dt className="text-ink-mute">Künstler:</dt>
                  <dd className="text-ink-bone">{active.artist}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-ink-mute">Dauer:</dt>
                  <dd className="text-ink-bone">{active.duration}</dd>
                </div>
              </dl>
              <p className="text-[15px] leading-relaxed text-ink-ash">
                {active.desc}
              </p>
              <a
                href="#termin"
                onClick={() => setActive(null)}
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-[2px] bg-ink-neon px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-black transition-transform hover:-translate-y-0.5"
              >
                Ähnliches bei {active.artist} anfragen →
              </a>
            </div>
            <button
              onClick={() => setActive(null)}
              aria-label="Schließen"
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-ink-black/50 text-ink-bone transition-colors hover:text-ink-neon"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function FilterRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-2 w-16 shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute">
        {label}
      </span>
      {options.map((opt) => {
        const activeOpt = value === opt;
        return (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`rounded-[2px] border px-4 py-2 text-[11.5px] uppercase tracking-[0.12em] transition-all duration-200 ${
              activeOpt
                ? "border-ink-neon bg-ink-neon text-ink-black"
                : "border-white/15 text-ink-ash hover:border-ink-neon hover:text-ink-bone"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
