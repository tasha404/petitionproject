import ProgressBar from "./ProgressBar";
import SignButton from "./SignButton";
import RecentSigners from "./RecentSigners";

function PetitionCard() {

  const current = 347;
  const goal = 1000;

  return (

    <div
      className="
        max-w-3xl
        mx-auto
        bg-white/5
        backdrop-blur-2xl
        border
        border-white/10
        rounded-3xl
        p-10
        shadow-2xl
        hover:border-cyan-400/40
        hover:shadow-cyan-500/10
        transition
        duration-300"
    >

      <span className="text-cyan-400 font-semibold">
        PUBLIC PETITION
      </span>

      <h2 className="text-4xl font-bold mt-3">
        Save Our Park 🌳
      </h2>

      <p className="mt-5 text-slate-400 leading-7">

        Protect our local community park from redevelopment.
        Every verified wallet represents one legitimate vote.

      </p>

      <ProgressBar
        current={current}
        goal={goal}
      />

      <SignButton />

      <RecentSigners />

    </div>

  );
}

export default PetitionCard;