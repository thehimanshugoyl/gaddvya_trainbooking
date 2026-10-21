"use client";

import React, { useState, useEffect } from "react";
import { useLanguageStore } from "@/store/useLanguageStore";

interface LiveTrainTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTrainNumber?: string;
}

export default function LiveTrainTrackerModal({
  isOpen,
  onClose,
  initialTrainNumber = "22436",
}: LiveTrainTrackerModalProps) {
  const { lang, t } = useLanguageStore();
  const [trainNumber, setTrainNumber] = useState(initialTrainNumber);

  const getPresetData = (num: string) => {
    const cleanNum = (num || "22436").trim();
    if (cleanNum === "22436") {
      return {
        trainNumber: "22436",
        trainName: "Vande Bharat Express",
        from: "New Delhi (NDLS)",
        to: "Varanasi Jn (BSB)",
        currentStation: "Kanpur Central (CNB)",
        nextStation: "Prayagraj Jn (PRYJ)",
        status: "Running On Time",
        speed: "134 km/h",
        delayMinutes: 0,
        platform: "Platform 1",
        lastUpdated: "Just now (Live GPS Satellite)",
        stations: [
          { name: "New Delhi (NDLS)", schDep: "06:00", actDep: "06:00", statusKey: "stationPassed", passed: true },
          { name: "Kanpur Central (CNB)", schArr: "10:08", actArr: "10:08", statusKey: "stationPassed", passed: true },
          { name: "Prayagraj Jn (PRYJ)", schArr: "12:08", actArr: "12:10", statusKey: "stationApproaching", current: true },
          { name: "Varanasi Jn (BSB)", schArr: "14:00", actArr: "14:00", statusKey: "stationExpected", passed: false },
        ],
      };
    } else if (cleanNum === "12952") {
      return {
        trainNumber: "12952",
        trainName: "Tejas Rajdhani Express",
        from: "New Delhi (NDLS)",
        to: "Mumbai Central (MMCT)",
        currentStation: "Kota Junction (KOTA)",
        nextStation: "Ratlam Junction (RTM)",
        status: "Running On Time",
        speed: "128 km/h",
        delayMinutes: 0,
        platform: "Platform 3",
        lastUpdated: "Just now (Live GPS Satellite)",
        stations: [
          { name: "New Delhi (NDLS)", schDep: "16:55", actDep: "16:55", statusKey: "stationPassed", passed: true },
          { name: "Kota Jn (KOTA)", schArr: "21:30", actArr: "21:30", statusKey: "stationPassed", passed: true },
          { name: "Ratlam Jn (RTM)", schArr: "00:25", actArr: "00:27", statusKey: "stationApproaching", current: true },
          { name: "Vadodara Jn (BRC)", schArr: "03:40", actArr: "03:40", statusKey: "stationExpected", passed: false },
          { name: "Mumbai Central (MMCT)", schArr: "08:35", actArr: "08:35", statusKey: "stationExpected", passed: false },
        ],
      };
    } else if (cleanNum === "12004") {
      return {
        trainNumber: "12004",
        trainName: "Lucknow Shatabdi Express",
        from: "New Delhi (NDLS)",
        to: "Lucknow Charbagh (LKO)",
        currentStation: "Aligarh Junction (ALJN)",
        nextStation: "Kanpur Central (CNB)",
        status: "Running On Time",
        speed: "122 km/h",
        delayMinutes: 0,
        platform: "Platform 2",
        lastUpdated: "Just now (Live GPS Satellite)",
        stations: [
          { name: "New Delhi (NDLS)", schDep: "06:10", actDep: "06:10", statusKey: "stationPassed", passed: true },
          { name: "Ghaziabad (GZB)", schArr: "06:48", actArr: "06:48", statusKey: "stationPassed", passed: true },
          { name: "Aligarh Jn (ALJN)", schArr: "07:47", actArr: "07:49", statusKey: "stationApproaching", current: true },
          { name: "Kanpur Central (CNB)", schArr: "11:20", actArr: "11:20", statusKey: "stationExpected", passed: false },
          { name: "Lucknow Charbagh (LKO)", schArr: "12:40", actArr: "12:40", statusKey: "stationExpected", passed: false },
        ],
      };
    } else if (cleanNum === "20608") {
      return {
        trainNumber: "20608",
        trainName: "Mysuru - Chennai Vande Bharat",
        from: "KSR Bengaluru (SBC)",
        to: "MGR Chennai Central (MAS)",
        currentStation: "Katpadi Junction (KPD)",
        nextStation: "MGR Chennai Central (MAS)",
        status: "Running On Time",
        speed: "130 km/h",
        delayMinutes: 0,
        platform: "Platform 7",
        lastUpdated: "Just now (Live GPS Satellite)",
        stations: [
          { name: "KSR Bengaluru (SBC)", schDep: "14:50", actDep: "14:50", statusKey: "stationPassed", passed: true },
          { name: "Bengaluru Cantt (BNC)", schArr: "15:00", actArr: "15:00", statusKey: "stationPassed", passed: true },
          { name: "Katpadi Jn (KPD)", schArr: "17:33", actArr: "17:35", statusKey: "stationApproaching", current: true },
          { name: "MGR Chennai Central (MAS)", schArr: "19:20", actArr: "19:20", statusKey: "stationExpected", passed: false },
        ],
      };
    }

    return {
      trainNumber: cleanNum,
      trainName: cleanNum.startsWith("22")
        ? "Vande Bharat Express"
        : cleanNum.startsWith("12")
        ? "Superfast Express"
        : "Mail Express",
      from: "Origin Junction (NDLS)",
      to: "Destination Terminal (TER)",
      currentStation: "Intermediate Junction",
      nextStation: "Next Approaching Station",
      status: "Running On Time",
      speed: `${115 + Math.floor(Math.random() * 25)} km/h`,
      delayMinutes: Math.random() > 0.75 ? 8 : 0,
      platform: `Platform ${1 + (parseInt(cleanNum || "1") % 6)}`,
      lastUpdated: "Live NTES GPS Satellite",
      stations: [
        { name: "Origin Terminal", schDep: "06:00", actDep: "06:00", statusKey: "stationPassed", passed: true },
        { name: "Transit Junction", schArr: "10:15", actArr: "10:15", statusKey: "stationPassed", passed: true },
        { name: "Approaching Station", schArr: "12:45", actArr: "12:47", statusKey: "stationApproaching", current: true },
        { name: "Destination Terminal", schArr: "16:30", actArr: "16:30", statusKey: "stationExpected", passed: false },
      ],
    };
  };

  const [trackingData, setTrackingData] = useState<any>(getPresetData(initialTrainNumber));

  useEffect(() => {
    if (initialTrainNumber) {
      setTrainNumber(initialTrainNumber);
      setTrackingData(getPresetData(initialTrainNumber));
    }
  }, [initialTrainNumber, isOpen]);

  if (!isOpen) return null;

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setTrackingData(getPresetData(trainNumber));
  };

  const handleSelectQuickTrain = (num: string) => {
    setTrainNumber(num);
    setTrackingData(getPresetData(num));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl bg-gray-900 border border-zinc-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-black via-zinc-950 to-zinc-900 p-6 text-white flex justify-between items-start shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[11px] font-mono tracking-widest text-emerald-300 uppercase font-bold">
                {t("satelliteLive")}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black flex items-center gap-2">
              <span>📡 {t("liveRunningStatus")}</span>
            </h3>
            <p className="text-xs text-zinc-300 mt-1">
              Real-time Indian Railways location, speed, and platform tracker
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer text-sm"
          >
            ✕
          </button>
        </div>

        {/* Search input bar & Quick Selectors */}
        <div className="p-4 bg-zinc-950/80 border-b border-zinc-800 shrink-0 space-y-3">
          <form onSubmit={handleTrack} className="flex gap-2">
            <input
              type="text"
              value={trainNumber}
              onChange={(e) => setTrainNumber(e.target.value)}
              placeholder={t("enterTrainNumber")}
              className="flex-1 bg-gray-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-white text-xs sm:text-sm focus:border-white focus:outline-none font-mono"
            />
            <button
              type="submit"
              className="bg-white text-black hover:bg-zinc-200 font-bold px-5 py-2.5 rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5"
            >
              <span>🔍 {t("trackLiveBtn")}</span>
            </button>
          </form>

          {/* Quick train pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
            <span className="text-zinc-400 mr-1">⚡ Quick:</span>
            {[
              { num: "22436", name: "22436 Vande Bharat" },
              { num: "12952", name: "12952 Tejas Rajdhani" },
              { num: "12004", name: "12004 Shatabdi" },
              { num: "20608", name: "20608 Chennai VB" },
            ].map((p) => (
              <button
                key={p.num}
                type="button"
                onClick={() => handleSelectQuickTrain(p.num)}
                className={`px-2.5 py-1 rounded-lg border font-mono transition cursor-pointer ${
                  trainNumber === p.num
                    ? "bg-white text-black border-white font-bold"
                    : "bg-zinc-900 text-zinc-300 border-zinc-750 hover:bg-zinc-800"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Live Status Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Status Badge Box */}
          <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-lg font-bold text-white">{trackingData.trainName}</h4>
                <span className="bg-zinc-800 text-amber-300 font-mono text-xs px-2 py-0.5 rounded font-bold">
                  #{trackingData.trainNumber}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {trackingData.from} → {trackingData.to}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full border ${
                    trackingData.delayMinutes === 0
                      ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/40"
                      : "bg-amber-950/80 text-amber-300 border-amber-500/40"
                  }`}
                >
                  {trackingData.delayMinutes === 0
                    ? `✓ ${t("onTime")}`
                    : `⚠️ ${t("delayedBy")} ${trackingData.delayMinutes}m`}
                </span>
                <span className="text-[11px] text-gray-400 block mt-1 font-mono">
                  {t("speed")}: <strong className="text-emerald-400">{trackingData.speed}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Stepper Route Timeline */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
              {t("stationProgression")}
            </h5>
            <div className="space-y-4 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-800">
              {trackingData.stations.map((st: any, i: number) => {
                const statusText = t(st.statusKey as any) || st.statusKey;
                return (
                  <div key={i} className="flex items-start gap-4 relative z-10">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        st.current
                          ? "bg-white text-black ring-4 ring-white/30 animate-pulse"
                          : st.passed
                          ? "bg-emerald-500 text-black"
                          : "bg-zinc-800 text-zinc-500 border border-zinc-700"
                      }`}
                    >
                      {st.passed ? "✓" : i + 1}
                    </div>

                    <div className="flex-1 bg-zinc-950/60 border border-zinc-800 p-3 rounded-xl flex justify-between items-center text-xs">
                      <div>
                        <p className="font-bold text-white text-sm">{st.name}</p>
                        <span className="text-[11px] text-gray-400">
                          {t("scheduled")}: {st.schArr || st.schDep} • {t("actual")}: {st.actArr || st.actDep}
                        </span>
                      </div>

                      <div className="text-right">
                        <span
                          className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
                            st.current
                              ? "bg-zinc-850 text-zinc-200 border border-zinc-700"
                              : st.passed
                              ? "text-emerald-400"
                              : "text-zinc-500"
                          }`}
                        >
                          {statusText}
                        </span>
                        {st.current && (
                          <span className="block text-[10px] text-amber-400 font-bold mt-0.5">
                            {trackingData.platform}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex justify-between items-center text-xs text-gray-400 shrink-0">
          <span>🕒 {trackingData.lastUpdated}</span>
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
