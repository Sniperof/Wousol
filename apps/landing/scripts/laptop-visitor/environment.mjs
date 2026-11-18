import { ellipse, layer, path, rect, line } from './shapes.mjs';

export function backdrop(c) {
  return layer('Quiet backdrop', [
    ellipse(248, 167, 354, 252, c.soft),
    ellipse(90, 117, 12, 12, c.selected),
    ellipse(430, 100, 8, 8, c.line),
    ellipse(253, 291, 326, 13, c.selected),
    line(
      [
        [92, 74],
        [92, 86],
      ],
      c.line,
    ),
    line(
      [
        [86, 80],
        [98, 80],
      ],
      c.line,
    ),
  ]);
}

export function chair(c) {
  return layer('Desk chair', [
    rect(109, 154, 87, 87, 22, c.selected, c.line),
    rect(116, 225, 89, 13, 6, c.line),
    line(
      [
        [151, 238],
        [151, 284],
      ],
      c.line,
      5,
    ),
    line(
      [
        [122, 287],
        [179, 287],
      ],
      c.line,
      5,
    ),
  ]);
}

export function desk(c) {
  return layer('Desk and plant', [
    rect(93, 235, 340, 11, 5, c.line),
    line(
      [
        [117, 246],
        [103, 291],
      ],
      c.line,
      6,
    ),
    line(
      [
        [405, 246],
        [419, 291],
      ],
      c.line,
      6,
    ),
    rect(423, 211, 24, 24, 5, c.selected),
    line(
      [
        [435, 212],
        [435, 177],
      ],
      c.brand,
      2,
    ),
    path(
      [
        [435, 198],
        [416, 177, 0, 10, 12, 0],
        [435, 198],
      ],
      { fill: c.shirt },
    ),
    path(
      [
        [435, 190],
        [451, 170, 0, 11, -12, 0],
        [435, 190],
      ],
      { fill: c.brand },
    ),
  ]);
}
