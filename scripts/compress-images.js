#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * One-shot image compression for /public assets that Lighthouse flagged as
 * oversized. Resizes JPGs to MAX_WIDTH (keeping aspect) and re-encodes them
 * with mozjpeg at QUALITY. Idempotent — files already at or under MAX_WIDTH
 * are still re-encoded but won't grow.
 *
 * Run:  node scripts/compress-images.js
 *       node scripts/compress-images.js --dry      (preview only)
 *
 * Skipped:  logos, icons, .svg, .ico — anything in PROTECTED. Add filenames
 * there if a re-encode would damage a brand asset.
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..', 'public');
const MAX_WIDTH = 800;
const QUALITY = 80;
const DRY = process.argv.includes('--dry');

// Filenames or path fragments that must never be re-encoded.
const PROTECTED = [
  'logo.png',
  'logo1.png',
  'favicon',
  'icon.png',
  'fb.png',
  'insta.png',
  'google.png',
  '2018.png',
  '2021.png',
  '2022.png',
  '2023.png',
  '2024.png',
  '2025.png',
];

const isProtected = (file) =>
  PROTECTED.some((p) => file.toLowerCase().includes(p.toLowerCase()));

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

function fmt(bytes) {
  return (bytes / 1024).toFixed(1) + ' KiB';
}

async function processOne(file) {
  const ext = path.extname(file).toLowerCase();
  if (!['.jpg', '.jpeg'].includes(ext)) return null;
  if (isProtected(file)) return null;

  const buf = await fs.promises.readFile(file);
  const meta = await sharp(buf).metadata();
  if (!meta.width || !meta.height) return null;

  const targetWidth = Math.min(meta.width, MAX_WIDTH);
  const willResize = meta.width > MAX_WIDTH;

  const outBuf = await sharp(buf)
    .resize({ width: targetWidth, withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true, progressive: true })
    .toBuffer();

  const before = buf.length;
  const after = outBuf.length;
  if (after >= before) return { file, before, after, skipped: 'no-gain' };

  if (!DRY) await fs.promises.writeFile(file, outBuf);
  return { file, before, after, resized: willResize, from: meta.width, to: targetWidth };
}

(async () => {
  console.log(`Scanning ${ROOT} (max ${MAX_WIDTH}px, q=${QUALITY}, mozjpeg)…`);
  if (DRY) console.log('[DRY RUN] No files will be written.');

  let totalBefore = 0;
  let totalAfter = 0;
  let touched = 0;
  let skipped = 0;

  for (const file of walk(ROOT)) {
    let result;
    try {
      result = await processOne(file);
    } catch (err) {
      console.error('!! Error on', file, err.message);
      continue;
    }
    if (!result) continue;

    totalBefore += result.before;
    if (result.skipped) {
      skipped += 1;
      continue;
    }
    totalAfter += result.after;
    touched += 1;

    const rel = path.relative(ROOT, result.file);
    const savedKb = ((result.before - result.after) / 1024).toFixed(1);
    const resizeNote = result.resized ? `  (${result.from}→${result.to}w)` : '';
    console.log(
      `  ${rel.padEnd(40)} ${fmt(result.before)} → ${fmt(result.after)}  (-${savedKb} KiB)${resizeNote}`,
    );
  }

  console.log('');
  console.log(`Touched: ${touched}, Skipped (no gain): ${skipped}`);
  console.log(`Total: ${fmt(totalBefore)} → ${fmt(totalAfter)}`);
  console.log(`Saved: ${fmt(totalBefore - totalAfter)}`);
})();
