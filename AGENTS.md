# Agent Guide — Portfolio

## Project

Personal portfolio for **梁天乐 / TIANLE LIANG**, a 2027 届财务管理 undergraduate targeting **采购与供应链管理 / 项目开发选址**. The site is PC-first, max width about 1700px, dark/premium/editorial, and must not look like a generic template.

- Stack: React 19 + Vite 7 + plain CSS, no UI library.
- Source of truth: this repository.
- Production: Cloudflare Workers, deployed from `main`.
- Public repo: https://github.com/LeonLok214/Portfolio

## Commands

```powershell
pnpm install
pnpm dev        # http://127.0.0.1:5173
pnpm build      # http://127.0.0.1:4173 via pnpm preview
pnpm preview
```

## Design rules

- Keep the current dark, restrained, high-end visual language. No cheap bounce, elastic easing, stock-template cards, or generic SaaS styling.
- Hero Silk is intentionally **blue-purple**: `color="#1b2140"`, `sheenColor="#b9b1ff"`, fallback indigo. Do not revert it to the old green.
- The four stats cards (`10 人 / 17 期 / 170+ 分钟 / 6500+ 学习者`) belong in section 02, **between the first `创业之路` project card and the two lower project cards**.
- The ID photo in About is bottom-left, `bottom: 50px` desktop / `46px` tablet / `44px` small screen. Its bottom edge should sit close to the name line but not touch it.
- Motion: GSAP + ScrollTrigger. Use mask/clip/translate reveals, `expo.out` / `power4.out`, no bounce. ScrollTriggers use `once: true`; only the Hero Silk uses a light scrub parallax. Respect `prefers-reduced-motion`.
- Performance budget: keep first paint light, lazy-init WebGL, no unnecessary eager media, and preserve reduced-motion behavior.

## Privacy and content

- Phone and WeChat must stay private. Email is the only public contact detail.
- The site includes a full English certificate image containing other students' names; this was explicitly requested. Do not add more personal information without consent.
- Do not commit `.env`, tokens, session transcripts, `node_modules`, `dist`, or local QA screenshots.

## Deployment

- GitHub `main` is connected to Cloudflare Workers. A push to `main` triggers a rebuild and deploy.
- `pnpm-workspace.yaml` must keep `allowBuilds` for `esbuild`, `workerd`, and `sharp`; without these Cloudflare installs fail with `ERR_PNPM_IGNORED_BUILDS`.
- Cloudflare may manage a Wrangler config outside this repo or generate one via its automatic configuration PR. Do not remove deployment configuration blindly.
- Commit `package.json`, `pnpm-lock.yaml`, and `pnpm-workspace.yaml` together when dependencies change.

## Before changing code

Read `docs/CODEX_HANDOFF.md` for the fuller state, file map, decisions, and known pitfalls.
