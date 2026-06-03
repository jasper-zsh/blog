#!/usr/bin/env node
// 检测哪些中文原文缺少英文译文，或译文已过期（源文件改动后 source_hash 不匹配）。
// 不调用任何翻译 API —— 翻译由 agent 完成。本脚本只负责"列出待翻译清单"。
//
// 退出码：0 = 全部最新；1 = 有缺译/过期。
// 用法：node scripts/check-translations.js

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const CONTENT_DIR = path.join(__dirname, '..', 'content');
const TARGET_LANG = 'en';

function sha256(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

// 递归收集所有中文原文（.md 但不是 .<lang>.md 译文）
function collectSources(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...collectSources(full));
    } else if (entry.name.endsWith('.md')) {
      // 形如 name.en.md 的视为译文，跳过
      const parts = entry.name.split('.');
      const isTranslation = parts.length >= 3 && parts[parts.length - 2].length <= 5;
      if (!isTranslation) out.push(full);
    }
  }
  return out;
}

const sources = collectSources(CONTENT_DIR);
const missing = [];
const stale = [];

for (const src of sources) {
  const translation = src.replace(/\.md$/, `.${TARGET_LANG}.md`);
  if (!fs.existsSync(translation)) {
    missing.push(src);
    continue;
  }
  const m = fs.readFileSync(translation, 'utf8').match(/source_hash:\s*([a-f0-9]+)/);
  if (!m || m[1] !== sha256(src)) stale.push(src);
}

const rel = (f) => path.relative(path.join(__dirname, '..'), f);

if (missing.length === 0 && stale.length === 0) {
  console.log(`✓ 全部 ${sources.length} 篇文章的英文译文均为最新`);
  process.exit(0);
}

if (missing.length) {
  console.log('缺少译文：');
  missing.forEach((f) => console.log('  - ' + rel(f)));
}
if (stale.length) {
  console.log('译文已过期（原文改动后需重译）：');
  stale.forEach((f) => console.log('  - ' + rel(f)));
}
console.log(`\n待翻译共 ${missing.length + stale.length} 篇。翻译后请把对应 .${TARGET_LANG}.md 的 source_hash 更新为原文 sha256。`);
process.exit(1);
