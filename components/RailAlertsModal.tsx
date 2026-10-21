"use client";

import React from "react";
import { useLanguageStore } from "@/store/useLanguageStore";

interface RailAlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RailAlertsModal({ isOpen, onClose }: RailAlertsModalProps) {
  const { lang, t } = useLanguageStore();

  if (!isOpen) return null;

  const alerts = [
    {
      id: 1,
      type: lang === "hi" ? "उच्च प्राथमिकता" : lang === "pa" ? "ਉੱਚ ਤਰਜੀਹ" : "HIGH PRIORITY",
      title:
        lang === "hi"
          ? "दिवाली व छठ पूजा 2026: 250+ विशेष वंदे भारत व सुपरफास्ट ट्रेनें जोड़ी गईं"
          : lang === "pa"
          ? "ਦਿਵਾਲੀ ਤੇ ਛੱਠ ਪੂਜਾ 2026: 250+ ਵਿਸ਼ੇਸ਼ ਵੰਦੇ ਭਾਰਤ ਤੇ ਸੁਪਰਫਾਸਟ ਟ੍ਰੇਨਾਂ ਸ਼ੁਰੂ"
          : "Diwali & Chhath Puja 2026: 250+ Special Vande Bharat & Superfast Trains Added",
      date: lang === "hi" ? "आज सक्रिय" : lang === "pa" ? "ਅੱਜ ਸਰਗਰਮ" : "Active Today",
      body:
        lang === "hi"
          ? "उत्तर व पूर्व रेलवे ने दिल्ली, पटना, वाराणसी, गोरखपुर और कोलकाता के बीच विशेष आरक्षण फेरों की घोषणा की है। सामान्य व तत्काल बुकिंग खुली है।"
          : lang === "pa"
          ? "ਉੱਤਰੀ ਤੇ ਪੂਰਬੀ ਰੇਲਵੇ ਨੇ ਦਿੱਲੀ, ਪਟਨਾ, ਵਾਰਾਣਸੀ ਅਤੇ ਕੋਲਕਾਤਾ ਵਿਚਕਾਰ ਵਿਸ਼ੇਸ਼ ਰੇਲਗੱਡੀਆਂ ਦਾ ਐਲਾਨ ਕੀਤਾ ਹੈ। ਆਮ ਅਤੇ ਤਤਕਾਲ ਬੁਕਿੰਗ ਖੁੱਲ੍ਹੀ ਹੈ।"
          : "Northern & Eastern Railway have announced special reservation runs between Delhi, Patna, Varanasi, Gorakhpur, and Kolkata. Normal booking and Tatkal berths open.",
      color: "border-red-500 bg-red-950/20 text-red-300",
    },
    {
      id: 2,
      type: lang === "hi" ? "मौसम परामर्श" : lang === "pa" ? "ਮੌਸਮ ਚੇਤਾਵਨੀ" : "WEATHER ADVISORY",
      title:
        lang === "hi"
          ? "उत्तरी ज़ोन में कोहरा सुरक्षा उपकरण (FSD) प्रोटोकॉल सक्रिय"
          : lang === "pa"
          ? "ਉੱਤਰੀ ਜ਼ੋਨ ਵਿੱਚ ਧੁੰਦ ਸੁਰੱਖਿਆ ਪ੍ਰਣਾਲੀ (FSD) ਪ੍ਰੋਟੋਕੋਲ ਸਰਗਰਮ"
          : "Fog Safety Device (FSD) Protocol Active Across Northern Zone",
      date: "09 Oct 2026",
      body:
        lang === "hi"
          ? "अमृतसर, दिल्ली और लखनऊ के बीच चलने वाले सभी इंजन जीपीएस-निर्देशित फॉग विज़न सिस्टम से लैस हैं। कम दृश्यता में ट्रेनें सुरक्षित गति बनाए रखेंगी।"
          : lang === "pa"
          ? "ਅੰਮ੍ਰਿਤਸਰ, ਦਿੱਲੀ ਅਤੇ ਲਖਨਊ ਵਿਚਕਾਰ ਚੱਲਣ ਵਾਲੇ ਇੰਜਣ GPS ਫੌਗ ਸਿਸਟਮ ਨਾਲ ਲੈਸ ਹਨ। ਘੱਟ ਵਿਜ਼ੀਬਿਲਟੀ ਦੌਰਾਨ ਟ੍ਰੇਨਾਂ ਸੁਰੱਖਿਅਤ ਰਫ਼ਤਾਰ ਬਣਾਈ ਰੱਖਣਗੀਆਂ।"
          : "Locomotives operating between Amritsar, Delhi, and Lucknow are running equipped with GPS-guided Fog Vision systems. Trains maintain safe speed thresholds during low visibility.",
      color: "border-amber-500 bg-amber-950/20 text-amber-300",
    },
    {
      id: 3,
      type: lang === "hi" ? "प्लेटफॉर्म अपग्रेड" : lang === "pa" ? "ਪਲੇਟਫਾਰਮ ਅੱਪਗ੍ਰੇਡ" : "PLATFORM UPGRADE",
      title:
        lang === "hi"
          ? "नई दिल्ली (NDLS) पुनर्विकास: अजमेरी गेट की तरफ संपर्क रहित स्मार्ट गेट सक्रिय"
          : lang === "pa"
          ? "ਨਵੀਂ ਦਿੱਲੀ (NDLS): ਅਜਮੇਰੀ ਗੇਟ ਵੱਲ ਸਮਾਰਟ ਕੰਟੈਕਟਲੈੱਸ ਗੇਟ ਸਰਗਰਮ"
          : "New Delhi (NDLS) Redevelopment: Contactless Smart Gates at Ajmeri Gate Side",
      date: "08 Oct 2026",
      body:
        lang === "hi"
          ? "क्यूआर कोड स्कैनर और चेहरे की पहचान वाले स्वचालित टिकट गेट अब प्लेटफार्म 1 से 16 तक तेज बोर्डिंग के लिए चालू हैं।"
          : lang === "pa"
          ? "QR ਕੋਡ ਸਕੈਨਰ ਅਤੇ ਆਟੋਮੈਟਿਕ ਟਿਕਟ ਗੇਟ ਹੁਣ ਪਲੇਟਫਾਰਮ 1 ਤੋਂ 16 ਤੱਕ ਤੇਜ਼ ਬੋਰਡਿੰਗ ਲਈ ਸ਼ੁਰੂ ਕੀਤੇ ਗਏ ਹਨ।"
          : "QR code scanners and facial-recognition automatic ticket gates are now active across Platforms 1 to 16 for swift, contactless boarding.",
      color: "border-zinc-700 bg-zinc-900 text-zinc-300",
    },
    {
      id: 4,
      type: lang === "hi" ? "नीति अपडेट" : lang === "pa" ? "ਪਾਲਿਸੀ ਅੱਪਡੇਟ" : "POLICY UPDATE",
      title:
        lang === "hi"
          ? "गद्द्वय रेल वॉलेट पर शून्य रद्दीकरण शुल्क गारंटी"
          : lang === "pa"
          ? "ਗੱਦਵਯ ਰੇਲ ਵਾਲਿਟ 'ਤੇ ਜ਼ੀਰੋ ਕੈਂਸਲੇਸ਼ਨ ਫੀਸ ਗਾਰੰਟੀ"
          : "Zero Cancellation Fee Guarantee on GADDVYA Rail Wallet",
      date: lang === "hi" ? "निरंतर" : lang === "pa" ? "ਲਗਾਤਾਰ" : "Ongoing",
      body:
        lang === "hi"
          ? "गद्द्वय रेल वॉलेट का उपयोग करके बुक किए गए सभी टिकट रद्द करने पर 100% पूरा रिफंड 3 सेकंड के भीतर नागरिक वॉलेट में वापस जमा हो जाता है।"
          : lang === "pa"
          ? "ਰੇਲ ਵਾਲਿਟ ਰਾਹੀਂ ਬੁੱਕ ਕੀਤੀ ਗਈ ਕੋਈ ਵੀ ਟਿਕਟ ਰੱਦ ਕਰਨ 'ਤੇ 100% ਪੂਰਾ ਰਿਫੰਡ 3 ਸਕਿੰਟਾਂ ਵਿੱਚ ਵਾਪਸ ਵਾਲਿਟ ਵਿੱਚ ਜਮ੍ਹਾਂ ਹੋ ਜਾਂਦਾ ਹੈ।"
          : "All tickets booked using GADDVYA Rail Wallet receive instantaneous 100% fare refunds credited back into the citizen wallet within 3 seconds of cancellation.",
      color: "border-emerald-500 bg-emerald-950/20 text-emerald-300",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl bg-gray-900 border border-zinc-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-700 via-rose-800 to-indigo-950 p-6 text-white flex justify-between items-start shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-ping" />
              <span className="text-[10px] font-mono tracking-widest text-red-200 uppercase font-bold">
                {t("ministryCirculars")}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black flex items-center gap-2">
              <span>🚨 {t("liveBulletins")}</span>
            </h3>
            <p className="text-xs text-rose-100 mt-1">
              {t("bulletinsSubtitle")}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer text-sm"
          >
            ✕
          </button>
        </div>

        {/* Alerts List */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          {alerts.map((a) => (
            <div key={a.id} className={`p-4 rounded-2xl border ${a.color} space-y-1.5`}>
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold tracking-wider uppercase font-mono">{a.type}</span>
                <span className="text-gray-400 text-[11px]">{a.date}</span>
              </div>
              <h4 className="text-sm font-bold text-white">{a.title}</h4>
              <p className="text-xs text-gray-300 leading-relaxed">{a.body}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex justify-between items-center text-xs text-gray-400 shrink-0">
          <span>{t("helpline139Notice")}</span>
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
