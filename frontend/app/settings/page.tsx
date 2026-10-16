"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { useRouter } from "next/navigation";
import BrandLogo from "@/components/brand-logo";
import { useState } from "react";
import {
  Bell,
  Clock3,
  Globe2,
  ShieldCheck,
  Brain,
  LogOut,
  Trash2,
  ChevronDown,
  ChevronUp,
  Save,
} from "lucide-react";

export default function SettingsPage() {
  const { language, setLanguage, t } = useLanguage();
  const router = useRouter();

  const [notifications, setNotifications] = useState(true);
  const [reminders, setReminders] = useState(true);

  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showAIUsage, setShowAIUsage] = useState(false);

  const [message, setMessage] = useState("");

  // =========================================
  // SAVE SETTINGS
  // =========================================

  const handleSave = () => {
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
          language,
          notifications,
          reminders,
        })
      );

      setMessage(t("settings.saved"));

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch {
      setMessage(t("settings.saveError"));
    }
  };

  // =========================================
  // LOGOUT
  // =========================================

  const logout = () => {
    localStorage.removeItem("sakhi_token");
    router.push("/login");
  };

  // =========================================
  // DELETE ACCOUNT
  // =========================================

  const deleteAccount = () => {
    const confirmed = window.confirm(
      t("settings.deleteConfirmation")
    );

    if (!confirmed) return;

    setMessage(t("settings.deleteUnavailable"));
  };

  return (
    <main className="min-h-screen bg-[#fff8fb] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* HEADER */}
        <div className="mb-8">
          <BrandLogo className="mb-3 max-w-48" />

          <h1 className="mt-1 text-3xl font-bold text-[#332532]">
            {t("settings.title")}
          </h1>

          <p className="mt-2 text-[#76566f]">
            {t("settings.subtitle")}
          </p>
        </div>

        {/* SUCCESS MESSAGE */}
        {message && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {message}
          </div>
        )}

        {/* =========================================
            PREFERENCES
        ========================================= */}

        <section className="mb-6 rounded-2xl border border-[#f0dce5] bg-white p-6 shadow-sm">

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-[#332532]">
              {t("settings.preferences")}
            </h2>

            <p className="mt-1 text-sm text-[#8b7285]">
              {t("settings.preferencesDescription")}
            </p>
          </div>

          <div className="space-y-4">

            {/* LANGUAGE */}

            <div className="flex flex-col gap-4 rounded-xl bg-[#fff8fb] p-4 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fce8f0]">
                  <Globe2 className="h-5 w-5 text-[#b76e8c]" />
                </div>

                <div>
                  <p className="font-medium text-[#4d3a4a]">
                    {t("settings.language")}
                  </p>

                  <p className="text-sm text-[#8b7285]">
                    {t("settings.languageDescription")}
                  </p>
                </div>

              </div>

              <select
                value={language}
                onChange={(e) =>
                  setLanguage(e.target.value as typeof language)
                }
                aria-label={t("settings.language")}
                className="w-full rounded-xl border border-[#eadce5] bg-white px-4 py-2.5 text-sm text-[#4d3a4a] outline-none focus:border-[#c58aaa] sm:w-auto"
              >
                <option value="English">
                  English
                </option>

                <option value="Kannada">
                  ಕನ್ನಡ
                </option>

                <option value="Hindi">
                  हिन्दी
                </option>
              </select>

            </div>

            {/* NOTIFICATIONS */}

            <SettingToggle
              icon={<Bell className="h-5 w-5" />}
              title={t("settings.notifications")}
              description={t("settings.notificationsDescription")}
              ariaLabel={t("settings.toggleNotifications")}
              enabled={notifications}
              onChange={() =>
                setNotifications(!notifications)
              }
            />

            {/* REMINDERS */}

            <SettingToggle
              icon={<Clock3 className="h-5 w-5" />}
              title={t("settings.reminders")}
              description={t("settings.remindersDescription")}
              ariaLabel={t("settings.toggleReminders")}
              enabled={reminders}
              onChange={() =>
                setReminders(!reminders)
              }
            />

          </div>

          {/* SAVE */}

          <div className="mt-6 border-t border-[#f0dce5] pt-6">

            <button
              onClick={handleSave}
              className="flex items-center gap-2 rounded-xl bg-[#b76e8c] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#a85f7d]"
            >
              <Save className="h-4 w-4" />
              {t("settings.savePreferences")}
            </button>

          </div>

        </section>

        {/* =========================================
            PRIVACY & SECURITY
        ========================================= */}

        <section className="mb-6 rounded-2xl border border-[#f0dce5] bg-white p-6 shadow-sm">

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-[#332532]">
              {t("settings.privacySecurity")}
            </h2>

            <p className="mt-1 text-sm text-[#8b7285]">
              {t("settings.privacyDescription")}
            </p>
          </div>

          <div className="space-y-4">

            {/* HEALTH DATA PRIVACY */}

            <div className="rounded-xl border border-[#eee1e8]">

              <button
                onClick={() =>
                  setShowPrivacy(!showPrivacy)
                }
                className="flex w-full items-center justify-between p-4 text-left"
              >

                <div className="flex items-center gap-4">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8f5fc]">
                    <ShieldCheck className="h-5 w-5 text-[#8066a5]" />
                  </div>

                  <div>
                    <p className="font-medium text-[#4d3a4a]">
                      {t("settings.healthDataPrivacy")}
                    </p>

                    <p className="text-sm text-[#8b7285]">
                      {t("settings.healthDataPrivacyDescription")}
                    </p>
                  </div>

                </div>

                {showPrivacy ? (
                  <ChevronUp className="h-5 w-5 text-[#8b7285]" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-[#8b7285]" />
                )}

              </button>

              {showPrivacy && (
                <div className="border-t border-[#eee1e8] px-4 pb-4 pt-4 text-sm leading-6 text-[#76566f]">

                  <p>
                    {t("settings.healthPrivacyDetails")}
                  </p>

                  <p className="mt-3">
                    {t("settings.accessDetails")}
                  </p>

                </div>
              )}

            </div>

            {/* AI DATA USAGE */}

            <div className="rounded-xl border border-[#eee1e8]">

              <button
                onClick={() =>
                  setShowAIUsage(!showAIUsage)
                }
                className="flex w-full items-center justify-between p-4 text-left"
              >

                <div className="flex items-center gap-4">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fce8f0]">
                    <Brain className="h-5 w-5 text-[#b76e8c]" />
                  </div>

                  <div>
                    <p className="font-medium text-[#4d3a4a]">
                      {t("settings.aiDataUsage")}
                    </p>

                    <p className="text-sm text-[#8b7285]">
                      {t("settings.aiDataUsageDescription")}
                    </p>
                  </div>

                </div>

                {showAIUsage ? (
                  <ChevronUp className="h-5 w-5 text-[#8b7285]" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-[#8b7285]" />
                )}

              </button>

              {showAIUsage && (
                <div className="border-t border-[#eee1e8] px-4 pb-4 pt-4 text-sm leading-6 text-[#76566f]">

                  <p>
                    {t("settings.aiUsageDetails")}
                  </p>

                  <p className="mt-3">
                    {t("settings.aiDisclaimer")}
                  </p>

                </div>
              )}

            </div>

          </div>

        </section>

        {/* =========================================
            ACCOUNT ACTIONS
        ========================================= */}

        <section className="rounded-2xl border border-[#f0dce5] bg-white p-6 shadow-sm">

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-[#332532]">
              {t("settings.account")}
            </h2>

            <p className="mt-1 text-sm text-[#8b7285]">
              {t("settings.accountDescription")}
            </p>
          </div>

          <div className="space-y-3">

            {/* LOGOUT */}

            <button
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-xl border border-[#eadce5] px-4 py-3 text-left text-sm font-medium text-[#76566f] transition hover:bg-[#fff5f8]"
            >
              <LogOut className="h-5 w-5" />
              {t("settings.logout")}
            </button>

            {/* DELETE */}

            <button
              onClick={deleteAccount}
              className="flex w-full items-center gap-3 rounded-xl border border-red-200 px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              <Trash2 className="h-5 w-5" />
              {t("settings.deleteAccount")}
            </button>

          </div>

        </section>

        {/* DISCLAIMER */}

        <div className="mt-6 rounded-2xl border border-[#ded3f0] bg-[#f8f5fc] p-5">

          <p className="text-sm font-medium text-[#4d3a4a]">
            🔒 {t("settings.privacyTitle")}
          </p>

          <p className="mt-1 text-xs leading-5 text-[#76566f]">
            {t("settings.privacyFooter")}
          </p>

        </div>

      </div>
    </main>
  );
}

/* ============================================================
   SETTING TOGGLE
============================================================ */

function SettingToggle({
  icon,
  title,
  description,
  ariaLabel,
  enabled,
  onChange,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  ariaLabel: string;
  enabled: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-[#fff8fb] p-4">

      <div className="flex items-center gap-4">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fce8f0] text-[#b76e8c]">
          {icon}
        </div>

        <div>
          <p className="font-medium text-[#4d3a4a]">
            {title}
          </p>

          <p className="text-sm text-[#8b7285]">
            {description}
          </p>
        </div>

      </div>

      <button
        onClick={onChange}
        className={`relative h-6 w-11 rounded-full transition ${
          enabled
            ? "bg-[#b76e8c]"
            : "bg-[#d8ccd3]"
        }`}
        aria-label={ariaLabel}
        aria-pressed={enabled}
      >

        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
            enabled
              ? "left-6"
              : "left-1"
          }`}
        />

      </button>

    </div>
  );
}