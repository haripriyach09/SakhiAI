"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import BrandLogo from "@/components/brand-logo";
import {
  HeartPulse,
  Brain,
  CalendarDays,
  Baby,
  MessageCircle,
  Stethoscope,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function HomePage() {
  const { language, setLanguage, t } = useLanguage();
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#fffafd] text-[#332532]">

      {/* ================= HEADER ================= */}

      <header className="sticky top-0 z-50 border-b border-[#f3dfe8] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 max-sm:flex-col max-sm:items-stretch sm:gap-6 sm:px-6 sm:py-4">

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex min-w-0 shrink-0 items-center"
            aria-label="SakhiAI"
          >
            <BrandLogo className="w-32 sm:w-44" />
          </button>

<div className="flex min-w-0 items-center justify-end gap-2 max-sm:w-full sm:gap-3">

  {/* LANGUAGE */}
  <select
    value={language}
    onChange={(e) => setLanguage(e.target.value as typeof language)}
    aria-label={t("landing.selectLanguage")}
    className="max-w-28 rounded-xl border border-[#eadce5] bg-white px-2 py-2 text-xs font-medium text-[#76566f] outline-none focus:border-[#c58aaa] sm:max-w-none sm:px-3 sm:text-sm"
  >
    <option value="English">English</option>
    <option value="Kannada">ಕನ್ನಡ</option>
    <option value="Hindi">हिन्दी</option>
  </select>

          {/* LOGIN */}
          <button
            onClick={() => router.push("/login")}
            className="whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold text-[#76566f] hover:bg-[#fff3f7]"
          >
            {t("landing.login")}
          </button>

          {/* GET STARTED */}
          <button
            onClick={() => router.push("/register")}
            className="whitespace-nowrap rounded-xl bg-[#b76e8c] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#a85f7d]"
          >
            {t("landing.getStarted")}
          </button>

        </div>

        </div>
      </header>


      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">

          <div>

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#f0d5e1] bg-white px-4 py-2 text-sm text-[#a65a78] shadow-sm">
              <Sparkles className="h-4 w-4" />
              {t("landing.heroBadge")}
            </div>

            <h2 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              {t("landing.heroTitle")}
              <span className="block text-[#b76e8c]">
                {t("landing.heroHighlight")}
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-[#76566f] sm:text-lg">
              {t("landing.heroDescription")}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <button
                onClick={() => router.push("/register")}
                className="flex items-center gap-2 rounded-xl bg-[#b76e8c] px-6 py-3.5 font-semibold text-white shadow-sm hover:bg-[#a85f7d]"
              >
                {t("landing.startJourney")}
                <ArrowRight className="h-5 w-5" />
              </button>

              <button
                onClick={() => router.push("/doctor-register")}
                className="flex items-center gap-2 rounded-xl border border-[#ead5df] bg-white px-6 py-3.5 font-semibold text-[#76566f] hover:bg-[#fff5f8]"
              >
                <Stethoscope className="h-5 w-5" />
                {t("landing.doctorPortal")}
              </button>

              <button
                onClick={() => {
                  document
                    .getElementById("about")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="rounded-xl border border-[#ead5df] bg-white px-6 py-3.5 font-semibold text-[#76566f] hover:bg-[#fff5f8]"
              >
                {t("landing.learnMore")}
              </button>

            </div>

            <p className="mt-5 text-xs text-[#987f8e]">
              {t("landing.awarenessNotice")}
            </p>

          </div>


          {/* Hero visual */}

          <div className="relative">

            <div className="rounded-[2rem] border border-[#f0dce5] bg-white p-6 shadow-xl">

              <div className="rounded-2xl bg-[#fff3f7] p-6">

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#8b7285]">
                      {t("landing.journey")}
                    </p>

                    <h3 className="mt-1 text-2xl font-bold text-[#4a3443]">
                      {t("landing.manyNeeds")}
                    </h3>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
                    <HeartPulse className="h-6 w-6 text-[#b76e8c]" />
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">

                  <FeatureMini
                    icon={<CalendarDays className="h-5 w-5" />}
                    title={t("landing.cycle")}
                    text={t("landing.trackPatterns")}
                  />

                  <FeatureMini
                    icon={<Brain className="h-5 w-5" />}
                    title={t("landing.wellness")}
                    text={t("landing.understandTrends")}
                  />

                  <FeatureMini
                    icon={<MessageCircle className="h-5 w-5" />}
                    title={t("landing.sakhiAi")}
                    text={t("landing.emotionalSupport")}
                  />

                  <FeatureMini
                    icon={<Stethoscope className="h-5 w-5" />}
                    title={t("landing.doctors")}
                    text={t("landing.connectSafely")}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ================= ABOUT ================= */}

      <section id="about" className="border-y border-[#f3e2e9] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-sm font-semibold uppercase tracking-wider text-[#b76e8c]">
              {t("landing.about")}
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              {t("landing.lifeCycleTitle")}
            </h2>

            <p className="mt-5 leading-7 text-[#76566f]">
              {t("landing.aboutDescription")}
            </p>

          </div>


          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            <InfoCard
              icon={<CalendarDays />}
              title={t("landing.menstrualHealth")}
              text={t("landing.menstrualDescription")}
            />

            <InfoCard
              icon={<Baby />}
              title={t("landing.pregnancyPostpartum")}
              text={t("landing.pregnancyDescription")}
            />

            <InfoCard
              icon={<Brain />}
              title={t("landing.mentalWellness")}
              text={t("landing.mentalDescription")}
            />

            <InfoCard
              icon={<HeartPulse />}
              title={t("landing.generalWellness")}
              text={t("landing.generalDescription")}
            />

          </div>

        </div>
      </section>
      {/* ================= PATIENT & DOCTOR PORTALS ================= */}

      <section className="bg-[#fffafd]">
        <div className="mx-auto max-w-7xl px-6 py-20">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-sm font-semibold uppercase tracking-wider text-[#b76e8c]">
              {t("landing.twoExperiences")}
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              {t("landing.portalsTitle")}
            </h2>

            <p className="mt-5 leading-7 text-[#76566f]">
              {t("landing.portalsDescription")}
            </p>

          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">

            {/* PATIENT PORTAL */}

            <div className="rounded-3xl border border-[#f0dce5] bg-white p-8 shadow-sm">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fce8f0]">
                <HeartPulse className="h-7 w-7 text-[#b76e8c]" />
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                {t("landing.patientPortal")}
              </h3>

              <p className="mt-3 leading-7 text-[#76566f]">
                {t("landing.patientDescription")}
              </p>

              <div className="mt-6 space-y-3 text-sm text-[#76566f]">
                <p>✓ {t("landing.healthTracking")}</p>
                <p>✓ {t("landing.cycleTracking")}</p>
                <p>✓ {t("landing.pmosAwareness")}</p>
                <p>✓ {t("landing.pregnancyWellbeing")}</p>
                <p>✓ {t("landing.mentalAssessments")}</p>
                <p>✓ {t("landing.companion")}</p>
                <p>✓ {t("landing.explainableInsights")}</p>
                <p>✓ {t("landing.consultations")}</p>
                <p>✓ {t("landing.reportsHistory")}</p>
              </div>

              <button
                onClick={() => router.push("/register")}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#b76e8c] px-6 py-3.5 font-semibold text-white hover:bg-[#a85f7d]"
              >
                {t("landing.createPatientAccount")}
                <ArrowRight className="h-5 w-5" />
              </button>

              <button
                onClick={() => router.push("/login")}
                className="mt-3 w-full rounded-xl border border-[#ead5df] px-6 py-3 font-semibold text-[#76566f] hover:bg-[#fff5f8]"
              >
                {t("landing.patientLogin")}
              </button>

            </div>


            {/* DOCTOR PORTAL */}

            <div className="rounded-3xl border border-[#e4d9ee] bg-white p-8 shadow-sm">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f1eafb]">
                <Stethoscope className="h-7 w-7 text-[#80649a]" />
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                {t("landing.doctorPortal")}
              </h3>

              <p className="mt-3 leading-7 text-[#76566f]">
                {t("landing.doctorDescription")}
              </p>

              <div className="mt-6 space-y-3 text-sm text-[#76566f]">
                <p>✓ {t("landing.doctorRegistration")}</p>
                <p>✓ {t("landing.secureDoctorLogin")}</p>
                <p>✓ {t("landing.doctorDashboard")}</p>
                <p>✓ {t("landing.incomingRequests")}</p>
                <p>✓ {t("landing.patientInformation")}</p>
                <p>✓ {t("landing.acceptDecline")}</p>
                <p>✓ {t("landing.statusManagement")}</p>
                <p>✓ {t("landing.doctorNotes")}</p>
                <p>✓ {t("landing.consultationHistory")}</p>
              </div>

              <button
                onClick={() => router.push("/doctor-register")}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#80649a] px-6 py-3.5 font-semibold text-white hover:opacity-90"
              >
                {t("landing.registerDoctor")}
                <ArrowRight className="h-5 w-5" />
              </button>

              <button
                onClick={() => router.push("/login?role=doctor")}
                className="mt-3 w-full rounded-xl border border-[#e4d9ee] px-6 py-3 font-semibold text-[#76566f] hover:bg-[#faf7fd]"
              >
                {t("landing.doctorLogin")}
              </button>

            </div>

          </div>

        </div>
      </section>

      {/* ================= AI ================= */}

      <section className="bg-[#fffafd]">
        <div className="mx-auto max-w-7xl px-6 py-20">

          <div className="text-center">

            <p className="text-sm font-semibold uppercase tracking-wider text-[#b76e8c]">
              {t("landing.intelligentSupport")}
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              {t("landing.aiTitle")}
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-7 text-[#76566f]">
              {t("landing.aiDescription")}
            </p>

          </div>


          <div className="mt-12 grid gap-6 md:grid-cols-3">

            <AIBox
              icon={<MessageCircle />}
              title={t("landing.companionTitle")}
              text={t("landing.companionDescription")}
            />

            <AIBox
              icon={<Sparkles />}
              title={t("landing.explainableAi")}
              text={t("landing.explainableDescription")}
            />

            <AIBox
              icon={<ShieldCheck />}
              title={t("landing.privacySafety")}
              text={t("landing.privacyDescription")}
            />

          </div>

        </div>
      </section>


      {/* ================= DOCTOR CONNECTION ================= */}

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">

          <div className="grid items-center gap-12 lg:grid-cols-2">

            <div>

              <p className="text-sm font-semibold uppercase tracking-wider text-[#b76e8c]">
                {t("landing.healthcareConnection")}
              </p>

              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                {t("landing.professionalSupport")}
              </h2>

              <p className="mt-5 leading-7 text-[#76566f]">
                {t("landing.connectionDescription")}
              </p>

              <div className="mt-8 space-y-4">

                <JourneyStep
                  number="01"
                  text={t("landing.selectProfessional")}
                />

                <JourneyStep
                  number="02"
                  text={t("landing.sendRequest")}
                />

                <JourneyStep
                  number="03"
                  text={t("landing.doctorReviews")}
                />

                <JourneyStep
                  number="04"
                  text={t("landing.accessibleHistory")}
                />

              </div>

            </div>


            <div className="rounded-3xl border border-[#f0dce5] bg-[#fff6f9] p-8">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white">
                  <Stethoscope className="h-7 w-7 text-[#b76e8c]" />
                </div>

                <div>
                  <h3 className="font-bold">
                    {t("landing.patientDoctor")}
                  </h3>

                  <p className="text-sm text-[#76566f]">
                    {t("landing.structuredCommunication")}
                  </p>
                </div>

              </div>

              <div className="mt-8 space-y-3">

                <div className="rounded-xl bg-white p-4 text-sm">
                  {t("landing.patientRequest")}
                </div>

                <div className="mx-auto h-5 w-px bg-[#dcb8c8]" />

                <div className="rounded-xl bg-white p-4 text-sm">
                  {t("landing.doctorReview")}
                </div>

                <div className="mx-auto h-5 w-px bg-[#dcb8c8]" />

                <div className="rounded-xl bg-white p-4 text-sm">
                  {t("landing.statusHistory")}
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ================= DISCLAIMER ================= */}

      <section className="bg-[#fff3f7]">
        <div className="mx-auto max-w-4xl px-6 py-14 text-center">

          <ShieldCheck className="mx-auto h-9 w-9 text-[#a65a78]" />

          <h2 className="mt-4 text-xl font-bold">
            {t("landing.healthDisclaimerTitle")}
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#76566f]">
            {t("landing.healthDisclaimer")}
          </p>

        </div>
      </section>


      {/* ================= CTA ================= */}

      <section>
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">

          <h2 className="text-3xl font-bold sm:text-4xl">
            {t("landing.beginJourney")}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-[#76566f]">
            {t("landing.startDescription")}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">

            <button
              onClick={() => router.push("/register")}
              className="inline-flex items-center gap-2 rounded-xl bg-[#b76e8c] px-7 py-3.5 font-semibold text-white hover:bg-[#a85f7d]"
            >
              {t("landing.createPatientAccount")}
              <ArrowRight className="h-5 w-5" />
            </button>

            <button
              onClick={() => router.push("/doctor-register")}
              className="inline-flex items-center gap-2 rounded-xl border border-[#ead5df] bg-white px-7 py-3.5 font-semibold text-[#76566f] hover:bg-[#fff5f8]"
            >
              <Stethoscope className="h-5 w-5" />
              {t("landing.joinDoctor")}
            </button>

          </div>

        </div>
      </section>


      {/* ================= FOOTER ================= */}

      <footer className="border-t border-[#f0dce5] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-4 py-8 text-center sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-left">

          <div className="flex max-w-3xl flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-5">
            <BrandLogo className="w-36 shrink-0 sm:w-44" />

            <p className="max-w-xl text-xs leading-5 text-[#8b7285]">
              {t("landing.brandTagline")}
            </p>
          </div>

          <p className="text-xs text-[#987f8e]">
            {t("landing.footerNotice")}
          </p>

        </div>
      </footer>

    </main>
  );
}


/* ============================================================
   SMALL COMPONENTS
============================================================ */

function FeatureMini({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl bg-white p-4">
      <div className="text-[#b76e8c]">
        {icon}
      </div>

      <p className="mt-3 text-sm font-semibold">
        {title}
      </p>

      <p className="mt-1 text-xs text-[#8b7285]">
        {text}
      </p>
    </div>
  );
}


function InfoCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-[#f0dce5] bg-[#fffafd] p-6 transition hover:-translate-y-1 hover:shadow-md">

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fce8f0] text-[#b76e8c]">
        {icon}
      </div>

      <h3 className="mt-5 font-bold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-[#76566f]">
        {text}
      </p>

    </div>
  );
}


function AIBox({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-[#f0dce5] bg-white p-7 shadow-sm">

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fce8f0] text-[#b76e8c]">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-bold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-[#76566f]">
        {text}
      </p>

    </div>
  );
}


function JourneyStep({
  number,
  text,
}: {
  number: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-4">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fce8f0] text-xs font-bold text-[#a65a78]">
        {number}
      </div>

      <p className="text-sm text-[#76566f]">
        {text}
      </p>

    </div>
  );
}