import type { Metadata } from "next";
import { Anton, Inter, Caveat, Space_Mono } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});
const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "INK & SOUL — Custom Tattoos · Berlin-Kreuzberg",
  description:
    "Deine Haut. Unsere Kunst. Custom Tattoos von preisgekrönten Künstlern in Berlin-Kreuzberg. Blackwork, Fine-Line, Realism, Japanese & mehr.",
  openGraph: {
    title: "INK & SOUL — Custom Tattoos · Berlin-Kreuzberg",
    description:
      "Deine Haut. Unsere Kunst. Custom Tattoos von preisgekrönten Künstlern in Berlin-Kreuzberg.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de"
      className={`${anton.variable} ${inter.variable} ${caveat.variable} ${spaceMono.variable}`}
    >
      <body className="font-body bg-ink-black text-ink-bone antialiased">
        {children}
      </body>
    </html>
  );
}
