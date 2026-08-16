import { useState } from "react";
import { motion } from "framer-motion";
import Mascot from "../components/Mascot";
import { downloadExport } from "../lib/storage";

export default function Settings({ name, onSaveName }) {
  const [draft, setDraft] = useState(name);
  const [saved, setSaved] = useState(false);

  function handleSave(e) {
    e.preventDefault();
    const trimmed = draft.trim() || "Friend";
    onSaveName(trimmed);
    setDraft(trimmed);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <div className="mx-auto w-full max-w-lg px-5 pb-32 pt-8">
      <h2 className="mb-1 text-center font-display text-3xl font-semibold text-stone-800">Settings</h2>
      <p className="mb-6 text-center font-rounded text-sm text-stone-400">Make it feel like yours.</p>

      <div className="mx-auto mb-6 h-28 w-28">
        <Mascot mood="happy" />
      </div>

      <form onSubmit={handleSave} className="rounded-3xl border border-blush-200 bg-white/70 p-5 shadow-dreamy">
        <label className="mb-2 block font-rounded text-sm font-semibold text-blush-800">What should I call you?</label>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          maxLength={30}
          placeholder="Your name"
          className="mb-3 w-full rounded-2xl border border-blush-200 bg-blush-50/60 px-4 py-3 font-body text-sm text-stone-700 placeholder:text-stone-300"
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="w-full rounded-full bg-gradient-to-r from-blush-600 to-blush-700 py-3 font-rounded text-sm font-semibold text-white shadow-soft"
        >
          {saved ? "Saved ✓" : "Save name"}
        </motion.button>
      </form>

      <div className="mt-5 rounded-3xl border border-blush-200 bg-white/70 p-5 shadow-dreamy">
        <h3 className="mb-2 font-rounded text-sm font-semibold text-blush-800">Your data</h3>
        <p className="mb-3 font-body text-xs leading-relaxed text-stone-400">
          Everything is stored privately on this device only, in your browser's local storage — nothing is sent
          anywhere. You can export a full backup as JSON any time.
        </p>
        <button
          onClick={downloadExport}
          className="w-full rounded-full border border-blush-300 bg-blush-50 py-2.5 font-rounded text-sm font-medium text-blush-700"
        >
          Export as JSON ⬇
        </button>
      </div>

      <p className="mt-6 text-center font-rounded text-xs text-stone-300">My Little Diary · made softly, just for you</p>
    </div>
  );
}
