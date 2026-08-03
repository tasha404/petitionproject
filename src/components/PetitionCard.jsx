import { useState, useEffect, useCallback } from "react";
import ProgressBar from "./ProgressBar";
import SignButton from "./SignButton";
import RecentSigners from "./RecentSigners";
import { getPetition, getSignatures } from "../services/petitionService";

const PETITION_ID = 0; // "Save Our Park" is petition id 0 on the contract

function PetitionCard() {
  const goal = 1000;
  const [count, setCount] = useState(0);
  const [signers, setSigners] = useState([]);

  // Pull the live signature count + signer list from the blockchain.
  // Used both on first load and after someone signs.
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

  // Load once when the card appears. Wrapping in an inner async function is the
  // pattern React recommends for data fetching in an effect.
  useEffect(() => {
    let active = true;
    (async () => {
      if (active) await loadData();
    })();
    return () => {
      active = false;
    };
  }, [loadData]);

  return (
    <div className="mx-auto max-w-6xl rounded-[32px] border border-pink-100 bg-white/95 p-6 shadow-[0_22px_60px_-22px_rgba(59,130,246,0.45)] md:p-8">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="hero-detail flex items-center gap-3 text-xs font-semibold uppercase tracking-[4px] text-pink-600">
            <span>PUBLIC PETITION</span>
            <span className="text-pink-600">•</span>
            <span>LIVE VOTES</span>
          </div>

          <h2 className="bonello-title mt-5 text-4xl font-black text-slate-900 md:text-5xl">
            Save Our Hyeok Park 🌳
          </h2>

          <p className="hero-detail mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
            Protect our precious community park from redevelopment. Every verified
            wallet represents one legitimate vote. Our collective voice can make a difference, 
            and together we can ensure that Hyeok Park remains a green sanctuary for generations to come.
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-pink-100 bg-white p-4 shadow-sm">
              <p className="hero-detail text-[11px] uppercase tracking-[3px] text-slate-500">Momentum</p>
              <p className="hero-detail mt-2 text-[1.5rem] font-bold text-slate-900">+18%</p>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
              <p className="hero-detail text-[11px] uppercase tracking-[3px] text-slate-500">Verified</p>
              <p className="hero-detail mt-2 text-[1.5rem] font-bold text-slate-900">97%</p>
            </div>
            <div className="rounded-2xl border border-pink-100 bg-white p-4 shadow-sm">
              <p className="hero-detail text-[11px] uppercase tracking-[3px] text-slate-500">District</p>
              <p className="hero-detail mt-2 text-[1.5rem] font-bold text-slate-900">Los TashLee</p>
            </div>
          </div>

          <ProgressBar current={count} goal={goal} />
          <SignButton petitionId={PETITION_ID} onSigned={loadData} />
        </div>

        <div className="bell-mt p-0">
          <div className="p-0">
            <p className="stat-title text-[16px] font-black uppercase tracking-[4px] text-pink-600">IMPACT SNAPSHOT</p>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between rounded-[16px] bg-[#f5d6e5]/95 px-4 py-3">
                <span className="text-[17px] font-medium text-slate-700">Signatures today</span>
                <strong className="text-[19px] font-bold text-slate-900">41</strong>
              </div>
              <div className="flex items-center justify-between rounded-[16px] bg-[#dceeff]/95 px-4 py-3">
                <span className="text-[17px] font-medium text-slate-700">Campaign deadline</span>
                <strong className="text-[19px] font-bold text-slate-900">12 JUL</strong>
              </div>
              <div className="flex items-center justify-between rounded-[16px] bg-[#f5d6e5]/95 px-4 py-3">
                <span className="text-[17px] font-medium text-slate-700">Cities in motion</span>
                <strong className="text-[19px] font-bold text-slate-900">09</strong>
              </div>
            </div>
          </div>

          <RecentSigners signers={signers} />
        </div>
      </div>
    </div>
  );
}

export default PetitionCard;