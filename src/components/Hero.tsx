export function Hero() {
  return (
    <div className="text-center max-w-3xl mx-auto pt-10 pb-8 px-4">
      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-6 backdrop-blur-sm">
        <span className="flex h-1.5 w-1.5 rounded-full bg-sky-400"></span>
        <span>Decentralized Identity & Proof of Early Adoption</span>
      </div>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
        Your Achievements,{" "}
        <span className="bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
          On-Chain
        </span>
      </h1>
      <p className="mt-5 text-base sm:text-lg text-slate-300/90 leading-relaxed max-w-2xl mx-auto">
        Claim your verifiable digital achievement badge recorded permanently on
        the Botchain blockchain. Each wallet can claim the badge only once.
      </p>
    </div>
  );
}
