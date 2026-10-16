import en from "./translations/en";
import kn from "./translations/kn";
import hi from "./translations/hi";

export type SupportedLanguage = "English" | "Kannada" | "Hindi";

export const getSavedLanguage = (): SupportedLanguage => {
  if (typeof window === "undefined") {
    return "English";
  }

  try {
    const saved = localStorage.getItem("sakhi_settings");

    if (!saved) {
      return "English";
    }

    const settings = JSON.parse(saved);

    if (
      settings.language === "Kannada" ||
      settings.language === "Hindi"
    ) {
      return settings.language;
    }

    return "English";
  } catch {
    return "English";
  }
};

export const getTranslations = (
  language: SupportedLanguage
) => {
  switch (language) {
    case "Kannada":
      return kn;

    case "Hindi":
      return hi;

    default:
      return en;
  }
};