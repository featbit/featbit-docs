import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { siteDescription } from '@/lib/shared';

export const metadata: Metadata = {
  title: {
    default: 'FeatBit Docs',
    template: '%s – FeatBit',
  },
  description: siteDescription,
  metadataBase: new URL('https://featbit.co'),
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }, { url: '/logo.png', type: 'image/png' }],
  },
  openGraph: {
    title: 'FeatBit Docs',
    description: siteDescription,
    images: ['https://www.featbit.co/og.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FeatBit Docs',
    description: siteDescription,
    images: ['https://www.featbit.co/og.png'],
  },
};

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
