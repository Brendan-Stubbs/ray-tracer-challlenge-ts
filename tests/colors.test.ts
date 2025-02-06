import { add, color, hadamardProduct, multiply, subtract } from "../src/color";

describe("colors", () => {
  it("Color ares (red, green, blue) tuples", () => {
    const c = color(-0.5, 0.4, 1.7);
    expect(c.red).toBe(-0.5);
    expect(c.green).toBe(0.4);
    expect(c.blue).toBe(1.7);
  });

  it("Adding colors", () => {
    const c1 = color(0.9, 0.6, 0.75);
    const c2 = color(0.7, 0.1, 0.25);
    const result = add(c1, c2);
    const expected = color(1.6, 0.7, 1.0);
    expect(result).toStrictEqual(expected);
  });

  it("Subtracting colors", () => {
    const c1 = color(0.9, 0.6, 0.75);
    const c2 = color(0.7, 0.1, 0.25);
    const expected = color(0.2, 0.5, 0.5);
    const result = subtract(c1, c2);
    expect(result.red).toBeCloseTo(expected.red, 10);
    expect(result.green).toBeCloseTo(expected.green, 10);
    expect(result.blue).toBeCloseTo(expected.blue, 10);
  });

  it("Multiplying a color by a scalar", () => {
    const c = color(0.2, 0.3, 0.4);
    const result = multiply(c, 2);
    const expected = color(0.4, 0.6, 0.8);
    expect(result).toStrictEqual(expected);
  });

  it("Hadamard product of 2 colors", () => {
    const c1 = color(1, 0.2, 0.4);
    const c2 = color(0.9, 1, 0.1);
    const expected = color(0.9, 0.2, 0.04);
    const result = hadamardProduct(c1, c2);
    expect(result.red).toBeCloseTo(expected.red, 10);
    expect(result.green).toBeCloseTo(expected.green, 10);
    expect(result.blue).toBeCloseTo(expected.blue, 10);
  });

  it("multiply returns the same result as the Hadamard product", () => {
    const c1 = color(1, 0.2, 0.4);
    const c2 = color(0.9, 1, 0.1);
    const result = multiply(c1, c2);
    const hadamardProductResult = hadamardProduct(c1, c2);
    expect(result).toStrictEqual(hadamardProductResult);
  });
});
