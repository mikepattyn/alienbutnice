# SEO handover — AlienButNice

Date: 2026-09-19
Canonical host: https://alienbutnice.nl
Package: extras.seo on site-starter (+EUR 350 ex VAT)

This report states what was implemented and what was measured. It does not predict rankings, traffic, or positions.

## What was implemented

| Track | Done | Notes |
|-------|------|-------|
| A — Signals in the HTML the server returns | yes | Home title, description, self-canonical, Organization JSON-LD, one `h1`, image `alt`. English-only; no `hreflang`. |
| B — `robots.txt` and generated `sitemap.xml` | yes | Sitemap equals the indexable set (home only). `loc` + truthful `lastmod`. Built from `seo-audit.config.json`. |
| C — Delivery (status codes, canonical host, cache, compression) | pending platform hosting wave | `404.html` is in this tree. `www` → apex 301 and mapping unknown paths to `/404.html` with status 404 are parent CDK. Do not deploy from this report. |
| D — Evidence (checker, CONTEXT.md Search, this report) | yes | Structural `seo-audit` on `dist/`. Live origin checked for the indexable URL. Measure never gated. |

## URL inventory

| URL | Type | State | Notes |
|-----|------|-------|-------|
| https://alienbutnice.nl/ | home | indexable | Raw HTML signals. Listed in the sitemap. Allowed by `robots.txt`. |
| unknown paths | — | not a page | Must return a real 404 with `/404.html`. Pending platform hosting wave. |
| https://www.alienbutnice.nl/… | — | not a page | Must 301 to the apex. Pending platform hosting wave. |

## What was measured

Core Web Vitals are field-first and evaluated at the 75th percentile of page views. A lab run cannot measure INP (no user input); Total Blocking Time is the documented lab proxy. Field data comes from the Chrome User Experience Report. A new or low-traffic site will often show **insufficient field data** — that is documented behaviour, not a failure.

| Source | LCP | INP / TBT | CLS | Notes |
|--------|-----|-----------|-----|-------|
| Lab (Lighthouse) | not run locally | TBT not run locally (INP proxy) | not run locally | `seo-audit --measure` does not gate; no local Lighthouse in this run |
| Field p75 (CrUX) | insufficient field data | insufficient field data | insufficient field data | No CrUX record in this run |

Thresholds (good / poor): LCP ≤ 2500 ms / > 4000 ms; INP ≤ 200 ms / > 500 ms; CLS ≤ 0.1 / > 0.25.

`seo-audit` structural result: ok (`seo-audit: structural ok` on `dist/`).
`seo-audit` live result: ok for the indexable URL (`https://alienbutnice.nl/` returns 200). `www` and unknown paths still return 200 with the home shell — Track C, not a structural fail of this tree.

## What stays your job

These cannot be delivered from code. They are listed so the package does not overpromise.

- **Google Business Profile** — claim, verify, keep hours and categories truthful.
- **NAP consistency** — name, address, and phone the same on the site, GBP, and directories. Do not invent a missing address.
- **Reviews** — real customer reviews on GBP or another third-party host. This site will not mark up self-hosted stars; Google makes that ineligible.
- **Content** — the words on the page, new service or location pages, photos you own.
- **Links** — other sites mentioning you. We do not buy or trade links.
- **Search Console** — ownership verification, sitemap submission, and the indexing / Core Web Vitals reports. Google's selected canonical and any soft-404 verdict live there, not in our checker.

## Content gaps we can prove from the site

- No public street address, telephone, or email on the page, so there is nothing to mark up as `LocalBusiness` NAP.
- No contact or legal URL.
- Echo is announced as coming; there is no separate service or product URL.
- README names Staying Grounded; this origin has no page for it.

## What we will not do

- Promise a position or a traffic number.
- Write keyword-stuffed titles, hidden text, or doorway pages.
- Emit `FAQPage` or `HowTo` markup as a rich result (those features are off).
- Ship `llms.txt` as a search-engine control (it is an informal proposal, not a standard).
- Block `Google-Extended` as a way to leave AI Overviews (that token does not do that).
