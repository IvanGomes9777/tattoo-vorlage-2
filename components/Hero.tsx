"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/**
 * Video-First Hero (Konzept D).
 *
 * Das <video> spielt – sobald eine echte Datei unter /public/hero.mp4 liegt –
 * einen stummen Loop ab (Nadel auf Haut, frische Tinte, Studio-Vibe).
 * Solange noch keine Datei existiert, zeigt der Browser automatisch den
 * Poster-Frame (Unsplash-Platzhalter) – die Sektion sieht also sofort fertig aus.
 *
 * TODO (echte Daten): /public/hero.mp4 (+ optional /public/hero.webm) hinterlegen.
 */
const HERO_POSTER =
  "https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?auto=format&fit=crop&w=1920&q=80";

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [hasAudio, setHasAudio] = useState(false);

  // GSAP: gestaffelter Mask-Reveal des Claims
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Reduced Motion: Video pausieren, nur Poster-Standbild zeigen
    if (prefersReduced) {
      videoRef.current?.pause();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-kicker", { opacity: 0, y: 14, duration: 0.6, delay: 0.25 })
        .from(
          ".hero-line-inner",
          { yPercent: 110, duration: 0.95, stagger: 0.12 },
          "-=0.25"
        )
        .from(".hero-sub", { opacity: 0, y: 18, duration: 0.7 }, "-=0.5")
        .from(
          ".hero-cta",
          { opacity: 0, y: 18, duration: 0.6, stagger: 0.1 },
          "-=0.45"
        )
        .from(".hero-hint", { opacity: 0, duration: 0.6 }, "-=0.2");
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !muted;
    v.muted = next;
    setMuted(next);
    if (!next) v.play().catch(() => undefined);
  };

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative h-screen min-h-[680px] w-full overflow-hidden bg-ink-black"
    >
      {/* === Video / Poster-Layer (Ken-Burns) === */}
      <div className="absolute inset-0 animate-kenburns">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          poster={HERO_POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => {
            // Audiospur vorhanden? -> Sound-Toggle anzeigen
            const v = videoRef.current as HTMLVideoElement & {
              mozHasAudio?: boolean;
              webkitAudioDecodedByteCount?: number;
            };
            if (!v) return;
            const audible =
              Boolean(v.mozHasAudio) ||
              Boolean(v.webkitAudioDecodedByteCount) ||
              // @ts-expect-error – nicht in allen TS-libs typisiert
              Boolean(v.audioTracks && v.audioTracks.length);
            setHasAudio(audible);
          }}
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* === Neon-Glow (radial, pulsierend) === */}
      <div
        className="pointer-events-none absolute inset-0 animate-glowpulse"
        style={{
          background:
            "radial-gradient(120% 90% at 80% 6%, rgba(255,23,68,.32), transparent 52%)",
        }}
      />

      {/* === Dunkle Vignette / Lesbarkeits-Gradient === */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,10,.68) 0%, rgba(10,10,10,.20) 32%, rgba(10,10,10,.55) 68%, #0A0A0A 100%)",
        }}
      />

      {/* === Zentrierter Content === */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
        <p className="hero-kicker font-mono text-[11px] uppercase tracking-[0.34em] text-ink-ash sm:text-[12px]">
          Custom Tattoos · Berlin-Kreuzberg
        </p>

        <h1 className="mt-5 font-display leading-[0.92] tracking-[-0.01em]">
          <span className="block overflow-hidden">
            <span className="hero-line-inner block text-[clamp(2.75rem,11vw,8rem)]">
              DEINE HAUT.
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-line-inner block text-[clamp(2.75rem,11vw,8rem)]">
              UNSERE <span className="text-ink-neon">KUNST.</span>
            </span>
          </span>
        </h1>

        <p className="hero-sub mt-6 max-w-xl text-[15px] leading-relaxed text-ink-ash sm:text-base">
          Custom Tattoos von preisgekrönten Künstlern. Blackwork, Fine-Line,
          Realism & Japanese — kompromisslos auf deine Idee zugeschnitten.
        </p>

        <div className="mt-9 flex flex-col items-center gap-7 sm:flex-row sm:gap-8">
          <a
            href="#termin"
            className="hero-cta animate-ctaPulse rounded-[2px] bg-ink-neon px-8 py-4 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-ink-black transition-transform duration-200 hover:-translate-y-0.5"
          >
            Termin anfragen ▸
          </a>
          <a
            href="#portfolio"
            className="hero-cta px-4 py-3 text-[12.5px] uppercase tracking-[0.14em] text-ink-bone underline-offset-[6px] transition-colors duration-200 hover:text-ink-neon hover:underline"
          >
            Portfolio ansehen ↓
          </a>
        </div>
      </div>

      {/* === Sound-Toggle (erscheint nur bei vorhandener Audiospur) === */}
      {hasAudio && (
        <button
          type="button"
          onClick={toggleSound}
          aria-label={muted ? "Ton einschalten" : "Ton ausschalten"}
          className="absolute bottom-7 right-6 z-20 flex items-center gap-2 rounded-full border border-white/15 bg-ink-black/40 px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-ink-ash backdrop-blur-sm transition-colors hover:text-ink-bone lg:right-16"
        >
          <span aria-hidden>{muted ? "🔇" : "🔊"}</span>
          {muted ? "Ton an" : "Ton aus"}
        </button>
      )}

      {/* === Scroll-Hint === */}
      <a
        href="#kuenstler"
        className="hero-hint absolute bottom-7 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-mute"
        aria-label="Weiter scrollen"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
          Scroll
        </span>
        <span className="animate-scrollHint text-lg leading-none">⌄</span>
      </a>
    </section>
  );
}
