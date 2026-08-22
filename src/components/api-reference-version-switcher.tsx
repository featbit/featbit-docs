'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { SidebarTabsDropdown } from 'fumadocs-ui/layouts/notebook/slots/sidebar';
import {
  getApiReferencePath,
  getApiReferenceVersionFromPathname,
} from '@/lib/api-reference-version';
import { docsVersions, latestDocsVersion } from '@/lib/docs-version';

interface ApiReferenceVersionSwitcherProps {
  availablePathnames: string[];
}

export function ApiReferenceVersionSwitcher({
  availablePathnames,
}: ApiReferenceVersionSwitcherProps) {
  const pathname = usePathname();
  const paths = useMemo(() => new Set(availablePathnames), [availablePathnames]);
  const currentVersion = getApiReferenceVersionFromPathname(pathname) ?? latestDocsVersion;
  const currentRoot = getApiReferencePath(currentVersion);
  const suffix = pathname.slice(currentRoot.length);
  const options = docsVersions.map((version) => {
    const targetRoot = getApiReferencePath(version.id);
    const candidate = `${targetRoot}${suffix}`;

    return {
      title: version.label,
      description:
        version.id === latestDocsVersion ? 'Current API reference' : 'Archived API reference',
      url: paths.has(candidate) ? candidate : targetRoot,
      props: {
        'aria-current': version.id === currentVersion ? ('page' as const) : undefined,
      },
    };
  });

  return <SidebarTabsDropdown options={options} aria-label="API reference version" />;
}
