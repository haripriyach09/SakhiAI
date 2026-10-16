"use client";

import { useEffect, useRef, useState } from "react";
import { isAxiosError } from "axios";
import { api } from "@/lib/api";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import BrandLogo from "@/components/brand-logo";

interface ChatMessage {
  id: number;
  sender: "user" | "assistant";
  text: string;
  translationKey?: string;
}

export default function ChatPage() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "assistant",
      text: "",
      translationKey: "chat.welcomeMessage",
    },
  ]);

  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = async () => {
    const message = input.trim();

    if (!message || sending) {
      return;
    }

    const token = localStorage.getItem("sakhi_token");

    if (!token) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "assistant",
          text: t("chat.sessionExpired"),
        },
      ]);

      return;
    }

    // Add user's message immediately
    const userMessage: ChatMessage = {
      id: Date.now(),
      sender: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setSending(true);

    try {
      const response = await api.post(
        "/chat/message",
        {
          message: message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const assistantMessage: ChatMessage = {
        id: Date.now() + 1,
        sender: "assistant",
        text:
          response.data.response ||
          t("chat.responseFallback"),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: unknown) {
      const errorMessage =
        isAxiosError(error) && error.response?.status === 401
          ? t("chat.sessionExpired")
          : t("chat.requestError");

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "assistant",
          text: errorMessage,
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <main className="min-h-screen bg-[#fff8fb] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex h-[calc(100vh-3rem)] max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#f0dce5] bg-white shadow-sm">

        {/* Header */}
        <header className="border-b border-[#f0dce5] bg-white px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fdeaf1] text-xl">
              🌸
            </div>

            <div>
              <div className="flex items-center gap-2">
                <BrandLogo className="w-24" />
                <h1 className="text-lg font-bold text-[#332532]">
                  {t("chat.title")}
                </h1>
              </div>

              <p className="text-sm text-[#76566f]">
                {t("chat.subtitle")}
              </p>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

              <span className="hidden text-xs text-[#76566f] sm:block">
                {t("chat.online")}
              </span>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-[#fffafd] px-4 py-6 sm:px-6">
          <div className="mx-auto max-w-3xl space-y-5">

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 sm:max-w-[70%] ${
                    message.sender === "user"
                      ? "rounded-br-md bg-[#b76e8c] text-white"
                      : "rounded-bl-md bg-[#f5f0fb] text-[#4d3a4a]"
                  }`}
                >
                  {message.sender === "assistant" && (
                    <BrandLogo className="mb-2 w-20" />
                  )}

                  <p className="whitespace-pre-wrap text-sm leading-6">
                    {message.translationKey
                      ? t(message.translationKey)
                      : message.text}
                  </p>
                </div>
              </div>
            ))}

            {/* Sending indicator */}
            {sending && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md bg-[#f5f0fb] px-4 py-3">
                  <p className="text-sm text-[#76566f]">
                    {t("chat.thinking")}
                  </p>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Suggested questions */}
        <div className="border-t border-[#f0dce5] bg-white px-4 pt-3 sm:px-6">
          <div className="mx-auto flex max-w-3xl gap-2 overflow-x-auto pb-3">
            <button
              type="button"
              onClick={() => setInput("How is my sleep?")}
              className="whitespace-nowrap rounded-full border border-[#eadce5] bg-[#fff8fb] px-3 py-2 text-xs text-[#76566f] hover:bg-[#fdeaf1]"
            >
              {t("chat.suggestedSleep")}
            </button>

            <button
              type="button"
              onClick={() => setInput("How is my mood?")}
              className="whitespace-nowrap rounded-full border border-[#eadce5] bg-[#fff8fb] px-3 py-2 text-xs text-[#76566f] hover:bg-[#fdeaf1]"
            >
              {t("chat.suggestedMood")}
            </button>

            <button
              type="button"
              onClick={() => setInput("Tell me about my cycle")}
              className="whitespace-nowrap rounded-full border border-[#eadce5] bg-[#fff8fb] px-3 py-2 text-xs text-[#76566f] hover:bg-[#fdeaf1]"
            >
              {t("chat.suggestedCycle")}
            </button>

            <button
              type="button"
              onClick={() => setInput("How is my activity?")}
              className="whitespace-nowrap rounded-full border border-[#eadce5] bg-[#fff8fb] px-3 py-2 text-xs text-[#76566f] hover:bg-[#fdeaf1]"
            >
              {t("chat.suggestedActivity")}
            </button>
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-[#f0dce5] bg-white p-4 sm:px-6">
          <div className="mx-auto flex max-w-3xl items-end gap-3">

            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t("chat.placeholder")}
              rows={1}
              disabled={sending}
              className="max-h-32min-h-[48px] flex-1 resize-none rounded-xl border border-[#eadce5] bg-[#fffafd] px-4 py-3 text-sm text-[#332532] outline-none placeholder:text-[#a18c99] focus:border-[#c58aaa]"
            />

            <button
              type="button"
              onClick={sendMessage}
              disabled={!input.trim() || sending}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#b76e8c] text-lg text-white transition hover:bg-[#a85f7d] disabled:cursor-not-allowed disabled:opacity-50"
              aria-label={t("chat.sendAriaLabel")}
            >
              ➤
            </button>

          </div>

          <p className="mx-auto mt-2 max-w-3xl text-center text-[11px] text-[#a18c99]">
            {t("chat.disclaimer")}
          </p>
        </div>

      </div>
    </main>
  );
}