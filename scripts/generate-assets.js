/**
 * Generates favicon PNGs (16, 32, 48, 180) and the 1200x630 social share
 * image (og-image.png) from the logo icon.
 * Run: node scripts/generate-assets.js
 * Requires: public/logo.png (logo icon) to exist.
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');
const iconPath = path.join(publicDir, 'logo.png');

async function generateFavicons() {
  const sizes = [
    [16, 'favicon-16x16.png'],
    [32, 'favicon-32x32.png'],
    [48, 'favicon-48x48.png'],
    [180, 'apple-touch-icon.png'],
  ];
  for (const [size, name] of sizes) {
    const outPath = path.join(publicDir, name);
    await sharp(iconPath)
      .resize(size, size)
      .png()
      .toFile(outPath);
    console.log('Written', outPath);
  }
}

async function generateOgImage() {
  const W = 1200;
  const H = 630;
  const font = "'Noto Sans', 'DejaVu Sans', Arial, sans-serif";
  const svg = `
  <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#050a18"/>
        <stop offset="0.55" stop-color="#0a1628"/>
        <stop offset="1" stop-color="#140a2e"/>
      </linearGradient>
      <linearGradient id="hl" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#22d3ee"/>
        <stop offset="0.5" stop-color="#60a5fa"/>
        <stop offset="1" stop-color="#a855f7"/>
      </linearGradient>
      <radialGradient id="glowC" cx="0.15" cy="0.2" r="0.5">
        <stop offset="0" stop-color="#22d3ee" stop-opacity="0.22"/>
        <stop offset="1" stop-color="#22d3ee" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="glowP" cx="0.9" cy="0.85" r="0.55">
        <stop offset="0" stop-color="#a855f7" stop-opacity="0.25"/>
        <stop offset="1" stop-color="#a855f7" stop-opacity="0"/>
      </radialGradient>
      <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M60 0H0V60" fill="none" stroke="#22d3ee" stroke-opacity="0.06"/>
      </pattern>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <rect width="${W}" height="${H}" fill="url(#grid)"/>
    <rect width="${W}" height="${H}" fill="url(#glowC)"/>
    <rect width="${W}" height="${H}" fill="url(#glowP)"/>
    <rect x="0" y="0" width="${W}" height="6" fill="url(#hl)"/>

    <text x="250" y="118" font-family="${font}" font-size="34" font-weight="700" letter-spacing="6" fill="#ffffff">AGENTIX</text>
    <text x="252" y="152" font-family="${font}" font-size="18" font-weight="600" letter-spacing="9" fill="#94a3b8">VANGUARD</text>

    <text x="80" y="300" font-family="${font}" font-size="64" font-weight="800" fill="#ffffff">Integramos IA Agéntica</text>
    <text x="80" y="380" font-family="${font}" font-size="64" font-weight="800" fill="url(#hl)">en toda tu operación</text>
    <text x="80" y="450" font-family="${font}" font-size="26" fill="#94a3b8">Sistemas multi-agente autónomos · Hybrid RAG · Edge IoT</text>

    <rect x="80" y="505" width="320" height="58" rx="14" fill="#06b6d4"/>
    <text x="240" y="542" text-anchor="middle" font-family="${font}" font-size="22" font-weight="700" fill="#ffffff">Agenda tu auditoría →</text>
    <text x="430" y="542" font-family="${font}" font-size="22" fill="#64748b">agentixvanguard.com</text>
  </svg>`;

  const logo = await sharp(iconPath).resize(130, 130, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  const outPath = path.join(publicDir, 'og-image.png');
  await sharp(Buffer.from(svg))
    .composite([{ input: logo, left: 90, top: 50 }])
    .png()
    .toFile(outPath);
  console.log('Written', outPath);
}

async function main() {
  if (!fs.existsSync(iconPath)) {
    console.error('Missing public/logo.png. Aborting.');
    process.exit(1);
  }
  await generateFavicons();
  await generateOgImage();
  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
