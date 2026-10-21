"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSelector from "@/components/LanguageSelector";
import { useAuthStore } from "@/store/useAuthStore";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useWalletStore } from "@/store/useWalletStore";
import LiveTrainTrackerModal from "@/components/LiveTrainTrackerModal";
import ECateringModal from "@/components/ECateringModal";
import RailAlertsModal from "@/components/RailAlertsModal";
import LoyaltyModal from "@/components/LoyaltyModal";
import ContactUsModal from "@/components/ContactUsModal";

export default function IrctcNavBar() {
  const { user, logout } = useAuthStore();
  const { balance } = useWalletStore();
  const { lang, t } = useLanguageStore();
  const router = useRouter();
  const pathname = usePathname();

  // Modals
  const [showLiveTracker, setShowLiveTracker] = useState(false);
  const [showECatering, setShowECatering] = useState(false);
  const [cateringCategory, setCateringCategory] = useState("all");
  const [showAlerts, setShowAlerts] = useState(false);
  const [showLoyalty, setShowLoyalty] = useState(false);
  const [showContactUs, setShowContactUs] = useState(false);

  // Dropdown states
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Live clock
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }) +
          " | " +
          now.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          }) +
          " IST"
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const isHome = pathname === "/";
  const isSearch = pathname === "/search";
  const isWallet = pathname === "/wallet";
  const isBookings = pathname === "/bookings";
  const isAdmin = pathname === "/admin";
  const isPnr = pathname === "/pnr";

  return (
    <>
      <header className="w-full bg-black border-b border-zinc-800 text-white z-40 relative shadow-xl">
        {/* ── 1. TOP RAIL SERVICE UTILITY STRIP ── */}
        <div className="bg-zinc-950/95 border-b border-zinc-850 px-4 sm:px-8 py-1.5 text-[11px] text-zinc-300 flex flex-wrap justify-between items-center gap-2">
          {/* Live Date / Time & Helpline */}
          <div className="flex items-center gap-4 flex-wrap">
            <span className="font-mono text-amber-300 font-semibold flex items-center gap-1">
              <span>🕒</span> {currentTime || "Live IST"}
            </span>
            <span className="hidden sm:inline text-zinc-600">•</span>
            <button
              onClick={() => setShowContactUs(true)}
              className="hidden sm:flex items-center gap-1 text-zinc-300 hover:text-white cursor-pointer"
            >
              <span>📞</span> {t("helplineText")}
            </button>
            <span className="hidden md:inline text-zinc-600">•</span>
            <button
              onClick={() => setShowAlerts(true)}
              className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>🚨 {t("liveRailAlerts")}</span>
            </button>
          </div>

          {/* Right Tools: Language, Theme, Role, Profile */}
          <div className="flex items-center gap-2.5 ml-auto">
            {/* Wallet pill if logged in */}
            {user && (
              <Link
                href="/wallet"
                className="bg-amber-950/80 hover:bg-amber-900/80 border border-amber-600/50 text-amber-300 px-2.5 py-0.5 rounded-full font-mono text-[11px] font-bold flex items-center gap-1 transition"
                title="GADDVYA Rail Wallet"
              >
                <span>💳</span>
                <span>₹{balance.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
              </Link>
            )}

            <LanguageSelector />
            <ThemeToggle />

            {user ? (
              <div className="flex items-center gap-2 pl-1 border-l border-zinc-800">
                <Link
                  href="/profile"
                  className="bg-zinc-850 hover:bg-zinc-750 px-2.5 py-0.5 rounded-full text-white font-medium flex items-center gap-1 transition"
                >
                  <span>👤</span>
                  <span className="max-w-[100px] truncate">{user.name}</span>
                </Link>
                {user.role === "admin" && (
                  <span className="bg-purple-950 border border-purple-700 text-purple-300 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">
                    Admin
                  </span>
                )}
                {user.role === "agent" && (
                  <span className="bg-amber-950 border border-amber-600 text-amber-300 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">
                    Agent
                  </span>
                )}
                <button
                  onClick={() => {
                    logout();
                    router.push("/login");
                  }}
                  className="text-red-400 hover:text-red-300 text-[11px] px-1 font-semibold cursor-pointer"
                >
                  {t("logout")}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 pl-1 border-l border-zinc-800">
                <Link
                  href="/login"
                  className="text-zinc-300 hover:text-white font-semibold transition"
                >
                  {t("login")}
                </Link>
                <Link
                  href="/register"
                  className="bg-white text-black hover:bg-zinc-200 px-2.5 py-0.5 rounded-full font-bold transition"
                >
                  {t("register")}
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* ── 2. OFFICIAL EMBLEMS & BRAND LOGO ROW ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex justify-between items-center gap-4">
          {/* Brand Identity */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link href="/" className="transition hover:opacity-95">
              <Logo size="md" />
            </Link>
            <div className="hidden lg:block border-l border-zinc-800 pl-3">
              <span className="text-[10px] font-mono tracking-widest text-emerald-400 font-bold uppercase block">
                {t("officialPlatform")}
              </span>
              <span className="text-xs text-zinc-300">
                {t("ministryRailways")}
              </span>
            </div>
          </div>

          {/* Official Crests */}
          <div className="flex items-center gap-3">
            {/* Quick Live GPS Status Action Button */}
            <button
              onClick={() => setShowLiveTracker(true)}
              className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>📡 {t("liveGpsTracker")}</span>
            </button>

            {/* Indian Railways Crest Badge */}
            <div
              className="w-10 h-10 rounded-full bg-red-700 border-2 border-white shadow-lg flex items-center justify-center p-1"
              title="Indian Railways Official Emblem"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                <circle cx="50" cy="50" r="46" stroke="#ffffff" strokeWidth="3" />
                <circle cx="50" cy="50" r="38" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 2" />
                <circle cx="50" cy="50" r="28" fill="#ffffff" />
                <path d="M40 55 L60 55 L58 42 L42 42 Z" fill="#b91c1c" />
                <rect x="44" y="38" width="12" height="4" fill="#b91c1c" />
                <circle cx="45" cy="57" r="3" fill="#ffffff" stroke="#b91c1c" strokeWidth="1" />
                <circle cx="55" cy="57" r="3" fill="#ffffff" stroke="#b91c1c" strokeWidth="1" />
              </svg>
            </div>
          </div>
        </div>

        {/* ── 3. THE ICONIC IRCTC BLUE NAVIGATION PILL BAR (From User Screenshot) ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-3" ref={dropdownRef}>
          <nav className="w-full bg-gradient-to-r from-black via-zinc-950 to-zinc-900 rounded-full px-4 sm:px-6 py-2 shadow-2xl border border-zinc-700/80 flex items-center justify-between overflow-x-auto text-xs sm:text-sm font-bold tracking-wide">
            <div className="flex items-center gap-1 sm:gap-4 shrink-0">
              {/* 1. HOME Tab */}
              <Link
                href="/"
                className={`px-3 py-1.5 uppercase transition relative whitespace-nowrap ${
                  isHome ? "text-white" : "text-zinc-300 hover:text-white"
                }`}
              >
                {t("navHome")}
                {isHome && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-white rounded-full shadow-sm" />
                )}
              </Link>

              {/* 2. TRAINS Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => toggleDropdown("trains")}
                  className={`px-3 py-1.5 uppercase flex items-center gap-1 transition cursor-pointer whitespace-nowrap ${
                    isSearch || isPnr || openDropdown === "trains"
                      ? "text-white"
                      : "text-zinc-300 hover:text-white"
                  }`}
                >
                  <span>{t("navTrains")}</span>
                  <span className="text-[10px]">⌄</span>
                </button>
                {openDropdown === "trains" && (
                  <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl p-2 z-50 animate-fadeIn">
                    <Link
                      href="/search"
                      onClick={() => setOpenDropdown(null)}
                      className="block p-2.5 rounded-xl hover:bg-zinc-900 text-xs text-zinc-200 hover:text-white font-medium"
                    >
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <span>🔍</span> {t("searchTrains")}
                      </div>
                      <span className="text-[11px] text-zinc-400">{t("subSearchTrains")}</span>
                    </Link>
                    <Link
                      href="/pnr"
                      onClick={() => setOpenDropdown(null)}
                      className="block p-2.5 rounded-xl hover:bg-zinc-900 text-xs text-zinc-200 hover:text-white font-medium"
                    >
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <span>🎫</span> {t("pnrStatus")}
                      </div>
                      <span className="text-[11px] text-zinc-400">{t("subPnrStatus")}</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setOpenDropdown(null);
                        setShowLiveTracker(true);
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-zinc-900 text-xs text-zinc-200 hover:text-white font-medium cursor-pointer"
                    >
                      <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                        <span>📡</span> {t("liveRunningStatus")}
                      </div>
                      <span className="text-[11px] text-zinc-400">{t("subLiveTracker")}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* 3. MEALS Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => toggleDropdown("meals")}
                  className={`px-3 py-1.5 uppercase flex items-center gap-1 transition cursor-pointer whitespace-nowrap ${
                    openDropdown === "meals" ? "text-white" : "text-zinc-300 hover:text-white"
                  }`}
                >
                  <span>{t("navMeals")}</span>
                  <span className="text-[10px]">⌄</span>
                </button>
                {openDropdown === "meals" && (
                  <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl p-2 z-50 animate-fadeIn">
                    <button
                      type="button"
                      onClick={() => {
                        setOpenDropdown(null);
                        setCateringCategory("all");
                        setShowECatering(true);
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-zinc-900 text-xs text-zinc-200 hover:text-white font-medium cursor-pointer"
                    >
                      <div className="font-bold text-orange-400 flex items-center gap-1.5">
                        <span>🍱</span> {t("eCateringMeals")}
                      </div>
                      <span className="text-[11px] text-zinc-400">{t("subEcatering")}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setOpenDropdown(null);
                        setCateringCategory("jain");
                        setShowECatering(true);
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-zinc-900 text-xs text-zinc-200 hover:text-white font-medium cursor-pointer"
                    >
                      <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                        <span>🥗</span> {t("catJain")}
                      </div>
                      <span className="text-[11px] text-zinc-400">{t("subJainFood")}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setOpenDropdown(null);
                        setCateringCategory("snacks");
                        setShowECatering(true);
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-zinc-900 text-xs text-zinc-200 hover:text-white font-medium cursor-pointer"
                    >
                      <div className="font-bold text-amber-300 flex items-center gap-1.5">
                        <span>🍕</span> {t("catSnacks")}
                      </div>
                      <span className="text-[11px] text-zinc-400">{t("subSnacksDelivery")}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* 4. LOYALTY (Interactive Modal & Dropdown) */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => toggleDropdown("loyalty")}
                  className={`px-3 py-1.5 uppercase flex items-center gap-1 transition cursor-pointer whitespace-nowrap ${
                    openDropdown === "loyalty" ? "text-white" : "text-zinc-300 hover:text-white"
                  }`}
                >
                  <span>{t("navLoyalty")}</span>
                  <span className="text-[10px]">⌄</span>
                </button>
                {openDropdown === "loyalty" && (
                  <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl p-3 z-50 animate-fadeIn text-xs">
                    <p className="font-bold text-amber-300 flex items-center gap-1.5">
                      <span>👑</span> {t("loyaltyTitle")}
                    </p>
                    <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                      {t("loyaltySubtitle")}
                    </p>
                    <div className="mt-2.5 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px]">
                      <span className="text-zinc-300">
                        {t("rewardPoints")}: <strong className="text-amber-400 font-mono">580</strong>
                      </span>
                      <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold">
                        {t("loyaltyTier")}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setOpenDropdown(null);
                        setShowLoyalty(true);
                      }}
                      className="mt-3 w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-black font-bold py-2 rounded-xl text-xs transition cursor-pointer shadow-md text-center"
                    >
                      🎁 {t("redeemPerk")} →
                    </button>
                  </div>
                )}
              </div>

              {/* 5. E-WALLET Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => toggleDropdown("wallet")}
                  className={`px-3 py-1.5 uppercase flex items-center gap-1 transition cursor-pointer whitespace-nowrap ${
                    isWallet || openDropdown === "wallet" ? "text-white" : "text-zinc-300 hover:text-white"
                  }`}
                >
                  <span>{t("navEwallet")}</span>
                  <span className="text-[10px]">⌄</span>
                </button>
                {openDropdown === "wallet" && (
                  <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl p-2 z-50 animate-fadeIn">
                    <Link
                      href="/wallet"
                      onClick={() => setOpenDropdown(null)}
                      className="block p-2.5 rounded-xl hover:bg-zinc-900 text-xs font-medium"
                    >
                      <div className="font-bold text-amber-300 flex items-center justify-between">
                        <span>💳 {t("walletTitle")}</span>
                        <span className="text-white font-mono">₹{balance.toLocaleString("en-IN")}</span>
                      </div>
                      <span className="text-[11px] text-zinc-400 block mt-0.5">{t("subWallet")}</span>
                    </Link>
                    <Link
                      href="/wallet"
                      onClick={() => setOpenDropdown(null)}
                      className="block p-2.5 rounded-xl hover:bg-zinc-900 text-xs font-medium text-emerald-300"
                    >
                      <span>➕ {t("addMoney")}</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* 6. ALERTS Button */}
              <button
                type="button"
                onClick={() => setShowAlerts(true)}
                className="px-3 py-1.5 uppercase transition text-zinc-300 hover:text-white cursor-pointer whitespace-nowrap flex items-center gap-1"
              >
                <span>{t("navAlerts")}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              </button>

              {/* 7. CONTACT US (Interactive Grievance & Helpline Portal) */}
              <button
                type="button"
                onClick={() => setShowContactUs(true)}
                className="px-3 py-1.5 uppercase transition text-zinc-300 hover:text-white cursor-pointer whitespace-nowrap flex items-center gap-1"
              >
                <span>{t("navContact")}</span>
                <span className="text-[10px]">📞</span>
              </button>
            </div>

            {/* Role-Specific Right Action Pills */}
            <div className="flex items-center gap-2 shrink-0 pl-4 border-l border-zinc-800">
              {user?.role === "admin" ? (
                <Link
                  href="/admin"
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
                    isAdmin
                      ? "bg-white text-black shadow-lg"
                      : "bg-purple-950/80 hover:bg-purple-900 text-purple-200 border border-purple-500/50"
                  }`}
                >
                  <span>⚙️ {t("adminPanel")}</span>
                </Link>
              ) : user?.role === "agent" ? (
                <div className="flex items-center gap-2">
                  <span className="bg-amber-950/90 border border-amber-500/60 text-amber-300 text-[11px] px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                    <span>🎧</span> {t("agentPortal")}
                  </span>
                  <Link
                    href="/bookings"
                    className="px-3 py-1.5 rounded-full text-xs font-bold bg-white text-black hover:bg-zinc-200 transition shadow-md"
                  >
                    {t("clientSlips")}
                  </Link>
                </div>
              ) : user ? (
                <Link
                  href="/bookings"
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1 ${
                    isBookings
                      ? "bg-white text-black shadow-lg"
                      : "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700"
                  }`}
                >
                  <span>🎫 {t("myBookings")}</span>
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="px-3 py-1.5 rounded-full text-xs font-bold bg-white text-black hover:bg-zinc-200 transition shadow-md"
                >
                  {t("signInPill")}
                </Link>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Modals */}
      <LiveTrainTrackerModal isOpen={showLiveTracker} onClose={() => setShowLiveTracker(false)} />
      <ECateringModal
        isOpen={showECatering}
        onClose={() => setShowECatering(false)}
        initialCategory={cateringCategory}
      />
      <RailAlertsModal isOpen={showAlerts} onClose={() => setShowAlerts(false)} />
      <LoyaltyModal isOpen={showLoyalty} onClose={() => setShowLoyalty(false)} />
      <ContactUsModal isOpen={showContactUs} onClose={() => setShowContactUs(false)} />
    </>
  );
}
