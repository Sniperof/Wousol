/**
 * Line icons for every preference the widget offers, in the order its menu lists them. Each is a 24×24 path drawn
 * with a 2px round stroke; the keys match the feature names in `i18n/locales/*-pricing.ts`.
 */
export const featureIcons: ReadonlyArray<readonly [key: string, path: string]> = [
  ['text-size', 'M3 7V5h10v2M8 5v14M13 12v-1h8v1M17 11v8'],
  ['line-height', 'M10 6h10M10 12h10M10 18h10M5 4v16M3 6l2-2 2 2M3 18l2 2 2-2'],
  ['text-spacing', 'M4 5v14M20 5v14M8 12h8M10 9l-3 3 3 3M14 9l3 3-3 3'],
  ['bold-text', 'M7 5h6a3.5 3.5 0 0 1 0 7H7zM7 12h7a3.5 3.5 0 0 1 0 7H7z'],
  ['readable-font', 'M5 19 12 5l7 14M8 14h8'],
  ['text-align', 'M4 6h16M4 10h10M4 14h16M4 18h10'],
  [
    'highlight-links',
    'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1',
  ],
  ['highlight-headings', 'M6 5v14M18 5v14M6 12h12'],
  ['hide-images', 'M4 5h16v14H4zM4 15l5-5 4 4 3-3 4 4M3 3l18 18'],
  ['image-descriptions', 'M3 4h14v11H3zM3 12l4-4 4 4 2-2 4 4M7 20h14V8'],
  ['read-aloud', 'M11 5 6 9H3v6h3l5 4zM15 9a4 4 0 0 1 0 6M18 6a8 8 0 0 1 0 12'],
  ['contrast', 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 3v18M12 8h5M12 12h7M12 16h5'],
  ['saturation', 'M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z'],
  ['focus-highlight', 'M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5'],
  ['big-cursor', 'M5 3l14 8-6 2-2 6z'],
  ['reading-guide', 'M3 10h18v4H3zM6 6h12M6 18h12'],
  ['pause-animations', 'M9 5v14M15 5v14'],
  ['page-structure', 'M4 4h7v7H4zM13 4h7v4h-7zM13 10h7v10h-7zM4 13h7v7H4z'],
  [
    'sign-language',
    'M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7a6 6 0 0 1-6 6h-1a5 5 0 0 1-4.5-2.8L4 13.5a1.5 1.5 0 0 1 2.6-1.5L8 14',
  ],
  ['sign-videos', 'M3 6h12v12H3zM15 10l6-3v10l-6-3'],
];
