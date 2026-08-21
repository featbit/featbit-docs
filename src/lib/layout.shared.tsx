import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';
import { BrandLogo } from '@/components/brand-logo';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="flex items-center gap-2">
          <BrandLogo className="size-7" />
          <span>{appName}</span>
        </span>
      ),
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    links: [
      { text: 'Discord', url: 'https://discord.gg/ytK9xGJSw3', external: true },
      { text: 'Support', url: 'https://dashboard.featbit.co', external: true },
    ],
  };
}
