# Wosoul landing: designer handoff

The Wosoul product site, in English and Arabic, as code. You can restyle it with Claude Code. It runs on its own: no backend, no
accounts, no network calls to IT Land.

This is a snapshot of commit `e46efa8`.

## Start

You need Node 26 (see `.nvmrc`) and npm.

```
npm ci
npm run dev
```

Open http://localhost:4321/en/ and http://localhost:4321/ar/. Then open Claude Code in this folder. It reads `CLAUDE.md` and
knows what it may and may not touch.

## What is real and what is sample

- The page, its styles, its copy, and the animations are the real thing.
- The accessibility widget (bottom corner) is the real built widget. Its licence check is answered by the dev server.
- The pricing cards read sample plans, "Starter" and "Business". They show "Price on request", as the live site does.
  To see prices, set `PRICES_HIDDEN` to `false` in `apps/landing/astro.designer.config.mjs`.
- The widget's sign-language video list shows six sample entries (three per language). They are plain text in
  `apps/landing/astro.designer.config.mjs`, and each one jumps to a section of the page. There are no video files, so
  pressing play shows the widget's own error message. The link to the sign-language interpreter is not here: it needs a real
  outside web address.
- The request form shows its success state, but nothing is sent.

## Before you send it back

```
npm run check
```

It runs format, typecheck, lint, and build. Fix anything it reports. Also look at every page in `/en/` and `/ar/`, at phone width
and at desktop width, and with the widget turned on.

## Sending your changes back

The folder has its own small git history, with a tag called `baseline`. Set your name once if git asks, then:

```
git add -A
git commit -m "What you changed"
git format-patch --binary baseline -o ../changes
```

Zip the `changes` folder next to this one and send it. If you cannot use git, zip this whole folder without `node_modules`.

## Not included, on purpose

The backend, the admin, the widget's source code, and the end-to-end tests. The one exception is a small read-only helper
(`packages/sdk/src/features/read-aloud/voices.ts`) that the read-aloud preview imports. Do not run `api:generate`,
`api:check`, or `npx playwright install` here.
