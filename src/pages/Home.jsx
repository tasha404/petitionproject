import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PetitionCard from "../components/PetitionCard";
import Stats from "../components/Stats";

function Home() {
  return (
    <div className="page-shell relative min-h-screen overflow-hidden bg-white text-slate-900">
      <div className="ambient-grid" />
      <div className="absolute left-[-6rem] top-[-3rem] h-72 w-72 rounded-full bg-pink-200/50 blur-[140px]" />
      <div className="absolute right-[-4rem] top-16 h-80 w-80 rounded-full bg-blue-200/50 blur-[160px]" />
      <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-sky-200/45 blur-[160px]" />

      <Navbar />

      <main className="relative z-10 mx-auto max-w-7xl px-6 pb-16">
        <Hero />
        <Stats />
        <PetitionCard />
      </main>
    </div>
  );
}

export default Home;