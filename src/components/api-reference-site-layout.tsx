'use client';

import type * as PageTree from 'fumadocs-core/page-tree';
import { usePathname } from 'next/navigation';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import { ApiReferenceVersionSwitcher } from '@/components/api-reference-version-switcher';
import { getApiReferencePageTree } from '@/lib/api-reference-page-tree';
import { getApiReferenceVersionFromPathname } from '@/lib/api-reference-version';
import { latestDocsVersion } from '@/lib/docs-version';
import { baseOptions } from '@/lib/layout.shared';

interface ApiReferenceSiteLayoutProps {
  children: React.ReactNode;
  tree: PageTree.Root;
  availablePathnames: string[];
}

export function ApiReferenceSiteLayout({
  children,
  tree,
  availablePathnames,
}: ApiReferenceSiteLayoutProps) {
  const pathname = usePathname();
  const currentVersion = getApiReferenceVersionFromPathname(pathname) ?? latestDocsVersion;
  const versionedTree = getApiReferencePageTree(tree, pathname);
  const { nav, ...options } = baseOptions(currentVersion);

  return (
    <DocsLayout
      tree={versionedTree}
      tabs={false}
      {...options}
      nav={{ ...nav, mode: 'top' }}
      sidebar={{
        banner: <ApiReferenceVersionSwitcher availablePathnames={availablePathnames} />,
        collapsible: false,
      }}
    >
      {children}
    </DocsLayout>
  );
}
