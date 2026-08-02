"use client";

import { useEffect } from "react";

const CHAT_TARGET = "#n8n-chat";
const CHAT_WEBHOOK_URL =
  "https://n8n.vbn8n.online/webhook/6d980824-275a-4661-a8cb-f2744358a760/chat";

export default function ChatWidget() {
  useEffect(() => {
    const target = document.querySelector(CHAT_TARGET);
    if (!target) return;

    target.replaceChildren();
    let mounted = true;
    let chat: { unmount: () => void } | undefined;
    let observer: MutationObserver | undefined;

    void import("@n8n/chat").then(({ createChat }) => {
      if (!mounted) return;

      chat = createChat({
        webhookUrl: CHAT_WEBHOOK_URL,
        target: CHAT_TARGET,
        mode: "window",
        showWindowCloseButton: true,
        showWelcomeScreen: false,
        loadPreviousSession: false,
        enableStreaming: true,
        allowFileUploads: false,
        initialMessages: [
          "Здравствуйте! Я ИИ-помощник Василия. Расскажите, какую задачу вы хотите автоматизировать или задайте свой вопрос.",
        ],
        metadata: {
          source: "website",
          site: "autobiz-vb.github.io",
        },
        i18n: {
          en: {
            title: "ИИ-консультант",
            subtitle: "Задайте вопрос об автоматизации — отвечу в чате.",
            footer: "Ответы формирует ИИ",
            getStarted: "Начать диалог",
            inputPlaceholder: "Напишите ваш вопрос…",
            closeButtonTooltip: "Закрыть чат",
          },
        },
      });

      const labelToggle = () => {
        const toggle = target.querySelector<HTMLElement>(".chat-window-toggle");
        if (!toggle) return;
        toggle.setAttribute("aria-label", "Открыть ИИ-консультанта");
        toggle.setAttribute("role", "button");
        toggle.setAttribute("tabindex", "0");
        if (toggle.dataset.keyboardReady) return;
        toggle.dataset.keyboardReady = "true";
        toggle.addEventListener("keydown", (event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          toggle.click();
        });
      };
      observer = new MutationObserver(labelToggle);
      observer.observe(target, { childList: true, subtree: true });
      labelToggle();
    });

    return () => {
      mounted = false;
      observer?.disconnect();
      chat?.unmount();
      target.replaceChildren();
    };
  }, []);

  return <div id="n8n-chat" aria-label="Чат с ИИ-консультантом" />;
}
