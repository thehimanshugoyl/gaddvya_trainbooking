"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { generateTicketPdf } from "@/lib/ticketPdf";
import IrctcNavBar from "@/components/IrctcNavBar";
import { useLanguageStore } from "@/store/useLanguageStore";

export default function PnrPage() {
  const { lang, t } = useLanguageStore();
  const [pnr, setPnr] = useState("");
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchPnrValue = async (targetPnr: string) => {
    if (!targetPnr.trim()) return;
    setLoading(true);
    setError("");
    setBooking(null);

    try {
      const res = await axios.get(`/api/bookings/${targetPnr.trim()}`);
      setBooking(res.data.booking);
    } catch (err: any) {
      setError(
        err.response?.data?.error || "PNR record not found. Please verify the 10-digit number."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearchPnr = (e: React.FormEvent) => {
    e.preventDefault();
    searchPnrValue(pnr);
  };

  const handleQuickPnr = (val: string) => {
    setPnr(val);
    searchPnrValue(val);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col justify-between transition-colors">
      {/* Official IRCTC Navigation Bar */}
      <IrctcNavBar />

      {/* Main Container */}
      <main className="max-w-4xl mx-auto w-full my-auto p-4 md:p-6 flex-1">
        <div className="text-center mb-6">
          <div className="inline-block bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs px-3.5 py-1 rounded-full mb-3">
            {t("pnrStatus")}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
            {t("pnrStatus")}
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm max-w-xl mx-auto">
            {t("pnrSearchDesc")}
          </p>
        </div>

        {/* PNR Search Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 shadow-xl mb-8">
          <form onSubmit={handleSearchPnr} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                maxLength={10}
                placeholder={t("enterPnrInput")}
                value={pnr}
                onChange={(e) => setPnr(e.target.value.replace(/\D/g, ""))}
                className="w-full bg-gray-950 border border-gray-700 rounded-xl p-3.5 text-white font-mono text-base tracking-widest placeholder:tracking-normal focus:border-white focus:outline-none"
                required
              />
              <span className="absolute right-4 top-4 text-xs text-gray-500 font-mono">
                {pnr.length}/10
              </span>
            </div>
            <button
              type="submit"
              disabled={loading || pnr.length !== 10}
              className="bg-white text-black hover:bg-zinc-200 disabled:opacity-50 px-8 py-3.5 rounded-xl font-bold transition shadow-lg shadow-white/10 dark:bg-white dark:text-black light:bg-black light:text-white flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? t("searching") : t("pnrStatus")}
            </button>
          </form>

          {/* Quick Demo PNRs */}
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-800 text-xs">
            <span className="text-gray-400 font-medium">{t("quickDemoPnrs")}</span>
            <button
              type="button"
              onClick={() => handleQuickPnr("8429103941")}
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-mono px-3 py-1 rounded-lg border border-zinc-700 transition cursor-pointer"
            >
              8429103941 (Vande Bharat)
            </button>
            <button
              type="button"
              onClick={() => handleQuickPnr("6518294012")}
              className="bg-zinc-800 hover:bg-zinc-700 text-purple-300 font-mono px-3 py-1 rounded-lg border border-zinc-700 transition cursor-pointer"
            >
              6518294012 (Tejas Rajdhani)
            </button>
            <button
              type="button"
              onClick={() => handleQuickPnr("9310482715")}
              className="bg-zinc-800 hover:bg-zinc-700 text-emerald-300 font-mono px-3 py-1 rounded-lg border border-zinc-700 transition cursor-pointer"
            >
              9310482715 (Shatabdi)
            </button>
          </div>

          {error && (
            <div className="mt-4 bg-red-950/40 border border-red-800 text-red-300 p-3.5 rounded-xl text-sm flex items-center gap-2">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* PNR Results Card */}
        {booking && (
          <div className="bg-gray-900 border border-gray-750 rounded-3xl p-6 sm:p-8 shadow-2xl transition animate-fadeIn space-y-6">
            {/* Header Status */}
            <div className="flex flex-wrap justify-between items-start gap-4 border-b border-gray-800 pb-5">
              <div>
                <span className="text-xs text-gray-400 font-mono uppercase">{t("pnr")}</span>
                <p className="text-3xl font-black text-amber-300 font-mono tracking-wider">
                  {booking.pnr || booking._id}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Booked on {new Date(booking.created_at || booking.createdAt || Date.now()).toLocaleDateString("en-IN")}
                </p>
              </div>

              <div className="text-right">
                <span
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                    booking.status === "confirmed"
                      ? "bg-emerald-950 text-emerald-300 border border-emerald-700"
                      : "bg-red-950 text-red-300 border border-red-700"
                  }`}
                >
                  ● {booking.status === "confirmed" ? t("confirmed") : t("cancelled")}
                </span>
                <p className="text-xs text-zinc-300 font-semibold mt-2 font-mono">
                  {t("classType")}: {booking.class_type || booking.classType || "CC"} • {booking.seats} {t("seats")}
                </p>
              </div>
            </div>

            {/* Chart Preparation Verified Banner */}
            <div className="bg-gradient-to-r from-emerald-950/70 via-slate-900 to-emerald-950/70 border border-emerald-700/60 p-4 rounded-2xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📋</span>
                <div>
                  <h4 className="font-bold text-emerald-300 text-sm">{t("chartStatus")}</h4>
                  <p className="text-slate-300 text-[11px]">{t("chartPreparedDesc")}</p>
                </div>
              </div>
              <span className="bg-emerald-900/60 text-emerald-300 font-bold px-3 py-1 rounded-full border border-emerald-700 font-mono text-[11px]">
                CHART 1 PREPARED
              </span>
            </div>

            {/* Train & Journey Route with Animated Visual Stepper */}
            <div className="bg-slate-950 border border-gray-800 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-[10px] text-zinc-300 font-mono font-bold uppercase">TRAIN ROUTE</span>
                  <h3 className="text-lg font-bold text-white">
                    {booking.train?.trainName || booking.train_name || "Express Train"}
                  </h3>
                </div>
                <span className="bg-gray-800 text-amber-300 text-xs px-3 py-1 rounded-lg font-mono font-bold">
                  #{booking.train?.trainNumber || booking.train_number}
                </span>
              </div>

              {/* Visual Journey Progress Track */}
              <div className="my-6">
                <div className="flex justify-between items-center text-xs text-gray-400 mb-2 font-mono">
                  <span>{booking.train?.from || booking.from_station}</span>
                  <span className="text-emerald-400 font-bold">● Train In Transit (72% Completed)</span>
                  <span>{booking.train?.to || booking.to_station}</span>
                </div>
                <div className="relative w-full h-2.5 bg-gray-900 rounded-full border border-gray-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-zinc-200 via-white to-emerald-400 rounded-full transition-all duration-1000 relative"
                    style={{ width: "72%" }}
                  >
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-md shadow-emerald-500 animate-ping" />
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm">
                <div>
                  <p className="text-xs text-gray-400">{t("originStation")}</p>
                  <p className="text-white font-bold text-base">{booking.train?.from || booking.from_station}</p>
                  <p className="text-gray-300 text-xs font-mono">{booking.train?.departureTime || "06:00"}</p>
                </div>
                <div className="text-center text-gray-500 font-bold px-2">
                  <span className="text-[11px] block text-emerald-400 font-mono font-semibold">
                    134 km/h
                  </span>
                  ────────►
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">{t("destinationStation")}</p>
                  <p className="text-green-400 font-bold text-base">{booking.train?.to || booking.to_station}</p>
                  <p className="text-gray-300 text-xs font-mono">{booking.train?.arrivalTime || "14:00"}</p>
                </div>
              </div>
            </div>

            {/* Visual Coach & Berth Layout Graphic */}
            <div className="bg-slate-950 border border-gray-800 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                  <span>💺 {t("visualCoachBerth")}</span>
                </h4>
                <span className="text-xs text-emerald-400 font-mono font-semibold">
                  Coach C1 • Berth 22 ({t("windowSeat")})
                </span>
              </div>

              {/* Coach Layout Visual Grid */}
              <div className="bg-gray-900/90 border border-gray-800 p-4 rounded-xl flex items-center justify-between gap-2 overflow-x-auto text-xs font-mono">
                <div className="bg-slate-800 text-gray-400 px-3 py-4 rounded-lg font-bold text-center shrink-0">
                  🚪 Door<br />Entry
                </div>
                <div className="flex-1 grid grid-cols-6 gap-2 min-w-[340px]">
                  {[18, 19, 20, 21, 22, 23].map((seatNum) => {
                    const isAllocated = seatNum === 22;
                    return (
                      <div
                        key={seatNum}
                        className={`p-2.5 rounded-lg text-center border transition ${
                          isAllocated
                            ? "bg-white border-white text-black font-bold ring-2 ring-white/50 scale-105 shadow-lg"
                            : "bg-gray-800/80 border-gray-700 text-gray-400"
                        }`}
                      >
                        <span className="block text-[10px] text-gray-400">
                          {seatNum % 2 === 0 ? "Window" : "Aisle"}
                        </span>
                        <span className="text-sm">{seatNum}</span>
                        {isAllocated && (
                          <span className="block text-[9px] bg-black text-white font-extrabold rounded px-1 mt-0.5">
                            YOURS
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="bg-slate-800 text-gray-400 px-3 py-4 rounded-lg font-bold text-center shrink-0">
                  🚻 Rest<br />Room
                </div>
              </div>
            </div>

            {/* Passenger Manifest */}
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                {t("passengerManifest")}
              </h4>
              <div className="overflow-x-auto bg-slate-950 border border-gray-800 rounded-2xl">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="text-xs text-gray-400 border-b border-gray-800 bg-gray-900/50">
                      <th className="p-3">#</th>
                      <th className="p-3">{t("passenger")}</th>
                      <th className="p-3">{t("age")} / {t("gender")}</th>
                      <th className="p-3">{t("seatAssigned")}</th>
                      <th className="p-3">{t("berthPosition")}</th>
                      <th className="p-3">{t("status")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(booking.passengers && booking.passengers.length > 0
                      ? booking.passengers
                      : [
                          {
                            name: booking.passengerName || "Himanshu Goyal",
                            age: booking.passengerAge || 21,
                            gender: "Male",
                            seatNumber: "C1-22",
                          },
                        ]
                    ).map((p: any, idx: number) => (
                      <tr key={idx} className="border-b border-gray-800/60 last:border-b-0">
                        <td className="p-3 text-gray-500 font-mono">{idx + 1}</td>
                        <td className="p-3 font-semibold text-white">{p.name}</td>
                        <td className="p-3 text-gray-400 text-xs">
                          {p.age} yrs • {p.gender || "Male"}
                        </td>
                        <td className="p-3 font-mono text-zinc-200 font-bold">
                          {p.seatNumber || `C1-${22 + idx * 2}`}
                        </td>
                        <td className="p-3 text-xs text-slate-300">
                          {idx === 0 ? t("windowSeat") : "Aisle Berth"}
                        </td>
                        <td className="p-3 font-bold text-emerald-400 text-xs">
                          {booking.status === "confirmed" ? t("confirmed") : t("cancelled")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-800">
              <button
                onClick={() => generateTicketPdf(booking)}
                className="bg-white text-black hover:bg-zinc-200 dark:bg-white dark:text-black light:bg-black light:text-white px-6 py-3 rounded-2xl font-bold text-sm transition flex items-center gap-2 shadow-lg shadow-white/10 cursor-pointer"
              >
                <span>📥 {t("downloadPdf")}</span>
              </button>
              <Link
                href="/search"
                className="bg-gray-800 hover:bg-gray-700 border border-gray-700 px-6 py-3 rounded-2xl text-sm font-semibold transition"
              >
                {t("bookTicket")}
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-600 py-6 mt-8">
        GADDVYA PNR Tracking System • Indian Railways Direct Reservation Inquiry
      </footer>
    </div>
  );
}
