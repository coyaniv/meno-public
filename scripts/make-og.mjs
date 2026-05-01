import sharp from "sharp";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const PROJECT = "/Users/yaniv/Documents/workspace/meno-public";
const logoPath = resolve(PROJECT, "public/logo.png");
const outPath = resolve(PROJECT, "public/og-image.png");

const logoB64 = readFileSync(logoPath).toString("base64");
const logoDataUri = `data:image/png;base64,${logoB64}`;

const W = 1200;
const H = 630;
const FONT = "-apple-system, 'Segoe UI', Arial, 'Noto Sans Hebrew', 'Heebo', 'Assistant', sans-serif";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="${W}" y2="${H}" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#FFFCFA"/>
      <stop offset="0.55" stop-color="#F5E8DD"/>
      <stop offset="1" stop-color="#E8D6E0"/>
    </linearGradient>
    <radialGradient id="glowPink" cx="0.08" cy="0.92" r="0.55">
      <stop offset="0" stop-color="#E91E8C" stop-opacity="0.10"/>
      <stop offset="1" stop-color="#E91E8C" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowPurple" cx="0.92" cy="0.08" r="0.55">
      <stop offset="0" stop-color="#5C3D6E" stop-opacity="0.14"/>
      <stop offset="1" stop-color="#5C3D6E" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="brandStripe" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#5C3D6E"/>
      <stop offset="0.5" stop-color="#A88CB8"/>
      <stop offset="1" stop-color="#E91E8C"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glowPink)"/>
  <rect width="${W}" height="${H}" fill="url(#glowPurple)"/>

  <!-- Top brand stripe -->
  <rect x="0" y="0" width="${W}" height="6" fill="url(#brandStripe)"/>

  <!-- Logo + Meno wordmark, centered horizontally -->
  <g transform="translate(${W / 2}, 90)">
    <image href="${logoDataUri}" x="-110" y="0" width="80" height="80" preserveAspectRatio="xMidYMid meet"/>
    <text x="-15" y="56" font-family="${FONT}" font-size="48" font-weight="800" fill="#372937" letter-spacing="-1" text-anchor="start">Meno</text>
  </g>

  <!-- Title — centered, two lines -->
  <text x="${W / 2}" y="266" text-anchor="middle" font-family="${FONT}" font-size="60" font-weight="800" fill="#372937" letter-spacing="-1.5">אפליקציה בעברית למעקב אחרי תסמיני</text>
  <text x="${W / 2}" y="338" text-anchor="middle" font-family="${FONT}" font-size="60" font-weight="800" fill="#5C3D6E" letter-spacing="-1.5">גיל המעבר ופרימנופאוזה</text>

  <!-- Subtitle — centered, two lines -->
  <text x="${W / 2}" y="412" text-anchor="middle" font-family="${FONT}" font-size="26" font-weight="500" fill="#6A5B75">עקבי אחרי תסמינים, מחזור, שינה וטיפול</text>
  <text x="${W / 2}" y="447" text-anchor="middle" font-family="${FONT}" font-size="26" font-weight="500" fill="#6A5B75">— וראי דפוסים לאורך זמן.</text>

  <!-- Decorative chip row -->
  <g transform="translate(${W / 2}, 510)">
    <g transform="translate(-310, 0)">
      <rect x="0" y="0" width="100" height="40" rx="20" fill="rgba(92, 61, 110, 0.10)" stroke="rgba(92, 61, 110, 0.20)"/>
      <text x="50" y="26" font-family="${FONT}" font-size="17" font-weight="600" fill="#5C3D6E" text-anchor="middle">גלי חום</text>
    </g>
    <g transform="translate(-200, 0)">
      <rect x="0" y="0" width="80" height="40" rx="20" fill="rgba(92, 61, 110, 0.10)" stroke="rgba(92, 61, 110, 0.20)"/>
      <text x="40" y="26" font-family="${FONT}" font-size="17" font-weight="600" fill="#5C3D6E" text-anchor="middle">שינה</text>
    </g>
    <g transform="translate(-110, 0)">
      <rect x="0" y="0" width="100" height="40" rx="20" fill="rgba(92, 61, 110, 0.10)" stroke="rgba(92, 61, 110, 0.20)"/>
      <text x="50" y="26" font-family="${FONT}" font-size="17" font-weight="600" fill="#5C3D6E" text-anchor="middle">מצב רוח</text>
    </g>
    <g transform="translate(0, 0)">
      <rect x="0" y="0" width="90" height="40" rx="20" fill="rgba(92, 61, 110, 0.10)" stroke="rgba(92, 61, 110, 0.20)"/>
      <text x="45" y="26" font-family="${FONT}" font-size="17" font-weight="600" fill="#5C3D6E" text-anchor="middle">דימום</text>
    </g>
    <g transform="translate(100, 0)">
      <rect x="0" y="0" width="120" height="40" rx="20" fill="rgba(92, 61, 110, 0.10)" stroke="rgba(92, 61, 110, 0.20)"/>
      <text x="60" y="26" font-family="${FONT}" font-size="17" font-weight="600" fill="#5C3D6E" text-anchor="middle">תרופות</text>
    </g>
    <g transform="translate(230, 0)">
      <rect x="0" y="0" width="80" height="40" rx="20" fill="rgba(92, 61, 110, 0.10)" stroke="rgba(92, 61, 110, 0.20)"/>
      <text x="40" y="26" font-family="${FONT}" font-size="17" font-weight="600" fill="#5C3D6E" text-anchor="middle">שינויים</text>
    </g>
  </g>

  <!-- Bottom-right URL pill -->
  <g transform="translate(${W - 260}, 575)">
    <rect x="0" y="0" width="220" height="38" rx="19" fill="rgba(92, 61, 110, 0.08)" stroke="rgba(92, 61, 110, 0.18)"/>
    <text x="110" y="25" font-family="${FONT}" font-size="17" font-weight="600" fill="#5C3D6E" text-anchor="middle">menoapp.health</text>
  </g>
</svg>`;

await sharp(Buffer.from(svg), { density: 144 })
  .resize(W, H, { fit: "contain", background: "#FFFCFA" })
  .png({ compressionLevel: 9, palette: false })
  .toFile(outPath);

const meta = await sharp(outPath).metadata();
const stats = readFileSync(outPath);
console.log(`Output: ${meta.width}x${meta.height}, ${(stats.length / 1024).toFixed(1)} KB`);
