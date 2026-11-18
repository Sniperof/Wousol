import { ellipse, group, layer, path, rect, line } from './shapes.mjs';
import { nodMotion, blinkMotion } from './motion.mjs';

function hair(c) {
  return [
    path(
      [
        [141, 88],
        [139, 67, -5, 8, 3, -13],
        [162, 48, -14, -1, 13, -5],
        [194, 61, 0, -13, 5, 10],
        [193, 87],
        [185, 68],
        [160, 69, 12, 5, -12, -3],
        [148, 78],
      ],
      { fill: c.ink },
    ),
    ellipse(147, 62, 19, 21, c.ink),
    ellipse(160, 53, 22, 20, c.ink),
    ellipse(177, 54, 24, 20, c.ink),
    ellipse(190, 66, 17, 23, c.ink),
  ];
}

function eyes(c) {
  return [
    group('Soft blink', [ellipse(159, 89, 4, 5, c.ink), ellipse(179, 89, 4, 5, c.ink)], {
      a: [169, 89],
      p: [169, 89],
      s: blinkMotion(),
    }),
    line(
      [
        [154, 81, 0, 0, 3, -2],
        [164, 81, -3, -2],
      ],
      c.ink,
    ),
    line(
      [
        [175, 81, 0, 0, 3, -2],
        [184, 82, -3, -2],
      ],
      c.ink,
    ),
  ];
}

function smile(c) {
  return [
    line(
      [
        [169, 91],
        [167, 99],
        [171, 99],
      ],
      c.skinShadow,
    ),
    path(
      [
        [158, 105, 0, 0, 6, 10],
        [179, 104, -5, 10],
      ],
      { fill: c.paper, stroke: c.ink, width: 1.5 },
    ),
    ellipse(151, 100, 9, 4, c.skinShadow),
    ellipse(187, 100, 7, 4, c.skinShadow),
  ];
}

export function head(c) {
  return layer(
    'Visitor head and relaxed smile',
    [
      rect(158, 112, 21, 29, 8, c.skinShadow),
      ellipse(142, 93, 12, 17, c.skin),
      ellipse(193, 93, 10, 16, c.skin),
      ellipse(168, 88, 54, 66, c.skin),
      ...hair(c),
      ...eyes(c),
      ...smile(c),
    ],
    { a: [168, 127], p: [168, 127], r: nodMotion() },
  );
}
