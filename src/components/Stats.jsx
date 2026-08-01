import StatsCard from "./StatsCard";

function Stats() {
  return (
    <section className="mb-16 grid gap-6 md:grid-cols-3">
      <StatsCard title="Active petitions" value="12" detail="Fresh campaigns opened this week" tone="sky" />
      <StatsCard title="Total signatures" value="2,493" detail="Wallet-backed support is growing fast" tone="lilac" />
      <StatsCard title="Completed" value="8" detail="Motions already turned into action" tone="pink" />
    </section>
  );
}

export default Stats;