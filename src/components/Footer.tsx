import { CHAINBADGE_CONTRACT_ADDRESS } from "@/config/contract";
import { botchainTestnet } from "@/config/chain";
import { ExternalLink, Database, Cpu } from "lucide-react";

export function Footer() {
  const isContractConfigured =
    Boolean(CHAINBADGE_CONTRACT_ADDRESS) &&
    CHAINBADGE_CONTRACT_ADDRESS.length === 42 &&
    CHAINBADGE_CONTRACT_ADDRESS !== "0x0000000000000000000000000000000000000000";

  return (
    <footer className="mt-auto border-t border-white/5 py-8 text-xs text-slate-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Network info */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 text-slate-400">
            <Cpu className="h-3.5 w-3.5 text-sky-400" />
            <span>Network: Botchain (Chain ID: {botchainTestnet.id})</span>
          </div>
          <span>•</span>
          <a
            href="https://rpc.bohr.life"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-slate-200 transition"
          >
            RPC: rpc.bohr.life
          </a>
        </div>

        {/* Contract Info */}
        <div className="flex items-center space-x-2">
          <Database className="h-3.5 w-3.5 text-slate-400" />
          <span>Contract:</span>
          {isContractConfigured ? (
            <a
              href={`https://scan.bohr.life/address/${CHAINBADGE_CONTRACT_ADDRESS}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sky-400 hover:text-sky-300 flex items-center space-x-1"
            >
              <span>
                {CHAINBADGE_CONTRACT_ADDRESS.substring(0, 8)}...
                {CHAINBADGE_CONTRACT_ADDRESS.substring(
                  CHAINBADGE_CONTRACT_ADDRESS.length - 6
                )}
              </span>
              <ExternalLink className="h-3 w-3" />
            </a>
          ) : (
            <span className="text-amber-400 font-mono">Not configured</span>
          )}
        </div>
      </div>
    </footer>
  );
}
