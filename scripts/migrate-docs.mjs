import fs from 'node:fs';
import path from 'node:path';

const oldRoot = 'D:/Workspace/FeatBit/featbit-docs/pages';
const targetRoot = path.resolve('content/docs');
const reportPath = path.resolve('migration-inventory.md');
const mediaExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif']);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(absolute) : [absolute];
  });
}

function relative(file, root = oldRoot) {
  return path.relative(root, file).replaceAll(path.sep, '/');
}

function readMeta(dir) {
  const file = path.join(dir, '_meta.json');
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
}

function flattenMeta(meta, dir, result = []) {
  result.push({ path: relative(dir), entries: meta });
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const child = path.join(dir, entry.name);
    if (fs.existsSync(path.join(child, '_meta.json'))) flattenMeta(readMeta(child), child, result);
  }
  return result;
}

function fencedTransform(text, transform) {
  const lines = text.split(/\r?\n/);
  let fenced = false;
  return lines.map((line) => {
    if (/^\s*```/.test(line)) fenced = !fenced;
    return fenced ? line : transform(line);
  }).join('\n');
}

function titleFromHeading(text) {
  const match = text.match(/^\s*#\s+(.+?)\s*$/m);
  if (!match) return undefined;
  return match[1].replaceAll(/\[([^\]]+)\]\([^)]*\)/g, '$1').replaceAll(/[*_`]/g, '').trim();
}

function fileKey(file) {
  return path.basename(file).replace(/\.(md|mdx)$/i, '');
}

const allFiles = walk(oldRoot);
const docs = allFiles.filter((file) => /\.(md|mdx)$/i.test(file));
const contentDocs = docs.filter((file) => path.basename(file) !== '_app.mdx');
const metas = allFiles.filter((file) => path.basename(file) === '_meta.json');
const media = allFiles.filter((file) => mediaExtensions.has(path.extname(file).toLowerCase()));
const metaRecords = flattenMeta(readMeta(oldRoot), oldRoot);
const metaTitles = new Map();
for (const record of metaRecords) {
  for (const [key, value] of Object.entries(record.entries)) {
    const titleKey = [record.path, key].filter(Boolean).join('/');
    if (typeof value === 'string') metaTitles.set(titleKey, value);
    else if (value?.title) metaTitles.set(titleKey, value.title);
  }
}

const anomalies = [];
const imageRefs = [];
const internalLinks = [];
const callouts = [];
const imports = [];

for (const file of contentDocs) {
  const rel = relative(file);
  const text = fs.readFileSync(file, 'utf8');
  const heading = titleFromHeading(text);
  const key = rel.replace(/\.(md|mdx)$/i, '');
  const title = metaTitles.get(key) ?? heading;
  if (!title) anomalies.push(`- 标题待确认：\`${rel}\``);
  if (rel === 'installation/docker-compose.mdx' || rel === 'installation/terraform-aws.mdx') {
    anomalies.push(`- 计划指定人工确认标题：\`${rel}\``);
  }
  const lines = text.split(/\r?\n/);
  let fenced = false;
  for (const line of lines) {
    if (/^\s*```/.test(line)) { fenced = !fenced; continue; }
    if (fenced) continue;
    if (/nextra\/components/.test(line)) imports.push(`${rel}: ${line.trim()}`);
    for (const match of line.matchAll(/<Callout\b([^>]*)>/g)) callouts.push(`${rel}: ${match[1].trim()}`);
    for (const match of line.matchAll(/!\[[^\]]*\]\(([^)]+)\)|<img\b[^>]*\bsrc=["']([^"']+)["']/gi)) {
      imageRefs.push(`${rel}|${match[1] ?? match[2]}`);
    }
    for (const match of line.matchAll(/\]\((\/[^)#]+(?:#[^)]*)?)\)/g)) internalLinks.push(`${rel}|${match[1]}`);
  }
}

const missingImage = 'experimentation/assets/analyzing-experiments/image (127).png';
anomalies.push(`- 已知源站缺失图片：\`experimentation/analyzing-experiments.md\` 引用 \`../.gitbook/assets/image (127).png\`，迁移不创建替代文件。`);

const code = (value) => '`' + value + '`';
const report = `# 文档迁移清单\n\n生成时间：${new Date().toISOString()}\n\n## 数量\n\n- Markdown/MDX：${docs.length}（实际迁移 ${contentDocs.length}，排除 ${code('pages/_app.mdx')}）\n- Nextra 导航文件：${metas.length}\n- 可迁移媒体文件：${media.length}\n- 本地图片引用：${imageRefs.length}\n- Callout：${callouts.length}\n- 顶层 Nextra import：${imports.length}\n- 根路径内部链接：${internalLinks.length}\n\n## 内容映射\n\n旧站 ${code('pages/**/*.md{,x}')} 映射到新版 ${code('content/docs/**/*.md{,x}')}，保留目录与扩展名；${code('pages/_app.mdx')} 不迁移。\n\n## 导航映射\n\n${metaRecords.map((record) => `- ${code(`${record.path || '.'}/_meta.json`)} → ${code(record.path ? `content/docs/${record.path}/meta.json` : 'content/docs/meta.json')}（${Object.keys(record.entries).length} 项）`).join('\n')}\n\n## 代表性页面\n\n- ${code('getting-started/create-two-feature-flags.mdx')}\n- ${code('api-docs/overview.mdx')}\n- ${code('api-docs/track-insights-api.md')}\n- ${code('feature-flags/flag-lifecycle-management.mdx')}\n- ${code('integrations/observability/datadog.mdx')}\n- ${code('experimentation/analyzing-experiments.md')}\n- ${code('installation/docker-compose.mdx')}\n\n## 异常与人工确认\n\n${anomalies.join('\n')}\n\n## 迁移规则证据\n\n- Callout 类型：${[...new Set(callouts.map((value) => value.match(/type=["']([^"']+)/)?.[1]).filter(Boolean))].join(', ') || '未识别'}。\n- 代码围栏内的 import、export、JSX 和链接不参与转换。\n- 图片保持源站相对目录，不压缩、不重命名、不转换格式。\n- 根路径内部链接将增加 ${code('/docs')} 前缀；外部链接不改写。\n`;

if (process.argv.includes('--inventory')) {
  fs.writeFileSync(reportPath, report);
  console.log(report);
  process.exit(0);
}

function getTitleFor(file) {
  const rel = relative(file).replace(/\.(md|mdx)$/i, '');
  return metaTitles.get(rel) ?? titleFromHeading(fs.readFileSync(file, 'utf8')) ?? rel.split('/').at(-1).replaceAll('-', ' ');
}

function transformDoc(file) {
  let text = fs.readFileSync(file, 'utf8').replace(/^---[\s\S]*?---\s*/m, '');
  const title = getTitleFor(file);
  let removedHeading = false;
  text = fencedTransform(text, (line) => {
    if (!removedHeading && /^\s*#\s+/.test(line)) { removedHeading = true; return ''; }
    if (/nextra\/components/.test(line)) return '';
    return line.replace(/<Callout\b([^>]*)>/g, (_, attrs) => {
      const cleaned = attrs.replace(/\s+emoji=["'][^"']*["']/, '');
      return `<Callout${cleaned}>`;
    });
  });
  const sourceRel = relative(file);
  text = fencedTransform(text, (line) => line.replace(/\]\((\/[^)#]+)(#[^)]*)?\)/g, (_, target, hash = '') => `](${target === '/' ? '/docs' : `/docs${target}`}${hash})`));
  const frontmatter = `---\ntitle: ${title}\n---\n\n`;
  return frontmatter + text.trim() + '\n';
}

function migrateMeta(dir) {
  const meta = readMeta(dir);
  const entries = Object.entries(meta);
  const pages = entries
    .filter(([key, value]) => key !== 'support' && (typeof value === 'string' || value?.type === 'page'))
    .map(([key]) => key);
  const targetDir = path.join(targetRoot, path.relative(oldRoot, dir));
  fs.mkdirSync(targetDir, { recursive: true });
  const parentMeta = readMeta(path.dirname(dir));
  const folderName = path.basename(dir);
  const title = parentMeta[folderName];
  const data = { ...(typeof title === 'string' ? { title } : {}), pages };
  fs.writeFileSync(path.join(targetDir, 'meta.json'), JSON.stringify(data, null, 2) + '\n');
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const child = path.join(dir, entry.name);
    if (fs.existsSync(path.join(child, '_meta.json'))) migrateMeta(child);
  }
}

for (const file of contentDocs) {
  const target = path.join(targetRoot, relative(file));
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, transformDoc(file));
}
for (const file of media) {
  const target = path.join(targetRoot, relative(file));
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(file, target);
}
migrateMeta(oldRoot);
fs.writeFileSync(reportPath, report);
console.log(`Migrated ${contentDocs.length} documents, ${media.length} media files, and ${metas.length} navigation files.`);
