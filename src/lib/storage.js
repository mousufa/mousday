// Data layer for My Little Diary.
// Everything is persisted to localStorage, structured so it can later be
// exported as JSON or swapped for a real backend with minimal changes.

const KEYS = {
  entries: "mld:entries", // { [dateKey: "YYYY-MM-DD"]: Entry }
  settings: "mld:settings", // { name: string }
  version: "mld:schemaVersion",
};

const SCHEMA_VERSION = 1;

const DEFAULT_SETTINGS = {
  name: "Friend",
};

/**
 * Entry shape:
 * {
 *   date: "YYYY-MM-DD",
 *   mood: 1-5 | null,
 *   journal: string,
 *   learned: string,
 *   applyTomorrow: string,
 *   createdAt: ISOString,
 *   updatedAt: ISOString,
 * }
 */

function safeParse(raw, fallback) {
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function ensureVersion() {
  const v = localStorage.getItem(KEYS.version);
  if (!v) {
    localStorage.setItem(KEYS.version, String(SCHEMA_VERSION));
  }
}

export function todayKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function dateKeyToDate(key) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function addDaysToKey(key, delta) {
  const d = dateKeyToDate(key);
  d.setDate(d.getDate() + delta);
  return todayKey(d);
}

export function getAllEntries() {
  ensureVersion();
  return safeParse(localStorage.getItem(KEYS.entries), {});
}

export function getEntry(dateKey) {
  const all = getAllEntries();
  return all[dateKey] || null;
}

export function saveEntry(dateKey, patch) {
  const all = getAllEntries();
  const existing = all[dateKey];
  const now = new Date().toISOString();
  const merged = {
    date: dateKey,
    mood: null,
    journal: "",
    learned: "",
    applyTomorrow: "",
    createdAt: existing?.createdAt || now,
    ...existing,
    ...patch,
    updatedAt: now,
  };
  all[dateKey] = merged;
  localStorage.setItem(KEYS.entries, JSON.stringify(all));
  return merged;
}

export function deleteEntry(dateKey) {
  const all = getAllEntries();
  delete all[dateKey];
  localStorage.setItem(KEYS.entries, JSON.stringify(all));
}

export function getYesterdaysApplyNote(dateKey) {
  const yKey = addDaysToKey(dateKey, -1);
  const yEntry = getEntry(yKey);
  return yEntry?.applyTomorrow?.trim() ? yEntry.applyTomorrow : "";
}

export function getSettings() {
  return { ...DEFAULT_SETTINGS, ...safeParse(localStorage.getItem(KEYS.settings), {}) };
}

export function saveSettings(patch) {
  const merged = { ...getSettings(), ...patch };
  localStorage.setItem(KEYS.settings, JSON.stringify(merged));
  return merged;
}

export function searchEntries(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const all = getAllEntries();
  return Object.values(all)
    .filter((e) => {
      const haystack = `${e.journal} ${e.learned} ${e.applyTomorrow}`.toLowerCase();
      return haystack.includes(q);
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function exportAllData() {
  return {
    schemaVersion: SCHEMA_VERSION,
    exportedAt: new Date().toISOString(),
    settings: getSettings(),
    entries: getAllEntries(),
  };
}

export function downloadExport() {
  const data = exportAllData();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `my-little-diary-export-${todayKey()}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export const MOODS = [
  { value: 1, label: "Tired", emoji: "😴", color: "#C9B8D8" },
  { value: 2, label: "Low", emoji: "🥺", color: "#B9C6E6" },
  { value: 3, label: "Okay", emoji: "🙂", color: "#FFD6E8" },
  { value: 4, label: "Good", emoji: "😊", color: "#FFB6C1" },
  { value: 5, label: "Great", emoji: "🥰", color: "#FF8FAB" },
];

export function getMood(value) {
  return MOODS.find((m) => m.value === value) || null;
}
