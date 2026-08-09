import { useState, useEffect } from "react";
import WalletButton from "./WalletButton";
import { getAllPetitions } from "../services/petitionService";

function Navbar() {
  const [total, setTotal] = useState(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const petitions = await getAllPetitions();
        const sum = petitions.reduce((n, p) => n + p.signatureCount, 0);
        if (active) setTotal(sum);
      } catch {
        /* leave as null; pill just hides the number */
      }
    })();
    return () => { active = false; };
  }, []);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-[var(--line)] bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <div className="flex items-center gap-3">
          <img
            src="/img/Sound or audio wave Stock Vector _ Adobe Stock.ico"
            alt=""
            className="h-9 w-9 rounded-lg object-cover"
          />
          <div className="leading-tight">
            <p className="eyebrow">Los TashLee</p>
            <h2 className="display text-[1.1rem] text-[var(--ink)]">Petition Platform</h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {total !== null && (
            <span className="chip hidden sm:inline-flex">
              <span className="dot" />
              {total.toLocaleString()} signed
            </span>
          )}
          <WalletButton />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;