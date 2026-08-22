import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/layouts/notebook/page';
import { getApiGuidesPath, getApiReferencePath } from '@/lib/api-reference-version';
import { apiReferenceSource } from '@/lib/api-reference-source';
import { latestDocsVersion, type DocsVersion } from '@/lib/docs-version';

const categoryOrder = [
  'auditlog',
  'environment',
  'featureflag',
  'group',
  'member',
  'policy',
  'project',
  'segment',
  'workspace',
] as const;

const categoryLabels: Record<string, string> = {
  auditlog: 'Audit Logs',
  environment: 'Environments',
  featureflag: 'Feature Flags',
  group: 'Groups',
  member: 'Members',
  policy: 'Policies',
  project: 'Projects',
  segment: 'Segments',
  workspace: 'Workspaces',
};

interface ApiCategory {
  slug: string;
  label: string;
  count: number;
  href: string;
}

function formatCategory(slug: string): string {
  return categoryLabels[slug] ?? slug.replaceAll('-', ' ').replace(/\b\w/g, (value) => value.toUpperCase());
}

function getCategories(version: DocsVersion): ApiCategory[] {
  const root = getApiReferencePath(version);
  const prefix = `${root}/`;
  const categories = new Map<string, ApiCategory>();

  for (const page of apiReferenceSource.getPages()) {
    if (!page.url.startsWith(prefix)) continue;
    if (version === latestDocsVersion && page.url.startsWith('/api-reference/v5/')) continue;

    const slug = page.url.slice(prefix.length).split('/')[0];
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

  const order = new Map<string, number>(categoryOrder.map((slug, index) => [slug, index]));
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

  return (
    <DocsPage toc={[]}>
      <DocsTitle>{archived ? `API Reference ${version}` : 'API Reference'}</DocsTitle>
      <DocsDescription>
        Explore FeatBit REST APIs by resource, then configure and test requests on each endpoint
        page.
      </DocsDescription>

      <DocsBody>
        {archived ? (
          <div className="not-prose mb-8 border border-fd-warning/40 bg-fd-warning/10 px-4 py-3 text-sm text-fd-foreground">
            <span className="font-semibold">Archived version.</span>{' '}
            <span className="text-fd-muted-foreground">
              Use this reference for FeatBit v5 integrations. For new integrations, use the{' '}
              <Link className="font-medium text-fd-foreground underline underline-offset-4" href="/api-reference">
                latest API Reference
              </Link>
              .
            </span>
          </div>
        ) : null}

        <section aria-labelledby="request-setup">
          <h2 id="request-setup">Request setup</h2>
          <div className="not-prose grid border-y border-fd-border sm:grid-cols-2">
            <div className="py-5 sm:pr-8">
              <h3 className="mb-2 text-sm font-semibold text-fd-foreground">Server URL</h3>
              <code className="block overflow-x-auto text-sm text-fd-foreground">
                https://app-api.featbit.co
              </code>
              <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">
                This is the FeatBit Cloud default. You can replace it with your self-hosted server
                URL in any endpoint request panel.
              </p>
            </div>
            <div className="border-t border-fd-border py-5 sm:border-t-0 sm:border-l sm:pl-8">
              <h3 className="mb-2 text-sm font-semibold text-fd-foreground">Authentication</h3>
              <code className="block text-sm text-fd-foreground">Access Token</code>
              <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">
                Enter an Access Token in the endpoint request panel before sending an authenticated
                request.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="api-guides">
          <h2 id="api-guides">Need implementation guidance?</h2>
          <p>
            Read the{' '}
            <Link href={getApiGuidesPath(version)}>API Guides</Link> for authentication, API usage,
            and integration concepts before working endpoint by endpoint.
          </p>
        </section>

        <section aria-labelledby="browse-endpoints">
          <h2 id="browse-endpoints">Browse endpoints</h2>
          <p>
            Choose a resource below, or use the endpoint tree in the sidebar. Each endpoint page
            includes parameters, schemas, response examples, and an interactive request panel.
          </p>
          <div className="not-prose mt-6 border-t border-fd-border">
            {categories.map((category) => (
              <Link
                className="group flex min-h-14 items-center justify-between gap-6 border-b border-fd-border py-3 text-fd-foreground outline-none transition-colors hover:bg-fd-muted/50 focus-visible:bg-fd-muted/50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-fd-primary"
                href={category.href}
                key={category.slug}
              >
                <span className="font-medium">{category.label}</span>
                <span className="flex shrink-0 items-center gap-3 text-sm text-fd-muted-foreground">
                  {category.count} {category.count === 1 ? 'endpoint' : 'endpoints'}
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 text-fd-foreground transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </DocsBody>
    </DocsPage>
  );
}
