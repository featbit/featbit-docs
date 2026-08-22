'use client';

import { usePathname } from 'next/navigation';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { getDocsVersion } from '@/lib/docs-version';

export function VersionAwareProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <RootProvider
      search={{
        options: {
          defaultTag: getDocsVersion(pathname),
        },
      }}
    >
      {children}
    </RootProvider>
  );
}
