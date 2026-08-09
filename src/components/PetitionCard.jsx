import { useState, useEffect, useCallback } from "react";
import ProgressBar from "./ProgressBar";
import SignButton from "./SignButton";
import RecentSigners from "./RecentSigners";
import { getPetition, getSignatures } from "../services/petitionService";

const PETITION_ID = 0;   // "Save Our Park" on the contract
const GOAL = 1000;

function countToday(signatures) {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const startSec = Math.floor(start.getTime() / 1000);
  return signatures.filter((s) => s.timestamp >= startSec).length;
}

function PetitionCard() {
  const [count, setCount] = useState(0);
  const [signers, setSigners] = useState([]);

  const loadData = useCallback(async () => {
    try {
      const petition = await getPetition(PETITION_ID);
      setCount(petition.signatureCount);
    } catch (err) {
      console.error("Could not load signature count:", err);
    }
    try {
      const sigs = await getSignatures(PETITION_ID);
      setSigners(sigs);
    } catch (err) {
      console.error("Could not load signers:", err);
    }
  }, []);

  useEffect(() => {
    let active = true;
    (async () => { if (active) await loadData(); })();
    return () => { active = false; };
  }, [loadData]);

  const today = countToday(signers);

  return (
    <div className="card mx-auto max-w-5xl p-6 md:p-9">
      <div className="grid gap-9 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Left: the petition */}
        <div>
          <p className="eyebrow">Public petition</p>

          <h2 className="display mt-4 text-4xl text-[var(--ink)] md:text-[3.2rem]">
            Save Our Hyeok Park
          </h2>

          <p className="mt-4 max-w-xl leading-relaxed text-[var(--ink-soft)]">
            Protect our community park from redevelopment. Every verified wallet is
            one legitimate vote &mdash; together we keep Hyeok Park green for the
            generations after us.
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <span className="chip">100% wallet-verified</span>
            <span className="chip">Los TashLee district</span>
          </div>

          <ProgressBar current={count} goal={GOAL} />
          <SignButton petitionId={PETITION_ID} onSigned={loadData} />
        </div>

        {/* Right: live snapshot + signers */}
        <div className="lg:border-l lg:border-[var(--line)] lg:pl-8">
          <p className="eyebrow">Live snapshot</p>

          <div className="mt-4 space-y-2.5">
            <div className="tile flex items-center justify-between px-4 py-3">
              <span className="text-sm text-[var(--ink-soft)]">Signatures today</span>
              <strong className="display text-lg text-[var(--ink)]">{today}</strong>
            </div>
            <div className="tile flex items-center justify-between px-4 py-3">
              <span className="text-sm text-[var(--ink-soft)]">All-time signatures</span>
              <strong className="display text-lg text-[var(--ink)]">{count.toLocaleString()}</strong>
            </div>
            <div className="tile flex items-center justify-between px-4 py-3">
              <span className="text-sm text-[var(--ink-soft)]">Goal</span>
              <strong className="display text-lg text-[var(--ink)]">{GOAL.toLocaleString()}</strong>
            </div>
          </div>

          <RecentSigners signers={signers} />
        </div>
      </div>
    </div>
  );
}

export default PetitionCard;