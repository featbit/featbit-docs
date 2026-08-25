import type { OpenAPIV3_2 } from 'fumadocs-openapi';
import { createOpenAPI } from 'fumadocs-openapi/server';
import latestSchema from '../../openapi/featbit.json';
import v5Schema from '../../openapi/v5/featbit.json';
import { isArchivedPage, type DocsVersion } from './docs-version';

const tagDisplayNames: Record<string, string> = {
  AuditLog: 'Audit Logs',
  Environment: 'Environments',
  Experiment: 'Experiments',
  ExperimentLayer: 'Experiment Layers',
  ExperimentMetric: 'Experiment Metrics',
  ExperimentStats: 'Experiment Statistics',
  FeatureFlag: 'Feature Flags',
  Group: 'Groups',
  Member: 'Members',
  Policy: 'Policies',
  Project: 'Projects',
  Segment: 'Segments',
  Workspace: 'Workspaces',
};

const sourceDocuments: Record<DocsVersion, OpenAPIV3_2.Document> = {
  latest: latestSchema as unknown as OpenAPIV3_2.Document,
  v5: v5Schema as unknown as OpenAPIV3_2.Document,
};

type TagWithDisplayName = OpenAPIV3_2.TagObject & {
  'x-displayName'?: unknown;
};

function hasSchemaDisplayName(tag: OpenAPIV3_2.TagObject): boolean {
  const schemaDisplayName = (tag as TagWithDisplayName)['x-displayName'];
  return typeof schemaDisplayName === 'string' && schemaDisplayName.trim().length > 0;
}

function collectOperationTags(document: OpenAPIV3_2.Document): Set<string> {
  const tags = new Set<string>();
  const pathCollections = [document.paths, document.webhooks];

  for (const paths of pathCollections) {
    for (const pathItem of Object.values(paths ?? {})) {
      if (!pathItem || typeof pathItem !== 'object') continue;

      for (const operation of Object.values(pathItem)) {
        if (!operation || typeof operation !== 'object' || Array.isArray(operation)) continue;

        const operationTags = (operation as { tags?: unknown }).tags;
        if (!Array.isArray(operationTags)) continue;

        for (const tag of operationTags) {
          if (typeof tag === 'string' && tag.length > 0) tags.add(tag);
        }
      }
    }
  }

  return tags;
}

export function assertTagDisplayNames(
  documents: Readonly<Record<string, OpenAPIV3_2.Document>> = sourceDocuments,
): void {
  const missing: Array<{ version: string; tag: string }> = [];

  for (const [version, document] of Object.entries(documents)) {
    const schemaDisplayNames = new Set(
      (document.tags ?? [])
        .filter((tag) => Boolean(tag.name) && hasSchemaDisplayName(tag))
        .map((tag) => tag.name as string),
    );
    const schemaTags = new Set(
      (document.tags ?? []).map((tag) => tag.name).filter((tag): tag is string => Boolean(tag)),
    );

    for (const tag of collectOperationTags(document)) schemaTags.add(tag);

    for (const tag of schemaTags) {
      if (!(tag in tagDisplayNames) && !schemaDisplayNames.has(tag)) {
        missing.push({ version, tag });
      }
    }
  }

  if (missing.length === 0) return;

  const details = missing
    .sort(
      (left, right) =>
        left.tag.localeCompare(right.tag) || left.version.localeCompare(right.version),
    )
    .map(({ version, tag }) => `- ${tag} (${version})`)
    .join('\n');

  throw new Error(
    `OpenAPI tags are missing display names:\n${details}\n\n` +
      "Add each tag to tagDisplayNames in src/lib/openapi.ts, or define a non-empty 'x-displayName' on the tag in the OpenAPI schema.",
  );
}

function createDocument(schema: unknown): OpenAPIV3_2.Document {
  const document = structuredClone(schema) as OpenAPIV3_2.Document;

  if (document.info) document.info.title = 'FeatBit API Reference';
  document.tags = document.tags?.map((tag) => ({
    ...tag,
    'x-displayName':
      (tag as TagWithDisplayName)['x-displayName'] ??
      (tag.name ? (tagDisplayNames[tag.name] ?? tag.name) : undefined),
  }));

  document.servers = [
    {
      name: 'Custom Server',
      url: '{baseUrl}',
      description: 'Choose the FeatBit API server used by requests and code examples.',
      variables: {
        baseUrl: {
          default: 'https://app-api.featbit.co',
          description: 'Enter your FeatBit API server URL.',
        },
      },
    },
  ];
  document.security = [{ AccessToken: [] }];

  if (document.components?.securitySchemes) {
    delete document.components.securitySchemes.JwtBearer;
  }

  normalizeJsonMediaTypes(document);
  return document;
}

function normalizeJsonMediaTypes(value: unknown): void {
  if (!value || typeof value !== 'object') return;

  if (Array.isArray(value)) {
    for (const item of value) normalizeJsonMediaTypes(item);
    return;
  }

  const record = value as Record<string, unknown>;
  const content = record.content;

  if (content && typeof content === 'object' && !Array.isArray(content)) {
    const mediaTypes = content as Record<string, unknown>;

    if ('application/json' in mediaTypes) {
      delete mediaTypes['application/*+json'];
      delete mediaTypes['text/json'];
    }
  }

  for (const child of Object.values(record)) normalizeJsonMediaTypes(child);
}

export const apiReferenceDocuments: Record<DocsVersion, OpenAPIV3_2.Document> = {
  latest: createDocument(sourceDocuments.latest),
  v5: createDocument(sourceDocuments.v5),
};

export const openapi = createOpenAPI({
  input: {
    featbit: apiReferenceDocuments.latest,
  },
});

export const v5Openapi = createOpenAPI({
  input: {
    featbit: apiReferenceDocuments.v5,
  },
});

export function getOpenAPIForPage(pageUrl: string) {
  return isArchivedPage(pageUrl) ? v5Openapi : openapi;
}
