"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

interface CommunityPost {
  id: number;
  content: string;
  category: string;
  is_anonymous: boolean;
  created_at: string | null;
}

const categories = [
  "General Support",
  "Menstrual Health",
  "Pregnancy",
  "Postpartum",
  "Mental Wellness",
];

export default function CommunityPage() {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General Support");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const categoryTranslationKeys: Record<string, string> = {
    "General Support": "community.categoryGeneral",
    "Menstrual Health": "community.categoryMenstrual",
    Pregnancy: "community.categoryPregnancy",
    Postpartum: "community.categoryPostpartum",
    "Mental Wellness": "community.categoryMentalWellness",
  };

  const getCategoryLabel = (value: string) => {
    const key = categoryTranslationKeys[value];
    return key ? t(key) : value;
  };

  const getHeaders = () => {
    const token = localStorage.getItem("sakhi_token");

    return {
      Authorization: `Bearer ${token}`,
    };
  };

  // =====================================================
  // LOAD COMMUNITY POSTS
  // =====================================================

  const loadPosts = async () => {
    try {
      setLoading(true);

      const response = await api.get("/community/posts", {
        headers: getHeaders(),
      });

      setPosts(response.data);
    } catch {
      setError(t("community.loadError"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  // =====================================================
  // CREATE POST
  // =====================================================

  const createPost = async () => {
    setError("");
    setSuccess("");

    if (!content.trim()) {
      setError(t("community.emptyPostError"));
      return;
    }

    try {
      setPosting(true);

      await api.post(
        "/community/posts",
        {
          content: content.trim(),
          category,
          is_anonymous: true,
        },
        {
          headers: getHeaders(),
        }
      );

      setContent("");
      setCategory("General Support");

      setSuccess(t("community.createSuccess"));

      await loadPosts();
    } catch {
      setError(t("community.createError"));
    } finally {
      setPosting(false);
    }
  };

  // =====================================================
  // REPORT POST
  // =====================================================

  const reportPost = async (postId: number) => {
    const reason = window.prompt(
      t("community.reportPrompt")
    );

    if (!reason?.trim()) {
      return;
    }

    try {
      await api.post(
        `/community/posts/${postId}/report`,
        {
          reason: reason.trim(),
        },
        {
          headers: getHeaders(),
        }
      );

      alert(t("community.reportSuccess"));
    } catch (error: unknown) {
      const detail =
        typeof error === "object" && error !== null && "response" in error
          ? (error as { response?: { data?: { detail?: unknown } } }).response?.data?.detail
          : undefined;

      if (detail === "Community post not found.") {
        alert(t("community.postNotFound"));
      } else if (detail === "You have already reported this post.") {
        alert(t("community.alreadyReported"));
      } else {
        alert(t("community.reportError"));
      }
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fff8fb] p-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-lg font-medium text-[#4d3a4a]">
            {t("community.loading")}
          </p>
        </div>
      </main>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <main className="min-h-screen bg-[#fff8fb] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* HEADER */}

        <div className="mb-8">
          <p className="text-sm font-medium text-[#a65a78]">
            {t("community.title")}
          </p>

          <h1 className="mt-1 text-3xl font-bold text-[#332532]">
            {t("community.heading")}
          </h1>

          <p className="mt-2 max-w-2xl text-[#76566f]">
            {t("community.subtitle")}
          </p>
        </div>

        {/* SAFETY NOTICE */}

        <section className="mb-6 rounded-2xl border border-[#eadff0] bg-white p-5 shadow-sm">
          <h2 className="font-semibold text-[#4d3a4a]">
            {t("community.safetyTitle")}
          </h2>

          <ul className="mt-3 space-y-2 text-sm leading-6 text-[#76566f]">
            <li>• {t("community.safetyAnonymous")}</li>
            <li>• {t("community.safetyRespect")}</li>
            <li>• {t("community.safetyPrivacy")}</li>
            <li>• {t("community.safetyMedical")}</li>
            <li>• {t("community.safetyReport")}</li>
          </ul>
        </section>

        {/* CREATE POST */}

        <section className="rounded-2xl border border-[#f0dce5] bg-white p-6 shadow-sm">

          <h2 className="text-xl font-semibold text-[#332532]">
            {t("community.shareTitle")}
          </h2>

          <p className="mt-1 text-sm text-[#76566f]">
            {t("community.shareDescription")}
          </p>

          <div className="mt-5">

            <label className="text-sm font-medium text-[#4d3a4a]">
              {t("community.topic")}
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-2 w-full rounded-xl border border-[#ead5df] bg-white px-4 py-3 text-sm text-[#4d3a4a] outline-none focus:border-[#c47b98]"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {getCategoryLabel(item)}
                </option>
              ))}
            </select>

          </div>

          <div className="mt-4">

            <label className="text-sm font-medium text-[#4d3a4a]">
              {t("community.shareQuestion")}
            </label>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={1000}
              rows={5}
              placeholder={t("community.sharePlaceholder")}
              className="mt-2 w-full resize-none rounded-xl border border-[#ead5df] bg-[#fffafd] px-4 py-3 text-sm text-[#4d3a4a] outline-none placeholder:text-[#a98c9d] focus:border-[#c47b98]"
            />

            <p className="mt-1 text-right text-xs text-[#a17b91]">
              {content.length}/1000
            </p>

          </div>

          {error && (
            <div className="mt-4 rounded-xl bg-[#fff0f2] p-3 text-sm text-[#a9445d]">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-4 rounded-xl bg-[#eef8f1] p-3 text-sm text-[#477052]">
              {success}
            </div>
          )}

          <button
            onClick={createPost}
            disabled={posting}
            className="mt-4 rounded-xl bg-[#a65a78] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#914b68] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {posting ? t("community.sharing") : t("community.shareAnonymously")}
          </button>

        </section>

        {/* POSTS */}

        <section className="mt-8">

          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-[#332532]">
                {t("community.conversationsTitle")}
              </h2>

              <p className="mt-1 text-sm text-[#76566f]">
                {t("community.conversationsDescription")}
              </p>
            </div>
          </div>

          {posts.length === 0 ? (

            <div className="rounded-2xl border border-[#f0dce5] bg-white p-8 text-center shadow-sm">
              <p className="text-lg font-medium text-[#4d3a4a]">
                {t("community.emptyTitle")}
              </p>

              <p className="mt-2 text-sm text-[#76566f]">
                {t("community.emptyDescription")}
              </p>
            </div>

          ) : (

            <div className="space-y-4">

              {posts.map((post) => (

                <article
                  key={post.id}
                  className="rounded-2xl border border-[#f0dce5] bg-white p-5 shadow-sm"
                >

                  <div className="flex items-start justify-between gap-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fce8f0] text-lg">
                        🌸
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-[#4d3a4a]">
                          {t("community.anonymousMember")}
                        </p>

                        <p className="text-xs text-[#a17b91]">
                          {getCategoryLabel(post.category)}
                        </p>
                      </div>

                    </div>

                    <button
                      onClick={() => reportPost(post.id)}
                      className="text-xs font-medium text-[#9b7183] hover:text-[#a9445d]"
                    >
                      {t("community.report")}
                    </button>

                  </div>

                  <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-[#5f4a58]">
                    {post.content}
                  </p>

                </article>

              ))}

            </div>

          )}

        </section>

        {/* DISCLAIMER */}

        <div className="mt-8 rounded-2xl border border-[#eadff0] bg-[#faf8fc] p-5">

          <p className="text-xs leading-5 text-[#8b7285]">
            {t("community.disclaimer")}
          </p>

        </div>

      </div>
    </main>
  );
}