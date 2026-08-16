import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { getMood, searchEntries } from "../lib/storage";

export default function Search({ onOpenDate }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchEntries(query), [query]);

  function highlight(text) {
    if (!text) return "";
    const q = query.trim();
    if (!q) return text;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text.slice(0, 120);
    const start = Math.max(0, idx - 40);
    const end = Math.min(text.length, idx + q.length + 60);
    return `${start > 0 ? "…" : ""}${text.slice(start, end)}${end < text.length ? "…" : ""}`;
  }

  return (
    <div className="mx-auto w-full max-w-lg px-5 pb-32 pt-8">
      <h2 className="mb-1 text-center font-display text-3xl font-semibold text-stone-800">Search</h2>
      <p className="mb-6 text-center font-rounded text-sm text-stone-400">Find a memory, a lesson, a moment.</p>

      <div className="relative mb-6">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-blush-400">🔍</span>
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search your diary…"
          className="w-full rounded-full border border-blush-200 bg-white/80 py-3 pl-11 pr-4 font-body text-sm text-stone-700 shadow-dreamy placeholder:text-stone-300"
        />
      </div>

      {query.trim() === "" ? (
        <p className="rounded-2xl border border-dashed border-blush-200 bg-white/50 p-6 text-center font-rounded text-sm text-stone-400">
          Start typing to search across all your entries ✨
        </p>
      ) : results.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-blush-200 bg-white/50 p-6 text-center font-rounded text-sm text-stone-400">
          No entries found for "{query}"
        </p>
      ) : (
        <ul className="space-y-2">
          {results.map((e) => {
            const mood = e.mood ? getMood(e.mood) : null;
            const snippet = highlight(e.journal) || highlight(e.learned) || highlight(e.applyTomorrow);
            return (
              <motion.li key={e.date} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <button
                  onClick={() => onOpenDate(e.date)}
                  className="flex w-full items-start gap-3 rounded-2xl border border-blush-100 bg-white/70 px-4 py-3 text-left shadow-sm"
                >
                  <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-blush-100 text-lg">
                    {mood?.emoji ?? "📝"}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-rounded text-sm font-medium text-stone-700">
                      {new Date(e.date).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    <span className="mt-0.5 block font-body text-xs leading-relaxed text-stone-400">{snippet}</span>
                  </span>
                </button>
              </motion.li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
