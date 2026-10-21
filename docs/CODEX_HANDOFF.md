# Codex Handoff — Portfolio

Last updated: 2026-10-21

This document is the working handoff from the DeepSeek Harness session. The full chat transcript is not importable into Codex; this file plus `AGENTS.md`, the Git history, and the repository are the source of truth.

## Current status

- Site is live and deployed on **Cloudflare Workers** from the `main` branch.
- GitHub repository: https://github.com/LeonLok214/Portfolio
- Local working directory: `Z:\DSH\Portfolio`
- Cloudflare build uses pnpm. `pnpm-workspace.yaml` must keep `allowBuilds` for `esbuild`, `workerd`, and `sharp`.
- The repository contains the source, fonts, 65 full photos, 65 thumbnails, posters, certificates, and four archive videos plus the project video.

## Product intent

A personal job-search portfolio for **梁天乐 / TIANLE LIANG**, 2027 届财务管理本科, targeting **采购与供应链管理 / 项目开发选址**. The tone is dark, premium, editorial, restrained, PC-first, max width roughly 1700px. It should not read as a template or a visual-design portfolio; finance and visual work are separate threads, not forced together.

Public contact is email only. Phone and WeChat must stay private.

## Architecture

- React 19 + Vite 7, plain CSS, no UI library.
- `src/App.jsx`: page composition and overlay state.
- `src/components/`:
  - `Hero.jsx` + `Silk.jsx`: WebGL2 Silk hero background, blue-purple.
  - `Nav.jsx`: fixed navigation and scroll state.
  - `About.jsx`: portrait, ID-photo inset, profile copy, education.
  - `Work.jsx`: project cards, video card, project details, stat row.
  - `Archive.jsx`: photo categories, video groups, lightbox.
  - `Expertise.jsx`, `Achievements.jsx`, `Contact.jsx`.
  - `SpecularButton.jsx` / `SpecularAction.jsx`: WebGL2 specular CTA effect.
  - `ProjectModal.jsx`, `ProjectCover.jsx`: project details overlay.
- `src/hooks/usePortfolioMotion.js`: GSAP opening and ScrollTrigger reveal system.
- `src/hooks/useReveal.js`: clock helper used by Contact.
- `src/data/site.js`: identity, projects, stats, archive groups, achievements, contact copy.
- `src/data/photos.js`: 6 photo categories, generated from assets; every item has `src` and `thumb`.
- `src/styles.css`: all layout, typography, responsive rules, and visual systems.
- `public/media`: all runtime assets. `public/fonts`: local woff2 fonts.
- `scripts/make_photo_thumbs.py`: generates 760px gallery thumbnails and updates `photos.js`.
- `pnpm-workspace.yaml`: pnpm 11 `allowBuilds` required by Cloudflare/Wrangler.

## Design decisions that must be preserved

- Hero Silk color is intentionally blue-purple, not the original green:
  - `color="#1b2140"`
  - `sheenColor="#b9b1ff"`
  - fallback background indigo
- Stats row lives in **02 Projects**, between the first `创业之路` card and the two lower cards. Four stats: `10 人` / `17 期` / `170+ 分钟` / `6500+ 学习者`.
- About ID photo: bottom-left; `bottom: 50px` desktop, `46px` tablet, `44px` small. Its bottom edge is close to the name line with a small gap (about 13px) and must not cover it.
- Opening: nav/Silk visible immediately; name, two title lines, roles, caption, side actions, footer enter in sequence. Title uses mask + upward translation + slight vertical compression/skew.
- Section headers: English/large title reveals first via clip-path + y + scaleY; cards follow. No bounce or elastic easing.
- Project video card uses `preload="none"`; poster shows; playback loads on click.
- Photo covers and category galleries use `thumb`; the lightbox uses the full `src`.
- `prefers-reduced-motion` must skip GSAP setup; CSS content stays visible.

## Performance state

Measured locally from a production preview at 1440×900 with empty cache:

- FCP ~0.36s, LCP ~1.06s, CLS 0.
- Initial transfer ~828KB (JS ~143KB gzip, CSS ~18KB, fonts ~229KB, initial images ~299KB).
- Initial WebGL contexts: only 3 Specular buttons plus Silk; contact/modal buttons initialize near the viewport.
- Silk DPR capped at 1.25.
- Videos: total ~29.4MB; largest ~11.4MB; only loaded on play.
- Photos: full set ~15.6MB; thumbnails ~4.1MB. Gallery loads thumbnails.
- ScrollTriggers are `once: true`; only Hero Silk has a small scrub parallax.

If changing performance-sensitive code, re-measure rather than assuming. Avoid eager-loading media, extra WebGL contexts, or continuous scroll animations.

## Deployment and operations

- Cloudflare Workers Git integration: push to `main` triggers build/deploy.
- If Cloudflare opens an automatic configuration PR (for `wrangler.jsonc` or framework adapters), review and merge it rather than duplicating config manually.
- Do not remove `allowBuilds` entries. If a new dependency has a blocked postinstall, add the specific package after verifying it is trusted.
- Commit `package.json`, `pnpm-lock.yaml`, and `pnpm-workspace.yaml` together when dependencies change.
- `dist` and `node_modules` must not be committed.
- For media replacements, prefer new filenames; Cloudflare may cache old `/media/...` paths. Purge cache or version the filename.
- Future China hosting: static OSS/COS + mainland CDN is a better fit than renting a server; mainland hosting/CDN requires ICP filing and usually public-security filing. The current Cloudflare deployment can remain as the overseas mirror.

## Known pitfalls

- React StrictMode + WebGL: do not call `WEBGL_lose_context` during the immediate StrictMode cleanup; the Specular component uses a delayed release only after real unmount.
- Do not reintroduce `data-reveal` CSS that hides content on re-render; past bugs caused the video card/contact section to disappear after state updates.
- Dev server can serve stale bundles after adding modules; restart Vite if a new component does not appear.
- On Windows, Vite build may hit an esbuild temp-file access error under a sandbox. Point `TEMP`, `TMP`, and `TMPDIR` at a writable local folder before building.
- The site uses absolute `/media/...` paths, which is correct for root-domain hosting (Cloudflare Workers / Vercel root) but would need path/base adaptation for a GitHub Pages project subpath.
- The English certificate image includes other students' names; it was explicitly requested. Do not add further personal data without consent.

## Suggested first Codex task

Ask Codex to read `AGENTS.md` and this document, then summarize the repo and wait for a scoped request. Do not start with a broad redesign; preserve the established design and motion system.
