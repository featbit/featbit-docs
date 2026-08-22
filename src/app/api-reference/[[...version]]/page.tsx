import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/layouts/notebook/page';
import { OpenAPIPage } from '@/components/api-page';
import { ApiReferenceOverview } from '@/components/api-reference-overview';
import { getMDXComponents } from '@/components/mdx';
import { apiReferenceSource } from '@/lib/api-reference-source';
import { latestDocsVersion, type DocsVersion } from '@/lib/docs-version';
import { getOpenAPIForPage } from '@/lib/openapi';

export const dynamicParams = false;

function getRootVersion(segments?: string[]): DocsVersion | null {
  if (!segments || segments.length === 0) return latestDocsVersion;
  if (segments.length === 1 && segments[0] === 'v5') return 'v5';
  return null;
}

export default async function Page(props: PageProps<'/api-reference/[[...version]]'>) {
  const { version: segments } = await props.params;
  const rootVersion = getRootVersion(segments);

  if (rootVersion) return <ApiReferenceOverview version={rootVersion} />;

  const page = apiReferenceSource.getPage(segments);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(apiReferenceSource, page),
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
  return [
    ...apiReferenceSource.generateParams().map(({ slug }) => ({ version: slug })),
    { version: [] },
    { version: ['v5'] },
  ];
}

export async function generateMetadata(
  props: PageProps<'/api-reference/[[...version]]'>,
): Promise<Metadata> {
  const { version: segments } = await props.params;
  const page = apiReferenceSource.getPage(segments);
  const rootVersion = getRootVersion(segments);

  if (page) {
    return {
      title: page.data.title,
      description: page.data.description,
    };
  }

  if (!rootVersion) return {};
  return {
    title: rootVersion === latestDocsVersion ? 'API Reference' : 'API Reference v5',
    description: `Explore the ${rootVersion === latestDocsVersion ? 'latest' : rootVersion} FeatBit REST API.`,
  };
}
