import { FaWallet } from "react-icons/fa";

function WalletButton() {
  return (
    <button
      className="
      flex
      items-center
      gap-2
      px-5
      py-3
      rounded-xl
      bg-gradient-to-r
      from-indigo-600
      to-cyan-500
      hover:scale-105
      transition
      duration-300
      shadow-xl"
    >
      <FaWallet />

      Connect Wallet
    </button>
  );
}

export default WalletButton;