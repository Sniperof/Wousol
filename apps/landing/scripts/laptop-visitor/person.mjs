import { ellipse, layer, motion, path, line, fill } from './shapes.mjs';
import { typingMotion } from './motion.mjs';

export function legs(c) {
  return layer('Seated legs and shoes', [
    fill(
      [
        [146, 218],
        [205, 219],
        [225, 270],
        [211, 278],
        [181, 243],
        [165, 280],
        [150, 277],
      ],
      c.ink,
    ),
    path(
      [
        [149, 275],
        [166, 277],
        [178, 288, -7, 0],
        [147, 288],
        [145, 283],
      ],
      { fill: c.brand },
    ),
    path(
      [
        [211, 272],
        [225, 267],
        [244, 282, -8, 0],
        [217, 289],
        [211, 283],
      ],
      { fill: c.brand },
    ),
  ]);
}

export function shirt(c) {
  return layer(
    'Comfortable blue shirt',
    [
      path(
        [
          [132, 221],
          [122, 172, 0, 18, 0, -25],
          [154, 133, -20, 0],
          [185, 134],
          [211, 173, 0, -26],
          [207, 224],
        ],
        { fill: c.brand },
      ),
      line(
        [
          [145, 160],
          [144, 207],
        ],
        c.shirt,
        3,
      ),
      path(
        [
          [149, 136],
          [169, 145, -10, 0, 10, 0],
          [185, 135],
        ],
        { stroke: c.shirt, width: 3, closed: false },
      ),
    ],
    {
      a: [166, 222],
      p: [166, 222],
      r: motion([
        [0, [0]],
        [120, [-0.8]],
        [240, [0]],
      ]),
    },
  );
}

export function farHand(c) {
  return layer(
    'Far sleeve and typing hand',
    [
      line(
        [
          [200, 164],
          [221, 197],
        ],
        c.shirt,
        18,
      ),
      line(
        [
          [220, 197],
          [265, 220],
        ],
        c.skin,
        12,
      ),
      ellipse(267, 221, 23, 10, c.skin),
    ],
    { p: typingMotion() },
  );
}

export function nearHand(c) {
  return layer(
    'Near sleeve and typing hand',
    [
      line(
        [
          [132, 170],
          [146, 211],
        ],
        c.shirt,
        20,
      ),
      line(
        [
          [146, 211],
          [216, 225],
        ],
        c.skin,
        13,
      ),
      ellipse(222, 225, 25, 10, c.skin),
      line(
        [
          [227, 224],
          [235, 226],
        ],
        c.skinShadow,
        1.5,
      ),
    ],
    { p: typingMotion() },
  );
}
