function Hero() {
  return (
    <section className="pt-36 pb-14 md:pt-44">
      <div className="chip">
        <span className="dot" />
        Los TashLee Petition Platform
      </div>

      <h1 className="display mt-6 text-[3.4rem] leading-[0.92] text-[var(--ink)] md:text-[6rem]">
        Ieqa Loop&rsquo;s
        <br />
        Community Voting
      </h1>

      <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-[var(--ink-soft)]">
        Petition to save Hyeok Park in Ieqa Loop, Los TashLee. Every signature is
        a verified wallet, recorded on-chain and impossible to fake or erase.
      </p>

      <div className="mt-7 flex flex-wrap gap-2.5">
        {["Save Our Hyeok Park", "Keep It Green", "One Wallet, One Voice"].map((t) => (
          <span key={t} className="chip text-[var(--ink)]">{t}</span>
        ))}
      </div>
    </section>
  );
}

export default Hero;