import { useState, useEffect } from "react";
import { FaWallet } from "react-icons/fa";
import { connectWallet, getCurrentAccount } from "../services/petitionService";

// Turn 0x1234...abcd into a short label
function shorten(addr) {
  return addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "";
}

function WalletButton() {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);

  // On load: check if a wallet is already connected, and keep in sync if the
  // user switches accounts in MetaMask.
  useEffect(() => {
    getCurrentAccount()
      .then(setAccount)
      .catch(() => {});

    if (window.ethereum) {
      const handler = (accounts) => setAccount(accounts[0] || null);
      window.ethereum.on("accountsChanged", handler);
      return () => window.ethereum.removeListener("accountsChanged", handler);
    }
  }, []);

  async function handleConnect() {
    try {
      setLoading(true);
      const addr = await connectWallet();
      setAccount(addr);
    } catch (err) {
      alert(err?.message || "Could not connect wallet.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleConnect}
      disabled={loading}
      className="bell-mt flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-400 to-blue-400 px-5 py-3 font-semibold text-white shadow-lg shadow-pink-200 transition duration-300 hover:scale-[1.03] disabled:opacity-70"
    >
      <FaWallet />
      {account ? shorten(account) : loading ? "Connecting..." : "Connect Wallet"}
    </button>
  );
}

export default WalletButton;