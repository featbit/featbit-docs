import type * as PageTree from 'fumadocs-core/page-tree';
import { getApiReferencePath, getApiReferenceVersionFromPathname } from './api-reference-version';
import { docsVersions, latestDocsVersion, type DocsVersion } from './docs-version';

function containsVersionPage(node: PageTree.Node, version: DocsVersion): boolean {
  const root = getApiReferencePath(version);
  const prefix = `${root}/`;

  if (node.type === 'page') return node.url === root || node.url.startsWith(prefix);
  if (node.type !== 'folder') return false;
  if (node.index && containsVersionPage(node.index, version)) return true;
  return node.children.some((child) => containsVersionPage(child, version));
}

function isVersionFolder(node: PageTree.Node, version: DocsVersion): node is PageTree.Folder {
  return node.type === 'folder' && containsVersionPage(node, version);
}

function isArchivedVersionFolder(node: PageTree.Node): node is PageTree.Folder {
  return docsVersions.some(
    (version) => version.id !== latestDocsVersion && isVersionFolder(node, version.id),
  );
}

export function getApiReferencePageTree(tree: PageTree.Root, pathname: string): PageTree.Root {
  const version = getApiReferenceVersionFromPathname(pathname) ?? latestDocsVersion;

  if (version === latestDocsVersion) {
    return {
      ...tree,
      children: tree.children.filter((node) => !isArchivedVersionFolder(node)),
    };
  }

  const versionFolder = tree.children.find((node) => isVersionFolder(node, version));
  if (!versionFolder) return tree;

  return {
    ...tree,
    name: versionFolder.name,
    children: versionFolder.index
      ? [versionFolder.index, ...versionFolder.children]
      : versionFolder.children,
  };
}
