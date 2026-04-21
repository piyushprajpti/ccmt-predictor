# SEO Advanced Implementation Plan (Phase-Based)

## Objective
Implement the next SEO layer in the exact order requested:
1. Advanced per-page JSON-LD
2. Route-specific Open Graph image metadata + placeholders
3. Weekly technical SEO checklist workflow

This plan avoids changing visible on-page content and focuses only on technical SEO signals.

## Scope
- In scope:
  - JSON-LD for SearchAction, SoftwareApplication, ItemList, BreadcrumbList
  - Route-level OG image metadata for Home, Explorer, Predictor, Institutes & Programs
  - OG image placeholder assets in public folder
  - A monitoring checklist file for weekly SEO operations
- Out of scope:
  - UI content rewrites
  - New visible page sections
  - Backlink outreach execution

## Current Baseline (Already Implemented)
- Global metadata and social metadata in root layout
- Route-level metadata for key routes
- Robots and sitemap generation
- Basic JSON-LD component
- Google Analytics script mount

## Phase 1: Advanced Per-Page JSON-LD

### 1.1 Global WebSite + SearchAction
Purpose:
- Help Google understand site intent and route structure.

Implementation:
- Update [components/json-ld.tsx](components/json-ld.tsx)
- Add SearchAction block under WebSite schema:
  - target URL template pointing to explorer route with a query parameter
  - query-input as required name

Data model:
- @type: WebSite
- name, description, url, image
- potentialAction: SearchAction

Acceptance criteria:
- JSON-LD is valid in Rich Results Test.
- SearchAction appears in rendered page source on homepage.

### 1.2 Predictor Page SoftwareApplication JSON-LD
Purpose:
- Clarify that predictor route is an interactive prediction tool.

Implementation option:
- Create page-specific schema component:
  - [components/seo/predictor-json-ld.tsx](components/seo/predictor-json-ld.tsx)
- Mount only in predictor route layout or page:
  - [app/predictor/layout.tsx](app/predictor/layout.tsx) or [app/predictor/page.tsx](app/predictor/page.tsx)

Data model:
- @type: SoftwareApplication
- name, applicationCategory, operatingSystem, url
- description aligned to existing route metadata
- offers with price 0 and currency

Acceptance criteria:
- Schema present only on predictor route.
- Validation passes with no critical errors.

### 1.3 Institutes & Programs ItemList JSON-LD
Purpose:
- Indicate list-centric route content for entities.

Implementation option:
- Create route-specific schema component:
  - [components/seo/institutes-programs-json-ld.tsx](components/seo/institutes-programs-json-ld.tsx)
- Mount in [app/institutes_and_programs/layout.tsx](app/institutes_and_programs/layout.tsx)

Data model:
- @type: ItemList
- name, description, itemListOrder, numberOfItems
- itemListElement with static top-level entries representing route categories

Acceptance criteria:
- Schema present only on institutes route.
- ItemList validates successfully.

### 1.4 BreadcrumbList for Internal Routes
Purpose:
- Improve route hierarchy understanding and SERP breadcrumbs.

Implementation:
- Create reusable component:
  - [components/seo/breadcrumb-json-ld.tsx](components/seo/breadcrumb-json-ld.tsx)
- Mount on:
  - [app/explorer/layout.tsx](app/explorer/layout.tsx)
  - [app/predictor/layout.tsx](app/predictor/layout.tsx)
  - [app/institutes_and_programs/layout.tsx](app/institutes_and_programs/layout.tsx)

Data model:
- @type: BreadcrumbList
- Home > Current Route

Acceptance criteria:
- Each internal route emits correct breadcrumb schema with canonical URLs.
- No duplicate conflicting breadcrumbs on same route.

## Phase 2: Route-Specific OG Image Metadata + Placeholders

### 2.1 Metadata Wiring
Purpose:
- Increase click-through from social link previews.

Implementation:
- Update route metadata image URLs to route-specific assets:
  - [app/layout.tsx](app/layout.tsx) for home default
  - [app/explorer/layout.tsx](app/explorer/layout.tsx)
  - [app/predictor/layout.tsx](app/predictor/layout.tsx)
  - [app/institutes_and_programs/layout.tsx](app/institutes_and_programs/layout.tsx)

Target image names:
- /og/home-og.jpg
- /og/explorer-og.jpg
- /og/predictor-og.jpg
- /og/institutes-programs-og.jpg

Metadata fields per route:
- openGraph.images with width, height, alt
- twitter.images aligned with OG image

Acceptance criteria:
- Route previews reference distinct OG image paths.
- No broken image URLs in production.

### 2.2 Placeholder Asset Creation
Purpose:
- Ensure metadata is immediately valid before final design assets are ready.

Implementation:
- Add placeholder image files in public folder:
  - [public/og/home-og.jpg](public/og/home-og.jpg)
  - [public/og/explorer-og.jpg](public/og/explorer-og.jpg)
  - [public/og/predictor-og.jpg](public/og/predictor-og.jpg)
  - [public/og/institutes-programs-og.jpg](public/og/institutes-programs-og.jpg)
- If real designed OG images are not available yet, temporarily copy existing logo-based image as placeholders.

Acceptance criteria:
- All placeholder assets are accessible by URL.
- Social debugger tools can fetch each image.

## Phase 3: Weekly Technical SEO Checklist Workflow

### 3.1 Checklist File
Purpose:
- Standardize repeatable weekly SEO maintenance.

Implementation:
- Create a workflow file:
  - [SEO_WEEKLY_CHECKLIST.md](SEO_WEEKLY_CHECKLIST.md)

Checklist sections:
- Indexing health
  - Search Console Coverage changes
  - New Excluded pages
- Sitemap health
  - sitemap.xml fetch status
  - URL counts stable
- Query performance
  - Top queries impressions and CTR trend
  - Page-level clicks (home/explorer/predictor/institutes)
- Structured data validation
  - Check Rich Results Test on key routes
- CWV and performance
  - LCP/INP/CLS snapshots for key routes
- Metadata integrity
  - Canonical correctness
  - OG image URL reachability
- Action log
  - What changed this week
  - What to test next week

Acceptance criteria:
- Checklist can be followed by any developer/owner without ambiguity.
- Includes direct route URLs and expected pass/fail conditions.

## Execution Order (Strict)
1. Phase 1 (all JSON-LD tasks)
2. Phase 2 (OG metadata + placeholders)
3. Phase 3 (weekly checklist file)

## Validation Plan
- Run local build and metadata checks.
- Validate structured data using Google Rich Results Test for:
  - Home
  - Explorer
  - Predictor
  - Institutes & Programs
- Confirm robots and sitemap URLs remain correct.
- Confirm route OG images return HTTP 200.

## Risk Notes
- Overlapping schema blocks can create duplicates; use route-scoped mounts carefully.
- Placeholder OG images should be replaced with branded 1200x630 creatives later.
- SearchAction target must match real query path handling.

## Done Definition
- All required schema types are implemented and route-scoped correctly.
- Route-specific OG image metadata and placeholder assets are live.
- Weekly technical SEO checklist file exists and is actionable.
- No visible page content changed.
