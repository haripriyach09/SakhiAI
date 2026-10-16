"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import BrandLogo from "@/components/brand-logo";

interface PMOSFactor {
  factor: string;
  value: string | number;
  contribution: number;
  impact: string;
  explanation: string;
}

interface PMOSResponse {
  risk_percentage: number;
  risk_level: string;
  message: string;
  contributing_factors?: PMOSFactor[];
  explanation?: string;
}

interface PMOSHistory {
  id: number;
  user_id: number;
  score: number;
  risk_level: string;
  contributing_features: string | null;
  explanation: string | null;
  created_at: string | null;
}

export default function PMOSPage() {
  const { language, t } = useLanguage();
  const [pmoData, setPmoData] =
    useState<PMOSResponse | null>(null);

  const [history, setHistory] =
    useState<PMOSHistory[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [savingAssessment, setSavingAssessment] =
    useState(false);

  const [assessmentStatus, setAssessmentStatus] =
    useState("");

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
    "No Data": "pmos.noData",
  };

  const factorKeys: Record<string, string> = {
    Mood: "pmos.factorMood",
    Sleep: "pmos.factorSleep",
    Activity: "pmos.factorActivity",
    Cycle: "pmos.factorCycle",
  };

  const factorExplanationKeys: Record<string, string> = {
    "Your recorded mood rating is relatively low and contributes more strongly to the current awareness score.": "pmos.moodLowExplanation",
    "Your recorded mood is around the middle of the selected scale and contributes moderately to the current awareness score.": "pmos.moodModerateExplanation",
    "Your recorded sleep duration is below 6 hours and contributes strongly to the current awareness score.": "pmos.sleepVeryLowExplanation",
    "Your recorded sleep duration is below 7 hours and contributes moderately to the current awareness score.": "pmos.sleepLowExplanation",
    "Your recorded activity level is low and contributes to the awareness score.": "pmos.activityLowExplanation",
    "The recorded cycle day is 21 or later and contributes to the current awareness score.": "pmos.cycleLaterExplanation",
  };

  const getRiskLevelLabel = (value: string) => {
    const key = riskLevelKeys[value];
    return key ? t(key) : value;
  };

  const getFactorLabel = (value: string) => {
    const key = factorKeys[value];
    return key ? t(key) : value;
  };

  const getFactorValue = (factor: PMOSFactor) => {
    if (factor.factor === "Sleep" && typeof factor.value === "string") {
      const match = factor.value.match(/^(.+) hours$/);
      if (match) {
        return t("pmos.hoursValue").replace("{value}", match[1]);
      }
    }

    if (factor.factor === "Cycle" && typeof factor.value === "string") {
      const match = factor.value.match(/^Day (\d+)$/);
      if (match) {
        return t("pmos.dayValue").replace("{value}", match[1]);
      }
    }

    if (factor.factor === "Activity" && typeof factor.value === "string") {
      const activityKeys: Record<string, string> = {
        low: "pmos.low",
        moderate: "pmos.moderate",
        high: "pmos.high",
      };
      const key = activityKeys[factor.value.toLowerCase()];
      if (key) return t(key);
    }

    return factor.value;
  };

  const getFactorExplanation = (value: string) => {
    const key = factorExplanationKeys[value];
    return key ? t(key) : value;
  };

  const getPmosMessage = (value: string | undefined) => {
    if (value === "Please record your health information first.") {
      return t("pmos.noHealthDataMessage");
    }

    if (
      value ===
      "This is an informational wellness estimate and not a medical diagnosis."
    ) {
      return t("pmos.informationalMessage");
    }

    return value || t("pmos.scoreFallback");
  };

  const getHistoryExplanation = (value: string | null) => {
    if (!value) return "-";

    if (
      value ===
      "There is not enough recorded wellness information to calculate an awareness score."
    ) {
      return t("pmos.historyNoHealthData");
    }

    if (
      value ===
      "None of the currently recorded wellness factors added points to the awareness score."
    ) {
      return t("pmos.historyNoFactorsExplanation");
    }

    const prefix =
      "The current awareness score is based on your latest recorded wellness information. The factors contributing to this score are: ";
    const suffix =
      ". Each factor contributes a predefined amount according to the current transparent awareness rules.";

    if (value.startsWith(prefix) && value.endsWith(suffix)) {
      const factors = value
        .slice(prefix.length, -suffix.length)
        .split(", ")
        .map(getFactorLabel)
        .join(", ");

      return t("pmos.historyFactorsExplanation").replace(
        "{factors}",
        factors
      );
    }

    return value;
  };

  useEffect(() => {
    const loadPMOS = async () => {
      try {
        const token =
          localStorage.getItem("sakhi_token");

        if (!token) {
          setError(t("pmos.loginRequired"));
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Current PMOS awareness score
        const response = await api.get(
          "/prediction/pmo-risk",
          { headers }
        );

        setPmoData(response.data);

        // ==========================================
        // PMOS HISTORY
        // ==========================================

        const historyResponse = await api.get(
          "/prediction/pmo-history",
          { headers }
        );

        setHistory(historyResponse.data);

      } catch {
        setError(t("pmos.loadError"));
      } finally {
        setLoading(false);
      }
    };

    loadPMOS();
  }, [t]);

  const saveAssessment = async () => {
    if (savingAssessment || pmoData?.risk_level === "No Data") {
      return;
    }

    const token = localStorage.getItem("sakhi_token");
    if (!token) {
      setAssessmentStatus(t("pmos.loginRequired"));
      return;
    }

    setSavingAssessment(true);
    setAssessmentStatus("");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await api.post(
        "/prediction/pmo-risk",
        {},
        { headers }
      );
      setPmoData(response.data);
      setAssessmentStatus(t("pmos.assessmentSaved"));

      try {
        const historyResponse = await api.get(
          "/prediction/pmo-history",
          { headers }
        );
        setHistory(historyResponse.data);
      } catch {
        setAssessmentStatus(t("pmos.historyRefreshError"));
      }
    } catch {
      setAssessmentStatus(t("pmos.assessmentSaveError"));
    } finally {
      setSavingAssessment(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fff8fb] flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium text-[#4d3a4a]">
            {t("pmos.loading")}
          </p>

          <p className="mt-2 text-sm text-[#8b7285]">
            {t("pmos.loadingDescription")}
          </p>
        </div>
      </main>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <main className="min-h-screen bg-[#fff8fb] px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-[#f0dce5] bg-white p-6 text-center shadow-sm">
            <h1 className="text-xl font-semibold text-[#332532]">
              {t("pmos.title")}
            </h1>

            <p className="mt-3 text-sm text-[#76566f]">
              {error}
            </p>
          </div>
        </div>
      </main>
    );
  }

  const score =
    pmoData?.risk_percentage ?? 0;

  const level =
    pmoData?.risk_level ?? "No Data";

  const factors =
    pmoData?.contributing_factors ?? [];

  // ==========================================
  // MAIN PAGE
  // ==========================================

  return (
    <main className="min-h-screen bg-[#fff8fb] px-4 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* ====================================
            HEADER
        ==================================== */}

        <div className="mb-8">

          <BrandLogo className="mb-3 max-w-48" />

          <h1 className="mt-1 text-3xl font-bold text-[#332532]">
            {t("pmos.pageTitle")}
          </h1>

          <p className="mt-2 max-w-3xl text-[#76566f]">
            {t("pmos.subtitle")}
          </p>

        </div>

        {/* ====================================
            SCORE + STATUS
        ==================================== */}

        <section className="grid gap-6 lg:grid-cols-3">

          {/* SCORE */}

          <div className="rounded-2xl border border-[#f0dce5] bg-white p-6 shadow-sm lg:col-span-2">

            <p className="text-sm text-[#a17b91]">
              {t("pmos.currentScore")}
            </p>

            <div className="mt-3 flex items-end gap-3">

              <span className="text-5xl font-bold text-[#4d3a4a]">
                {score}%
              </span>

              <span className="mb-2 rounded-full bg-[#f5f0fb] px-4 py-1.5 text-sm font-semibold text-[#a65a78]">
                {getRiskLevelLabel(level)}
              </span>

            </div>

            {/* Progress */}

            <div className="mt-6">

              <div className="h-3 overflow-hidden rounded-full bg-[#eadff0]">

                <div
                  className="h-full rounded-full bg-[#c084a0] transition-all"
                  style={{
                    width: `${score}%`,
                  }}
                />

              </div>

            </div>

            <p className="mt-4 text-sm leading-6 text-[#76566f]">
              {getPmosMessage(pmoData?.message)}
            </p>

            <button
              type="button"
              onClick={saveAssessment}
              disabled={savingAssessment || level === "No Data"}
              className="mt-5 rounded-xl bg-[#a65a78] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#8f4965] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {savingAssessment
                ? t("pmos.savingAssessment")
                : t("pmos.saveAssessment")}
            </button>
            {assessmentStatus && (
              <p
                className="mt-2 text-sm text-[#76566f]"
                role="status"
              >
                {assessmentStatus}
              </p>
            )}

          </div>


          {/* INTERPRETATION */}

          <div className="rounded-2xl border border-[#ded3f0] bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold text-[#332532]">
              {t("pmos.whatThisMeans")}
            </h2>

            <div className="mt-4">

              {level === "High" && (
                <p className="text-sm leading-6 text-[#76566f]">
                  {t("pmos.meaningHigh")}
                </p>
              )}

              {level === "Moderate" && (
                <p className="text-sm leading-6 text-[#76566f]">
                  {t("pmos.meaningModerate")}
                </p>
              )}

              {level === "Low" && (
                <p className="text-sm leading-6 text-[#76566f]">
                  {t("pmos.meaningLow")}
                </p>
              )}

              {level === "No Data" && (
                <p className="text-sm leading-6 text-[#76566f]">
                  {t("pmos.meaningNoData")}
                </p>
              )}

            </div>

          </div>

        </section>


        {/* ====================================
            CONTRIBUTING FACTORS
        ==================================== */}

        <section className="mt-6 rounded-2xl border border-[#f0dce5] bg-white p-6 shadow-sm">

          <div>

            <h2 className="text-xl font-semibold text-[#332532]">
              {t("pmos.contributingFactors")}
            </h2>

            <p className="mt-2 text-sm text-[#76566f]">
              {t("pmos.factorsDescription")}
            </p>

          </div>


          {factors.length > 0 ? (

            <div className="mt-6 grid gap-4 md:grid-cols-2">

              {factors.map(
                (factor, index) => (

                  <div
                    key={index}
                    className="rounded-xl border border-[#f0dce5] bg-[#fff8fb] p-5"
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div>

                        <h3 className="font-semibold text-[#4d3a4a]">
                          {getFactorLabel(factor.factor)}
                        </h3>

                        <p className="mt-1 text-sm text-[#8b7285]">
                          {t("pmos.recordedValue")}{" "}
                          {getFactorValue(factor)}
                        </p>

                      </div>

                      <span className="rounded-full bg-[#f5f0fb] px-3 py-1 text-xs font-semibold text-[#a65a78]">
                        +{factor.contribution}
                      </span>

                    </div>


                    <div className="mt-4">

                      <div className="h-2 overflow-hidden rounded-full bg-[#eadff0]">

                        <div
                          className="h-full rounded-full bg-[#c084a0]"
                          style={{
                            width: `${Math.min(
                              factor.contribution * 3.33,
                              100
                            )}%`,
                          }}
                        />

                      </div>

                    </div>


                    <div className="mt-3">

                      <p className="text-xs font-medium text-[#a65a78]">
                        {t("pmos.impactLabel").replace(
                          "{level}",
                          getRiskLevelLabel(
                            factor.impact === "Medium" ? "Moderate" : factor.impact
                          )
                        )}
                      </p>

                      <p className="mt-2 text-sm leading-6 text-[#76566f]">
                        {getFactorExplanation(factor.explanation)}
                      </p>

                    </div>

                  </div>

                )
              )}

            </div>

          ) : (

            <div className="mt-6 rounded-xl bg-[#faf8fc] p-6 text-center">

              <p className="font-medium text-[#4d3a4a]">
                {t("pmos.noFactors")}
              </p>

              <p className="mt-2 text-sm text-[#76566f]">
                {t("pmos.noFactorsDescription")}
              </p>

            </div>

          )}

        </section>


        {/* ====================================
            EXPLAINABILITY
        ==================================== */}

        <section className="mt-6 rounded-2xl border border-[#ded3f0] bg-white p-6 shadow-sm">

          <h2 className="text-xl font-semibold text-[#332532]">
            {t("pmos.explainabilityTitle")}
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#76566f]">
            {t("pmos.explainabilityDescription")}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-xl bg-[#fff8fb] p-4">

              <p className="text-sm font-medium text-[#a65a78]">
                {t("pmos.factorMood")}
              </p>

              <p className="mt-2 text-sm leading-5 text-[#76566f]">
                {t("pmos.moodLowExplanation")}
              </p>

            </div>


            <div className="rounded-xl bg-[#fff8fb] p-4">

              <p className="text-sm font-medium text-[#a65a78]">
                {t("pmos.factorSleep")}
              </p>

              <p className="mt-2 text-sm leading-5 text-[#76566f]">
                {t("pmos.sleepVeryLowExplanation")}
              </p>

            </div>


            <div className="rounded-xl bg-[#fff8fb] p-4">

              <p className="text-sm font-medium text-[#a65a78]">
                {t("pmos.factorActivity")}
              </p>

              <p className="mt-2 text-sm leading-5 text-[#76566f]">
                {t("pmos.activityLowExplanation")}
              </p>

            </div>


            <div className="rounded-xl bg-[#fff8fb] p-4">

              <p className="text-sm font-medium text-[#a65a78]">
                {t("pmos.factorCycle")}
              </p>

              <p className="mt-2 text-sm leading-5 text-[#76566f]">
                {t("pmos.cycleLaterExplanation")}
              </p>

            </div>

          </div>

        </section>


        {/* ====================================
            ASSESSMENT HISTORY
        ==================================== */}

        <section className="mt-6 rounded-2xl border border-[#f0dce5] bg-white p-6 shadow-sm">

          <div>

            <h2 className="text-xl font-semibold text-[#332532]">
              {t("pmos.historyTitle")}
            </h2>

            <p className="mt-2 text-sm text-[#76566f]">
              {t("pmos.historyDescription")}
            </p>

          </div>


          {history.length > 0 ? (

            <div className="mt-6 overflow-x-auto">

              <table className="w-fullmin-w-[650px]">

                <thead>

                  <tr className="border-b border-[#f0dce5] text-left">

                    <th className="px-4 py-3 text-sm font-semibold text-[#4d3a4a]">
                      {t("pmos.date")}
                    </th>

                    <th className="px-4 py-3 text-sm font-semibold text-[#4d3a4a]">
                      {t("pmos.score")}
                    </th>

                    <th className="px-4 py-3 text-sm font-semibold text-[#4d3a4a]">
                      {t("pmos.awarenessLevel")}
                    </th>

                    <th className="px-4 py-3 text-sm font-semibold text-[#4d3a4a]">
                      {t("pmos.explanation")}
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {history.map((assessment) => (

                    <tr
                      key={assessment.id}
                      className="border-b border-[#f5e5ec] last:border-b-0"
                    >

                      {/* DATE */}

                      <td className="px-4 py-4 text-sm text-[#76566f]">

                        {assessment.created_at
                          ? new Date(
                              assessment.created_at
                              ).toLocaleDateString(dateLocale)
                          : "-"}

                      </td>


                      {/* SCORE */}

                      <td className="px-4 py-4">

                        <span className="font-semibold text-[#4d3a4a]">
                          {assessment.score}%
                        </span>

                      </td>


                      {/* LEVEL */}

                      <td className="px-4 py-4">

                        <span className="rounded-full bg-[#f5f0fb] px-3 py-1 text-xs font-semibold text-[#a65a78]">

                          {getRiskLevelLabel(assessment.risk_level)}

                        </span>

                      </td>


                      {/* EXPLANATION */}

                      <td className="max-w-md px-4 py-4 text-sm leading-5 text-[#76566f]">

                        {getHistoryExplanation(assessment.explanation)}

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          ) : (

            <div className="mt-6 rounded-xl bg-[#faf8fc] p-6 text-center">

              <p className="font-medium text-[#4d3a4a]">
                {t("pmos.noHistory")}
              </p>

              <p className="mt-2 text-sm text-[#76566f]">
                {t("pmos.noHistoryDescription")}
              </p>

            </div>

          )}

        </section>

        {/* ====================================
            DISCLAIMER
        ==================================== */}

        <div className="mt-6 pb-8 text-center">

          <p className="text-xs leading-5 text-[#8b7285]">
            {t("pmos.disclaimer")}
          </p>

        </div>

      </div>

    </main>
  );
}