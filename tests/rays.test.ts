import { point, vector } from "../src/coordinate";
import { position, ray } from "../src/ray";
import { expectCoordinateEquals } from "./utils";

describe("Rays", () => {
  it("Creating and querying a ray", () => {
    const origin = point(1, 2, 3);
    const direction = vector(4, 5, 6);
    const r = ray(origin, direction);
    expectCoordinateEquals(r.origin, origin);
    expectCoordinateEquals(r.direction, direction);
  });

  it("Computing a point from a distance", () => {
    const r = ray(point(2, 3, 4), vector(1, 0, 0));
    expectCoordinateEquals(position(r, 0), point(2, 3, 4));
    expectCoordinateEquals(position(r, 1), point(3, 3, 4));
    expectCoordinateEquals(position(r, -1), point(1, 3, 4));
    expectCoordinateEquals(position(r, 2.5), point(4.5, 3, 4));
  });
});
