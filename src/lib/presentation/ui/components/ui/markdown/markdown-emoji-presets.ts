export type MarkdownEmojiPreset = {
  emoji: string;
  label: string;
};

/** Common emojis for goals, tasks, and notes (inserted as Unicode; renders via remark-emoji). */
export const MARKDOWN_EMOJI_PRESETS: MarkdownEmojiPreset[] = [
  { emoji: "✅", label: "انجام شد" },
  { emoji: "☑️", label: "تیک" },
  { emoji: "❌", label: "رد / لغو" },
  { emoji: "⚠️", label: "هشدار" },
  { emoji: "🚫", label: "ممنوع" },
  { emoji: "📌", label: "سنجاق" },
  { emoji: "🎯", label: "هدف" },
  { emoji: "💡", label: "ایده" },
  { emoji: "📝", label: "یادداشت" },
  { emoji: "📋", label: "فهرست کار" },
  { emoji: "🔥", label: "فوری" },
  { emoji: "⭐", label: "ستاره" },
  { emoji: "🚀", label: "شروع / راه‌اندازی" },
  { emoji: "🏁", label: "پایان" },
  { emoji: "👍", label: "خوب" },
  { emoji: "👎", label: "ضعیف" },
  { emoji: "❤️", label: "علاقه" },
  { emoji: "💪", label: "تلاش" },
  { emoji: "🙏", label: "تشکر" },
  { emoji: "😊", label: "خوشحال" },
  { emoji: "🤔", label: "فکر" },
  { emoji: "💬", label: "گفتگو" },
  { emoji: "📅", label: "تاریخ" },
  { emoji: "⏰", label: "زمان" },
  { emoji: "🔗", label: "پیوند" },
  { emoji: "📎", label: "پیوست" },
  { emoji: "🛠️", label: "کار فنی" },
  { emoji: "📈", label: "پیشرفت" },
  { emoji: "📉", label: "افت" },
  { emoji: "🔔", label: "یادآور" },
  { emoji: "✨", label: "برجسته" },
  { emoji: "🌟", label: "ویژه" },
];
