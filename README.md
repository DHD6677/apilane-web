# apilane-web

> Marketing site for [apilane](https://apilane.one) - the cheapest LLM API gateway.

Bilingual (EN/ZH) Astro static site deployed on Cloudflare Pages. Covers landing page, model directory, model detail pages, blog, and pricing.

## Tech stack

- **Framework**: Astro (+ MDX, sitemap)
- **Styling**: Tailwind CSS
- **Hosting**: Cloudflare Pages
- **Domain**: `apilane.one` / `www.apilane.one`

## Structure

```
.
├── src/
│   ├── pages/
│   │   └── [locale]/       # i18n routes (en, zh)
│   │       ├── index.astro
│   │       ├── models/     # model directory + detail pages
│   │       └── blog/       # SEO/GEO blog posts
│   ├── components/
│   └── layouts/
├── public/                 # logo, favicon, blog images
├── _redirects              # e.g. /status -> UptimeRobot
├── _headers                # security headers
└── astro.config.mjs
```

## Develop

```bash
npm install
npm run dev
# open http://localhost:4321
```

## Build & deploy

```bash
npm run build           # outputs to dist/
npx wrangler pages deploy dist --project-name apilane-web
```

Or push to `main` - Cloudflare Pages auto-deploys from Git.

## Related

- [apilane](https://github.com/DHD6677/apilane) - Main project (Go backend + React console)
- [apilane-python](https://github.com/DHD6677/apilane-python) - Official Python SDK
- Live site: https://apilane.one

## License

MIT
