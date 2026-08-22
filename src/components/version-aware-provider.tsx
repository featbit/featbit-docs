'use client';

import { usePathname } from 'next/navigation';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { getApiReferenceVersionFromPathname } from '@/lib/api-reference-version';
import { getDocsVersion } from '@/lib/docs-version';

export function VersionAwareProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const version = getApiReferenceVersionFromPathname(pathname) ?? getDocsVersion(pathname);

  return (
    <RootProvider
      search={{
        options: {
          defaultTag: version,
        },
      }}
    >
      {children}
    </RootProvider>
  );
}
