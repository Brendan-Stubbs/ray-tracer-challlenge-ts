import { point, Point } from "./coordinate";
import { Ray } from "./ray";

export interface Sphere {
  id: string;
  origin: Point;
  radii: number;
}

export const sphere = () => {
  const id = Math.random().toString(36).substring(2, 15);

  return {
    id,
    origin: point(0, 0, 0),
    radii: 1,
  };
};

export const intersect = (s: Sphere, r: Ray) => {
  
};
