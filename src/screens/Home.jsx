import { useMemo } from "react";
import { motion } from "framer-motion";
import Mascot from "../components/Mascot";
import SparkleField from "../components/SparkleField";
import { getAllEntries, getEntry, getMood, todayKey } from "../lib/storage";
import { quoteForDate } from "../lib/quotes";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.3, duration: 0.5 } },
};

export default function Home({ name, onWriteToday, onOpenHistory }) {
  const key = todayKey();
  const todaysEntry = getEntry(key);
  const quote = quoteForDate(key);
  const dateLabel = useMemo(
    () => new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" }),
    []
  );

  const { streak, total } = useMemo(() => {
    const all = getAllEntries();
    const total = Object.keys(all).length;
    let streak = 0;
    let cursor = new Date();
    // count consecutive days with entries ending today (or yesterday if today not yet written)
    if (!all[todayKey(cursor)]) cursor.setDate(cursor.getDate() - 1);
    while (all[todayKey(cursor)]) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    }
    return { streak, total };
  }, [todaysEntry]);

  const greetingHour = new Date().getHours();
  const greeting = greetingHour < 5 ? "Still up" : greetingHour < 12 ? "Good morning" : greetingHour < 18 ? "Good afternoon" : "Good evening";

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="relative flex flex-1 flex-col items-center px-5 pb-28 pt-10 text-center">
      <SparkleField count={12} />

      <motion.p variants={item} className="font-rounded text-sm font-medium tracking-wide text-blush-700">
        {greeting},
      </motion.p>
      <motion.h1 variants={item} className="mt-1 font-display text-4xl font-semibold text-stone-800 sm:text-5xl">
        {name} <span className="text-blush-600">♡</span>
      </motion.h1>
      <motion.p variants={item} className="mt-2 font-rounded text-sm text-stone-400">
        {dateLabel}
      </motion.p>

      <motion.div variants={item} className="relative z-10 mx-auto mt-4 h-56 w-56 sm:h-64 sm:w-64">
        <Mascot mood={todaysEntry ? "happy" : "writing"} />
      </motion.div>

      {(streak > 0 || total > 0) && (
        <motion.div variants={item} className="mt-2 flex items-center gap-3 font-rounded text-xs text-stone-400">
          {streak > 0 && (
            <span className="rounded-full bg-blush-100 px-3 py-1 text-blush-700">🔥 {streak}-day streak</span>
          )}
          {total > 0 && <span className="rounded-full bg-blush-100 px-3 py-1 text-blush-700">📔 {total} entries</span>}
        </motion.div>
      )}

      <motion.div variants={item} className="mt-6 max-w-sm rounded-3xl border border-blush-200 bg-white/70 px-5 py-4 shadow-dreamy backdrop-blur-sm">
        <p className="font-display text-base italic leading-relaxed text-stone-600">"{quote}"</p>
      </motion.div>

      <motion.button
        variants={item}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
        onClick={onWriteToday}
        className="mt-8 flex items-center gap-2 rounded-full bg-gradient-to-r from-blush-600 to-blush-700 px-8 py-3.5 font-rounded text-base font-semibold text-white shadow-soft"
      >
        {todaysEntry ? "Continue today's entry" : "Write today's entry"}
        <span aria-hidden>✍️</span>
      </motion.button>

      {todaysEntry?.mood && (
        <motion.p variants={item} className="mt-3 font-rounded text-xs text-stone-400">
          Today you're feeling {getMood(todaysEntry.mood)?.emoji} {getMood(todaysEntry.mood)?.label.toLowerCase()}
        </motion.p>
      )}

      <motion.button
        variants={item}
        onClick={onOpenHistory}
        className="mt-4 font-rounded text-xs font-medium text-blush-600 underline decoration-blush-300 decoration-2 underline-offset-4"
      >
        Browse past entries
      </motion.button>
    </motion.div>
  );
}
