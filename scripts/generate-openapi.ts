import { generateFiles } from 'fumadocs-openapi';
import { openapi } from '../src/lib/openapi';

const tagTitles: Record<string, string> = {
  AuditLog: 'Audit Logs',
  Environment: 'Environments',
  FeatureFlag: 'Feature Flags',
  Group: 'Groups',
  Member: 'Members',
  Policy: 'Policies',
  Project: 'Projects',
  Segment: 'Segments',
  Workspace: 'Workspaces',
};

async function main() {
  await generateFiles({
    input: openapi,
    output: './content/docs/api-reference',
    per: 'tag',
    meta: true,
    includeDescription: true,
    addGeneratedComment: true,
    frontmatter(title, _description, context) {
      if (context.type !== 'tag') return {};
      const tagName = context.tag.name;

      return {
        title: tagName ? (tagTitles[tagName] ?? title) : title,
      };
    },
    beforeWrite(files) {
      const meta = files.find((file) => file.path === 'meta.json');
      if (!meta) return;

      const data = JSON.parse(meta.content) as Record<string, unknown>;
      meta.content = JSON.stringify(
        {
          ...data,
          title: 'API Reference',
        },
        null,
        2,
      );
    },
  });
}

void main();
