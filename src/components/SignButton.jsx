import { useState, useEffect } from "react";
import {
  signPetition,
  connectWallet,
  getCurrentAccount,
  hasSigned,
} from "../services/petitionService";

function SignButton({ petitionId = 0, onSigned }) {
  const [account, setAccount] = useState(null);
  const [signed, setSigned] = useState(false);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    let active = true;
    async function load() {
      const acc = await getCurrentAccount().catch(() => null);
      if (!active) return;
      setAccount(acc);
      if (acc) {
        const already = await hasSigned(petitionId, acc).catch(() => false);
        if (active) setSigned(already);
      } else {
        setSigned(false);
      }
    }
    load();
    if (window.ethereum) {
      const handler = () => load();
      window.ethereum.on("accountsChanged", handler);
      return () => { active = false; window.ethereum.removeListener("accountsChanged", handler); };
    }
    return () => { active = false; };
  }, [petitionId]);

  async function handleSign() {
    try {
      setPending(true);
      let acc = account;
      if (!acc) { acc = await connectWallet(); setAccount(acc); }
      await signPetition(petitionId, "");
      setSigned(true);
      if (onSigned) onSigned();
    } catch (err) {
      alert(err?.reason || err?.message || "Could not sign. Please try again.");
    } finally {
      setPending(false);
    }
  }

  const label = signed
    ? "Signed \u2713"
    : pending
    ? "Signing\u2026"
    : account
    ? "Sign petition"
    : "Connect & sign";

  return (
    <button
      onClick={handleSign}
      disabled={pending || signed}
      className="neon-button mt-8 w-full py-4 text-[1.05rem] font-semibold"
    >
      <span className="flex items-center justify-center gap-2">
        {label}
        {!signed && !pending && <span aria-hidden>&rarr;</span>}
      </span>
    </button>
  );
}

export default SignButton;