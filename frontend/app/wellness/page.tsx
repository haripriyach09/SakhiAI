"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { translateHealthInsights } from "@/lib/healthInsights";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface HealthRecord {
  id: number;
  user_id: number;
  sleep_hours: number | null;
  cycle_day: number | null;
  tracking_date: string;
  mood: number | null;
  activity_level: string | null;
}

export default function WellnessPage() {
  const { t, language } = useLanguage();

  const locale =
    language === "Kannada"
      ? "kn-IN"
      : language === "Hindi"
      ? "hi-IN"
      : "en-IN";

  const [healthRecords, setHealthRecords] =
    useState<HealthRecord[]>([]);

  const [healthInsights, setHealthInsights] =
    useState<unknown>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWellness = async () => {
      try {
        const token =
          localStorage.getItem("sakhi_token");

        if (!token) {
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // ==========================================
        // HEALTH HISTORY
        // ==========================================

        const healthResponse = await api.get(
          "/health/tracking",
          {
            headers,
          }
        );

        setHealthRecords(
          healthResponse.data
        );

        // ==========================================
        // AI HEALTH INSIGHTS
        // ==========================================

        const insightsResponse =
          await api.get(
            "/insights/today",
            {
              headers,
            }
          );

        setHealthInsights(
          insightsResponse.data
        );

      } catch {
        console.error("Unable to load wellness information.");
      } finally {
        setLoading(false);
      }
    };

    loadWellness();
  }, []);

  // ==========================================
  // LATEST RECORD
  // ==========================================

  const latestRecord =
    healthRecords.length > 0
      ? healthRecords[0]
      : null;

  // ==========================================
  // CHART DATA
  // Backend returns newest first.
  // Charts need oldest first.
  // ==========================================

  const chartData = [...healthRecords]
    .reverse()
    .map((record) => ({
      date: new Date(
        record.tracking_date
      ).toLocaleDateString(
        locale,
        {
          day: "numeric",
          month: "short",
        }
      ),

      mood: record.mood,

      sleep: record.sleep_hours,
    }));

  const insightMessages = translateHealthInsights(
    healthInsights,
    t
  );

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fff8fb] flex items-center justify-center">

        <div className="text-center">

          <p className="text-lg font-medium text-[#4d3a4a]">
            {t("wellness.loading")}
          </p>

          <p className="mt-2 text-sm text-[#8b7285]">
            {t("wellness.loadingDescription")}
          </p>

        </div>

      </main>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <main className="min-h-screen bg-[#fff8fb] px-4 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* ======================================
            HEADER
        ====================================== */}

        <div className="mb-8">

          <p className="text-sm font-medium text-[#a65a78]">
            {t("wellness.brand")}
          </p>

          <h1 className="mt-1 text-3xl font-bold text-[#332532]">
            {t("wellness.title")}
          </h1>

          <p className="mt-2 text-[#76566f]">
            {t("wellness.subtitle")}
          </p>

        </div>


        {/* ======================================
            CURRENT WELLNESS
        ====================================== */}

        <section>

          <h2 className="mb-4 text-xl font-semibold text-[#332532]">
            {t("wellness.currentWellness")}
          </h2>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {/* Sleep */}

            <div className="rounded-2xl border border-[#f0dce5] bg-white p-5 shadow-sm">

              <p className="text-sm text-[#a17b91]">
                {t("wellness.sleep")}
              </p>

              <p className="mt-2 text-2xl font-bold text-[#4d3a4a]">

                {latestRecord?.sleep_hours !== null &&
                latestRecord?.sleep_hours !== undefined
                  ? `${latestRecord.sleep_hours} ${t("wellness.hours")}`
                  : "-"}

              </p>

              <p className="mt-1 text-xs text-[#8b7285]">
                {t("wellness.latestSleep")}
              </p>

            </div>


            {/* Mood */}

            <div className="rounded-2xl border border-[#f0dce5] bg-white p-5 shadow-sm">

              <p className="text-sm text-[#a17b91]">
                {t("wellness.mood")}
              </p>

              <p className="mt-2 text-2xl font-bold text-[#4d3a4a]">

                {latestRecord?.mood !== null &&
                latestRecord?.mood !== undefined
                  ? `${latestRecord.mood} / 5`
                  : "-"}

              </p>

              <p className="mt-1 text-xs text-[#8b7285]">
                {t("wellness.latestMood")}
              </p>

            </div>


            {/* Activity */}

            <div className="rounded-2xl border border-[#f0dce5] bg-white p-5 shadow-sm">

              <p className="text-sm text-[#a17b91]">
                {t("wellness.activity")}
              </p>

              <p className="mt-2 text-2xl font-bold capitalize text-[#4d3a4a]">

                {latestRecord?.activity_level?.toLowerCase() === "low"
                  ? t("wellness.activityLow")
                  : latestRecord?.activity_level?.toLowerCase() === "moderate"
                  ? t("wellness.activityModerate")
                  : latestRecord?.activity_level?.toLowerCase() === "high"
                  ? t("wellness.activityHigh")
                  : latestRecord?.activity_level || "-"}

              </p>

              <p className="mt-1 text-xs text-[#8b7285]">
                {t("wellness.latestActivity")}
              </p>

            </div>


            {/* Cycle */}

            <div className="rounded-2xl border border-[#f0dce5] bg-white p-5 shadow-sm">

              <p className="text-sm text-[#a17b91]">
                {t("wellness.cycleDay")}
              </p>

              <p className="mt-2 text-2xl font-bold text-[#4d3a4a]">

                {latestRecord?.cycle_day
                  ? `${t("wellness.day")} ${latestRecord.cycle_day}`
                  : "-"}

              </p>

              <p className="mt-1 text-xs text-[#8b7285]">
                {t("wellness.latestCycleDay")}
              </p>

            </div>

          </div>

        </section>


        {/* ======================================
            TRENDS
        ====================================== */}

        <section className="mt-8">

          <h2 className="mb-4 text-xl font-semibold text-[#332532]">
            {t("wellness.trends")}
          </h2>

          {chartData.length > 0 ? (

            <div className="grid gap-6 lg:grid-cols-2">

              {/* Mood */}

              <div className="rounded-2xl border border-[#f0dce5] bg-white p-6 shadow-sm">

                <h3 className="text-lg font-semibold text-[#4d3a4a]">
                  {t("wellness.moodTrend")}
                </h3>

                <p className="mt-1 text-sm text-[#76566f]">
                  {t("wellness.moodTrendDescription")}
                </p>

                <div className="mt-6 h-64">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <LineChart
                      data={chartData}
                    >

                      <CartesianGrid
                        strokeDasharray="3 3"
                      />

                      <XAxis
                        dataKey="date"
                      />

                      <YAxis
                        domain={[0, 5]}
                        ticks={[
                          0,
                          1,
                          2,
                          3,
                          4,
                          5,
                        ]}
                      />

                      <Tooltip />

                      <Line
                        type="monotone"
                        dataKey="mood"
                        name={t("wellness.mood")}
                        stroke="#a65a78"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        connectNulls
                      />

                    </LineChart>

                  </ResponsiveContainer>

                </div>

              </div>


              {/* Sleep */}

              <div className="rounded-2xl border border-[#f0dce5] bg-white p-6 shadow-sm">

                <h3 className="text-lg font-semibold text-[#4d3a4a]">
                  {t("wellness.sleepTrend")}
                </h3>

                <p className="mt-1 text-sm text-[#76566f]">
                  {t("wellness.sleepTrendDescription")}
                </p>

                <div className="mt-6 h-64">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <LineChart
                      data={chartData}
                    >

                      <CartesianGrid
                        strokeDasharray="3 3"
                      />

                      <XAxis
                        dataKey="date"
                      />

                      <YAxis />

                      <Tooltip />

                      <Line
                        type="monotone"
                        dataKey="sleep"
                        name={t("wellness.sleep")}
                        stroke="#7c6bb3"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        connectNulls
                      />

                    </LineChart>

                  </ResponsiveContainer>

                </div>

              </div>

            </div>

          ) : (

            <div className="rounded-2xl border border-[#f0dce5] bg-white p-8 text-center shadow-sm">

              <p className="font-medium text-[#4d3a4a]">
                {t("wellness.noHistory")}
              </p>

              <p className="mt-2 text-sm text-[#76566f]">
                {t("wellness.noHistoryDescription")}
              </p>

            </div>

          )}

        </section>


        {/* ======================================
            PERSONALIZED INSIGHTS
        ====================================== */}

        <section className="mt-8 rounded-2xl border border-[#ded3f0] bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eee8fa] text-lg">
              ✨
            </div>

            <div>

              <h2 className="text-xl font-semibold text-[#332532]">
                {t("wellness.personalizedInsights")}
              </h2>

              <p className="mt-1 text-sm text-[#76566f]">
                {t("wellness.insightsDescription")}
              </p>

            </div>

          </div>


          {insightMessages.length > 0 ? (

            <div className="mt-6 space-y-3">

              {insightMessages.map(
                (message, index) => (

                  <div
                    key={`${index}-${message}`}
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

                )
              )}

            </div>

          ) : (

            <div className="mt-6 rounded-xl bg-[#f5f0fb] p-6 text-center">

              <p className="font-medium text-[#4d3a4a]">
                {t("wellness.noInsights")}
              </p>

              <p className="mt-2 text-sm text-[#76566f]">
                {t("wellness.noInsightsDescription")}
              </p>

            </div>

          )}


          <div className="mt-5 rounded-xl border border-[#eadff0] bg-[#faf8fc] p-4">

            <p className="text-xs leading-5 text-[#8b7285]">
              {t("wellness.insightsDisclaimer")}
            </p>

          </div>

        </section>

      </div>

    </main>
  );
}