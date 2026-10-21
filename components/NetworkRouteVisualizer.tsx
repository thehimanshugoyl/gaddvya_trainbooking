"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguageStore } from "@/store/useLanguageStore";

interface Corridor {
  id: string;
  name: string;
  from: string;
  to: string;
  trainNumber: string;
  trainName: string;
  distance: string;
  duration: string;
  speed: string;
  fare: number;
  status: "on-time" | "boarding" | "delayed";
  delayMin?: number;
  platform: string;
  type: string;
  halts: string[];
}

interface NetworkRouteVisualizerProps {
  onTrackTrain?: (trainNumber: string) => void;
}

export default function NetworkRouteVisualizer({ onTrackTrain }: NetworkRouteVisualizerProps) {
  const { lang, t } = useLanguageStore();

  const corridors: Corridor[] = [
    {
      id: "delhi-varanasi",
      name: "Northern Super-Corridor",
      from: "New Delhi (NDLS)",
      to: "Varanasi Jn (BSB)",
      trainNumber: "22436",
      trainName: "Vande Bharat Express",
      distance: "759 km",
      duration: "8h 00m",
      speed: "160 km/h",
      fare: 1750,
      status: "on-time",
      platform: "PF 1",
      type: "Vande Bharat",
      halts: ["New Delhi", "Kanpur Central", "Prayagraj Jn", "Varanasi Jn"],
    },
    {
      id: "delhi-mumbai",
      name: "Western High-Speed Trunk",
      from: "New Delhi (NDLS)",
      to: "Mumbai Central (MMCT)",
      trainNumber: "12952",
      trainName: "Tejas Rajdhani Express",
      distance: "1,386 km",
      duration: "15h 32m",
      speed: "130 km/h",
      fare: 2450,
      status: "boarding",
      platform: "PF 3",
      type: "Rajdhani Express",
      halts: ["New Delhi", "Kota Jn", "Ratlam Jn", "Vadodara Jn", "Surat", "Mumbai Central"],
    },
    {
      id: "bengaluru-chennai",
      name: "Southern Electric Spine",
      from: "KSR Bengaluru (SBC)",
      to: "MGR Chennai Central (MAS)",
      trainNumber: "20608",
      trainName: "Mysuru - Chennai Vande Bharat",
      distance: "359 km",
      duration: "4h 25m",
      speed: "130 km/h",
      fare: 995,
      status: "on-time",
      platform: "PF 7",
      type: "Vande Bharat",
      halts: ["KSR Bengaluru", "Bengaluru Cantt", "Katpadi Jn", "MGR Chennai Central"],
    },
    {
      id: "delhi-howrah",
      name: "Eastern Grand Trunk",
      from: "New Delhi (NDLS)",
      to: "Howrah Jn (HWH)",
      trainNumber: "12302",
      trainName: "Howrah Rajdhani Express",
      distance: "1,447 km",
      duration: "17h 05m",
      speed: "130 km/h",
      fare: 2380,
      status: "delayed",
      delayMin: 6,
      platform: "PF 5",
      type: "Rajdhani Express",
      halts: ["New Delhi", "Kanpur Central", "Prayagraj Jn", "Pt Deen Dayal Upadhyaya", "Dhanbad", "Howrah"],
    },
    {
      id: "delhi-lucknow",
      name: "Awadh Rapid Transit",
      from: "New Delhi (NDLS)",
      to: "Lucknow Charbagh (LKO)",
      trainNumber: "12004",
      trainName: "Lucknow Swarna Shatabdi",
      distance: "512 km",
      duration: "6h 25m",
      speed: "120 km/h",
      fare: 1165,
      status: "on-time",
      platform: "PF 2",
      type: "Shatabdi Express",
      halts: ["New Delhi", "Ghaziabad", "Aligarh Jn", "Tundla Jn", "Kanpur Central", "Lucknow"],
    },
  ];

  const [selectedCorridor, setSelectedCorridor] = useState<Corridor>(corridors[0]);
  const [activeTab, setActiveTab] = useState<"corridors" | "board">("corridors");
  const [tickerTime, setTickerTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTickerTime(
        now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto my-12 px-2 sm:px-4">
      {/* ── HEADER BANNER WITH REAL-TIME CLOCK ── */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl mb-8 relative overflow-hidden">
        {/* Glow backdrop circles */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-zinc-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs px-3 py-1 rounded-full mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono tracking-widest font-bold">NTES LIVE TELEMETRY</span>
              <span className="text-zinc-500">•</span>
              <span className="font-mono">{tickerTime} IST</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t("telemetryTitle")}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              {t("telemetrySubtitle")}
            </p>
          </div>

          {/* Tab Switcher Pills */}
          <div className="flex bg-slate-950/90 border border-slate-800 p-1 rounded-2xl shrink-0 text-xs">
            <button
              onClick={() => setActiveTab("corridors")}
              className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 cursor-pointer ${
                activeTab === "corridors"
                  ? "bg-white text-black shadow-md font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>🗺️ {t("popularCorridors")}</span>
            </button>
            <button
              onClick={() => setActiveTab("board")}
              className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 cursor-pointer ${
                activeTab === "board"
                  ? "bg-white text-black shadow-md font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>📋 {t("departureBoardTitle")}</span>
            </button>
          </div>
        </div>

        {/* ── LIVE KPI TELEMETRY METRIC STRIP ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-3.5">
            <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
              <span>{t("activeTrainsEnroute")}</span>
              <span className="text-emerald-400 font-bold">● Active</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-white font-mono">14,280+</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Across 68 Railway Divisions</div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-3.5">
            <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
              <span>{t("punctualityRate")}</span>
              <span className="text-zinc-300 font-bold">98.6%</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">98.6%</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Zero Major Delays Recorded</div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-3.5">
            <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
              <span>{t("maxSpeed")}</span>
              <span className="text-amber-400 font-bold">160 km/h</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-amber-300 font-mono">160 km/h</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Vande Bharat Express Corridor</div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-3.5">
            <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
              <span>{t("kavachStatus")}</span>
              <span className="text-purple-400 font-bold">SIL-4</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-purple-300 font-mono">2,500+ km</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Zero Signal Passing At Danger</div>
          </div>
        </div>
      </div>

      {/* ── TAB 1: INTERACTIVE HIGH-SPEED CORRIDORS VISUALIZER ── */}
      {activeTab === "corridors" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Corridor Selection List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 px-1">
              {t("popularCorridorsSubtitle")}
            </div>
            {corridors.map((c) => {
              const isSelected = selectedCorridor.id === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedCorridor(c)}
                  className={`p-4 rounded-2xl border transition cursor-pointer text-left ${
                    isSelected
                      ? "bg-slate-900 border-zinc-600 shadow-xl ring-1 ring-zinc-500/30"
                      : "bg-slate-950/70 border-slate-850 hover:border-slate-700 hover:bg-slate-900/60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-zinc-300 border border-slate-700">
                      {c.type}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        c.status === "on-time"
                          ? "bg-emerald-950 text-emerald-300 border border-emerald-700/50"
                          : c.status === "boarding"
                          ? "bg-zinc-900 text-zinc-300 border border-zinc-750"
                          : "bg-amber-950 text-amber-300 border border-amber-700/50"
                      }`}
                    >
                      {c.status === "on-time"
                        ? "🟢 ON TIME"
                        : c.status === "boarding"
                        ? "🚄 BOARDING"
                        : `⏱️ +${c.delayMin}m DELAY`}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white text-sm">{c.trainName}</h4>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">#{c.trainNumber}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-amber-300 font-mono font-black text-sm">₹{c.fare}</div>
                      <div className="text-[10px] text-slate-500">{c.duration}</div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
                    <span className="truncate max-w-[150px]">{c.from.split("(")[0]}</span>
                    <span className="text-slate-500 font-bold">───▶</span>
                    <span className="truncate max-w-[150px] text-right">{c.to.split("(")[0]}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Live Telemetry Display for Selected Corridor */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex flex-wrap justify-between items-start gap-4 mb-6 pb-6 border-b border-slate-800">
                <div>
                  <span className="text-xs font-mono uppercase text-zinc-300 font-bold tracking-widest">
                    ACTIVE ROUTE TELEMETRY
                  </span>
                  <h3 className="text-2xl font-black text-white mt-1">
                    {selectedCorridor.trainName}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {selectedCorridor.from} → {selectedCorridor.to} • {selectedCorridor.distance}
                  </p>
                </div>
                <div className="text-right">
                  <span className="bg-zinc-900 border border-zinc-750 text-zinc-300 px-3 py-1 rounded-full text-xs font-bold font-mono">
                    {selectedCorridor.platform}
                  </span>
                  <p className="text-xs text-slate-400 mt-2 font-mono">
                    Speed: <span className="text-emerald-400 font-bold">{selectedCorridor.speed}</span>
                  </p>
                </div>
              </div>

              {/* Visual Track Stepper */}
              <div className="my-8">
                <div className="flex justify-between items-center text-xs text-slate-400 font-semibold mb-2">
                  <span>{t("journeyProgress")}</span>
                  <span className="text-zinc-300 font-mono">68% Enroute (Passing CNB)</span>
                </div>
                {/* Animated Track Line */}
                <div className="relative w-full h-3 bg-slate-950 rounded-full border border-slate-800 overflow-hidden mb-6">
                  <div
                    className="h-full bg-gradient-to-r from-zinc-200 via-white to-emerald-400 rounded-full transition-all duration-1000 relative"
                    style={{ width: "68%" }}
                  >
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-lg shadow-white/50 animate-ping" />
                  </div>
                </div>

                {/* Halts progression indicators */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                  {selectedCorridor.halts.slice(0, 4).map((h, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-xl border ${
                        idx < 2
                          ? "bg-slate-950/70 border-emerald-700/40 text-emerald-300"
                          : idx === 2
                          ? "bg-zinc-900 border-zinc-600 text-white ring-1 ring-zinc-500/40"
                          : "bg-slate-950/40 border-slate-850 text-slate-500"
                      }`}
                    >
                      <div className="text-[10px] uppercase font-bold mb-0.5">
                        {idx < 2 ? "✓ Passed" : idx === 2 ? "● Current" : "Upcoming"}
                      </div>
                      <div className="font-semibold truncate">{h}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety & Performance Badges */}
              <div className="grid grid-cols-3 gap-3 bg-slate-950/80 border border-slate-800 p-4 rounded-2xl mb-6 text-center text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Kavach Status</span>
                  <span className="text-emerald-400 font-bold">🛡️ Active</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Catering Berth</span>
                  <span className="text-amber-300 font-bold">🍱 Available</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Pantry Type</span>
                  <span className="text-zinc-300 font-bold">Hot Satvik</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-800">
              <Link
                href={`/search?from=${encodeURIComponent(selectedCorridor.from.split(" (")[0])}&to=${encodeURIComponent(
                  selectedCorridor.to.split(" (")[0]
                )}`}
                className="flex-1 bg-white text-black hover:bg-zinc-200 font-bold py-3 px-6 rounded-2xl text-center text-sm transition shadow-lg shadow-white/10 cursor-pointer"
              >
                <span>⚡ {t("bookNowShortcut")}</span>
              </Link>
              {onTrackTrain && (
                <button
                  type="button"
                  onClick={() => onTrackTrain(selectedCorridor.trainNumber)}
                  className="bg-slate-800 hover:bg-slate-700 text-zinc-300 border border-slate-700 font-semibold py-3 px-5 rounded-2xl text-sm transition cursor-pointer"
                >
                  <span>📡 {t("liveRunningStatus")}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: AUTHENTIC IRCTC DIGITAL DEPARTURE BOARD ── */}
      {activeTab === "board" && (
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg sm:text-xl font-black text-amber-300 font-mono tracking-wider flex items-center gap-2">
                <span>🚆 {t("departureBoardTitle")}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">{t("departureBoardSubtitle")}</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                NTES Server Connected
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider font-mono">
                  <th className="py-3 px-3">{t("trainNo")}</th>
                  <th className="py-3 px-3">Train Name</th>
                  <th className="py-3 px-3">{t("route")}</th>
                  <th className="py-3 px-3">{t("platform")}</th>
                  <th className="py-3 px-3">Speed</th>
                  <th className="py-3 px-3">{t("status")}</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {corridors.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-900/60 transition group font-mono">
                    <td className="py-3 px-3 font-bold text-amber-300">{c.trainNumber}</td>
                    <td className="py-3 px-3 font-sans font-bold text-white group-hover:text-zinc-300 transition">
                      {c.trainName}
                    </td>
                    <td className="py-3 px-3 font-sans text-xs text-slate-300">
                      {c.from.split("(")[0]} ➜ {c.to.split("(")[0]}
                    </td>
                    <td className="py-3 px-3 font-bold text-white">{c.platform}</td>
                    <td className="py-3 px-3 text-emerald-400 font-bold">{c.speed}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                          c.status === "on-time"
                            ? "bg-emerald-950 text-emerald-300 border border-emerald-700/50"
                            : c.status === "boarding"
                            ? "bg-zinc-900 text-zinc-300 border border-zinc-750"
                            : "bg-amber-950 text-amber-300 border border-amber-700/50"
                        }`}
                      >
                        {c.status === "on-time"
                          ? "🟢 ON TIME"
                          : c.status === "boarding"
                          ? "🚄 BOARDING"
                          : `⏱️ +${c.delayMin}m`}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right font-sans">
                      <Link
                        href={`/search?from=${encodeURIComponent(
                          c.from.split(" (")[0]
                        )}&to=${encodeURIComponent(c.to.split(" (")[0])}`}
                        className="bg-white text-black hover:bg-zinc-200 font-bold px-3 py-1.5 rounded-lg text-xs transition inline-block"
                      >
                        {t("bookTicket")}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
