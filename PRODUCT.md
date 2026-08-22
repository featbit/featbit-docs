# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The primary users are external developers integrating with or automating FeatBit through its REST API.

## Product Purpose

FeatBit Docs helps users understand FeatBit and successfully implement integrations. The API reference must make it fast to find an endpoint, understand its contract, configure the correct server, authenticate with an Access Token, and test a request.

## Operating Context

API users work across FeatBit Cloud and self-hosted deployments. They move between conceptual API guides and endpoint-level reference material, and may test documented requests directly from the browser.

## Capabilities and Constraints

- The source of truth is the repository's FeatBit OpenAPI document.
- API authentication exposed in the reference is Access Token only.
- The default FeatBit Cloud API server is `https://app-api.featbit.co`.
- Users must be able to enter a custom server URL for self-hosted deployments.
- The native Fumadocs OpenAPI reference lives at `/api-reference` with one operation per page.
- Browser-sent requests remain subject to the selected API server's CORS policy. Access Tokens must not be routed through an untrusted public proxy.

## Brand Commitments

Use the FeatBit name and existing logo assets. API Guides and API Reference share the Fumadocs Notebook header shell, while API Reference uses an API-specific endpoint sidebar.

## Evidence on Hand

- OpenAPI source: `openapi/featbit.json`
- Existing FeatBit assets: `public/icon.svg`, `public/logo.png`
- API reference implementation: `src/lib/openapi.ts`, `src/lib/api-reference-source.ts`, `src/components/api-page.tsx`, and `content/api-reference/`

No testimonials, usage metrics, or unsupported commercial claims should be invented.

## Product Principles

- Make API Reference a first-class, easy-to-find destination.
- Optimize the reference for active API integration work, not only passive reading.
- Keep authentication and server selection explicit.
- Preserve a clear path back to API Guides.
- Keep major documentation-platform changes reversible.
