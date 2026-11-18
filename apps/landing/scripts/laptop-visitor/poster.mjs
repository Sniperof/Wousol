import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const COMFORT_FRAME = 160;
const artwork = JSON.parse(
  readFileSync(new URL('../../src/assets/laptop-visitor.json', import.meta.url)),
);
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: artwork.w, height: artwork.h } });
  await page.setContent(`<div id="art" style="width:${artwork.w}px;height:${artwork.h}px"></div>`);
  await page.addScriptTag({
    path: fileURLToPath(import.meta.resolve('lottie-web/build/player/lottie_light.js')),
  });
  await page.evaluate((data) => {
    globalThis.posterAnimation = globalThis.lottie.loadAnimation({
      container: globalThis.document.getElementById('art'),
      renderer: 'svg',
      autoplay: false,
      animationData: data,
    });
  }, artwork);
  await page.waitForFunction(() => globalThis.posterAnimation.isLoaded);
  await page.evaluate(
    (frame) => globalThis.posterAnimation.goToAndStop(frame, true),
    COMFORT_FRAME,
  );
  const svg = await page.locator('#art svg').evaluate(
    (element, size) => {
      element.setAttribute('width', String(size.width));
      element.setAttribute('height', String(size.height));
      return new globalThis.XMLSerializer().serializeToString(element);
    },
    { width: artwork.w, height: artwork.h },
  );
  writeFileSync(
    new URL('../../public/illustrations/laptop-visitor.svg', import.meta.url),
    `${svg}\n`,
  );
} finally {
  await browser.close();
}
