export interface Point {
  x: number;
  y: number;
}

export const add: (p1: Point, p2: Point) => Point = (
  { x: x1, y: y1 },
  { x: x2, y: y2 }
) => {
  return { x: x1 + x2, y: y1 + y2 };
};

export const multiply: (p1: Point, c: number) => Point = ({ x, y }, c) => {
  return { x: x * c, y: y * c };
};

export const subtract: (p1: Point, p2: Point) => Point = (p1, p2) => {
  return add(p1, multiply(p2, -1));
};

export const translate: (p: Point, dx: number, dy: number) => Point = (
  { x, y },
  dx,
  dy
) => {
  return {
    x: x + dx,
    y: y + dy,
  };
};

export const rotate: (p: Point, center: Point, rotation: number) => Point = (
  p,
  center,
  rotation
) => {
  const { x, y } = subtract(center, p);

  const rotationRad = rotation * (Math.PI / 180);
  const sin = -Math.sin(rotationRad);
  const cos = Math.cos(rotationRad);

  return add(center, {
    x: -x * cos + y * sin,
    y: -x * sin - y * cos,
  });
};

export const pointsToArray: (points: Point[]) => number[] = (points) => {
  return points.map(({ x, y }) => [x, y]).flat();
};
