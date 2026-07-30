function ProgressBar({ current, goal }) {
  const percentage = (current / goal) * 100;

  return (
    <div className="mt-6">

      <div className="flex justify-between text-sm text-slate-400 mb-2">
        <span>{current} Signatures</span>
        <span>{goal} Goal</span>
      </div>

      <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">

        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-700"
          style={{ width: `${percentage}%` }}
        ></div>

      </div>

    </div>
  );
}

export default ProgressBar;