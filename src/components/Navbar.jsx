import WalletButton from "./WalletButton";

function Navbar() {
  return (
    <nav
      className="
      fixed
      top-0
      left-0
      right-0
      z-50
      backdrop-blur-xl
      bg-white/5
      border-b
      border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <h2 className="text-2xl font-bold tracking-wide">
          OnChain
        </h2>

        <WalletButton />

      </div>
    </nav>
  );
}

export default Navbar;