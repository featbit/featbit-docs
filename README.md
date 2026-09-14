# FeatBit Docs

The FeatBit documentation site, built with Next.js and Fumadocs. Migrated
documentation lives under `content/docs` and is served from `/docs`.

Install dependencies with pnpm 10.33.4 using the committed lockfile, then start
the development server. `npx` runs the required pnpm version even if your global
installation is older:

```bash
npx --yes pnpm@10.33.4 install --frozen-lockfile
npm run dev
```

Open http://localhost:3000 with your browser to see the result.

If you previously installed the Nextra version of this site, your `node_modules`
may still contain Next.js 13 and React 18. Errors mentioning those packages
alongside Fumadocs indicate that the old installation needs to be replaced.
From the repository root in PowerShell:

```powershell
Remove-Item -LiteralPath node_modules -Recurse -Force
if (Test-Path -LiteralPath .next) {
  Remove-Item -LiteralPath .next -Recurse -Force
}
npx --yes pnpm@10.33.4 install --frozen-lockfile
npm run dev
```

Keep `pnpm-lock.yaml` so the reinstall uses the project's recorded dependency
versions.

If Next.js reports that `pages` and `app` must be under the same folder, check
for an empty root-level `pages` directory left by the migration and remove it.
The current app lives in `src/app`.

## Explore

In the project, you can see:

- `src/lib/source.ts`: Fumadocs content source adapter.
- `src/lib/layout.shared.tsx`: Shared FeatBit navigation and external links.

| Route                     | Description                                            |
| ------------------------- | ------------------------------------------------------ |
| `app/(home)`              | The route group for your landing page and other pages. |
| `app/docs`                | The documentation layout and pages.                    |
| `app/api/search/route.ts` | The Route Handler for search.                          |

### Fumadocs MDX

Collections are defined with the [Macro API](https://fumadocs.dev/docs/mdx/macro) in `lib/source.ts`.

Read the [Introduction](https://fumadocs.dev/docs/mdx) for further details.

## Learn More

To learn more about Next.js and Fumadocs, take a look at the following
resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Fumadocs](https://fumadocs.dev) - learn about Fumadocs
