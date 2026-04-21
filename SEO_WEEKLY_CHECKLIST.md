# Weekly Technical SEO Checklist

Use this every week to monitor and improve SEO health for CCMT College Finder.

## 1) Indexing Health (Google Search Console)
- Check Coverage report for new errors.
- Check Excluded URLs for unexpected route exclusions.
- Verify core routes remain indexed:
  - https://ccmtcollegefinder.web.app/
  - https://ccmtcollegefinder.web.app/explorer
  - https://ccmtcollegefinder.web.app/predictor
  - https://ccmtcollegefinder.web.app/institutes_and_programs
- If any key route is not indexed, use URL Inspection and request indexing.

## 2) Sitemap and Robots Health
- Open and verify sitemap loads:
  - https://ccmtcollegefinder.web.app/sitemap.xml
- Confirm robots file is reachable:
  - https://ccmtcollegefinder.web.app/robots.txt
- Confirm sitemap is submitted in Search Console and status is Success.

## 3) Query Performance Tracking (GSC Performance)
- Compare last 7 days vs previous 7 days for:
  - Total clicks
  - Total impressions
  - Average CTR
  - Average position
- Track priority queries:
  - ccmt college predictor
  - ccmt college finder
  - gate college predictor ccmt
  - ccmt cutoff 2025
  - ccmt preference filling
- Identify 3 queries with high impressions but low CTR for metadata refinement.

## 4) Page-Level Performance Review
- Review clicks/impressions for:
  - /
  - /explorer
  - /predictor
  - /institutes_and_programs
- Note which route dropped the most and investigate metadata/schema/crawl issues.

## 5) Structured Data Validation
- Validate JSON-LD on key routes with Rich Results Test:
  - Home: WebSite + SearchAction
  - Explorer: BreadcrumbList
  - Predictor: BreadcrumbList + SoftwareApplication
  - Institutes: BreadcrumbList + ItemList
- Confirm no critical errors. Warnings can be logged for later optimization.

## 6) Metadata Integrity Check
- Verify canonical tags are correct and self-referencing.
- Verify route title and meta description remain present.
- Verify route OG/Twitter image URLs resolve:
  - /og/home-og.png
  - /og/explorer-og.png
  - /og/predictor-og.png
  - /og/institutes-programs-og.png

## 7) Core Web Vitals and Speed
- Run PageSpeed Insights for key routes.
- Record:
  - LCP
  - INP
  - CLS
- If LCP degrades, prioritize above-the-fold render and image/font loading improvements.

## 8) Crawl and Runtime Sanity
- Ensure no accidental noindex tags were introduced.
- Confirm no route returns unexpected 404/5xx errors.
- Confirm static data JSON endpoints still load.

## 9) Weekly Action Log
- Date:
- Owner:
- Biggest issue found:
- Fix applied:
- Expected SEO impact:
- Follow-up test date:

## 10) Next Week Priorities
- List top 3 actions for next week.
- Keep one action for CTR, one for indexing, and one for performance.
