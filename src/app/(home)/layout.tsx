import { VersionedDocsLayout } from '@/components/versioned-docs-layout';
import { source } from '@/lib/source';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <VersionedDocsLayout
      tree={source.getPageTree()}
      availablePathnames={source.getPages().map((page) => page.url)}
    >
      {children}
    </VersionedDocsLayout>
  );
}
