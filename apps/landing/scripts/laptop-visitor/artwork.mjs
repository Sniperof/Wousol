import { backdrop, chair, desk } from './environment.mjs';
import { legs, shirt, farHand, nearHand } from './person.mjs';
import { head } from './head.mjs';
import { laptop, reading, confirmation } from './laptop.mjs';

export function laptopVisitor(c) {
  const pieces = [
    backdrop(c),
    chair(c),
    legs(c),
    shirt(c),
    head(c),
    farHand(c),
    desk(c),
    laptop(c),
    reading(c),
    nearHand(c),
    confirmation(c),
  ];
  return {
    v: '5.13.0',
    fr: 60,
    ip: 0,
    op: 240,
    w: 480,
    h: 320,
    nm: 'A happy visitor reading on a laptop',
    ddd: 0,
    assets: [],
    layers: pieces.reverse(),
  };
}
