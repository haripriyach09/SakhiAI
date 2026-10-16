"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  Language,
  translations,
} from "./translations";

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => any;
};

const LanguageContext =
  createContext<LanguageContextType | undefined>(
    undefined
  );

function getNestedValue(
  object: any,
  path: string
): any {
  const value = path
    .split(".")
    .reduce(
      (current, key) => current?.[key],
      object
    );

  return value ?? path;
}

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguageState] =
    useState<Language>("English");

  // ==========================================
  // LOAD SAVED LANGUAGE
  // ==========================================

  useEffect(() => {
    const loadLanguage = () => {
      try {
        const saved =
          localStorage.getItem("sakhi_settings");

        if (!saved) return;

        const settings = JSON.parse(saved);

        if (
          settings.language === "English" ||
          settings.language === "Kannada" ||
          settings.language === "Hindi"
        ) {
          setLanguageState(settings.language);
        }
      } catch {
        console.error("Unable to load language preferences.");
      }
    };

    loadLanguage();
    const languageLoadTimeout = window.setTimeout(loadLanguage, 0);

    window.addEventListener(
      "sakhi-language-change",
      loadLanguage
    );

    return () => {
      window.clearTimeout(languageLoadTimeout);
      window.removeEventListener(
        "sakhi-language-change",
        loadLanguage
      );
    };
  }, []);

  // ==========================================
  // CHANGE LANGUAGE
  // ==========================================

  const setLanguage = (
    newLanguage: Language
  ) => {
    setLanguageState(newLanguage);

    try {
      const existing =
        localStorage.getItem("sakhi_settings");

      const settings = existing
        ? JSON.parse(existing)
        : {};

      localStorage.setItem(
        "sakhi_settings",
        JSON.stringify({
          ...settings,
          language: newLanguage,
        })
      );

      window.dispatchEvent(
        new Event("sakhi-language-change")
      );
    } catch {
      console.error("Unable to save language preferences.");
    }
  };

  // ==========================================
  // TRANSLATION FUNCTION
  // ==========================================

  const t = (key: string): any => {
    const currentTranslations =
      translations[language];

    const translated =
      getNestedValue(
        currentTranslations,
        key
      );
      
    return translated;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

// ==========================================
// HOOK
// ==========================================

export function useLanguage() {
  const context =
    useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}
