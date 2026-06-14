"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/**
 * Sektion 08 — Kontakt & Booking.
 *
 * Schlankes mailto-Anfrageformular (kein Backend nötig) + Studio-Infos +
 * eingebettete Google Map (Embed ohne API-Key).
 *
 * TODO (echte Daten): STUDIO-Konstanten & Map-Adresse auf echte Werte setzen.
 */
const STUDIO = {
  email: "hello@inkandsoul.de",
  phone: "+49 (0)30 222-3333",
  address: "Oranienstraße 45, 10969 Berlin-Kreuzberg",
  instagram: "@inkandsoul.berlin",
  instagramUrl: "https://instagram.com/inkandsoul.berlin",
};

const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(
  "Oranienstraße 45, 10969 Berlin"
)}&output=embed`;

const inputCls =
  "w-full rounded-[3px] border border-white/15 bg-ink-coal px-4 py-3 text-[14px] text-ink-bone placeholder:text-ink-mute outline-none transition-colors focus:border-ink-neon";

export default function Kontakt() {
  const rootRef = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const reveal = rootRef.current?.querySelectorAll(".kontakt-col");
    if (!reveal) return;
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            gsap.from(reveal, {
              opacity: 0,
              y: 36,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.12,
            });
            obs.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    io.observe(rootRef.current as Element);
    return () => io.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => (f.get(k) as string) || "—";

    const subject = `Tattoo-Anfrage – ${get("name")}`;
    const body = [
      `Name: ${get("name")}`,
      `E-Mail: ${get("email")}`,
      `Telefon: ${get("phone")}`,
      `Wunsch-Künstler: ${get("artist")}`,
      `Stil: ${get("style")}`,
      `Körperstelle: ${get("placement")}`,
      `Größe (ca. cm): ${get("size")}`,
      "",
      "Idee:",
      get("idea"),
      "",
      "Hinweis: Referenzbilder bitte dieser E-Mail direkt anhängen.",
    ].join("\n");

    window.location.href = `mailto:${STUDIO.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section
      id="termin"
      ref={rootRef}
      className="relative scroll-mt-24 bg-ink-black px-6 py-24 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="mb-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-ink-neon">
            08 — Lass uns reden
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.4rem,7vw,5.5rem)] leading-[0.95]">
            TERMIN ANFRAGEN
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-ash">
            Erzähl uns von deiner Idee — wir melden uns persönlich für ein
            kostenloses Beratungsgespräch.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          {/* ===== Formular ===== */}
          <form className="kontakt-col" onSubmit={handleSubmit} noValidate={false}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label className="mb-1.5 block text-[11px] uppercase tracking-[0.14em] text-ink-mute">
                  Name *
                </label>
                <input name="name" required className={inputCls} placeholder="Dein Name" />
              </div>
              <div className="sm:col-span-1">
                <label className="mb-1.5 block text-[11px] uppercase tracking-[0.14em] text-ink-mute">
                  E-Mail *
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className={inputCls}
                  placeholder="du@email.de"
                />
              </div>
              <div className="sm:col-span-1">
                <label className="mb-1.5 block text-[11px] uppercase tracking-[0.14em] text-ink-mute">
                  Telefon
                </label>
                <input name="phone" className={inputCls} placeholder="optional" />
              </div>
              <div className="sm:col-span-1">
                <label className="mb-1.5 block text-[11px] uppercase tracking-[0.14em] text-ink-mute">
                  Wunsch-Künstler
                </label>
                <select name="artist" className={inputCls} defaultValue="Egal">
                  <option>Egal</option>
                  <option>Marco Riley</option>
                  <option>Lena Voss</option>
                </select>
              </div>
              <div className="sm:col-span-1">
                <label className="mb-1.5 block text-[11px] uppercase tracking-[0.14em] text-ink-mute">
                  Stil
                </label>
                <select name="style" className={inputCls} defaultValue="">
                  <option value="" disabled>
                    Bitte wählen
                  </option>
                  <option>Blackwork</option>
                  <option>Dotwork</option>
                  <option>Geometric</option>
                  <option>Fine-Line</option>
                  <option>Realism</option>
                  <option>Noch unsicher</option>
                </select>
              </div>
              <div className="sm:col-span-1">
                <label className="mb-1.5 block text-[11px] uppercase tracking-[0.14em] text-ink-mute">
                  Körperstelle
                </label>
                <input name="placement" className={inputCls} placeholder="z. B. Unterarm" />
              </div>
              <div className="sm:col-span-1">
                <label className="mb-1.5 block text-[11px] uppercase tracking-[0.14em] text-ink-mute">
                  Größe (ca. cm)
                </label>
                <input name="size" className={inputCls} placeholder="z. B. 15 cm" />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-[11px] uppercase tracking-[0.14em] text-ink-mute">
                  Deine Idee *
                </label>
                <textarea
                  name="idea"
                  required
                  rows={4}
                  className={`${inputCls} resize-y`}
                  placeholder="Beschreibe dein Wunschmotiv, Inspiration, Bedeutung …"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-[11px] uppercase tracking-[0.14em] text-ink-mute">
                  Referenzbilder
                </label>
                <input
                  name="refs"
                  type="file"
                  multiple
                  accept="image/*"
                  className="block w-full text-[13px] text-ink-ash file:mr-4 file:rounded-[2px] file:border-0 file:bg-ink-slate file:px-4 file:py-2 file:text-[12px] file:uppercase file:tracking-[0.1em] file:text-ink-bone hover:file:bg-ink-neon hover:file:text-ink-black"
                />
                <p className="mt-1.5 text-[12px] text-ink-mute">
                  Beim Absenden öffnet sich deine E-Mail — häng deine
                  Referenzbilder dort bitte direkt an.
                </p>
              </div>
            </div>

            {/* Rechtliche Einwilligungen */}
            <div className="mt-6 space-y-3">
              <label className="flex items-start gap-3 text-[13px] leading-relaxed text-ink-ash">
                <input
                  type="checkbox"
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 accent-ink-neon"
                />
                <span>
                  Ich bin <strong className="text-ink-bone">mindestens 18 Jahre</strong> alt
                  und weise das vor Ort mit gültigem Ausweis nach. *
                </span>
              </label>
              <label className="flex items-start gap-3 text-[13px] leading-relaxed text-ink-ash">
                <input
                  type="checkbox"
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 accent-ink-neon"
                />
                <span>
                  Ich willige ein, dass meine Angaben & hochgeladenen Bilder zur
                  Bearbeitung meiner Anfrage gespeichert werden. Es gilt die{" "}
                  <a href="#datenschutz" className="text-ink-neon underline-offset-2 hover:underline">
                    Datenschutzerklärung
                  </a>
                  . Die Daten werden nach Abschluss gelöscht. *
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="mt-7 inline-flex items-center gap-2 rounded-[2px] bg-ink-neon px-8 py-4 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-ink-black transition-transform duration-200 hover:-translate-y-0.5"
            >
              Anfrage senden →
            </button>

            {sent && (
              <p className="mt-4 text-[13px] text-ink-bone">
                ✓ Deine E-Mail wurde vorbereitet — bitte im geöffneten
                E-Mail-Programm absenden (und Referenzbilder anhängen). Falls
                sich nichts geöffnet hat, schreib uns direkt an{" "}
                <a href={`mailto:${STUDIO.email}`} className="text-ink-neon hover:underline">
                  {STUDIO.email}
                </a>
                .
              </p>
            )}
          </form>

          {/* ===== Studio-Infos + Map ===== */}
          <div className="kontakt-col flex flex-col gap-8">
            <div className="space-y-4 text-[14px]">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute">
                  Adresse
                </p>
                <p className="mt-1 text-ink-bone">{STUDIO.address}</p>
              </div>
              <div className="flex flex-wrap gap-x-10 gap-y-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute">
                    Telefon
                  </p>
                  <a href={`tel:${STUDIO.phone.replace(/[^+\d]/g, "")}`} className="mt-1 block text-ink-bone hover:text-ink-neon">
                    {STUDIO.phone}
                  </a>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute">
                    E-Mail
                  </p>
                  <a href={`mailto:${STUDIO.email}`} className="mt-1 block text-ink-bone hover:text-ink-neon">
                    {STUDIO.email}
                  </a>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute">
                    Instagram
                  </p>
                  <a href={STUDIO.instagramUrl} target="_blank" rel="noopener noreferrer" className="mt-1 block text-ink-bone hover:text-ink-neon">
                    {STUDIO.instagram}
                  </a>
                </div>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute">
                  Öffnungszeiten
                </p>
                <p className="mt-1 text-ink-bone">Dienstag – Samstag: 12:00 – 20:00</p>
                <p className="text-ink-mute">Sonntag & Montag: geschlossen</p>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[4px] border border-white/10">
              <iframe
                title="Standort INK & SOUL auf Google Maps"
                src={MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full grayscale-[0.4] contrast-[1.05]"
                style={{ border: 0 }}
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
