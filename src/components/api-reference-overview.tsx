import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/layouts/notebook/page";
import {
  getApiGuidesPath,
  getApiReferencePath,
} from "@/lib/api-reference-version";
import { apiReferenceSource } from "@/lib/api-reference-source";
import { latestDocsVersion, type DocsVersion } from "@/lib/docs-version";

const categoryOrder = [
  "auditlog",
  "environment",
  "featureflag",
  "group",
  "member",
  "policy",
  "project",
  "segment",
  "workspace",
] as const;

const categoryLabels: Record<string, string> = {
  auditlog: "Audit Logs",
  environment: "Environments",
  featureflag: "Feature Flags",
  group: "Groups",
  member: "Members",
  policy: "Policies",
  project: "Projects",
  segment: "Segments",
  workspace: "Workspaces",
};

interface ApiCategory {
  slug: string;
  label: string;
  count: number;
  href: string;
}

function formatCategory(slug: string): string {
  return (
    categoryLabels[slug] ??
    slug.replaceAll("-", " ").replace(/\b\w/g, (value) => value.toUpperCase())
  );
}

function getCategories(version: DocsVersion): ApiCategory[] {
  const root = getApiReferencePath(version);
  const prefix = `${root}/`;
  const categories = new Map<string, ApiCategory>();

  for (const page of apiReferenceSource.getPages()) {
    if (!page.url.startsWith(prefix)) continue;
    if (
      version === latestDocsVersion &&
      page.url.startsWith("/api-reference/v5/")
    )
      continue;

    const slug = page.url.slice(prefix.length).split("/")[0];
    if (!slug) continue;

    const existing = categories.get(slug);
    if (existing) {
      existing.count += 1;
      continue;
    }

    categories.set(slug, {
      slug,
      label: formatCategory(slug),
      count: 1,
      href: page.url,
    });
  }

  const order = new Map<string, number>(
    categoryOrder.map((slug, index) => [slug, index]),
  );
  return [...categories.values()].sort(
    (left, right) =>
      (order.get(left.slug) ?? Number.MAX_SAFE_INTEGER) -
        (order.get(right.slug) ?? Number.MAX_SAFE_INTEGER) ||
      left.label.localeCompare(right.label),
  );
}

export function ApiReferenceOverview({ version }: { version: DocsVersion }) {
  const archived = version !== latestDocsVersion;
  const categories = getCategories(version);
  const endpointCount = categories.reduce(
    (total, category) => total + category.count,
    0,
  );

  return (
    <DocsPage toc={[]}>
      <div className="not-prose mb-3 font-mono text-xs font-medium tracking-[0.12em] text-fd-primary uppercase">
        REST API <span className="mx-2 text-fd-muted-foreground">/</span>{" "}
        {archived ? version : "Latest"}
      </div>
      <DocsTitle>
        {archived ? `API Reference ${version}` : "API Reference"}
      </DocsTitle>
      <DocsDescription>
        Explore FeatBit REST APIs by resource, then configure and test requests
        on each endpoint page.
      </DocsDescription>

      <DocsBody>
        {archived ? (
          <div className="not-prose mb-8 border border-fd-warning/40 bg-fd-warning/10 px-4 py-3 text-sm text-fd-foreground">
            <span className="font-semibold">Archived version.</span>{" "}
            <span className="text-fd-muted-foreground">
              Use this reference for FeatBit v5 integrations. For new
              integrations, use the{" "}
              <Link
                className="font-medium text-fd-foreground underline underline-offset-4"
                href="/api-reference"
              >
                latest API Reference
              </Link>
              .
            </span>
          </div>
        ) : null}

        <section aria-labelledby="request-setup">
          <h2 id="request-setup" className="mt-0">
            Start a request
          </h2>
          <div className="not-prose overflow-hidden rounded-lg border border-fd-border">
            <div className="grid sm:grid-cols-2">
              <div className="p-5 sm:p-6">
                <p className="mb-4 font-mono text-xs font-medium tracking-wide text-fd-primary uppercase">
                  01&nbsp;&nbsp;Server
                </p>
                <h3 className="mb-3 text-base font-semibold text-fd-foreground">
                  Server URL
                </h3>
                <code className="block overflow-x-auto text-sm text-fd-foreground">
                  https://app-api.featbit.co
                </code>
                <p className="mt-3 text-sm leading-6 text-fd-muted-foreground">
                  FeatBit Cloud default. Replace it with your self-hosted URL in
                  any endpoint request panel.
                </p>
              </div>
              <div className="border-t border-fd-border p-5 sm:border-t-0 sm:border-l sm:p-6">
                <p className="mb-4 font-mono text-xs font-medium tracking-wide text-fd-primary uppercase">
                  02&nbsp;&nbsp;Authenticate
                </p>
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <h3 className="text-base font-semibold text-fd-foreground">
                    Access Token
                  </h3>
                  <span className="rounded border border-fd-border px-2 py-0.5 font-mono text-xs tracking-wide text-fd-muted-foreground uppercase">
                    Required
                  </span>
                </div>
                <p className="text-sm leading-6 text-fd-muted-foreground">
                  Enter an Access Token in the endpoint request panel before
                  sending an authenticated request.
                </p>
              </div>
            </div>
            <p className="border-t border-fd-border px-5 py-3 text-sm text-fd-muted-foreground sm:px-6">
              Configure both values on the endpoint page — this overview never
              stores credentials.
            </p>
          </div>
        </section>

        <section aria-labelledby="api-guides" className="not-prose mt-7">
          <div className="grid items-center gap-4 border-y border-fd-border py-4 sm:grid-cols-[auto_1fr_auto]">
            <BookOpen aria-hidden="true" className="size-5 text-fd-primary" />
            <div>
              <h2
                id="api-guides"
                className="text-sm font-semibold text-fd-foreground"
              >
                New to the API?
              </h2>
              <p className="mt-1 text-sm leading-6 text-fd-muted-foreground">
                Read authentication, API usage, and integration concepts before
                working endpoint by endpoint.
              </p>
            </div>
            <Link
              className="group inline-flex items-center gap-2 text-sm font-medium text-fd-primary outline-none underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-fd-primary"
              href={getApiGuidesPath(version)}
            >
              Open API Guides
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </section>

        <section aria-labelledby="browse-endpoints" className="mt-10">
          <div className="not-prose flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                id="browse-endpoints"
                className="text-2xl font-semibold tracking-tight text-fd-foreground"
              >
                Browse endpoints
              </h2>
              <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">
                Choose a resource below, or use the endpoint tree in the
                sidebar.
              </p>
            </div>
            <p className="font-mono text-xs tracking-wide text-fd-muted-foreground uppercase">
              {categories.length} resources <span aria-hidden="true">·</span>{" "}
              {endpointCount} endpoints
            </p>
          </div>
          <div className="not-prose mt-5 overflow-hidden rounded-lg border border-fd-border">
            {categories.map((category, index) => (
              <Link
                className="group relative grid min-h-14 grid-cols-[2rem_1fr_auto_auto] items-center gap-3 border-b border-fd-border px-4 text-fd-foreground outline-none transition-colors last:border-b-0 before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-fd-primary before:opacity-0 before:transition-opacity hover:bg-fd-muted/50 hover:before:opacity-100 focus-visible:bg-fd-muted/50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-fd-primary focus-visible:before:opacity-100 sm:gap-6 sm:px-5"
                href={category.href}
                key={category.slug}
              >
                <span className="font-mono text-xs tabular-nums text-fd-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-medium text-fd-foreground">
                  {category.label}
                </span>
                <span className="whitespace-nowrap text-sm tabular-nums text-fd-muted-foreground">
                  {category.count}{" "}
                  {category.count === 1 ? "endpoint" : "endpoints"}
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 text-fd-foreground transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            ))}
          </div>
        </section>
      </DocsBody>
    </DocsPage>
  );
}
