import { point, vector } from "../src/coordinate";
import {
  inverse,
  matrixMultiply,
  multiplyMatrixByCoordinate,
} from "../src/matrix";
import {
  rotationX,
  rotationY,
  rotationZ,
  scaling,
  shearing,
  transform,
  Transform,
  translation,
} from "../src/transformation";
import { radians } from "../src/utils/conversions";
import { expectCoordinateEquals } from "./utils";

describe("Tranformations", () => {
  it("Multiplying by a translation matrix", () => {
    const transform = translation(5, -3, 2);
    const p = point(-3, 4, 5);
    expect(multiplyMatrixByCoordinate(transform, p)).toEqual(point(2, 1, 7));
  });

  it("Multiplying by the inverse of a translation matrix", () => {
    const transform = translation(5, -3, 2);
    const inv = inverse(transform);
    const p = point(-3, 4, 5);
    expect(multiplyMatrixByCoordinate(inv, p)).toEqual(point(-8, 7, 3));
  });

  it("Translation does not affect vectors", () => {
    const transform = translation(5, -3, 2);
    const v = vector(-3, 4, 5);
    expect(multiplyMatrixByCoordinate(transform, v)).toEqual(v);
  });

  it("A scaling matrix applied to a point", () => {
    const transform = scaling(2, 3, 4);
    const p = point(-4, 6, 8);
    expect(multiplyMatrixByCoordinate(transform, p)).toEqual(point(-8, 18, 32));
  });

  it("Multiplying by the inverse of a scaling matrix", () => {
    const transfrom = scaling(2, 3, 4);
    const inv = inverse(transfrom);
    const v = vector(-4, 6, 8);
    const result = multiplyMatrixByCoordinate(inv, v);
    expect(result).toEqual(vector(-2, 2, 2));
  });

  it("Reflection is scaling by a negative value", () => {
    const transform = scaling(-1, 1, 1);
    const p = point(2, 3, 4);
    const result = multiplyMatrixByCoordinate(transform, p);
    expect(result).toEqual(point(-2, 3, 4));
  });

  it("Converting degrees to radians (standard)", () => {
    expect(radians(90)).toBeCloseTo(Math.PI / 2);
    expect(radians(180)).toBeCloseTo(Math.PI);
    expect(radians(360)).toBeCloseTo(2 * Math.PI);
  });

  it("Rotating a point around the x axis", () => {
    const p = point(0, 1, 0);
    const half_quarter = rotationX(radians(45));
    const full_quarter = rotationX(radians(90));

    const expectedResult1 = point(0, Math.sqrt(2) / 2, Math.sqrt(2) / 2);
    const expectedResult2 = point(0, 0, 1);

    const result1 = multiplyMatrixByCoordinate(half_quarter, p);
    const result2 = multiplyMatrixByCoordinate(full_quarter, p);

    expectCoordinateEquals(result1, expectedResult1);
    expectCoordinateEquals(result2, expectedResult2);
  });

  it("The inverse of an x-rotation rotates in the opposite direction", () => {
    const p = point(0, 1, 0);
    const half_quarter = rotationX(radians(45));
    const inv = inverse(half_quarter);
    const result = multiplyMatrixByCoordinate(inv, p);
    const expectedResult = point(0, Math.sqrt(2) / 2, -Math.sqrt(2) / 2);
    expectCoordinateEquals(result, expectedResult);
  });

  it("Rotating a point around the y axis", () => {
    const p = point(0, 0, 1);
    const half_quarter = rotationY(radians(45));
    const full_quarter = rotationY(radians(90));

    const expectedResult1 = point(Math.sqrt(2) / 2, 0, Math.sqrt(2) / 2);
    const expectedResult2 = point(1, 0, 0);

    const result1 = multiplyMatrixByCoordinate(half_quarter, p);
    const result2 = multiplyMatrixByCoordinate(full_quarter, p);

    expectCoordinateEquals(result1, expectedResult1);
    expectCoordinateEquals(result2, expectedResult2);
  });

  it("Rotating a point around the z axis", () => {
    const p = point(0, 1, 0);
    const half_quarter = rotationZ(radians(45));
    const full_quarter = rotationZ(radians(90));
    const result1 = multiplyMatrixByCoordinate(half_quarter, p);
    const result2 = multiplyMatrixByCoordinate(full_quarter, p);

    const expectedResult1 = point(-Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0);
    const expectedResult2 = point(-1, 0, 0);

    expectCoordinateEquals(result1, expectedResult1);
    expectCoordinateEquals(result2, expectedResult2);
  });

  it("A shearing transformation moves x in proportion to y", () => {
    const transform = shearing(1, 0, 0, 0, 0, 0);
    const p = point(2, 3, 4);
    const result = multiplyMatrixByCoordinate(transform, p);
    expectCoordinateEquals(result, point(5, 3, 4));
  });

  it("A shearing transformation moves x in proportion to z", () => {
    const transform = shearing(0, 1, 0, 0, 0, 0);
    const p = point(2, 3, 4);
    const result = multiplyMatrixByCoordinate(transform, p);
    expectCoordinateEquals(result, point(6, 3, 4));
  });

  it("A shearing transformation moves y in proportion to x", () => {
    const transform = shearing(0, 0, 1, 0, 0, 0);
    const p = point(2, 3, 4);
    const result = multiplyMatrixByCoordinate(transform, p);
    expectCoordinateEquals(result, point(2, 5, 4));
  });

  it("A shearing transformation moves y in proportion to z", () => {
    const transform = shearing(0, 0, 0, 1, 0, 0);
    const p = point(2, 3, 4);
    const result = multiplyMatrixByCoordinate(transform, p);
    expectCoordinateEquals(result, point(2, 7, 4));
  });

  it("A shearing transformation moves z in proportion to x", () => {
    const transform = shearing(0, 0, 0, 0, 1, 0);
    const p = point(2, 3, 4);
    const result = multiplyMatrixByCoordinate(transform, p);
    expectCoordinateEquals(result, point(2, 3, 6));
  });

  it("A shearing transformation moves z in proportion to y", () => {
    const transform = shearing(0, 0, 0, 0, 0, 1);
    const p = point(2, 3, 4);
    const result = multiplyMatrixByCoordinate(transform, p);
    expectCoordinateEquals(result, point(2, 3, 7));
  });

  it("Individual transformations are applied in sequence", () => {
    const p = point(1, 0, 1);
    const A = rotationX(radians(90));
    const B = scaling(5, 5, 5);
    const C = translation(10, 5, 7);

    // Apply rotation first
    const p2 = multiplyMatrixByCoordinate(A, p);
    expectCoordinateEquals(p2, point(1, -1, 0));

    // The apply scaling
    const p3 = multiplyMatrixByCoordinate(B, p2);
    expectCoordinateEquals(p3, point(5, -5, 0));

    // The apply translation
    const p4 = multiplyMatrixByCoordinate(C, p3);
    expectCoordinateEquals(p4, point(15, 0, 7));
  });

  it("Chained transformations must be applied in reverse order", () => {
    const p = point(1, 0, 1);

    const T = transform()
      .translate(10, 5, 7)
      .scale(5, 5, 5)
      .rotateX(radians(90))
      .getMatrix();

    const result = multiplyMatrixByCoordinate(T, p);
    expectCoordinateEquals(result, point(15, 0, 7));
  });
});
