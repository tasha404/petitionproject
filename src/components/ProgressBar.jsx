function ProgressBar({ current, goal }) {
  const pct = Math.min((current / goal) * 100, 100);

  return (
    <div className="mt-8">
      <div className="mb-2.5 flex items-baseline justify-between">
        <span className="display text-[1.6rem] text-[var(--ink)]">
          {current.toLocaleString()}
          <span className="ml-1.5 text-[0.95rem] font-normal text-[var(--ink-soft)]" style={{ fontFamily: "var(--font-body)" }}>
            signatures
          </span>
        </span>
        <span className="text-sm text-[var(--ink-soft)]">Goal {goal.toLocaleString()}</span>
      </div>

      <div className="track">
        <div className="fill" style={{ width: `${pct}%` }} />
      </div>

      <p className="mt-2 text-right text-xs uppercase tracking-[0.18em] text-[var(--ink-soft)]">
        {Math.round(pct)}% of goal
      </p>
    </div>
  );
}

export default ProgressBar;