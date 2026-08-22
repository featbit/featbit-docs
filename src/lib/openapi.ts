import type { OpenAPIV3_2 } from 'fumadocs-openapi';
import { createOpenAPI } from 'fumadocs-openapi/server';
import latestSchema from '../../openapi/featbit.json';
import v5Schema from '../../openapi/v5/featbit.json';
import { isArchivedPage } from './docs-version';

function createDocument(schema: unknown): OpenAPIV3_2.Document {
  const document = structuredClone(schema) as OpenAPIV3_2.Document;

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

export const openapi = createOpenAPI({
  input: {
    featbit: createDocument(latestSchema),
  },
});

const v5Openapi = createOpenAPI({
  input: {
    featbit: createDocument(v5Schema),
  },
});

export function getOpenAPIForPage(pageUrl: string) {
  return isArchivedPage(pageUrl) ? v5Openapi : openapi;
}
