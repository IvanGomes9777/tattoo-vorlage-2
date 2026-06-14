import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Kuenstler from "@/components/Kuenstler";
import Portfolio from "@/components/Portfolio";
import Ablauf from "@/components/Ablauf";
import Hygiene from "@/components/Hygiene";
import Stimmen from "@/components/Stimmen";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Kuenstler />
      <Portfolio />
      <Ablauf />
      <Hygiene />
      <Stimmen />
    </main>
  );
}
