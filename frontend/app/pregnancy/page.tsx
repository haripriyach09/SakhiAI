"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import BrandLogo from "@/components/brand-logo";


interface PregnancyRecord {
  id: number;
  user_id: number;
  pregnancy_status: string;
  pregnancy_week: number | null;
  due_date: string | null;
  postpartum_status: string | null;
  postpartum_week: number | null;
  postpartum_mood: number | null;
  wellbeing_notes: string | null;
  created_at: string | null;
}

export default function PregnancyPage() {
  const { t, language } = useLanguage();

  const locale =
    language === "Kannada"
      ? "kn-IN"
      : language === "Hindi"
      ? "hi-IN"
      : "en-IN";

  const formatDate = (value: string | null) => {
    if (!value) return "-";

    const dateValue = /^\d{4}-\d{2}-\d{2}$/.test(value)
      ? `${value}T00:00:00`
      : value;
    const date = new Date(dateValue);

    return Number.isNaN(date.getTime())
      ? value
      : date.toLocaleDateString(locale);
  };

  const getPregnancyStatusLabel = (status: string) => {
    if (status === "Pregnant") return t("pregnancy.pregnant");
    if (status === "Not Pregnant") return t("pregnancy.notPregnant");
    return status;
  };

  const getPostpartumStatusLabel = (status: string) => {
    if (status === "Postpartum") {
      return t("pregnancy.postpartumStatusValue");
    }
    if (status === "Not Postpartum") {
      return t("pregnancy.notPostpartum");
    }
    return status;
  };

  const getWellbeingNote = (note: string | null) => {
    if (!note) return "";

    if (
      note.trim() ===
      "Feeling well and maintaining regular self-care."
    ) {
      return t("pregnancy.defaultWellbeingNote");
    }

    return note;
  };

  const [record, setRecord] =
    useState<PregnancyRecord | null>(null);

  const [history, setHistory] =
    useState<PregnancyRecord[]>([]);

  const [pregnancyStatus, setPregnancyStatus] =
    useState("Not Pregnant");

  const [pregnancyWeek, setPregnancyWeek] =
    useState("");

  const [dueDate, setDueDate] =
    useState("");

  const [postpartumStatus, setPostpartumStatus] =
    useState("Not Postpartum");

  const [postpartumWeek, setPostpartumWeek] =
    useState("");

  const [postpartumMood, setPostpartumMood] =
    useState("");

  const [wellbeingNotes, setWellbeingNotes] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  // ==========================================
  // LOAD DATA
  // ==========================================

  const loadData = async () => {
    try {
      const token =
        localStorage.getItem("sakhi_token");

      if (!token) {
        setError(t("pregnancy.loginRequired"));
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const latestResponse =
        await api.get(
          "/pregnancy/latest",
          { headers }
        );

      if (
        latestResponse.data.data_available
      ) {
        const latest =
          latestResponse.data.record;

        setRecord(latest);

        setPregnancyStatus(
          latest.pregnancy_status ||
            "Not Pregnant"
        );

        setPregnancyWeek(
          latest.pregnancy_week
            ? String(latest.pregnancy_week)
            : ""
        );

        setDueDate(
          latest.due_date || ""
        );

        setPostpartumStatus(
          latest.postpartum_status ||
            "Not Postpartum"
        );

        setPostpartumWeek(
          latest.postpartum_week
            ? String(latest.postpartum_week)
            : ""
        );

        setPostpartumMood(
          latest.postpartum_mood !== null &&
          latest.postpartum_mood !== undefined
            ? String(latest.postpartum_mood)
            : ""
        );

        setWellbeingNotes(
          latest.wellbeing_notes || ""
        );
      }

      const historyResponse =
        await api.get(
          "/pregnancy/history",
          { headers }
        );

      setHistory(
        historyResponse.data
      );

    } catch {
      setError(
        t("pregnancy.loadError")
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ==========================================
  // SAVE
  // ==========================================

  const saveRecord = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const token =
        localStorage.getItem("sakhi_token");

      if (!token) {
        setError(t("pregnancy.loginRequired"));
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await api.post(
        "/pregnancy/record",
        {
          pregnancy_status:
            pregnancyStatus,

          pregnancy_week:
            pregnancyWeek
              ? Number(pregnancyWeek)
              : null,

          due_date:
            dueDate || null,

          postpartum_status:
            postpartumStatus,

          postpartum_week:
            postpartumWeek
              ? Number(postpartumWeek)
              : null,

          postpartum_mood:
            postpartumMood
              ? Number(postpartumMood)
              : null,

          wellbeing_notes:
            wellbeingNotes || null,
        },
        { headers }
      );

      setMessage(
        t("pregnancy.saveSuccess")
      );

      await loadData();

    } catch {
      setError(
        t("pregnancy.saveError")
      );
    } finally {
      setSaving(false);
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
            {t("pregnancy.loading")}
          </p>

          <p className="mt-2 text-sm text-[#8b7285]">
            {t("pregnancy.loadingDescription")}
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

      <div className="mx-auto max-w-6xl">

        {/* HEADER */}

        <div className="mb-8">

          <BrandLogo className="mb-3 max-w-48" />

          <h1 className="mt-1 text-3xl font-bold text-[#332532]">
            {t("pregnancy.title")}
          </h1>

          <p className="mt-2 max-w-2xl text-[#76566f]">
            {t("pregnancy.description")}
          </p>

        </div>

        {/* ALERTS */}

        {message && (
          <div className="mb-5 rounded-xl border border-[#d8eadf] bg-[#edf8f1] p-4 text-sm text-[#42634d]">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-5 rounded-xl border border-[#f0d5dc] bg-[#fff0f3] p-4 text-sm text-[#8a4d5d]">
            {error}
          </div>
        )}

        {/* CURRENT STATUS */}

        {record && (

          <section className="mb-6 rounded-2xl border border-[#f0dce5] bg-white p-6 shadow-sm">

            <h2 className="text-xl font-semibold text-[#332532]">
              {t("pregnancy.currentStatus")}
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              <div className="rounded-xl bg-[#fdeaf1] p-4">

                <p className="text-sm text-[#a17b91]">
                  {t("pregnancy.pregnancy")}
                </p>

                <p className="mt-1 font-semibold text-[#4d3a4a]">
                  {getPregnancyStatusLabel(record.pregnancy_status)}
                </p>

              </div>

              <div className="rounded-xl bg-[#eee8fa] p-4">

                <p className="text-sm text-[#a17b91]">
                  {t("pregnancy.pregnancyWeek")}
                </p>

                <p className="mt-1 font-semibold text-[#4d3a4a]">
                  {record.pregnancy_week
                    ? `${t("pregnancy.week")} ${record.pregnancy_week}`
                    : "-"}
                </p>

              </div>

              <div className="rounded-xl bg-[#fff1dc] p-4">

                <p className="text-sm text-[#a17b91]">
                  {t("pregnancy.dueDate")}
                </p>

                <p className="mt-1 font-semibold text-[#4d3a4a]">
                  {formatDate(record.due_date)}
                </p>

              </div>

              <div className="rounded-xl bg-[#e8f5ed] p-4">

                <p className="text-sm text-[#a17b91]">
                  {t("pregnancy.postpartum")}
                </p>

                <p className="mt-1 font-semibold text-[#4d3a4a]">
                  {record.postpartum_status
                    ? getPostpartumStatusLabel(record.postpartum_status)
                    : t("pregnancy.notPostpartum")}
                </p>

              </div>

            </div>

          </section>

        )}

        {/* FORM */}

        <form
          onSubmit={saveRecord}
          className="rounded-2xl border border-[#f0dce5] bg-white p-6 shadow-sm"
        >

          <h2 className="text-xl font-semibold text-[#332532]">
            {t("pregnancy.title")}
          </h2>

          <p className="mt-2 text-sm text-[#76566f]">
            {t("pregnancy.updateMessage")}
          </p>

          {/* PREGNANCY */}

          <div className="mt-6">

            <h3 className="font-semibold text-[#4d3a4a]">
              {t("pregnancy.pregnancy")}
            </h3>

            <div className="mt-4 grid gap-5 sm:grid-cols-3">

              <div>

                <label className="text-sm text-[#76566f]">
                  {t("pregnancy.pregnancy")}
                </label>

                <select
                  value={pregnancyStatus}
                  onChange={(e) =>
                    setPregnancyStatus(
                      e.target.value
                    )
                  }
                  className="mt-2 w-full rounded-xl border border-[#ead9e2] bg-white px-4 py-3 text-sm outline-none focus:border-[#c7869e]"
                >
                  <option value="Not Pregnant">
                    {t("pregnancy.notPregnant")}
                  </option>

                  <option value="Pregnant">
                    {t("pregnancy.pregnant")}
                  </option>
                </select>

              </div>

              <div>

                <label className="text-sm text-[#76566f]">
                  {t("pregnancy.pregnancyWeek")}
                </label>

                <input
                  type="number"
                  min="1"
                  max="45"
                  value={pregnancyWeek}
                  onChange={(e) =>
                    setPregnancyWeek(
                      e.target.value
                    )
                  }
                  placeholder={t("pregnancy.pregnancyWeekPlaceholder")}
                  disabled={
                    pregnancyStatus !==
                    "Pregnant"
                  }
                  className="mt-2 w-full rounded-xl border border-[#ead9e2] bg-white px-4 py-3 text-sm outline-none focus:border-[#c7869e] disabled:bg-[#faf7f9]"
                />

              </div>

              <div>

                <label className="text-sm text-[#76566f]">
                  {t("pregnancy.dueDate")}
                </label>

                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) =>
                    setDueDate(
                      e.target.value
                    )
                  }
                  disabled={
                    pregnancyStatus !==
                    "Pregnant"
                  }
                  className="mt-2 w-full rounded-xl border border-[#ead9e2] bg-white px-4 py-3 text-sm outline-none focus:border-[#c7869e] disabled:bg-[#faf7f9]"
                />

              </div>

            </div>

          </div>

          {/* POSTPARTUM */}

          <div className="mt-8 border-t border-[#f3e5eb] pt-6">

            <h3 className="font-semibold text-[#4d3a4a]">
              {t("pregnancy.postpartumLabel")}
            </h3>

            <div className="mt-4 grid gap-5 sm:grid-cols-3">

              <div>

                <label className="text-sm text-[#76566f]">
                  {t("pregnancy.postpartumStatus")}
                </label>

                <select
                  value={postpartumStatus}
                  onChange={(e) =>
                    setPostpartumStatus(
                      e.target.value
                    )
                  }
                  className="mt-2 w-full rounded-xl border border-[#ead9e2] bg-white px-4 py-3 text-sm outline-none focus:border-[#c7869e]"
                >
                  <option value="Not Postpartum">
                    {t("pregnancy.notPostpartum")}
                  </option>

                  <option value="Postpartum">
                    {t("pregnancy.postpartumStatusValue")}
                  </option>
                </select>

              </div>

              <div>

                <label className="text-sm text-[#76566f]">
                  {t("pregnancy.postpartumWeek")}
                </label>

                <input
                  type="number"
                  min="1"
                  max="52"
                  value={postpartumWeek}
                  onChange={(e) =>
                    setPostpartumWeek(
                      e.target.value
                    )
                  }
                  placeholder={t("pregnancy.postpartumWeekPlaceholder")}
                  disabled={
                    postpartumStatus !==
                    "Postpartum"
                  }
                  className="mt-2 w-full rounded-xl border border-[#ead9e2] bg-white px-4 py-3 text-sm outline-none focus:border-[#c7869e] disabled:bg-[#faf7f9]"
                />

              </div>

              <div>

                <label className="text-sm text-[#76566f]">
                  {t("pregnancy.postpartumMood")}
                </label>

                <select
                  value={postpartumMood}
                  onChange={(e) =>
                    setPostpartumMood(
                      e.target.value
                    )
                  }
                  disabled={
                    postpartumStatus !==
                    "Postpartum"
                  }
                  className="mt-2 w-full rounded-xl border border-[#ead9e2] bg-white px-4 py-3 text-sm outline-none focus:border-[#c7869e] disabled:bg-[#faf7f9]"
                >
                  <option value="">
                    {t("pregnancy.selectMood")}
                  </option>

                  <option value="1">
                    1 — {t("pregnancy.veryLow")}
                  </option>

                  <option value="2">
                    2 — {t("pregnancy.lowMood")}
                  </option>

                  <option value="3">
                    3 — {t("pregnancy.neutral")}
                  </option>

                  <option value="4">
                    4 — {t("pregnancy.good")}
                  </option>

                  <option value="5">
                    5 — {t("pregnancy.veryGood")}
                  </option>
                </select>

              </div>

            </div>

          </div>

          {/* NOTES */}

          <div className="mt-8 border-t border-[#f3e5eb] pt-6">

            <label className="font-semibold text-[#4d3a4a]">
              {t("pregnancy.wellbeingNotes")}
            </label>

            <textarea
              value={wellbeingNotes}
              onChange={(e) =>
                setWellbeingNotes(
                  e.target.value
                )
              }
              rows={4}
              placeholder={t("pregnancy.wellbeingNotesPlaceholder")}
              className="mt-3 w-full resize-none rounded-xl border border-[#ead9e2] bg-white px-4 py-3 text-sm text-[#4d3a4a] outline-none focus:border-[#c7869e]"
            />

          </div>

          <button
            type="submit"
            disabled={saving}
            className="mt-6 rounded-xl bg-[#a65a78] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#914c69] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving
              ? t("pregnancy.saving")
              : t("pregnancy.saveInformation")}
          </button>

        </form>

        {/* HISTORY */}

        <section className="mt-6 rounded-2xl border border-[#f0dce5] bg-white p-6 shadow-sm">

          <h2 className="text-xl font-semibold text-[#332532]">
            {t("pregnancy.historyTitle")}
          </h2>

          <p className="mt-2 text-sm text-[#76566f]">
            {t("pregnancy.historyDescription")}
          </p>

          {history.length > 0 ? (

            <div className="mt-5 space-y-3">

              {history.map((item) => (

                <div
                  key={item.id}
                  className="rounded-xl bg-[#fff8fb] p-4"
                >

                  <div className="flex flex-wrap items-center justify-between gap-3">

                    <div>

                      <p className="font-medium text-[#4d3a4a]">
                        {getPregnancyStatusLabel(item.pregnancy_status)}
                      </p>

                      <p className="mt-1 text-xs text-[#8b7285]">
                        {formatDate(item.created_at)}
                      </p>

                    </div>

                    {item.pregnancy_week && (
                      <span className="rounded-full bg-[#eee8fa] px-3 py-1 text-xs font-medium text-[#76566f]">
                        {t("pregnancy.week")} {item.pregnancy_week}
                      </span>
                    )}

                  </div>

                  {item.postpartum_status &&
                    item.postpartum_status !==
                      "Not Postpartum" && (

                    <p className="mt-3 text-sm text-[#76566f]">
                      {t("pregnancy.postpartumLabel")}:{" "}
                      {getPostpartumStatusLabel(item.postpartum_status)}
                      {item.postpartum_week
                        ? ` — ${t("pregnancy.week")} ${item.postpartum_week}`
                        : ""}
                    </p>

                  )}

                  {item.wellbeing_notes && (
                    <p className="mt-2 text-sm leading-6 text-[#76566f]">
                      {getWellbeingNote(item.wellbeing_notes)}
                    </p>
                  )}

                </div>

              ))}

            </div>

          ) : (

            <div className="mt-5 rounded-xl bg-[#faf8fc] p-6 text-center">

              <p className="font-medium text-[#4d3a4a]">
                {t("pregnancy.noRecords")}
              </p>

              <p className="mt-2 text-sm text-[#76566f]">
                {t("pregnancy.noRecordsDescription")}
              </p>

            </div>

          )}

        </section>

        {/* GUIDANCE */}

        <section className="mt-6 rounded-2xl border border-[#ded3f0] bg-white p-6 shadow-sm">

          <h2 className="text-xl font-semibold text-[#332532]">
            {t("pregnancy.wellbeingGuidance")}
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">

            <div className="rounded-xl bg-[#f5f0fb] p-4">

              <p className="font-medium text-[#4d3a4a]">
                {t("pregnancy.gentleSelfCare")}
              </p>

              <p className="mt-2 text-sm leading-6 text-[#76566f]">
                {t("pregnancy.gentleSelfCareDescription")}
              </p>

            </div>

            <div className="rounded-xl bg-[#fdeaf1] p-4">

              <p className="font-medium text-[#4d3a4a]">
                {t("pregnancy.stayConnected")}
              </p>

              <p className="mt-2 text-sm leading-6 text-[#76566f]">
                {t("pregnancy.stayConnectedDescription")}
              </p>

            </div>

          </div>

        </section>

        {/* DISCLAIMER */}

        <div className="mt-6 rounded-xl border border-[#eadff0] bg-[#faf8fc] p-4">

          <p className="text-xs leading-5 text-[#8b7285]">
            {t("pregnancy.disclaimer")}
          </p>

        </div>

      </div>

    </main>
  );
}
