import { add, multiply, Point, Vector } from "./coordinate";

export interface Ray {
  origin: Point;
  direction: Vector;
}

export const ray = (p: Point, v: Vector) => {
  return {
    origin: p,
    direction: v,
  };
};

export const position = (r: Ray, t: number): Point => {
  return add(r.origin, multiply(r.direction, t));
};
