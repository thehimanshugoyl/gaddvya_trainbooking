"use client";

import { useState } from "react";
import Link from "next/link";
import IrctcNavBar from "@/components/IrctcNavBar";
import TatkalCountdownWidget from "@/components/TatkalCountdownWidget";
import LiveTrainTrackerModal from "@/components/LiveTrainTrackerModal";
import ECateringModal from "@/components/ECateringModal";
import RailAlertsModal from "@/components/RailAlertsModal";
import NetworkRouteVisualizer from "@/components/NetworkRouteVisualizer";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useAuthStore } from "@/store/useAuthStore";

export default function Home() {
  const { lang, t } = useLanguageStore();
  const { user } = useAuthStore();

  const [showLiveTracker, setShowLiveTracker] = useState(false);
  const [trackerTrainNumber, setTrackerTrainNumber] = useState("22436");
  const [showECatering, setShowECatering] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);

  const handleTrackSpecificTrain = (trainNo: string) => {
    setTrackerTrainNumber(trainNo);
    setShowLiveTracker(true);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col justify-between transition-colors">
      {/* IRCTC-Style Official Navigation Bar */}
      <IrctcNavBar />

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full flex flex-col items-center justify-center text-center">
        {/* Release Pill */}
        <div className="inline-flex items-center gap-2 bg-zinc-900/80 border border-zinc-750 px-4 py-1.5 rounded-full mb-6 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-xs text-zinc-300 font-medium">
            {t("heroPill")}
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4 max-w-4xl leading-tight">
          {t("heroTitle1")} <br />
          <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent dark:from-white dark:via-zinc-200 dark:to-zinc-400 light:from-zinc-900 light:via-black light:to-zinc-800">
            {t("heroTitle2")}
          </span>
        </h1>

        <p className="text-gray-400 text-base sm:text-xl max-w-2xl mb-8 leading-relaxed">
          {t("heroSubtitle")}
        </p>

        {/* Live Tatkal Countdown Banner Widget */}
        <div className="w-full max-w-4xl mb-8">
          <TatkalCountdownWidget />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-3 sm:gap-4 justify-center mb-12">
          <Link
            href="/search"
            className="bg-white text-black hover:bg-zinc-200 px-8 py-3.5 rounded-2xl font-extrabold text-base sm:text-lg transition shadow-xl shadow-white/10 dark:bg-white dark:text-black light:bg-black light:text-white flex items-center gap-2 cursor-pointer"
          >
            <span>🔍 {t("searchBtn")}</span>
          </Link>
          <button
            onClick={() => handleTrackSpecificTrain("22436")}
            className="bg-zinc-900 hover:bg-zinc-850 text-white border border-zinc-700 px-6 py-3.5 rounded-2xl font-semibold text-base sm:text-lg transition flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>📡 {t("liveRunningStatus")}</span>
          </button>
          <button
            onClick={() => setShowECatering(true)}
            className="bg-amber-950/60 hover:bg-amber-900/60 text-amber-200 border border-amber-700/60 px-6 py-3.5 rounded-2xl font-semibold text-base sm:text-lg transition flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <span>🍱 {t("eCateringMeals")}</span>
          </button>
          <Link
            href="/wallet"
            className="bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/40 px-6 py-3.5 rounded-2xl font-semibold text-base sm:text-lg transition flex items-center gap-2 cursor-pointer"
          >
            <span>💳 {t("wallet")}</span>
          </Link>
          <Link
            href="/pnr"
            className="bg-gray-900 hover:bg-gray-800 text-gray-300 border border-gray-800 px-6 py-3.5 rounded-2xl font-semibold text-base sm:text-lg transition flex items-center gap-2 cursor-pointer"
          >
            <span>🎫 {t("pnrBtn")}</span>
          </Link>
        </div>

        {/* Key Features Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full text-left mt-2">
          <div
            onClick={() => handleTrackSpecificTrain("22436")}
            className="bg-zinc-950/80 border border-zinc-800 hover:border-zinc-500 p-5 rounded-2xl transition cursor-pointer hover:bg-zinc-900 group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">📡</span>
              <span className="text-[10px] font-bold bg-zinc-850 text-zinc-200 px-2 py-0.5 rounded-full border border-zinc-700">
                GPS LIVE
              </span>
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-zinc-200 transition mb-1">
              {t("liveGpsTracker")}
            </h3>
            <p className="text-xs text-gray-400">
              {t("cardGpsDesc")}
            </p>
          </div>

          <div
            onClick={() => setShowECatering(true)}
            className="bg-slate-900/70 border border-slate-800 hover:border-amber-500/50 p-5 rounded-2xl transition cursor-pointer hover:bg-slate-850/80 group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">🍱</span>
              <span className="text-[10px] font-bold bg-amber-900/60 text-amber-300 px-2 py-0.5 rounded-full border border-amber-700/50">
                IRCTC
              </span>
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition mb-1">
              {t("eCateringMeals")}
            </h3>
            <p className="text-xs text-gray-400">
              {t("cardMealsDesc")}
            </p>
          </div>

          <Link
            href="/wallet"
            className="bg-slate-900/70 border border-slate-800 hover:border-emerald-500/50 p-5 rounded-2xl transition hover:bg-slate-850/80 group block"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">💳</span>
              <span className="text-[10px] font-bold bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-700/50">
                ZERO FEE
              </span>
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition mb-1">
              {t("walletTitle")}
            </h3>
            <p className="text-xs text-gray-400">
              {t("cardWalletDesc")}
            </p>
          </Link>

          <Link
            href="/pnr"
            className="bg-slate-900/70 border border-slate-800 hover:border-purple-500/50 p-5 rounded-2xl transition hover:bg-slate-850/80 group block"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">🎫</span>
              <span className="text-[10px] font-bold bg-purple-900/60 text-purple-300 px-2 py-0.5 rounded-full border border-purple-700/50">
                VERIFIED
              </span>
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition mb-1">
              {t("pnrStatus")}
            </h3>
            <p className="text-xs text-gray-400">
              {t("cardPnrDesc")}
            </p>
          </Link>
        </div>

        {/* ── INTERACTIVE LIVE NETWORK TELEMETRY & CORRIDORS VISUALIZER ── */}
        <NetworkRouteVisualizer onTrackTrain={handleTrackSpecificTrain} />
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-850 bg-black py-6 px-4 text-center text-xs text-slate-500">
        <p className="max-w-2xl mx-auto">
          {t("officialPlatform")} • {t("ministryRailways")}
        </p>
      </footer>

      {/* Modals */}
      <LiveTrainTrackerModal
        isOpen={showLiveTracker}
        initialTrainNumber={trackerTrainNumber}
        onClose={() => setShowLiveTracker(false)}
      />
      <ECateringModal isOpen={showECatering} onClose={() => setShowECatering(false)} />
      <RailAlertsModal isOpen={showAlerts} onClose={() => setShowAlerts(false)} />
    </div>
  );
}
