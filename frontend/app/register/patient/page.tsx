"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { api } from "@/lib/api";
import BrandLogo from "@/components/brand-logo";
import LanguageSelector from "@/components/language-selector";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { isAxiosError } from "axios";

export default function PatientRegisterPage() {
  const router = useRouter();
  const { t } = useLanguage();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("English");
  const [lifeStage, setLifeStage] = useState("Adult");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setMessage("");

    if (!fullName || !email || !password || !age) {
      setMessage(t("auth.requiredFields"));
      return;
    }

    setLoading(true);

    try {
      await api.post("/auth/register", {
        full_name: fullName,
        email,
        password,
        age: Number(age),
        language: preferredLanguage,
        life_stage: lifeStage,
      });

      setMessage(
        t("auth.registrationSuccess")
      );

      // Give the user a moment to see the success message
      setTimeout(() => {
        router.push("/login");
      }, 1200);
    } catch (error: unknown) {
      if (
        isAxiosError(error) &&
        error.response?.status === 400 &&
        typeof error.response.data?.detail === "string" &&
        error.response.data.detail.toLowerCase().includes("email already registered")
      ) {
        setMessage(t("auth.duplicateEmail"));
      } else if (isAxiosError(error) && error.request) {
        setMessage(t("auth.registrationUnavailable"));
      } else {
        setMessage(t("auth.registrationFailed"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fffafd] px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-5 flex justify-end">
          <LanguageSelector />
        </div>

        {/* Back */}
        <button
          type="button"
          onClick={() => router.push("/register")}
          className="mb-8 flex items-center gap-2 text-sm font-medium text-[#76566f] hover:text-[#a65a78]"
        >
          <ArrowLeft size={18} />
          {t("auth.back")}
        </button>

        {/* Header */}
        <div className="mb-8 text-center">
          <BrandLogo className="mx-auto mb-4 max-w-64" />

          <h1 className="text-3xl font-bold text-[#332532]">
            {t("auth.patientRegisterTitle")}
          </h1>

          <p className="mt-2 text-[#76566f]">
            {t("auth.patientRegisterSubtitle")}
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[#f0dce7]"
        >
          <div className="space-y-5">
            {/* Full name */}
            <div>
              <label htmlFor="patient-full-name" className="mb-2 block text-sm font-semibold text-[#332532]">
                {t("auth.fullName")}
              </label>

              <input
                type="text"
                id="patient-full-name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={t("auth.fullNamePlaceholder")}
                className="w-full rounded-xl border border-[#ead8e2] px-4 py-3 outline-none focus:border-[#a65a78]"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="patient-email" className="mb-2 block text-sm font-semibold text-[#332532]">
                {t("auth.email")}
              </label>

              <input
                type="email"
                id="patient-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("auth.emailPlaceholder")}
                className="w-full rounded-xl border border-[#ead8e2] px-4 py-3 outline-none focus:border-[#a65a78]"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="patient-password" className="mb-2 block text-sm font-semibold text-[#332532]">
                {t("auth.password")}
              </label>

              <input
                type="password"
                id="patient-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("auth.passwordPlaceholder")}
                className="w-full rounded-xl border border-[#ead8e2] px-4 py-3 outline-none focus:border-[#a65a78]"
                required
              />
            </div>

            {/* Age */}
            <div>
              <label htmlFor="patient-age" className="mb-2 block text-sm font-semibold text-[#332532]">
                {t("auth.age")}
              </label>

              <input
                type="number"
                id="patient-age"
                min="1"
                max="120"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder={t("auth.agePlaceholder")}
                className="w-full rounded-xl border border-[#ead8e2] px-4 py-3 outline-none focus:border-[#a65a78]"
                required
              />
            </div>

            {/* Language */}
            <div>
              <label htmlFor="patient-preferred-language" className="mb-2 block text-sm font-semibold text-[#332532]">
                {t("auth.preferredLanguage")}
              </label>

              <select
                id="patient-preferred-language"
                value={preferredLanguage}
                onChange={(e) => setPreferredLanguage(e.target.value)}
                className="w-full rounded-xl border border-[#ead8e2] px-4 py-3 outline-none focus:border-[#a65a78]"
              >
                <option value="English">{t("auth.languageEnglish")}</option>
                <option value="Kannada">{t("auth.languageKannada")}</option>
                <option value="Hindi">{t("auth.languageHindi")}</option>
              </select>
            </div>

            {/* Life stage */}
            <div>
              <label htmlFor="patient-life-stage" className="mb-2 block text-sm font-semibold text-[#332532]">
                {t("auth.lifeStage")}
              </label>

              <select
                id="patient-life-stage"
                value={lifeStage}
                onChange={(e) => setLifeStage(e.target.value)}
                className="w-full rounded-xl border border-[#ead8e2] px-4 py-3 outline-none focus:border-[#a65a78]"
              >
                <option value="Adult">{t("auth.adult")}</option>
                <option value="Adolescent">{t("auth.adolescent")}</option>
                <option value="Pregnancy">{t("auth.pregnancy")}</option>
                <option value="Postpartum">{t("auth.postpartum")}</option>
                <option value="Perimenopause">{t("auth.perimenopause")}</option>
                <option value="Menopause">{t("auth.menopause")}</option>
              </select>
            </div>
          </div>

          {/* Message */}
          {message && (
            <div className="mt-5 rounded-xl bg-[#f9edf3] px-4 py-3 text-sm text-[#76566f]">
              {message}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#a65a78] px-5 py-3 font-semibold text-white transition hover:bg-[#914f69] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? t("auth.creatingAccount") : t("auth.patientRegisterTitle")}
          </button>
        </form>

        {/* Login */}
        <p className="mt-6 text-center text-sm text-[#76566f]">
          {t("auth.alreadyHavePatientAccount")}{" "}
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="font-semibold text-[#a65a78] hover:underline"
          >
            {t("auth.login")}
          </button>
        </p>
      </div>
    </main>
  );
}