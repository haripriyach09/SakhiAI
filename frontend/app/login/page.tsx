"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import { api } from "@/lib/api";
import BrandLogo from "@/components/brand-logo";
import LanguageSelector from "@/components/language-selector";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import {
  UserRound,
  Stethoscope,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { t } = useLanguage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage(t("auth.loginRequired"));
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const token = response.data.access_token;
      const role = response.data.role;

      if (!token) {
        setMessage(t("auth.loginMissingToken"));
        return;
      }

      localStorage.setItem("sakhi_token", token);
      localStorage.setItem("sakhi_role", role);

      /*
       * Automatically redirect based on account type.
       */
      if (role === "doctor") {
        router.push("/doctor");
      } else if (role === "patient") {
        router.push("/dashboard");
      } else {
        setMessage(t("auth.unknownRole"));
      }

    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.status === 401) {
        setMessage(t("auth.invalidCredentials"));
      } else if (isAxiosError(error) && error.response?.status === 409) {
        setMessage(t("auth.accountConflict"));
      } else if (isAxiosError(error) && error.response?.status === 503) {
        setMessage(t("auth.serviceUnavailable"));
      } else if (isAxiosError(error) && error.request) {
        setMessage(t("auth.backendUnavailable"));
      } else {
        setMessage(t("auth.loginUnavailable"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fffafd] flex items-center justify-center p-4 sm:p-6">

      <div className="w-full max-w-md">

        <div className="mb-5 flex justify-end">
          <LanguageSelector />
        </div>

        {/* Logo */}
        <div className="mb-8 text-center">

          <BrandLogo className="mx-auto mb-5 w-full max-w-56" />

          <h1 className="mt-4 text-3xl font-bold text-[#332532]">
            {t("auth.loginTitle")}
          </h1>

          <p className="mt-2 text-sm text-[#76566f]">
            {t("auth.loginSubtitle")}
          </p>

        </div>

        {/* Login Card */}
        <div className="rounded-3xl border border-[#f0dce5] bg-white p-7 shadow-sm">

          {/* Account explanation */}
          <div className="mb-6 rounded-2xl bg-[#fff5f8] p-4">

            <div className="flex items-start gap-3">

              <div className="mt-1 flex gap-2">
                <UserRound className="h-5 w-5 text-[#b76e8c]" />
                <Stethoscope className="h-5 w-5 text-[#8064a2]" />
              </div>

              <div>
                <p className="text-sm font-semibold text-[#4a3443]">
                  {t("auth.oneLoginTitle")}
                </p>

                <p className="mt-1 text-xs leading-5 text-[#76566f]">
                  {t("auth.oneLoginDescription")}
                </p>
              </div>

            </div>

          </div>

          {/* Email */}
          <div>
            <label htmlFor="login-email" className="mb-2 block text-sm font-medium text-[#6f5968]">
              {t("auth.email")}
            </label>

            <input
              type="email"
              id="login-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("auth.emailPlaceholder")}
              aria-label={t("auth.email")}
              className="w-full rounded-xl border border-[#eadce5] px-4 py-3 outline-none transition focus:border-[#b76e8c]"
            />
          </div>

          {/* Password */}
          <div className="mt-5">
            <label htmlFor="login-password" className="mb-2 block text-sm font-medium text-[#6f5968]">
              {t("auth.password")}
            </label>

            <input
              type="password"
              id="login-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("auth.passwordPlaceholder")}
              aria-label={t("auth.password")}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
              className="w-full rounded-xl border border-[#eadce5] px-4 py-3 outline-none transition focus:border-[#b76e8c]"
            />
          </div>

          {/* Login */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-[#b76e8c] px-4 py-3.5 font-semibold text-white transition hover:bg-[#a85f7d] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? t("auth.loggingIn") : t("auth.login")}
          </button>

          {/* Message */}
          {message && (
            <div className="mt-4 rounded-xl bg-[#fff1f5] px-4 py-3 text-center text-sm text-[#76566f]">
              {message}
            </div>
          )}

        </div>

        {/* Registration */}
        <div className="mt-6 text-center">

          <p className="text-sm text-[#76566f]">
            {t("auth.noAccount")}
          </p>

          <button
            onClick={() => router.push("/register")}
            className="mt-2 font-semibold text-[#a65a78] hover:underline"
          >
            {t("auth.createAccount")}
          </button>

        </div>

      </div>

    </main>
  );
}