import { loader } from 'fumadocs-core/source';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import { defineDocs } from 'fumadocs-mdx/macro';
import { openapiPlugin } from 'fumadocs-openapi/server';

const apiReferenceDocs = defineDocs({
  dir: 'content/api-reference',
  docs: {
    schema: pageSchema,
  },
  meta: {
    schema: metaSchema,
  },
});

export const apiReferenceSource = loader({
  baseUrl: '/api-reference',
  source: apiReferenceDocs.toFumadocsSource(),
  plugins: [openapiPlugin()],
});
