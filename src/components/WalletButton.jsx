import { useState, useEffect } from "react";
import { FaWallet } from "react-icons/fa";
import { connectWallet, getCurrentAccount } from "../services/petitionService";

function shorten(addr) {
  return addr ? `${addr.slice(0, 6)}\u2026${addr.slice(-4)}` : "";
}

function WalletButton() {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCurrentAccount().then(setAccount).catch(() => {});
    if (window.ethereum) {
      const handler = (accts) => setAccount(accts[0] || null);
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
    <button onClick={handleConnect} disabled={loading} className="btn-wallet">
      <FaWallet className="text-[var(--blue)]" />
      <span className={account ? "mono text-[0.9rem]" : ""}>
        {account ? shorten(account) : loading ? "Connecting\u2026" : "Connect wallet"}
      </span>
    </button>
  );
}

export default WalletButton;