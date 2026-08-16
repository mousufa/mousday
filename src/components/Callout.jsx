// Visually distinct highlight/callout card used for "What I Learned Today"
// and "What to Apply Tomorrow" sections.
export default function Callout({ icon, title, tone = "learned", children, footer }) {
  const tones = {
    learned: {
      wrap: "bg-gradient-to-br from-amber-50 to-blush-100 border-amber-200",
      badge: "bg-amber-200/70 text-amber-700",
      title: "text-amber-800",
    },
    apply: {
      wrap: "bg-gradient-to-br from-blush-100 to-blush-200 border-blush-300",
      badge: "bg-blush-300/70 text-blush-800",
      title: "text-blush-800",
    },
  };
  const t = tones[tone];

  return (
    <div className={`rounded-3xl border p-5 shadow-dreamy ${t.wrap}`}>
      <div className="mb-2 flex items-center gap-2">
        <span className={`grid h-8 w-8 place-items-center rounded-full text-base ${t.badge}`}>{icon}</span>
        <h3 className={`font-rounded text-sm font-semibold tracking-wide ${t.title}`}>{title}</h3>
      </div>
      {children}
      {footer}
    </div>
  );
}
