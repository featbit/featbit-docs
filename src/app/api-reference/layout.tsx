import { ApiReferenceSiteLayout } from '@/components/api-reference-site-layout';
import { apiReferenceSource } from '@/lib/api-reference-source';

export default function Layout({ children }: LayoutProps<'/api-reference'>) {
  return (
    <ApiReferenceSiteLayout
      tree={apiReferenceSource.getPageTree()}
      availablePathnames={apiReferenceSource.getPages().map((page) => page.url)}
    >
      {children}
    </ApiReferenceSiteLayout>
  );
}
