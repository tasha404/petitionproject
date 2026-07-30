const signers = [
  "0x12A4...89CD",
  "0x71B9...F2A1",
  "0xAA32...91CE",
  "0x98CD...0F41",
];

function RecentSigners() {
  return (
    <div className="mt-8">

      <h3 className="text-xl font-semibold mb-4">
        Recent Signers
      </h3>

      <div className="space-y-3">

        {signers.map((signer) => (
          <div
            key={signer}
            className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-3"
          >
            {signer}
          </div>
        ))}

      </div>

    </div>
  );
}

export default RecentSigners;