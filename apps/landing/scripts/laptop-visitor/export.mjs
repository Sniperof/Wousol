import { readFileSync, writeFileSync } from 'node:fs';
import prettier from 'prettier';
import { laptopVisitor } from './artwork.mjs';
import { color } from './shapes.mjs';

const styles =
  readFileSync(new URL('../../src/styles/tokens.css', import.meta.url), 'utf8') +
  readFileSync(
    new URL('../../../../packages/design-tokens/src/tokens.css', import.meta.url),
    'utf8',
  );
const tokens = {
  brand: '--color-brand',
  ink: '--color-hero-ink',
  shirt: '--color-orb-end',
  soft: '--color-hero-surface',
  selected: '--color-selected',
  line: '--color-card-border',
  paper: '--color-brand-text',
  skin: '--color-visitor-skin',
  skinShadow: '--color-visitor-skin-shadow',
};
const palette = Object.fromEntries(
  Object.entries(tokens).map(([name, token]) => {
    const hex = styles.match(new RegExp(`${token}:\\s*(#[\\da-f]{6})`, 'i'))?.[1];
    if (!hex) throw new Error(`Missing illustration token ${token}`);
    return [name, color(hex)];
  }),
);
const data = laptopVisitor(palette);
const output = new URL('../../src/assets/laptop-visitor.json', import.meta.url);
const options = await prettier.resolveConfig(output);
const json = await prettier.format(JSON.stringify(data), { ...options, parser: 'json' });
writeFileSync(output, json);
