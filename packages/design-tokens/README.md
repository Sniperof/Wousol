# DAP visual foundations

CSS-only workspace for the demo, React admin and Astro landing. Import `@dap/design-tokens/tokens.css`
from each app's style adapter. Vite/Astro emit same-origin WOFF2 assets; nothing loads from a font CDN.
The SDK must never import this package: it owns isolated shadow-root tokens and uses system fonts.

Fonts: IBM Plex Sans (Latin) and IBM Plex Sans Arabic (Arabic), weights 400/500/600, from
Fontsource 5.3.0, under the bundled SIL Open Font Licences. Arabic text falls back to Plex Sans
for Latin characters. Do not remove the licence files when redistributing the assets.

Use brand/brand-text for primary-blue actions; use link for text links. Accent/accent-text alias the same primary action pair.
Brand-hover/brand-pressed define website interaction shades; selected is a pale-blue surface. Border is decorative;
control-border is the stronger boundary used to identify interactive controls.

Appearance is light-only regardless of OS preference. Neutral grouped surfaces use surface-subtle.
