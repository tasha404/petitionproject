import StatsCard from "./StatsCard";

function Stats() {
  return (
    <section className="grid md:grid-cols-3 gap-6 mb-16">

      <StatsCard
        title="Active Petitions"
        value="12"
      />

      <StatsCard
        title="Total Signatures"
        value="2,493"
      />

      <StatsCard
        title="Completed"
        value="8"
      />

    </section>
  );
}

export default Stats;