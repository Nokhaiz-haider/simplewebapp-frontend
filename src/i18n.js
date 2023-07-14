import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "./../src/locales/en.json"
import arTranslation from "./../src/locales/ar.json";

// Add more translations if needed

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    ar: {
      translation: arTranslation,
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
