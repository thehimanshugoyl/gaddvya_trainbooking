"use client";

import React, { useState } from "react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useAuthStore } from "@/store/useAuthStore";

interface ContactUsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactUsModal({ isOpen, onClose }: ContactUsModalProps) {
  const { lang, t } = useLanguageStore();
  const { user } = useAuthStore();

  const [category, setCategory] = useState("booking");
  const [pnrInput, setPnrInput] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [docketNumber, setDocketNumber] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      alert("Please provide details of your grievance or feedback.");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      const generatedDocket = `RM-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
      setDocketNumber(generatedDocket);
      setSubmitting(false);
      setDescription("");
      setPnrInput("");
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl bg-gray-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-black via-zinc-950 to-zinc-900 p-6 text-white flex justify-between items-start shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[10px] font-mono tracking-widest text-emerald-300 uppercase font-bold">
                24x7 Rail Passenger Care
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black flex items-center gap-2">
              <span>{t("contactTitle")}</span>
            </h3>
            <p className="text-xs text-zinc-300 mt-1 max-w-lg">
              {t("contactSubtitle")}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer text-sm"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Docket Success Banner */}
          {docketNumber && (
            <div className="bg-gradient-to-r from-emerald-950/90 to-teal-950/90 border border-emerald-500/60 p-4 rounded-2xl shadow-xl text-emerald-200 animate-fadeIn">
              <div className="flex items-start gap-3">
                <span className="text-3xl">✅</span>
                <div className="flex-1">
                  <h4 className="text-base font-bold text-white">{t("docketSuccess")}</h4>
                  <p className="text-xs text-emerald-300 mt-1">
                    {t("docketNumber")}:{" "}
                    <strong className="font-mono text-white text-sm bg-black/40 px-2 py-0.5 rounded border border-emerald-500/40">
                      {docketNumber}
                    </strong>
                  </p>
                  <p className="text-[11px] text-emerald-400/80 mt-1.5">
                    {t("docketSmsNotice")}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Quick Support Action Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* 139 Call Tile */}
            <a
              href="tel:139"
              className="bg-zinc-950 border border-zinc-800 hover:border-zinc-500 p-4 rounded-2xl flex flex-col justify-between transition group shadow-md"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-zinc-800 text-zinc-300 flex items-center justify-center text-xl mb-2 group-hover:scale-110 transition">
                  📞
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-white transition">
                  {t("callHelpline")}
                </h4>
                <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                  {t("call139Desc")}
                </p>
              </div>
              <span className="text-xs font-bold text-zinc-300 mt-3 inline-block">
                Dial 139 Now →
              </span>
            </a>

            {/* WhatsApp AI Bot */}
            <a
              href="https://wa.me/919881193322?text=Hi%20Railway%20Support"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-950 border border-zinc-800 hover:border-emerald-500/60 p-4 rounded-2xl flex flex-col justify-between transition group shadow-md"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xl mb-2 group-hover:scale-110 transition">
                  💬
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition">
                  {t("whatsappBot")}
                </h4>
                <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                  {t("whatsappDesc")}
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-400 mt-3 inline-block">
                +91 98811 93322 →
              </span>
            </a>

            {/* RailMadad Official */}
            <a
              href="https://railmadad.indianrailways.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-950 border border-zinc-800 hover:border-purple-500/60 p-4 rounded-2xl flex flex-col justify-between transition group shadow-md"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-xl mb-2 group-hover:scale-110 transition">
                  🌐
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition">
                  {t("railMadad")}
                </h4>
                <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                  {t("railMadadDesc")}
                </p>
              </div>
              <span className="text-xs font-bold text-purple-400 mt-3 inline-block">
                Open Portal →
              </span>
            </a>
          </div>

          {/* Interactive Grievance Form */}
          <div className="bg-zinc-950 border border-zinc-800 p-5 rounded-2xl shadow-xl">
            <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <span>✍️</span> {t("submitFeedback")}
            </h4>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Category Selection */}
                <div>
                  <label className="text-[11px] text-gray-300 font-medium block mb-1">
                    {t("grievanceType")}
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-gray-900 border border-zinc-700 rounded-xl p-2.5 text-white focus:border-white focus:outline-none"
                  >
                    <option value="booking">{t("catBooking")}</option>
                    <option value="cleanliness">{t("catCleanliness")}</option>
                    <option value="pantry">{t("catPantry")}</option>
                    <option value="refund">{t("catRefund")}</option>
                    <option value="general">{t("catGeneral")}</option>
                  </select>
                </div>

                {/* Optional PNR */}
                <div>
                  <label className="text-[11px] text-gray-300 font-medium block mb-1">
                    10-Digit PNR ({t("pnr")}) (Optional)
                  </label>
                  <input
                    type="text"
                    maxLength={10}
                    value={pnrInput}
                    onChange={(e) => setPnrInput(e.target.value.replace(/\D/g, ""))}
                    placeholder="e.g. 8429103941"
                    className="w-full bg-gray-900 border border-zinc-700 rounded-xl p-2.5 text-white font-mono focus:border-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-[11px] text-gray-300 font-medium block mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t("grievancePlaceholder")}
                  className="w-full bg-gray-900 border border-zinc-700 rounded-xl p-3 text-white focus:border-white focus:outline-none resize-none"
                  required
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-gray-400">
                  {t("supportEmail")}: <strong className="text-white">support@gaddvya.rail.gov.in</strong>
                </span>

                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-white text-black hover:bg-zinc-200 dark:bg-white dark:text-black light:bg-black light:text-white disabled:opacity-50 font-bold px-5 py-2.5 rounded-xl transition cursor-pointer shadow-lg shadow-white/10"
                >
                  {submitting ? "Submitting..." : `${t("submitBtn")} →`}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex justify-between items-center text-xs text-gray-400 shrink-0">
          <span>🛡️ Indian Railways Passenger Charter 2026</span>
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
