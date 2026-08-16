// One-off script to generate PWA icons from public/diary-icon.svg.
import sharp from "sharp";
import { mkdirSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "..", "public");
mkdirSync(publicDir, { recursive: true });

// Full-bleed square icon with rounded diary mark centered on a blush background,
// used for the standard "any" purpose icons.
const iconSvg = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#FFB6C1"/>
  <rect x="16" y="10" width="34" height="44" rx="7" fill="#FFF0F5"/>
  <rect x="16" y="10" width="8" height="44" rx="5" fill="#FF8FAB"/>
  <path d="M35 26l3 6 6.6.9-4.8 4.6 1.3 6.6-6-3.3-6 3.3 1.3-6.6-4.8-4.6 6.6-.9z" fill="#FF8FAB"/>
</svg>`;

// Maskable icon needs the safe zone (inner ~80%) to contain all meaningful content,
// since OS masks can crop the outer ring into a circle/squircle.
const maskableSvg = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#FFB6C1"/>
  <rect x="19" y="15" width="26" height="34" rx="6" fill="#FFF0F5"/>
  <rect x="19" y="15" width="6" height="34" rx="3" fill="#FF8FAB"/>
  <path d="M35 27l2.4 5 5.4.7-3.9 3.7 1 5.4-4.9-2.7-4.9 2.7 1-5.4-3.9-3.7 5.4-.7z" fill="#FF8FAB"/>
</svg>`;

const targets = [
  { name: "pwa-64x64.png", size: 64, svg: iconSvg },
  { name: "pwa-192x192.png", size: 192, svg: iconSvg },
  { name: "pwa-512x512.png", size: 512, svg: iconSvg },
  { name: "apple-touch-icon.png", size: 180, svg: iconSvg },
  { name: "maskable-icon-512x512.png", size: 512, svg: maskableSvg },
];

for (const t of targets) {
  await sharp(Buffer.from(t.svg(t.size)))
    .resize(t.size, t.size)
    .png()
    .toFile(path.join(publicDir, t.name));
  console.log("wrote", t.name);
}
