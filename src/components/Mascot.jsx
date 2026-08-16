import { motion } from "framer-motion";

// A simple, soft, hand-drawn (CSS/SVG) chibi mascot — round face, big eyes,
// twin tails, small dress. She holds a little book and gives a gentle wave.
// `mood` softly changes her expression: "happy" (default) | "sleepy" | "writing"
export default function Mascot({ className = "", mood = "happy" }) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 240 260" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="mascotGlow" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#FFF0F5" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFD6E8" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hairGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF8FAB" />
            <stop offset="100%" stopColor="#E85D89" />
          </linearGradient>
          <linearGradient id="dressGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFC1DB" />
            <stop offset="100%" stopColor="#FFB6C1" />
          </linearGradient>
        </defs>

        <ellipse cx="120" cy="130" rx="110" ry="110" fill="url(#mascotGlow)" />

        {/* twin tails */}
        <motion.path
          d="M55 110 C20 100 15 150 35 175 C45 188 65 182 62 160 C60 145 58 128 55 110 Z"
          fill="url(#hairGrad)"
          animate={{ rotate: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "55px 115px" }}
        />
        <motion.path
          d="M185 110 C220 100 225 150 205 175 C195 188 175 182 178 160 C180 145 182 128 185 110 Z"
          fill="url(#hairGrad)"
          animate={{ rotate: [0, 4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          style={{ transformOrigin: "185px 115px" }}
        />

        {/* body / dress */}
        <path
          d="M85 165 C85 150 100 140 120 140 C140 140 155 150 155 165 L168 230 C168 240 155 248 120 248 C85 248 72 240 72 230 Z"
          fill="url(#dressGrad)"
        />
        <path d="M100 165 L120 185 L140 165 L150 200 L90 200 Z" fill="#FFF0F5" opacity="0.7" />

        {/* arms */}
        <path d="M85 172 C68 178 58 195 60 210" stroke="#FFC1DB" strokeWidth="14" strokeLinecap="round" fill="none" />
        <motion.g
          animate={{ rotate: [0, 18, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "158px 172px" }}
        >
          <path d="M158 172 C176 176 188 190 186 206" stroke="#FFC1DB" strokeWidth="14" strokeLinecap="round" fill="none" />
        </motion.g>

        {/* little book */}
        <g transform="translate(50 198) rotate(-8)">
          <rect x="0" y="0" width="34" height="24" rx="3" fill="#FFFBF7" stroke="#FF8FAB" strokeWidth="2" />
          <line x1="17" y1="2" x2="17" y2="22" stroke="#FFD6E8" strokeWidth="2" />
        </g>

        {/* head */}
        <circle cx="120" cy="108" r="58" fill="#FFF3F7" stroke="#FFE3EE" strokeWidth="2" />

        {/* hair top */}
        <path
          d="M62 95 C58 55 90 30 120 30 C150 30 182 55 178 95 C170 80 150 70 120 72 C90 70 70 80 62 95 Z"
          fill="url(#hairGrad)"
        />
        <circle cx="88" cy="60" r="7" fill="#FF8FAB" />
        <circle cx="152" cy="60" r="7" fill="#FF8FAB" />

        {/* eyes */}
        {mood === "sleepy" ? (
          <>
            <path d="M96 112 Q104 118 112 112" stroke="#7A2E46" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M128 112 Q136 118 144 112" stroke="#7A2E46" strokeWidth="3" strokeLinecap="round" fill="none" />
          </>
        ) : (
          <>
            <ellipse cx="103" cy="112" rx="7" ry="9" fill="#5B3A4A" />
            <ellipse cx="137" cy="112" rx="7" ry="9" fill="#5B3A4A" />
            <circle cx="105.5" cy="108.5" r="2.2" fill="#fff" />
            <circle cx="139.5" cy="108.5" r="2.2" fill="#fff" />
          </>
        )}

        {/* blush */}
        <ellipse cx="86" cy="126" rx="9" ry="5" fill="#FFB6C1" opacity="0.7" />
        <ellipse cx="154" cy="126" rx="9" ry="5" fill="#FFB6C1" opacity="0.7" />

        {/* mouth */}
        <path d="M112 132 Q120 139 128 132" stroke="#C9607F" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* sparkles */}
        <motion.g
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M200 60 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 Z" fill="#FFB6C1" />
        </motion.g>
        <motion.g
          animate={{ opacity: [1, 0.3, 1], scale: [1, 0.7, 1] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        >
          <path d="M35 70 l2.4 6.2 6.2 2.4 -6.2 2.4 -2.4 6.2 -2.4 -6.2 -6.2 -2.4 6.2 -2.4 Z" fill="#FFD6E8" />
        </motion.g>
      </svg>
    </motion.div>
  );
}
