import { motion } from "framer-motion";
import { MOODS } from "../lib/storage";

export default function MoodPicker({ value, onChange }) {
  return (
    <div className="flex items-center justify-between gap-2 sm:gap-3">
      {MOODS.map((m) => {
        const active = value === m.value;
        return (
          <motion.button
            key={m.value}
            type="button"
            onClick={() => onChange(active ? null : m.value)}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.94 }}
            className={`flex flex-1 flex-col items-center gap-1.5 rounded-2xl border py-3 transition-colors ${
              active
                ? "border-blush-700 bg-blush-200 shadow-dreamy"
                : "border-blush-200 bg-white/70 hover:bg-blush-100"
            }`}
          >
            <span className="text-2xl leading-none">{m.emoji}</span>
            <span
              className={`font-rounded text-[11px] sm:text-xs ${
                active ? "text-blush-800 font-semibold" : "text-stone-400"
              }`}
            >
              {m.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
