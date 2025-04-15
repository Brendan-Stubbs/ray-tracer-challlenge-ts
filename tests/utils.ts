import { Coordinate } from "../src/coordinate";

export const expectCoordinateEquals = (a: Coordinate, b: Coordinate): void => {
  expect(a.x).toBeCloseTo(b.x);
  expect(a.y).toBeCloseTo(b.y);
  expect(a.z).toBeCloseTo(b.z);
  expect(a.w).toBe(b.w);
};
