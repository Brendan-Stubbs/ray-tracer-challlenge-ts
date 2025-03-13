import { coordinate } from "../src/coordinate";
import {
  equals,
  get,
  IDENTITY_MATRIX,
  Matrix,
  matrixMultiply,
  multiplyMatrixByCoordinate,
  transposeMatrix,
} from "../src/matrix";

describe("Matrix", () => {
  it("Constructing and inspecting a 4x4 matrix", () => {
    const m = [
      [1, 2, 3, 4],
      [5.5, 6.5, 7.5, 8.5],
      [9, 10, 11, 12],
      [13.5, 14.5, 15.5, 16.5],
    ];

    expect(get(m, 0, 0)).toBe(1);
    expect(get(m, 0, 3)).toBe(4);
    expect(get(m, 1, 0)).toBe(5.5);
    expect(get(m, 1, 2)).toBe(7.5);
    expect(get(m, 2, 2)).toBe(11);
    expect(get(m, 3, 0)).toBe(13.5);
    expect(get(m, 3, 2)).toBe(15.5);
  });

  it("A 2x2 matrix ought to be representable", () => {
    const m = [
      [-3, 5],
      [1, -2],
    ];

    expect(get(m, 0, 0)).toBe(-3);
    expect(get(m, 0, 1)).toBe(5);
    expect(get(m, 1, 0)).toBe(1);
    expect(get(m, 1, 1)).toBe(-2);
  });

  it("A 3x3 matrix ought to be representable", () => {
    const m = [
      [-3, 5, 0],
      [1, -2, -7],
      [0, 1, 1],
    ];

    expect(get(m, 0, 0)).toBe(-3);
    expect(get(m, 1, 1)).toBe(-2);
    expect(get(m, 2, 2)).toBe(1);
  });

  it("Matrix equality with identical matrices", () => {
    const a = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 8, 7, 6],
      [5, 4, 3, 2],
    ];

    const b = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 8, 7, 6],
      [5, 4, 3, 2],
    ];

    expect(equals(a, b)).toBe(true);
  });

  it("Matrix equality with different matrices", () => {
    const a = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 8, 7, 6],
      [5, 4, 3, 2],
    ];

    const b = [
      [2, 3, 4, 5],
      [6, 7, 8, 9],
      [8, 7, 6, 5],
      [4, 3, 2, 1],
    ];

    expect(equals(a, b)).toBe(false);
  });

  it("Multiplying two matrices", () => {
    const a = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 8, 7, 6],
      [5, 4, 3, 2],
    ];

    const b = [
      [-2, 1, 2, 3],
      [3, 2, 1, -1],
      [4, 3, 6, 5],
      [1, 2, 7, 8],
    ];

    const expectedResult = [
      [20, 22, 50, 48],
      [44, 54, 114, 108],
      [40, 58, 110, 102],
      [16, 26, 46, 42],
    ];

    const result = matrixMultiply(a, b);

    expect(equals(result, expectedResult)).toBe(true);
  });

  it("A matrix multiplied by a tuple", () => {
    const a = [
      [1, 2, 3, 4],
      [2, 4, 4, 2],
      [8, 6, 4, 1],
      [0, 0, 0, 1],
    ];

    const b = coordinate(1, 2, 3, 1);
    const expectedResult = coordinate(18, 24, 33, 1);

    const result = multiplyMatrixByCoordinate(a, b);

    expect(result).toStrictEqual(expectedResult);
  });

  it("Multiplying a matrix by the identity matrix", () => {
    const a = [
      [0, 1, 2, 4],
      [1, 2, 4, 8],
      [2, 4, 8, 16],
      [4, 8, 16, 32],
    ];

    const result = matrixMultiply(a, IDENTITY_MATRIX);

    expect(equals(a, result)).toBe(true);
  });

  it("Transposing a matrix", () => {
    const a = [
      [0, 9, 3, 0],
      [9, 8, 0, 8],
      [1, 8, 5, 3],
      [0, 0, 5, 8],
    ];

    const expectedResult = [
      [0, 9, 1, 0],
      [9, 8, 8, 0],
      [3, 0, 5, 5],
      [0, 8, 3, 8],
    ];

    const result = transposeMatrix(a);

    expect(equals(result, expectedResult)).toBe(true);
  });
});
