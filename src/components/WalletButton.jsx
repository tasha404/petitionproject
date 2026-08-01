import { FaWallet } from "react-icons/fa";

function WalletButton() {
  return (
    <button className="bell-mt flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-400 to-blue-400 px-5 py-3 font-semibold text-white shadow-lg shadow-pink-200 transition duration-300 hover:scale-[1.03]">
      <FaWallet />
      Connect Wallet
    </button>
  );
}

export default WalletButton;