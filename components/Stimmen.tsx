"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Sektion 06 — Stimmen (Standard: Google-Bewertungskarten).
 *
 * Übersichts-Rating oben (G-Logo, Schnitt, Anzahl) + Karten-Grid +
 * Buttons "Bewertung abgeben" / "Alle ansehen".
 *
 * TODO (echte Daten): GOOGLE_* URLs auf das echte Google-Business-Profil setzen.
 */
const GOOGLE_REVIEW_URL = "https://search.google.com/local/writereview?placeid=DEIN_PLACE_ID";
const GOOGLE_PROFILE_URL = "https://www.google.com/maps/search/?api=1&query=INK+%26+SOUL+Tattoo+Berlin";

const RATING = 4.9;
const COUNT = 487;

type Review = {
  name: string;
  initial: string;
  color: string;
  when: string;
  text: string;
};

const REVIEWS: Review[] = [
  {
    name: "Mia K.",
    initial: "M",
    color: "#7E57C2",
    when: "vor 2 Wochen",
    text: "Mein erstes Tattoo und ich war super nervös – Lena hat mir die Angst sofort genommen. Feine Linien, mega sauber gearbeitet. Komme wieder!",
  },
  {
    name: "Tom R.",
    initial: "T",
    color: "#26A69A",
    when: "vor 1 Monat",
    text: "Marco hat aus meiner vagen Idee ein echtes Kunstwerk gemacht. Blackwork-Sleeve in zwei Sessions – jeder Termin pünktlich, alles top hygienisch.",
  },
  {
    name: "Sara L.",
    initial: "S",
    color: "#EF5350",
    when: "vor 1 Monat",
    text: "Das sauberste Studio, das ich kenne. Ausführliche Beratung, kein Verkaufsdruck. Man merkt, dass hier Profis am Werk sind.",
  },
  {
    name: "Jan B.",
    initial: "J",
    color: "#42A5F5",
    when: "vor 2 Monaten",
    text: "Faire, transparente Preise und ehrliche Beratung. Das Ergebnis übertrifft meine Erwartungen deutlich. Absolute Empfehlung.",
  },
  {
    name: "Lea M.",
    initial: "L",
    color: "#FFA726",
    when: "vor 3 Monaten",
    text: "Hell, ruhig, persönlich – genau so stelle ich mir ein gutes Studio vor. Habe direkt Termin Nummer zwei gebucht.",
  },
  {
    name: "David P.",
    initial: "D",
    color: "#66BB6A",
    when: "vor 3 Monaten",
    text: "Top Beratung zu Platzierung und Größe. Die Aftercare-Anleitung war Gold wert, Heilung lief reibungslos. Danke euch!",
  },
];

function GoogleG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34A21.99 21.99 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  );
}

function Stars({ value = 5 }: { value?: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${value} von 5 Sternen`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill={i < value ? "#FBBC04" : "#3a3a3e"}
          aria-hidden
        >
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </span>
  );
}

export default function Stimmen() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from(".review-card", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".reviews-grid", start: "top 82%" },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stimmen"
      ref={rootRef}
      className="relative scroll-mt-24 bg-ink-black px-6 py-24 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Header + Rating-Übersicht */}
        <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-ink-neon">
              06 — Stimmen
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.4rem,7vw,5.5rem)] leading-[0.95]">
              WAS KUND:INNEN SAGEN
            </h2>
          </div>

          {/* Rating-Box */}
          <div className="flex items-center gap-4 rounded-[4px] border border-white/10 bg-ink-coal px-6 py-4">
            <GoogleG className="h-9 w-9 shrink-0" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-3xl leading-none text-ink-bone">
                  {RATING.toFixed(1)}
                </span>
                <Stars value={5} />
              </div>
              <p className="mt-1 text-[13px] text-ink-ash">
                {COUNT} Google-Bewertungen
              </p>
            </div>
          </div>
        </div>

        {/* Bewertungskarten */}
        <div className="reviews-grid grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <article
              key={r.name}
              className="review-card flex flex-col rounded-[6px] border border-white/10 bg-ink-coal p-6"
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-semibold text-white"
                  style={{ backgroundColor: r.color }}
                >
                  {r.initial}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink-bone">
                    {r.name}
                  </p>
                  <p className="text-[12px] text-ink-mute">{r.when}</p>
                </div>
                <GoogleG className="h-5 w-5 shrink-0" />
              </div>
              <div className="mt-3">
                <Stars value={5} />
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-ash">
                {r.text}
              </p>
            </article>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-[2px] bg-ink-neon px-7 py-4 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-ink-black transition-transform duration-200 hover:-translate-y-0.5"
          >
            <GoogleG className="h-5 w-5" />
            Bewertung abgeben
          </a>
          <a
            href={GOOGLE_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-[2px] border border-white/20 px-7 py-4 text-[12.5px] uppercase tracking-[0.14em] text-ink-bone transition-colors duration-200 hover:border-ink-neon hover:text-ink-neon"
          >
            Alle Bewertungen ansehen →
          </a>
        </div>
      </div>
    </section>
  );
}
