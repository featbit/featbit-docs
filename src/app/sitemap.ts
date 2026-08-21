import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';

export default function sitemap(): MetadataRoute.Sitemap {
  return source.getPages().map((page) => ({
    url: `https://featbit.co${page.url}`,
    changeFrequency: 'weekly',
  }));
}
