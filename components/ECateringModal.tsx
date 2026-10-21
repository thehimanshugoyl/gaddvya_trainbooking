"use client";

import React, { useState, useEffect } from "react";
import { useLanguageStore } from "@/store/useLanguageStore";

interface ECateringModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
}

export default function ECateringModal({
  isOpen,
  onClose,
  initialCategory = "all",
}: ECateringModalProps) {
  const { lang, t } = useLanguageStore();
  const [pnrNumber, setPnrNumber] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [orderedItem, setOrderedItem] = useState<string | null>(null);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory, isOpen]);

  if (!isOpen) return null;

  const categories = [
    { id: "all", label: t("catAll") },
    { id: "thali", label: t("catThali") },
    { id: "meals", label: t("catMeals") },
    { id: "biryani", label: t("catBiryani") },
    { id: "breakfast", label: t("catBreakfast") },
    { id: "snacks", label: t("catSnacks") },
    { id: "jain", label: t("catJain") },
  ];

  const menuItems = [
    {
      id: 1,
      name: "Special IRCTC Maharaja Veg Thali",
      brand: "IRCTC Pantry",
      price: 240,
      rating: "4.8",
      veg: true,
      category: "thali",
      image: "🍱",
      desc: "Dal Makhani, Shahi Paneer, Rice, 3 Rotis, Gulab Jamun, Salad & Pickle",
    },
    {
      id: 2,
      name: "Paneer Butter Masala Combo + 3 Parathas",
      brand: "Haldiram's",
      price: 280,
      rating: "4.9",
      veg: true,
      category: "meals",
      image: "🍛",
      desc: "Rich cottage cheese gravy with butter parathas and mint chutney",
    },
    {
      id: 3,
      name: "Hyderabadi Dum Biryani + Raita",
      brand: "Behrouz Biryani",
      price: 320,
      rating: "4.7",
      veg: false,
      category: "biryani",
      image: "🍚",
      desc: "Slow-cooked saffron basmati rice with aromatic spices & spiced curd",
    },
    {
      id: 4,
      name: "Masala Dosa with Sambar & Chutneys",
      brand: "Saravana Bhavan",
      price: 160,
      rating: "4.8",
      veg: true,
      category: "breakfast",
      image: "🥞",
      desc: "Crispy rice crepe filled with spiced potato masala and lentil stew",
    },
    {
      id: 5,
      name: "Medium Peppy Paneer Pizza",
      brand: "Domino's Pizza",
      price: 349,
      rating: "4.6",
      veg: true,
      category: "snacks",
      image: "🍕",
      desc: "Juicy paneer, crisp capsicum and spicy red paprika station delivery",
    },
    {
      id: 6,
      name: "Pure Jain Satvik Deluxe Meal (No Onion/Garlic)",
      brand: "Govinda's",
      price: 260,
      rating: "4.9",
      veg: true,
      category: "jain",
      image: "🥗",
      desc: "Satvik Dal, Paneer, Jeera Rice, Tawa Phulkas & Sweet. 100% No Root Veg",
    },
  ];

  const filteredItems =
    selectedCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  const handleOrder = (name: string) => {
    setOrderedItem(name);
    setTimeout(() => {
      alert(`🎉 ${t("orderSuccessAlert")}\n\nItem: ${name}`);
      setOrderedItem(null);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-3xl bg-gray-900 border border-zinc-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 p-6 text-white flex justify-between items-start shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-white/20 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Official IRCTC e-Catering Partner
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black flex items-center gap-2">
              <span>🍱 {t("foodOnTrack")}</span>
            </h3>
            <p className="text-xs text-orange-100 mt-1 max-w-xl">
              {t("foodSubtitle")}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer text-sm"
          >
            ✕
          </button>
        </div>

        {/* PNR verification & Categories bar */}
        <div className="p-4 bg-zinc-950 border-b border-zinc-800 flex flex-col gap-3 shrink-0">
          <div className="flex gap-2 w-full">
            <input
              type="text"
              maxLength={10}
              value={pnrNumber}
              onChange={(e) => setPnrNumber(e.target.value.replace(/\D/g, ""))}
              placeholder={t("enterPnrPrompt")}
              className="flex-1 bg-gray-900 border border-zinc-700 rounded-xl px-3 py-2 text-white text-xs font-mono focus:border-orange-500 focus:outline-none"
            />
            <button
              onClick={() => {
                if (pnrNumber.length === 10) {
                  alert(`✓ PNR ${pnrNumber} verified. Berth allocation active.`);
                } else {
                  alert("Please enter a valid 10-digit PNR.");
                }
              }}
              className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
            >
              {t("verifyPnr")}
            </button>
          </div>

          {/* Categories */}
          <div className="flex gap-1.5 overflow-x-auto text-xs pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? "bg-white text-black font-bold shadow-md"
                    : "bg-zinc-800 text-gray-300 hover:text-white hover:bg-zinc-700"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-zinc-950 border border-zinc-800 hover:border-zinc-700 p-4 rounded-2xl flex gap-4 transition shadow-md"
            >
              <div className="text-4xl bg-zinc-900 w-16 h-16 rounded-xl flex items-center justify-center shrink-0 border border-zinc-800">
                {item.image}
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-bold border ${
                        item.veg
                          ? "border-emerald-500/40 text-emerald-400 bg-emerald-950/40"
                          : "border-red-500/40 text-red-400 bg-red-950/40"
                      }`}
                    >
                      {item.veg ? t("pureVeg") : t("nonVeg")}
                    </span>
                    <span className="text-[11px] text-gray-400 font-medium">{item.brand}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white line-clamp-1">{item.name}</h4>
                  <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">{item.desc}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs">
                    <span className="font-extrabold text-amber-400 text-base">₹{item.price}</span>
                    <span className="text-gray-400 font-mono">★ {item.rating}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleOrder(item.name)}
                  disabled={orderedItem === item.name}
                  className="mt-3 w-full bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white font-bold py-2 rounded-xl text-xs transition cursor-pointer shadow-md"
                >
                  {orderedItem === item.name ? "Placing Order..." : `${t("orderNow")} →`}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex justify-between items-center text-xs text-gray-400 shrink-0">
          <span>{t("fssaiNotice")}</span>
          <button
            onClick={onClose}
            className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-1.5 rounded-xl text-xs font-semibold cursor-pointer"
          >
            {t("closeBtn")}
          </button>
        </div>
      </div>
    </div>
  );
}
