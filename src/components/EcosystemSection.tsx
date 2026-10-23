import { CHAINBADGE_CONTRACT_ADDRESS } from "@/config/contract";
import { ExternalLink, Globe, Compass, ShieldCheck } from "lucide-react";

export function EcosystemSection() {
  return (
    <section id="ecosystem" className="w-full max-w-4xl mx-auto px-4 mt-16 mb-8">
      {/* Container with glowing border */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header with BOT Chain Logo & Name */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center space-x-3.5">
            {/* BOT Chain official logo emblem */}
            <div className="relative h-12 w-12 rounded-2xl bg-black border border-emerald-500/40 p-1.5 shadow-lg shadow-emerald-500/20 flex items-center justify-center overflow-hidden">
              <img
                src="/botchain-logo.png"
                alt="BOT Chain Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-white tracking-tight">
                  BOT Chain
                </span>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                  Mainnet (Chain ID: 677)
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Powered by high-performance EVM architecture & ultra-low gas
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs text-slate-400 bg-slate-950/60 px-3 py-1.5 rounded-xl border border-slate-800">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Mainnet Operational</span>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {/* BOT Chain Website Card */}
          <a
            id="botchain-website-card"
            href="https://botchain.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-5 rounded-2xl bg-gradient-to-b from-slate-800/40 to-slate-900/60 hover:from-slate-800/70 hover:to-slate-900/90 border border-slate-800 hover:border-emerald-500/50 transition-all shadow-md hover:shadow-emerald-500/10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="h-10 w-10 rounded-xl bg-black border border-emerald-500/30 flex items-center justify-center p-1.5 group-hover:scale-105 transition-transform shadow-inner">
                  <img
                    src="/botchain-logo.png"
                    alt="BOT Chain Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex items-center space-x-1 text-xs text-emerald-400 font-medium group-hover:translate-x-0.5 transition-transform">
                  <span>Visit Portal</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </div>
              </div>
              <h3 className="text-base font-semibold text-white group-hover:text-emerald-300 transition-colors flex items-center space-x-2">
                <img
                  src="/botchain-logo.png"
                  alt="BOT Chain Logo"
                  className="h-4 w-4 object-contain inline-block rounded"
                />
                <span>BOT Chain Official Website</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Explore the official ecosystem portal, roadmap, technical whitepaper, and native architecture.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 font-mono text-[11px] text-emerald-400/90 group-hover:text-emerald-300 transition-colors flex items-center space-x-1.5">
              <span>https://botchain.ai</span>
            </div>
          </a>

          {/* BOT Chain Explorer Card */}
          <a
            id="botchain-explorer-card"
            href="https://scan.botchain.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-5 rounded-2xl bg-gradient-to-b from-slate-800/40 to-slate-900/60 hover:from-slate-800/70 hover:to-slate-900/90 border border-slate-800 hover:border-emerald-500/50 transition-all shadow-md hover:shadow-emerald-500/10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="h-10 w-10 rounded-xl bg-black border border-emerald-500/30 flex items-center justify-center p-1.5 group-hover:scale-105 transition-transform shadow-inner">
                  <img
                    src="/botchain-logo.png"
                    alt="BOT Chain Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex items-center space-x-1 text-xs text-emerald-400 font-medium group-hover:translate-x-0.5 transition-transform">
                  <span>Explore Blocks</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </div>
              </div>
              <h3 className="text-base font-semibold text-white group-hover:text-emerald-300 transition-colors flex items-center space-x-2">
                <img
                  src="/botchain-logo.png"
                  alt="BOT Chain Logo"
                  className="h-4 w-4 object-contain inline-block rounded"
                />
                <span>BOT Chain Block Explorer</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Inspect real-time blocks, track token transactions, view wallet balances, and verify smart contracts.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 font-mono text-[11px] text-emerald-400/90 group-hover:text-emerald-300 transition-colors flex items-center space-x-1.5">
              <span>https://scan.botchain.ai</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
