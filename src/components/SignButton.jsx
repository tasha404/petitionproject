import { useState, useEffect } from "react";
import {
  signPetition,
  connectWallet,
  getCurrentAccount,
  hasSigned,
} from "../services/petitionService";

// petitionId defaults to 0 (that's "Save Our Park" on the contract).
// onSigned is called after a successful signature so the card can refresh.
function SignButton({ petitionId = 0, onSigned }) {
  const [account, setAccount] = useState(null);
  const [signed, setSigned] = useState(false);
  const [pending, setPending] = useState(false);

  // Check current wallet + whether it already signed this petition.
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
      return () => {
        active = false;
        window.ethereum.removeListener("accountsChanged", handler);
      };
    }
    return () => {
      active = false;
    };
  }, [petitionId]);

  async function handleSign() {
    try {
      setPending(true);

      // Connect first if they haven't yet.
      let acc = account;
      if (!acc) {
        acc = await connectWallet();
        setAccount(acc);
      }

      await signPetition(petitionId, ""); // empty comment is fine
      setSigned(true);
      if (onSigned) onSigned();
    } catch (err) {
      alert(err?.reason || err?.message || "Could not sign. Please try again.");
    } finally {
      setPending(false);
    }
  }

  const label = signed
    ? "You've Signed \u2713"
    : pending
    ? "Signing..."
    : account
    ? "Sign Petition"
    : "Connect & Sign";

  return (
    <button
      onClick={handleSign}
      disabled={pending || signed}
      className="bell-mt neon-button mt-8 w-full rounded-2xl py-4 text-lg font-semibold text-white shadow-[0_0_30px_rgba(34,211,238,0.25)] transition duration-300 disabled:cursor-not-allowed disabled:opacity-80"
    >
      <span className="flex items-center justify-center gap-2">
        {label}
        {!signed && <span className="text-base">&rarr;</span>}
      </span>
    </button>
  );
}

export default SignButton;