"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useLanguage,
} from "@/lib/i18n/LanguageProvider";

import { api } from "@/lib/api";
import { translateHealthInsights } from "@/lib/healthInsights";

import {
  OverviewCard,
} from "@/components/dashboard/overview-card";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface User {
  id: number;
  full_name: string;
  email: string;
  age: number;
  language: string;
  life_stage: string;
}

interface HealthRecord {
  id: number;
  user_id: number;
  sleep_hours: number | null;
  cycle_day: number | null;
  tracking_date: string;
  mood: number | null;
  activity_level: string | null;
}

interface HealthInsight {
  type: string;
  condition?: string;
  value?: string | number;
  range?: number;
}

interface HealthInsights {
  user_id: number;
  insights: HealthInsight[];
  data_available: {
    sleep: boolean;
    mood: boolean;
    activity: boolean;
    cycle: boolean;
  };
  summary?: {
    health_records: number;
    average_sleep: number | null;
    average_mood: number | null;
  };
}

interface PMOSFactor {
  factor: string;
  value: string | number;
  contribution: number;
  impact: string;
  explanation: string;
}

export default function DashboardPage() {
  const { t, language } = useLanguage();

const translateActivity = (activity: string | null) => {
  if (!activity) return "-";

  switch (activity.toLowerCase()) {
    case "low":
      return t("dashboard.activityLow");

    case "moderate":
      return t("dashboard.activityModerate");

    case "high":
      return t("dashboard.activityHigh");

    default:
      return activity;
  }
};

const translateRiskLevel = (level: string) => {
  switch (level.toLowerCase()) {
    case "low":
      return t("dashboard.low");

    case "moderate":
      return t("dashboard.moderate");

    case "medium":
      return t("dashboard.moderate");

    case "high":
      return t("dashboard.high");

    case "no data":
      return t("dashboard.noData");

    default:
      return level;
  }
};

const translateLifeStage = (lifeStage: string | undefined) => {
  if (!lifeStage) return "-";

  const translationKeys: Record<string, string> = {
    Adult: "profile.lifeStageAdult",
    Adolescent: "profile.lifeStageAdolescent",
    Pregnancy: "profile.lifeStagePregnancy",
    Postpartum: "profile.lifeStagePostpartum",
    Perimenopause: "profile.lifeStagePerimenopause",
    Menopause: "profile.lifeStageMenopause",
  };

  const key = translationKeys[lifeStage];
  return key ? t(key) : lifeStage;
};

  const [user, setUser] =
    useState<User | null>(null);

  const [healthRecord, setHealthRecord] =
    useState<HealthRecord | null>(null);

  const [healthRecords, setHealthRecords] =
    useState<HealthRecord[]>([]);

  const [pmoRisk, setPmoRisk] =
    useState<number | null>(null);

  const [riskLevel, setRiskLevel] =
    useState("");

  const [pmoFactors, setPmoFactors] =
    useState<PMOSFactor[]>([]);

  const [pmoExplanation, setPmoExplanation] =
    useState("");

  const [healthInsights, setHealthInsights] =
    useState<HealthInsights | null>(null);

  const [loading, setLoading] =
    useState(true);

  // ==========================================
  // LANGUAGE HELPERS
  // ==========================================

  const translateFactor = (
    factor: PMOSFactor
  ): PMOSFactor => {
    return {
      ...factor,
      factor: translateDynamicText(
        factor.factor
      ),
      value: translateDynamicText(
        factor.value
      ),
      impact: translateDynamicText(
        factor.impact
      ),
      explanation: translateDynamicText(
        factor.explanation
      ),
    };
  };

  const translateDynamicText = (text: unknown) => {
    if (text === null || text === undefined) {
      return "";
    }

    if (typeof text !== "string") {
      return String(text);
    }

    let result = text;

    if (language === "Kannada") {
      result = result
        .replace(/\bYour recorded average sleep is\b/gi, "ನಿಮ್ಮ ದಾಖಲಾದ ಸರಾಸರಿ ನಿದ್ರೆ")
        .replace(/\bYour recorded average mood is\b/gi, "ನಿಮ್ಮ ದಾಖಲಾದ ಸರಾಸರಿ ಮನಸ್ಥಿತಿ")
        .replace(/\bYour latest recorded activity level is\b/gi, "ನಿಮ್ಮ ಇತ್ತೀಚಿನ ದಾಖಲಾದ ಚಟುವಟಿಕೆ ಮಟ್ಟ")
        .replace(/\bYou have recorded\b/gi, "ನೀವು")
        .replace(/\bhealth entries\b/gi, "ಆರೋಗ್ಯ ದಾಖಲೆಗಳನ್ನು ದಾಖಲಿಸಿದ್ದೀರಿ")
        .replace(/\bYour recent sleep pattern appears lower than ideal\./gi, "ನಿಮ್ಮ ಇತ್ತೀಚಿನ ನಿದ್ರೆ ಮಾದರಿಯು ಸಾಮಾನ್ಯವಾಗಿ ಬೇಕಾಗಿರುವ ಮಟ್ಟಕ್ಕಿಂತ ಕಡಿಮೆಯಾಗಿದೆ.")
        .replace(/\bYour sleep duration is slightly below the range you may want to aim for\./gi, "ನಿಮ್ಮ ನಿದ್ರೆಯ ಅವಧಿಯು ನೀವು ಗುರಿಯಾಗಿಸಬಹುದಾದ ಮಟ್ಟಕ್ಕಿಂತ ಸ್ವಲ್ಪ ಕಡಿಮೆಯಾಗಿದೆ.")
        .replace(/\bYour recent sleep pattern looks positive\./gi, "ನಿಮ್ಮ ಇತ್ತೀಚಿನ ನಿದ್ರೆ ಮಾದರಿಯು ಉತ್ತಮವಾಗಿದೆ.")
        .replace(/\bTry maintaining a consistent sleep schedule and getting adequate rest\./gi, "ನಿಯಮಿತ ನಿದ್ರೆ ಸಮಯವನ್ನು ಪಾಲಿಸಲು ಮತ್ತು ಸಾಕಷ್ಟು ವಿಶ್ರಾಂತಿ ಪಡೆಯಲು ಪ್ರಯತ್ನಿಸಿ.")
        .replace(/\bContinue monitoring your sleep pattern\./gi, "ನಿಮ್ಮ ನಿದ್ರೆ ಮಾದರಿಯನ್ನು ನಿರಂತರವಾಗಿ ಗಮನಿಸುತ್ತಿರಿ.")
        .replace(/\bMaintaining consistent sleep can support overall wellbeing\./gi, "ನಿಯಮಿತ ನಿದ್ರೆ ಒಟ್ಟಾರೆ ಆರೋಗ್ಯ ಮತ್ತು ಕಲ್ಯಾಣಕ್ಕೆ ಸಹಾಯಕವಾಗಬಹುದು.")
        .replace(/\bYour recent mood ratings have been relatively low\./gi, "ನಿಮ್ಮ ಇತ್ತೀಚಿನ ಮನಸ್ಥಿತಿ ಅಂಕಗಳು ತುಲನಾತ್ಮಕವಾಗಿ ಕಡಿಮೆಯಾಗಿವೆ.")
        .replace(/\bYour mood has varied across your recorded entries\./gi, "ನಿಮ್ಮ ದಾಖಲೆಗಳಲ್ಲಿ ಮನಸ್ಥಿತಿಯಲ್ಲಿ ಬದಲಾವಣೆ ಕಂಡುಬಂದಿದೆ.")
        .replace(/\bYour recent mood pattern appears positive\./gi, "ನಿಮ್ಮ ಇತ್ತೀಚಿನ ಮನಸ್ಥಿತಿ ಮಾದರಿಯು ಉತ್ತಮವಾಗಿ ಕಂಡುಬರುತ್ತಿದೆ.")
        .replace(/\bConsider self-care, supportive social connection, and continuing to monitor how you feel\./gi, "ಸ್ವಯಂ ಆರೈಕೆ, ಆಪ್ತರೊಂದಿಗೆ ಸಂಪರ್ಕ ಮತ್ತು ನಿಮ್ಮ ಮನಸ್ಥಿತಿಯನ್ನು ನಿರಂತರವಾಗಿ ಗಮನಿಸುವುದನ್ನು ಪರಿಗಣಿಸಿ.")
        .replace(/\bContinue tracking your mood to understand your personal patterns\./gi, "ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಮಾದರಿಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಮನಸ್ಥಿತಿಯನ್ನು ನಿರಂತರವಾಗಿ ದಾಖಲಿಸುತ್ತಿರಿ.")
        .replace(/\bYour recorded mood has shown noticeable variation over time\./gi, "ಕಾಲಕ್ರಮೇಣ ನಿಮ್ಮ ದಾಖಲಾದ ಮನಸ್ಥಿತಿಯಲ್ಲಿ ಗಮನಾರ್ಹ ಬದಲಾವಣೆ ಕಂಡುಬಂದಿದೆ.")
        .replace(/\bContinuing to track your mood alongside sleep and cycle information may help you recognize patterns\./gi, "ನಿದ್ರೆ ಮತ್ತು ಚಕ್ರದ ಮಾಹಿತಿಯೊಂದಿಗೆ ಮನಸ್ಥಿತಿಯನ್ನು ದಾಖಲಿಸುವುದು ವೈಯಕ್ತಿಕ ಮಾದರಿಗಳನ್ನು ಗುರುತಿಸಲು ಸಹಾಯ ಮಾಡಬಹುದು.")
        .replace(/\bYour latest recorded activity level is low\./gi, "ನಿಮ್ಮ ಇತ್ತೀಚಿನ ದಾಖಲಾದ ಚಟುವಟಿಕೆ ಮಟ್ಟ ಕಡಿಮೆಯಾಗಿದೆ.")
        .replace(/\bYour latest recorded activity level is moderate\./gi, "ನಿಮ್ಮ ಇತ್ತೀಚಿನ ದಾಖಲಾದ ಚಟುವಟಿಕೆ ಮಟ್ಟ ಮಧ್ಯಮವಾಗಿದೆ.")
        .replace(/\bYour latest recorded activity level is high\./gi, "ನಿಮ್ಮ ಇತ್ತೀಚಿನ ದಾಖಲಾದ ಚಟುವಟಿಕೆ ಮಟ್ಟ ಹೆಚ್ಚಾಗಿದೆ.")
        .replace(/\bIf you feel comfortable, gentle movement such as walking or stretching may support general wellbeing\./gi, "ನಿಮಗೆ ಅನುಕೂಲವಾಗಿದ್ದರೆ, ನಡೆಯುವುದು ಅಥವಾ ಸ್ಟ್ರೆಚಿಂಗ್‌ನಂತಹ ಸೌಮ್ಯ ಚಟುವಟಿಕೆಗಳು ಸಾಮಾನ್ಯ ಆರೋಗ್ಯಕ್ಕೆ ಸಹಾಯಕವಾಗಬಹುದು.")
        .replace(/\bMaintaining regular movement can be a positive wellness habit\./gi, "ನಿಯಮಿತ ಚಟುವಟಿಕೆಯನ್ನು ಮುಂದುವರಿಸುವುದು ಉತ್ತಮ ಆರೋಗ್ಯಕರ ಅಭ್ಯಾಸವಾಗಬಹುದು.")
        .replace(/\bRemember to balance activity with sufficient rest and recovery\./gi, "ಸಾಕಷ್ಟು ವಿಶ್ರಾಂತಿ ಮತ್ತು ಚೇತರಿಕೆಯೊಂದಿಗೆ ಚಟುವಟಿಕೆಯನ್ನು ಸಮತೋಲನದಲ್ಲಿಡಲು ಮರೆಯದಿರಿ.")
        .replace(/\bYou are currently around cycle day\b/gi, "ನೀವು ಪ್ರಸ್ತುತ ಚಕ್ರದ ಸುಮಾರು")
        .replace(/\bThis is commonly within the menstrual phase\./gi, "ಇದು ಸಾಮಾನ್ಯವಾಗಿ ಮಾಸಿಕ ಧರ್ಮದ ಹಂತದಲ್ಲಿರುತ್ತದೆ.")
        .replace(/\bContinue observing changes in mood, energy, and symptoms\./gi, "ಮನಸ್ಥಿತಿ, ಶಕ್ತಿ ಮತ್ತು ಲಕ್ಷಣಗಳಲ್ಲಿನ ಬದಲಾವಣೆಗಳನ್ನು ಗಮನಿಸುತ್ತಿರಿ.")
        .replace(/\bContinue monitoring changes in mood, energy, sleep, and other symptoms\./gi, "ಮನಸ್ಥಿತಿ, ಶಕ್ತಿ, ನಿದ್ರೆ ಮತ್ತು ಇತರ ಲಕ್ಷಣಗಳಲ್ಲಿನ ಬದಲಾವಣೆಗಳನ್ನು ಗಮನಿಸುತ್ತಿರಿ.")
        .replace(/\bPay attention to changes in mood, sleep, energy, and symptoms as your next period approaches\./gi, "ಮುಂದಿನ ಮಾಸಿಕ ಧರ್ಮ ಸಮೀಪಿಸುತ್ತಿರುವಾಗ ಮನಸ್ಥಿತಿ, ನಿದ್ರೆ, ಶಕ್ತಿ ಮತ್ತು ಲಕ್ಷಣಗಳಲ್ಲಿನ ಬದಲಾವಣೆಗಳಿಗೆ ಗಮನ ನೀಡಿ.")
        .replace(/\bContinue tracking regularly to build a clearer picture of your personal wellness patterns\./gi, "ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಆರೋಗ್ಯ ಮಾದರಿಗಳನ್ನು ಉತ್ತಮವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ನಿಯಮಿತವಾಗಿ ದಾಖಲಿಸುತ್ತಿರಿ.")
        .replace(/\bStart recording your health information to receive personalized health insights\./gi, "ವೈಯಕ್ತಿಕ ಆರೋಗ್ಯ ಒಳನೋಟಗಳನ್ನು ಪಡೆಯಲು ನಿಮ್ಮ ಆರೋಗ್ಯ ಮಾಹಿತಿಯನ್ನು ದಾಖಲಿಸಲು ಪ್ರಾರಂಭಿಸಿ.")
        .replace(/\bContinue recording your health information to receive more personalized wellness insights\./gi, "ಹೆಚ್ಚು ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ಆರೋಗ್ಯ ಒಳನೋಟಗಳನ್ನು ಪಡೆಯಲು ನಿಮ್ಮ ಆರೋಗ್ಯ ಮಾಹಿತಿಯನ್ನು ದಾಖಲಿಸುತ್ತಿರಿ.")
        .replace(
          /\bYour recorded mood is around the middle of the selected scale and contributes moderately to the awareness score\./gi,
          "ನಿಮ್ಮ ದಾಖಲಾದ ಮನಸ್ಥಿತಿಯು ಆಯ್ಕೆಮಾಡಿದ ಮಾಪಕದ ಮಧ್ಯಮ ಮಟ್ಟದಲ್ಲಿದೆ ಮತ್ತು ಅರಿವಿನ ಅಂಕಕ್ಕೆ ಮಧ್ಯಮವಾಗಿ ಕೊಡುಗೆ ನೀಡುತ್ತದೆ."
        )
        .replace(
          /\bThe current awareness score is based on your latest recorded wellness information\. The factors contributing to this score are: mood\. Each factor contributes a predefined amount according to the current transparent awareness rules\./gi,
          "ಪ್ರಸ್ತುತ ಅರಿವಿನ ಅಂಕವು ನಿಮ್ಮ ಇತ್ತೀಚಿನ ದಾಖಲಾದ ಆರೋಗ್ಯ ಮಾಹಿತಿಯನ್ನು ಆಧರಿಸಿದೆ. ಈ ಅಂಕಕ್ಕೆ ಕೊಡುಗೆ ನೀಡುವ ಅಂಶಗಳು: ಮನಸ್ಥಿತಿ. ಪ್ರಸ್ತುತ ಪಾರದರ್ಶಕ ಅರಿವಿನ ನಿಯಮಗಳ ಪ್ರಕಾರ ಪ್ರತಿಯೊಂದು ಅಂಶವು ಪೂರ್ವನಿರ್ಧರಿತ ಪ್ರಮಾಣದಲ್ಲಿ ಕೊಡುಗೆ ನೀಡುತ್ತದೆ."
        )

      result = result
        .replace(/\bhours?\b/gi, "ಗಂಟೆಗಳು")
        .replace(/\bdays?\b/gi, "ದಿನಗಳು")
        .replace(/\bLow\b/gi, "ಕಡಿಮೆ")
        .replace(/\bModerate\b/gi, "ಮಧ್ಯಮ")
        .replace(/\bHigh\b/gi, "ಹೆಚ್ಚು")
        .replace(/\bMood\b/gi, "ಮನಸ್ಥಿತಿ")
        .replace(/\bSleep\b/gi, "ನಿದ್ರೆ")
        .replace(/\bActivity\b/gi, "ಚಟುವಟಿಕೆ")
        .replace(/\bCycle\b/gi, "ಚಕ್ರ");
    }

    if (language === "Hindi") {
      result = result
        .replace(/\bYour recorded average sleep is\b/gi, "आपकी दर्ज की गई औसत नींद")
        .replace(/\bYour recorded average mood is\b/gi, "आपका दर्ज किया गया औसत मूड")
        .replace(/\bYour latest recorded activity level is\b/gi, "आपका हाल का दर्ज गतिविधि स्तर")
        .replace(/\bYour recent sleep pattern appears lower than ideal\./gi, "आपकी हाल की नींद का पैटर्न अपेक्षित स्तर से कम दिखाई देता है।")
        .replace(/\bYour sleep duration is slightly below the range you may want to aim for\./gi, "आपकी नींद की अवधि आपके लक्षित स्तर से थोड़ी कम है।")
        .replace(/\bYour recent sleep pattern looks positive\./gi, "आपकी हाल की नींद का पैटर्न अच्छा दिखाई देता है।")
        .replace(/\bTry maintaining a consistent sleep schedule and getting adequate rest\./gi, "नियमित नींद का समय बनाए रखने और पर्याप्त आराम लेने का प्रयास करें।")
        .replace(/\bContinue monitoring your sleep pattern\./gi, "अपनी नींद के पैटर्न पर नज़र रखना जारी रखें।")
        .replace(/\bMaintaining consistent sleep can support overall wellbeing\./gi, "नियमित नींद आपके समग्र स्वास्थ्य और कल्याण में सहायता कर सकती है।")
        .replace(/\bYour recent mood ratings have been relatively low\./gi, "आपकी हाल की मूड रेटिंग अपेक्षाकृत कम रही है।")
        .replace(/\bYour mood has varied across your recorded entries\./gi, "आपके रिकॉर्ड में मूड में बदलाव दिखाई देता है।")
        .replace(/\bYour recent mood pattern appears positive\./gi, "आपका हाल का मूड पैटर्न सकारात्मक दिखाई देता है।")
        .replace(/\bConsider self-care, supportive social connection, and continuing to monitor how you feel\./gi, "अपनी देखभाल, करीबी लोगों से जुड़ाव और अपनी भावनाओं पर नज़र रखने पर ध्यान दें।")
        .replace(/\bContinue tracking your mood to understand your personal patterns\./gi, "अपने व्यक्तिगत पैटर्न को समझने के लिए मूड को रिकॉर्ड करना जारी रखें।")
        .replace(/\bYour recorded mood has shown noticeable variation over time\./gi, "समय के साथ आपके दर्ज मूड में उल्लेखनीय बदलाव दिखाई दिया है।")
        .replace(/\bContinuing to track your mood alongside sleep and cycle information may help you recognize patterns\./gi, "नींद और चक्र की जानकारी के साथ मूड रिकॉर्ड करने से व्यक्तिगत पैटर्न पहचानने में मदद मिल सकती है।")
        .replace(/\bYour latest recorded activity level is low\./gi, "आपका हाल का दर्ज गतिविधि स्तर कम है।")
        .replace(/\bYour latest recorded activity level is moderate\./gi, "आपका हाल का दर्ज गतिविधि स्तर मध्यम है।")
        .replace(/\bYour latest recorded activity level is high\./gi, "आपका हाल का दर्ज गतिविधि स्तर अधिक है।")
        .replace(/\bIf you feel comfortable, gentle movement such as walking or stretching may support general wellbeing\./gi, "यदि आपको सुविधाजनक लगे, तो चलना या स्ट्रेचिंग जैसी हल्की गतिविधियां सामान्य स्वास्थ्य में सहायता कर सकती हैं।")
        .replace(/\bMaintaining regular movement can be a positive wellness habit\./gi, "नियमित गतिविधि बनाए रखना एक अच्छा स्वास्थ्य आदत हो सकता है।")
        .replace(/\bRemember to balance activity with sufficient rest and recovery\./gi, "पर्याप्त आराम और रिकवरी के साथ अपनी गतिविधि को संतुलित रखना याद रखें।")
        .replace(/\bYou are currently around cycle day\b/gi, "आप वर्तमान में चक्र के लगभग")
        .replace(/\bThis is commonly within the menstrual phase\./gi, "यह सामान्यतः मासिक धर्म के चरण में होता है।")
        .replace(/\bContinue observing changes in mood, energy, and symptoms\./gi, "मूड, ऊर्जा और लक्षणों में होने वाले बदलावों पर नज़र रखें।")
        .replace(/\bContinue monitoring changes in mood, energy, sleep, and other symptoms\./gi, "मूड, ऊर्जा, नींद और अन्य लक्षणों में होने वाले बदलावों पर नज़र रखें।")
        .replace(/\bPay attention to changes in mood, sleep, energy, and symptoms as your next period approaches\./gi, "अगली माहवारी के करीब आने पर मूड, नींद, ऊर्जा और लक्षणों में होने वाले बदलावों पर ध्यान दें।")
        .replace(/\bContinue tracking regularly to build a clearer picture of your personal wellness patterns\./gi, "अपने व्यक्तिगत स्वास्थ्य पैटर्न को बेहतर समझने के लिए नियमित रूप से रिकॉर्ड करते रहें।")
        .replace(/\bStart recording your health information to receive personalized health insights\./gi, "व्यक्तिगत स्वास्थ्य जानकारी प्राप्त करने के लिए अपनी स्वास्थ्य जानकारी रिकॉर्ड करना शुरू करें।")
        .replace(/\bContinue recording your health information to receive more personalized wellness insights\./gi, "अधिक व्यक्तिगत स्वास्थ्य जानकारी प्राप्त करने के लिए अपनी स्वास्थ्य जानकारी रिकॉर्ड करना जारी रखें।")
        .replace(
          /\bYour recorded mood is around the middle of the selected scale and contributes moderately to the awareness score\./gi,
          "आपका दर्ज किया गया मूड चुने गए पैमाने के मध्य स्तर के आसपास है और जागरूकता स्कोर में मध्यम योगदान देता है।"
        )
        .replace(
          /\bThe current awareness score is based on your latest recorded wellness information\. The factors contributing to this score are: mood\. Each factor contributes a predefined amount according to the current transparent awareness rules\./gi,
          "वर्तमान जागरूकता स्कोर आपकी हाल की दर्ज की गई स्वास्थ्य जानकारी पर आधारित है। इस स्कोर में योगदान देने वाले कारक हैं: मूड। वर्तमान पारदर्शी जागरूकता नियमों के अनुसार प्रत्येक कारक एक पूर्वनिर्धारित मात्रा में योगदान देता है।"
        )

      result = result
        .replace(/\bhours?\b/gi, "घंटे")
        .replace(/\bdays?\b/gi, "दिन")
        .replace(/\bLow\b/gi, "कम")
        .replace(/\bModerate\b/gi, "मध्यम")
        .replace(/\bHigh\b/gi, "उच्च")
        .replace(/\bMood\b/gi, "मूड")
        .replace(/\bSleep\b/gi, "नींद")
        .replace(/\bActivity\b/gi, "गतिविधि")
        .replace(/\bCycle\b/gi, "चक्र");
    }

    return result;
  };

  // ==========================================
  // LOAD DASHBOARD DATA
  // ==========================================

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const token =
          localStorage.getItem(
            "sakhi_token"
          );

        if (!token) {
          return;
        }

        const headers = {
          Authorization:
            `Bearer ${token}`,
        };

        // ======================================
        // USER
        // ======================================

        const userResponse =
          await api.get(
            "/auth/me",
            { headers }
          );

        setUser(
          userResponse.data
        );

        // ======================================
        // HEALTH DATA
        // ======================================

        const healthResponse =
          await api.get(
            "/health/tracking",
            { headers }
          );

        const records:
          HealthRecord[] =
          healthResponse.data;

        setHealthRecords(
          records
        );

        if (records.length > 0) {
          setHealthRecord(
            records[0]
          );
        }

        // ======================================
        // PMOS PREDICTION
        // ======================================

        const predictionResponse =
          await api.get(
            "/prediction/pmo-risk",
            { headers }
          );

        setPmoRisk(
          predictionResponse.data
            .risk_percentage
        );

        setRiskLevel(
          predictionResponse.data
            .risk_level || ""
        );

        setPmoFactors(
          predictionResponse.data
            .contributing_factors || []
        );

        setPmoExplanation(
          predictionResponse.data
            .explanation || ""
        );

        // ======================================
        // AI HEALTH INSIGHTS
        // ======================================

        const insightsResponse =
          await api.get(
            "/insights/today",
            { headers }
          );

        setHealthInsights(
          insightsResponse.data
        );
      } catch {
        console.error("Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  // ==========================================
  // WELLNESS CALCULATIONS
  // ==========================================

  const recordsWithSleep =
    healthRecords.filter(
      (record) =>
        record.sleep_hours !== null &&
        record.sleep_hours !== undefined
    );

  const recordsWithMood =
    healthRecords.filter(
      (record) =>
        record.mood !== null &&
        record.mood !== undefined
    );

  const averageSleep =
    recordsWithSleep.length > 0
      ? (
          recordsWithSleep.reduce(
            (total, record) =>
              total +
              Number(
                record.sleep_hours
              ),
            0
          ) /
          recordsWithSleep.length
        ).toFixed(1)
      : null;

  const averageMood =
    recordsWithMood.length > 0
      ? (
          recordsWithMood.reduce(
            (total, record) =>
              total +
              Number(record.mood),
            0
          ) /
          recordsWithMood.length
        ).toFixed(1)
      : null;

  const trackingDays =
    healthRecords.length;

  const latestActivity =
    healthRecord?.activity_level ||
    null;

  // ==========================================
  // WELLNESS STATUS
  // ==========================================

  let wellnessStatus =
    t(
      "dashboard.wellnessStart"
    );

  if (healthRecords.length > 0) {
    if (
      averageSleep !== null &&
      Number(averageSleep) >= 7 &&
      averageMood !== null &&
      Number(averageMood) >= 3
    ) {
      wellnessStatus =
        t(
          "dashboard.wellnessPositive"
        );
    } else if (
      averageSleep !== null &&
      Number(averageSleep) < 6
    ) {
      wellnessStatus =
        t(
          "dashboard.wellnessLowSleep"
        );
    } else if (
      averageMood !== null &&
      Number(averageMood) <= 2
    ) {
      wellnessStatus =
        t(
          "dashboard.wellnessLowMood"
        );
    } else {
      wellnessStatus =
        t(
          "dashboard.wellnessTracking"
        );
    }
  }

  // ==========================================
  // CHART DATA
  // ==========================================

  const chartData =
    [...healthRecords]
      .reverse()
      .map((record) => ({
        date:
          new Date(
            record.tracking_date
          ).toLocaleDateString(
            language === "Kannada"
              ? "kn-IN"
              : language === "Hindi"
              ? "hi-IN"
              : "en-IN",
            {
              day: "numeric",
              month: "short",
            }
          ),
        mood: record.mood,
        sleep:
          record.sleep_hours,
      }));

  const insightMessages = translateHealthInsights(
    healthInsights,
    t
  );
  const hasMoodChartData = chartData.some(
    (record) =>
      typeof record.mood === "number" &&
      Number.isFinite(record.mood)
  );
  const hasSleepChartData = chartData.some(
    (record) =>
      typeof record.sleep === "number" &&
      Number.isFinite(record.sleep)
  );
  const patientName = user?.full_name?.trim();

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fff8fb] flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium text-[#4d3a4a]">
            {t(
              "common.loading"
            )}
          </p>

          <p className="mt-2 text-sm text-[#8b7285]">
            {t(
              "dashboard.continueRecording"
            )}
          </p>
        </div>
      </main>
    );
  }

  // ==========================================
  // DASHBOARD
  // ==========================================

  return (
    <main className="min-h-screen bg-[#fff8fb] px-4 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* ====================================
            HEADER
        ==================================== */}

        <div className="mb-8">

          <p className="text-sm font-medium text-[#a65a78]">
            {t(
              "dashboard.title"
            )}
          </p>

          <h1 className="mt-1 text-3xl font-bold text-[#332532]">
            {t(
              "dashboard.welcome"
            )}
            ,{" "}
            {patientName ||
              t("dashboard.user")} 🌸
          </h1>

          <p className="mt-2 text-[#76566f]">
            {t(
              "dashboard.welcomeMessage"
            )}
          </p>

        </div>

        {/* ====================================
            HEALTH OVERVIEW
        ==================================== */}

        <section>

          <h2 className="mb-4 text-xl font-semibold text-[#332532]">
            {t(
              "dashboard.healthOverview"
            )}
          </h2>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {/* Cycle */}

            <OverviewCard
              title={t("dashboard.cycle")}
              value={
                healthRecord?.cycle_day
                  ? `${t("dashboard.dayLabel")} ${healthRecord.cycle_day}`
                  : "-"
              }
              description={t("dashboard.currentCycleDay")}
              className="bg-[#fdeaf1]"
            />

            {/* PMOS */}

            <OverviewCard
              title={t("dashboard.pmosRisk")}
              value={
                pmoRisk !== null
                  ? `${pmoRisk}%`
                  : "-"
              }
              description={
                riskLevel
                  ? `${translateRiskLevel(riskLevel)} ${t("dashboard.estimatedRisk")}`
                  : t("dashboard.currentEstimatedRisk")
              }
              className="bg-[#eee8fa]"
            />

            {/* Mood */}

            <OverviewCard
              title={t(
                "dashboard.mood"
              )}
              value={
                healthRecord?.mood !==
                  null &&
                healthRecord?.mood !==
                  undefined
                  ? `${healthRecord.mood} / 5`
                  : "-"
              }
              description={t(
                "dashboard.latestRecordedMood"
              )}
              className="bg-[#fff1dc]"
            />

            {/* Lifestyle */}

            <OverviewCard
              title={t(
                "dashboard.lifestyle"
              )}
              value={translateActivity(
                healthRecord?.activity_level ||
                  null
              )}
              description={t(
                "dashboard.latestActivityLevel"
              )}
              className="bg-[#e8f5ed]"
            />

          </div>
        </section>

        {/* ====================================
            WELLNESS + AI INSIGHTS
        ==================================== */}

        <div className="mt-8 grid gap-6 lg:grid-cols-2">

          {/* WELLNESS */}

          <section className="rounded-2xl border border-[#f0dce5] bg-white p-6 shadow-sm">

            <h2 className="text-xl font-semibold text-[#332532]">
              {t(
                "dashboard.wellness"
              )}
            </h2>

            <p className="mt-2 text-[#76566f]">
              {t(
                "dashboard.wellnessDescription"
              )}
            </p>

            {/* WELLNESS SUMMARY */}

            <div className="mt-6 grid gap-4 sm:grid-cols-2">

              {/* Latest Sleep */}

              <div className="rounded-xl bg-[#fff8fb] p-4">

                <p className="text-sm text-[#a17b91]">
                  {t(
                    "dashboard.latestSleep"
                  )}
                </p>

                <p className="mt-1 text-xl font-semibold text-[#4d3a4a]">
                  {healthRecord?.sleep_hours !==
                    null &&
                  healthRecord?.sleep_hours !==
                    undefined
                    ? `${healthRecord.sleep_hours} ${t(
                        "dashboard.hours"
                      )}`
                    : "-"}
                </p>

                <p className="mt-1 text-xs text-[#8b7285]">
                  {t(
                    "dashboard.mostRecentRecording"
                  )}
                </p>

              </div>

              {/* Average Sleep */}

              <div className="rounded-xl bg-[#fff8fb] p-4">

                <p className="text-sm text-[#a17b91]">
                  {t(
                    "dashboard.averageSleep"
                  )}
                </p>

                <p className="mt-1 text-xl font-semibold text-[#4d3a4a]">
                  {averageSleep !==
                  null
                    ? `${averageSleep} ${t(
                        "dashboard.hours"
                      )}`
                    : "-"}
                </p>

                <p className="mt-1 text-xs text-[#8b7285]">
                  {t(
                    "dashboard.basedOnRecordedHistory"
                  )}
                </p>

              </div>

              {/* Latest Mood */}

              <div className="rounded-xl bg-[#fff8fb] p-4">

                <p className="text-sm text-[#a17b91]">
                  {t(
                    "dashboard.latestMood"
                  )}
                </p>

                <p className="mt-1 text-xl font-semibold text-[#4d3a4a]">
                  {healthRecord?.mood !==
                    null &&
                  healthRecord?.mood !==
                    undefined
                    ? `${healthRecord.mood} / 5`
                    : "-"}
                </p>

                <p className="mt-1 text-xs text-[#8b7285]">
                  {t(
                    "dashboard.mostRecentRecording"
                  )}
                </p>

              </div>

              {/* Average Mood */}

              <div className="rounded-xl bg-[#fff8fb] p-4">

                <p className="text-sm text-[#a17b91]">
                  {t(
                    "dashboard.averageMood"
                  )}
                </p>

                <p className="mt-1 text-xl font-semibold text-[#4d3a4a]">
                  {averageMood !==
                  null
                    ? `${averageMood} / 5`
                    : "-"}
                </p>

                <p className="mt-1 text-xs text-[#8b7285]">
                  {t(
                    "dashboard.basedOnRecordedHistory"
                  )}
                </p>

              </div>

            </div>

            {/* ACTIVITY + TRACKING */}

            <div className="mt-4 grid gap-4 sm:grid-cols-2">

              <div className="rounded-xl bg-[#e8f5ed] p-4">

                <p className="text-sm text-[#6f8f7b]">
                  {t(
                    "dashboard.latestActivity"
                  )}
                </p>

                <p className="mt-1 text-xl font-semibold text-[#4d3a4a]">
                  {translateActivity(
                    latestActivity
                  )}
                </p>

                <p className="mt-1 text-xs text-[#6f8f7b]">
                  {t(
                    "dashboard.mostRecentActivityLevel"
                  )}
                </p>

              </div>

              <div className="rounded-xl bg-[#eee8fa] p-4">

                <p className="text-sm text-[#806f9a]">
                  {t(
                    "dashboard.healthRecords"
                  )}
                </p>

                <p className="mt-1 text-xl font-semibold text-[#4d3a4a]">
                  {trackingDays}
                </p>

                <p className="mt-1 text-xs text-[#806f9a]">
                  {t(
                    "dashboard.totalRecordedEntries"
                  )}
                </p>

              </div>

            </div>

            {/* WELLNESS STATUS */}

            <div className="mt-5 rounded-xl border border-[#eadff0] bg-[#faf8fc] p-4">

              <p className="text-sm font-semibold text-[#4d3a4a]">
                {t(
                  "dashboard.wellnessStatus"
                )}
              </p>

              <p className="mt-2 text-sm leading-6 text-[#76566f]">
                {wellnessStatus}
              </p>

            </div>

            {/* DISCLAIMER */}

            <p className="mt-4 text-xs leading-5 text-[#8b7285]">
              {t(
                "dashboard.wellnessDisclaimer"
              )}
            </p>

          </section>

          {/* AI HEALTH INSIGHTS */}

          <section className="rounded-2xl border border-[#ded3f0] bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eee8fa] text-lg">
                ✨
              </div>

              <div>

                <h2 className="text-xl font-semibold text-[#332532]">
                  {t("dashboard.aiHealthInsights")}
                </h2>

                <p className="mt-1 text-sm text-[#76566f]">
                  {t("dashboard.aiInsightsDescription")}
                </p>

              </div>

            </div>

            {/* INSIGHTS */}

            {insightMessages.length > 0 ? (

              <div className="mt-6 space-y-3">

                {insightMessages.map((message, index) => (
                      <div
                        key={index}
                        className="rounded-xl bg-[#f5f0fb] p-4"
                      >

                        <div className="flex gap-3">

                          <span className="mt-0.5 text-[#a65a78]">
                            ✦
                          </span>

                          <p className="text-sm leading-6 text-[#5f4a58]">
                            {message}
                          </p>

                        </div>

                      </div>
                ))}

              </div>

            ) : (

              <div className="mt-6 rounded-xl bg-[#f5f0fb] p-6 text-center">

                <p className="font-medium text-[#4d3a4a]">
                  {t("dashboard.noInsights")}
                </p>

                <p className="mt-2 text-sm text-[#76566f]">
                  {t("dashboard.continueRecording")}
                </p>

              </div>

            )}

            {/* DISCLAIMER */}

            <div className="mt-5 rounded-xl border border-[#eadff0] bg-[#faf8fc] p-4">

              <p className="text-xs leading-5 text-[#8b7285]">
                {t("dashboard.insightsDisclaimer")}
              </p>

            </div>

          </section>

        </div>

        {/* ====================================
            HEALTH TRENDS
        ==================================== */}

        <section className="mt-6 rounded-2xl border border-[#f0dce5] bg-white p-6 shadow-sm">

          <h2 className="text-xl font-semibold text-[#332532]">
            {t(
              "dashboard.healthTrends"
            )}
          </h2>

          <p className="mt-2 text-[#76566f]">
            {t(
              "dashboard.trackHealthChanges"
            )}
          </p>

          {chartData.length > 0 ? (

            <div className="mt-6 grid min-w-0 gap-6 lg:grid-cols-2">

              {/* MOOD TREND */}

              <div className="min-w-0 rounded-xl bg-[#fff8fb] p-4">

                <h3 className="mb-4 text-lg font-semibold text-[#4d3a4a]">
                  {t(
                    "dashboard.moodTrend"
                  )}
                </h3>

                {hasMoodChartData ? (
                <div
                  className="h-64 w-full min-w-0"
                  role="img"
                  aria-label={t("dashboard.moodTrend")}
                >

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <LineChart
                      data={
                        chartData
                      }
                      margin={{ top: 8, right: 12, left: -12, bottom: 0 }}
                    >

                      <CartesianGrid
                        strokeDasharray="3 3"
                      />

                      <XAxis
                        dataKey="date"
                        interval="preserveStartEnd"
                        minTickGap={24}
                        tick={{ fontSize: 12 }}
                      />

                      <YAxis
                        width={36}
                        domain={[
                          0,
                          5,
                        ]}
                        ticks={[
                          0,
                          1,
                          2,
                          3,
                          4,
                          5,
                        ]}
                      />

                      <Tooltip
                        contentStyle={{
                          borderRadius: "0.75rem",
                          borderColor: "#eadce5",
                        }}
                      />

                      <Line
                        type="monotone"
                        dataKey="mood"
                        name={t("dashboard.mood")}
                        stroke="#a65a78"
                        strokeWidth={3}
                        dot={{
                          r: 4,
                        }}
                        connectNulls
                      />

                    </LineChart>

                  </ResponsiveContainer>

                </div>
                ) : (
                  <p className="rounded-lg bg-white px-4 py-10 text-center text-sm text-[#8b7285]">
                    {t("dashboard.noMoodChartData")}
                  </p>
                )}

                <p className="mt-3 text-xs text-[#8b7285]">
                  {t(
                    "dashboard.moodScale"
                  )}
                </p>

              </div>

              {/* SLEEP TREND */}

              <div className="min-w-0 rounded-xl bg-[#fff8fb] p-4">

                <h3 className="mb-4 text-lg font-semibold text-[#4d3a4a]">
                  {t(
                    "dashboard.sleepTrend"
                  )}
                </h3>

                {hasSleepChartData ? (
                <div
                  className="h-64 w-full min-w-0"
                  role="img"
                  aria-label={t("dashboard.sleepTrend")}
                >

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <LineChart
                      data={
                        chartData
                      }
                      margin={{ top: 8, right: 12, left: -12, bottom: 0 }}
                    >

                      <CartesianGrid
                        strokeDasharray="3 3"
                      />

                      <XAxis
                        dataKey="date"
                        interval="preserveStartEnd"
                        minTickGap={24}
                        tick={{ fontSize: 12 }}
                      />

                      <YAxis width={42} tick={{ fontSize: 12 }} />

                      <Tooltip
                        contentStyle={{
                          borderRadius: "0.75rem",
                          borderColor: "#eadce5",
                        }}
                      />

                      <Line
                        type="monotone"
                        dataKey="sleep"
                        name={t("dashboard.sleepDuration")}
                        stroke="#7c6bb3"
                        strokeWidth={3}
                        dot={{
                          r: 4,
                        }}
                        connectNulls
                      />

                    </LineChart>

                  </ResponsiveContainer>

                </div>
                ) : (
                  <p className="rounded-lg bg-white px-4 py-10 text-center text-sm text-[#8b7285]">
                    {t("dashboard.noSleepChartData")}
                  </p>
                )}

                <p className="mt-3 text-xs text-[#8b7285]">
                  {t(
                    "dashboard.sleepMeasured"
                  )}
                </p>

              </div>

            </div>

          ) : (

            <div className="mt-6 rounded-xl bg-[#fff8fb] p-6 text-center">

              <p className="font-medium text-[#4d3a4a]">
                {t(
                  "dashboard.noHealthHistory"
                )}
              </p>

              <p className="mt-2 text-sm text-[#76566f]">
                {t(
                  "dashboard.continueRecording"
                )}
              </p>

            </div>

          )}

        </section>

        {/* ====================================
            PMOS EXPLAINABLE AI
        ==================================== */}

        <section className="mt-6 rounded-2xl border border-[#ded3f0] bg-white p-6 shadow-sm">

          <h2 className="text-xl font-semibold text-[#332532]">
            {t(
              "dashboard.pmosRiskAwareness"
            )}
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#76566f]">
            {t(
              "dashboard.pmosDescription"
            )}
          </p>

          {/* SCORE */}

          <div className="mt-6 rounded-2xl bg-[#f5f0fb] p-6">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-sm text-[#8b7285]">
                  {t(
                    "dashboard.currentAwarenessScore"
                  )}
                </p>

                <p className="mt-1 text-4xl font-bold text-[#4d3a4a]">
                  {pmoRisk !==
                  null
                    ? `${pmoRisk}%`
                    : "-"}
                </p>

              </div>

              <div className="rounded-full bg-white px-5 py-2">

                <p className="text-sm font-semibold text-[#a65a78]">
                  {riskLevel
                    ? translateRiskLevel(
                        riskLevel
                      )
                    : t(
                        "dashboard.noData"
                      )}
                </p>

              </div>

            </div>

          </div>

          {/* CONTRIBUTING FACTORS */}

          <div className="mt-6">

            <h3 className="text-lg font-semibold text-[#332532]">
              {t(
                "dashboard.contributingFactors"
              )}
            </h3>

            <p className="mt-1 text-sm text-[#76566f]">
              {t(
                "dashboard.factorsInfluenceScore"
              )}
            </p>

            {pmoFactors.length >
            0 ? (

              <div className="mt-4 space-y-3">

                {pmoFactors.map(
                  (
                    factor,
                    index
                  ) => {

                    const translated =
                      translateFactor(
                        factor
                      );

                    return (
                      <div
                        key={index}
                        className="rounded-xl border border-[#f0dce5] bg-[#fff8fb] p-4"
                      >

                        <div className="flex items-center justify-between gap-4">

                          <div>

                            <p className="font-medium text-[#4d3a4a]">
                              {
                                translated.factor
                              }
                            </p>

                            <p className="mt-1 text-xs text-[#8b7285]">
                              {t(
                                "dashboard.recordedValue"
                              )}
                              :{" "}
                              {
                                translated.value
                              }
                            </p>

                          </div>

                          <div className="text-right">

                            <p className="font-semibold text-[#a65a78]">
                              +
                              {
                                translated.contribution
                              }
                            </p>

                            <p className="text-xs text-[#8b7285]">
                              {
                                translated.impact
                              }
                            </p>

                          </div>

                        </div>

                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#eadff0]">

                          <div
                            className="h-full rounded-full bg-[#c084a0]"
                            style={{
                              width:
                                `${Math.min(
                                  factor.contribution *
                                    3.33,
                                  100
                                )}%`,
                            }}
                          />

                        </div>

                        <p className="mt-3 text-sm leading-5 text-[#76566f]">
                          {
                            translated.explanation
                          }
                        </p>

                      </div>
                    );
                  }
                )}

              </div>

            ) : (

              <div className="mt-4 rounded-xl bg-[#faf8fc] p-5 text-center">

                <p className="text-sm text-[#76566f]">
                  {t(
                    "dashboard.recordHealthInfo"
                  )}
                </p>

              </div>

            )}

          </div>

          {/* EXPLANATION */}

          {pmoExplanation && (

            <div className="mt-6 rounded-xl border border-[#eadff0] bg-[#faf8fc] p-5">

              <h3 className="font-semibold text-[#4d3a4a]">
                {t(
                  "dashboard.whyScoreShown"
                )}
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#76566f]">
                {translateDynamicText(
                  pmoExplanation
                )}
              </p>

            </div>

          )}

          {/* DISCLAIMER */}

          <div className="mt-5 rounded-xl border border-[#f0dce5] bg-[#fff8fb] p-4">

            <p className="text-xs leading-5 text-[#8b7285]">
              {t(
                "dashboard.pmosDisclaimer"
              )}
            </p>

          </div>

        </section>

        {/* ====================================
            PROFILE
        ==================================== */}

        <section className="mt-6 rounded-2xl border border-[#f0dce5] bg-white p-6 shadow-sm">

          <h2 className="text-xl font-semibold text-[#332532]">
            {t(
              "dashboard.yourProfile"
            )}
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-xl bg-[#fff8fb] p-4">

              <p className="text-sm text-[#a17b91]">
                {t(
                  "dashboard.email"
                )}
              </p>

              <p className="mt-1 break-all font-medium text-[#4d3a4a]">
                {user?.email ||
                  "-"}
              </p>

            </div>

            <div className="rounded-xl bg-[#fff8fb] p-4">

              <p className="text-sm text-[#a17b91]">
                {t(
                  "dashboard.age"
                )}
              </p>

              <p className="mt-1 font-medium text-[#4d3a4a]">
                {user?.age ||
                  "-"}
              </p>

            </div>

            <div className="rounded-xl bg-[#fff8fb] p-4">

              <p className="text-sm text-[#a17b91]">
                {t(
                  "dashboard.lifeStage"
                )}
              </p>

              <p className="mt-1 font-medium text-[#4d3a4a]">
                {translateLifeStage(user?.life_stage)}
              </p>

            </div>

            <div className="rounded-xl bg-[#fff8fb] p-4">

              <p className="text-sm text-[#a17b91]">
                {t(
                  "dashboard.language"
                )}
              </p>

              <p className="mt-1 font-medium text-[#4d3a4a]">
                {language}
              </p>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}
