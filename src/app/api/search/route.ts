import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';
import { getSearchTags } from '@/lib/docs-version';

export const { GET } = createFromSource(source, {
  buildIndex: async (page) => ({
    id: page.url,
    title: page.data.title,
    description: page.data.description,
    url: page.url,
    tag: getSearchTags(page.url),
    structuredData: page.data.structuredData,
  }),
});
