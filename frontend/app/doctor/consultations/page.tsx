"use client";

import { startTransition, useEffect, useRef, useState } from "react";
import { isAxiosError } from "axios";
import { api, getApiErrorMessage } from "@/lib/api";
import BrandLogo from "@/components/brand-logo";

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

interface DoctorPatientReport {
  patient: {
    id: number;
    full_name: string;
    age: number | null;
    life_stage: string | null;
  };
  consultation: {
    id: number;
    reason: string;
    status: string;
    doctor_notes: string | null;
    created_at: string;
  };
  health_tracking: Array<{
    tracking_date: string;
    cycle_day: number | null;
    mood: number | null;
    sleep_hours: number | null;
    activity_level: string | null;
  }>;
  menstrual_history: Array<{
    period_start: string;
    period_end: string | null;
    cycle_length: number | null;
    symptoms: string | null;
    flow_level: string | null;
  }>;
  pregnancy_history: Array<{
    pregnancy_status: string;
    pregnancy_week: number | null;
    due_date: string | null;
    postpartum_status: string | null;
    postpartum_week: number | null;
    postpartum_mood: number | null;
    wellbeing_notes: string | null;
    created_at: string | null;
  }>;
  mental_wellness_history: Array<{
    assessment_type: string;
    score: number;
    interpretation: string;
    created_at: string;
  }>;
  pmos_history: Array<{
    score: number;
    risk_level: string;
    explanation: string | null;
    created_at: string;
  }>;
  health_insights: {
    insights?: unknown[];
  };
  period: {
    start: string | null;
    end: string | null;
  };
}

const escapeHtml = (value: unknown): string => {
  const text =
    (typeof value === "string" && value.length > 0) ||
    (typeof value === "number" && Number.isFinite(value)) ||
    typeof value === "boolean"
      ? String(value)
      : "Not available";

  return text.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
};

const formatInsight = (insight: unknown): string | null => {
  if (typeof insight === "string") return insight;
  if (!insight || typeof insight !== "object" || Array.isArray(insight)) {
    return null;
  }

  const entry = insight as Record<string, unknown>;
  const categories: Record<string, string> = {
    sleep: "Sleep",
    mood: "Mood",
    mood_variation: "Mood variation",
    activity: "Activity",
    cycle: "Menstrual cycle",
    tracking: "Health tracking",
    no_data: "Health data",
    continue_tracking: "Health tracking",
  };
  const category =
    typeof entry.type === "string" ? categories[entry.type] : undefined;
  if (!category) return null;
  if (entry.type === "no_data") {
    return "No health data is available for generating insights.";
  }

  const condition =
    typeof entry.condition === "string"
      ? entry.condition.replaceAll("_", " ")
      : null;
  const rawValue = entry.value ?? entry.range;
  const value =
    typeof rawValue === "string" ||
    (typeof rawValue === "number" && Number.isFinite(rawValue))
      ? rawValue
      : null;
  const details = [
    condition,
    value !== null && value !== undefined ? `Value: ${String(value)}` : null,
  ].filter(Boolean);

  return `${category}${details.length ? ` — ${details.join("; ")}` : ""}`;
};

const reportSection = (title: string, content: string) => `
  <section>
    <h2>${escapeHtml(title)}</h2>
    ${content || "<p>No records available.</p>"}
  </section>
`;

type FilterStatus =
  | "All"
  | "Pending"
  | "Accepted"
  | "Completed"
  | "Cancelled";

export default function DoctorConsultationsPage() {
  const [requests, setRequests] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<FilterStatus>("All");
  const [selectedRequest, setSelectedRequest] =
  useState<Consultation | null>(null);
  const [doctorNotes, setDoctorNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);
  const [processingReportId, setProcessingReportId] =
    useState<number | null>(null);
  const [patientReportHtml, setPatientReportHtml] = useState<string | null>(
    null
  );
  const reportFrameRef = useRef<HTMLIFrameElement>(null);

  const loadRequests = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/consultation/doctor-requests");

      setRequests(response.data);
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.status === 401) {
        setError("Authentication failed. Please login as a doctor.");
      } else if (isAxiosError(error) && error.response?.status === 403) {
        setError("You do not have doctor access.");
      } else {
        setError(getApiErrorMessage(error, "Unable to load consultation requests."));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    startTransition(() => {
      void loadRequests();
    });
  }, []);

  const updateStatus = async (
    consultationId: number,
    status: string
  ) => {
    try {
      await api.put(
        `/consultation/doctor/${consultationId}/status`,
        {
          status,
        }
      );

      await loadRequests();
    } catch (error: unknown) {
      alert(
        getApiErrorMessage(error, "Unable to update consultation status.")
      );
    }
  };
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

        alert("Doctor notes saved successfully.");

        await loadRequests();

        setSelectedRequest({
        ...selectedRequest,
        doctor_notes: doctorNotes,
        });

    } catch (error: unknown) {
        alert(
      getApiErrorMessage(error, "Unable to save doctor notes.")
        );

    } finally {
        setSavingNotes(false);
    }
    };

    const openPatientReport = async (
      consultation: Consultation,
      printAfterOpen: boolean
    ) => {
        const reportWindow = printAfterOpen
          ? window.open("", "_blank")
          : null;
        if (printAfterOpen && !reportWindow) {
          alert("Allow pop-ups to print or save the patient report.");
          return;
        }

        try {
          setProcessingReportId(consultation.id);
          const response = await api.get<DoctorPatientReport>(
            `/consultation/doctor/${consultation.id}/patient-report`
          );
        const report = response.data;
        if (!report || !report.patient || !report.consultation) {
          throw new Error("The patient report response is incomplete.");
        }
        const healthRecords = Array.isArray(report.health_tracking)
          ? report.health_tracking
          : [];
        const menstrualRecords = Array.isArray(report.menstrual_history)
          ? report.menstrual_history
          : [];
        const pregnancyRecords = Array.isArray(report.pregnancy_history)
          ? report.pregnancy_history
          : [];
        const mentalRecords = Array.isArray(report.mental_wellness_history)
          ? report.mental_wellness_history
          : [];
        const pmosRecords = Array.isArray(report.pmos_history)
          ? report.pmos_history
          : [];
        const reportInsights = Array.isArray(report.health_insights?.insights)
          ? report.health_insights.insights
          : [];
        const hasHealthRecords =
          healthRecords.length > 0 ||
          menstrualRecords.length > 0 ||
          pregnancyRecords.length > 0 ||
          mentalRecords.length > 0 ||
          pmosRecords.length > 0;
        const logoResponse = await fetch("/sakhiAI-logo.png");
        if (!logoResponse.ok) {
          throw new Error("Unable to load the SakhiAI logo.");
        }
        const logoBlob = await logoResponse.blob();
        const logoDataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () =>
            typeof reader.result === "string"
              ? resolve(reader.result)
              : reject(new Error("Unable to read the SakhiAI logo."));
          reader.onerror = () =>
            reject(new Error("Unable to read the SakhiAI logo."));
          reader.readAsDataURL(logoBlob);
        });
        const generatedOn = new Date().toLocaleString("en");
        const recordPeriod =
          report.period?.start && report.period?.end
            ? `${report.period.start} – ${report.period.end}`
            : "All available records; dates vary by section.";

        const healthRows = healthRecords.map((record) => `
          <tr>
            <td>${escapeHtml(record.tracking_date)}</td>
            <td>${escapeHtml(record.cycle_day)}</td>
            <td>${escapeHtml(record.mood)}</td>
            <td>${escapeHtml(record.sleep_hours)}</td>
            <td>${escapeHtml(record.activity_level)}</td>
          </tr>
        `).join("");
        const menstrualRows = menstrualRecords.map((record) => `
          <tr>
            <td>${escapeHtml(record.period_start)}</td>
            <td>${escapeHtml(record.period_end)}</td>
            <td>${escapeHtml(record.cycle_length)}</td>
            <td>${escapeHtml(record.flow_level)}</td>
            <td class="free-text">${escapeHtml(record.symptoms)}</td>
          </tr>
        `).join("");
        const pregnancyRows = pregnancyRecords.map((record) => `
          <tr>
            <td>${escapeHtml(record.created_at)}</td>
            <td>${escapeHtml(record.pregnancy_status)}</td>
            <td>${escapeHtml(record.pregnancy_week)}</td>
            <td>${escapeHtml(record.due_date)}</td>
            <td>${escapeHtml(record.postpartum_status)}</td>
            <td>${escapeHtml(record.postpartum_week)}</td>
            <td>${escapeHtml(record.postpartum_mood)}</td>
            <td class="free-text">${escapeHtml(record.wellbeing_notes)}</td>
          </tr>
        `).join("");
        const mentalRows = mentalRecords.map((record) => `
          <tr>
            <td>${escapeHtml(record.created_at)}</td>
            <td>${escapeHtml(record.assessment_type)}</td>
            <td>${escapeHtml(record.score)}</td>
            <td>${escapeHtml(record.interpretation)}</td>
          </tr>
        `).join("");
        const pmosRows = pmosRecords.map((record) => `
          <tr>
            <td>${escapeHtml(record.created_at)}</td>
            <td>${escapeHtml(record.score)}</td>
            <td>${escapeHtml(record.risk_level)}</td>
            <td class="free-text">${escapeHtml(record.explanation)}</td>
          </tr>
        `).join("");
        const insightMessages = reportInsights
          .map(formatInsight)
          .filter((message): message is string => Boolean(message))
          .map((message) => `<li>${escapeHtml(message)}</li>`)
          .join("");

        const reportHtml = `<!doctype html>
          <html lang="en">
            <head>
              <meta charset="utf-8" />
              <meta name="viewport" content="width=device-width,initial-scale=1" />
              <title>Confidential Patient Health Report</title>
              <style>
                body { color:#27212a; font:14px Arial,"Noto Sans Kannada","Noto Sans Devanagari","Nirmala UI",sans-serif; margin:32px auto; max-width:1000px; padding:0 24px; }
                header { border-bottom:2px solid #eadce5; margin-bottom:24px; padding-bottom:16px; }
                header img { display:block; height:auto; max-width:220px; }
                h1 { color:#332532; font-size:25px; margin:16px 0 8px; }
                h2 { border-bottom:1px solid #eadce5; color:#5f4057; font-size:18px; margin:24px 0 12px; padding-bottom:6px; }
                p { line-height:1.55; white-space:pre-wrap; }
                .meta { color:#625563; font-size:12px; line-height:1.7; }
                .notice { background:#faf4f8; border:1px solid #eadce5; padding:12px; }
                table { border-collapse:collapse; font-size:12px; width:100%; }
                th,td { border:1px solid #ded5dd; padding:7px; text-align:left; vertical-align:top; }
                th { background:#f7eff4; }
                .free-text { white-space:pre-wrap; }
                section { break-inside:auto; }
                tr { break-inside:avoid; }
                @media print { body { margin:0; max-width:none; padding:0; } h2 { break-after:avoid; } }
              </style>
            </head>
            <body>
              <header>
                <img src="${logoDataUrl}" alt="SakhiAI" />
                <h1>Patient Health Report</h1>
                <div class="meta">
                  <div>Generated: ${escapeHtml(generatedOn)}</div>
                  <div>Included period: ${escapeHtml(recordPeriod)}. All available records are included; each section may have a different date range.</div>
                  <div>Confidential health information. Share only with the patient's consent and authorized care team.</div>
                </div>
              </header>
              ${hasHealthRecords ? "" : '<p class="notice">No health records are currently available. Consultation information is shown below.</p>'}
              ${reportSection("Patient Information", `
                <table><tbody>
                  <tr><th>Patient</th><td>${escapeHtml(report.patient.full_name)}</td></tr>
                  <tr><th>Patient ID</th><td>${escapeHtml(report.patient.id)}</td></tr>
                  <tr><th>Age</th><td>${escapeHtml(report.patient.age)}</td></tr>
                  <tr><th>Life stage</th><td>${escapeHtml(report.patient.life_stage)}</td></tr>
                </tbody></table>
              `)}
              ${reportSection("Consultation", `
                <table><tbody>
                  <tr><th>Consultation ID</th><td>${escapeHtml(report.consultation.id)}</td></tr>
                  <tr><th>Status</th><td>${escapeHtml(report.consultation.status)}</td></tr>
                  <tr><th>Requested on</th><td>${escapeHtml(report.consultation.created_at)}</td></tr>
                </tbody></table>
                <h3>Patient's reason</h3><p class="free-text">${escapeHtml(report.consultation.reason)}</p>
                <h3>Doctor notes</h3><p class="free-text">${escapeHtml(report.consultation.doctor_notes)}</p>
              `)}
              ${reportSection("Health Tracking History", healthRows ? `
                <table><thead><tr><th>Date</th><th>Cycle day</th><th>Mood (1–5)</th><th>Sleep (hours)</th><th>Activity level</th></tr></thead><tbody>${healthRows}</tbody></table>
              ` : "")}
              ${reportSection("Menstrual History", menstrualRows ? `
                <table><thead><tr><th>Period start</th><th>Period end</th><th>Cycle length</th><th>Flow</th><th>Symptoms</th></tr></thead><tbody>${menstrualRows}</tbody></table>
              ` : "")}
              ${reportSection("Pregnancy and Postpartum History", pregnancyRows ? `
                <table><thead><tr><th>Recorded</th><th>Pregnancy status</th><th>Week</th><th>Due date</th><th>Postpartum status</th><th>Postpartum week</th><th>Mood</th><th>Wellbeing notes</th></tr></thead><tbody>${pregnancyRows}</tbody></table>
              ` : "")}
              ${reportSection("Mental Wellness Assessments", mentalRows ? `
                <table><thead><tr><th>Date</th><th>Assessment</th><th>Score</th><th>Interpretation</th></tr></thead><tbody>${mentalRows}</tbody></table>
              ` : "")}
              ${reportSection("PMOS History", pmosRows ? `
                <table><thead><tr><th>Date</th><th>Score</th><th>Risk level</th><th>Explanation</th></tr></thead><tbody>${pmosRows}</tbody></table>
              ` : "")}
              ${reportSection("Health Insights", insightMessages ? `<ul>${insightMessages}</ul>` : "")}
              <p class="meta">This report presents recorded information and informational insights; it is not a diagnosis. Unavailable records are not evidence of a negative result.</p>
            </body>
        </html>`;
        if (printAfterOpen && reportWindow) {
        reportWindow.document.open();
        reportWindow.document.write(reportHtml);
        reportWindow.document.close();
        reportWindow.focus();
        window.setTimeout(() => reportWindow.print(), 700);
        } else {
        setPatientReportHtml(reportHtml);
        }
      } catch (error: unknown) {
        reportWindow?.close();
        alert(
        getApiErrorMessage(error, "Unable to prepare the patient report.")
        );
      } finally {
        setProcessingReportId(null);
      }
    };
  /* -----------------------------
     STATISTICS
  ----------------------------- */

  const pendingCount = requests.filter(
    (request) => request.status === "Pending"
  ).length;

  const acceptedCount = requests.filter(
    (request) => request.status === "Accepted"
  ).length;

  const completedCount = requests.filter(
    (request) => request.status === "Completed"
  ).length;

  const cancelledCount = requests.filter(
    (request) => request.status === "Cancelled"
  ).length;

  /* -----------------------------
     FILTERING
  ----------------------------- */

  const filteredRequests =
    filter === "All"
      ? requests
      : requests.filter(
          (request) => request.status === filter
        );

  /* -----------------------------
     STATUS STYLE
  ----------------------------- */

  const getStatusClass = (status: string) => {
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

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <BrandLogo className="mb-4 max-w-56" />
          <h1 className="text-3xl font-bold text-gray-900">
            Doctor Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Manage patient consultation requests and track consultation
            status.
          </p>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="bg-white rounded-xl p-8 text-center shadow-sm">
            <p className="text-gray-500">
              Loading consultation requests...
            </p>
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-5">
            <p className="font-medium">{error}</p>

            <button
              onClick={loadRequests}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* DASHBOARD */}
        {!loading && !error && (
          <>
            {/* STATISTICS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

              {/* PENDING */}
              <button
                onClick={() => setFilter("Pending")}
                className="bg-white rounded-xl shadow-sm border p-5 text-left hover:shadow-md transition"
              >
                <p className="text-sm font-medium text-gray-500">
                  Pending
                </p>

                <p className="text-3xl font-bold text-yellow-600 mt-2">
                  {pendingCount}
                </p>

                <p className="text-sm text-gray-400 mt-1">
                  Awaiting response
                </p>
              </button>
              {/* ACCEPTED */}
              <button
                onClick={() => setFilter("Accepted")}
                className="bg-white rounded-xl shadow-sm border p-5 text-left hover:shadow-md transition"
              >
                <p className="text-sm font-medium text-gray-500">
                  Accepted
                </p>

                <p className="text-3xl font-bold text-blue-600 mt-2">
                  {acceptedCount}
                </p>

                <p className="text-sm text-gray-400 mt-1">
                  Active consultations
                </p>
              </button>

              {/* COMPLETED */}
              <button
                onClick={() => setFilter("Completed")}
                className="bg-white rounded-xl shadow-sm border p-5 text-left hover:shadow-md transition"
              >
                <p className="text-sm font-medium text-gray-500">
                  Completed
                </p>

                <p className="text-3xl font-bold text-green-600 mt-2">
                  {completedCount}
                </p>

                <p className="text-sm text-gray-400 mt-1">
                  Finished consultations
                </p>
              </button>

              {/* CANCELLED */}
              <button
                onClick={() => setFilter("Cancelled")}
                className="bg-white rounded-xl shadow-sm border p-5 text-left hover:shadow-md transition"
              >
                <p className="text-sm font-medium text-gray-500">
                  Cancelled
                </p>

                <p className="text-3xl font-bold text-red-600 mt-2">
                  {cancelledCount}
                </p>

                <p className="text-sm text-gray-400 mt-1">
                  Declined requests
                </p>
              </button>

            </div>

            {/* FILTER SECTION */}
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

                  const isActive = filter === status;

                  return (
                    <button
                      key={status}
                      onClick={() => setFilter(status)}
                      className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {status}
                    </button>
                  );
                })}

              </div>

            </div>

            {/* SECTION HEADER */}
            <div className="flex items-center justify-between mb-4">

              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Consultation Requests
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {filteredRequests.length} consultation
                  {filteredRequests.length !== 1 ? "s" : ""}
                  {filter !== "All" && ` • ${filter}`}
                </p>
              </div>

              <button
                onClick={loadRequests}
                className="px-4 py-2 bg-white border rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Refresh
              </button>

            </div>

            {/* EMPTY */}
            {filteredRequests.length === 0 && (
              <div className="bg-white rounded-xl p-10 text-center shadow-sm border">

                <div className="text-5xl mb-4">
                  📋
                </div>

                <h2 className="text-xl font-semibold text-gray-800">
                  No {filter !== "All" ? filter.toLowerCase() : ""}{" "}
                  consultation requests
                </h2>

                <p className="text-gray-500 mt-2">
                  {filter === "All"
                    ? "Patient consultation requests will appear here."
                    : `There are currently no ${filter.toLowerCase()} consultations.`}
                </p>

              </div>
            )}

            {/* REQUESTS */}
            {filteredRequests.length > 0 && (
              <div className="space-y-5">

                {filteredRequests.map((request) => (
                  <div
                    key={request.id}
                    className="min-w-0 rounded-xl border bg-white p-4 shadow-sm sm:p-6"
                  >

                    {/* TOP */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                      <div className="min-w-0">
                        <h2 className="text-xl font-semibold text-gray-900">
                          Consultation #{request.id}
                        </h2>

                        <p className="mt-1 break-words text-sm font-medium text-gray-700">
                          Patient: {request.patient_name?.trim() || "Unknown"}
                        </p>

                        <p className="text-sm text-gray-500">
                          Patient ID: {request.user_id}
                        </p>

                        <p className="text-sm text-gray-500">
                          Requested on:{" "}
                          {new Date(
                            request.created_at
                          ).toLocaleString()}
                        </p>
                      </div>

                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusClass(
                          request.status
                        )}`}
                      >
                        {request.status}
                      </span>

                    </div>

                    {/* REASON */}
                    <div className="mt-5 bg-gray-50 rounded-lg p-4">

                      <h3 className="font-semibold text-gray-700">
                        Patient&apos;s Reason
                      </h3>

                      <p className="mt-2 whitespace-pre-wrap break-words text-gray-600">
                        {request.reason?.trim() || "No reason provided."}
                      </p>

                    </div>

                    {/* VIEW DETAILS */}
                    <div className="mt-5 flex flex-wrap gap-3">
                    <button
                    onClick={() => {
                        setSelectedRequest(request);
                        setDoctorNotes(request.doctor_notes || "");
                    }}
                    className="rounded-lg bg-gray-800 px-5 py-2 text-white hover:bg-gray-900"
                    >
                    View Details
                    </button>
                    <button
                      onClick={() => void openPatientReport(request, true)}
                      disabled={processingReportId === request.id}
                      className="rounded-lg bg-[#a65a78] px-5 py-2 text-white hover:bg-[#914c68] disabled:cursor-wait disabled:opacity-60"
                    >
                      {processingReportId === request.id
                        ? "Preparing Patient Report..."
                        : "Download Patient Report"}
                    </button>
                    </div>
                    {/* ACTIONS - PENDING */}
                    {request.status === "Pending" && (
                      <div className="mt-5 flex flex-wrap gap-3">

                        <button
                          onClick={() =>
                            updateStatus(
                              request.id,
                              "Accepted"
                            )
                          }
                          className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                          Accept Request
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(
                              request.id,
                              "Cancelled"
                            )
                          }
                          className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                          Decline Request
                        </button>

                      </div>
                    )}

                    {/* ACCEPTED ACTION */}
                    {request.status === "Accepted" && (
                      <div className="mt-5">

                        <button
                          onClick={() =>
                            updateStatus(
                              request.id,
                              "Completed"
                            )
                          }
                          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          Mark as Completed
                        </button>

                      </div>
                    )}

                    {/* COMPLETED */}
                    {request.status === "Completed" && (
                      <div className="mt-5 bg-green-50 text-green-700 rounded-lg p-3">
                        Consultation completed.
                      </div>
                    )}

                    {/* CANCELLED */}
                    {request.status === "Cancelled" && (
                      <div className="mt-5 bg-red-50 text-red-700 rounded-lg p-3">
                        This consultation request was declined.
                      </div>
                    )}

                  </div>
                ))}

              </div>
            )}

          </>
        )}

            </div>

      {/* CONSULTATION DETAILS MODAL */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">

          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

            {/* MODAL HEADER */}
            <div className="flex items-center justify-between p-6 border-b">

              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Consultation Details
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Consultation #{selectedRequest.id}
                </p>
              </div>

            <button
            onClick={() => {
                setSelectedRequest(null);
                setDoctorNotes("");
            }}
                className="text-gray-500 hover:text-gray-800 text-2xl"
              >
                ×
              </button>

            </div>

            {/* MODAL CONTENT */}
            <div className="p-6 space-y-6">

              {/* PATIENT INFORMATION */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Patient Information
                </h3>

                <div className="bg-gray-50 rounded-xl p-4">

                  <p className="text-sm text-gray-500">
                    Patient Name
                  </p>

                  <p className="text-lg font-semibold text-gray-900">
                    {selectedRequest.patient_name || "Unknown"}
                  </p>

                  <p className="text-sm text-gray-500 mt-4">
                    Patient ID
                  </p>

                  <p className="font-semibold text-gray-900">
                    {selectedRequest.user_id}
                  </p>

                </div>
              </div>

              {/* CONSULTATION INFORMATION */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Consultation Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500">
                      Consultation ID
                    </p>

                    <p className="font-semibold text-gray-900 mt-1">
                      #{selectedRequest.id}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500">
                      Doctor ID
                    </p>

                    <p className="font-semibold text-gray-900 mt-1">
                      {selectedRequest.doctor_id}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500">
                      Status
                    </p>

                    <span
                      className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-semibold ${getStatusClass(
                        selectedRequest.status
                      )}`}
                    >
                      {selectedRequest.status}
                    </span>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500">
                      Requested On
                    </p>

                    <p className="font-semibold text-gray-900 mt-1">
                      {new Date(
                        selectedRequest.created_at
                      ).toLocaleString()}
                    </p>
                  </div>

                </div>
              </div>

              {/* PATIENT REASON */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Patient&apos;s Reason
                </h3>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-700 leading-relaxed">
                    {selectedRequest.reason}
                  </p>
                </div>
              </div>
                {/* DOCTOR NOTES */}
                <div>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Doctor Notes
                </h3>

                <textarea
                    value={doctorNotes}
                    onChange={(e) =>
                    setDoctorNotes(e.target.value)
                    }
                    placeholder="Enter observations, advice, recommendations, follow-up instructions..."
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
                        ? "Saving..."
                        : "Save Notes"}
                    </button>

                </div>

                </div>
            </div>

            {/* MODAL FOOTER */}
            <div className="flex flex-wrap justify-between gap-3 border-t p-6">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() =>
                    void openPatientReport(selectedRequest, false)
                  }
                  disabled={processingReportId === selectedRequest.id}
                  className="rounded-lg border border-[#a65a78] px-5 py-2 text-[#914c68] hover:bg-[#fff8fb] disabled:cursor-wait disabled:opacity-60"
                >
                  {processingReportId === selectedRequest.id
                    ? "Preparing Patient Report..."
                    : "View Patient Report"}
                </button>
                <button
                  onClick={() =>
                    void openPatientReport(selectedRequest, true)
                  }
                  disabled={processingReportId === selectedRequest.id}
                  className="rounded-lg bg-[#a65a78] px-5 py-2 text-white hover:bg-[#914c68] disabled:cursor-wait disabled:opacity-60"
                >
                  Download Patient Report
                </button>
              </div>
              <button
                onClick={() => {
                    setSelectedRequest(null);
                    setDoctorNotes("");
                }}
                className="px-5 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
              >
                Close Details
              </button>

            </div>

          </div>

        </div>
      )}

      {patientReportHtml && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-3 sm:p-6">
          <section
            aria-label="Patient health report preview"
            className="flex h-full max-h-[95vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-white shadow-xl"
          >
            <header className="flex flex-wrap items-center justify-between gap-3 border-b p-4 sm:p-5">
              <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
                Patient Health Report
              </h2>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => reportFrameRef.current?.contentWindow?.print()}
                  className="rounded-lg bg-[#a65a78] px-4 py-2 text-white hover:bg-[#914c68]"
                >
                  Print / Save as PDF
                </button>
                <button
                  onClick={() => setPatientReportHtml(null)}
                  className="rounded-lg border px-4 py-2 text-gray-700 hover:bg-gray-50"
                >
                  Close Report
                </button>
              </div>
            </header>
            <iframe
              ref={reportFrameRef}
              title="Patient health report"
              srcDoc={patientReportHtml}
              className="min-h-0 flex-1 border-0"
            />
          </section>
        </div>
      )}

    </main>
  );
}