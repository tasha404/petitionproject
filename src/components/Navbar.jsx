import WalletButton from "./WalletButton";

function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-pink-100 bg-white/85 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            src="/img/Sound or audio wave Stock Vector _ Adobe Stock.ico"
            alt="brand icon"
            className="h-10 w-10 rounded-xl object-cover"
          />
          <div>
            <p className="bell-mt text-sm uppercase tracking-[4px] text-pink-500">Los TashLee</p>
            <h2 className="bell-mt text-[1.15rem] font-semibold tracking-wide text-slate-800">Petition Platform</h2>
          </div>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <span className="bell-mt px-0 py-0 text-[0.95rem] font-semibold uppercase tracking-[2px] text-red-500">
            LIVE VOTES
          </span>
          <span className="bell-mt rounded-[4px] border border-blue-100 bg-blue-50 px-4 py-2 text-[0.95rem] text-blue-700">
            347 signatures
          </span>
        </div>

        <WalletButton />
      </div>
    </nav>
  );
}

export default Navbar;