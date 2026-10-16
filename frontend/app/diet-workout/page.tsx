"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import {
  Apple,
  Dumbbell,
  Droplets,
  Moon,
  HeartPulse,
  Utensils,
  Activity,
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

export default function DietWorkoutPage() {
  const { t } = useLanguage();

  const [healthRecord, setHealthRecord] =
    useState<HealthRecord | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHealthData();
  }, []);

  const loadHealthData = async () => {
    try {
      const token =
        localStorage.getItem("sakhi_token");

      if (!token) return;

      const response = await api.get(
        "/health/tracking",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const records: HealthRecord[] =
        response.data;

      // Backend returns newest record first.
      if (records.length > 0) {
        setHealthRecord(records[0]);
      }
    } catch {
      console.error("Unable to load wellness guidance.");
    } finally {
      setLoading(false);
    }
  };

  const activity =
    healthRecord?.activity_level?.toLowerCase();

  const sleep = healthRecord?.sleep_hours;

  const mood = healthRecord?.mood;

  const cycleDay = healthRecord?.cycle_day;

  // --------------------------------------------------
  // PERSONALIZED WELLNESS GUIDANCE
  // --------------------------------------------------

  const getWorkoutGuidance = () => {
    if (activity === "low") {
      return [
        "workoutLowWalk",
        "workoutLowStretch",
        "workoutLowGradual",
      ];
    }

    if (activity === "high") {
      return [
        "workoutHighBalance",
        "workoutHighStretch",
        "workoutHighRest",
      ];
    }

    return [
      "workoutDefaultActivity",
      "workoutDefaultExamples",
      "workoutDefaultRecovery",
    ];
  };

  const getDietGuidance = () => {
    if (cycleDay && cycleDay >= 21) {
      return [
        "dietLateCycleIron",
        "dietLateCycleBalanced",
        "dietLateCycleHydration",
      ];
    }

    if (mood !== null && mood !== undefined && mood <= 2) {
      return [
        "dietLowMoodRegularMeals",
        "dietLowMoodProtein",
        "dietLowMoodProduce",
      ];
    }

    return [
      "dietDefaultBalanced",
      "dietDefaultIronProtein",
      "dietDefaultHydration",
    ];
  };

  const workoutGuidance = getWorkoutGuidance();
  const dietGuidance = getDietGuidance();

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fff8fb] flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium text-[#4d3a4a]">
            {t("dietWorkout.loading")}
          </p>

          <p className="mt-2 text-sm text-[#8b7285]">
            {t("dietWorkout.loadingDescription")}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fff8fb] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}

        <div className="mb-8">
          <p className="text-sm font-medium text-[#a65a78]">
            {t("dietWorkout.brand")}
          </p>

          <h1 className="mt-1 text-3xl font-bold text-[#332532]">
            {t("dietWorkout.title")}
          </h1>

          <p className="mt-2 max-w-3xl text-[#76566f]">
            {t("dietWorkout.description")}
          </p>
        </div>

        {/* DISCLAIMER */}

        <div className="mb-6 rounded-2xl border border-[#eadff0] bg-[#faf8fc] p-5">
          <p className="text-sm leading-6 text-[#6d5866]">
            <strong>{t("dietWorkout.wellnessOnly")}</strong>{" "}
            {t("dietWorkout.wellnessDisclaimer")}
          </p>
        </div>

        {/* CURRENT HEALTH SNAPSHOT */}

        <section className="mb-6 rounded-2xl border border-[#f0dce5] bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fce8f0] text-[#a65a78]">
              <HeartPulse className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#332532]">
                {t("dietWorkout.snapshotTitle")}
              </h2>

              <p className="mt-1 text-sm text-[#76566f]">
                {t("dietWorkout.snapshotDescription")}
              </p>
            </div>
          </div>

          {!healthRecord ? (
            <div className="mt-6 rounded-xl bg-[#fff8fb] p-5 text-center">
              <p className="font-medium text-[#4d3a4a]">
                {t("dietWorkout.noHealthData")}
              </p>

              <p className="mt-2 text-sm text-[#76566f]">
                {t("dietWorkout.noHealthDataDescription")}
              </p>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              <div className="rounded-xl bg-[#fdeaf1] p-4">
                <p className="text-sm text-[#a17b91]">
                  {t("dietWorkout.cycle")}
                </p>

                <p className="mt-1 text-xl font-semibold text-[#4d3a4a]">
                  {cycleDay
                    ? `${t("dietWorkout.day")} ${cycleDay}`
                    : "-"}
                </p>
              </div>

              <div className="rounded-xl bg-[#eee8fa] p-4">
                <p className="text-sm text-[#a17b91]">
                  {t("dietWorkout.sleep")}
                </p>

                <p className="mt-1 text-xl font-semibold text-[#4d3a4a]">
                  {sleep ?? "-"} {t("dietWorkout.hours")}
                </p>
              </div>

              <div className="rounded-xl bg-[#fff1dc] p-4">
                <p className="text-sm text-[#a17b91]">
                  {t("dietWorkout.mood")}
                </p>

                <p className="mt-1 text-xl font-semibold text-[#4d3a4a]">
                  {mood ?? "-"} / 5
                </p>
              </div>

              <div className="rounded-xl bg-[#e8f5ed] p-4">
                <p className="text-sm text-[#a17b91]">
                  {t("dietWorkout.activity")}
                </p>

                <p className="mt-1 text-xl font-semibold capitalize text-[#4d3a4a]">
                  {activity === "low"
                    ? t("dietWorkout.activityLow")
                    : activity === "moderate"
                    ? t("dietWorkout.activityModerate")
                    : activity === "high"
                    ? t("dietWorkout.activityHigh")
                    : healthRecord?.activity_level || "-"}
                </p>
              </div>

            </div>
          )}

        </section>

        {/* DIET */}

        <section className="mb-6 rounded-2xl border border-[#f0dce5] bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f5ed] text-[#5d806c]">
              <Apple className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#332532]">
                {t("dietWorkout.nutritionTitle")}
              </h2>

              <p className="mt-1 text-sm text-[#76566f]">
                {t("dietWorkout.nutritionDescription")}
              </p>
            </div>

          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">

            {dietGuidance.map(
              (item, index) => (
                <div
                  key={index}
                  className="rounded-xl bg-[#fff8fb] p-5"
                >
                  <div className="flex gap-3">
                    <Utensils className="mt-1 h-5 w-5 shrink-0 text-[#a65a78]" />

                    <p className="text-sm leading-6 text-[#5f4a58]">
                      {t(`dietWorkout.${item}`)}
                    </p>
                  </div>
                </div>
              )
            )}

          </div>

        </section>

        {/* HYDRATION */}

        <section className="mb-6 rounded-2xl border border-[#f0dce5] bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eee8fa] text-[#75658f]">
              <Droplets className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#332532]">
                {t("dietWorkout.hydrationTitle")}
              </h2>

              <p className="mt-1 text-sm text-[#76566f]">
                {t("dietWorkout.hydrationDescription")}
              </p>
            </div>

          </div>

          <div className="mt-5 rounded-xl bg-[#faf8fc] p-5">

            <p className="text-sm leading-6 text-[#5f4a58]">
              {t("dietWorkout.hydrationGuidance")}
            </p>

          </div>

        </section>

        {/* WORKOUT */}

        <section className="mb-6 rounded-2xl border border-[#f0dce5] bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fdeaf1] text-[#a65a78]">
              <Dumbbell className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#332532]">
                {t("dietWorkout.movementTitle")}
              </h2>

              <p className="mt-1 text-sm text-[#76566f]">
                {t("dietWorkout.movementDescription")}
              </p>
            </div>

          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">

            {workoutGuidance.map(
              (item, index) => (
                <div
                  key={index}
                  className="rounded-xl bg-[#fff8fb] p-5"
                >
                  <div className="flex gap-3">

                    <Activity className="mt-1 h-5 w-5 shrink-0 text-[#a65a78]" />

                    <p className="text-sm leading-6 text-[#5f4a58]">
                      {t(`dietWorkout.${item}`)}
                    </p>

                  </div>
                </div>
              )
            )}

          </div>

        </section>

        {/* SLEEP & RECOVERY */}

        <section className="mb-6 rounded-2xl border border-[#f0dce5] bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eee8fa] text-[#75658f]">
              <Moon className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#332532]">
                {t("dietWorkout.restTitle")}
              </h2>

              <p className="mt-1 text-sm text-[#76566f]">
                {t("dietWorkout.restDescription")}
              </p>
            </div>

          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">

            <div className="rounded-xl bg-[#fff8fb] p-5">

              <p className="font-medium text-[#4d3a4a]">
                {t("dietWorkout.sleep")}
              </p>

              <p className="mt-2 text-sm leading-6 text-[#76566f]">
                {sleep !== null &&
                sleep !== undefined &&
                sleep < 7
                  ? t("dietWorkout.sleepBelowTarget")
                  : t("dietWorkout.sleepRoutine")}
              </p>

            </div>

            <div className="rounded-xl bg-[#fff8fb] p-5">

              <p className="font-medium text-[#4d3a4a]">
                {t("dietWorkout.recovery")}
              </p>

              <p className="mt-2 text-sm leading-6 text-[#76566f]">
                {t("dietWorkout.recoveryGuidance")}
              </p>

            </div>

          </div>

        </section>

        {/* CULTURAL WELLNESS */}

        <section className="rounded-2xl border border-[#ded3f0] bg-white p-6 shadow-sm">

          <h2 className="text-xl font-semibold text-[#332532]">
            {t("dietWorkout.everydayIdeas")}
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-xl bg-[#f5f0fb] p-4">
              <p className="font-medium text-[#4d3a4a]">
                {t("dietWorkout.homeCookedMeals")}
              </p>

              <p className="mt-2 text-xs leading-5 text-[#76566f]">
                {t("dietWorkout.homeCookedMealsDescription")}
              </p>
            </div>

            <div className="rounded-xl bg-[#fff1dc] p-4">
              <p className="font-medium text-[#4d3a4a]">
                {t("dietWorkout.gentleMovement")}
              </p>

              <p className="mt-2 text-xs leading-5 text-[#76566f]">
                {t("dietWorkout.gentleMovementDescription")}
              </p>
            </div>

            <div className="rounded-xl bg-[#fdeaf1] p-4">
              <p className="font-medium text-[#4d3a4a]">
                {t("dietWorkout.community")}
              </p>

              <p className="mt-2 text-xs leading-5 text-[#76566f]">
                {t("dietWorkout.communityDescription")}
              </p>
            </div>

            <div className="rounded-xl bg-[#e8f5ed] p-4">
              <p className="font-medium text-[#4d3a4a]">
                {t("dietWorkout.selfCare")}
              </p>

              <p className="mt-2 text-xs leading-5 text-[#76566f]">
                {t("dietWorkout.selfCareDescription")}
              </p>
            </div>

          </div>

        </section>

      </div>
    </main>
  );
}