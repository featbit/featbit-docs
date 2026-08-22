import type * as PageTree from 'fumadocs-core/page-tree';
import { createSearchAPI, type AdvancedIndex } from 'fumadocs-core/search/server';
import { apiReferenceSource } from '@/lib/api-reference-source';
import { getApiReferenceVersionFromPathname } from '@/lib/api-reference-version';
import { source } from '@/lib/source';
import { getSearchTags, latestDocsVersion } from '@/lib/docs-version';

function getFolderBreadcrumbs(tree: PageTree.Root): Map<string, string[]> {
  const breadcrumbs = new Map<string, string[]>();

  function visit(nodes: PageTree.Node[], parents: string[]) {
    for (const node of nodes) {
      if (node.type === 'page') {
        breadcrumbs.set(node.url, parents);
        continue;
      }

      if (node.type !== 'folder') continue;
      const folderName = typeof node.name === 'string' ? node.name : null;
      const nextParents = folderName ? [...parents, folderName] : parents;

      if (node.index) breadcrumbs.set(node.index.url, nextParents);
      visit(node.children, nextParents);
    }
  }

  visit(tree.children, []);
  return breadcrumbs;
}

const docsBreadcrumbs = getFolderBreadcrumbs(source.getPageTree());
const apiReferenceBreadcrumbs = getFolderBreadcrumbs(apiReferenceSource.getPageTree());

function getIndexes(): AdvancedIndex[] {
  const docsIndexes: AdvancedIndex[] = source.getPages().map((page) => ({
      id: page.url,
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      tag: getSearchTags(page.url),
      breadcrumbs: ['Docs', ...(docsBreadcrumbs.get(page.url) ?? [])],
      structuredData: page.data.structuredData,
  }));

  const apiReferenceIndexes: AdvancedIndex[] = apiReferenceSource.getPages().map((page) => ({
    id: page.url,
    title: page.data.title,
    description: page.data.description,
    url: page.url,
    tag: getApiReferenceVersionFromPathname(page.url) ?? latestDocsVersion,
    breadcrumbs: ['API Reference', ...(apiReferenceBreadcrumbs.get(page.url) ?? [])],
    structuredData: page.data.structuredData,
  }));

  return [...docsIndexes, ...apiReferenceIndexes];
}

export const { GET } = createSearchAPI('advanced', {
  indexes: getIndexes,
});
