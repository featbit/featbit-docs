import { docsRoute } from './shared';

export const latestDocsVersion = 'latest' as const;

export const docsVersions = [
  { id: latestDocsVersion, label: 'Latest' },
  { id: 'v5', label: 'v5' },
] as const;

export type DocsVersion = (typeof docsVersions)[number]['id'];

const archivedVersions = new Set<DocsVersion>(
  docsVersions.filter((version) => version.id !== latestDocsVersion).map((version) => version.id),
);

export function isDocsPath(pathname: string): boolean {
  return pathname === docsRoute || pathname.startsWith(`${docsRoute}/`);
}

export function getDocsVersion(pathname: string): DocsVersion {
  if (!isDocsPath(pathname)) return latestDocsVersion;

  const firstSegment = pathname.slice(docsRoute.length).split('/').filter(Boolean)[0];
  return archivedVersions.has(firstSegment as DocsVersion)
    ? (firstSegment as DocsVersion)
    : latestDocsVersion;
}

export function getVersionRoot(version: DocsVersion): string {
  return version === latestDocsVersion ? docsRoute : `${docsRoute}/${version}`;
}

export function getVersionPathname(
  pathname: string,
  targetVersion: DocsVersion,
  availablePathnames: ReadonlySet<string>,
): string {
  const currentVersion = getDocsVersion(pathname);
  const currentRoot = getVersionRoot(currentVersion);
  const suffix = isDocsPath(pathname) ? pathname.slice(currentRoot.length) : '';
  const targetRoot = getVersionRoot(targetVersion);
  const candidate = `${targetRoot}${suffix}`;

  if (availablePathnames.has(candidate)) return candidate;

  return targetRoot;
}

export function getSearchTags(pathname: string): string[] {
  return [getDocsVersion(pathname)];
}

export function isArchivedPage(pathname: string): boolean {
  return getDocsVersion(pathname) !== latestDocsVersion;
}
