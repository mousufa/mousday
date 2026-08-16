import { useMemo } from "react";
import { motion } from "framer-motion";

// Subtle floating hearts/sparkles decorating a screen's background.
export default function SparkleField({ count = 10 }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 8 + Math.random() * 12,
        duration: 5 + Math.random() * 5,
        delay: Math.random() * 4,
        kind: Math.random() > 0.5 ? "heart" : "sparkle",
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((it) => (
        <motion.span
          key={it.id}
          className="absolute text-blush-300/70"
          style={{ left: `${it.left}%`, top: `${it.top}%`, fontSize: it.size }}
          animate={{ y: [0, -18, 0], opacity: [0.25, 0.7, 0.25] }}
          transition={{ duration: it.duration, delay: it.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          {it.kind === "heart" ? "♥" : "✦"}
        </motion.span>
      ))}
    </div>
  );
}
