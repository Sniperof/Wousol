import { ellipse, layer, motion, path, rect, line, fill } from './shapes.mjs';

export function laptop(c) {
  return layer('Open laptop', [
    path(
      [
        [260, 146],
        [405, 146],
        [390, 226],
        [244, 226],
      ],
      { fill: c.ink },
    ),
    fill(
      [
        [269, 155],
        [394, 155],
        [383, 216],
        [257, 216],
      ],
      c.paper,
    ),
    fill(
      [
        [244, 226],
        [390, 226],
        [412, 235],
        [226, 235],
      ],
      c.line,
    ),
    line(
      [
        [253, 230],
        [370, 230],
      ],
      c.paper,
      2,
    ),
    rect(285, 166, 78, 5, 2.5, c.line),
    rect(282, 180, 92, 5, 2.5, c.line),
    rect(279, 194, 69, 5, 2.5, c.line),
  ]);
}

export function reading(c) {
  return layer(
    'Reading becomes clearer',
    [rect(275, 176, 102, 13, 5, c.selected), rect(282, 180, 85, 5, 2.5, c.brand)],
    {
      o: motion([
        [0, [0]],
        [40, [0]],
        [85, [100]],
        [212, [100]],
        [240, [0]],
      ]),
    },
  );
}

export function confirmation(c) {
  return layer(
    'Reading comfort confirmation',
    [
      ellipse(372, 111, 43, 43, c.paper, c.line),
      ellipse(372, 111, 33, 33, c.brand),
      line(
        [
          [364, 111],
          [370, 117],
          [381, 105],
        ],
        c.paper,
        3,
      ),
    ],
    {
      a: [372, 111],
      p: [372, 111],
      s: motion([
        [0, [70, 70]],
        [72, [70, 70]],
        [103, [106, 106]],
        [120, [100, 100]],
        [215, [100, 100]],
        [240, [70, 70]],
      ]),
      o: motion([
        [0, [0]],
        [72, [0]],
        [95, [100]],
        [215, [100]],
        [240, [0]],
      ]),
    },
  );
}
