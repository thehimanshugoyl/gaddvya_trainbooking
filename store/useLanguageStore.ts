import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Language, translations } from "@/lib/i18n";

interface LanguageStore {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set, get) => ({
      lang: "en",
      setLang: (lang: Language) => {
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem("gaddvya_lang", lang);
          } catch (e) {
            // ignore
          }
        }
        set({ lang });
      },
      t: (key: keyof typeof translations.en) => {
        const currentLang = get().lang;
        return translations[currentLang]?.[key] || translations.en[key] || String(key);
      },
    }),
    {
      name: "gaddvya_lang_storage",
      partialize: (state) => ({ lang: state.lang }),
    }
  )
);

// Initial hydration from legacy localStorage key
if (typeof window !== "undefined") {
  try {
    const saved = localStorage.getItem("gaddvya_lang") as Language | null;
    if (saved && (saved === "en" || saved === "hi" || saved === "pa")) {
      useLanguageStore.setState({ lang: saved });
    }

    // Cross-tab / cross-window sync
    window.addEventListener("storage", (e) => {
      if (
        (e.key === "gaddvya_lang" || e.key === "gaddvya_lang_storage") &&
        e.newValue
      ) {
        let newLang = e.newValue;
        if (e.key === "gaddvya_lang_storage") {
          try {
            const parsed = JSON.parse(e.newValue);
            newLang = parsed.state?.lang;
          } catch {}
        }
        if (newLang === "en" || newLang === "hi" || newLang === "pa") {
          useLanguageStore.setState({ lang: newLang as Language });
        }
      }
    });
  } catch (e) {
    // ignore
  }
}
