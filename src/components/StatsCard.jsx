function StatsCard({ label, value, detail }) {
  return (
    <div className="tile p-6">
      <p className="eyebrow">{label}</p>
      <p className="display mt-3 text-[2.9rem] leading-none text-[var(--ink)]">{value}</p>
      {detail && <p className="mt-2 text-sm text-[var(--ink-soft)]">{detail}</p>}
    </div>
  );
}

export default StatsCard;