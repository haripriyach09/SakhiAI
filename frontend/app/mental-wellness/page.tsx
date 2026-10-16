"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import BrandLogo from "@/components/brand-logo";

type AssessmentType = "PHQ9" | "GAD7" | "EPDS";

interface AssessmentHistory {
  id: number;
  assessment_type: AssessmentType;
  score: number;
  interpretation: string;
  created_at: string;
}

const assessmentQuestionCount: Record<AssessmentType, number> = {
  PHQ9: 9,
  GAD7: 7,
  EPDS: 10,
};

type MentalWellnessQuestions = Record<
  AssessmentType,
  string[]
>;

export default function MentalWellnessPage() {
  const { t, language } = useLanguage();
  const locale =
    language === "Kannada"
      ? "kn-IN"
      : language === "Hindi"
      ? "hi-IN"
      : "en-IN";

  const [assessmentType, setAssessmentType] =
    useState<AssessmentType>("PHQ9");

  const [answers, setAnswers] = useState<number[]>([]);

  const [history, setHistory] =
    useState<AssessmentHistory[]>([]);

  const [result, setResult] =
    useState<AssessmentHistory | null>(null);

  const [loading, setLoading] = useState(false);

  const [historyLoading, setHistoryLoading] =
    useState(true);

  const currentQuestions = (
  t(`mentalWellness.questions.${assessmentType}`) as unknown
) as string[];

const currentTitle = t(
  `mentalWellness.assessmentNames.${assessmentType}`
);

const currentDescription =
  assessmentType === "PHQ9"
    ? t("mentalWellness.phq9Description")
    : assessmentType === "GAD7"
    ? t("mentalWellness.gad7Description")
    : t("mentalWellness.epdsDescription");

  useEffect(() => {
    setAnswers(
      new Array(
        assessmentQuestionCount[assessmentType]
      ).fill(-1)
    );

    setResult(null);
  }, [assessmentType]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const token =
        localStorage.getItem("sakhi_token");

      if (!token) {
        setHistoryLoading(false);
        return;
      }

      const response = await api.get(
        "/mental-wellness/history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setHistory(response.data);
    } catch {
      console.error("Unable to load mental wellness history.");
    } finally {
      setHistoryLoading(false);
    }
  };

  const selectAnswer = (
    questionIndex: number,
    value: number
  ) => {
    const updated = [...answers];

    updated[questionIndex] = value;

    setAnswers(updated);
  };

  const submitAssessment = async () => {
    if (answers.includes(-1)) {
      alert(
        t("mentalWellness.pleaseAnswerAll")
      );
      return;
    }

    try {
      setLoading(true);

      const token =
        localStorage.getItem("sakhi_token");

      if (!token) {
        alert(
          t("mentalWellness.loginAgain")
        );
        return;
      }

      const response = await api.post(
        `/mental-wellness/assessment?assessment_type=${assessmentType}`,
        answers,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const saved: AssessmentHistory =
        response.data.assessment;

      setResult(saved);

      await loadHistory();
    } catch {
      alert(
        t("mentalWellness.saveError")
      );
    } finally {
      setLoading(false);
    }
  };

  const getScoreMessage = (
    interpretation: string
  ) => {
    const lower =
      interpretation.toLowerCase();

    if (
      lower.includes("minimal") ||
      lower.includes("lower")
    ) {
      return t(
        "mentalWellness.lowerAwareness"
      );
    }

    if (lower.includes("mild")) {
      return t(
        "mentalWellness.mildAwareness"
      );
    }

    if (lower.includes("moderate")) {
      return t(
        "mentalWellness.moderateAwareness"
      );
    }

    return t(
      "mentalWellness.professionalSupport"
    );
  };

  const getInterpretationLabel = (
    interpretation: string
  ) => {
    const interpretationKeys: Record<string, string> = {
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
      Unknown: "mentalWellness.unknownInterpretation",
    };

    const key = interpretationKeys[interpretation];
    return key ? t(key) : interpretation;
  };

  const getQuestionCountText = (
    type: AssessmentType
  ) => {
    if (type === "PHQ9") {
      return t(
        "mentalWellness.questions9"
      );
    }

    if (type === "GAD7") {
      return t(
        "mentalWellness.questions7"
      );
    }

    return t(
      "mentalWellness.questions10"
    );
  };

  const answerOptions: string[] = [
    t("mentalWellness.notAtAll"),
    t("mentalWellness.severalDays"),
    t("mentalWellness.moreThanHalfDays"),
    t("mentalWellness.nearlyEveryDay"),
  ];

  return (
    <main className="min-h-screen bg-[#fff8fb] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* HEADER */}

        <div className="mb-8">
          <BrandLogo className="mb-3 max-w-48" />

          <h1 className="mt-1 text-3xl font-bold text-[#332532]">
            {t("mentalWellness.title")}
          </h1>

          <p className="mt-2 max-w-2xl text-[#76566f]">
            {t("mentalWellness.subtitle")}
          </p>
        </div>

        {/* DISCLAIMER */}

        <div className="mb-6 rounded-2xl border border-[#eadff0] bg-[#faf8fc] p-5">
          <p className="text-sm leading-6 text-[#6d5866]">
            <strong>
              {t("mentalWellness.important")}:
            </strong>{" "}
            {t("mentalWellness.disclaimer")}
          </p>
        </div>

        <div className="mb-6 rounded-2xl border border-[#f0d5dc] bg-[#fff0f3] p-5">
          <p className="text-sm leading-6 text-[#76566f]">
            {t("mentalWellness.immediateSafety")}
          </p>
        </div>

        {/* ASSESSMENT SELECTOR */}

        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          {(
            Object.keys(
              assessmentQuestionCount
            ) as AssessmentType[]
          ).map((type: AssessmentType) => (
            <button
              key={type}
              onClick={() =>
                setAssessmentType(type)
              }
              className={`rounded-2xl border p-4 text-left transition ${
                assessmentType === type
                  ? "border-[#d58aa5] bg-[#fce8f0]"
                  : "border-[#f0dce5] bg-white hover:bg-[#fff5f8]"
              }`}
            >
              <p className="font-semibold text-[#4d3a4a]">
                {t(
                  `mentalWellness.assessmentNames.${type}`
                )}
              </p>

              <p className="mt-1 text-xs text-[#8b7285]">
                {getQuestionCountText(type)}
              </p>
            </button>
          ))}
        </div>

        {/* QUESTIONNAIRE */}

        <section className="rounded-2xl border border-[#f0dce5] bg-white p-6 shadow-sm">

          <h2 className="text-xl font-semibold text-[#332532]">
            {currentTitle}
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#76566f]">
            {currentDescription}
          </p>

          <div className="mt-6 space-y-5">

            {currentQuestions.map(
              (question: string, index: number) => (
                <div
                  key={index}
                  className="rounded-xl bg-[#fff8fb] p-5"
                >

                  <p className="font-medium leading-6 text-[#4d3a4a]">
                    {index + 1}. {question}
                  </p>

                  <div className="mt-4 grid gap-2 sm:grid-cols-2">

                    {answerOptions.map(
                      (
                        option: string,
                        value: number
                      ) => (
                        <label
                          key={value}
                          className={`cursor-pointer rounded-xl border p-3 text-sm transition ${
                            answers[index] === value
                              ? "border-[#d58aa5] bg-[#fce8f0] text-[#8f4d69]"
                              : "border-[#eadde4] bg-white text-[#76566f] hover:bg-[#fff5f8]"
                          }`}
                        >

                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={value}
                            checked={
                              answers[index] === value
                            }
                            onChange={() =>
                              selectAnswer(
                                index,
                                value
                              )
                            }
                            className="mr-2"
                          />

                          {option}

                        </label>
                      )
                    )}

                  </div>
                </div>
              )
            )}

          </div>

          <button
            onClick={submitAssessment}
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-[#a65a78] px-5 py-3 font-medium text-white transition hover:bg-[#8f4d69] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? t(
                  "mentalWellness.savingAssessment"
                )
              : t(
                  "mentalWellness.completeAssessment"
                )}
          </button>

        </section>

        {/* RESULT */}

        {result && (
          <section className="mt-6 rounded-2xl border border-[#ded3f0] bg-white p-6 shadow-sm">

            <h2 className="text-xl font-semibold text-[#332532]">
              {t(
                "mentalWellness.awarenessResult"
              )}
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">

              <div className="rounded-xl bg-[#eee8fa] p-5">

                <p className="text-sm text-[#76566f]">
                  {t(
                    "mentalWellness.score"
                  )}
                </p>

                <p className="mt-1 text-3xl font-bold text-[#4d3a4a]">
                  {result.score}
                </p>

              </div>

              <div className="rounded-xl bg-[#fdeaf1] p-5">

                <p className="text-sm text-[#76566f]">
                  {t(
                    "mentalWellness.awarenessLevel"
                  )}
                </p>

                <p className="mt-1 text-xl font-semibold text-[#4d3a4a]">
                  {getInterpretationLabel(result.interpretation)}
                </p>

              </div>

            </div>

            <p className="mt-5 text-sm leading-6 text-[#76566f]">
              {getScoreMessage(
                result.interpretation
              )}
            </p>

            <div className="mt-4 rounded-xl bg-[#faf8fc] p-4">

              <p className="text-xs leading-5 text-[#8b7285]">
                {t(
                  "mentalWellness.resultDisclaimer"
                )}
              </p>

            </div>

          </section>
        )}

        {/* HISTORY */}

        <section className="mt-6 rounded-2xl border border-[#f0dce5] bg-white p-6 shadow-sm">

          <h2 className="text-xl font-semibold text-[#332532]">
            {t(
              "mentalWellness.assessmentHistory"
            )}
          </h2>

          {historyLoading ? (

            <p className="mt-5 text-sm text-[#76566f]">
              {t(
                "mentalWellness.loadingHistory"
              )}
            </p>

          ) : history.length === 0 ? (

            <div className="mt-5 rounded-xl bg-[#fff8fb] p-5 text-center">

              <p className="font-medium text-[#4d3a4a]">
                {t(
                  "mentalWellness.noAssessments"
                )}
              </p>

              <p className="mt-1 text-sm text-[#76566f]">
                {t(
                  "mentalWellness.noAssessmentsDescription"
                )}
              </p>

            </div>

          ) : (

            <div className="mt-5 space-y-3">

              {history.map(
                (item: AssessmentHistory) => (
                  <div
                    key={item.id}
                    className="flex flex-col justify-between gap-3 rounded-xl bg-[#fff8fb] p-4 sm:flex-row sm:items-center"
                  >

                    <div>

                      <p className="font-medium text-[#4d3a4a]">
                        {t(
                          `mentalWellness.assessmentNames.${item.assessment_type}`
                        )}
                      </p>

                      <p className="mt-1 text-xs text-[#8b7285]">
                        {new Date(
                          item.created_at
                        ).toLocaleString(locale)}
                      </p>

                    </div>

                    <div className="text-left sm:text-right">

                      <p className="font-semibold text-[#a65a78]">
                        {t(
                          "mentalWellness.score"
                        )}:{" "}
                        {item.score}
                      </p>

                      <p className="text-xs text-[#76566f]">
                        {getInterpretationLabel(item.interpretation)}
                      </p>

                    </div>

                  </div>
                )
              )}

            </div>

          )}

        </section>

      </div>
    </main>
  );
}
