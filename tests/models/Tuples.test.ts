import {
  add,
  cross,
  divide,
  dot,
  isPoint,
  isVector,
  magnitude,
  multiply,
  negate,
  normalize,
  subtract,
  tuple,
  vector,
  point,
} from "../../src/tuple-new";

describe("Tuples", () => {
  it("A tuple with w=1 is a point", () => {
    const result = tuple(4.3, -4.2, 3.1, 1.0);
    expect(result.x).toBe(4.3);
    expect(result.y).toBe(-4.2);
    expect(result.z).toBe(3.1);
    expect(result.w).toBe(1.0);
    expect(isPoint(result)).toBe(true);
    expect(isVector(result)).toBe(false);
  });

  it("A tuple with w=0 is a vector", () => {
    const result = tuple(4.3, -4.2, 3.1, 0.0);
    expect(result.x).toBe(4.3);
    expect(result.y).toBe(-4.2);
    expect(result.z).toBe(3.1);
    expect(result.w).toBe(0.0);
    expect(isPoint(result)).toBe(false);
    expect(isVector(result)).toBe(true);
  });

  it("Creates points with w=1", () => {
    const result = point(4, -4, 3);
    expect(result.w).toBe(1.0);
  });

  it("Creates vectors with w=0", () => {
    const result = vector(4, -4, 3);
    expect(result.w).toBe(0.0);
  });

  it("Adding two tuples", () => {
    const a = tuple(3, -2, 5, 1);
    const b = tuple(-2, 3, 1, 0);
    const result = add(a, b);
    expect(result.x).toBe(1);
    expect(result.y).toBe(1);
    expect(result.z).toBe(6);
    expect(result.w).toBe(1);
  });

  it("Subtracting two points", () => {
    const p1 = point(3, 2, 1);
    const p2 = point(5, 6, 7);
    const result = subtract(p1, p2);
    expect(result).toStrictEqual(vector(-2, -4, -6));
  });

  it("subtracting a vector from a point", () => {
    const p = point(3, 2, 1);
    const v = vector(5, 6, 7);
    const result = subtract(p, v);
    expect(result).toStrictEqual(point(-2, -4, -6));
  });

  it("subtracting two vectors", () => {
    const v1 = vector(3, 2, 1);
    const v2 = vector(5, 6, 7);
    const result = subtract(v1, v2);
    expect(result).toStrictEqual(vector(-2, -4, -6));
  });

  it("Subtracting a vector from the zero vector", () => {
    const zero = vector(0, 0, 0);
    const v = vector(1, -2, 3);
    const result = subtract(zero, v);
    expect(result).toStrictEqual(vector(-1, 2, -3));
  });

  it("Negating a tuple", () => {
    const a = tuple(1, -2, 3, -4);
    const result = negate(a);
    expect(result).toStrictEqual(tuple(-1, 2, -3, 4));
  });

  it("Multiplying a tuple by a scalar", () => {
    const a = tuple(1, -2, 3, -4);
    const result = multiply(a, 3.5);
    expect(result).toStrictEqual(tuple(3.5, -7, 10.5, -14));
  });

  it("Multiplying a tuple by a fraction", () => {
    const a = tuple(1, -2, 3, -4);
    const result = multiply(a, 0.5);
    expect(result).toStrictEqual(tuple(0.5, -1, 1.5, -2));
  });

  it("Dividing a tuple by a scalar", () => {
    const a = tuple(1, -2, 3, -4);
    const result = divide(a, 2);
    expect(result).toStrictEqual(tuple(0.5, -1, 1.5, -2));
  });

  it("Computing the magnitude of vector(1, 0, 0)", () => {
    const v = vector(1, 0, 0);
    expect(magnitude(v)).toBe(1);
  });

  it("Computing the magnitude of vector(0, 1, 0)", () => {
    const v = vector(0, 1, 0);
    expect(magnitude(v)).toBe(1);
  });

  it("Computing the magnitude of vector(0, 0, 1)", () => {
    const v = vector(0, 0, 1);
    expect(magnitude(v)).toBe(1);
  });

  it("Computing the magnitude of vector(1, 2, 3)", () => {
    const v = vector(1, 2, 3);
    expect(magnitude(v)).toBe(Math.sqrt(14));
  });

  it("Computing the magnitude of vector(-1, -2, -3)", () => {
    const v = vector(-1, -2, -3);
    expect(magnitude(v)).toBe(Math.sqrt(14));
  });

  it("Normalizing vector(4, 0, 0) gives (1, 0, 0)", () => {
    const v = vector(4, 0, 0);
    expect(normalize(v)).toStrictEqual(vector(1, 0, 0));
  });

  it("Normalizing vector(1, 2, 3)", () => {
    const v = vector(1, 2, 3);
    const normalized = normalize(v);

    expect(normalized.x).toBeCloseTo(0.26726, 5);
    expect(normalized.y).toBeCloseTo(0.53452, 5);
    expect(normalized.z).toBeCloseTo(0.80178, 5);
    expect(normalized.w).toBe(0);
  });

  it("The magnitude of a normalized vector", () => {
    const v = vector(1, 2, 3);
    const norm = normalize(v);
    expect(magnitude(norm)).toBe(1);
  });

  it("The dot product of two tuples", () => {
    const a = vector(1, 2, 3);
    const b = vector(2, 3, 4);
    expect(dot(a, b)).toBe(20);
  });

  it("The cross product of two vectors", () => {
    const a = vector(1, 2, 3);
    const b = vector(2, 3, 4);
    expect(cross(a, b)).toStrictEqual(vector(-1, 2, -1));
    expect(cross(b, a)).toStrictEqual(vector(1, -2, 1));
  });
});
