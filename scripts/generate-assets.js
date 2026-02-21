/**
 * Generates favicon PNGs (16, 32, 48, 180) from the logo icon.
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

async function main() {
  if (!fs.existsSync(iconPath)) {
    console.error('Missing public/logo.png. Aborting.');
    process.exit(1);
  }
  await generateFavicons();
  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
