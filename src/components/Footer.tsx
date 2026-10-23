import { CHAINBADGE_CONTRACT_ADDRESS } from "@/config/contract";
import { botchainMainnet } from "@/config/chain";
import { ExternalLink, Database, Cpu, Globe, Compass } from "lucide-react";

export function Footer() {
  const isContractConfigured =
    Boolean(CHAINBADGE_CONTRACT_ADDRESS) &&
    CHAINBADGE_CONTRACT_ADDRESS.length === 42 &&
    CHAINBADGE_CONTRACT_ADDRESS !== "0x0000000000000000000000000000000000000000";

  return (
    <footer className="mt-auto border-t border-white/10 bg-slate-950/80 backdrop-blur-md py-8 text-xs text-slate-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* BOT Chain Branding & Logo */}
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-xl bg-black border border-emerald-500/40 p-1 flex items-center justify-center shadow-md shadow-emerald-500/20 overflow-hidden">
              <img
                src="/botchain-logo.png"
                alt="BOT Chain Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-white text-sm tracking-tight">
                  BOT Chain
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                  Mainnet {botchainMainnet.id}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Sovereign decentralized achievement & identity primitive
              </p>
            </div>
          </div>

          {/* Official BOT Chain Ecosystem Links with Logo at the Front */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <a
              id="footer-botchain-website"
              href="https://botchain.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-200 hover:text-emerald-300 border border-slate-800 hover:border-emerald-500/40 transition shadow-sm"
              title="BOT Chain Official Website"
            >
              <img
                src="/botchain-logo.png"
                alt="BOT Chain Logo"
                className="h-4 w-4 object-contain rounded"
              />
              <span className="font-medium">BOT Chain Website</span>
              <ExternalLink className="h-3 w-3 text-slate-400" />
            </a>

            <a
              id="footer-botchain-explorer"
              href="https://scan.botchain.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-200 hover:text-emerald-300 border border-slate-800 hover:border-emerald-500/40 transition shadow-sm"
              title="BOT Chain Block Explorer"
            >
              <img
                src="/botchain-logo.png"
                alt="BOT Chain Logo"
                className="h-4 w-4 object-contain rounded"
              />
              <span className="font-medium">BOT Chain Explorer</span>
              <ExternalLink className="h-3 w-3 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Sub-bar with contract & technical info */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <div className="flex items-center space-x-3">
            <span>RPC: <code className="text-slate-300">rpc.botchain.ai</code></span>
            <span>•</span>
            <span>Native: <strong className="text-slate-300">BOT</strong></span>
          </div>

          <div className="flex items-center space-x-2">
            <Database className="h-3.5 w-3.5 text-slate-400" />
            <span>ChainBadge Contract:</span>
            {isContractConfigured ? (
              <a
                href={`https://scan.botchain.ai/address/${CHAINBADGE_CONTRACT_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-emerald-400 hover:text-emerald-300 flex items-center space-x-1"
              >
                <span>
                  {CHAINBADGE_CONTRACT_ADDRESS.substring(0, 10)}...
                  {CHAINBADGE_CONTRACT_ADDRESS.substring(
                    CHAINBADGE_CONTRACT_ADDRESS.length - 8
                  )}
                </span>
                <ExternalLink className="h-3 w-3" />
              </a>
            ) : (
              <span className="text-amber-400 font-mono">Not configured</span>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
