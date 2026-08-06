"use client";

import { useEffect } from "react";

const CHAT_TARGET = "#n8n-chat";
const CHAT_WEBHOOK_URL =
  "https://n8n.vbn8n.online/webhook/6d980824-275a-4661-a8cb-f2744358a760/chat";

const QUICK_REPLY_GROUPS: Record<string, string[]> = {
  "Google Таблицы / Excel": [
    "Автоматизировать готовую таблицу",
    "Создать систему учёта",
    "Исправить формулы или скрипт",
    "Собирать отчёт автоматически",
    "Другая задача с таблицами",
  ],
  "n8n и интеграции": [
    "Связать несколько сервисов",
    "Автоматизировать заявки",
    "Обрабатывать сообщения",
    "Настроить уведомления",
    "Другая задача с n8n",
  ],
  "Чат-бот": [
    "Бот для сайта",
    "Бот для Telegram",
    "Бот для ВКонтакте",
    "Бот для нескольких каналов",
    "Пока не определился с площадкой",
  ],
  "ИИ-автоматизация": [
    "ИИ отвечает клиентам",
    "ИИ обрабатывает документы",
    "ИИ анализирует данные",
    "ИИ помогает сотрудникам",
    "Другая ИИ-задача",
  ],
  "Отчётность и учёт": [
    "Финансовый учёт",
    "Управленческая отчётность",
    "Контроль остатков и сверки",
    "Отчёты по маркетплейсам",
    "Другая задача по отчётности",
  ],
  "Не знаю — нужна консультация": [],
};

const FIRST_LEVEL_REPLIES = Object.keys(QUICK_REPLY_GROUPS);

function setTextareaValue(textarea: HTMLTextAreaElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(
    HTMLTextAreaElement.prototype,
    "value",
  )?.set;

  setter?.call(textarea, value);
  textarea.dispatchEvent(new Event("input", { bubbles: true }));
}

export default function ChatWidget() {
  useEffect(() => {
    const target = document.querySelector(CHAT_TARGET);
    if (!target) return;

    target.replaceChildren();
    let mounted = true;
    let chat: { unmount: () => void } | undefined;
    let observer: MutationObserver | undefined;
    let removeCloseButtonFix: (() => void) | undefined;
    let removeManualInputListener: (() => void) | undefined;
    let quickReplyStage: "first" | "second" | "done" = "first";
    let secondLevelReplies: string[] = [];
    let quickReplySending = false;
    let quickReplySubmit = false;
    let quickReplyPanel: HTMLDivElement | undefined;
    const quickReplyObservers = new Set<MutationObserver>();
    const quickReplyTimers = new Set<ReturnType<typeof setTimeout>>();

    const finishQuickReplies = () => {
      quickReplyStage = "done";
      quickReplySending = false;
      quickReplyPanel?.remove();
      quickReplyPanel = undefined;
    };

    const waitForAnimationFrame = () =>
      new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

    const sendQuickReply = async (label: string) => {
      const textarea = target.querySelector<HTMLTextAreaElement>(
        ".chat-input textarea",
      );
      const sendButton = target.querySelector<HTMLButtonElement>(
        ".chat-input-send-button",
      );
      if (!textarea || !sendButton || textarea.disabled) return false;

      setTextareaValue(textarea, label);
      await waitForAnimationFrame();

      if (sendButton.disabled) {
        setTextareaValue(textarea, "");
        return false;
      }

      quickReplySubmit = true;
      sendButton.click();
      quickReplySubmit = false;
      return true;
    };

    const renderQuickReplies = () => {
      if (quickReplyStage === "done") return;

      const footer = target.querySelector<HTMLElement>(".chat-footer");
      const input = footer?.querySelector<HTMLElement>(".chat-input");
      if (!footer || !input) return;

      if (!quickReplyPanel) {
        quickReplyPanel = document.createElement("div");
        quickReplyPanel.className = "chat-quick-replies";
        quickReplyPanel.setAttribute("role", "group");
        quickReplyPanel.setAttribute("aria-live", "polite");
      }

      const labels =
        quickReplyStage === "first" ? FIRST_LEVEL_REPLIES : secondLevelReplies;
      const renderKey = `${quickReplyStage}:${quickReplySending}:${labels.join("|")}`;
      quickReplyPanel.setAttribute(
        "aria-label",
        quickReplyStage === "first"
          ? "Выберите направление"
          : "Уточните задачу",
      );
      if (quickReplyPanel.dataset.renderKey === renderKey) {
        if (!quickReplyPanel.isConnected) {
          footer.insertBefore(quickReplyPanel, input);
        }
        return;
      }
      quickReplyPanel.dataset.renderKey = renderKey;
      quickReplyPanel.replaceChildren();

      for (const label of labels) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "chat-quick-reply";
        button.textContent = label;
        button.disabled = quickReplySending;
        button.addEventListener("click", async () => {
          if (quickReplySending) return;

          const previousStage = quickReplyStage;
          const previousReplies = secondLevelReplies;
          const nextReplies = QUICK_REPLY_GROUPS[label];
          quickReplySending = true;
          quickReplyPanel
            ?.querySelectorAll<HTMLButtonElement>(".chat-quick-reply")
            .forEach((quickReplyButton) => {
              quickReplyButton.disabled = true;
            });

          if (previousStage === "first" && nextReplies?.length) {
            quickReplyStage = "second";
            secondLevelReplies = nextReplies;
          } else {
            quickReplyStage = "done";
          }
          renderQuickReplies();

          const botMessagesBefore =
            target.querySelectorAll(".chat-message-from-bot").length;
          const sent = await sendQuickReply(label);
          if (!sent) {
            quickReplyStage = previousStage;
            secondLevelReplies = previousReplies;
            quickReplySending = false;
            renderQuickReplies();
            return;
          }

          if (quickReplyStage === "done") {
            finishQuickReplies();
            return;
          }

          // Следующий уровень уже виден, но повторная отправка становится
          // доступна только после ответа бота на первый выбор.
          const unlockAfterBotReply = new MutationObserver(() => {
            const botMessagesNow =
              target.querySelectorAll(".chat-message-from-bot").length;
            if (botMessagesNow <= botMessagesBefore) return;
            unlockAfterBotReply.disconnect();
            quickReplyObservers.delete(unlockAfterBotReply);
            quickReplySending = false;
            renderQuickReplies();
          });
          quickReplyObservers.add(unlockAfterBotReply);
          unlockAfterBotReply.observe(target, { childList: true, subtree: true });

          const unlockTimer = setTimeout(() => {
            quickReplyTimers.delete(unlockTimer);
            if (!quickReplyObservers.delete(unlockAfterBotReply)) return;
            unlockAfterBotReply.disconnect();
            quickReplySending = false;
            renderQuickReplies();
          }, 60_000);
          quickReplyTimers.add(unlockTimer);
        });
        quickReplyPanel.append(button);
      }

      if (!quickReplyPanel.isConnected) {
        footer.insertBefore(quickReplyPanel, input);
      }
    };

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
          "Здравствуйте! Я помогу понять, что можно автоматизировать.",
          "Выберите направление кнопкой или напишите задачу своими словами.",
        ],
        metadata: {
          source: "autobiz-vb.github.io",
          pageUrl: window.location.href,
          pagePath: window.location.pathname,
          referrer: document.referrer || "",
          utmSource:
            new URLSearchParams(window.location.search).get("utm_source") || "",
          utmMedium:
            new URLSearchParams(window.location.search).get("utm_medium") || "",
          utmCampaign:
            new URLSearchParams(window.location.search).get("utm_campaign") || "",
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

      // В текущей версии @n8n/chat кнопка в заголовке отправляет событие
      // закрытия, но оконный контейнер его не обрабатывает. Делегированный
      // обработчик использует рабочий переключатель виджета и сохраняет
      // одинаковое поведение для мыши, клавиатуры и сенсорного экрана.
      const closeFromHeader = (event: Event) => {
        const clickedElement = event.target;
        if (
          !(clickedElement instanceof Element) ||
          !clickedElement.closest(".chat-close-button")
        ) {
          return;
        }

        const toggle = target.querySelector<HTMLElement>(".chat-window-toggle");
        const chatWindow = target.querySelector<HTMLElement>(".chat-window");
        if (!toggle || !chatWindow) return;

        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        toggle.click();
      };

      target.addEventListener("click", closeFromHeader, true);
      removeCloseButtonFix = () =>
        target.removeEventListener("click", closeFromHeader, true);

      const hideRepliesAfterManualInput = (event: Event) => {
        if (quickReplyStage === "done" || quickReplySubmit) return;

        const element = event.target;
        if (!(element instanceof Element)) return;

        if (event.type === "click") {
          const sendButton = element.closest<HTMLButtonElement>(
            ".chat-input-send-button",
          );
          const textarea = target.querySelector<HTMLTextAreaElement>(
            ".chat-input textarea",
          );
          if (sendButton && !sendButton.disabled && textarea?.value.trim()) {
            finishQuickReplies();
          }
          return;
        }

        if (!(event instanceof KeyboardEvent)) return;
        const textarea = element.closest<HTMLTextAreaElement>(
          ".chat-input textarea",
        );
        if (
          textarea &&
          event.key === "Enter" &&
          !event.shiftKey &&
          !event.isComposing &&
          textarea.value.trim()
        ) {
          finishQuickReplies();
        }
      };

      target.addEventListener("click", hideRepliesAfterManualInput, true);
      target.addEventListener("keydown", hideRepliesAfterManualInput, true);
      removeManualInputListener = () => {
        target.removeEventListener("click", hideRepliesAfterManualInput, true);
        target.removeEventListener("keydown", hideRepliesAfterManualInput, true);
      };

      const labelToggle = () => {
        const toggle = target.querySelector<HTMLElement>(".chat-window-toggle");
        const closeButton =
          target.querySelector<HTMLButtonElement>(".chat-close-button");
        closeButton?.setAttribute("aria-label", "Закрыть чат");
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
      const syncWidgetEnhancements = () => {
        labelToggle();
        renderQuickReplies();
      };
      observer = new MutationObserver(syncWidgetEnhancements);
      observer.observe(target, { childList: true, subtree: true });
      syncWidgetEnhancements();
    });

    return () => {
      mounted = false;
      observer?.disconnect();
      quickReplyObservers.forEach((quickReplyObserver) =>
        quickReplyObserver.disconnect(),
      );
      quickReplyTimers.forEach((quickReplyTimer) =>
        clearTimeout(quickReplyTimer),
      );
      removeCloseButtonFix?.();
      removeManualInputListener?.();
      chat?.unmount();
      target.replaceChildren();
    };
  }, []);

  return <div id="n8n-chat" aria-label="Чат с ИИ-консультантом" />;
}
