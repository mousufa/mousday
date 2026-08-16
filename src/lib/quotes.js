export const QUOTES = [
  "Small moments, gently kept, become a beautiful life.",
  "You don't have to write something profound — just something true.",
  "Today is worth remembering, even the quiet parts.",
  "Be soft with yourself. You're doing better than you think.",
  "A little reflection each day goes a long way.",
  "Your story is still being written — today's page matters too.",
  "Rest is productive. So is simply noticing your day.",
  "Every entry is a little gift to your future self.",
  "It's okay if today was ordinary. Ordinary days add up to a life.",
  "Write it down before it drifts away.",
];

export function quoteForDate(dateKey) {
  let hash = 0;
  for (let i = 0; i < dateKey.length; i++) {
    hash = (hash * 31 + dateKey.charCodeAt(i)) >>> 0;
  }
  return QUOTES[hash % QUOTES.length];
}
