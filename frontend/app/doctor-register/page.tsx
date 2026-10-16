"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import BrandLogo from "@/components/brand-logo";
import LanguageSelector from "@/components/language-selector";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { isAxiosError } from "axios";

export default function DoctorRegisterPage() {
  const router = useRouter();
  const { t } = useLanguage();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    specialization: "",
    hospital: "",
    experience_years: "",
    phone: "",
    bio: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const registerDoctor = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      await api.post("/doctor/register", {
        full_name: form.full_name,
        email: form.email,
        password: form.password,
        specialization: form.specialization,
        hospital: form.hospital || null,
        experience_years: form.experience_years
          ? Number(form.experience_years)
          : null,
        phone: form.phone || null,
        bio: form.bio || null,
      });

      setMessage(
        t("auth.doctorRegisterSuccess")
      );

      setTimeout(() => {
        router.push("/login?role=doctor");
      }, 1500);
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
        setMessage(t("auth.doctorRegistrationFailed"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fffafd] px-4 py-10">
      <div className="mx-auto max-w-2xl">

        <div className="mb-5 flex justify-end">
          <LanguageSelector />
        </div>

        <div className="mb-8 text-center">
          <BrandLogo className="mx-auto w-full max-w-64" />

          <h1 className="mt-2 text-3xl font-bold text-[#332532]">
            {t("auth.doctorRegisterTitle")}
          </h1>

          <p className="mt-2 text-sm text-[#76566f]">
            {t("auth.doctorRegisterSubtitle")}
          </p>
        </div>

        <form
          onSubmit={registerDoctor}
          className="rounded-2xl border border-[#f0dce5] bg-white p-6 shadow-sm sm:p-8"
        >

          <div className="grid gap-5 sm:grid-cols-2">

            <div>
              <label htmlFor="doctor-full-name" className="mb-2 block text-sm font-medium text-[#6f5968]">
                {t("auth.fullName")} *
              </label>

              <input
                name="full_name"
                id="doctor-full-name"
                value={form.full_name}
                onChange={handleChange}
                required
                placeholder={t("auth.fullName")}
                className="w-full rounded-xl border border-[#eadce5] px-4 py-3 text-sm outline-none focus:border-[#b76e8c]"
              />
            </div>

            <div>
              <label htmlFor="doctor-email" className="mb-2 block text-sm font-medium text-[#6f5968]">
                {t("auth.email")} *
              </label>

              <input
                type="email"
                name="email"
                id="doctor-email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder={t("auth.emailPlaceholder")}
                className="w-full rounded-xl border border-[#eadce5] px-4 py-3 text-sm outline-none focus:border-[#b76e8c]"
              />
            </div>

            <div>
              <label htmlFor="doctor-password" className="mb-2 block text-sm font-medium text-[#6f5968]">
                {t("auth.password")} *
              </label>

              <input
                type="password"
                name="password"
                id="doctor-password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
                placeholder={t("auth.passwordPlaceholder")}
                className="w-full rounded-xl border border-[#eadce5] px-4 py-3 text-sm outline-none focus:border-[#b76e8c]"
              />
            </div>

            <div>
              <label htmlFor="doctor-specialization" className="mb-2 block text-sm font-medium text-[#6f5968]">
                {t("auth.specialization")} *
              </label>

              <input
                name="specialization"
                id="doctor-specialization"
                value={form.specialization}
                onChange={handleChange}
                required
                placeholder={t("auth.specialization")}
                className="w-full rounded-xl border border-[#eadce5] px-4 py-3 text-sm outline-none focus:border-[#b76e8c]"
              />
            </div>

            <div>
              <label htmlFor="doctor-hospital" className="mb-2 block text-sm font-medium text-[#6f5968]">
                {t("auth.hospitalClinic")}
              </label>

              <input
                name="hospital"
                id="doctor-hospital"
                value={form.hospital}
                onChange={handleChange}
                placeholder={t("auth.hospitalPlaceholder")}
                className="w-full rounded-xl border border-[#eadce5] px-4 py-3 text-sm outline-none focus:border-[#b76e8c]"
              />
            </div>

            <div>
              <label htmlFor="doctor-experience" className="mb-2 block text-sm font-medium text-[#6f5968]">
                {t("auth.experienceYears")}
              </label>

              <input
                type="number"
                min="0"
                name="experience_years"
                id="doctor-experience"
                value={form.experience_years}
                onChange={handleChange}
                placeholder="5"
                className="w-full rounded-xl border border-[#eadce5] px-4 py-3 text-sm outline-none focus:border-[#b76e8c]"
              />
            </div>

            <div>
              <label htmlFor="doctor-phone" className="mb-2 block text-sm font-medium text-[#6f5968]">
                {t("auth.phone")}
              </label>

              <input
                name="phone"
                id="doctor-phone"
                value={form.phone}
                onChange={handleChange}
                placeholder={t("auth.phonePlaceholder")}
                className="w-full rounded-xl border border-[#eadce5] px-4 py-3 text-sm outline-none focus:border-[#b76e8c]"
              />
            </div>

          </div>

          <div className="mt-5">
            <label htmlFor="doctor-bio" className="mb-2 block text-sm font-medium text-[#6f5968]">
              {t("auth.professionalBio")}
            </label>

            <textarea
              name="bio"
              id="doctor-bio"
              value={form.bio}
              onChange={handleChange}
              rows={4}
              placeholder={t("auth.bioPlaceholder")}
              className="w-full resize-none rounded-xl border border-[#eadce5] px-4 py-3 text-sm outline-none focus:border-[#b76e8c]"
            />
          </div>

          {message && (
            <div className="mt-5 rounded-xl bg-[#fdeaf1] px-4 py-3 text-sm text-[#76566f]">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-[#b76e8c] px-4 py-3 font-semibold text-white transition hover:bg-[#a85f7d] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? t("auth.creatingAccount")
              : t("auth.registerDoctor")}
          </button>

          <button
            type="button"
            onClick={() => router.push("/login")}
            className="mt-3 w-full rounded-xl border border-[#eadce5] px-4 py-3 text-sm font-semibold text-[#76566f] hover:bg-[#fff8fb]"
          >
            {t("auth.alreadyHavePatientAccount")} {t("auth.login")}
          </button>

        </form>

      </div>
    </main>
  );
}