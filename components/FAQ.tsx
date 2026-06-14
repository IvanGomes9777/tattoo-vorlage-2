"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Sektion 07 — FAQ (Konzept C: Big-Index Accordion).
 *
 * Outline-Index pro Frage, Neon-Markierung der aktiven Frage,
 * weiche Höhen-Animation (grid-rows 0fr->1fr), Scroll-Reveal.
 */
type QA = { q: string; a: string };

const FAQS: QA[] = [
  {
    q: "Tut Tätowieren weh?",
    a: "Ehrlich? Es ist unangenehm, aber gut auszuhalten. Der Schmerz hängt stark von der Körperstelle ab – und wir machen Pausen, wann immer du sie brauchst.",
  },
  {
    q: "Was kostet ein Tattoo?",
    a: "Kleine Tattoos ab 80 €. Größere Arbeiten berechnen wir pro Stunde (ab 120 €/Std). Den genauen Preis nennen wir nach der Beratung – transparent, ohne Überraschungen.",
  },
  {
    q: "Muss ich volljährig sein?",
    a: "Ja. Wir tätowieren ausschließlich Personen ab 18 Jahren – mit gültigem Ausweis. Keine Ausnahmen.",
  },
  {
    q: "Wie lange dauert die Heilung?",
    a: "Die Oberfläche heilt in 2–3 Wochen, die tieferen Schichten in 2–3 Monaten. Mit unserer Aftercare-Anleitung läuft's reibungslos.",
  },
  {
    q: "Kann ich mein eigenes Design mitbringen?",
    a: "Unbedingt! Bring deine Referenzen mit. Dein Künstler verfeinert sie zu etwas, das wirklich nur dir gehört.",
  },
  {
    q: "Walk-In oder nur Termin?",
    a: "Größere Arbeiten nur mit Termin. Kleine Walk-Ins sind manchmal möglich – check unseren Instagram für freie Slots.",
  },
];

export default function FAQ() {
  const rootRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number>(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from(".faq-row", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".faq-list", start: "top 88%", once: true },
      });
    }, rootRef);

    // Positionen neu berechnen, sobald Fonts/Layout final sind (sonst bleibt
    // der Trigger "stale" und die Reihen unsichtbar)
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);
    const t = window.setTimeout(refresh, 600);

    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="faq"
      ref={rootRef}
      className="relative scroll-mt-24 bg-ink-black px-6 py-24 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-[1000px]">
        {/* Header */}
        <div className="mb-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-ink-neon">
            07 — Klartext
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.4rem,7vw,5.5rem)] leading-[0.95]">
            HÄUFIGE FRAGEN
          </h2>
        </div>

        {/* Accordion */}
        <div className="faq-list border-t border-white/10">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`faq-row border-b border-white/10 transition-colors duration-300 ${
                  isOpen ? "bg-ink-coal/40" : ""
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-5 py-7 text-left lg:gap-8"
                >
                  {/* Outline-Index */}
                  <span
                    aria-hidden
                    className={`shrink-0 select-none font-display text-3xl leading-none transition-all duration-300 lg:text-5xl ${
                      isOpen ? "text-ink-neon" : "text-transparent"
                    }`}
                    style={
                      isOpen
                        ? undefined
                        : { WebkitTextStroke: "1.2px rgba(255,23,68,0.4)" }
                    }
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span
                    className={`flex-1 font-display text-xl transition-colors duration-300 lg:text-2xl ${
                      isOpen ? "text-ink-bone" : "text-ink-ash"
                    }`}
                  >
                    {item.q}
                  </span>

                  {/* +/- Icon */}
                  <span
                    aria-hidden
                    className={`relative grid h-7 w-7 shrink-0 place-items-center transition-transform duration-300 ${
                      isOpen ? "rotate-45 text-ink-neon" : "text-ink-ash"
                    }`}
                  >
                    <span className="absolute h-[2px] w-5 bg-current" />
                    <span className="absolute h-5 w-[2px] bg-current" />
                  </span>
                </button>

                {/* Antwort (grid-rows Höhen-Animation) */}
                <div
                  className="grid transition-[grid-template-rows] duration-500 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-7 pl-[calc(2.25rem+1.25rem)] text-[15px] leading-relaxed text-ink-ash lg:pl-[calc(3.75rem+2rem)]">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Brücke zum Kontakt */}
        <p className="mt-12 text-[15px] text-ink-ash">
          Noch Fragen?{" "}
          <a
            href="#termin"
            className="border-b border-ink-neon/60 pb-0.5 text-ink-bone transition-colors hover:border-ink-neon hover:text-ink-neon"
          >
            Schreib uns direkt →
          </a>
        </p>
      </div>
    </section>
  );
}
