"use client";

import { startTransition, useCallback, useEffect, useState } from "react";
import { isAxiosError } from "axios";
import Link from "next/link";
import { api } from "@/lib/api";
import BrandLogo from "@/components/brand-logo";
import LanguageSelector from "@/components/language-selector";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

interface Consultation {
  id: number;
  user_id: number;
  patient_name?: string | null;
  doctor_id: number;
  reason: string | null;
  status: string;
  doctor_notes?: string | null;
  created_at: string;
}

type FilterStatus =
  | "All"
  | "Pending"
  | "Accepted"
  | "Completed"
  | "Cancelled";

export default function DoctorConsultationsPage() {
  const { t, language } = useLanguage();
  const [requests, setRequests] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [expandedReasons, setExpandedReasons] = useState<number[]>([]);

  const [filter, setFilter] =
    useState<FilterStatus>("All");

  const [selectedRequest, setSelectedRequest] =
    useState<Consultation | null>(null);

  const [doctorNotes, setDoctorNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);

  /* ============================================================
     LOAD CONSULTATION REQUESTS
  ============================================================ */

  const loadRequests = useCallback(async (showLoading = true) => {
    try {
      if (showLoading) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }
      setError("");

      const response = await api.get(
        "/consultation/doctor-requests"
      );

      if (!Array.isArray(response.data)) {
        throw new Error("Unexpected consultation response.");
      }
      setRequests(response.data);

    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.status === 401) {

        setError(
          t("doctorDashboard.authError")
        );

      } else if (isAxiosError(error) && error.response?.status === 403) {

        setError(
          t("doctorDashboard.accessError")
        );

      } else {

        setError(
          t("doctorDashboard.loadError")
        );
      }

    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [t]);

  useEffect(() => {
    startTransition(() => {
      void loadRequests();
    });
  }, [loadRequests]);

  /* ============================================================
     UPDATE STATUS
  ============================================================ */

  const updateStatus = async (
    consultationId: number,
    status: string
  ) => {
    setUpdatingId(consultationId);
    setFeedback("");
    try {

      await api.put(
        `/consultation/doctor/${consultationId}/status`,
        {
          status,
        }
      );

      setRequests((current) =>
        current.map((request) =>
          request.id === consultationId
            ? { ...request, status }
            : request
        )
      );
      setFeedback(t("doctorDashboard.statusUpdated"));
      await loadRequests(false);

    } catch {
      setFeedback(t("doctorDashboard.statusUpdateError"));
    } finally {
      setUpdatingId(null);
    }
  };

  /* ============================================================
     SAVE DOCTOR NOTES
  ============================================================ */

  const saveDoctorNotes = async () => {

    if (!selectedRequest) {
      return;
    }

    try {

      setSavingNotes(true);

      await api.put(
        `/consultation/doctor/${selectedRequest.id}/notes`,
        {
          doctor_notes: doctorNotes,
        }
      );

      setFeedback(t("doctorDashboard.notesSaved"));

      await loadRequests(false);

      setSelectedRequest({
        ...selectedRequest,
        doctor_notes: doctorNotes,
      });

    } catch {
      setFeedback(t("doctorDashboard.notesSaveError"));

    } finally {

      setSavingNotes(false);
    }
  };

  /* ============================================================
     STATISTICS
  ============================================================ */

  const pendingCount =
    requests.filter(
      (request) =>
        request.status === "Pending"
    ).length;

  const acceptedCount =
    requests.filter(
      (request) =>
        request.status === "Accepted"
    ).length;

  const completedCount =
    requests.filter(
      (request) =>
        request.status === "Completed"
    ).length;

  const cancelledCount =
    requests.filter(
      (request) =>
        request.status === "Cancelled"
    ).length;

  /* ============================================================
     FILTER
  ============================================================ */

  const filteredRequests =
    filter === "All"
      ? requests
      : requests.filter(
          (request) =>
            request.status === filter
        );

  /* ============================================================
     STATUS COLORS
  ============================================================ */

  const getStatusClass = (
    status: string
  ) => {

    switch (status) {

      case "Pending":
        return "bg-yellow-100 text-yellow-800";

      case "Accepted":
        return "bg-blue-100 text-blue-800";

      case "Completed":
        return "bg-green-100 text-green-800";

      case "Cancelled":
        return "bg-red-100 text-red-800";

      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const statusLabels: Record<FilterStatus, string> = {
    All: t("doctorDashboard.all"),
    Pending: t("doctorDashboard.pending"),
    Accepted: t("doctorDashboard.accepted"),
    Completed: t("doctorDashboard.completed"),
    Cancelled: t("doctorDashboard.cancelled"),
  };
  const displayStatus = (status: string) =>
    status in statusLabels
      ? statusLabels[status as FilterStatus]
      : status;
  const formatDate = (value: string) =>
    new Date(value).toLocaleString(
      language === "Kannada" ? "kn-IN" : language === "Hindi" ? "hi-IN" : "en-US"
    );
  const toggleReason = (requestId: number) => {
    setExpandedReasons((current) =>
      current.includes(requestId)
        ? current.filter((id) => id !== requestId)
        : [...current, requestId]
    );
  };

  /* ============================================================
     PAGE
  ============================================================ */

  return (

    <main className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <BrandLogo className="mb-4 w-full max-w-56" />
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {t("doctorDashboard.title")}
            </h1>
            <p className="mt-2 max-w-2xl text-gray-500">
              {t("doctorDashboard.subtitle")}
            </p>
          </div>
          <LanguageSelector className="w-full sm:w-auto" />
        </div>

        {/* LOADING */}

        {loading && (

          <div className="bg-white rounded-xl p-8 text-center shadow-sm">

            <p className="text-gray-500">
              {t("doctorDashboard.loading")}
            </p>

          </div>
        )}

        {/* ERROR */}

        {!loading && error && requests.length === 0 && (

          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-5">

            <p className="font-medium">
              {error}
            </p>

            <button
              onClick={() => void loadRequests()}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              {t("doctorDashboard.tryAgain")}
            </button>

          </div>
        )}

        {!loading && (!error || requests.length > 0) && (

          <>

            {/* ==================================================
                STATISTICS
            ================================================== */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

              <button
                onClick={() =>
                  setFilter("Pending")
                }
                className={`min-h-32 rounded-xl border bg-white p-5 text-left shadow-sm transition hover:shadow-md ${filter === "Pending" ? "border-blue-500" : "border-gray-200"}`}
              >

                <p className="text-sm font-medium text-gray-500">
                  {t("doctorDashboard.pending")}
                </p>

                <p className="text-3xl font-bold text-yellow-600 mt-2">
                  {pendingCount}
                </p>

                <p className="text-sm text-gray-400 mt-1">
                  {t("doctorDashboard.awaitingResponse")}
                </p>

              </button>

              <button
                onClick={() =>
                  setFilter("Accepted")
                }
                className={`min-h-32 rounded-xl border bg-white p-5 text-left shadow-sm transition hover:shadow-md ${filter === "Accepted" ? "border-blue-500" : "border-gray-200"}`}
              >

                <p className="text-sm font-medium text-gray-500">
                  {t("doctorDashboard.accepted")}
                </p>

                <p className="text-3xl font-bold text-blue-600 mt-2">
                  {acceptedCount}
                </p>

                <p className="text-sm text-gray-400 mt-1">
                  {t("doctorDashboard.activeConsultations")}
                </p>

              </button>

              <button
                onClick={() =>
                  setFilter("Completed")
                }
                className={`min-h-32 rounded-xl border bg-white p-5 text-left shadow-sm transition hover:shadow-md ${filter === "Completed" ? "border-blue-500" : "border-gray-200"}`}
              >

                <p className="text-sm font-medium text-gray-500">
                  {t("doctorDashboard.completed")}
                </p>

                <p className="text-3xl font-bold text-green-600 mt-2">
                  {completedCount}
                </p>

                <p className="text-sm text-gray-400 mt-1">
                  {t("doctorDashboard.finishedConsultations")}
                </p>

              </button>

              <button
                onClick={() =>
                  setFilter("Cancelled")
                }
                className={`min-h-32 rounded-xl border bg-white p-5 text-left shadow-sm transition hover:shadow-md ${filter === "Cancelled" ? "border-blue-500" : "border-gray-200"}`}
              >

                <p className="text-sm font-medium text-gray-500">
                  {t("doctorDashboard.cancelled")}
                </p>

                <p className="text-3xl font-bold text-red-600 mt-2">
                  {cancelledCount}
                </p>

                <p className="text-sm text-gray-400 mt-1">
                  {t("doctorDashboard.declinedRequests")}
                </p>

              </button>

            </div>

            {/* ==================================================
                FILTERS
            ================================================== */}

            <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">

              <div className="flex flex-wrap gap-3">

                {(
                  [
                    "All",
                    "Pending",
                    "Accepted",
                    "Completed",
                    "Cancelled",
                  ] as FilterStatus[]
                ).map((status) => {

                  const isActive =
                    filter === status;

                  return (

                    <button
                      key={status}
                      onClick={() =>
                        setFilter(status)
                      }
                      className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      aria-pressed={isActive}
                    >
                      {statusLabels[status]}
                    </button>

                  );
                })}

              </div>

            </div>

            {/* ==================================================
                REQUEST HEADER
            ================================================== */}

            <div className="flex items-center justify-between mb-4">

              <div>

                <h2 className="text-xl font-semibold text-gray-900">
                  {t("doctorDashboard.consultationRequests")}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {filteredRequests.length} {t(filteredRequests.length === 1
                    ? "doctorDashboard.consultationCountSingular"
                    : "doctorDashboard.consultationCount")}
                  {filter !== "All" &&
                    ` • ${statusLabels[filter]}`}
                </p>

              </div>

              <button
                onClick={() => void loadRequests(false)}
                disabled={refreshing}
                className="shrink-0 rounded-lg border bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-wait disabled:opacity-60"
              >
                {refreshing ? t("doctorDashboard.refreshing") : t("doctorDashboard.refresh")}
              </button>

            </div>

            <div className="mb-4 flex justify-end">
              <Link
                href="/doctor/consultations"
                className="text-sm font-semibold text-blue-700 underline-offset-4 hover:underline"
              >
                {t("doctorDashboard.reportWorkspace")}
              </Link>
            </div>

            {/* ==================================================
                EMPTY
            ================================================== */}

            {error && requests.length > 0 && (
              <div role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            {feedback && (
              <div role="status" className="mb-4 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
                {feedback}
              </div>
            )}

            {filteredRequests.length === 0 && (

              <div className="bg-white rounded-xl p-10 text-center shadow-sm border">

                <div className="text-5xl mb-4">
                  📋
                </div>

                <h2 className="text-xl font-semibold text-gray-800">
                  {filter === "All"
                    ? t("doctorDashboard.noConsultations")
                    : `${statusLabels[filter]} — ${t("doctorDashboard.noFilteredConsultations")}`}
                </h2>

                <p className="text-gray-500 mt-2">
                  {filter === "All"
                    ? t("doctorDashboard.requestsEmptyHelp")
                    : t("doctorDashboard.noFilteredConsultations")}
                </p>

              </div>
            )}

            {/* ==================================================
                REQUESTS
            ================================================== */}

            {filteredRequests.length > 0 && (

              <div className="space-y-5">

                {filteredRequests.map(
                  (request) => (

                    <div
                      key={request.id}
                      className="min-w-0 rounded-xl border bg-white p-4 shadow-sm sm:p-6"
                    >

                      {/* TOP */}

                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                        <div className="min-w-0">

                          <h2 className="text-xl font-semibold text-gray-900">
                            {t("doctorDashboard.consultation")} #
                            {request.id}
                          </h2>

                          <p className="mt-1 break-words text-sm font-medium text-gray-700">
                            {request.patient_name?.trim() || t("doctorDashboard.unknownPatient")}
                          </p>

                          <p className="text-sm text-gray-500">
                            {t("doctorDashboard.patientId")}:{" "}
                            {request.user_id}
                          </p>

                          <p className="text-sm text-gray-500">
                            {t("doctorDashboard.requestedOn")}:{" "}
                            {formatDate(request.created_at)}
                          </p>

                        </div>

                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusClass(
                            request.status
                          )}`}
                        >
                          {displayStatus(request.status)}
                        </span>

                      </div>

                      {/* PATIENT REASON */}

                      <div className="mt-5 bg-gray-50 rounded-lg p-4">

                        <h3 className="font-semibold text-gray-700">
                          {t("doctorDashboard.patientsReason")}
                        </h3>

                        <p className={`mt-2 whitespace-pre-wrap break-words text-gray-600 ${expandedReasons.includes(request.id) ? "" : "line-clamp-3"}`}>
                          {request.reason?.trim() || t("doctorDashboard.reasonUnavailable")}
                        </p>
                        {((request.reason?.length ?? 0) > 180 ||
                          (request.reason?.split(/\r?\n/).length ?? 0) > 3) && (
                          <button
                            type="button"
                            onClick={() => toggleReason(request.id)}
                            className="mt-2 text-sm font-semibold text-blue-700 hover:underline"
                            aria-expanded={expandedReasons.includes(request.id)}
                          >
                            {expandedReasons.includes(request.id)
                              ? t("doctorDashboard.hideFullReason")
                              : t("doctorDashboard.showFullReason")}
                          </button>
                        )}

                      </div>

                      {/* VIEW DETAILS */}

                      <div className="mt-5">

                        <button
                          onClick={() => {

                            setSelectedRequest(
                              request
                            );

                            setDoctorNotes(
                              request.doctor_notes ||
                              ""
                            );

                          }}
                          className="rounded-lg bg-gray-800 px-5 py-2 text-white hover:bg-gray-900"
                        >
                          {t("doctorDashboard.viewDetails")}
                        </button>

                      </div>

                      {/* PENDING ACTIONS */}

                      {request.status ===
                        "Pending" && (

                        <div className="mt-5 flex flex-wrap gap-3">

                          <button
                            onClick={() => void updateStatus(request.id, "Accepted")}
                            disabled={updatingId !== null}
                            className="rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700 disabled:cursor-wait disabled:opacity-60"
                          >
                            {updatingId === request.id ? t("doctorDashboard.accepting") : t("doctorDashboard.acceptRequest")}
                          </button>

                          <button
                            onClick={() => void updateStatus(request.id, "Cancelled")}
                            disabled={updatingId !== null}
                            className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700 disabled:cursor-wait disabled:opacity-60"
                          >
                            {updatingId === request.id ? t("doctorDashboard.declining") : t("doctorDashboard.declineRequest")}
                          </button>

                        </div>

                      )}

                      {/* ACCEPTED */}

                      {request.status ===
                        "Accepted" && (

                        <div className="mt-5">

                          <button
                            onClick={() => void updateStatus(request.id, "Completed")}
                            disabled={updatingId !== null}
                            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:cursor-wait disabled:opacity-60"
                          >
                            {updatingId === request.id ? t("doctorDashboard.completing") : t("doctorDashboard.markCompleted")}
                          </button>

                        </div>

                      )}

                      {/* COMPLETED */}

                      {request.status ===
                        "Completed" && (

                        <div className="mt-5 bg-green-50 text-green-700 rounded-lg p-3">
                          {t("doctorDashboard.consultationCompleted")}
                        </div>

                      )}

                      {/* CANCELLED */}

                      {request.status ===
                        "Cancelled" && (

                        <div className="mt-5 bg-red-50 text-red-700 rounded-lg p-3">
                          {t("doctorDashboard.consultationDeclined")}
                        </div>

                      )}

                    </div>

                  )
                )}

              </div>

            )}

          </>

        )}

      </div>

      {/* ========================================================
          CONSULTATION DETAILS MODAL
      ======================================================== */}

      {selectedRequest && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 sm:p-4">

          <div role="dialog" aria-modal="true" aria-labelledby="consultation-details-title" className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between p-6 border-b">

              <div>

                <h2 id="consultation-details-title" className="text-xl font-bold text-gray-900 sm:text-2xl">
                  {t("doctorDashboard.detailsTitle")}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {t("doctorDashboard.consultation")} #
                  {selectedRequest.id}
                </p>

              </div>

              <button
                onClick={() => {

                  setSelectedRequest(
                    null
                  );

                  setDoctorNotes("");

                }}
                aria-label={t("doctorDashboard.close")}
                className="text-2xl text-gray-500 hover:text-gray-800"
              >
                ×
              </button>

            </div>

            {/* MODAL CONTENT */}

            <div className="p-6 space-y-6">

              {/* PATIENT INFORMATION */}

              <div>

                <h3 className="mb-3 text-lg font-semibold text-gray-800">
                  {t("doctorDashboard.patientInformation")}
                </h3>

                <div className="bg-gray-50 rounded-xl p-4">

                  <p className="text-sm text-gray-500">
                    {t("doctorDashboard.patient")}
                  </p>

                  <p className="break-words text-lg font-semibold text-gray-900">
                    {selectedRequest.patient_name?.trim() || t("doctorDashboard.unknownPatient")}
                  </p>

                  <p className="text-sm text-gray-500">
                    {t("doctorDashboard.patientId")}
                  </p>

                  <p className="text-lg font-semibold text-gray-900">
                    {selectedRequest.user_id}
                  </p>

                </div>

              </div>

              {/* CONSULTATION INFORMATION */}

              <div>

                <h3 className="mb-3 text-lg font-semibold text-gray-800">
                  {t("doctorDashboard.consultationInformation")}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div className="bg-gray-50 rounded-xl p-4">

                    <p className="text-sm text-gray-500">
                      {t("doctorDashboard.consultation")} ID
                    </p>

                    <p className="font-semibold text-gray-900 mt-1">
                      #{selectedRequest.id}
                    </p>

                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">

                    <p className="text-sm text-gray-500">
                      {t("doctorDashboard.doctorId")}
                    </p>

                    <p className="font-semibold text-gray-900 mt-1">
                      {selectedRequest.doctor_id}
                    </p>

                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">

                    <p className="text-sm text-gray-500">
                      {t("doctorDashboard.status")}
                    </p>

                    <span
                      className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-semibold ${getStatusClass(
                        selectedRequest.status
                      )}`}
                    >
                      {displayStatus(selectedRequest.status)}
                    </span>

                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">

                    <p className="text-sm text-gray-500">
                      {t("doctorDashboard.requestedDate")}
                    </p>

                    <p className="font-semibold text-gray-900 mt-1">
                      {formatDate(selectedRequest.created_at)}
                    </p>

                  </div>

                </div>

              </div>

              {/* PATIENT REASON */}

              <div>

                <h3 className="mb-3 text-lg font-semibold text-gray-800">
                  {t("doctorDashboard.patientsReason")}
                </h3>

                <div className="bg-gray-50 rounded-xl p-4">

                  <p className="whitespace-pre-wrap break-words text-gray-700 leading-relaxed">
                    {selectedRequest.reason?.trim() || t("doctorDashboard.reasonUnavailable")}
                  </p>

                </div>

              </div>
              
              {/* DOCTOR NOTES */}

              <div>

                <h3 className="mb-3 text-lg font-semibold text-gray-800">
                  {t("doctorDashboard.doctorNotes")}
                </h3>

                <textarea
                  value={doctorNotes}
                  onChange={(e) =>
                    setDoctorNotes(e.target.value)
                  }
                  placeholder={t("doctorDashboard.notesPlaceholder")}
                  rows={6}
                  className="w-full border border-gray-300 rounded-xl p-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="mt-3 flex justify-end">

                  <button
                    onClick={saveDoctorNotes}
                    disabled={savingNotes}
                    className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {savingNotes
                      ? t("doctorDashboard.saving")
                      : t("doctorDashboard.saveNotes")}
                  </button>

                </div>

              </div>

            </div>

            {/* MODAL FOOTER */}

            <div className="p-6 border-t flex justify-end">

              <button
                onClick={() => {

                  setSelectedRequest(
                    null
                  );

                  setDoctorNotes("");

                }}
                className="rounded-lg bg-gray-800 px-5 py-2 text-white hover:bg-gray-900"
              >
                {t("doctorDashboard.closeDetails")}
              </button>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}