function Hero() {
  return (
    <section className="pt-32 pb-16 text-center md:pt-40">
      <div className="bell-mt mx-auto inline-flex items-center gap-3 rounded-[4px] border border-pink-200 bg-pink-50 px-4 py-2 text-[0.9rem] font-medium uppercase tracking-[4px] text-pink-600 shadow-[4px_4px_0_rgba(244,114,182,0.16)]">
        <span className="inline-block h-2 w-2 rounded-full bg-pink-500" />
        Los TashLee Petition Platform
      </div>

      <h1 className="hero-title glow-text mt-6 text-[5rem] font-black leading-[0.9] text-slate-900 md:text-[8rem]">
        Ieqa Loop's
        <br />
        Community Voting
      </h1>

      <p className="hero-detail mx-auto mt-24 max-w-3xl text-base text-slate-600 md:text-lg">
        Petition for save Hyeok Park in Ieqa Loop, Los TashLee. Keep our community park green and safe for everyone.
         Join the movement and make your voice heard!
      </p>

      <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <span className="hero-detail rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 shadow-[0_4px_0_rgba(148,163,184,0.18)]">
          Save Our Hyeok Park
        </span>
        <span className="hero-detail rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 shadow-[0_4px_0_rgba(148,163,184,0.18)]">
          Keep Our Hyeok Park Green
        </span>
        <span className="hero-detail rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 shadow-[0_4px_0_rgba(148,163,184,0.18)]">
          Love Our Hyeok Park
        </span>
      </div>
    </section>
  );
}

export default Hero;