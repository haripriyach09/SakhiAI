"use client";

import { useEffect, useState } from "react";
import { HeartPulse, Moon, Smile, Activity } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import BrandLogo from "@/components/brand-logo";

interface HealthRecord {
  id: number;
  user_id: number;
  cycle_day: number | null;
  mood: number | null;
  sleep_hours: number | null;
  activity_level: string | null;
  tracking_date: string;
}

export default function TrackingPage() {
  const { t } = useLanguage();
  const [cycleDay, setCycleDay] = useState("");
  const [mood, setMood] = useState("");
  const [sleep, setSleep] = useState("");
  const [activity, setActivity] = useState("");
  const [records, setRecords] = useState<HealthRecord[]>([]);
useEffect(() => {
  const loadRecords = async () => {
    try {
      const token = localStorage.getItem("sakhi_token");

      if (!token) {
        return;
      }

      const response = await fetch(
        "http://127.0.0.1:8000/health/tracking",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to load health records");
      }

      setRecords(data);
    } catch {
      console.error("Unable to load health records.");
    }
  };

  loadRecords();
}, []);
const handleSave = async () => {
  try {
    const token = localStorage.getItem("sakhi_token");

    if (!token) {
      alert(t("tracking.loginRequired"));
      return;
    }

    const response = await fetch("http://127.0.0.1:8000/health/tracking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        cycle_day: cycleDay ? Number(cycleDay) : null,
        mood: mood ? Number(mood) : null,
        sleep_hours: sleep ? Number(sleep) : null,
        activity_level: activity || null,
      }),
    });

    if (!response.ok) {
      if (response.status === 422) {
        alert(t("tracking.validationError"));
        return;
      }

      alert(t("tracking.saveError"));
      return;
    }

    alert(`${t("tracking.saveSuccess")} 🌸`);
  } catch {
    console.error("Unable to save health data.");
    alert(t("tracking.saveError"));
  }
};

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="mb-8">
        <BrandLogo className="mb-3 max-w-48" />
        <p className="text-sm text-[#a65a78] font-medium">
          {t("tracking.title")}
        </p>

        <h1 className="mt-1 text-3xl font-bold text-gray-900">
          {t("tracking.heading")} 🌸
        </h1>

        <p className="mt-2 text-gray-500">
          {t("tracking.subtitle")}
        </p>
      </div>

      {/* Tracking cards */}
      <div className="grid gap-6 md:grid-cols-2">

        {/* Cycle */}
        <div className="rounded-2xl border border-[#f0dce5] bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#fce8f0] p-3">
              <HeartPulse className="h-6 w-6 text-[#a65a78]" />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">
                {t("tracking.menstrualCycle")}
              </h2>
              <p className="text-sm text-gray-500">
                {t("tracking.currentCycleInformation")}
              </p>
            </div>
          </div>

          <label className="mt-6 block text-sm font-medium">
            {t("tracking.currentCycleDay")}
          </label>

          <input
            type="number"
            min="1"
            max="45"
            value={cycleDay}
            onChange={(e) => setCycleDay(e.target.value)}
            placeholder={t("tracking.cycleDayPlaceholder")}
            className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#c47a98]"
          />
        </div>

        {/* Mood */}
        <div className="rounded-2xl border border-[#f0dce5] bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#fff1d9] p-3">
              <Smile className="h-6 w-6 text-[#c47a55]" />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">
                {t("tracking.mood")}
              </h2>
              <p className="text-sm text-gray-500">
                {t("tracking.howFeeling")}
              </p>
            </div>
          </div>

          <label className="mt-6 block text-sm font-medium">
            {t("tracking.moodLevel")}
          </label>

          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-[#c47a98]"
          >
            <option value="">{t("tracking.selectMood")}</option>
            <option value="5">😊 {t("tracking.excellent")}</option>
            <option value="4">🙂 {t("tracking.good")}</option>
            <option value="3">😐 {t("tracking.okay")}</option>
            <option value="2">😔 {t("tracking.low")}</option>
            <option value="1">😞 {t("tracking.veryLow")}</option>
          </select>
        </div>

        {/* Sleep */}
        <div className="rounded-2xl border border-[#f0dce5] bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#eee8ff] p-3">
              <Moon className="h-6 w-6 text-[#7963a8]" />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">
                {t("tracking.sleep")}
              </h2>
              <p className="text-sm text-gray-500">
                {t("tracking.sleepDurationDescription")}
              </p>
            </div>
          </div>

          <label className="mt-6 block text-sm font-medium">
            {t("tracking.hoursOfSleep")}
          </label>

          <input
            type="number"
            min="0"
            max="24"
            step="0.5"
            value={sleep}
            onChange={(e) => setSleep(e.target.value)}
            placeholder={t("tracking.sleepPlaceholder")}
            className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#c47a98]"
          />
        </div>

        {/* Activity */}
        <div className="rounded-2xl border border-[#f0dce5] bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#e5f6ef] p-3">
              <Activity className="h-6 w-6 text-[#4d9274]" />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">
                {t("tracking.physicalActivity")}
              </h2>
              <p className="text-sm text-gray-500">
                {t("tracking.recordActivityToday")}
              </p>
            </div>
          </div>

          <label className="mt-6 block text-sm font-medium">
            {t("tracking.activityLevel")}
          </label>

          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-[#c47a98]"
          >
            <option value="">{t("tracking.selectActivity")}</option>
            <option value="low">{t("tracking.activityLow")}</option>
            <option value="moderate">{t("tracking.activityModerate")}</option>
            <option value="high">{t("tracking.activityHigh")}</option>
          </select>
        </div>
      </div>

      {/* Save */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          className="rounded-xl bg-[#a65a78] px-8 py-3 font-medium text-white transition hover:bg-[#914d68]"
        >
          {t("tracking.saveToday")}
        </button>
      </div>
        {/* Recent Health Records */}
  <section className="mt-10">
    <h2 className="mb-4 text-xl font-semibold text-gray-900">
      {t("tracking.recentRecords")}
    </h2>

    {records.length === 0 ? (
      <div className="rounded-2xl border border-[#f0dce5] bg-white p-6 text-center shadow-sm">
        <p className="text-gray-500">
          {t("tracking.noRecords")}
        </p>
      </div>
    ) : (
      <div className="space-y-4">
        {records.map((record) => (
          <div
            key={record.id}
            className="rounded-2xl border border-[#f0dce5] bg-white p-5 shadow-sm"
          >
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">

              <div>
                <p className="text-sm text-gray-500">{t("tracking.date")}</p>
                <p className="font-semibold text-gray-900">
                  {record.tracking_date}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">{t("tracking.cycleDay")}</p>
                <p className="font-semibold text-gray-900">
                  {record.cycle_day ?? "-"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">{t("tracking.mood")}</p>
                <p className="font-semibold text-gray-900">
                  {record.mood ?? "-"}/5
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">{t("tracking.sleep")}</p>
                <p className="font-semibold text-gray-900">
                  {record.sleep_hours ?? "-"} {t("tracking.hours")}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">{t("tracking.activity")}</p>
                <p className="font-semibold capitalize text-gray-900">
                  {record.activity_level
                    ? record.activity_level.toLowerCase() === "low"
                      ? t("tracking.activityLow")
                      : record.activity_level.toLowerCase() === "moderate"
                        ? t("tracking.activityModerate")
                        : record.activity_level.toLowerCase() === "high"
                          ? t("tracking.activityHigh")
                          : record.activity_level
                    : "-"}
                </p>
              </div>

            </div>
          </div>
        ))}
      </div>
    )}
  </section>
    </div>
  );
}