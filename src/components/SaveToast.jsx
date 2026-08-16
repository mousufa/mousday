import { AnimatePresence, motion } from "framer-motion";

export default function SaveToast({ show, text = "Saved ♡" }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ type: "spring", bounce: 0.4, duration: 0.5 }}
          className="fixed bottom-44 left-1/2 z-50 -translate-x-1/2 rounded-full bg-blush-700 px-5 py-2.5 text-sm font-rounded font-medium text-white shadow-soft"
        >
          {text}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
