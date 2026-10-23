"use client";

import { useEffect, useState } from "react";
import {
  useAccount,
  useConnect,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useSwitchChain,
} from "wagmi";
import { CHAINBADGE_ABI, CHAINBADGE_CONTRACT_ADDRESS } from "@/config/contract";
import { botchainMainnet } from "@/config/chain";
import {
  Award,
  CheckCircle2,
  Clock,
  ExternalLink,
  Loader2,
  AlertCircle,
  Sparkles,
  User,
  Hash,
  Wallet,
} from "lucide-react";

export function BadgeCard() {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors } = useConnect();
  const { switchChain } = useSwitchChain();

  const isContractConfigured =
    Boolean(CHAINBADGE_CONTRACT_ADDRESS) &&
    CHAINBADGE_CONTRACT_ADDRESS.length === 42 &&
    CHAINBADGE_CONTRACT_ADDRESS !== "0x0000000000000000000000000000000000000000";

  const isWrongNetwork = isConnected && chain?.id !== botchainMainnet.id;

  // Read claim status for connected wallet
  const {
    data: claimData,
    refetch: refetchClaim,
    isLoading: isCheckingClaim,
  } = useReadContract({
    address: CHAINBADGE_CONTRACT_ADDRESS,
    abi: CHAINBADGE_ABI,
    functionName: "getClaim",
    args: address ? [address] : undefined,
    query: {
      enabled: isConnected && !!address && isContractConfigured,
    },
  });

  // Read total claims across the contract
  const {
    data: totalClaims,
    refetch: refetchTotalClaims,
  } = useReadContract({
    address: CHAINBADGE_CONTRACT_ADDRESS,
    abi: CHAINBADGE_ABI,
    functionName: "totalClaims",
    query: {
      enabled: isContractConfigured,
    },
  });

  // Contract write mutation
  const {
    writeContract,
    data: txHash,
    isPending: isSubmitting,
    error: writeError,
    reset: resetWrite,
  } = useWriteContract();

  // Wait for transaction receipt
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: confirmError,
  } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  // Refetch data when transaction confirms
  useEffect(() => {
    if (isConfirmed) {
      refetchClaim();
      refetchTotalClaims();
    }
  }, [isConfirmed, refetchClaim, refetchTotalClaims]);

  const hasClaimed = Boolean(claimData?.[0]);
  const claimTimestamp = claimData?.[1] ? Number(claimData[1]) : 0;
  const isBusy = isSubmitting || isConfirming;

  const handleClaim = () => {
    resetWrite();
    if (!isContractConfigured) return;
    writeContract({
      address: CHAINBADGE_CONTRACT_ADDRESS,
      abi: CHAINBADGE_ABI,
      functionName: "claimBadge",
    });
  };

  const formatTimestamp = (timestampSec: number) => {
    if (!timestampSec) return "N/A";
    const date = new Date(timestampSec * 1000);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const getCleanErrorMessage = () => {
    const err = writeError || confirmError;
    if (!err) return null;
    const msg = err.message || "";
    if (msg.includes("User rejected") || msg.includes("User denied")) {
      return "Transaction was cancelled in your wallet.";
    }
    if (msg.includes("ChainBadge: Badge already claimed")) {
      return "Badge already claimed by this wallet.";
    }
    if (msg.includes("insufficient funds")) {
      return "Insufficient BOT funds to cover transaction gas on Botchain Mainnet.";
    }
    return msg.length > 120 ? `${msg.slice(0, 120)}...` : msg;
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4">
      {/* Contract configuration alert if missing */}
      {!isContractConfigured && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm flex items-start space-x-3 backdrop-blur-md">
          <AlertCircle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-300">
              Contract Address Not Configured
            </p>
            <p className="text-xs text-amber-200/80 mt-1 leading-relaxed">
              Deploy the contract to Botchain Mainnet using Hardhat, then set{" "}
              <code className="px-1.5 py-0.5 rounded bg-amber-950/80 border border-amber-800 text-amber-300">
                NEXT_PUBLIC_CONTRACT_ADDRESS
              </code>{" "}
              in your environment or <code className="text-amber-300">.env.local</code>.
            </p>
          </div>
        </div>
      )}

      {/* Main Badge Card */}
      <div className="relative rounded-3xl p-6 sm:p-8 glass-panel-glow border border-slate-700/60 transition-all shadow-2xl">
        {/* Glow halo */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Badge Medal Visual */}
        <div className="relative mx-auto w-32 h-32 sm:w-36 sm:h-36 mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500 via-indigo-600 to-fuchsia-500 opacity-30 blur-xl animate-pulse" />
          <div className="relative w-full h-full rounded-full p-[2px] bg-gradient-to-b from-sky-400 via-indigo-500 to-purple-600 shadow-xl">
            <div className="w-full h-full rounded-full bg-gradient-to-b from-slate-900 to-slate-950 flex flex-col items-center justify-center p-4 text-center">
              <Award className="h-12 w-12 sm:h-14 sm:w-14 text-sky-400 mb-1 drop-shadow-[0_0_12px_rgba(56,189,248,0.6)]" />
              <div className="flex items-center space-x-1 text-[11px] font-semibold text-sky-300 uppercase tracking-wider">
                <Sparkles className="h-3 w-3" />
                <span>Tier 1</span>
              </div>
            </div>
          </div>
        </div>

        {/* Badge Information */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs text-slate-300 font-medium mb-3">
            <Hash className="h-3 w-3 text-sky-400" />
            <span>
              Total Claimed:{" "}
              <strong className="text-white">
                {totalClaims !== undefined ? totalClaims.toString() : "--"}
              </strong>
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Early Achiever
          </h2>
          <p className="mt-2 text-sm text-slate-400 leading-relaxed max-w-md mx-auto">
            Awarded to early pioneers of the Botchain ecosystem. Verified and
            recorded forever on the blockchain ledger.
          </p>

          {/* Mainnet Explorer Contract Link */}
          {isContractConfigured && (
            <div className="mt-3">
              <a
                id="mainnet-explorer-contract-btn"
                href={`https://scan.botchain.ai/address/${CHAINBADGE_CONTRACT_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 hover:bg-emerald-900/40 hover:text-emerald-300 transition shadow-sm"
              >
                <img
                  src="/botchain-logo.png"
                  alt="BOT Chain Logo"
                  className="h-3.5 w-3.5 object-contain rounded"
                />
                <span>Verified on Botchain Mainnet Explorer</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-slate-800/80" />

        {/* Status Display Area */}
        <div className="space-y-4">
          {!isConnected ? (
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
              <p className="text-sm text-slate-400 mb-3">
                Connect your Web3 wallet to check status and claim your badge.
              </p>
              <button
                id="card-connect-wallet-btn"
                onClick={() => {
                  const connector = connectors[0];
                  if (connector) connect({ connector });
                }}
                className="w-full py-3 px-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 transition shadow-lg shadow-indigo-600/25 flex items-center justify-center space-x-2"
              >
                <Wallet className="h-4 w-4" />
                <span>Connect Wallet to Claim</span>
              </button>
            </div>
          ) : isWrongNetwork ? (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
              <p className="text-sm text-amber-200 mb-3">
                Your wallet is connected to an unsupported network. Please switch
                to Botchain Mainnet (Chain ID: 677).
              </p>
              <button
                id="card-switch-network-btn"
                onClick={() => switchChain({ chainId: botchainMainnet.id })}
                className="w-full py-3 px-4 rounded-xl font-semibold text-sm text-amber-950 bg-amber-400 hover:bg-amber-300 transition shadow-md flex items-center justify-center space-x-2"
              >
                <span>Switch to Botchain Mainnet</span>
              </button>
            </div>
          ) : isCheckingClaim ? (
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 flex items-center justify-center space-x-3 text-slate-400 text-sm">
              <Loader2 className="h-5 w-5 animate-spin text-sky-400" />
              <span>Verifying on-chain badge registry...</span>
            </div>
          ) : hasClaimed ? (
            /* Claimed State */
            <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-4">
              <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-base">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <span>Badge Successfully Claimed!</span>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center space-x-1.5">
                    <User className="h-3.5 w-3.5" />
                    <span>Claimant Address:</span>
                  </span>
                  <span className="font-mono text-slate-200 truncate max-w-[200px] sm:max-w-[260px]">
                    {address}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center space-x-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Claim Timestamp:</span>
                  </span>
                  <span className="text-slate-200 font-medium">
                    {formatTimestamp(claimTimestamp)}
                  </span>
                </div>
              </div>

              <div className="pt-1">
                <a
                  id="explorer-address-link"
                  href={`https://scan.botchain.ai/address/${address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-emerald-400 bg-emerald-950/50 border border-emerald-800/60 hover:bg-emerald-900/50 hover:border-emerald-700 transition"
                >
                  <img
                    src="/botchain-logo.png"
                    alt="BOT Chain"
                    className="h-3.5 w-3.5 object-contain rounded"
                  />
                  <span>View Claimant on Botchain Explorer</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ) : (
            /* Unclaimed State */
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                <span>Status:</span>
                <span className="text-amber-400 font-medium bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-800/50">
                  Not Claimed
                </span>
              </div>

              <button
                id="claim-badge-btn"
                onClick={handleClaim}
                disabled={isBusy || !isContractConfigured}
                className="w-full py-3.5 px-6 rounded-2xl font-semibold text-base text-white bg-gradient-to-r from-indigo-600 via-sky-600 to-cyan-500 hover:from-indigo-500 hover:via-sky-500 hover:to-cyan-400 shadow-lg shadow-sky-600/30 hover:shadow-sky-500/50 transition active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Confirm in Wallet...</span>
                  </>
                ) : isConfirming ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Verifying on Botchain...</span>
                  </>
                ) : (
                  <>
                    <Award className="h-5 w-5" />
                    <span>Claim Early Achiever Badge</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Feedback messages */}
          {isBusy && (
            <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-xs text-sky-300 flex items-center space-x-2.5 animate-pulse">
              <Loader2 className="h-4 w-4 animate-spin shrink-0" />
              <span>
                {isSubmitting
                  ? "Please confirm the transaction in your connected wallet..."
                  : "Transaction submitted! Waiting for block confirmation on Botchain..."}
              </span>
            </div>
          )}

          {isConfirmed && txHash && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-2">
              <div className="flex items-center space-x-2 text-emerald-400 font-semibold">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Transaction confirmed on-chain!</span>
              </div>
              <p className="text-slate-300">
                Your achievement badge has been successfully written to the Botchain ledger.
              </p>
              <a
                id="explorer-tx-link"
                href={`https://scan.botchain.ai/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-emerald-400 hover:text-emerald-300 font-medium underline underline-offset-2"
              >
                <img
                  src="/botchain-logo.png"
                  alt="BOT Chain"
                  className="h-3.5 w-3.5 object-contain rounded"
                />
                <span>View Transaction on BOT Chain Explorer</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          )}

          {getCleanErrorMessage() && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 flex items-start space-x-2.5">
              <AlertCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold text-rose-200">Transaction Failed</p>
                <p className="text-rose-300/90">{getCleanErrorMessage()}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
