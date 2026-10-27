# Waez — a personal portfolio

A one-page, English-language portfolio with a pink paper background, layered SVG clouds, and inline project case studies. Built with Astro. All fonts and visual assets are self-hosted.

**Site:** https://onewaez.github.io/

## Development

Use Node.js 24 (see `.nvmrc`).

```sh
npm ci
npm run dev
```

## Build and verify

```sh
npm run check
npm run build
npm test
node scripts/verify-scale.mjs
```

`dist/` is the finished static site. No Node.js process, database, account, API key, or external asset service is needed to serve it.

## Add a project

Create a Markdown file in `src/content/projects/`. Its filename becomes the permanent anchor: `my-project.md` → `/#my-project`.

```yaml
---
title: Your project name
order: 2
year: 2026
category: Databases
summary: A short, concrete explanation of the problem and result.
contribution: What you personally designed or implemented.
stack:
  - Python
  - SQL
repository: https://github.com/onewaez/your-repository
presentation: editorial
draft: true
---
```

Write the case study below the frontmatter. Describe the problem, your decisions, evidence, and limitations. The supplied example is a draft: change `draft` to `false` when the real content is ready. Never publish the example's placeholder repository URL.

- Give each published project a **unique, increasing `order`**. The new project is appended before About and Contact. Existing projects keep their positions when edited.
- `presentation: editorial` gives a typographic cover. For an image cover, use `presentation: image`, `image: ./projects/your-project/cover.webp`, and a meaningful `imageAlt`. Put the file in `public/projects/your-project/`.
- `presentation: network` is specifically the 784 → 128 → 10 Fashion Classifier diagram. Use it only for this architecture.
- Optional `caption` describes the figure. Optional `demo` adds a link to an externally hosted demo.
- All case studies stay in the main document, using native `<details>`. Links to project anchors open the corresponding case study when JavaScript is available. With JavaScript off, the visitor can still expand any project manually.

Push to `main` to publish. See [HOSTING.md](HOSTING.md) for GitHub Pages and other hosts.

## Identity and styling

- Name, introduction, contact links: `src/pages/index.astro`.
- Palette, layout, responsive styles: `src/styles/global.css`.
- Paper cloud artwork: `src/components/PaperCloud.astro`.
- Project content: `src/content/projects/`.

The paper texture and clouds are original SVG assets. Fonts use the SIL Open Font License; notices are included under `public/licenses/` and are included in the static build.

## Motion and accessibility

Cloud parallax is subtle, desktop-only, and disabled with `prefers-reduced-motion`. Text is never hidden behind a scroll animation. Keyboard navigation, native disclosures, a skip link, visible focus, and print styles are included.

## Checks

`npm test` validates the built HTML's navigation, unique IDs, native case studies, deployment metadata, and asset references. The scale script builds isolated copies with 5 and 20 fixture projects; fixtures never enter the production content or `dist/`.
