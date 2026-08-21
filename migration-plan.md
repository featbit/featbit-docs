# FeatBit 文档迁移方案

## 1. 背景与目标

旧版文档位于 `D:\Workspace\FeatBit\featbit-docs`，使用 Next.js 13、React 18 和 Nextra 2.13.2。

新版文档位于 `D:\Workspace\FeatBit\featbit-docs-v2`，使用 Next.js 16、React 19 和 Fumadocs。

本次迁移的目标是将旧站的文档内容、导航结构、图片资源以及仍然需要的品牌配置迁移到 Fumadocs，并使用新版工程当前的文档路由：

```text
/docs
/docs/getting-started/...
/docs/feature-flags/...
/docs/api-docs/...
```

本次迁移不包括：

- 兼容旧站公开 URL。
- 为旧 URL 添加重定向或 canonical 映射。
- 像素级复刻 Nextra 的界面。
- 重写文档内容或重新设计信息架构。
- 批量压缩、重命名或转换图片。
- 建设多版本文档。
- 调整 OpenAPI 文档方案。

第一轮迁移以内容和功能等价为目标，不将内容搬运、视觉重构和资源优化混在一起。

## 2. 已确认的迁移规模

旧站只读盘点结果：

- 90 个 Markdown/MDX 文件，其中包含一个 `_app.mdx`。
- 实际文档内容约 89 个文件。
- 22 个 `_meta.json` 导航文件。
- 326 个章节图片或媒体文件。
- 资源体积约 84 MB。
- 300 个本地图片引用。
- 32 个 Nextra `<Callout>`。
- 17 个根路径内部链接。
- 1 个已经缺失的旧站图片资源。

缺失资源位于：

```text
pages/experimentation/analyzing-experiments.md
```

该页面引用了不存在的文件：

```text
../.gitbook/assets/image (127).png
```

迁移时应将其记录为源站遗留问题，不创建空白文件，也不使用其他图片静默替代。

## 3. 迁移边界

### 3.1 需要迁移

- Markdown 和 MDX 正文。
- 文档目录层级。
- 导航顺序和导航显示名称。
- 文档图片及其他本地媒体资源。
- 文档内部链接。
- Nextra Callout 的等价表达。
- FeatBit Logo、站点名称、GitHub、Discord 和 Support 等必要入口。
- favicon、全站 metadata 和社交分享信息。
- Edit on GitHub 等仍然需要的页面操作。

### 3.2 不直接迁移

- `pages/_app.mdx`。
- Nextra `theme.config.tsx` 本身。
- Nextra `_meta.json` 原格式。
- `.nx-*` 和 `nx-` 前缀的 Nextra 内部样式。
- 旧版静态 sitemap。
- 旧版静态 `llms.txt`。
- 未实际使用的 `posthog-js` 依赖。

这些文件或配置包含的有效意图应转换到 Fumadocs/Next.js 的对应位置，而不是原样复制。

## 4. 目标内容结构

保持旧文档的章节层级，将内容迁移到 Fumadocs 的 `content/docs`：

```text
featbit-docs-v2/
├─ content/
│  └─ docs/
│     ├─ index.mdx
│     ├─ meta.json
│     ├─ getting-started/
│     │  ├─ meta.json
│     │  ├─ create-two-feature-flags.mdx
│     │  ├─ assets/
│     │  └─ how-to-guides/
│     ├─ feature-flags/
│     ├─ installation/
│     ├─ sdk/
│     ├─ api-docs/
│     ├─ integrations/
│     ├─ data-import-and-export/
│     ├─ experimentation/
│     ├─ relay-proxy/
│     ├─ iam/
│     ├─ licenses/
│     └─ tech-stack/
├─ src/
│  ├─ app/
│  ├─ components/
│  └─ lib/
└─ public/
```

章节图片继续放在对应文档目录的 `assets` 中。保持正文与图片的相对层级，可以减少对现有 300 个图片引用的改写。

## 5. Nextra 专有功能及转换规则

### 5.1 Nextra Callout

旧版使用：

```mdx
import { Callout } from 'nextra/components'

<Callout type="info">
  Content
</Callout>
```

迁移规则：

- 删除文档顶部真正执行的 `nextra/components` 导入。
- 使用 Fumadocs 提供的 Callout/提示组件。
- 分别验证 `info`、`warning` 和 `error`。
- 单独处理少数 `emoji="ℹ️"`；如果 Fumadocs 不支持相同属性，将 emoji 放入标题或正文。
- 不为不存在的兼容需求建立复杂组件。

旧文档没有发现实际使用 Nextra 的 Tabs、Cards、Steps 或 FileTree 等组件。

代码围栏中的 `import`、`export`、React JSX 和 Vue 模板都是示例代码，禁止被迁移程序删除或修改。

### 5.2 `_meta.json`

Nextra 使用 `_meta.json` 控制导航顺序、显示名称和外部入口。迁移时转换为 Fumadocs `meta.json`，并保留：

- 页面和目录的原有顺序。
- 页面和目录的显示名称。
- 多级目录结构。
- Support 外部链接及新窗口行为。

不能只把 `_meta.json` 改名为 `meta.json`；必须按照 Fumadocs 的格式生成并验证页面树。

### 5.3 Pages Router 文档路由

旧版：

```text
pages/foo/bar.mdx
```

新版：

```text
content/docs/foo/bar.mdx
```

旧版 `pages/_app.mdx` 是 Nextra/Pages Router 的应用入口，不是文档内容，不迁移到 `content/docs`。它加载全局样式和应用包装的职责由新版根 layout、Fumadocs Provider 和 `global.css` 承担。

### 5.4 Nextra 主题配置

旧版 `theme.config.tsx` 中有价值的信息需要分别迁移到 Next.js Metadata、Fumadocs layout options 和页面组件，包括：

- FeatBit Logo 和站点名称。
- 页面标题模板及全站 description。
- favicon 和 Open Graph 图片。
- GitHub、Discord 和 Support 入口。
- Edit this page 和 Feedback。
- 页脚和主题模式。

Nextra 的 `DocsThemeConfig`、`useConfig` 和主题组件不能原样复制。

### 5.5 Nextra CSS

旧站使用了类似以下 Nextra 内部类：

```css
.md\:nx-w-64
.nx-overflow-x-scroll
```

这些样式不迁移到 Fumadocs，也不替换为针对 Fumadocs 内部生成类名的全局覆盖。

## 6. 内容转换规则

### 6.1 文档文件

执行以下映射：

```text
featbit-docs/pages/**/*.md
→ featbit-docs-v2/content/docs/**/*.md

featbit-docs/pages/**/*.mdx
→ featbit-docs-v2/content/docs/**/*.mdx
```

明确排除：

```text
pages/_app.mdx
```

### 6.2 Frontmatter 与页面标题

旧文档没有 YAML frontmatter。每个目标页面需要生成至少包含标题的 frontmatter：

```mdx
---
title: Page title
---
```

标题来源优先级：

1. 当前目录 `_meta.json` 中的显示标题。
2. 正文中的第一个 H1。
3. 由文件名生成的标题，仅作为异常兜底。

统一采用以下策略：

- 将正文 H1 转换为 frontmatter 标题。
- 删除已经提升为 frontmatter 的正文 H1，避免页面出现两个标题。
- H1 包含链接时，只将纯文本写入 frontmatter。
- 第一轮不自动编写 description。

以下两个内容页面没有正常 H1，需要人工确认标题：

```text
pages/installation/docker-compose.mdx
pages/installation/terraform-aws.mdx
```

### 6.3 普通 Markdown、HTML 和示例代码

以下内容原则上原样迁移：

- 段落、列表和引用。
- Markdown 表格。
- 代码块。
- 外部链接。
- Markdown 图片。
- 原生 HTML 表格。
- `<br />`。
- 示例代码中的 React、Vue 和 JSX。

转换程序必须识别代码围栏，禁止在代码围栏中执行 import、Callout、链接或 JSX 替换。

### 6.4 图片资源

复制文档目录下的以下资源：

```text
png
jpg
jpeg
webp
svg
gif
```

第一轮不进行：

- 图片压缩。
- 图片重命名。
- 图片格式转换。
- 将图片统一移动到 `public`。
- 批量补写 alt 文本。

迁移后验证每个相对图片引用都能解析到实际文件，并检查大小写、空格、括号、SVG 显示和大图布局。

### 6.5 内部链接

不兼容旧 URL，因此旧版根路径链接需要改为新的 `/docs` 路由。例如：

```md
[Webhooks](/integrations/webhooks)
```

转换为：

```md
[Webhooks](/docs/integrations/webhooks)
```

对于能够可靠解析目标文档的链接，优先使用相对文件链接，让当前页面中的 `createRelativeLink()` 统一解析：

```md
[Webhooks](../../integrations/webhooks.mdx)
```

需要检查：

- 17 个已发现的根路径内部链接。
- 带 `.md` 或 `.mdx` 后缀的相对链接。
- 带锚点的链接。
- 跨目录链接。
- 图片链接与页面链接的区分。

外部链接不改写。

## 7. Fumadocs 基础配置

### 7.1 站点身份

替换当前脚手架中的默认值：

- 站点名称改为 `FeatBit Docs`。
- GitHub 用户或组织改为 `featbit`。
- 仓库名和默认分支以新版文档最终仓库为准。
- Edit on GitHub 指向 `content/docs` 中的正确文件。

仓库名和最终发布分支需要在实施前确认，不能直接从旧站配置推断。

### 7.2 文档页面能力

保留并验证 Fumadocs 当前提供的能力：

- 左侧导航。
- 页面目录。
- 搜索。
- 页面标题与 description 区域。
- 复制 Markdown。
- View options。
- Edit on GitHub。
- OG 图片。
- 单页 Markdown 和 LLM 输出。

不复刻 Nextra 的侧边栏宽度、内部类名或响应式实现。

### 7.3 品牌与公共入口

迁移：

- FeatBit Logo。
- FeatBit Docs 名称。
- GitHub 入口。
- Discord 入口。
- Support 入口。
- favicon。
- 社交分享图片。
- 全站 description。
- 页脚版权。

是否保留旧版 Feedback 链接，应根据当前 GitHub Issues 工作流单独确认。

### 7.4 样式原则

默认不为迁移添加自定义样式，先使用 Fumadocs 默认样式渲染和验证全部内容。

只有在桌面端、移动端或深色模式中发现可复现的真实问题时，才按以下优先级处理：

1. 修正文档自身不规范的 Markdown/HTML 结构。
2. 使用 Fumadocs 公开的 MDX 组件或布局接口。
3. 前两种方式无法解决时，添加最小范围、局部且稳定的样式。

潜在验证项包括宽表格、超长 URL、不可断开的字符串、大尺寸图片、原生 HTML 表格和复杂代码块，但这些只是需要检查的风险，不代表需要预先添加 CSS。

禁止：

- 预先复制旧版 `.nx-*` 样式。
- 覆盖 Fumadocs 内部生成类名。
- 在没有渲染证据时添加全局补丁。

如果全量验证没有发现问题，就不添加迁移专用样式。

## 8. 分阶段实施计划

### 阶段一：建立迁移清单

产出：

- 内容文件清单。
- 资源文件清单。
- 导航清单。
- 源文件到目标文件的映射表。
- Nextra 专有语法清单。
- 内部链接清单。
- 已知源站问题清单。

验收标准：

- 覆盖全部 90 个 Markdown/MDX 文件。
- `_app.mdx` 明确标记为不迁移。
- 22 个 `_meta.json` 均有目标映射。
- 已知缺失图片被记录。

### 阶段二：完成 Fumadocs 基础配置

工作：

- 配置站点名称与 GitHub 地址。
- 确认 `/docs` 为正式文档入口。
- 配置 Logo、外部入口和全站 metadata。
- 确认 Fumadocs MDX 组件集合。
- 验证 Callout 类型映射。
- 确认资源继续采用正文旁的 `assets` 目录。

验收标准：

- 脚手架示例页面使用最终布局正常显示。
- 搜索、页面目录和 Markdown 输出正常。
- Edit on GitHub 指向正确位置。
- 不再显示 `My App` 或 Fumadocs 示例仓库信息。

### 阶段三：代表性页面试迁移

建议选择：

1. 旧站首页。
2. `getting-started/create-two-feature-flags.mdx`。
3. `api-docs/overview.mdx`。
4. `api-docs/track-insights-api.md`。
5. `feature-flags/flag-lifecycle-management.mdx`。
6. `integrations/observability/datadog.mdx`。
7. `experimentation/analyzing-experiments.md`。
8. 一个没有 H1 的安装页面。

这些页面应覆盖普通 Markdown、Callout、深层目录、图片、表格、代码中的 JSX、跨页面链接、缺失资源和标题异常。

验收标准：

- 试迁移页面构建通过。
- 导航顺序正确。
- Callout 显示正确。
- 示例代码没有被转换程序破坏。
- 图片和内部链接正常。
- 转换规则能够冻结并用于批量迁移。

### 阶段四：批量迁移

建议编写一次性迁移程序，负责：

1. 遍历旧文档目录。
2. 排除 `_app.mdx`。
3. 复制文档和资源。
4. 转换 `_meta.json`。
5. 生成 frontmatter。
6. 处理正文 H1。
7. 删除 Nextra Callout import。
8. 转换 Callout 属性。
9. 重写内部链接。
10. 输出异常报告。

程序遇到以下情况时应报告而不是猜测：

- 找不到标题。
- 导航项找不到对应文件。
- 文件没有进入任何导航。
- 图片不存在。
- Callout 类型未知。
- MDX 顶层存在其他 import/export。
- 链接目标无法解析。
- 目标路径发生冲突。

### 阶段五：迁移站点级配置

工作：

- Logo、站点名称和公共入口。
- GitHub、Discord 和 Support。
- Edit on GitHub。
- favicon 和 Open Graph。
- robots。
- 新 sitemap。
- Fumadocs 搜索。
- `llms.txt`、`llms-full.txt` 和单页 Markdown。

旧版静态 sitemap 和 `llms.txt` 不直接复制，应由新版内容源重新生成。

### 阶段六：全量验证

#### 静态检查

- 源文档和目标文档数量对应。
- 导航目录数量对应。
- 资源复制完整。
- 本地图片引用全部存在，已知缺失图片除外。
- 内部文档链接均可解析。
- 无重复 slug。
- 无孤立页面。
- 无残留 `nextra` 导入。
- 无残留 `_meta.json`。
- 无残留 `nx-` CSS 类。

#### 工程检查

执行：

```text
pnpm lint
pnpm types:check
pnpm build
```

分别报告：

- 迁移导致的错误。
- Fumadocs 脚手架自身已有问题。
- 源文档中的 MDX 语法问题。
- 因环境限制无法验证的项目。

#### 浏览器检查

至少覆盖：

- 首页。
- 每个一级章节的第一个页面。
- 所有 Callout 类型。
- 深层导航页面。
- 最长页面。
- 图片最多的页面。
- 宽表格页面。
- 含复杂代码示例的页面。
- 移动端导航。
- 深色模式。
- 搜索及结果跳转。
- 页面目录及锚点跳转。
- Edit on GitHub。
- Markdown 复制和查看功能。

样式问题只能以此阶段的实际渲染证据为依据修复。

## 9. 提交拆分建议

### PR 1：Fumadocs 基础配置

- 站点身份。
- GitHub 配置。
- MDX 组件。
- Callout 适配。
- 必要的公共入口。

不包含批量文档。

### PR 2：试迁移

- 代表性页面。
- 对应资源。
- 第一批 `meta.json`。
- 转换规则验证。
- 迁移程序初版。

### PR 3：全量内容迁移

- 全部正文。
- 全部图片资源。
- 全部导航元数据。
- 内部链接转换。
- 异常报告。

这一提交不混入视觉重构。

### PR 4：全站完善和验证

- Logo、外部入口和页脚。
- SEO、sitemap 和 robots。
- 搜索及 LLM 输出。
- 基于真实渲染问题的必要修复。
- 最终迁移检查报告。

## 10. 完成标准

只有同时满足以下条件，才认为迁移完成：

- 所有旧版内容页面均已迁移，明确排除的 `_app.mdx` 除外。
- 所有导航项均已转换为 Fumadocs `meta.json`。
- 所有页面均有有效标题。
- 不再依赖 Nextra 包、组件、配置或 CSS 类。
- 图片资源全部可访问，已知源站缺失资源有明确记录。
- 所有内部链接使用新的 `/docs` 路由或有效相对链接。
- 搜索、目录、导航、深色模式和移动端正常。
- lint、类型检查和生产构建通过。
- sitemap、robots 和 LLM 输出来自新版内容源。
- 浏览器回归覆盖所有一级章节及高风险页面。
- 只有存在渲染证据时才添加最小范围的修复样式。
- 迁移没有顺带重写文档内容、重构信息架构或批量优化图片。

