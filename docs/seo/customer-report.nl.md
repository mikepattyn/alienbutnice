# SEO-overdracht — AlienButNice

Datum: 2026-09-19
Canonieke host: https://alienbutnice.nl
Pakket: extras.seo op site-starter (+EUR 350 excl. btw)

Dit rapport beschrijft wat er is geïmplementeerd en wat er is gemeten. Het voorspelt geen posities, verkeer of rankings.

## Wat er is gedaan

| Spoor | Klaar | Toelichting |
|-------|-------|-------------|
| A — Signalen in de HTML die de server teruggeeft | ja | Titel, beschrijving, self-canonical, Organization JSON-LD, één `h1`, `alt` op de home. Alleen Engels; geen `hreflang`. |
| B — `robots.txt` en gegenereerde `sitemap.xml` | ja | Sitemap is gelijk aan de indexeerbare set (alleen de home). `loc` + waarheidsgetrouwe `lastmod`. Gegenereerd uit `seo-audit.config.json`. |
| C — Aflevering (statuscodes, canonieke host, cache, compressie) | pending platform hosting wave | `404.html` zit in deze tree. `www` → apex 301 en echte 404 naar `/404.html` zijn parent-CDK. Niet deployen vanuit dit rapport. |
| D — Bewijs (checker, CONTEXT.md Search, dit rapport) | ja | Structurele `seo-audit` op `dist/`. Live origin gecontroleerd voor de indexeerbare URL. Measure blokkeert nooit. |

## URL-inventaris

| URL | Type | Staat | Toelichting |
|-----|------|-------|-------------|
| https://alienbutnice.nl/ | home | indexeerbaar | Signalen in de ruwe HTML. In de sitemap. Toegestaan door `robots.txt`. |
| onbekende paden | — | geen pagina | Moet een echte 404 met `/404.html` geven. Pending platform hosting wave. |
| https://www.alienbutnice.nl/… | — | geen pagina | Moet 301 naar de apex. Pending platform hosting wave. |

## Wat er is gemeten

Core Web Vitals zijn veldmetrieken, beoordeeld op het 75e percentiel van pageviews. Een labrun kan INP niet meten (geen gebruikersinvoer); Total Blocking Time is de gedocumenteerde lab-proxy. Velddata komt uit het Chrome User Experience Report. Een nieuwe of rustige site toont vaak **onvoldoende velddata** — dat is gedocumenteerd gedrag, geen fout.

| Bron | LCP | INP / TBT | CLS | Toelichting |
|------|-----|-----------|-----|-------------|
| Lab (Lighthouse) | niet lokaal gedraaid | TBT niet lokaal gedraaid (INP-proxy) | niet lokaal gedraaid | `seo-audit --measure` is geen poort; deze run had geen lokale Lighthouse |
| Veld p75 (CrUX) | onvoldoende velddata | onvoldoende velddata | onvoldoende velddata | Geen CrUX-record in deze run |

Drempels (goed / slecht): LCP ≤ 2500 ms / > 4000 ms; INP ≤ 200 ms / > 500 ms; CLS ≤ 0,1 / > 0,25.

`seo-audit` structureel: ok (`seo-audit: structural ok` op `dist/`).
`seo-audit` live: ok voor de indexeerbare URL (`https://alienbutnice.nl/` geeft 200). `www` en onbekende paden geven nog 200 met de home-shell — Track C, geen structurele fout van deze tree.

## Wat bij jou blijft

Dit kan niet uit code worden geleverd. Het staat hier zodat het pakket niet te veel belooft.

- **Google Bedrijfsprofiel** — claimen, verifiëren, uren en categorieën waarheidsgetrouw houden.
- **NAP-consistentie** — naam, adres en telefoon hetzelfde op de site, GBP en gidsen. Geen adres verzinnen.
- **Beoordelingen** — echte klantervaringen op GBP of een andere derde partij. Deze site markeert geen eigen sterren; Google maakt dat ongeldig.
- **Inhoud** — de tekst op de pagina, nieuwe dienst- of locatiepagina's, foto's die van jou zijn.
- **Links** — andere sites die je noemen. Wij kopen of ruilen geen links.
- **Search Console** — eigendom verifiëren, sitemap indienen, indexering en Core Web Vitals. De door Google gekozen canonical en een eventuele soft-404-uitspraak staan daar, niet in onze checker.

## Inhoudslacunes die we van de site zelf kunnen aantonen

- Geen openbaar straatadres, telefoon of e-mail op de pagina, dus geen `LocalBusiness`-NAP om te markeren.
- Geen contact- of juridische URL.
- Echo wordt aangekondigd als coming; er is geen aparte dienst- of product-URL.
- README noemt Staying Grounded; deze origin heeft daar geen pagina voor.

## Wat we niet doen

- Een positie of verkeerscijfer beloven.
- Titels volproppen, tekst verbergen of deurpaginia's bouwen.
- `FAQPage`- of `HowTo`-markup verkopen als rich result (die features staan uit).
- `llms.txt` leveren als zoekmachinecontrole (het is een informeel voorstel, geen standaard).
- `Google-Extended` blokkeren als manier om uit AI-overzichten te blijven (dat token doet dat niet).
