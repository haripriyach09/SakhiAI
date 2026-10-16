"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

interface Notification {
  id: number;
  user_id: number;
  title: string;
  message: string;
  notification_type: string;
  is_read: boolean;
  created_at: string;
}

export default function NotificationsPage() {
  const { language, t } = useLanguage();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const dateLocale =
    language === "Kannada"
      ? "kn-IN"
      : language === "Hindi"
        ? "hi-IN"
        : "en-US";

  const getNotificationTitle = (title: string) => {
    if (title === "New Doctor's Notes") {
      return t("notifications.doctorNotesTitle");
    }

    if (title === "🌸 Cycle Reminder") {
      return t("notifications.cycleReminderTitle");
    }

    return title;
  };

  const getNotificationMessage = (message: string) => {
    const notesPrefix = "Your doctor, ";
    const notesSuffix =
      ", has added or updated notes for your consultation. " +
      "Log in to SakhiAI and open your consultation page " +
      "to view them.";

    if (message.startsWith(notesPrefix) && message.endsWith(notesSuffix)) {
      const doctorName = message.slice(
        notesPrefix.length,
        -notesSuffix.length
      );

      return t("notifications.doctorNotesMessage").replace(
        "{doctor}",
        doctorName
      );
    }

    if (message === "Your doctor has added or updated notes for your consultation. Log in to SakhiAI and open your consultation page to view them.") {
      return t("notifications.doctorNotesMessageGeneric");
    }

    if (
      message ===
      "Your menstrual cycle is being tracked. Continue recording your cycle data for better predictions."
    ) {
      return t("notifications.cycleReminderMessage");
    }

    return message;
  };

  const getHeaders = () => {
    const token = localStorage.getItem("sakhi_token");

    if (!token) {
      throw new Error("NO_TOKEN");
    }

    return {
      Authorization: `Bearer ${token}`,
    };
  };

 const loadNotifications = async () => {
  try {
    setLoading(true);
    setError("");

    const token = localStorage.getItem("sakhi_token");

    if (!token) {
      setError(t("notifications.loginRequired"));
      return;
    }

    const response = await api.get("/notifications/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setNotifications(response.data);
  } catch (error: unknown) {
    const status =
      typeof error === "object" && error !== null && "response" in error
        ? (error as { response?: { status?: number } }).response?.status
        : undefined;

    if (status === 401) {
      setError(t("notifications.sessionExpired"));
    } else {
      setError(t("notifications.loadError"));
    }
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    loadNotifications();
  }, []);

  const markAsRead = async (id: number) => {
    try {
      await api.put(
        `/notifications/${id}/read`,
        {},
        {
          headers: getHeaders(),
        }
      );

      setNotifications((previous) =>
        previous.map((notification) =>
          notification.id === id
            ? { ...notification, is_read: true }
            : notification
        )
      );
    } catch {
      console.error("Unable to mark notification as read.");
    }
  };

  const deleteNotification = async (id: number) => {
    try {
      await api.delete(`/notifications/${id}`, {
        headers: getHeaders(),
      });

      setNotifications((previous) =>
        previous.filter(
          (notification) => notification.id !== id
        )
      );
    } catch {
      console.error("Unable to delete notification.");
    }
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.is_read
  ).length;

  return (
    <main className="min-h-screen bg-[#fff8fb] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fdeaf1] text-2xl">
              🔔
            </div>

            <div>
              <h1 className="text-3xl font-bold text-[#332532]">
                {t("notifications.title")}
              </h1>

              <p className="mt-1 text-[#76566f]">
                {t("notifications.subtitle")}
              </p>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Summary */}
        {!loading && !error && (
          <div className="mb-6 rounded-2xl border border-[#f0dce5] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#a17b91]">
                  {t("notifications.unread")}
                </p>

                <p className="mt-1 text-2xl font-bold text-[#4d3a4a]">
                  {unreadCount}
                </p>
              </div>

              <div className="rounded-xl bg-[#fff1f6] px-4 py-3 text-sm text-[#a65a78]">
                {notifications.length} {t("notifications.total")}
              </div>
            </div>
          </div>
        )}

        {/* Notifications */}
        <section className="rounded-2xl border border-[#f0dce5] bg-white p-6 shadow-sm">
          {loading ? (
            <div className="py-12 text-center text-[#8b7285]">
              {t("notifications.loading")}
            </div>
          ) : notifications.length === 0 ? (
            <div className="rounded-xl bg-[#fff8fb] px-6 py-12 text-center">
              <div className="text-4xl">🌸</div>

              <p className="mt-4 font-semibold text-[#4d3a4a]">
                {t("notifications.noNotifications")}
              </p>

              <p className="mt-1 text-sm text-[#a18c99]">
                {t("notifications.emptyDescription")}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`rounded-xl border p-5 transition ${
                    notification.is_read
                      ? "border-[#eee3e9] bg-white"
                      : "border-[#efd4df] bg-[#fff8fb]"
                  }`}
                >
                  <div className="flex items-start gap-4">

                    {/* Icon */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#fdeaf1]">
                      {notification.notification_type ===
                      "period"
                        ? "🌸"
                        : notification.notification_type ===
                          "health"
                        ? "💗"
                        : "🔔"}
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-[#4d3a4a]">
                          {getNotificationTitle(notification.title)}
                        </h3>

                        {!notification.is_read && (
                          <span className="rounded-full bg-[#b76e8c] px-2 py-1 text-[10px] font-semibold text-white">
                            {t("notifications.new")}
                          </span>
                        )}
                      </div>

                      <p className="mt-2 text-sm leading-6 text-[#76566f]">
                        {getNotificationMessage(notification.message)}
                      </p>

                      <p className="mt-2 text-xs text-[#a18c99]">
                        {new Date(
                          notification.created_at
                        ).toLocaleString(dateLocale)}
                      </p>

                      {/* Actions */}
                      <div className="mt-4 flex gap-3">
                        {!notification.is_read && (
                          <button
                            type="button"
                            onClick={() =>
                              markAsRead(notification.id)
                            }
                            className="rounded-lg bg-[#f5f0fb] px-3 py-2 text-xs font-medium text-[#76566f] hover:bg-[#eee6f8]"
                          >
                            {t("notifications.markAsRead")}
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            deleteNotification(notification.id)
                          }
                          className="rounded-lg px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-50"
                        >
                          {t("notifications.delete")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}