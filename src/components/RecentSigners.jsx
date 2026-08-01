const signers = [
  "0x12A4...89CD",
  "0x71B9...F2A1",
  "0xAA32...91CE",
  "0x98CD...0F41",
];

function RecentSigners() {
  return (
    <div className="mt-6 p-0">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="stat-title text-[18px] font-black uppercase tracking-[1px] text-pink-600">Recent signers</h3>
        <span className="text-[13px] uppercase tracking-[2px] text-violet-900">4 new signatures</span>
      </div>

      <div className="bell-mt space-y-3">
        {signers.map((signer, index) => (
          <div
            key={signer}
            className={`signer-pill flex items-center justify-between rounded-[16px] px-4 py-3 ${index % 2 === 0 ? "bg-[#f5d6e5]/95" : "bg-[#dceeff]/95"}`}
            style={{ animationDelay: `${index * 120}ms` }}
          >
            <span className="font-mono text-[16px] text-blue-700">{signer}</span>
            <span className="text-[12px] uppercase tracking-[3px] text-pink-600">VERIFIED</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentSigners;