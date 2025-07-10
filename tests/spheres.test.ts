import { Point, point, Vector, vector } from "../src/coordinate";
import { ray } from "../src/ray";
import { intersect, sphere } from "../src/sphere";

describe("Spheres", () => {
  it("A ray intersects a sphere at two points", () => {
    const r = ray(point(0, 0, -5), vector(0, 0, 1));
    const s = sphere();
    const xs = intersect(s, r);
    console.log(xs);
    expect(xs.length).toBe(2);
    expect(xs[0].t).toBeCloseTo(4);
    expect(xs[1].t).toBeCloseTo(6);
  });
});
