// Turn 0x1234...abcd into a short label
function shorten(addr) {
  return addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "";
}

function RecentSigners({ signers = [] }) {
  // Newest first, show up to 4.
  const recent = [...signers].reverse().slice(0, 4);

  return (
    <div className="mt-6 p-0">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="stat-title text-[18px] font-black uppercase tracking-[1px] text-pink-600">Recent signers</h3>
        <span className="text-[13px] uppercase tracking-[2px] text-violet-900">
          {signers.length} total {signers.length === 1 ? "signature" : "signatures"}
        </span>
      </div>

      <div className="bell-mt space-y-3">
        {recent.length === 0 && (
          <div className="signer-pill flex items-center justify-between rounded-[16px] bg-[#dceeff]/95 px-4 py-3">
            <span className="font-mono text-[16px] text-blue-700">Be the first to sign!</span>
          </div>
        )}

        {recent.map((s, index) => (
          <div
            key={`${s.signer}-${index}`}
            className={`signer-pill flex items-center justify-between rounded-[16px] px-4 py-3 ${index % 2 === 0 ? "bg-[#f5d6e5]/95" : "bg-[#dceeff]/95"}`}
            style={{ animationDelay: `${index * 120}ms` }}
          >
            <span className="font-mono text-[16px] text-blue-700">{shorten(s.signer)}</span>
            <span className="text-[12px] uppercase tracking-[3px] text-pink-600">VERIFIED</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentSigners;