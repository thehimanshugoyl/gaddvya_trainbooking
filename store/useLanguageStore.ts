import { create } from "zustand";
import { Language, translations } from "@/lib/i18n";

interface LanguageStore {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
}

export const useLanguageStore = create<LanguageStore>((set, get) => ({
  lang: "en",
  setLang: (lang: Language) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("gaddvya_lang", lang);
    }
    set({ lang });
  },
  t: (key: keyof typeof translations.en) => {
    const currentLang = get().lang;
    return translations[currentLang]?.[key] || translations.en[key] || String(key);
  },
}));

// Hydrate from localStorage on client side
if (typeof window !== "undefined") {
  const saved = localStorage.getItem("gaddvya_lang") as Language | null;
  if (saved && (saved === "en" || saved === "hi" || saved === "pa")) {
    useLanguageStore.setState({ lang: saved });
  }

  // Cross-tab / cross-window sync
  window.addEventListener("storage", (e) => {
    if (e.key === "gaddvya_lang" && e.newValue && (e.newValue === "en" || e.newValue === "hi" || e.newValue === "pa")) {
      useLanguageStore.setState({ lang: e.newValue as Language });
    }
  });
}
