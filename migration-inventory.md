# 文档迁移清单

生成时间：2026-08-21T06:47:59.700Z

## 数量

- Markdown/MDX：90（实际迁移 89，排除 `pages/_app.mdx`）
- Nextra 导航文件：22
- 可迁移媒体文件：326
- 本地图片引用：300
- Callout：32
- 顶层 Nextra import：35
- 根路径内部链接：21

## 内容映射

旧站 `pages/**/*.md{,x}` 映射到新版 `content/docs/**/*.md{,x}`，保留目录与扩展名；`pages/_app.mdx` 不迁移。

## 导航映射

- `./_meta.json` → `content/docs/meta.json`（14 项）
- `api-docs/_meta.json` → `content/docs/api-docs/meta.json`（5 项）
- `data-import-and-export/_meta.json` → `content/docs/data-import-and-export/meta.json`（3 项）
- `experimentation/_meta.json` → `content/docs/experimentation/meta.json`（3 项）
- `feature-flags/_meta.json` → `content/docs/feature-flags/meta.json`（9 项）
- `feature-flags/flag-lifecycle-management/_meta.json` → `content/docs/feature-flags/flag-lifecycle-management/meta.json`（8 项）
- `feature-flags/organizing-flags/_meta.json` → `content/docs/feature-flags/organizing-flags/meta.json`（6 项）
- `feature-flags/targeting-users-with-flags/_meta.json` → `content/docs/feature-flags/targeting-users-with-flags/meta.json`（3 项）
- `feature-flags/users-and-user-segments/_meta.json` → `content/docs/feature-flags/users-and-user-segments/meta.json`（5 项）
- `getting-started/_meta.json` → `content/docs/getting-started/meta.json`（5 项）
- `getting-started/how-to-guides/_meta.json` → `content/docs/getting-started/how-to-guides/meta.json`（6 项）
- `iam/_meta.json` → `content/docs/iam/meta.json`（6 项）
- `installation/_meta.json` → `content/docs/installation/meta.json`（7 项）
- `integrations/_meta.json` → `content/docs/integrations/meta.json`（7 项）
- `integrations/chat-apps/_meta.json` → `content/docs/integrations/chat-apps/meta.json`（1 项）
- `integrations/data-analytic/_meta.json` → `content/docs/integrations/data-analytic/meta.json`（1 项）
- `integrations/observability/_meta.json` → `content/docs/integrations/observability/meta.json`（4 项）
- `integrations/single-sign-on/_meta.json` → `content/docs/integrations/single-sign-on/meta.json`（4 项）
- `licenses/_meta.json` → `content/docs/licenses/meta.json`（2 项）
- `relay-proxy/_meta.json` → `content/docs/relay-proxy/meta.json`（2 项）
- `sdk/_meta.json` → `content/docs/sdk/meta.json`（3 项）
- `tech-stack/_meta.json` → `content/docs/tech-stack/meta.json`（5 项）

## 代表性页面

- `getting-started/create-two-feature-flags.mdx`
- `api-docs/overview.mdx`
- `api-docs/track-insights-api.md`
- `feature-flags/flag-lifecycle-management.mdx`
- `integrations/observability/datadog.mdx`
- `experimentation/analyzing-experiments.md`
- `installation/docker-compose.mdx`

## 异常与人工确认

- 计划指定人工确认标题：`installation/docker-compose.mdx`
- 计划指定人工确认标题：`installation/terraform-aws.mdx`
- 已知源站缺失图片：`experimentation/analyzing-experiments.md` 引用 `../.gitbook/assets/image (127).png`，迁移不创建替代文件。

## 迁移规则证据

- Callout 类型：info, warning, error。
- 代码围栏内的 import、export、JSX 和链接不参与转换。
- 图片保持源站相对目录，不压缩、不重命名、不转换格式。
- 根路径内部链接将增加 `/docs` 前缀；外部链接不改写。
