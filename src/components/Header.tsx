"use client";

import { useState } from "react";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { botchainMainnet } from "@/config/chain";
import { CHAINBADGE_CONTRACT_ADDRESS } from "@/config/contract";
import { ShieldCheck, Wallet, ChevronDown, LogOut, RefreshCw, AlertTriangle, ExternalLink } from "lucide-react";

export function Header() {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: isSwitching } = useSwitchChain();

  const [menuOpen, setMenuOpen] = useState(false);

  const isWrongNetwork = isConnected && chain?.id !== botchainMainnet.id;

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <header className="w-full border-b border-white/10 backdrop-blur-md bg-slate-950/60 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-sky-400 to-emerald-400 p-[2px] shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="h-6 w-6 text-sky-400" />
            </div>
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-sky-400 bg-clip-text text-transparent">
              ChainBadge
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 font-medium">
              Botchain Mainnet
            </span>
          </div>
        </div>

        {/* Network & Wallet Controls */}
        <div className="flex items-center space-x-2 sm:space-x-2.5">
          {/* Main BOT Chain Website Link */}
          <a
            id="header-website-link"
            href="https://botchain.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-200 hover:text-emerald-300 bg-slate-900/90 hover:bg-slate-850 border border-slate-700/80 hover:border-emerald-500/50 transition shadow-sm"
            title="Official BOT Chain Website (botchain.ai)"
          >
            <img
              src="/botchain-logo.png"
              alt="BOT Chain Logo"
              className="h-4 w-4 object-contain rounded"
            />
            <span>botchain.ai</span>
            <ExternalLink className="h-3 w-3 text-slate-400" />
          </a>

          {/* BOT Chain Mainnet Explorer Link */}
          <a
            id="header-explorer-link"
            href={
              CHAINBADGE_CONTRACT_ADDRESS && CHAINBADGE_CONTRACT_ADDRESS.length === 42
                ? `https://scan.botchain.ai/address/${CHAINBADGE_CONTRACT_ADDRESS}`
                : "https://scan.botchain.ai"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-400 hover:text-emerald-300 bg-slate-900/90 hover:bg-slate-850 border border-emerald-500/40 hover:border-emerald-400 transition shadow-sm"
            title="View Contract on BOT Chain Mainnet Explorer"
          >
            <img
              src="/botchain-logo.png"
              alt="BOT Chain Logo"
              className="h-4 w-4 object-contain rounded"
            />
            <span>Explorer</span>
            <ExternalLink className="h-3 w-3 text-slate-400" />
          </a>

          {isConnected && (
            <div className="hidden lg:flex items-center space-x-2 text-xs px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
              <div
                className={`w-2 h-2 rounded-full ${
                  isWrongNetwork ? "bg-amber-400 animate-pulse" : "bg-emerald-400"
                }`}
              />
              <span className="text-slate-300 font-medium">
                {isWrongNetwork ? "Wrong Network" : botchainMainnet.name}
              </span>
            </div>
          )}

          {isWrongNetwork ? (
            <button
              id="switch-network-btn"
              onClick={() => switchChain({ chainId: botchainMainnet.id })}
              disabled={isSwitching}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition shadow-sm"
            >
              <AlertTriangle className="h-4 w-4" />
              <span>{isSwitching ? "Switching..." : "Switch to Mainnet"}</span>
            </button>
          ) : !isConnected ? (
            <button
              id="connect-wallet-btn"
              onClick={() => {
                const connector = connectors[0];
                if (connector) connect({ connector });
              }}
              disabled={isConnecting}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-sky-600 to-cyan-500 hover:from-indigo-500 hover:via-sky-500 hover:to-cyan-400 shadow-md shadow-sky-600/25 hover:shadow-sky-500/40 transition active:scale-[0.98] disabled:opacity-50"
            >
              {isConnecting ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <Wallet className="h-4 w-4" />
                  <span>Connect Wallet</span>
                </>
              )}
            </button>
          ) : (
            <div className="relative">
              <button
                id="wallet-dropdown-btn"
                onClick={() => setMenuOpen(!menuOpen)}
                className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-xl text-sm font-medium bg-slate-900/90 hover:bg-slate-850 text-slate-200 border border-slate-700/80 shadow-sm transition"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="font-mono">{address && formatAddress(address)}</span>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-2 z-50">
                  <div className="px-3 py-2 border-b border-slate-800 text-xs text-slate-400">
                    Connected to Botchain Mainnet
                  </div>
                  <button
                    id="disconnect-wallet-btn"
                    onClick={() => {
                      disconnect();
                      setMenuOpen(false);
                    }}
                    className="w-full mt-1 flex items-center space-x-2 px-3 py-2 rounded-lg text-sm text-rose-400 hover:bg-rose-950/30 transition text-left"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Disconnect</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
