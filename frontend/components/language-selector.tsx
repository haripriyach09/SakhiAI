"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

interface LanguageSelectorProps {
  className?: string;
}

export default function LanguageSelector({
  className = "",
}: LanguageSelectorProps) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <label className="block">
      <span className="sr-only">{t("auth.selectLanguage")}</span>
      <select
        value={language}
        onChange={(event) =>
          setLanguage(event.target.value as typeof language)
        }
        aria-label={t("auth.selectLanguage")}
        className={`rounded-xl border border-[#eadce5] bg-white px-3 py-2 text-sm text-[#76566f] outline-none focus:border-[#b76e8c] ${className}`}
      >
        <option value="English">English</option>
        <option value="Kannada">ಕನ್ನಡ</option>
        <option value="Hindi">हिन्दी</option>
      </select>
    </label>
  );
}
