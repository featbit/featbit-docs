---
version: 1
slug: "route-api-reference"
primary_target: "route:/api-reference"
related_targets: ["route:/api-reference/v5"]
---

## Scope and mode

- Route: `/api-reference` and archived version routes such as `/api-reference/v5`.
- Mode: Read on the overview roots. They orient developers before endpoint work; linked single-operation pages retain the established Operate behavior in the shared documentation shell.

## Audience and job

- External developers integrating with FeatBit REST APIs.
- Understand request setup, browse endpoint resources, select the correct documentation version and server, configure an Access Token, inspect request/response contracts, and test a request.

## Required content and behavior

- Latest and v5 OpenAPI documents are selected through stable paths.
- `/api-reference` and `/api-reference/v5` render direct overview pages; neither route redirects to an endpoint.
- Each overview uses native Docs title, description, and body structure with compact document sections.
- The overview reading and DOM order is version state when applicable, Request setup, Need implementation guidance, then Browse endpoints.
- Request setup is an explanatory two-column split on desktop and a stacked sequence on mobile. It shows the FeatBit Cloud Server URL, states that self-hosted users can replace it in an endpoint request panel, and names Access Token as the only authentication method.
- Need implementation guidance links to `/docs/api-docs` for Latest and `/docs/v5/api-docs` for v5, before the endpoint index.
- Endpoint tags appear in a flat bordered index with an endpoint count and directional affordance per row. Each row enters the first operation for that resource; the API sidebar remains the complete endpoint tree.
- The v5 overview identifies the version as archived, limits its recommendation to existing v5 integrations, and links back to the latest API Reference for new integrations.
- The route reuses the same Fumadocs Notebook header shell as `/docs`, including site identity, global search, community links, GitHub, and theme.
- The shared Header exposes `Docs` and `API Reference` as peer destinations and preserves latest/v5 when switching surfaces.
- A version control sits at the top of the API-specific sidebar; endpoint pages are grouped by OpenAPI tag and show HTTP method badges.
- Every operation has its own page with request controls in the main column and sticky code/response examples on wide screens.
- Server selection and Access Token authentication are provided by the native OpenAPI operation panel.
- Global search includes both Docs and API Reference pages from the current documentation version and labels their content type.

## Approved direction

- Reference: the native Fumadocs OpenAPI operation layout.
- Direction: compact native documentation overview at each version root, then the shared Docs header, API-only endpoint sidebar, single-operation content, and responsive code/response column.

## Composition and implementation inventory

| Ingredient | Commitment | Medium |
| --- | --- | --- |
| Site header | Exact Fumadocs Notebook header shell shared with `/docs` | `DocsLayout` and shared `baseOptions()` |
| Surface navigation | Version-aware `Docs` and `API Reference` links with active state | Native Fumadocs Header links |
| Global search | Current-version Docs and API operations with distinct result breadcrumbs | Combined Fumadocs advanced search index |
| Overview | Direct version root with title and description, followed by version state when applicable, setup, version-aware guides bridge, and endpoint index | Native Notebook `DocsPage`, `DocsTitle`, `DocsDescription`, and `DocsBody` |
| Request setup | Cloud Server URL plus editable self-hosted behavior; Access Token only | Explanatory desktop split that stacks on mobile |
| Endpoint index | OpenAPI tags with live endpoint counts and row links into each resource | Flat full-width bordered list |
| Archived recovery | v5 context for existing integrations and a latest-version path for new work | Inline archived notice with latest API Reference link |
| Endpoint navigation | Tag groups, operation summaries, HTTP method badges | Fumadocs page tree and `openapiPlugin()` |
| Version | Latest/v5 paths and archived label | Sidebar version control and shared `docsVersions` data |
| Server | Custom server variable defaults to FeatBit Cloud and remains editable | Native Fumadocs OpenAPI request panel |
| Authentication | Access Token only | Normalized OpenAPI security scheme |
| Reference body | One operation per page, request controls, contract docs, code and responses | `fumadocs-openapi` |
| Responsive behavior | Sidebar drawer and single-column operation layout on small screens | Native Fumadocs Notebook/OpenAPI behavior |

## Constraints

- No JWT or Bearer prefix.
- No public request proxy.
- No redirect from a version root to an arbitrary endpoint.
- No marketing hero, card grid, gradients, glass effects, or invented claims.
- No duplicated operational server or authentication controls on the overview; setup content explains where to use the endpoint request panel.
- Keep this information order scoped to the overview roots; single-operation page composition and visual styling remain unchanged.
- Preserve user-authored multi-version changes and avoid broad edits to versioned content.
