import { source } from '@/lib/source';
import { VersionedDocsLayout } from '@/components/versioned-docs-layout';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <VersionedDocsLayout
      tree={source.getPageTree()}
      availablePathnames={source.getPages().map((page) => page.url)}
    >
      {children}
    </VersionedDocsLayout>
  );
}
