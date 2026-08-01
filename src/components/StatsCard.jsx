function StatsCard({ title, value, detail, tone = "sky" }) {
  const tones = {
    sky: {
      frame: "border-sky-200",
      header: "from-sky-200 to-blue-200",
      shadow: "shadow-[0_16px_45px_-18px_rgba(56,189,248,0.7)]",
      hover: "hover:shadow-[0_22px_60px_-18px_rgba(14,165,233,0.75)]",
    },
    lilac: {
      frame: "border-violet-200",
      header: "from-violet-200 to-indigo-200",
      shadow: "shadow-[0_16px_45px_-18px_rgba(167,139,250,0.7)]",
      hover: "hover:shadow-[0_22px_60px_-18px_rgba(139,92,246,0.75)]",
    },
    pink: {
      frame: "border-pink-200",
      header: "from-pink-200 to-rose-200",
      shadow: "shadow-[0_16px_45px_-18px_rgba(244,114,182,0.7)]",
      hover: "hover:shadow-[0_22px_60px_-18px_rgba(236,72,153,0.75)]",
    },
  };

  const activeTone = tones[tone];

  return (
    <div className={`group rounded-[26px] border bg-white/90 p-4 transition duration-300 hover:-translate-y-1 ${activeTone.frame} ${activeTone.shadow} ${activeTone.hover}`}>
      <div className={`flex items-center justify-center rounded-2xl border border-white/80 bg-gradient-to-r ${activeTone.header} px-3 py-2`}>
        <p className="stat-title text-[17px] uppercase tracking-[3px] text-slate-900">{title}</p>
      </div>

      <div className="flex min-h-[120px] items-center justify-center">
        <h2 className="stat-value text-5xl font-black leading-none text-slate-900">{value}</h2>
      </div>
    </div>
  );
}

export default StatsCard;