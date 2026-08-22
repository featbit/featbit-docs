import type * as PageTree from 'fumadocs-core/page-tree';
import {
  docsVersions,
  getDocsVersion,
  getVersionRoot,
  latestDocsVersion,
  type DocsVersion,
} from './docs-version';

function isVersionFolder(
  node: PageTree.Node,
  version: DocsVersion,
): node is PageTree.Folder {
  if (node.type !== 'folder') return false;

  const versionRoot = getVersionRoot(version);
  const versionPrefix = `${versionRoot}/`;

  function containsVersionPage(child: PageTree.Node): boolean {
    if (child.type === 'page') {
      return child.url === versionRoot || child.url.startsWith(versionPrefix);
    }

    if (child.type !== 'folder') return false;
    if (child.index && containsVersionPage(child.index)) return true;
    return child.children.some(containsVersionPage);
  }

  if (node.index && containsVersionPage(node.index)) return true;
  return node.children.some(containsVersionPage);
}

function isArchivedVersionFolder(node: PageTree.Node): node is PageTree.Folder {
  return docsVersions.some(
    (version) => version.id !== latestDocsVersion && isVersionFolder(node, version.id),
  );
}

export function getVersionedPageTree(tree: PageTree.Root, pathname: string): PageTree.Root {
  const version = getDocsVersion(pathname);

  if (version === latestDocsVersion) {
    return {
      ...tree,
      children: tree.children.filter((node) => !isArchivedVersionFolder(node)),
    };
  }

  const archivedFolder = tree.children.find((node) => isVersionFolder(node, version));
  if (!archivedFolder) return tree;

  const children = archivedFolder.index
    ? [archivedFolder.index, ...archivedFolder.children]
    : archivedFolder.children;

  return {
    ...tree,
    name: archivedFolder.name,
    children,
  };
}
