"use client";

import { useRouter } from "next/navigation";
import BrandLogo from "@/components/brand-logo";
import LanguageSelector from "@/components/language-selector";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import {
  Stethoscope,
  ArrowRight,
  UserRound,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-[#fffafd] px-6 py-12">
      <div className="mx-auto max-w-4xl">

        <div className="mb-5 flex justify-end">
          <LanguageSelector />
        </div>

        {/* Header */}
        <div className="mb-10 text-center">
          <BrandLogo className="mx-auto max-w-56" />

          <h1 className="mt-5 text-3xl font-bold text-[#332532]">
            {t("auth.registerTitle")}
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#76566f]">
            {t("auth.registerDescription")}
          </p>
        </div>

        {/* Account Options */}
        <div className="grid gap-6 md:grid-cols-2">

          {/* Patient */}
          <div className="rounded-3xl border border-[#f0dce5] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fce8f0]">
              <UserRound className="h-7 w-7 text-[#b76e8c]" />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-[#332532]">
              {t("auth.patientAccount")}
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#76566f]">
              {t("auth.patientDescription")}
            </p>

            <ul className="mt-5 space-y-2 text-sm text-[#76566f]">
              <li>✓ {t("auth.healthTracking")}</li>
              <li>✓ {t("auth.cycleTracking")}</li>
              <li>✓ {t("auth.emotionalSupport")}</li>
              <li>✓ {t("auth.healthInsights")}</li>
              <li>✓ {t("auth.consultationRequests")}</li>
            </ul>

            <button
              onClick={() => router.push("/register/patient")}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#b76e8c] px-5 py-3.5 font-semibold text-white transition hover:bg-[#a85f7d]"
            >
              {t("auth.registerPatient")}
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          {/* Doctor */}
          <div className="rounded-3xl border border-[#e6dcef] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f1eafb]">
              <Stethoscope className="h-7 w-7 text-[#8064a2]" />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-[#332532]">
              {t("auth.professionalAccount")}
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#76566f]">
              {t("auth.professionalDescription")}
            </p>

            <ul className="mt-5 space-y-2 text-sm text-[#76566f]">
              <li>✓ {t("auth.professionalProfile")}</li>
              <li>✓ {t("auth.viewRequests")}</li>
              <li>✓ {t("auth.acceptDecline")}</li>
              <li>✓ {t("auth.consultationNotes")}</li>
              <li>✓ {t("auth.consultationHistory")}</li>
            </ul>

            <button
              onClick={() => router.push("/doctor-register")}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl border border-[#d9c9e5] bg-[#f8f4fc] px-5 py-3.5 font-semibold text-[#76566f] transition hover:bg-[#f1eafb]"
            >
              {t("auth.registerProfessional")}
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

        </div>

        {/* Login */}
        <div className="mt-8 text-center">
          <p className="text-sm text-[#76566f]">
            {t("auth.alreadyHaveAccount")}
          </p>

          <button
            onClick={() => router.push("/login")}
            className="mt-2 font-semibold text-[#a65a78] hover:underline"
          >
            {t("auth.loginToAccount")}
          </button>
        </div>

      </div>
    </main>
  );
}