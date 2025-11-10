import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation.json";
import translationAR from "./locales/ar/translation.json";

const resources = {
  en: { translation: translationEN },
  ar: { translation: translationAR },
};

i18n.use(initReactI18next).init({
  resources,
  // Initialize language from localStorage if available, otherwise default to 'en'
  lng: localStorage.getItem("lang") || "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

// Set document direction according to initial language
if (typeof document !== "undefined") {
  document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  // also set lang attribute so CSS selectors like html[lang] work if used elsewhere
  document.documentElement.lang = i18n.language || 'en';
}

// Persist language choice and update dir on language change
i18n.on("languageChanged", (lng) => {
  try {
    localStorage.setItem("lang", lng);
  } catch (e) {
    // ignore storage errors
  }
  if (typeof document !== "undefined") {
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lng || 'en';
  }
});

export default i18n;
