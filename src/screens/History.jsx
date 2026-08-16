import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { getAllEntries, getMood, todayKey } from "../lib/storage";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

function pad(n) {
  return String(n).padStart(2, "0");
}
function keyFor(y, m, d) {
  return `${y}-${pad(m + 1)}-${pad(d)}`;
}

export default function History({ onOpenDate }) {
  const [cursor, setCursor] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });

  const entries = useMemo(() => getAllEntries(), []);
  const today = todayKey();

  const { year, month } = cursor;
  const firstOfMonth = new Date(year, month, 1);
  const startWeekday = firstOfMonth.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const monthLabel = firstOfMonth.toLocaleDateString(undefined, { month: "long", year: "numeric" });

  function changeMonth(delta) {
    let m = month + delta;
    let y = year;
    if (m < 0) {
      m = 11;
      y -= 1;
    } else if (m > 11) {
      m = 0;
      y += 1;
    }
    setCursor({ year: y, month: m });
  }

  const recent = useMemo(
    () =>
      Object.values(entries)
        .sort((a, b) => (a.date < b.date ? 1 : -1))
        .slice(0, 30),
    [entries]
  );

  return (
    <div className="mx-auto w-full max-w-lg px-5 pb-32 pt-8">
      <h2 className="mb-1 text-center font-display text-3xl font-semibold text-stone-800">Your Diary</h2>
      <p className="mb-6 text-center font-rounded text-sm text-stone-400">Every little day, kept safe.</p>

      <div className="rounded-3xl border border-blush-200 bg-white/70 p-5 shadow-dreamy">
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={() => changeMonth(-1)}
            className="grid h-8 w-8 place-items-center rounded-full bg-blush-100 text-blush-700"
            aria-label="Previous month"
          >
            ‹
          </button>
          <h3 className="font-rounded text-sm font-semibold text-blush-800">{monthLabel}</h3>
          <button
            onClick={() => changeMonth(1)}
            className="grid h-8 w-8 place-items-center rounded-full bg-blush-100 text-blush-700"
            aria-label="Next month"
          >
            ›
          </button>
        </div>

        <div className="mb-2 grid grid-cols-7 gap-1 text-center">
          {WEEKDAYS.map((w, i) => (
            <span key={i} className="font-rounded text-[11px] font-semibold text-stone-300">
              {w}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {cells.map((d, i) => {
            if (d === null) return <div key={i} />;
            const key = keyFor(year, month, d);
            const entry = entries[key];
            const mood = entry?.mood ? getMood(entry.mood) : null;
            const isToday = key === today;
            return (
              <motion.button
                key={i}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => onOpenDate(key)}
                className={`relative flex aspect-square flex-col items-center justify-center rounded-xl text-xs font-rounded ${
                  isToday ? "bg-blush-600 text-white font-semibold" : entry ? "bg-blush-100 text-blush-800" : "text-stone-400 hover:bg-blush-50"
                }`}
              >
                {d}
                {mood && !isToday && (
                  <span className="absolute bottom-1 h-1.5 w-1.5 rounded-full" style={{ backgroundColor: mood.color }} />
                )}
                {entry && isToday && <span className="absolute bottom-1 h-1.5 w-1.5 rounded-full bg-white" />}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="mb-3 font-rounded text-sm font-semibold text-blush-800">Recent entries</h3>
        {recent.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-blush-200 bg-white/50 p-6 text-center font-rounded text-sm text-stone-400">
            No entries yet — your story starts today ♡
          </p>
        ) : (
          <ul className="space-y-2">
            {recent.map((e) => {
              const mood = e.mood ? getMood(e.mood) : null;
              return (
                <motion.li key={e.date} whileHover={{ x: 3 }}>
                  <button
                    onClick={() => onOpenDate(e.date)}
                    className="flex w-full items-center gap-3 rounded-2xl border border-blush-100 bg-white/70 px-4 py-3 text-left shadow-sm"
                  >
                    <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-blush-100 text-lg">
                      {mood?.emoji ?? "📝"}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-rounded text-sm font-medium text-stone-700">
                        {new Date(e.date).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
                      </span>
                      <span className="block truncate font-body text-xs text-stone-400">
                        {e.journal?.trim() || e.learned?.trim() || "No note written"}
                      </span>
                    </span>
                  </button>
                </motion.li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
