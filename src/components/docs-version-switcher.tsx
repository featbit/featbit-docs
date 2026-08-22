'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { SidebarTabsDropdown } from 'fumadocs-ui/layouts/notebook/slots/sidebar';
import {
  docsVersions,
  getDocsVersion,
  getVersionPathname,
  latestDocsVersion,
} from '@/lib/docs-version';

interface DocsVersionSwitcherProps {
  availablePathnames: string[];
}

export function DocsVersionSwitcher({ availablePathnames }: DocsVersionSwitcherProps) {
  const pathname = usePathname();
  const paths = useMemo(() => new Set(availablePathnames), [availablePathnames]);
  const currentVersion = getDocsVersion(pathname);
  const options = docsVersions.map((version) => ({
    title: version.label,
    description:
      version.id === latestDocsVersion ? 'Current documentation' : 'Archived documentation',
    url: getVersionPathname(pathname, version.id, paths),
    props: {
      'aria-current': version.id === currentVersion ? ('page' as const) : undefined,
    },
  }));

  return <SidebarTabsDropdown options={options} aria-label="Documentation version" />;
}
