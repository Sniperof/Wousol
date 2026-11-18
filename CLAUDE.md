# Wosoul landing: designer workspace

You are helping a UI/UX designer change the look and feel of the Wosoul product site (the landing), in
English and Arabic. This folder is a snapshot of the landing (commit `e46efa8`) from a larger repository.
The designer's changes go back to that repository as a patch, so keep file paths stable.

## Run

- `npm ci`, then `npm run dev`. The site is at http://localhost:4321 (`/en/` and `/ar/`).
- Pricing, the request form, and the accessibility widget answer from sample data in
  `apps/landing/astro.designer.config.mjs`. Nothing is sent anywhere.
- `npm run check` runs format, typecheck, lint, and build. Run it before you tell the designer a change is done.

## Where you may edit

Edit only `apps/landing/**`: `src/pages`, `src/components`, `src/styles`, `src/layouts`, `src/i18n/locales`,
`src/assets`, `public`.

Do not edit these. They are generated, shared, or this package's own tooling:

- `packages/sdk/` (the built accessibility widget, `dap.js`, and one small voice-picking helper the read-aloud preview imports)
- `apps/landing/src/api/generated/` (a trimmed copy of the backend's types)
- `apps/landing/astro.designer.config.mjs`, `package.json`, `package-lock.json`, `eslint.config.js`, `CLAUDE.md`, `README.md`

`packages/design-tokens` is shared with the company's admin app. Prefer changing `apps/landing/src/styles/tokens.css`.
If a file in `packages/design-tokens` must change, say so plainly in your summary.

Do not run `api:generate`, `api:check`, `art:visitor`, or `npx playwright install`. They need the backend or
the full repository, and the end-to-end tests are not part of this package.

## Rules of this codebase

- Every page goes through `src/layouts/base-layout.astro` (language, direction, skip link).
- Keep the section ids `pricing` and `installation`. The sample sign-language videos in the widget jump to them.
- Every user-facing string lives in `src/i18n/locales/`, in English and Arabic together. Never hard-code text in a
  component, and never add a string in one language only.
- Arabic is right-to-left. Use logical CSS (`margin-inline-start`, `inset-inline-end`, `text-align: start`), and
  check every change in `/ar/` too.
- Colours, sizes, and spacing come from the stylesheet tokens, not hard-coded values.
- Interactive targets are at least 44×44 px. Text has at least 4.5:1 contrast. Keep focus visible. Honour
  `prefers-reduced-motion`. The page must stay free of axe violations in both languages.
- The request form posts to its own origin and keeps the `mailto:` link beside it as the fallback. A pricing card's
  request link carries its plan in `data-request-*` attributes, and the form reads them on click. Keep both.
- Copy must stay true to the product. The widget is a tool visitors use to set their own preferences. Never write
  that it makes a site compliant or fixes accessibility automatically. The privacy claims (one licence check, no
  cookies, no tracking) are facts: reword them only if the meaning stays the same.
- TypeScript is strict: no `any`, and explicit return types on exported functions. Files stay at 150 lines or fewer,
  functions at 50 or fewer, nesting at 3 or fewer. Use factory functions, not classes, and no module-level mutable state.
- Do not add a dependency without asking the designer. If one is approved, pin an exact version (no `^`).

## Handing back

Tell the designer which files changed and why, and what you checked in both languages. The README explains how to
turn the work into a patch.
