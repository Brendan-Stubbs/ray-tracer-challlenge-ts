import { Tuple } from "./tuple";

export type Coordinate = Point | Vector;

export interface Point extends Tuple {
  x: number;
  y: number;
  z: number;
  w: number;
}

export interface Vector extends Tuple {
  x: number;
  y: number;
  z: number;
  w: number;
}

export const coordinate = (
  x: number,
  y: number,
  z: number,
  w: number
): Coordinate => {
  if (w == 1) {
    return point(x, y, z);
  }

  if (w == 0) {
    return vector(x, y, z);
  }

  return { x, y, z, w };
};

export const point = (x: number, y: number, z: number): Point => {
  return { x, y, z, w: 1 };
};

export const vector = (x: number, y: number, z: number): Vector => {
  return { x, y, z, w: 0 };
};

export const isPoint = (t: Coordinate): boolean => {
  return t.w === 1;
};

export const isVector = (t: Coordinate): boolean => {
  return t.w === 0;
};

export const add = (...tuples: Coordinate[]): Coordinate => {
  return tuples.reduce(
    (acc, current) =>
      coordinate(
        acc.x + current.x,
        acc.y + current.y,
        acc.z + current.z,
        acc.w + current.w
      ),
    coordinate(0, 0, 0, 0)
  );
};

export const subtract = (a: Coordinate, b: Coordinate): Coordinate => {
  return coordinate(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w);
};

export const negate = (t: Coordinate): Coordinate => {
  return coordinate(-t.x, -t.y, -t.z, -t.w);
};

export const multiply = (t: Coordinate, scalar: number): Coordinate => {
  return coordinate(t.x * scalar, t.y * scalar, t.z * scalar, t.w * scalar);
};

export const divide = (t: Coordinate, scalar: number): Coordinate => {
  return coordinate(t.x / scalar, t.y / scalar, t.z / scalar, t.w / scalar);
};

export const magnitude = (t: Coordinate): number => {
  return Math.sqrt(t.x ** 2 + t.y ** 2 + t.z ** 2 + t.w ** 2);
};

/**
 * Functions specific to vector
 */
export const normalize = (t: Vector): Vector => {
  const mag = magnitude(t);
  return coordinate(t.x / mag, t.y / mag, t.z / mag, t.w / mag);
};

export const dot = (a: Vector, b: Vector): number => {
  return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
};

export const cross = (a: Vector, b: Vector): Vector => {
  return vector(
    a.y * b.z - a.z * b.y,
    a.z * b.x - a.x * b.z,
    a.x * b.y - a.y * b.x
  );
};
