"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useLanguage } from "@/lib/i18n/LanguageProvider";



interface MenstrualCycle {
  id: number;
  user_id: number;
  period_start: string;
  period_end: string | null;
  cycle_length: number | null;
  symptoms: string | null;
  flow_level: string | null;
}

interface CycleInsights {
  average_cycle_length: number | null;
  average_period_length: number | null;
  current_cycle_day: number | null;
  next_period_date: string | null;
  fertile_window_start: string | null;
  fertile_window_end: string | null;
  cycle_regularity: string;
}

interface HealthRecord {
  id: number;
  user_id: number;
  cycle_day: number | null;
  mood: number | null;
  sleep_hours: number | null;
  activity_level: string | null;
  tracking_date: string;
}

interface MenstrualAIPrediction {
  predicted_phase: string;
  confidence: number;
  confidence_percentage: number;
  probabilities: {
    Menstrual: number;
    Follicular: number;
    Fertility: number;
    Luteal: number;
  };
  sequence_length: number;
  features_used: string[];
  features_provided: string[];
  features_imputed: string[];
  research_note: string;
  disclaimer: string;
}

export default function MenstrualPage() {
  const { t, language } = useLanguage();

  const locale =
    language === "Kannada"
      ? "kn-IN"
      : language === "Hindi"
      ? "hi-IN"
      : "en-IN";

  const formatDate = (value: string | null | undefined) => {
    if (!value) return "-";

    const dateValue = /^\d{4}-\d{2}-\d{2}$/.test(value)
      ? `${value}T00:00:00`
      : value;
    const date = new Date(dateValue);

    return Number.isNaN(date.getTime())
      ? value
      : date.toLocaleDateString(locale);
  };

  const getCycleRegularityLabel = (regularity: string) => {
    switch (regularity) {
      case "Regular":
        return t("menstrual.regular");
      case "Slightly Irregular":
        return t("menstrual.slightlyIrregular");
      case "Irregular":
        return t("menstrual.irregular");
      case "Insufficient Data":
        return t("menstrual.insufficientData");
      case "No Data":
        return t("menstrual.noData");
      default:
        return regularity;
    }
  };

  const [cycles, setCycles] = useState<MenstrualCycle[]>([]);
  const [insights, setInsights] = useState<CycleInsights | null>(null);

  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([]);
  const [aiPrediction, setAiPrediction] =
    useState<MenstrualAIPrediction | null>(null);

  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [aiError, setAiError] = useState("");

  const [periodStart, setPeriodStart] = useState("");
  const [periodEnd, setPeriodEnd] = useState("");
  const [cycleLength, setCycleLength] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [flowLevel, setFlowLevel] = useState("");

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("sakhi_token")
      : null;

  // =========================================================
  // Load menstrual + health tracking data
  // =========================================================

  const loadCycles = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/menstrual/history");

      setCycles(response.data);

      const insightsResponse = await api.get(
        "/menstrual/insights"
      );

      setInsights(insightsResponse.data);

      // Load health tracking records for AI prediction
      try {
        const healthResponse = await api.get(
          "/health/tracking"
        );

        setHealthRecords(
          Array.isArray(healthResponse.data)
            ? healthResponse.data
            : []
        );
      } catch {
        setHealthRecords([]);
      }
    } catch {
      setError(
        t("menstrual.historyLoadError")
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadCycles();
    } else {
      setLoading(false);
      setError(
        t("menstrual.loginRequired")
      );
    }
  }, []);

  // =========================================================
  // Add cycle
  // =========================================================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!periodStart) {
      setError(
        t("menstrual.periodStartRequired")
      );
      return;
    }

    try {
      setSaving(true);
      setError("");

      await api.post(
        "/menstrual/add",
        {
          period_start: periodStart,
          period_end: periodEnd || null,
          cycle_length: cycleLength
            ? Number(cycleLength)
            : null,
          symptoms: symptoms || null,
          flow_level: flowLevel || null,
        }
      );

      setPeriodStart("");
      setPeriodEnd("");
      setCycleLength("");
      setSymptoms("");
      setFlowLevel("");

      await loadCycles();
    } catch {
      setError(
        t("menstrual.saveError")
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // Delete cycle
  // =========================================================

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      t("menstrual.deleteConfirmation")
    );

    if (!confirmed) return;

    try {
      await api.delete(
        `/menstrual/delete/${id}`
      );

      await loadCycles();
    } catch (err: unknown) {
      const detail =
        typeof err === "object" && err !== null && "response" in err
          ? (err as { response?: { data?: { detail?: unknown } } }).response?.data?.detail
          : undefined;

      setError(
        typeof detail === "string" ? detail :
         t("menstrual.deleteError")
      );
    }
  };

  // =========================================================
  // Convert activity level to model-compatible value
  // =========================================================

  const convertActivityLevel = (
    activity: string | null
  ): number | null => {
    if (!activity) return null;

    const value = activity.toLowerCase();

    if (
      value.includes("low") ||
      value.includes("sedentary")
    ) {
      return 1;
    }

    if (
      value.includes("medium") ||
      value.includes("moderate")
    ) {
      return 3;
    }

    if (
      value.includes("high") ||
      value.includes("active")
    ) {
      return 5;
    }

    const numericValue = Number(activity);

    if (!Number.isNaN(numericValue)) {
      return numericValue;
    }

    return null;
  };

  // =========================================================
  // AI Menstrual Phase Prediction
  // =========================================================

  const handleAIPrediction = async () => {
    setAiError("");
    setAiPrediction(null);

    if (healthRecords.length < 7) {
      setAiError(
        t("menstrual.minimumDaysError").replace(
          "{count}",
          String(healthRecords.length)
        )
      );
      return;
    }

    try {
      setAiLoading(true);

      // Backend returns newest first.
      // Reverse so the LSTM receives chronological data.
      const chronologicalRecords = [
        ...healthRecords,
      ]
        .sort(
          (a, b) =>
            new Date(a.tracking_date).getTime() -
            new Date(b.tracking_date).getTime()
        )
        .slice(-7);

      const days = chronologicalRecords.map(
        (record) => ({
          // Features directly available in SakhiAI
          cycle_day: record.cycle_day,
          mood: record.mood,
          sleep_hours: record.sleep_hours,

          // Map SakhiAI activity level to the
          // numerical exercise severity expected
          // by the research model.
          exerciselevel:
            convertActivityLevel(
              record.activity_level
            ),

          // The research LSTM also expects
          // additional hormone, wearable and
          // symptom features.
          //
          // They are intentionally left null.
          // The backend safely imputes these
          // using training-set medians.
          lh: null,
          estrogen: null,
          pdg: null,
          overall_score: null,
          deep_sleep_in_minutes: null,
          resting_hr_daily: null,
          restlessness: null,
          stress_score: null,
          moodswing: null,
          fatigue: null,
          cramps: null,
          headaches: null,
          sleepissue: null,
          foodcravings: null,
          bloating: null,
        }));

      const response = await api.post(
        "/menstrual/ai-predict",
        {
          days,
        }
      );

      setAiPrediction(response.data);
    } catch (err: unknown) {
      const detail =
        typeof err === "object" && err !== null && "response" in err
          ? (err as { response?: { data?: { detail?: unknown } } }).response?.data?.detail
          : undefined;

      setAiError(
        typeof detail === "string" ? detail :
         t("menstrual.predictionError")
      );
    } finally {
      setAiLoading(false);
    }
  };

  // =========================================================
  // Render
  // =========================================================

  return (
    <main className="min-h-screen bg-[#fff8fb] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#4d3a4a]">
            {t("menstrual.title")}
          </h1>

          <p className="mt-2 text-[#8b7285]">
            {t("menstrual.subtitle")}
          </p>
        </div>

        {/* General Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* =================================================
            Add Cycle
        ================================================= */}

        <section className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold text-[#4d3a4a]">
            {t("menstrual.addCycle")}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid gap-5 md:grid-cols-2"
          >
            {/* Period Start */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#6f5968]">
                {t("menstrual.periodStart")}
              </label>

              <input
                type="date"
                value={periodStart}
                onChange={(e) =>
                  setPeriodStart(e.target.value)
                }
                className="w-full rounded-xl border border-[#eadce5] bg-white px-4 py-3 text-sm outline-none focus:border-[#c58aaa]"
                required
              />
            </div>

            {/* Period End */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#6f5968]">
                {t("menstrual.periodEnd")}
              </label>

              <input
                type="date"
                value={periodEnd}
                onChange={(e) =>
                  setPeriodEnd(e.target.value)
                }
                className="w-full rounded-xl border border-[#eadce5] bg-white px-4 py-3 text-sm outline-none focus:border-[#c58aaa]"
              />
            </div>

            {/* Cycle Length */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#6f5968]">
                {t("menstrual.cycleLength")}
              </label>

              <input
                type="number"
                min="1"
                max="100"
                value={cycleLength}
                onChange={(e) =>
                  setCycleLength(e.target.value)
                }
                placeholder={t("menstrual.cycleLengthPlaceholder")}
                className="w-full rounded-xl border border-[#eadce5] bg-white px-4 py-3 text-sm outline-none focus:border-[#c58aaa]"
              />
            </div>

            {/* Flow */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#6f5968]">
                {t("menstrual.flowLevel")}
              </label>

              <select
                value={flowLevel}
                onChange={(e) =>
                  setFlowLevel(e.target.value)
                }
                className="w-full rounded-xl border border-[#eadce5] bg-white px-4 py-3 text-sm outline-none focus:border-[#c58aaa]"
              >
                <option value="">
                  {t("menstrual.selectFlow")}
                </option>
                <option value="Light">
                  {t("menstrual.light")}
                </option>
                <option value="Medium">
                  {t("menstrual.medium")}
                </option>
                <option value="Heavy">
                  {t("menstrual.heavy")}
                </option>
              </select>
            </div>

            {/* Symptoms */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-[#6f5968]">
                {t("menstrual.symptoms")}
              </label>

              <textarea
                value={symptoms}
                onChange={(e) =>
                  setSymptoms(e.target.value)
                }
                placeholder={t("menstrual.symptomsPlaceholder")}
                rows={3}
                className="w-full resize-none rounded-xl border border-[#eadce5] bg-white px-4 py-3 text-sm outline-none focus:border-[#c58aaa]"
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-[#b76e8c] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#a85f7d] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving
                  ? t("menstrual.savingCycle")
                  : t("menstrual.saveCycle")}
              </button>
            </div>
          </form>
        </section>

        {/* =================================================
            AI Menstrual Phase Prediction
        ================================================= */}

        <section className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-[#4d3a4a]">
              {t("menstrual.aiPrediction")}
            </h2>

            <p className="mt-1 text-sm text-[#8b7285]">
              {t("menstrual.aiDescription")}
            </p>
          </div>

          {/* AI Error */}
          {aiError && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {aiError}
            </div>
          )}

          {/* AI Input Status */}
          <div className="mb-5 rounded-xl bg-[#fff8fb] p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-[#6f5968]">
                  {t("menstrual.availableDays")}
                </p>

                <p className="mt-1 text-xs text-[#9a8591]">
                  {t("menstrual.aiRequirement")}
                </p>
              </div>

              <div className="text-2xl font-bold text-[#b76e8c]">
                {healthRecords.length} / 7
              </div>
            </div>
          </div>

          {/* AI Button */}
          <button
            type="button"
            onClick={handleAIPrediction}
            disabled={
              aiLoading ||
              healthRecords.length < 7
            }
            className="rounded-xl bg-[#8d6fa8] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#795d91] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {aiLoading
              ? t("menstrual.predicting")
              : t("menstrual.predictPhase")}
          </button>


          {healthRecords.length < 7 && (
            <p className="mt-3 text-xs text-[#9a8591]">
              {t("menstrual.continueAddingRecords")}
            </p>
          )}

          {/* AI Result */}
          {aiPrediction && (
            <div className="mt-6 space-y-5">

              {/* Main prediction */}
              <div className="rounded-2xl bg-[#fdeaf1] p-6">
                <p className="text-sm font-medium text-[#a17b91]">
                  {t("menstrual.predictedPhase")}
                </p>

                <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <p className="text-3xl font-bold text-[#4d3a4a]">
                    {aiPrediction.predicted_phase === "Menstrual"
                      ? t("menstrual.menstrual")
                      : aiPrediction.predicted_phase === "Follicular"
                      ? t("menstrual.follicular")
                      : aiPrediction.predicted_phase === "Fertility"
                      ? t("menstrual.fertility")
                      : aiPrediction.predicted_phase === "Luteal"
                      ? t("menstrual.luteal")
                      : aiPrediction.predicted_phase}
                  </p>

                  <p className="text-lg font-semibold text-[#b76e8c]">
                    {aiPrediction.confidence_percentage}%
                    {" "}{t("menstrual.confidence")}
                  </p>
                </div>

                <p className="mt-3 text-xs leading-5 text-[#8b7285]">
                  {t("menstrual.confidenceDescription")}
                </p>
              </div>

              {/* Phase probabilities */}
              <div>
                <h3 className="mb-4 text-base font-semibold text-[#4d3a4a]">
                  {t("menstrual.phaseProbabilities")}
                </h3>

                <div className="space-y-4">

                  {/* Menstrual */}
                  <div>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="text-[#6f5968]">
                        {t("menstrual.menstrual")}
                      </span>

                      <span className="font-medium text-[#4d3a4a]">
                        {(
                          aiPrediction.probabilities
                            .Menstrual * 100
                        ).toFixed(2)}
                        %
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-[#f2e5eb]">
                      <div
                        className="h-full rounded-full bg-[#c58aaa]"
                        style={{
                          width: `${
                            aiPrediction.probabilities
                              .Menstrual * 100
                          }%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Follicular */}
                  <div>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="text-[#6f5968]">
                        {t("menstrual.follicular")}
                      </span>

                      <span className="font-medium text-[#4d3a4a]">
                        {(
                          aiPrediction.probabilities
                            .Follicular * 100
                        ).toFixed(2)}
                        %
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-[#f2e5eb]">
                      <div
                        className="h-full rounded-full bg-[#c58aaa]"
                        style={{
                          width: `${
                            aiPrediction.probabilities
                              .Follicular * 100
                          }%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Fertility */}
                  <div>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="text-[#6f5968]">
                        {t("menstrual.fertility")}
                      </span>

                      <span className="font-medium text-[#4d3a4a]">
                        {(
                          aiPrediction.probabilities
                            .Fertility * 100
                        ).toFixed(2)}
                        %
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-[#f2e5eb]">
                      <div
                        className="h-full rounded-full bg-[#c58aaa]"
                        style={{
                          width: `${
                            aiPrediction.probabilities
                              .Fertility * 100
                          }%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Luteal */}
                  <div>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="text-[#6f5968]">
                        {t("menstrual.luteal")}
                      </span>

                      <span className="font-medium text-[#4d3a4a]">
                        {(
                          aiPrediction.probabilities
                            .Luteal * 100
                        ).toFixed(2)}
                        %
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-[#f2e5eb]">
                      <div
                        className="h-full rounded-full bg-[#c58aaa]"
                        style={{
                          width: `${
                            aiPrediction.probabilities
                              .Luteal * 100
                          }%`,
                        }}
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* Research information */}
              <div className="rounded-xl border border-[#eadce5] bg-[#fff8fb] p-4">
                <p className="text-xs font-semibold text-[#6f5968]">
                  {t("menstrual.researchModelInfo")}
                </p>

                <p className="mt-2 text-xs leading-5 text-[#8b7285]">
                  {t("menstrual.researchNote")}
                </p>

                <div className="mt-3 grid gap-3 sm:grid-cols-3">

                  <div>
                    <p className="text-xs text-[#9a8591]">
                      {t("menstrual.sequence")}
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#4d3a4a]">
                      {aiPrediction.sequence_length} {t("menstrual.days")}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-[#9a8591]">
                      {t("menstrual.featuresProvided")}
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#4d3a4a]">
                      {aiPrediction.features_provided.length} {t("menstrual.features")}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-[#9a8591]">
                      {t("menstrual.featuresImputed")}
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#4d3a4a]">
                      {aiPrediction.features_imputed.length}
                    </p>
                  </div>

                </div>
              </div>

              {/* Disclaimer */}
              <div className="rounded-xl bg-[#fff8fb] p-4">
                <p className="text-xs leading-5 text-[#9a8591]">
                  {t("menstrual.aiDisclaimer")}
                </p>
              </div>

            </div>
          )}
        </section>

        {/* =================================================
            Cycle Insights
        ================================================= */}

        <section className="mb-8 rounded-2xl bg-white p-6 shadow-sm">

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-[#4d3a4a]">
              {t("menstrual.cycleInsights")}
            </h2>

            <p className="mt-1 text-sm text-[#8b7285]">
              {t("menstrual.personalizedEstimates")}
            </p>
          </div>

          {insights ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              {/* Current Cycle */}
              <div className="rounded-xl bg-[#fdeaf1] p-5">
                <p className="text-sm text-[#a17b91]">
                  {t("menstrual.currentCycle")}
                </p>

                <p className="mt-2 text-2xl font-bold text-[#4d3a4a]">
                  {insights.current_cycle_day
                    ? `${t("menstrual.day")} ${insights.current_cycle_day}`
                    : "-"}
                </p>

                <p className="mt-1 text-xs text-[#8b7285]">
                  {t("menstrual.currentEstimatedCycleDay")}
                </p>
              </div>

              {/* Average Cycle */}
              <div className="rounded-xl bg-[#eee8fa] p-5">
                <p className="text-sm text-[#8b7285]">
                  {t("menstrual.averageCycle")}
                </p>

                <p className="mt-2 text-2xl font-bold text-[#4d3a4a]">
                  {insights.average_cycle_length
                    ? `${insights.average_cycle_length} ${t("menstrual.days")}`
                    : "-"}
                </p>

                <p className="mt-1 text-xs text-[#8b7285]">
                  {t("menstrual.basedOnRecordedCycles")}
                </p>
              </div>

              {/* Average Period */}
              <div className="rounded-xl bg-[#fff1dc] p-5">
                <p className="text-sm text-[#8b7285]">
                  {t("menstrual.averagePeriod")}
                </p>

                <p className="mt-2 text-2xl font-bold text-[#4d3a4a]">
                  {insights.average_period_length
                    ? `${insights.average_period_length} ${t("menstrual.days")}`
                    : "-"}
                </p>

                <p className="mt-1 text-xs text-[#8b7285]">
                  {t("menstrual.averageBleedingDuration")}
                </p>
              </div>

              {/* Regularity */}
              <div className="rounded-xl bg-[#e8f5ed] p-5">
                <p className="text-sm text-[#8b7285]">
                  {t("menstrual.cyclePattern")}
                </p>

                <p className="mt-2 text-2xl font-bold text-[#4d3a4a]">
                  {getCycleRegularityLabel(insights.cycle_regularity)}
                </p>

                <p className="mt-1 text-xs text-[#8b7285]">
                  {t("menstrual.basedOnAvailableHistory")}
                </p>
              </div>

            </div>
          ) : (
            <div className="rounded-xl bg-[#fff8fb] p-6 text-center">
              <p className="text-sm text-[#8b7285]">
                {t("menstrual.notEnoughData")}
              </p>
            </div>
          )}

          {/* Predictions */}
          {insights && (
            <div className="mt-5 grid gap-4 md:grid-cols-2">

              {/* Next Period */}
              <div className="rounded-xl border border-[#f0e1e8] bg-[#fff8fb] p-5">
                <p className="text-sm font-medium text-[#a17b91]">
                  {t("menstrual.nextPeriod")}
                </p>

                <p className="mt-2 text-xl font-semibold text-[#4d3a4a]">
                  {formatDate(insights.next_period_date)}
                </p>

                <p className="mt-1 text-sm text-[#8b7285]">
                  {t("menstrual.estimatedFromCycleHistory")}
                </p>
              </div>

              {/* Fertile Window */}
              <div className="rounded-xl border border-[#f0e1e8] bg-[#fff8fb] p-5">
                <p className="text-sm font-medium text-[#a17b91]">
                  {t("menstrual.fertileWindow")}
                </p>

                <p className="mt-2 text-xl font-semibold text-[#4d3a4a]">
                  {insights.fertile_window_start &&
                  insights.fertile_window_end
                    ? `${formatDate(insights.fertile_window_start)} → ${formatDate(insights.fertile_window_end)}`
                    : "-"}
                </p>

                <p className="mt-1 text-sm text-[#8b7285]">
                  {t("menstrual.approximateBasedOnCycleLength")}
                </p>
              </div>

            </div>
          )}

          <div className="mt-5 rounded-xl bg-[#fff8fb] p-4">
            <p className="text-xs leading-5 text-[#9a8591]">
              {t("menstrual.estimateDisclaimer")}
            </p>
          </div>

        </section>

        {/* =================================================
            Cycle History
        ================================================= */}

        <section className="rounded-2xl bg-white p-6 shadow-sm">

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-[#4d3a4a]">
              {t("menstrual.cycleHistory")}
            </h2>

            <p className="mt-1 text-sm text-[#8b7285]">
              {t("menstrual.cycleHistoryDescription")}
            </p>
          </div>

          {loading ? (
            <div className="py-10 text-center text-[#8b7285]">
              {t("menstrual.loadingCycleHistory")}
            </div>
          ) : cycles.length === 0 ? (
            <div className="rounded-xl bg-[#fff8fb] px-6 py-10 text-center">
              <p className="font-medium text-[#6f5968]">
                {t("menstrual.noCycleRecords")}
              </p>

              <p className="mt-1 text-sm text-[#a18c99]">
                {t("menstrual.addFirstCycle")}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-fullmin-w-[700px] text-left">

                <thead>
                  <tr className="border-b border-[#f0e5eb]">

                    <th className="px-4 py-3 text-sm font-semibold text-[#6f5968]">
                      {t("menstrual.start")}
                    </th>

                    <th className="px-4 py-3 text-sm font-semibold text-[#6f5968]">
                      {t("menstrual.end")}
                    </th>

                    <th className="px-4 py-3 text-sm font-semibold text-[#6f5968]">
                      {t("menstrual.cycleLength")}
                    </th>

                    <th className="px-4 py-3 text-sm font-semibold text-[#6f5968]">
                      {t("menstrual.symptoms")}
                    </th>

                    <th className="px-4 py-3 text-sm font-semibold text-[#6f5968]">
                      {t("menstrual.flowLevel")}
                    </th>

                    <th className="px-4 py-3 text-sm font-semibold text-[#6f5968]">
                      {t("menstrual.action")}
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {cycles.map((cycle) => (
                    <tr
                      key={cycle.id}
                      className="border-b border-[#f5edf1] last:border-0"
                    >

                      <td className="px-4 py-4 text-sm text-[#4d3a4a]">
                        {formatDate(cycle.period_start)}
                      </td>

                      <td className="px-4 py-4 text-sm text-[#4d3a4a]">
                        {formatDate(cycle.period_end)}
                      </td>

                      <td className="px-4 py-4 text-sm text-[#4d3a4a]">
                        {cycle.cycle_length
                          ? `${cycle.cycle_length} ${t("menstrual.days")}`
                          : "-"}
                      </td>

                      <td className="max-w-[220px]px-4 py-4 text-sm text-[#6f5968]">
                       {cycle.symptoms === "cramps"
                          ? t("menstrual.cramps")
                          : cycle.symptoms}
                      </td>

                      <td className="px-4 py-4 text-sm text-[#6f5968]">
                        {cycle.flow_level === "Light"
                          ? t("menstrual.light")
                          : cycle.flow_level === "Medium"
                          ? t("menstrual.medium")
                          : cycle.flow_level === "Heavy"
                          ? t("menstrual.heavy")
                          : cycle.flow_level}
                      </td>

                      <td className="px-4 py-4">
                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(cycle.id)
                          }
                          className="rounded-lg px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50"
                        >
                          {t("menstrual.deleteCycle")}
                        </button>
                      </td>

                    </tr>
                  ))}

                </tbody>
              </table>

            </div>
          )}

        </section>

      </div>
    </main>
  );
}
