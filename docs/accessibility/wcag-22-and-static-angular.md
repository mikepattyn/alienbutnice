# WCAG 2.2 AA, static Angular 22, and self-hosted fonts

Title: What WCAG 2.2 AA, Angular 22, and the OFL require for a prerendered alienbutnice.nl page
Author(s): W3C Accessibility Guidelines Working Group; Angular (angular.dev); SIL International; The Inter Project Authors; Matt McInerney / The League of Moveable Type; Google Fonts
Date: 2026-09-22
Source Type: vendor and standards documentation (primary)

## Key Thesis

A public marketing page conforms to WCAG 2.2 Level AA when bypass, titles, headings, visible unobscured focus, 24 CSS-pixel targets, and 4.5:1 text contrast hold in the HTML the origin returns. Angular 22 can emit that HTML as a static site (`outputMode: "static"`) with no Node server. Inter and Orbitron may be bundled under SIL OFL 1.1. Loading them from `fonts.googleapis.com` / `fonts.gstatic.com` sends the visitor IP to Google; self-hosting does not.

## Key Findings

1. **WCAG 2.2 AA is the additive target.** "The Accessibility Guidelines Working Group recommends that sites adopt WCAG 2.2 as their new conformance target." New AA criteria include 2.4.11 Focus Not Obscured (Minimum) and 2.5.8 Target Size (Minimum). Source: [WCAG 2.2](https://www.w3.org/TR/WCAG22/).

2. **Bypass, title, focus order, link purpose (A).** 2.4.1: "A mechanism is available to bypass blocks of content that are repeated on multiple web pages." 2.4.2: "Web pages have titles that describe topic or purpose." 2.4.3: focusable components receive focus in an order that preserves meaning. 2.4.4: link purpose from the link text or its programmatically determined context. Source: [WCAG 2.2](https://www.w3.org/TR/WCAG22/).

3. **Headings and visible focus (AA).** 2.4.6: "Headings and labels describe topic or purpose." 2.4.7: "Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible." Source: [WCAG 2.2](https://www.w3.org/TR/WCAG22/).

4. **Focus must not be entirely hidden (AA, new in 2.2).** 2.4.11: "When a user interface component receives keyboard focus, the component is not entirely hidden due to author-created content." A fixed nav that covers a focused control fails this. Source: [WCAG 2.2](https://www.w3.org/TR/WCAG22/).

5. **Pointer targets are at least 24 by 24 CSS pixels (AA, new in 2.2).** 2.5.8: "The size of the target for pointer inputs is at least 24 by 24 CSS pixels," with spacing, equivalent, inline, user-agent, and essential exceptions. Source: [WCAG 2.2](https://www.w3.org/TR/WCAG22/).

6. **Text contrast is 4.5:1; large text 3:1; UI chrome 3:1 (AA).** 1.4.3: "The visual presentation of text and images of text has a contrast ratio of at least 4.5:1" except large text (3:1), incidental, and logotypes. 1.4.11: user-interface components and graphical objects required to understand content have at least 3:1 against adjacent colors. Source: [WCAG 2.2](https://www.w3.org/TR/WCAG22/).

7. **Text spacing and hover/focus extras (AA).** 1.4.12: no loss of content when the user sets line height 1.5, paragraph spacing 2, letter spacing 0.12, word spacing 0.16 (relative to font size). 1.4.13: extra content shown on hover or focus is dismissible, hoverable, and persistent, unless the user agent owns the presentation (browser `title` tooltips). Skip links that become visible on focus are not "additional content." Source: [WCAG 2.2](https://www.w3.org/TR/WCAG22/).

8. **Auto-playing motion is 2.2.2 (A), not 2.3.3.** 2.2.2 Pause, Stop, Hide (Level A): moving information that starts automatically, lasts more than five seconds, and is presented in parallel with other content needs a pause, stop, or hide mechanism unless essential. 2.3.3 Animation from Interactions is **Level AAA**, so it is outside a WCAG 2.2 AA claim. Source: [WCAG 2.2](https://www.w3.org/TR/WCAG22/).

9. **Angular: reuse native HTML; manage focus after navigation.** "When authoring Angular components, you should re-use these native elements directly when possible, rather than re-implementing well-supported behaviors." After `Router` `NavigationEnd`, move focus into the newly routed main content; do not leave it on `body`. Source: [Accessibility in Angular](https://angular.dev/best-practices/a11y).

10. **Angular 22 needs Node 22.22.3+, TypeScript 6.0, RxJS 6.5 or 7.4.** The active-support table row for `22.0.x` is Node.js `^22.22.3 || ^24.15.0 || ^26.0.0`, TypeScript `>=6.0.0 <6.1.0`, RxJS `^6.5.3 || ^7.4.0`. There is no separate `22.1.x` row on that page. Source: [Version compatibility](https://angular.dev/reference/versions).

11. **A fully static Angular app is `outputMode: "static"`.** "When `outputMode` is set to `static`, Angular generates pre-rendered HTML files for each route at build time, but it does not generate a server file or require a Node.js server to serve the app." Set it on `projects.<app>.architect.build.options`. Source: [Server-side and hybrid-rendering](https://angular.dev/guide/ssr).

12. **New CLI apps test with Vitest.** "This guide covers the default testing setup for new Angular CLI projects, which uses Vitest." `ng test` launches that runner; `jsdom` emulates the DOM. Source: [Unit testing](https://angular.dev/guide/testing).

13. **Inter is SIL OFL 1.1.** "This Font Software is licensed under the SIL Open Font License, Version 1.1." Copyright 2016 The Inter Project Authors. Source: [Inter LICENSE.txt](https://raw.githubusercontent.com/rsms/inter/master/LICENSE.txt).

14. **Orbitron is SIL OFL 1.1 with reserved name Orbitron.** "This Font Software is licensed under the SIL Open Font License, Version 1.1." Copyright 2009 Matt McInerney, Reserved Font Name "Orbitron". Source: [Orbitron Open Font License](https://raw.githubusercontent.com/theleagueof/orbitron/master/Open%20Font%20License.markdown).

15. **Google Fonts CSS API receives the visitor IP; self-hosting does not send that visit to Google.** "When end users visit a website that embeds Google Fonts, their browsers send HTTP requests to the Google Fonts Web API." Those requests include the IP address, the requested URL, and HTTP headers (user agent, referer). "Instead of fetching fonts from Google servers, a developer may self-host web fonts on their website locally… When a font is loaded from the website operator’s servers, Google does not receive any kind of data related to the visits to the website." Source: [Google Fonts FAQ — Privacy](https://developers.google.com/fonts/faq/privacy).

## Methodology

Direct fetches of W3C WCAG 2.2, angular.dev (accessibility, versions, SSR, testing), Inter and Orbitron first-party license files, and Google Fonts privacy FAQ. No blogs or aggregators used as evidence.

## Limitations

- WCAG 2.2 has no “marketing page” profile. Level AA means every Level A and Level AA criterion (or a conforming alternate). The findings above are the criteria this page actually exercises, not a complete AA list.
- 2.4.1 applies when blocks are **repeated on multiple web pages**. Home and `/404.html` share the skip link and header; that is the bypass case here.
- Angular’s accessibility guide does not require exactly one `h1`. The example template contains an `h1`; the rule on that page is native HTML and focus after navigation. One page-level `h1` on this origin is the Search table in `CONTEXT.md`.
- Angular's versions table lists `22.0.x`, not a `22.1.x` row. npm `latest` on 2026-09-22 was `@angular/core@22.1.7`.
- angular.dev does not state the on-disk filename for a `404` route. The SSR guide says only "pre-rendered HTML files for each route."
- Contrast of gradient-clipped text over a photograph is not computable from these sources; it needs a visual check against 1.4.3 / 1.4.11.
- 2.3.3 is AAA. Citing it as an AA requirement would be incorrect.

## Actionable Takeaways

- Keep a skip link, descriptive `<title>`, labelled `<nav>`, and production hrefs in the prerendered HTML. Keep one page-level `h1` because this origin’s Search table requires it, not because Angular does.
- Give every link a visible `:focus-visible` ring that the fixed header does not cover (2.4.7, 2.4.11). Size nav targets to at least 24×24 CSS pixels (2.5.8).
- The original `--faint` (`#6b7394` on `#05040c`) sits under 4.5:1. Measure the shipped `--faint` and flare-script text on the hero against 4.5:1 / 3:1 before calling contrast done.
- Honor `prefers-reduced-motion` for the looping hero video (2.2.2). Do not claim 2.3.3 as AA.
- Pin Angular 22 + TypeScript 6.0 + Node 22.22.3 or newer. Set `outputMode: "static"`. Test with Vitest.
- Bundle Inter and Orbitron from OFL sources. Drop `fonts.googleapis.com` / `fonts.gstatic.com`.

## Notable Quotes

> "When `outputMode` is set to `static`, Angular generates pre-rendered HTML files for each route at build time, but it does not generate a server file or require a Node.js server to serve the app." ([Server-side and hybrid-rendering](https://angular.dev/guide/ssr))

> "When end users visit a website that embeds Google Fonts, their browsers send HTTP requests to the Google Fonts Web API." ([Google Fonts FAQ — Privacy](https://developers.google.com/fonts/faq/privacy))

## Claim table

| Claim | Source | Quoted support |
| --- | --- | --- |
| Adopt WCAG 2.2; 2.4.11 and 2.5.8 are new AA | https://www.w3.org/TR/WCAG22/ | "sites adopt WCAG 2.2 as their new conformance target"; "2.4.11 Focus Not Obscured (Minimum) (AA)"; "2.5.8 Target Size (Minimum) (AA)" |
| Bypass, title, focus order, link purpose | https://www.w3.org/TR/WCAG22/ | 2.4.1–2.4.4 Level A wording cited above |
| Headings describe purpose; focus is visible | https://www.w3.org/TR/WCAG22/ | 2.4.6, 2.4.7 Level AA wording cited above |
| Focus not entirely hidden | https://www.w3.org/TR/WCAG22/ | 2.4.11: "the component is not entirely hidden due to author-created content" |
| 24×24 CSS pixel targets | https://www.w3.org/TR/WCAG22/ | 2.5.8: "at least 24 by 24 CSS pixels" |
| Text 4.5:1; UI 3:1 | https://www.w3.org/TR/WCAG22/ | 1.4.3, 1.4.11 |
| Text spacing and hover extras | https://www.w3.org/TR/WCAG22/ | 1.4.12, 1.4.13 |
| Auto-play motion is 2.2.2 A; 2.3.3 is AAA | https://www.w3.org/TR/WCAG22/ | 2.2.2 Level A; 2.3.3 Level AAA |
| Prefer native HTML; focus after navigation | https://angular.dev/best-practices/a11y | "re-use these native elements directly when possible" |
| Angular 22 Node / TS / RxJS row | https://angular.dev/reference/versions | `22.0.x` / `^22.22.3` / `>=6.0.0 <6.1.0` / `^6.5.3 \|\| ^7.4.0` |
| Static output, no Node server | https://angular.dev/guide/ssr | `outputMode` `static` paragraph quoted above |
| Vitest is the default unit runner | https://angular.dev/guide/testing | "default testing setup for new Angular CLI projects, which uses Vitest" |
| Inter OFL 1.1 | https://raw.githubusercontent.com/rsms/inter/master/LICENSE.txt | "licensed under the SIL Open Font License, Version 1.1" |
| Orbitron OFL 1.1 | https://raw.githubusercontent.com/theleagueof/orbitron/master/Open%20Font%20License.markdown | same license line; reserved name Orbitron |
| Google Fonts API receives visitor IP; self-host avoids it | https://developers.google.com/fonts/faq/privacy | IP in HTTP requests; self-host sentence quoted above |
