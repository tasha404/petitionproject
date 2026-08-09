import { useState, useEffect } from "react";
import StatsCard from "./StatsCard";
import { getAllPetitions } from "../services/petitionService";

function Stats() {
  const [petitions, setPetitions] = useState(0);
  const [signatures, setSignatures] = useState(0);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const all = await getAllPetitions();
        if (!active) return;
        setPetitions(all.length);
        setSignatures(all.reduce((n, p) => n + p.signatureCount, 0));
      } catch {
        /* keep zeros on failure */
      }
    })();
    return () => { active = false; };
  }, []);

  return (
    <section className="mb-16 grid gap-4 sm:grid-cols-3">
      <StatsCard label="Active petitions" value={petitions} detail="Open for signatures now" />
      <StatsCard label="Total signatures" value={signatures.toLocaleString()} detail="Every one a real wallet" />
      <StatsCard label="Wallet-verified" value="100%" detail="No bots, no duplicates" />
    </section>
  );
}

export default Stats;