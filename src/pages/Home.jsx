import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PetitionCard from "../components/PetitionCard";
import Stats from "../components/Stats";

function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">

      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600 blur-[180px] rounded-full opacity-20" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 blur-[180px] rounded-full opacity-20" />

      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-6">

        <Hero />

        <Stats />

        <PetitionCard />

      </main>

    </div>
  );
}

export default Home;