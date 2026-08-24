import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/notebook/page';
import { OpenAPIPage } from '@/components/api-page';
import {
  docsOverviewDescription,
  DocsOverviewPage,
} from '@/components/docs-overview-page';
import { getMDXComponents } from '@/components/mdx';
import { getOpenAPIForPage } from '@/lib/openapi';
import { getPageImageUrl, getPageMarkdownUrl, source } from '@/lib/source';
import { gitConfig } from '@/lib/shared';

export default async function Page(props: PageProps<'/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();
  if (page.url === '/') return <DocsOverviewPage />;

  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
      <div className="flex flex-row items-center gap-2 border-b pb-6">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover
          markdownUrl={markdownUrl}
          githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${page.path}`}
        />
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
            OpenAPIPage: async (componentProps) => (
              <OpenAPIPage
                {...(await getOpenAPIForPage(page.url).preloadOpenAPIPage(page))}
                {...componentProps}
              />
            ),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<'/[[...slug]]'>,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const isOverview = page.url === '/';

  return {
    title: isOverview ? 'FeatBit Documentation' : page.data.title,
    description: isOverview ? docsOverviewDescription : page.data.description,
    alternates: {
      canonical: page.url,
    },
    openGraph: {
      images: getPageImageUrl(page).url,
    },
  };
}
