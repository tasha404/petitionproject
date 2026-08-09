function shorten(addr) {
  return addr ? `${addr.slice(0, 6)}\u2026${addr.slice(-4)}` : "";
}

function RecentSigners({ signers = [] }) {
  const recent = [...signers].reverse().slice(0, 4);

  return (
    <div className="mt-8">
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="eyebrow">Recent signers</h3>
        <span className="text-xs text-[var(--ink-soft)]">
          {signers.length} {signers.length === 1 ? "signature" : "signatures"}
        </span>
      </div>

      <div className="space-y-2.5">
        {recent.length === 0 && (
          <div className="signer-row">
            <span className="text-sm text-[var(--ink-soft)]">No signatures yet &mdash; be the first.</span>
          </div>
        )}

        {recent.map((s, i) => (
          <div key={`${s.signer}-${i}`} className="signer-row" style={{ animationDelay: `${i * 90}ms` }}>
            <span className="mono text-[0.95rem] text-[var(--ink)]">{shorten(s.signer)}</span>
            <span className="seal">Sealed</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentSigners;