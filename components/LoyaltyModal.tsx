"use client";

import React, { useState } from "react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useAuthStore } from "@/store/useAuthStore";

interface LoyaltyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoyaltyModal({ isOpen, onClose }: LoyaltyModalProps) {
  const { lang, t } = useLanguageStore();
  const { user } = useAuthStore();

  const [points, setPoints] = useState(580);
  const [activeVoucher, setActiveVoucher] = useState<{ title: string; code: string } | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const perks = [
    {
      id: "upgrade",
      title: t("perkUpgrade"),
      cost: 200,
      icon: "💺",
      color: "from-blue-600 to-indigo-700",
      desc: "Instant berth upgrade from Sleeper to 3A or 2A to 1A on chart prep.",
    },
    {
      id: "lounge",
      title: t("perkLounge"),
      cost: 150,
      icon: "🛋️",
      color: "from-amber-600 to-yellow-700",
      desc: "Complimentary 2-hour access to IRCTC Executive Lounges with buffet.",
    },
    {
      id: "meal",
      title: t("perkMeal"),
      cost: 100,
      icon: "🍱",
      color: "from-emerald-600 to-teal-700",
      desc: "Free Maharaja Veg/Non-Veg pantry thali delivered to berth.",
    },
    {
      id: "cancel",
      title: t("perkCancel"),
      cost: 100,
      icon: "🛡️",
      color: "from-purple-600 to-pink-700",
      desc: "100% full refund guarantee with zero IRCTC clerkage deductions.",
    },
  ];

  const handleRedeem = (perk: (typeof perks)[0]) => {
    if (points < perk.cost) {
      alert("Insufficient reward points.");
      return;
    }
    const newPoints = points - perk.cost;
    setPoints(newPoints);
    const code = `RC-${perk.id.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
    setActiveVoucher({ title: perk.title, code });
    setCopied(false);
  };

  const copyCode = () => {
    if (activeVoucher?.code) {
      navigator.clipboard.writeText(activeVoucher.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl bg-gray-900 border border-amber-600/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-yellow-800 p-6 text-white flex justify-between items-start shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-black/30 text-amber-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <span>👑</span> {t("activeGoldMember")}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black flex items-center gap-2">
              <span>{t("loyaltyTitle")}</span>
            </h3>
            <p className="text-xs text-amber-100 mt-1 max-w-lg">
              {t("loyaltySubtitle")}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition cursor-pointer text-sm"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Active Voucher Toast */}
          {activeVoucher && (
            <div className="bg-gradient-to-r from-emerald-950/90 to-teal-950/90 border border-emerald-500/60 p-4 rounded-2xl shadow-xl text-emerald-200 animate-fadeIn">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎉</span>
                  <div>
                    <h4 className="text-sm font-bold text-white">{t("redeemSuccess")}</h4>
                    <p className="text-xs text-emerald-300 mt-0.5">{activeVoucher.title}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider text-emerald-400 block font-mono">
                    {t("voucherCode")}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-mono text-sm font-black bg-black/40 px-3 py-1 rounded-lg border border-emerald-500/40 text-emerald-300">
                      {activeVoucher.code}
                    </span>
                    <button
                      onClick={copyCode}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-2.5 py-1 rounded-lg font-bold transition cursor-pointer"
                    >
                      {copied ? "✓ Copied" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Virtual Rail Citizen Gold Card */}
          <div className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-amber-950 via-zinc-900 to-yellow-950 border-2 border-amber-500/60 shadow-2xl text-white">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🇮🇳</span>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-amber-300 uppercase font-bold block">
                      Indian Railways Pass
                    </span>
                    <span className="text-xs font-bold text-slate-300">
                      {t("loyaltyTier")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Gold Chip Emblem */}
              <div className="w-12 h-9 rounded-md bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-500 border border-amber-300 shadow-md flex items-center justify-center p-1">
                <div className="w-full h-full border border-amber-600/40 rounded flex items-center justify-center">
                  <span className="text-[9px] font-mono font-bold text-amber-900">CHIP</span>
                </div>
              </div>
            </div>

            {/* Member Details */}
            <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
              <div>
                <span className="text-[10px] text-amber-300/80 uppercase font-mono block">
                  Passenger Name
                </span>
                <span className="text-base font-extrabold text-white">
                  {user?.name || "Verified Citizen Passenger"}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-amber-300/80 uppercase font-mono block">
                  {t("memberIdLabel")}
                </span>
                <span className="font-mono text-sm font-bold text-amber-200">
                  IR-RC-7819-2026
                </span>
              </div>
            </div>

            {/* Points Balance Footer Strip */}
            <div className="pt-3 border-t border-amber-500/30 flex justify-between items-center text-xs">
              <div>
                <span className="text-[10px] text-amber-300/70 font-mono uppercase block">
                  {t("rewardPoints")}
                </span>
                <div className="text-2xl font-black text-amber-300 font-mono">
                  {points} <span className="text-xs text-amber-200/80 font-normal">{t("ptsCost")} (₹{points})</span>
                </div>
              </div>
              <div className="text-right text-[11px] text-amber-300/80 font-mono">
                <span>{t("validTill")}: 31 Dec 2027</span>
              </div>
            </div>
          </div>

          {/* Perks Grid */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
              <span>🎁</span> {t("redeemPerk")}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {perks.map((perk) => {
                const canAfford = points >= perk.cost;
                return (
                  <div
                    key={perk.id}
                    className="bg-zinc-950 border border-zinc-800 hover:border-amber-600/50 p-4 rounded-2xl flex flex-col justify-between transition shadow-md"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-1.5">
                        <span className="text-2xl">{perk.icon}</span>
                        <span className="font-mono text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">
                          {perk.cost} {t("ptsCost")}
                        </span>
                      </div>
                      <h5 className="text-sm font-bold text-white">{perk.title}</h5>
                      <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                        {perk.desc}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRedeem(perk)}
                      disabled={!canAfford}
                      className="mt-3 w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 disabled:opacity-40 disabled:cursor-not-allowed text-black font-bold py-2 rounded-xl text-xs transition cursor-pointer shadow-md"
                    >
                      {canAfford ? `${t("redeemPerk")} (${perk.cost} pts)` : "Insufficient Points"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* How to Earn Points Note */}
          <div className="bg-zinc-950/80 border border-zinc-800 p-4 rounded-2xl text-xs text-gray-300">
            <h5 className="font-bold text-amber-300 flex items-center gap-1.5 mb-1">
              <span>💡</span> {t("howToEarn")}
            </h5>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              {t("earnRule")}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex justify-between items-center text-xs text-gray-400 shrink-0">
          <span>👑 IRCTC Rail Citizen Pass</span>
          <button
            onClick={onClose}
            className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-1.5 rounded-xl font-semibold transition cursor-pointer"
          >
            {t("closeBtn")}
          </button>
        </div>
      </div>
    </div>
  );
}
