---
name: FeatBit API Reference
description: A native Fumadocs OpenAPI experience for finding, configuring, and testing FeatBit REST API endpoints.
colors:
  operational-canvas: "var(--color-fd-background)"
  command-surface: "var(--color-fd-background)"
  control-surface: "var(--color-fd-secondary)"
  control-surface-hover: "var(--color-fd-muted)"
  primary-text: "var(--color-fd-foreground)"
  secondary-text: "var(--color-fd-muted-foreground)"
  seam: "var(--color-fd-border)"
  control-seam: "var(--color-fd-border)"
  focus: "var(--color-fd-primary)"
  archived-surface: "color-mix(in oklab, var(--color-fd-warning) 10%, var(--color-fd-background))"
  archived-text: "color-mix(in oklab, var(--color-fd-warning) 65%, var(--color-fd-foreground))"
typography:
  title:
    fontFamily: "inherit, sans-serif"
    fontSize: "15px"
    fontWeight: 700
    letterSpacing: "-0.02em"
  body:
    fontFamily: "inherit, sans-serif"
    fontSize: "13px"
  label:
    fontFamily: "inherit, sans-serif"
    fontSize: "12px"
    fontWeight: 600
rounded:
  control: "8px"
  keycap: "5px"
spacing:
  compact: "8px"
  control-gap: "10px"
  command-padding: "10px 18px"
components:
  command-control:
    backgroundColor: "{colors.control-surface}"
    textColor: "{colors.primary-text}"
    rounded: "{rounded.control}"
    height: "38px"
  command-control-hover:
    backgroundColor: "{colors.control-surface-hover}"
    textColor: "{colors.primary-text}"
    rounded: "{rounded.control}"
    height: "38px"
---

# Design System: FeatBit API Reference

## Overview

**Creative North Star: “The Native Operation Page”**

The API Reference follows the same information model as the official Fumadocs OpenAPI example: the shared Fumadocs Notebook header, an API-only endpoint sidebar, and one operation per page with request controls, contract documentation, code examples, and response examples.

The site-level shell is shared with `/docs`, while the sidebar tree is dedicated to API operations. The current reference lives at `/api-reference`; the preserved v5 reference lives at `/api-reference/v5` and is selected from the sidebar version control.

Both reference roots are direct overview pages rather than redirects. Their reading and DOM order is version state when applicable, Request setup, Need implementation guidance with a version-appropriate API Guides link, then Browse endpoints. This sequence orients the user before they enter a single-operation workflow.

The shared Header presents `Docs` and `API Reference` as peer content surfaces. Switching moves to the target surface root while preserving the selected latest/v5 version; version selection itself remains in the sidebar.

Implementation truth is held in `src/lib/api-reference-source.ts`, `src/components/api-reference-site-layout.tsx`, and the generated `content/api-reference/` operation pages.

## Colors

Fumadocs semantic theme surfaces keep the shared header, API sidebar, operation panel, and code examples synchronized in both light and dark modes. Fine neutral seams separate controls and regions; color remains sparse and meaningful. HTTP methods use the native OpenAPI semantic colors.

**The Sparse State Color Rule.** Do not turn violet or green into broad decorative fills; their rarity preserves operational meaning.

## Typography

Use compact sans typography with restrained weight contrast. Endpoint reading and code typography remain governed by Fumadocs OpenAPI.

**The Tool, Not Hero Rule.** Do not introduce marketing-scale display type, slogans, or oversized headings into the reference shell.

## Layout

The desktop shell begins with the same Fumadocs Notebook header used by `/docs`. Below it, the API sidebar groups operations by tag and the content area splits into operation documentation plus a 400px sticky code/response column when space permits.

At narrow widths the sidebar becomes a drawer and the code/response column moves below the operation documentation. Server URLs and endpoint paths remain scrollable or truncated within their native controls.

On the overview pages, request setup is a two-column explanatory split on desktop and a stacked sequence on mobile. Implementation guidance follows setup and precedes the endpoint tag index, which remains a flat, full-width bordered list with one resource and its endpoint count per row; it does not become a card grid.

## Elevation & Depth

The system is flat by default. Depth comes from tonal layering and one-pixel seams rather than shadows, gradients, blur, or glass effects. Hover raises contrast within the same charcoal family; focus uses a clear violet outline.

## Shapes

Controls use modest 8px corners and fine borders. Small keyboard hints use a tighter 5px radius. Avoid pills, oversized rounding, ornamental containers, and card-grid composition in the command shell.

## Components

### API reference overview

- Renders directly at `/api-reference` for Latest and `/api-reference/v5` for the archived version; neither root redirects to an endpoint.
- Opens with the native Docs title and description, followed by compact document sections rather than a marketing hero.
- Keeps the overview reading and DOM order as version state when applicable, Request setup, Need implementation guidance, then Browse endpoints.
- Explains the FeatBit Cloud Server URL and the editable self-hosted behavior beside Access Token-only authentication. These are orientation copy, not duplicate request controls.
- Links implementation guidance to `/docs/api-docs` for Latest and `/docs/v5/api-docs` for v5.
- Lists OpenAPI tag resources as flat bordered rows with endpoint counts, clear focus treatment, and a directional affordance into the first endpoint in each resource.
- Shows a concise archived notice on v5 with an explicit link back to the latest API Reference.

### API sidebar

- Sits below the shared site header and contains only API version and endpoint navigation.
- Groups operations by OpenAPI tag and displays the HTTP method beside each operation summary.
- Uses the same responsive drawer behavior as the documentation sidebar.

### Global search

- Searches Docs and API Reference together within the current latest/v5 version.
- Labels page results with `Docs` or `API Reference` followed by their content hierarchy.
- Excludes the preserved legacy API reference pages so operations are not duplicated.

### Surface navigation

- Shows `Docs` and `API Reference` as first-level Header links with the current surface highlighted.
- Preserves latest/v5 when switching and routes to the target surface root rather than inventing page-to-operation mappings.
- Uses the native Fumadocs responsive menu so the same links remain available in the mobile sidebar drawer.

### Version control and archived notice

- Routes Latest to `/api-reference` and v5 to `/api-reference/v5`.
- Labels v5 as archived in the version selector and preserves the current operation when that path exists in the target version.
- On the v5 overview, pairs the archived label with guidance for existing v5 integrations and a recovery link to the latest overview.

### Operational controls

- Use 38px minimum height, modest corners, thin seams, visible hover contrast, and a two-pixel violet focus outline.
- Keep Access Token explicit; do not introduce JWT or a Bearer-prefix instruction.
- Keep API Guides as the bridge back to the version-appropriate Fumadocs content.

## Do's and Don'ts

### Do

- **Do** preserve the shared Docs header, API-only sidebar, and native operation-page composition.
- **Do** keep both version roots as direct, compact overview pages with explanatory request setup and a flat endpoint tag index.
- **Do** keep server choice, authentication, endpoint navigation, and version context easy to locate.
- **Do** use semantic controls, keyboard-visible focus, and responsive reduction that retains the core route context.
- **Do** treat `/api-reference` and `/api-reference/v5` as dedicated application routes, separate from the normal docs layout.

### Don't

- **Don't** add a marketing hero, card grid, gradients, glass effects, decorative shadows, or invented claims.
- **Don't** create duplicate controls that drift from the native OpenAPI request panel.
- **Don't** redirect either overview root to an arbitrary endpoint or replace the flat endpoint index with promotional cards.
- **Don't** proxy Access Tokens through an untrusted public service or imply browser requests bypass the selected server’s CORS policy.
- **Don't** erase the archived state or make v5 look current.
