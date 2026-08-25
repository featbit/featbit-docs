'use client';

import { usePathname } from 'next/navigation';
import type * as PageTree from 'fumadocs-core/page-tree';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import { baseOptions } from '@/lib/layout.shared';
import { getDocsVersion } from '@/lib/docs-version';
import { getVersionedPageTree } from '@/lib/versioned-page-tree';
import { DocsVersionSwitcher } from './docs-version-switcher';

interface VersionedDocsLayoutProps {
  children: React.ReactNode;
  tree: PageTree.Root;
  availablePathnames: string[];
}

export function VersionedDocsLayout({
  children,
  tree,
  availablePathnames,
}: VersionedDocsLayoutProps) {
  const pathname = usePathname();
  const currentVersion = getDocsVersion(pathname);
  const versionedTree = getVersionedPageTree(tree, pathname);
  const { nav, ...options } = baseOptions(currentVersion);

  return (
    <DocsLayout
      key={currentVersion}
      tree={versionedTree}
      {...options}
      nav={{ ...nav, mode: 'top' }}
      sidebar={{
        banner: <DocsVersionSwitcher availablePathnames={availablePathnames} />,
        collapsible: false,
      }}
    >
      {children}
    </DocsLayout>
  );
}
