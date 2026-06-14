import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Kuenstler from "@/components/Kuenstler";
import Portfolio from "@/components/Portfolio";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Kuenstler />
      <Portfolio />
    </main>
  );
}
