# AlienButNice

Brand static site for [alienbutnice.nl](https://alienbutnice.nl) — home of **Echo**. Angular 22, prerendered to `dist/`.

```bash
npm install
npm run dev
```

`npm run dev` serves on http://127.0.0.1:5173.

```bash
npm test
npm run lint
npm run build
```

`npm run build` writes `dist/index.html` and `dist/404.html` for the umbrella S3/CloudFront sync.
