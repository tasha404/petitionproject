function ProgressBar({ current, goal }) {
  const percentage = Math.min((current / goal) * 100, 100);

  return (
    <div className="mt-8 rounded-[24px] border border-white/10 bg-slate-950/50 p-5">
      <div className="bell-mt mb-3 flex items-center justify-between text-[0.95rem] text-slate-300">
        <span>{current} signatures</span>
        <span>{goal} goal</span>
      </div>

      <div className="relative h-4 overflow-hidden rounded-full bg-slate-800">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 via-indigo-400/20 to-fuchsia-400/20" />
        <div
          className="signal-bar relative h-full rounded-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-fuchsia-400"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="bell-mt mt-3 text-right text-[0.85rem] uppercase tracking-[3px] text-slate-400">
        {Math.round(percentage)}% funded
      </div>
    </div>
  );
}

export default ProgressBar;