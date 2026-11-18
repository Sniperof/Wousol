const fixed = (k) => ({ a: 0, k });

export function color(hex) {
  return [1, 3, 5].map((start) => Number.parseInt(hex.slice(start, start + 2), 16) / 255);
}

export function motion(points) {
  return {
    a: 1,
    k: points.map(([t, s], index) => ({
      t,
      s,
      ...(points[index + 1]
        ? { e: points[index + 1][1], i: { x: [0.67], y: [1] }, o: { x: [0.33], y: [0] } }
        : {}),
    })),
  };
}

function property(value) {
  return typeof value === 'object' && !Array.isArray(value) ? value : fixed(value);
}

function transform({ p = [0, 0], a = [0, 0], s = [100, 100], r = 0, o = 100 } = {}) {
  return { p: property(p), a: property(a), s: property(s), r: property(r), o: property(o) };
}

export function group(name, shapes, pose = {}) {
  return { ty: 'gr', nm: name, it: [...shapes, { ty: 'tr', ...transform(pose) }] };
}

function paint(fill, stroke, width) {
  const styles = [];
  if (fill) styles.push({ ty: 'fl', c: fixed(fill), o: fixed(100), r: 1 });
  if (stroke) {
    styles.push({ ty: 'st', c: fixed(stroke), o: fixed(100), w: fixed(width), lc: 2, lj: 2 });
  }
  return styles;
}

export function rect(x, y, width, height, radius, fill, stroke) {
  return group('Rounded surface', [
    {
      ty: 'rc',
      p: fixed([x + width / 2, y + height / 2]),
      s: fixed([width, height]),
      r: fixed(radius),
    },
    ...paint(fill, stroke, 2),
  ]);
}

export function ellipse(x, y, width, height, fill, stroke) {
  return group('Ellipse', [
    { ty: 'el', p: fixed([x, y]), s: fixed([width, height]) },
    ...paint(fill, stroke, 2),
  ]);
}

export function path(vertices, { fill, stroke, width = 2, closed = true } = {}) {
  return group('Contour', [
    {
      ty: 'sh',
      ks: fixed({
        v: vertices.map(([x, y]) => [x, y]),
        i: vertices.map((point) => (point.slice(2, 4).length ? point.slice(2, 4) : [0, 0])),
        o: vertices.map((point) => (point.slice(4, 6).length ? point.slice(4, 6) : [0, 0])),
        c: closed,
      }),
    },
    ...paint(fill, stroke, width),
  ]);
}

export function layer(name, shapes, pose = {}) {
  return {
    ty: 4,
    nm: name,
    ip: 0,
    op: 240,
    st: 0,
    sr: 1,
    ks: transform(pose),
    shapes: [...shapes].reverse(),
  };
}

export function line(points, stroke, width = 2) {
  return path(points, { stroke, width, closed: false });
}

export function fill(points, tone) {
  return path(points, { fill: tone });
}
