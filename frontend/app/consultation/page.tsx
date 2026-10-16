"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

interface Doctor {
  id: number;
  full_name: string;
  email: string;
  specialization: string;
  hospital: string | null;
  experience_years: number | null;
  phone: string | null;
  bio: string | null;
}

interface Consultation {
  id: number;
  user_id: number;
  doctor_id: number;
  reason: string;
  status: string;
  doctor_notes: string | null;
  created_at: string | null;
}

export default function ConsultationPage() {
  const { language, t } = useLanguage();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [requests, setRequests] = useState<Consultation[]>([]);

  const [selectedDoctor, setSelectedDoctor] =
    useState<Doctor | null>(null);

  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");

  const dateLocale =
    language === "Kannada"
      ? "kn-IN"
      : language === "Hindi"
        ? "hi-IN"
        : "en-US";

  const getStatusLabel = (status: string) => {
    const statusKeys: Record<string, string> = {
      Pending: "consultation.pending",
      Accepted: "consultation.accepted",
      Completed: "consultation.completed",
      Cancelled: "consultation.cancelled",
    };

    const key = statusKeys[status];
    return key ? t(key) : status;
  };

  const getRequestError = (error: unknown, fallback: string) => {
    const detail =
      typeof error === "object" && error !== null && "response" in error
        ? (error as { response?: { data?: { detail?: unknown } } }).response?.data?.detail
        : undefined;

    if (detail === "Doctor not found") {
      return t("consultation.doctorNotFound");
    }

    if (detail === "Consultation not found" || detail === "Consultation request not found") {
      return t("consultation.consultationNotFound");
    }

    if (detail === "Only pending consultations can be cancelled") {
      return t("consultation.requestNoLongerPending");
    }

    return fallback;
  };

  const formatRequestedDate = (value: string) =>
    new Date(value).toLocaleString(dateLocale);

  const loadData = async () => {
    try {
      setMessage("");

      const token = localStorage.getItem("sakhi_token");

      if (!token) {
        setMessage(t("consultation.loginRequired"));
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Load available doctors.
      try {
        const doctorResponse = await api.get(
          "/doctor/list",
          { headers }
        );

        setDoctors(doctorResponse.data);
      } catch {
        setMessage(t("consultation.loadDoctorsError"));
        return;
      }

      // Load the patient's consultation requests and doctor's notes.
      try {
        const requestResponse = await api.get(
          "/consultation/my-requests",
          { headers }
        );

        setRequests(requestResponse.data);
      } catch {
        setMessage(t("consultation.loadRequestsError"));
      }
    } catch {
      setMessage(t("consultation.loadInfoError"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const sendRequest = async () => {
    if (!selectedDoctor) {
      return;
    }

    if (!reason.trim()) {
      setMessage(t("consultation.reasonRequired"));
      return;
    }

    try {
      setSending(true);
      setMessage("");

      const token = localStorage.getItem("sakhi_token");

      if (!token) {
        setMessage(t("consultation.loginRequired"));
        return;
      }

      await api.post(
        "/consultation/request",
        {
          doctor_id: selectedDoctor.id,
          reason: reason.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(
        t("consultation.requestSent").replace(
          "{doctor}",
          selectedDoctor.full_name
        )
      );

      setSelectedDoctor(null);
      setReason("");

      await loadData();
    } catch (error: unknown) {
      setMessage(
        getRequestError(error, t("consultation.sendError"))
      );
    } finally {
      setSending(false);
    }
  };

  const cancelRequest = async (id: number) => {
    try {
      const token = localStorage.getItem("sakhi_token");

      if (!token) {
        setMessage(t("consultation.loginRequired"));
        return;
      }

      await api.put(
        `/consultation/${id}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(t("consultation.cancelSuccess"));

      await loadData();
    } catch (error: unknown) {
      setMessage(
        getRequestError(error, t("consultation.cancelError"))
      );
    }
  };

  const getDoctorName = (doctorId: number) => {
    const doctor = doctors.find(
      (item) => item.id === doctorId
    );

    return doctor?.full_name ||
      t("consultation.doctorNumber").replace("{id}", String(doctorId));
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fffafd] p-8">
        <div className="rounded-2xl border border-[#f0dce5] bg-white p-10 text-center text-[#76566f]">
          {t("consultation.loading")}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fffafd] p-8">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}

        <div className="mb-8">
          <p className="text-sm font-medium text-[#a65a78]">
            {t("consultation.brand")}
          </p>

          <h1 className="mt-1 text-3xl font-bold text-[#332532]">
            {t("consultation.title")}
          </h1>

          <p className="mt-2 text-[#76566f]">
            {t("consultation.subtitle")}
          </p>
        </div>

        {/* MESSAGE */}

        {message && (
          <div className="mb-6 rounded-xl border border-[#f0dce5] bg-[#fdeaf1] px-4 py-3 text-sm text-[#76566f]">
            {message}
          </div>
        )}

        {/* AVAILABLE DOCTORS */}

        <section>
          <h2 className="mb-4 text-xl font-semibold text-[#332532]">
            {t("consultation.availableDoctors")}
          </h2>

          {doctors.length === 0 ? (
            <div className="rounded-2xl border border-[#f0dce5] bg-white p-8 text-center text-[#76566f]">
              {t("consultation.noDoctors")}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="rounded-2xl border border-[#f0dce5] bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#fdeaf1] text-2xl">
                      🩺
                    </div>

                    <div>
                      <h3 className="font-semibold text-[#332532]">
                        {doctor.full_name}
                      </h3>

                      <p className="text-sm text-[#a65a78]">
                        {doctor.specialization}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-2 text-sm text-[#76566f]">
                    {doctor.hospital && (
                      <p>
                        <strong>{t("consultation.hospital")}</strong>{" "}
                        {doctor.hospital}
                      </p>
                    )}

                    {doctor.experience_years !== null && (
                      <p>
                        <strong>{t("consultation.experience")}</strong>{" "}
                        {t("consultation.years").replace(
                          "{count}",
                          String(doctor.experience_years)
                        )}
                      </p>
                    )}

                    {doctor.bio && (
                      <p className="leading-6">
                        {doctor.bio}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDoctor(doctor);
                      setReason("");
                      setMessage("");
                    }}
                    className="mt-6 w-full rounded-xl bg-[#b76e8c] px-4 py-3 text-sm font-semibold text-white hover:bg-[#a85f7d]"
                  >
                    {t("consultation.requestConsultation")}
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* MY CONSULTATION REQUESTS */}

        <section className="mt-12">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-[#332532]">
                {t("consultation.myRequests")}
              </h2>

              <p className="mt-1 text-sm text-[#76566f]">
                {t("consultation.myRequestsDescription")}
              </p>
            </div>

            <button
              type="button"
              onClick={loadData}
              className="rounded-lg border border-[#eadce5] bg-white px-4 py-2 text-sm text-[#76566f]"
            >
              {t("consultation.refresh")}
            </button>
          </div>

          {requests.length === 0 ? (
            <div className="rounded-2xl border border-[#f0dce5] bg-white p-8 text-center">
              <p className="font-medium text-[#4d3a4a]">
                {t("consultation.noRequests")}
              </p>

              <p className="mt-1 text-sm text-[#8b7285]">
                {t("consultation.noRequestsDescription")}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="rounded-2xl border border-[#f0dce5] bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-semibold text-[#332532]">
                        {getDoctorName(request.doctor_id)}
                      </h3>

                      <p className="mt-2 text-sm text-[#76566f]">
                        {request.reason}
                      </p>

                      {request.created_at && (
                        <p className="mt-2 text-xs text-[#a17b91]">
                          {t("consultation.requested")}{" "}
                          {formatRequestedDate(request.created_at)}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          request.status === "Pending"
                            ? "bg-yellow-50 text-yellow-700"
                            : request.status === "Accepted"
                            ? "bg-blue-50 text-blue-700"
                            : request.status === "Completed"
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {getStatusLabel(request.status)}
                      </span>

                      {request.status === "Pending" && (
                        <button
                          type="button"
                          onClick={() =>
                            cancelRequest(request.id)
                          }
                          className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-500 hover:bg-red-50"
                        >
                          {t("consultation.cancel")}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* DOCTOR'S NOTES */}

                  {request.doctor_notes?.trim() && (
                    <div className="mt-5 rounded-xl border border-[#dcebdd] bg-[#f3faf3] p-5">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">
                          🩺
                        </span>

                        <h4 className="font-semibold text-[#315d3b]">
                          {t("consultation.doctorNotes")}
                        </h4>
                      </div>

                      <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-[#49634d]">
                        {request.doctor_notes}
                      </p>

                      <p className="mt-3 text-xs text-[#66836a]">
                        {t("consultation.doctorNotesDescription")}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

      </div>

      {/* REQUEST MODAL */}

      {selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">

            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#332532]">
                  {t("consultation.requestConsultation")}
                </h2>

                <p className="mt-1 text-sm text-[#76566f]">
                  {selectedDoctor.full_name}
                </p>

                <p className="text-sm text-[#a65a78]">
                  {selectedDoctor.specialization}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedDoctor(null)
                }
                disabled={sending}
                className="text-2xl text-[#8b7285]"
              >
                ×
              </button>
            </div>

            <label className="mt-6 block text-sm font-medium text-[#6f5968]">
              {t("consultation.reasonLabel")}
            </label>

            <textarea
              value={reason}
              onChange={(e) =>
                setReason(e.target.value)
              }
              rows={5}
              maxLength={500}
              placeholder={t("consultation.reasonPlaceholder")}
              disabled={sending}
              className="mt-2 w-full resize-none rounded-xl border border-[#eadce5] bg-[#fffafd] px-4 py-3 text-sm outline-none focus:border-[#c58aaa]"
            />

            <p className="mt-1 text-right text-xs text-[#a17b91]">
              {reason.length}/500
            </p>

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() =>
                  setSelectedDoctor(null)
                }
                disabled={sending}
                className="flex-1 rounded-xl border border-[#eadce5] px-4 py-3 text-sm font-semibold text-[#76566f]"
              >
                {t("consultation.cancel")}
              </button>

              <button
                type="button"
                onClick={sendRequest}
                disabled={
                  sending || !reason.trim()
                }
                className="flex-1 rounded-xl bg-[#b76e8c] px-4 py-3 text-sm font-semibold text-white disabled:opacity-50"
              >
                {sending
                  ? t("consultation.sending")
                  : t("consultation.sendRequest")}
              </button>
            </div>

          </div>
        </div>
      )}

    </main>
  );
}