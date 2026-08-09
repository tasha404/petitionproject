import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import PetitionCard from "../components/PetitionCard";

function Home() {
  return (
    <div className="page-shell relative min-h-screen overflow-hidden text-[var(--ink)]">
      <div className="ambient-grid" />

      <Navbar />

      <main className="relative z-10 mx-auto max-w-6xl px-6 pb-20">
        <Hero />
        <Stats />
        <PetitionCard />
      </main>
    </div>
  );
}

export default Home;