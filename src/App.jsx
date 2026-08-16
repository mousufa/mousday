import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NavBar from "./components/NavBar";
import Home from "./screens/Home";
import EntryEditor from "./screens/EntryEditor";
import History from "./screens/History";
import Search from "./screens/Search";
import Settings from "./screens/Settings";
import { getSettings, saveSettings, todayKey } from "./lib/storage";

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

export default function App() {
  const [view, setView] = useState("home");
  const [entryDate, setEntryDate] = useState(todayKey());
  const [settings, setSettings] = useState(getSettings());

  function goToEntry(dateKey = todayKey()) {
    setEntryDate(dateKey);
    setView("entry");
  }

  function handleNavigate(id) {
    if (id === "entry") {
      goToEntry(todayKey());
    } else {
      setView(id);
    }
  }

  function handleSaveName(name) {
    const updated = saveSettings({ name });
    setSettings(updated);
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-blush-gradient">
      <div className="flex flex-1 flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={view + (view === "entry" ? entryDate : "")}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex flex-1 flex-col"
          >
            {view === "home" && (
              <Home name={settings.name} onWriteToday={() => goToEntry(todayKey())} onOpenHistory={() => setView("history")} />
            )}
            {view === "entry" && <EntryEditor dateKey={entryDate} onChangeDate={setEntryDate} />}
            {view === "history" && <History onOpenDate={goToEntry} />}
            {view === "search" && <Search onOpenDate={goToEntry} />}
            {view === "settings" && <Settings name={settings.name} onSaveName={handleSaveName} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <NavBar current={view} onNavigate={handleNavigate} />
    </div>
  );
}
