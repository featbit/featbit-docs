import { getLLMText, source } from '@/lib/source';
import { isArchivedPage } from '@/lib/docs-version';

export const revalidate = false;

export async function GET() {
  const scan = source
    .getPages()
    .filter((page) => !isArchivedPage(page.url))
    .map(getLLMText);
  const scanned = await Promise.all(scan);

  return new Response(scanned.join('\n\n'));
}
