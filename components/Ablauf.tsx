"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Sektion 04 — Ablauf (Konzept E: Connected Neon Path).
 *
 * Desktop: geschwungener Neon-SVG-Pfad, der sich beim Scrollen zeichnet
 * (stroke-dashoffset, scrub) und durch 6 Stationen schlängelt.
 * Mobile: robuste vertikale Timeline mit Neon-Linie.
 */
type Step = {
  n: string;
  title: string;
  desc: string;
  x: number; // % (Pfad-Station)
  y: number; // %
  side: "left" | "right";
};

const STEPS: Step[] = [
  {
    n: "01",
    title: "Anfrage",
    desc: "Schick uns deine Idee, Referenzbilder & Wunsch-Körperstelle über das Formular.",
    x: 35,
    y: 7.6,
    side: "left",
  },
  {
    n: "02",
    title: "Beratung",
    desc: "Kostenloses Beratungsgespräch — vor Ort oder per Video. Wir besprechen Design, Größe, Platzierung & Preis.",
    x: 65,
    y: 24.7,
    side: "right",
  },
  {
    n: "03",
    title: "Design",
    desc: "Dein Künstler erstellt ein individuelles Design. Anpassungen inklusive, bis du 100 % zufrieden bist.",
    x: 35,
    y: 41.8,
    side: "left",
  },
  {
    n: "04",
    title: "Termin & Anzahlung",
    desc: "Wir buchen deinen Termin. Eine Anzahlung von 50 € sichert den Slot — sie wird mit dem Endpreis verrechnet.",
    x: 65,
    y: 58.8,
    side: "right",
  },
  {
    n: "05",
    title: "Dein Tag",
    desc: "Entspannt ankommen, Kunst empfangen. Wir nehmen uns die Zeit, die dein Tattoo verdient.",
    x: 35,
    y: 75.9,
    side: "left",
  },
  {
    n: "06",
    title: "Aftercare",
    desc: "Du bekommst eine ausführliche Pflege-Anleitung & wir stehen dir bei allen Fragen zur Seite.",
    x: 65,
    y: 93.5,
    side: "right",
  },
];

const PATH_D =
  "M350 130 C350 270,650 280,650 420 C650 560,350 570,350 710 C350 850,650 860,650 1000 C650 1140,350 1150,350 1290 C350 1430,650 1440,650 1590";

export default function Ablauf() {
  const rootRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const path = pathRef.current;
      if (path) {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: prefersReduced ? 0 : len });
        if (!prefersReduced) {
          gsap.to(path, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: wrapRef.current,
              start: "top 65%",
              end: "bottom 85%",
              scrub: true,
            },
          });
        }
      }

      if (!prefersReduced) {
        gsap.utils.toArray<HTMLElement>(".ablauf-reveal").forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 26,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          });
        });
        gsap.utils.toArray<HTMLElement>(".ablauf-dot").forEach((el) => {
          gsap.from(el, {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            ease: "back.out(2)",
            scrollTrigger: { trigger: el, start: "top 85%" },
          });
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="ablauf"
      ref={rootRef}
      className="relative scroll-mt-24 bg-ink-black px-6 py-24 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-ink-neon">
            04 — Der Weg
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.4rem,7vw,5.5rem)] leading-[0.95]">
            VON DER IDEE
            <br />
            ZUM TATTOO
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-ash">
            Sechs Schritte, ein durchdachter Prozess — transparent von der
            ersten Nachricht bis zur Nachsorge.
          </p>
        </div>

        {/* ===== DESKTOP: Neon-Snake-Pfad ===== */}
        <div
          ref={wrapRef}
          className="relative mx-auto hidden w-full max-w-[920px] lg:block"
          style={{ aspectRatio: "1000 / 1720" }}
        >
          <svg
            viewBox="0 0 1000 1720"
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 h-full w-full"
            aria-hidden
          >
            {/* Track (gedimmt) */}
            <path
              d={PATH_D}
              fill="none"
              stroke="#2a2a2e"
              strokeWidth={3}
              strokeLinecap="round"
            />
            {/* Animierter Neon-Draw */}
            <path
              ref={pathRef}
              d={PATH_D}
              fill="none"
              stroke="#FF1744"
              strokeWidth={3}
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 0 6px rgba(255,23,68,.7))" }}
            />
          </svg>

          {/* Stationen (Dots + Karten), positioniert per % über dem Pfad */}
          {STEPS.map((s) => (
            <div key={s.n}>
              {/* Dot mit Nummer */}
              <div
                className="ablauf-dot absolute z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ink-neon/60 bg-ink-black font-display text-xl text-ink-neon shadow-[0_0_20px_rgba(255,23,68,0.35)]"
                style={{ left: `${s.x}%`, top: `${s.y}%` }}
              >
                {s.n}
              </div>

              {/* Karte seitlich */}
              <div
                className={`ablauf-reveal absolute top-0 w-[32%] -translate-y-1/2 ${
                  s.side === "left" ? "left-0 text-right" : "right-0 text-left"
                }`}
                style={{ top: `${s.y}%` }}
              >
                <h3 className="font-display text-2xl leading-none text-ink-bone">
                  {s.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-ash">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ===== MOBILE: Vertikale Timeline ===== */}
        <div className="relative lg:hidden">
          <span className="absolute bottom-2 left-[19px] top-2 w-px bg-gradient-to-b from-ink-neon via-ink-neon/40 to-transparent" />
          <ol className="space-y-10">
            {STEPS.map((s) => (
              <li key={s.n} className="ablauf-reveal relative pl-16">
                <span className="ablauf-dot absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-ink-neon/60 bg-ink-black font-display text-sm text-ink-neon shadow-[0_0_16px_rgba(255,23,68,0.35)]">
                  {s.n}
                </span>
                <h3 className="font-display text-2xl leading-none text-ink-bone">
                  {s.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-ash">
                  {s.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
