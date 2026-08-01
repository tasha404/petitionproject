function SignButton() {
  return (
    <button className="bell-mt neon-button mt-8 w-full rounded-2xl py-4 text-lg font-semibold text-white shadow-[0_0_30px_rgba(34,211,238,0.25)] transition duration-300">
      <span className="flex items-center justify-center gap-2">
        Sign Petition
        <span className="text-base">→</span>
      </span>
    </button>
  );
}

export default SignButton;