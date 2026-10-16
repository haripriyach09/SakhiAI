"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import BrandLogo from "@/components/brand-logo";

interface Profile {
id?: number;
user_id?: number;
date_of_birth: string;
height: number;
weight: number;
blood_group: string;
medical_history: string;
allergies: string;
menstrual_status: string;
pregnancy_status: string;
}

interface User {
id: number;
full_name: string;
email: string;
age: number;
language: string;
life_stage: string;
}

const getHeaders = () => {
const token = localStorage.getItem("sakhi_token");

return {
  Authorization: `Bearer ${token}`,
};
};

export default function ProfilePage() {
const { t } = useLanguage();
const [user, setUser] = useState<User | null>(null);

const [profile, setProfile] = useState<Profile>({
date_of_birth: "",
height: 0,
weight: 0,
blood_group: "",
medical_history: "",
allergies: "",
menstrual_status: "",
pregnancy_status: "",
});

const [loading, setLoading] = useState(true);
const [saving, setSaving] = useState(false);
const [profileExists, setProfileExists] = useState(false);
const [message, setMessage] = useState("");
const [error, setError] = useState("");

const getLifeStageLabel = (lifeStage: string | undefined) => {
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

// ==========================================
// LOAD USER + PROFILE
// ==========================================

useEffect(() => {
const loadProfile = async () => {
try {
setLoading(true);
setError("");
    const token = localStorage.getItem("sakhi_token");

    if (!token) {
      setError(t("profile.loginRequired"));
      return;
    }

    // Get basic user information
    const userResponse = await api.get(
      "/auth/me",
      {
        headers: getHeaders(),
      }
    );

    setUser(userResponse.data);

    // Get health profile
    try {
      const profileResponse = await api.get(
        "/profile/me",
        {
          headers: getHeaders(),
        }
      );

      setProfile({
        id: profileResponse.data.id,
        user_id: profileResponse.data.user_id,
        date_of_birth:
          profileResponse.data.date_of_birth || "",
        height:
          profileResponse.data.height || 0,
        weight:
          profileResponse.data.weight || 0,
        blood_group:
          profileResponse.data.blood_group || "",
        medical_history:
          profileResponse.data.medical_history || "",
        allergies:
          profileResponse.data.allergies || "",
        menstrual_status:
          profileResponse.data.menstrual_status || "",
        pregnancy_status:
          profileResponse.data.pregnancy_status || "",
      });

      setProfileExists(true);
    } catch (profileError: unknown) {
      // 404 means the user hasn't created a profile yet.
      if (
        typeof profileError === "object" &&
        profileError !== null &&
        "response" in profileError &&
        (profileError as { response?: { status?: number } }).response?.status === 404
      ) {

        setProfileExists(false);
      } else {
        throw profileError;
      }
    }
  } catch {

    setError(t("profile.loadError"));
  } finally {
    setLoading(false);
  }
};

loadProfile();
}, [t]);

// ==========================================
// HANDLE INPUT
// ==========================================

const handleChange = (
field: keyof Profile,
value: string | number
) => {
setProfile((previous) => ({
...previous,
[field]: value,
}));
};

// ==========================================
// SAVE PROFILE
// ==========================================

const handleSubmit = async (
e: React.FormEvent
) => {
e.preventDefault();

setMessage("");
setError("");

// Basic validation
if (!profile.date_of_birth) {
  setError(t("profile.dateOfBirthRequired"));
  return;
}

if (!profile.height || profile.height <= 0) {
  setError(t("profile.heightRequired"));
  return;
}

if (!profile.weight || profile.weight <= 0) {
  setError(t("profile.weightRequired"));
  return;
}

if (!profile.blood_group) {
  setError(t("profile.bloodGroupRequired"));
  return;
}

if (!profile.menstrual_status) {
  setError(t("profile.menstrualStatusRequired"));
  return;
}

if (!profile.pregnancy_status) {
  setError(t("profile.pregnancyStatusRequired"));
  return;
}

try {
  setSaving(true);

  const profileData = {
    date_of_birth:
      profile.date_of_birth,

    height:
      Number(profile.height),

    weight:
      Number(profile.weight),

    blood_group:
      profile.blood_group,

    medical_history:
      profile.medical_history,

    allergies:
      profile.allergies,

    menstrual_status:
      profile.menstrual_status,

    pregnancy_status:
      profile.pregnancy_status,
  };

  if (profileExists) {
    // ======================================
    // UPDATE EXISTING PROFILE
    // ======================================

    await api.put(
      "/profile/update",
      profileData,
      {
        headers: getHeaders(),
      }
    );

    setMessage(t("profile.profileUpdated"));
  } else {
    // ======================================
    // CREATE NEW PROFILE
    // ======================================

    await api.post(
      "/profile/create",
      profileData,
      {
        headers: getHeaders(),
      }
    );

    setProfileExists(true);

    setMessage(t("profile.profileCreated"));
  }
} catch {
  setError(t("profile.saveError"));
} finally {
  setSaving(false);
}
};

// ==========================================
// LOADING
// ==========================================

if (loading) {
return ( <main className="min-h-screen bg-[#fff8fb] flex items-center justify-center"> <div className="text-center"> <p className="text-lg font-medium text-[#4d3a4a]">
        {t("profile.loading")} </p>
      <p className="mt-2 text-sm text-[#8b7285]">
        {t("profile.loadingDescription")}
      </p>
    </div>
  </main>
);
}

// ==========================================
// PAGE
// ==========================================

return ( <main className="min-h-screen bg-[#fff8fb] px-4 py-8 sm:px-6 lg:px-8"> <div className="mx-auto max-w-5xl">

```
    {/* ====================================
        HEADER
    ==================================== */}

    <div className="mb-8">

      <BrandLogo className="mb-3 max-w-48" />

      <h1 className="mt-1 text-3xl font-bold text-[#332532]">
        {t("profile.title")}
      </h1>

      <p className="mt-2 text-[#76566f]">
        {t("profile.subtitle")}
      </p>

    </div>

    {/* ====================================
        USER INFORMATION
    ==================================== */}

    <section className="mb-6 rounded-2xl border border-[#f0dce5] bg-white p-6 shadow-sm">

      <h2 className="text-xl font-semibold text-[#332532]">
        {t("profile.accountInformation")}
      </h2>

      <p className="mt-1 text-sm text-[#8b7285]">
        {t("profile.accountDescription")}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">

        {/* Name */}

        <div className="rounded-xl bg-[#fff8fb] p-4">

          <p className="text-sm text-[#a17b91]">
            {t("profile.fullName")}
          </p>

          <p className="mt-1 font-medium text-[#4d3a4a]">
            {user?.full_name || "-"}
          </p>

        </div>

        {/* Email */}

        <div className="rounded-xl bg-[#fff8fb] p-4">

          <p className="text-sm text-[#a17b91]">
            {t("profile.email")}
          </p>

          <p className="mt-1 break-all font-medium text-[#4d3a4a]">
            {user?.email || "-"}
          </p>

        </div>

        {/* Age */}

        <div className="rounded-xl bg-[#fff8fb] p-4">

          <p className="text-sm text-[#a17b91]">
            {t("profile.age")}
          </p>

          <p className="mt-1 font-medium text-[#4d3a4a]">
            {user?.age || "-"}
          </p>

        </div>

        {/* Life Stage */}

        <div className="rounded-xl bg-[#fff8fb] p-4">

          <p className="text-sm text-[#a17b91]">
            {t("profile.lifeStage")}
          </p>

          <p className="mt-1 capitalize font-medium text-[#4d3a4a]">
            {getLifeStageLabel(user?.life_stage)}
          </p>

        </div>

      </div>

    </section>

    {/* ====================================
        HEALTH PROFILE
    ==================================== */}

    <section className="rounded-2xl border border-[#f0dce5] bg-white p-6 shadow-sm">

      <div className="mb-6">

        <h2 className="text-xl font-semibold text-[#332532]">
          {t("profile.healthProfile")}
        </h2>

        <p className="mt-1 text-sm text-[#8b7285]">
          {t("profile.healthDescription")}
        </p>

      </div>

      {/* Messages */}

      {message && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* ==================================
            DOB
        ================================== */}

        <div>

          <label className="mb-2 block text-sm font-medium text-[#6f5968]">
            {t("profile.dateOfBirth")}
          </label>

          <input
            type="date"
            value={
              profile.date_of_birth
            }
            onChange={(e) =>
              handleChange(
                "date_of_birth",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-[#eadce5] bg-white px-4 py-3 text-sm text-[#4d3a4a] outline-none focus:border-[#c58aaa]"
          />

        </div>

        {/* ==================================
            HEIGHT + WEIGHT
        ================================== */}

        <div className="grid gap-5 sm:grid-cols-2">

          <div>

            <label className="mb-2 block text-sm font-medium text-[#6f5968]">
              {t("profile.height")}
            </label>

            <input
              type="number"
              min="1"
              step="0.1"
              value={
                profile.height || ""
              }
              onChange={(e) =>
                handleChange(
                  "height",
                  Number(e.target.value)
                )
              }
              placeholder={t("profile.heightPlaceholder")}
              className="w-full rounded-xl border border-[#eadce5] bg-white px-4 py-3 text-sm text-[#4d3a4a] outline-none focus:border-[#c58aaa]"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-[#6f5968]">
              {t("profile.weight")}
            </label>

            <input
              type="number"
              min="1"
              step="0.1"
              value={
                profile.weight || ""
              }
              onChange={(e) =>
                handleChange(
                  "weight",
                  Number(e.target.value)
                )
              }
              placeholder={t("profile.weightPlaceholder")}
              className="w-full rounded-xl border border-[#eadce5] bg-white px-4 py-3 text-sm text-[#4d3a4a] outline-none focus:border-[#c58aaa]"
            />

          </div>

        </div>

        {/* ==================================
            BLOOD GROUP
        ================================== */}

        <div>

          <label className="mb-2 block text-sm font-medium text-[#6f5968]">
            {t("profile.bloodGroup")}
          </label>

          <select
            value={
              profile.blood_group
            }
            onChange={(e) =>
              handleChange(
                "blood_group",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-[#eadce5] bg-white px-4 py-3 text-sm text-[#4d3a4a] outline-none focus:border-[#c58aaa]"
          >

            <option value="">
              {t("profile.selectBloodGroup")}
            </option>

            <option value="A+">
              A+
            </option>

            <option value="A-">
              A-
            </option>

            <option value="B+">
              B+
            </option>

            <option value="B-">
              B-
            </option>

            <option value="AB+">
              AB+
            </option>

            <option value="AB-">
              AB-
            </option>

            <option value="O+">
              O+
            </option>

            <option value="O-">
              O-
            </option>

          </select>

        </div>

        {/* ==================================
            MEDICAL HISTORY
        ================================== */}

        <div>

          <label className="mb-2 block text-sm font-medium text-[#6f5968]">
            {t("profile.medicalHistory")}
          </label>

          <textarea
            value={
              profile.medical_history
            }
            onChange={(e) =>
              handleChange(
                "medical_history",
                e.target.value
              )
            }
            rows={4}
            placeholder={t("profile.medicalHistoryPlaceholder")}
            className="w-full resize-none rounded-xl border border-[#eadce5] bg-white px-4 py-3 text-sm text-[#4d3a4a] outline-none focus:border-[#c58aaa]"
          />

        </div>

        {/* ==================================
            ALLERGIES
        ================================== */}

        <div>

          <label className="mb-2 block text-sm font-medium text-[#6f5968]">
            {t("profile.allergies")}
          </label>

          <textarea
            value={
              profile.allergies
            }
            onChange={(e) =>
              handleChange(
                "allergies",
                e.target.value
              )
            }
            rows={3}
            placeholder={t("profile.allergiesPlaceholder")}
            className="w-full resize-none rounded-xl border border-[#eadce5] bg-white px-4 py-3 text-sm text-[#4d3a4a] outline-none focus:border-[#c58aaa]"
          />

        </div>

        {/* ==================================
            MENSTRUAL STATUS
        ================================== */}

        <div>

          <label className="mb-2 block text-sm font-medium text-[#6f5968]">
            {t("profile.menstrualStatus")}
          </label>

          <select
            value={
              profile.menstrual_status
            }
            onChange={(e) =>
              handleChange(
                "menstrual_status",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-[#eadce5] bg-white px-4 py-3 text-sm text-[#4d3a4a] outline-none focus:border-[#c58aaa]"
          >

            <option value="">
              {t("profile.selectMenstrualStatus")}
            </option>

            <option value="Regular">
              {t("profile.regular")}
            </option>

            <option value="Irregular">
              {t("profile.irregular")}
            </option>

            <option value="Absent">
              {t("profile.absent")}
            </option>

            <option value="Not Applicable">
              {t("profile.notApplicable")}
            </option>

          </select>

        </div>

        {/* ==================================
            PREGNANCY STATUS
        ================================== */}

        <div>

          <label className="mb-2 block text-sm font-medium text-[#6f5968]">
            {t("profile.pregnancyStatus")}
          </label>

          <select
            value={
              profile.pregnancy_status
            }
            onChange={(e) =>
              handleChange(
                "pregnancy_status",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-[#eadce5] bg-white px-4 py-3 text-sm text-[#4d3a4a] outline-none focus:border-[#c58aaa]"
          >

            <option value="">
              {t("profile.selectPregnancyStatus")}
            </option>

            <option value="Not Pregnant">
              {t("profile.notPregnant")}
            </option>

            <option value="Pregnant">
              {t("profile.pregnant")}
            </option>

            <option value="Postpartum">
              {t("profile.postpartum")}
            </option>

            <option value="Prefer not to say">
              {t("profile.preferNotToSay")}
            </option>

          </select>

        </div>

        {/* ==================================
            SAVE BUTTON
        ================================== */}

        <div className="pt-2">

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-[#b76e8c] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#a85f7d] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving
              ? t("profile.saving")
              : profileExists
                ? t("profile.updateProfile")
                : t("profile.createProfile")}
          </button>

        </div>

      </form>

    </section>

    {/* ====================================
        PRIVACY NOTE
    ==================================== */}

    <div className="mt-6 rounded-2xl border border-[#ded3f0] bg-[#f8f5fc] p-5">

      <p className="text-sm font-medium text-[#4d3a4a]">
        🔒 {t("profile.privacyTitle")}
      </p>

      <p className="mt-1 text-xs leading-5 text-[#76566f]">
        {t("profile.privacyDescription")}
      </p>

    </div>

  </div>
</main>
);
}
