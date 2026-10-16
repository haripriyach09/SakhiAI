type Translate = (key: string) => unknown;

type InsightMessageKey =
  | "aiInsightSleepVeryLow"
  | "aiInsightSleepSlightlyLow"
  | "aiInsightSleepPositive"
  | "aiInsightMoodLow"
  | "aiInsightMoodVariable"
  | "aiInsightMoodPositive"
  | "aiInsightMoodVariation"
  | "aiInsightActivityLow"
  | "aiInsightActivityModerate"
  | "aiInsightActivityHigh"
  | "aiInsightCycleMenstrual"
  | "aiInsightCycleEarly"
  | "aiInsightCycleMid"
  | "aiInsightCycleLate"
  | "aiInsightTracking"
  | "aiInsightNoData"
  | "aiInsightContinueTracking";

const isRecord = (
  value: unknown
): value is Record<string, unknown> =>
  typeof value === "object" &&
  value !== null &&
  !Array.isArray(value);

const getInsightKey = (
  insight: Record<string, unknown>
): InsightMessageKey | null => {
  const { type, condition } = insight;

  if (type === "sleep") {
    if (condition === "very_low") return "aiInsightSleepVeryLow";
    if (condition === "slightly_low") return "aiInsightSleepSlightlyLow";
    if (condition === "positive") return "aiInsightSleepPositive";
  }

  if (type === "mood") {
    if (condition === "low") return "aiInsightMoodLow";
    if (condition === "variable") return "aiInsightMoodVariable";
    if (condition === "positive") return "aiInsightMoodPositive";
  }

  if (type === "mood_variation") return "aiInsightMoodVariation";

  if (type === "activity") {
    if (condition === "low") return "aiInsightActivityLow";
    if (condition === "moderate") return "aiInsightActivityModerate";
    if (condition === "high") return "aiInsightActivityHigh";
  }

  if (type === "cycle") {
    if (condition === "menstrual") return "aiInsightCycleMenstrual";
    if (condition === "early_cycle") return "aiInsightCycleEarly";
    if (condition === "mid_cycle") return "aiInsightCycleMid";
    if (condition === "late_cycle") return "aiInsightCycleLate";
  }

  if (type === "tracking") return "aiInsightTracking";
  if (type === "no_data") return "aiInsightNoData";
  if (type === "continue_tracking") return "aiInsightContinueTracking";

  return null;
};

const renderInsight = (
  insight: unknown,
  translate: Translate
): string | null => {
  if (typeof insight === "string") {
    return insight.trim() ? insight : null;
  }

  if (!isRecord(insight)) return null;

  const key = getInsightKey(insight);
  if (!key) return null;

  const needsRange = key === "aiInsightMoodVariation";
  const needsValue =
    key.startsWith("aiInsightSleep") ||
    key.startsWith("aiInsightMood") ||
    key.startsWith("aiInsightCycle") ||
    key === "aiInsightTracking";

  const rawValue = needsRange ? insight.range : insight.value;
  if (
    (needsValue || needsRange) &&
    (typeof rawValue !== "number" || !Number.isFinite(rawValue))
  ) {
    return null;
  }

  const message = translate(`dashboard.${key}`);
  if (typeof message !== "string") return null;

  return needsValue || needsRange
    ? message.replace("{value}", String(rawValue))
    : message;
};

export const translateHealthInsights = (
  response: unknown,
  translate: Translate
): string[] => {
  if (!isRecord(response) || !Array.isArray(response.insights)) {
    return [];
  }

  return response.insights
    .map((insight) => renderInsight(insight, translate))
    .filter((message): message is string => message !== null);
};
