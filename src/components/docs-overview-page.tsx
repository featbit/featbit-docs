import { notFound } from 'next/navigation';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/notebook/page';
import { DocsOverview } from '@/components/docs-overview';
import { getPageMarkdownUrl, source } from '@/lib/source';
import { gitConfig } from '@/lib/shared';

export const docsOverviewDescription =
  'Learn how to install FeatBit, create and manage feature flags, connect SDKs, and operate safely in production.';

export function DocsOverviewPage() {
  const page = source.getPage([]);
  if (!page) notFound();

  const markdownUrl = getPageMarkdownUrl(page).url;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>FeatBit Documentation</DocsTitle>
      <DocsDescription className="mb-0">{docsOverviewDescription}</DocsDescription>
      <div className="flex flex-row items-center gap-2 border-b pb-6">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover
          markdownUrl={markdownUrl}
          githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${page.path}`}
        />
      </div>
      <DocsBody>
        <DocsOverview />
      </DocsBody>
    </DocsPage>
  );
}
