"use client";

import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { translateHealthInsights } from "@/lib/healthInsights";
import BrandLogo from "@/components/brand-logo";
import {
  Activity,
  CalendarDays,
  Download,
  HeartPulse,
  Moon,
  Smile,
  TrendingUp,
  FileText,
} from "lucide-react";

interface HealthRecord {
  id: number;
  user_id: number;
  sleep_hours: number | null;
  cycle_day: number | null;
  mood: number | null;
  activity_level: string | null;
  tracking_date: string;
}

interface User {
  id: number;
  full_name: string;
  email: string;
  age: number;
  language: string;
  life_stage: string;
}

interface Prediction {
  risk_percentage: number;
  risk_level: string;
  message: string;
  explanation?: string;
  contributing_factors?: Array<{
    factor: string;
  }>;
}

interface MenstrualRecord {
  id: number;
  period_start: string;
  period_end: string | null;
  cycle_length: number | null;
  symptoms: string | null;
  flow_level: string | null;
}

interface PregnancyRecord {
  id: number;
  pregnancy_status: string;
  pregnancy_week: number | null;
  due_date: string | null;
  postpartum_status: string | null;
  postpartum_week: number | null;
  postpartum_mood: number | null;
  wellbeing_notes: string | null;
  created_at: string | null;
}

interface MentalWellnessRecord {
  id: number;
  assessment_type: string;
  score: number;
  interpretation: string;
  created_at: string;
}

export default function ReportsPage() {
  const { language, t } = useLanguage();
  const [user, setUser] = useState<User | null>(null);
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [prediction, setPrediction] =
    useState<Prediction | null>(null);
  const [insights, setInsights] = useState<unknown>(null);
  const [menstrualRecords, setMenstrualRecords] =
    useState<MenstrualRecord[]>([]);
  const [pregnancyRecords, setPregnancyRecords] =
    useState<PregnancyRecord[]>([]);
  const [mentalWellnessRecords, setMentalWellnessRecords] =
    useState<MentalWellnessRecord[]>([]);

  const [loading, setLoading] = useState(true);

  const dateLocale =
    language === "Kannada"
      ? "kn-IN"
      : language === "Hindi"
        ? "hi-IN"
        : "en-IN";

  const riskLevelKeys: Record<string, string> = {
    High: "pmos.high",
    Moderate: "pmos.moderate",
    Low: "pmos.low",
    "No Data": "reports.noData",
  };

  const getRiskLevelLabel = (value: string) => {
    const key = riskLevelKeys[value];
    return key ? t(key) : value;
  };

  const getLifeStageLabel = (value: string | undefined) => {
    if (!value) return "-";

    const keys: Record<string, string> = {
      Adult: "profile.lifeStageAdult",
      Adolescent: "profile.lifeStageAdolescent",
      Pregnancy: "profile.lifeStagePregnancy",
      Postpartum: "profile.lifeStagePostpartum",
      Perimenopause: "profile.lifeStagePerimenopause",
      Menopause: "profile.lifeStageMenopause",
    };

    const key = keys[value];
    return key ? t(key) : value;
  };

  const getActivityLabel = (value: string | null) => {
    if (!value) return "-";

    const keys: Record<string, string> = {
      low: "tracking.activityLow",
      moderate: "tracking.activityModerate",
      high: "tracking.activityHigh",
    };

    const key = keys[value.toLowerCase()];
    return key ? t(key) : value;
  };

  const getPredictionMessage = (message: string | undefined) => {
    if (message === "Please record your health information first.") {
      return t("pmos.noHealthDataMessage");
    }

    if (
      message ===
      "This is an informational wellness estimate and not a medical diagnosis."
    ) {
      return t("pmos.informationalMessage");
    }

    return message || t("reports.pmosUnavailable");
  };

  const getPredictionExplanation = (
    explanation: string | undefined
  ) => {
    if (
      explanation ===
      "There is not enough recorded wellness information to calculate an awareness score."
    ) {
      return t("pmos.historyNoHealthData");
    }

    if (
      explanation ===
      "None of the currently recorded wellness factors added points to the awareness score."
    ) {
      return t("pmos.historyNoFactorsExplanation");
    }

    if (
      explanation?.startsWith(
        "The current awareness score is based on your latest recorded wellness information."
      )
    ) {
      const factorKeys: Record<string, string> = {
        Mood: "pmos.factorMood",
        Sleep: "pmos.factorSleep",
        Activity: "pmos.factorActivity",
        Cycle: "pmos.factorCycle",
      };
      const factors = prediction?.contributing_factors
        ?.map((factor) => {
          const key = factorKeys[factor.factor];
          return key ? t(key) : factor.factor;
        })
        .filter(Boolean)
        .join(", ");

      return t("pmos.historyFactorsExplanation").replace(
        "{factors}",
        factors || t("pmos.noData")
      );
    }

    return explanation || t("reports.pmosUnavailable");
  };

  const getKnownTranslation = (
    value: string | null | undefined,
    entries: Record<string, string>
  ) => {
    if (!value) return "-";
    const key = entries[value];
    return key ? t(key) : value;
  };

  useEffect(() => {
    const loadReportData = async () => {
      try {
      const token =
        localStorage.getItem("sakhi_token");

      if (!token) {
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      }

      const [
        userResponse,
        healthResponse,
        predictionResponse,
        insightsResponse,
        menstrualResponse,
        pregnancyResponse,
        mentalWellnessResponse,
      ] = await Promise.all([
        api.get("/auth/me", { headers }),
        api.get("/health/tracking", { headers }),
        api.get("/prediction/pmo-risk", { headers }),
        api.get("/insights/today", { headers }),
        api.get("/menstrual/history", { headers }),
        api.get("/pregnancy/history", { headers }),
        api.get("/mental-wellness/history", { headers }),
      ]);

      setUser(userResponse.data);

      setRecords(
        healthResponse.data || []
      );

      setPrediction(
        predictionResponse.data
      );

      setInsights(
        insightsResponse.data
      );
      setMenstrualRecords(
        Array.isArray(menstrualResponse.data)
          ? menstrualResponse.data
          : []
      );
      setPregnancyRecords(
        Array.isArray(pregnancyResponse.data)
          ? pregnancyResponse.data
          : []
      );
      setMentalWellnessRecords(
        Array.isArray(mentalWellnessResponse.data)
          ? mentalWellnessResponse.data
          : []
      );
      } catch {
        console.error("Unable to load reports.");
      } finally {
        setLoading(false);
      }
    };

    void loadReportData();
  }, []);

  // Backend returns newest first.
  // Reverse it for chronological report display.
  const chronologicalRecords = useMemo(() => {
    return [...records].reverse();
  }, [records]);

  const averageMood = useMemo(() => {
    const values = records
      .map((record) => record.mood)
      .filter(
        (value): value is number =>
          value !== null
      );

    if (!values.length) return null;

    return (
      values.reduce(
        (sum, value) => sum + value,
        0
      ) / values.length
    );
  }, [records]);

  const averageSleep = useMemo(() => {
    const values = records
      .map((record) => record.sleep_hours)
      .filter(
        (value): value is number =>
          value !== null
      );

    if (!values.length) return null;

    return (
      values.reduce(
        (sum, value) => sum + value,
        0
      ) / values.length
    );
  }, [records]);

  const activityCount = useMemo(() => {
    return records.filter(
      (record) => record.activity_level
    ).length;
  }, [records]);

  const insightMessages = translateHealthInsights(
    insights,
    t
  );

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";

    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "-";

    return date.toLocaleDateString(
      dateLocale,
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  const printReport = () => {
    window.print();
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fff8fb] flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium text-[#4d3a4a]">
            {t("reports.loading")}
          </p>

          <p className="mt-2 text-sm text-[#8b7285]">
            {t("reports.loadingDescription")}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main
      lang={
        language === "Kannada"
          ? "kn-IN"
          : language === "Hindi"
            ? "hi-IN"
            : "en-IN"
      }
      className="print-report min-h-screen bg-[#fff8fb] px-4 py-8 sm:px-6 lg:px-8 print:bg-white"
    >
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between print:mb-5">

          <div>
            <BrandLogo className="print-report-logo mb-3 w-48" />

            <h1 className="mt-1 text-3xl font-bold text-[#332532]">
              {t("reports.reportTitle")}
            </h1>

            <p className="mt-2 text-[#76566f]">
              {t("reports.subtitle")}
            </p>
          </div>

          <button
            onClick={printReport}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#a65a78] px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-[#914c68] print:hidden"
          >
            <Download className="h-4 w-4" />
            {t("reports.printSave")}
          </button>

        </div>

        <div className="mb-6 text-sm text-[#76566f]">
          <p>
            {t("reports.generatedOn")}:{" "}
            {new Date().toLocaleDateString(dateLocale, {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p>
            {t("reports.includedPeriod")}:{" "}
            {t("reports.allAvailableRecords")}
          </p>
        </div>

        {/* USER INFORMATION */}

        <section className="mb-6 rounded-2xl border border-[#f0dce5] bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fce8f0] text-[#a65a78]">
              <FileText className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#332532]">
                {t("reports.patientInformation")}
              </h2>

              <p className="text-sm text-[#76566f]">
                {t("reports.profileDescription")}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-xl bg-[#fff8fb] p-4">
              <p className="text-sm text-[#a17b91]">
                {t("reports.name")}
              </p>

              <p className="mt-1 font-medium text-[#4d3a4a]">
                {user?.full_name || "-"}
              </p>
            </div>

            <div className="rounded-xl bg-[#fff8fb] p-4">
              <p className="text-sm text-[#a17b91]">
                {t("reports.email")}
              </p>

              <p className="mt-1 break-all font-medium text-[#4d3a4a]">
                {user?.email || "-"}
              </p>
            </div>

            <div className="rounded-xl bg-[#fff8fb] p-4">
              <p className="text-sm text-[#a17b91]">
                {t("reports.age")}
              </p>

              <p className="mt-1 font-medium text-[#4d3a4a]">
                {user?.age || "-"}
              </p>
            </div>

            <div className="rounded-xl bg-[#fff8fb] p-4">
              <p className="text-sm text-[#a17b91]">
                {t("reports.lifeStage")}
              </p>

              <p className="mt-1 font-medium text-[#4d3a4a]">
                {getLifeStageLabel(user?.life_stage)}
              </p>
            </div>

          </div>
        </section>

        {/* SUMMARY CARDS */}

        <section className="mb-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-[#f0dce5] bg-[#fdeaf1] p-5">
            <Smile className="h-6 w-6 text-[#a65a78]" />

            <p className="mt-4 text-sm text-[#76566f]">
              {t("reports.averageMood")}
            </p>

            <p className="mt-1 text-2xl font-bold text-[#4d3a4a]">
              {averageMood !== null
                ? `${averageMood.toFixed(1)} / 5`
                : "-"}
            </p>
          </div>

          <div className="rounded-2xl border border-[#f0dce5] bg-[#eee8fa] p-5">
            <Moon className="h-6 w-6 text-[#75658f]" />

            <p className="mt-4 text-sm text-[#76566f]">
              {t("reports.averageSleep")}
            </p>

            <p className="mt-1 text-2xl font-bold text-[#4d3a4a]">
              {averageSleep !== null
                ? `${averageSleep.toFixed(1)} h`
                : "-"}
            </p>
          </div>

          <div className="rounded-2xl border border-[#f0dce5] bg-[#e8f5ed] p-5">
            <Activity className="h-6 w-6 text-[#5d806c]" />

            <p className="mt-4 text-sm text-[#76566f]">
              {t("reports.activityRecords")}
            </p>

            <p className="mt-1 text-2xl font-bold text-[#4d3a4a]">
              {activityCount}
            </p>
          </div>

          <div className="rounded-2xl border border-[#f0dce5] bg-[#fff1dc] p-5">
            <HeartPulse className="h-6 w-6 text-[#a65a78]" />

            <p className="mt-4 text-sm text-[#76566f]">
              {t("reports.pmosAwareness")}
            </p>

            <p className="mt-1 text-2xl font-bold text-[#4d3a4a]">
              {prediction
                ? `${prediction.risk_percentage}%`
                : "-"}
            </p>

            <p className="mt-1 text-xs text-[#76566f]">
              {getRiskLevelLabel(prediction?.risk_level || "No Data")}
            </p>
          </div>

        </section>

        {/* HEALTH TREND */}

        <section className="mb-6 rounded-2xl border border-[#f0dce5] bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eee8fa] text-[#75658f]">
              <TrendingUp className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#332532]">
                {t("reports.healthHistory")}
              </h2>

              <p className="mt-1 text-sm text-[#76566f]">
                {t("reports.historyDescription")}
              </p>
            </div>

          </div>

          {chronologicalRecords.length === 0 ? (

            <div className="mt-6 rounded-xl bg-[#fff8fb] p-6 text-center">
              <p className="font-medium text-[#4d3a4a]">
                {t("reports.noHealthRecords")}
              </p>

              <p className="mt-2 text-sm text-[#76566f]">
                {t("reports.noHealthRecordsDescription")}
              </p>
            </div>

          ) : (

            <div className="mt-6 overflow-x-auto">

              <table className="w-fullmin-w-[700px] text-left">

                <thead>
                  <tr className="border-b border-[#f0dce5]">

                    <th className="px-4 py-3 text-sm font-semibold text-[#4d3a4a]">
                      {t("reports.date")}
                    </th>

                    <th className="px-4 py-3 text-sm font-semibold text-[#4d3a4a]">
                      {t("reports.cycle")}
                    </th>

                    <th className="px-4 py-3 text-sm font-semibold text-[#4d3a4a]">
                      {t("reports.mood")}
                    </th>

                    <th className="px-4 py-3 text-sm font-semibold text-[#4d3a4a]">
                      {t("reports.sleep")}
                    </th>

                    <th className="px-4 py-3 text-sm font-semibold text-[#4d3a4a]">
                      {t("reports.activity")}
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {chronologicalRecords.map(
                    (record) => (

                      <tr
                        key={record.id}
                        className="border-b border-[#f5e5ec]"
                      >

                        <td className="px-4 py-3 text-sm text-[#76566f]">
                          {formatDate(
                            record.tracking_date
                          )}
                        </td>

                        <td className="px-4 py-3 text-sm text-[#76566f]">
                          {record.cycle_day
                            ? t("reports.day").replace(
                                "{value}",
                                String(record.cycle_day)
                              )
                            : "-"}
                        </td>

                        <td className="px-4 py-3 text-sm text-[#76566f]">
                          {record.mood !== null
                            ? `${record.mood}/5`
                            : "-"}
                        </td>

                        <td className="px-4 py-3 text-sm text-[#76566f]">
                          {record.sleep_hours !== null
                            ? `${record.sleep_hours} ${t("reports.hoursAbbreviation")}`
                            : "-"}
                        </td>

                        <td className="px-4 py-3 text-sm capitalize text-[#76566f]">
                          {getActivityLabel(record.activity_level)}
                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </section>

        <section className="mb-6 rounded-2xl border border-[#f0dce5] bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-[#332532]">
            {t("reports.menstrualHistory")}
          </h2>
          {menstrualRecords.length === 0 ? (
            <p className="mt-4 text-sm text-[#76566f]">
              {t("reports.noMenstrualRecords")}
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {menstrualRecords.map((record) => (
                <article
                  key={record.id}
                  className="rounded-xl bg-[#fff8fb] p-4"
                >
                  <dl className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <dt className="text-xs text-[#8b7285]">
                        {t("reports.periodStart")}
                      </dt>
                      <dd>{formatDate(record.period_start)}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-[#8b7285]">
                        {t("reports.periodEnd")}
                      </dt>
                      <dd>{formatDate(record.period_end || "")}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-[#8b7285]">
                        {t("reports.cycleLength")}
                      </dt>
                      <dd>
                        {record.cycle_length !== null
                          ? `${record.cycle_length} ${t("menstrual.days")}`
                          : "-"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-[#8b7285]">
                        {t("reports.flowLevel")}
                      </dt>
                      <dd>
                        {getKnownTranslation(record.flow_level, {
                          Light: "menstrual.light",
                          Medium: "menstrual.medium",
                          Heavy: "menstrual.heavy",
                        })}
                      </dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-xs text-[#8b7285]">
                        {t("reports.symptoms")}
                      </dt>
                      <dd className="whitespace-pre-wrap">
                        {record.symptoms || "-"}
                      </dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="mb-6 rounded-2xl border border-[#f0dce5] bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-[#332532]">
            {t("reports.pregnancyHistory")}
          </h2>
          {pregnancyRecords.length === 0 ? (
            <p className="mt-4 text-sm text-[#76566f]">
              {t("reports.noPregnancyRecords")}
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {pregnancyRecords.map((record) => (
                <article
                  key={record.id}
                  className="rounded-xl bg-[#fff8fb] p-4"
                >
                  <p className="mb-3 text-xs text-[#8b7285]">
                    {record.created_at
                      ? new Date(record.created_at).toLocaleString(dateLocale)
                      : "-"}
                  </p>
                  <dl className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <dt className="text-xs text-[#8b7285]">
                        {t("reports.pregnancyStatus")}
                      </dt>
                      <dd>
                        {getKnownTranslation(record.pregnancy_status, {
                          Pregnant: "pregnancy.pregnant",
                          "Not Pregnant": "pregnancy.notPregnant",
                        })}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-[#8b7285]">
                        {t("reports.pregnancyWeek")}
                      </dt>
                      <dd>
                        {record.pregnancy_week !== null
                          ? `${t("pregnancy.week")} ${record.pregnancy_week}`
                          : "-"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-[#8b7285]">
                        {t("reports.dueDate")}
                      </dt>
                      <dd>{formatDate(record.due_date || "")}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-[#8b7285]">
                        {t("reports.postpartumStatus")}
                      </dt>
                      <dd>
                        {getKnownTranslation(record.postpartum_status, {
                          Postpartum: "pregnancy.postpartumStatusValue",
                          "Not Postpartum": "pregnancy.notPostpartum",
                        })}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-[#8b7285]">
                        {t("reports.postpartumWeek")}
                      </dt>
                      <dd>
                        {record.postpartum_week !== null
                          ? `${t("pregnancy.week")} ${record.postpartum_week}`
                          : "-"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-[#8b7285]">
                        {t("reports.postpartumMood")}
                      </dt>
                      <dd>
                        {record.postpartum_mood !== null
                          ? `${record.postpartum_mood} / 5`
                          : "-"}
                      </dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-xs text-[#8b7285]">
                        {t("reports.wellbeingNotes")}
                      </dt>
                      <dd className="whitespace-pre-wrap">
                        {record.wellbeing_notes || "-"}
                      </dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="mb-6 rounded-2xl border border-[#f0dce5] bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-[#332532]">
            {t("reports.mentalWellnessHistory")}
          </h2>
          {mentalWellnessRecords.length === 0 ? (
            <p className="mt-4 text-sm text-[#76566f]">
              {t("reports.noMentalAssessments")}
            </p>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[600px] text-left">
                <thead>
                  <tr className="border-b border-[#f0dce5]">
                    <th className="px-4 py-3">{t("reports.date")}</th>
                    <th className="px-4 py-3">{t("reports.assessmentType")}</th>
                    <th className="px-4 py-3">{t("reports.score")}</th>
                    <th className="px-4 py-3">{t("reports.interpretation")}</th>
                  </tr>
                </thead>
                <tbody>
                  {mentalWellnessRecords.map((record) => (
                    <tr
                      key={record.id}
                      className="border-b border-[#f5e5ec]"
                    >
                      <td className="px-4 py-3">
                        {new Date(record.created_at).toLocaleString(dateLocale)}
                      </td>
                      <td className="px-4 py-3">
                        {getKnownTranslation(record.assessment_type, {
                          PHQ9: "mentalWellness.assessmentNames.PHQ9",
                          GAD7: "mentalWellness.assessmentNames.GAD7",
                          EPDS: "mentalWellness.assessmentNames.EPDS",
                        })}
                      </td>
                      <td className="px-4 py-3">{record.score}</td>
                      <td className="px-4 py-3">
                        {getKnownTranslation(record.interpretation, {
                          "Minimal awareness level":
                            "mentalWellness.minimalAwarenessLevel",
                          "Mild awareness level":
                            "mentalWellness.mildAwarenessLevel",
                          "Moderate awareness level":
                            "mentalWellness.moderateAwarenessLevel",
                          "Moderately high awareness level":
                            "mentalWellness.moderatelyHighAwarenessLevel",
                          "High awareness level":
                            "mentalWellness.highAwarenessLevel",
                          "Lower awareness range":
                            "mentalWellness.lowerAwarenessRange",
                          "Possible concern range":
                            "mentalWellness.possibleConcernRange",
                          "Higher awareness range":
                            "mentalWellness.higherAwarenessRange",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* PMOS */}

        <section className="mb-6 rounded-2xl border border-[#ded3f0] bg-white p-6 shadow-sm">

          <h2 className="text-xl font-semibold text-[#332532]">
            {t("reports.pmosAwareness")}
          </h2>

          <div className="mt-5 rounded-xl bg-[#f5f0fb] p-5">

            <div className="flex items-center justify-between gap-4">

              <div>
                <p className="text-sm text-[#76566f]">
                  {t("reports.currentAwarenessScore")}
                </p>

                <p className="mt-1 text-3xl font-bold text-[#4d3a4a]">
                  {prediction
                    ? `${prediction.risk_percentage}%`
                    : "-"}
                </p>
              </div>

              <div className="rounded-full bg-white px-4 py-2 text-sm font-medium text-[#a65a78]">
                {getRiskLevelLabel(prediction?.risk_level || "No Data")}
              </div>

            </div>

            <p className="mt-4 text-sm leading-6 text-[#76566f]">
              {getPredictionExplanation(prediction?.explanation)}
            </p>
            <p className="mt-2 text-xs leading-5 text-[#8b7285]">
              {getPredictionMessage(prediction?.message)}
            </p>

          </div>

        </section>

        {/* AI INSIGHTS */}

        <section className="mb-6 rounded-2xl border border-[#f0dce5] bg-white p-6 shadow-sm">

          <h2 className="text-xl font-semibold text-[#332532]">
            {t("reports.aiHealthInsights")}
          </h2>

          {insightMessages.length > 0 ? (

            <div className="mt-5 space-y-3">

              {insightMessages.map(
                (message, index) => (

                  <div
                    key={`${index}-${message}`}
                    className="rounded-xl bg-[#f5f0fb] p-4"
                  >
                    <p className="text-sm leading-6 text-[#5f4a58]">
                      {message}
                    </p>
                  </div>

                )
              )}

            </div>

          ) : (

            <div className="mt-5 rounded-xl bg-[#fff8fb] p-5">
              <p className="text-sm text-[#76566f]">
                {t("reports.noInsights")}
              </p>
            </div>

          )}

        </section>

        {/* RECORD COUNT */}

        <section className="mb-6 rounded-2xl border border-[#f0dce5] bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <CalendarDays className="h-5 w-5 text-[#a65a78]" />

            <div>
              <p className="text-sm text-[#76566f]">
                {t("reports.totalHealthRecords")}
              </p>

              <p className="text-xl font-semibold text-[#4d3a4a]">
                {records.length}
              </p>
            </div>

          </div>

        </section>

        {/* DISCLAIMER */}

        <div className="rounded-2xl border border-[#eadff0] bg-[#faf8fc] p-5">

          <p className="text-xs leading-5 text-[#8b7285]">
            {t("reports.disclaimer")}
          </p>
          <p className="mt-2 text-xs leading-5 text-[#8b7285]">
            {t("reports.privacyNotice")}
          </p>

        </div>

      </div>
    </main>
  );
}