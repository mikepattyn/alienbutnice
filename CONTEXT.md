# AlienButNice

Brand surface for **alienbutnice.nl**: creative/personal hosting separate from mikepattyn product hostnames. Home of Echo.

## Language

**AlienButNice**:
The brand platform domain and this static site.
_Avoid_: treating it as a mikepattyn.nl product hostname

**Echo**:
The guardian of the space — persistent memory, always watching. Not a parrot / echo bot.

## Boundaries

- Owns marketing copy and static frontend for the brand apex.

## Stack

Vite · plain HTML/CSS/JS · Google Fonts (Orbitron, Inter)

## Visual theme

Cinematic cosmic nature — alien + Echo hero still/video, nebula, ringed planet, glowing crystals. Cyan and violet neon on deep space black.

## Search

Canonical host: `https://alienbutnice.nl`. English-only. No locale prefixes and no `hreflang`. `www.alienbutnice.nl` must 301 to the apex (Track C — pending platform hosting wave).

`robots.txt` is a `Sitemap:` line only. `sitemap.xml` is generated from `seo-audit.config.json` during `npm run build` (`loc` + truthful `lastmod`). The indexable set is the home page.

| URL | Type | State | Applicable signals | Present | Status | Sitemap |
|-----|------|-------|--------------------|---------|--------|---------|
| `https://alienbutnice.nl/` | home | indexable | unique title + description, self-canonical, `<html lang="en">`, one `h1`, Organization JSON-LD, image `alt`, real `href`s | title, description, canonical, lang, `h1` Echo & the others, Organization `name`/`url` from visible copy, alts, section links | 200 | yes |
| unknown paths | — | not a page | real 404, body `/404.html` | `404.html` ships with `noindex`; CloudFront 403/404 → `/404.html` is Track C | pending platform hosting wave (today the origin serves the home shell with 200) | no |
| `https://www.alienbutnice.nl/…` | — | not a page | 301 to apex | Track C | pending platform hosting wave (today `www` returns 200) | no |

There are no deliberately excluded URLs on this origin. Preview hosts are out of this tree.

Organization JSON-LD uses the visible name **Alienbutnice**. No street address, telephone, or hours appear on the page, so there is no `LocalBusiness` and no self-hosted `aggregateRating`.
