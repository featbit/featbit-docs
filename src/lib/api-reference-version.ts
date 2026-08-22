import {
  docsVersions,
  getVersionRoot,
  latestDocsVersion,
  type DocsVersion,
} from './docs-version';

const apiReferenceRoute = '/api-reference';

export function isDocsVersion(value: string): value is DocsVersion {
  return docsVersions.some((version) => version.id === value);
}

export function getApiReferenceVersionFromPathname(pathname: string): DocsVersion | null {
  if (pathname !== apiReferenceRoute && !pathname.startsWith(`${apiReferenceRoute}/`)) return null;

  const firstSegment = pathname.slice(apiReferenceRoute.length).split('/').filter(Boolean)[0];
  return firstSegment && isDocsVersion(firstSegment) ? firstSegment : latestDocsVersion;
}

export function getApiReferencePath(version: DocsVersion): string {
  return version === latestDocsVersion ? apiReferenceRoute : `${apiReferenceRoute}/${version}`;
}

export function getApiGuidesPath(version: DocsVersion): string {
  return `${getVersionRoot(version)}/api-docs`;
}
