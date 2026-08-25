import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';
import { BrandLogo } from '@/components/brand-logo';
import { SidebarCollapseButton } from '@/components/sidebar-collapse-button';
import { getApiReferencePath } from './api-reference-version';
import { getVersionRoot, latestDocsVersion, type DocsVersion } from './docs-version';

export function baseOptions(version: DocsVersion = latestDocsVersion): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="flex items-center gap-2">
          <BrandLogo className="size-7" />
          <span>{appName}</span>
        </span>
      ),
      children: <SidebarCollapseButton />,
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    links: [
      { text: 'Docs', url: getVersionRoot(version), active: 'nested-url' },
      {
        text: 'API Reference',
        url: getApiReferencePath(version),
        active: 'nested-url',
      },
      { text: 'Discord', url: 'https://discord.gg/ytK9xGJSw3', external: true },
      { text: 'Support', url: 'https://dashboard.featbit.co', external: true },
    ],
  };
}
