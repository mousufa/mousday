import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Callout from "../components/Callout";
import MoodPicker from "../components/MoodPicker";
import SaveToast from "../components/SaveToast";
import {
  addDaysToKey,
  dateKeyToDate,
  getEntry,
  getYesterdaysApplyNote,
  saveEntry,
  todayKey,
} from "../lib/storage";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.25, duration: 0.6 } },
};

export default function EntryEditor({ dateKey, onChangeDate }) {
  const [mood, setMood] = useState(null);
  const [journal, setJournal] = useState("");
  const [learned, setLearned] = useState("");
  const [applyTomorrow, setApplyTomorrow] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [dirty, setDirty] = useState(false);

  const key = dateKey || todayKey();
  const isToday = key === todayKey();
  const isFuture = key > todayKey();
  const yesterdayNote = getYesterdaysApplyNote(key);

  useEffect(() => {
    const e = getEntry(key);
    setMood(e?.mood ?? null);
    setJournal(e?.journal ?? "");
    setLearned(e?.learned ?? "");
    setApplyTomorrow(e?.applyTomorrow ?? "");
    setDirty(false);
  }, [key]);

  function handleSave() {
    saveEntry(key, { mood, journal, learned, applyTomorrow });
    setDirty(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1800);
  }

  const dateLabel = dateKeyToDate(key).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="mx-auto w-full max-w-lg px-5 pb-40 pt-8">
      <motion.div variants={item} className="mb-5 flex items-center justify-between">
        <button
          onClick={() => onChangeDate(addDaysToKey(key, -1))}
          className="grid h-9 w-9 place-items-center rounded-full bg-white/70 text-blush-700 shadow-dreamy"
          aria-label="Previous day"
        >
          ‹
        </button>
        <div className="text-center">
          <p className="font-rounded text-xs font-semibold uppercase tracking-widest text-blush-600">
            {isToday ? "Today" : isFuture ? "Future" : "Editing past day"}
          </p>
          <h2 className="font-display text-xl font-semibold text-stone-800">{dateLabel}</h2>
        </div>
        <button
          onClick={() => onChangeDate(addDaysToKey(key, 1))}
          className="grid h-9 w-9 place-items-center rounded-full bg-white/70 text-blush-700 shadow-dreamy disabled:opacity-30"
          aria-label="Next day"
          disabled={isFuture}
        >
          ›
        </button>
      </motion.div>

      {yesterdayNote && (
        <motion.div
          variants={item}
          className="mb-5 rounded-3xl border border-amber-200 bg-amber-50/80 px-5 py-4 shadow-dreamy"
        >
          <p className="mb-1 font-rounded text-xs font-semibold uppercase tracking-wide text-amber-700">
            ✨ From yesterday, gently carried forward
          </p>
          <p className="font-body text-sm italic leading-relaxed text-amber-800">{yesterdayNote}</p>
        </motion.div>
      )}

      <motion.section variants={item} className="mb-5 rounded-3xl border border-blush-200 bg-white/70 p-5 shadow-dreamy">
        <h3 className="mb-3 font-rounded text-sm font-semibold text-blush-800">How was your day?</h3>
        <MoodPicker
          value={mood}
          onChange={(v) => {
            setMood(v);
            setDirty(true);
          }}
        />
      </motion.section>

      <motion.section variants={item} className="mb-5 rounded-3xl border border-blush-200 bg-white/70 p-5 shadow-dreamy">
        <h3 className="mb-3 font-rounded text-sm font-semibold text-blush-800">Dear diary…</h3>
        <textarea
          value={journal}
          onChange={(e) => {
            setJournal(e.target.value);
            setDirty(true);
          }}
          placeholder="Write freely about today — the little things, the big things, all of it."
          rows={7}
          className="w-full resize-none rounded-2xl border border-blush-100 bg-blush-50/60 p-4 font-body text-sm leading-relaxed text-stone-700 placeholder:text-stone-300"
        />
      </motion.section>

      <motion.div variants={item} className="mb-5">
        <Callout icon="💡" title="What I Learned Today" tone="learned">
          <textarea
            value={learned}
            onChange={(e) => {
              setLearned(e.target.value);
              setDirty(true);
            }}
            placeholder="A small lesson, insight, or realization from today…"
            rows={3}
            className="w-full resize-none rounded-2xl border border-amber-200/70 bg-white/70 p-3 font-body text-sm leading-relaxed text-stone-700 placeholder:text-stone-300"
          />
        </Callout>
      </motion.div>

      <motion.div variants={item} className="mb-6">
        <Callout icon="🌟" title="What to Apply Tomorrow" tone="apply">
          <textarea
            value={applyTomorrow}
            onChange={(e) => {
              setApplyTomorrow(e.target.value);
              setDirty(true);
            }}
            placeholder="One thing to try, remember, or do differently tomorrow…"
            rows={3}
            className="w-full resize-none rounded-2xl border border-blush-300/70 bg-white/70 p-3 font-body text-sm leading-relaxed text-stone-700 placeholder:text-stone-300"
          />
        </Callout>
      </motion.div>

      <div className="fixed inset-x-0 bottom-24 z-20 flex justify-center px-5">
        <motion.button
          variants={item}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSave}
          className="w-full max-w-lg rounded-full bg-gradient-to-r from-blush-600 to-blush-700 py-3.5 font-rounded text-base font-semibold text-white shadow-soft"
        >
          {dirty ? "Save entry ♡" : "Saved ✓"}
        </motion.button>
      </div>

      <SaveToast show={showToast} />
    </motion.div>
  );
}
