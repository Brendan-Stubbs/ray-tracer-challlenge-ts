import { color } from "../src/Color";
import {
  convertRowToString,
  flattenPixel,
  scaleColorComponents,
} from "../src/utils/ppm";

describe("PPM Utils", () => {
  it("Scaling the color component (Max)", () => {
    const c1 = color(1, 0, 0.5);
    const scaled = scaleColorComponents(c1, 255);
    expect(scaled.red).toBe(255);
    expect(scaled.green).toBe(0);
    expect(scaled.blue).toBe(128);
  });

  it("Flatten a color", () => {
    const c = color(1, 0.5, 1);
    const result = flattenPixel(c);
    expect(result).toStrictEqual([1, 0.5, 1]);
  });

  it("Convert a row to a string", () => {
    const input = [1, 2, 3, 4, 5, 6, 7];
    const result = convertRowToString(input, 4);
    expect(result).toStrictEqual(["1 2", "3 4", "5 6", "7"]);
  });

  it("Convert a row containing multi-character numbers to a string", () => {
    const input = [10, 29, 34, 4, 5, 6, 7];
    const result = convertRowToString(input, 4);
    expect(result).toStrictEqual(["10", "29", "34 4", "5 6", "7"]);
  });

  it("Appends a number when adding its extra space makes the line exactly maxLength", () => {
    const input = [10, 2];
    const result = convertRowToString(input, 4);
    expect(result).toStrictEqual(["10 2"]);
  });

  it("Handles a single element whose string length exactly equals maxLength", () => {
    const input = [10];
    const result = convertRowToString(input, 2);
    expect(result).toStrictEqual(["10"]);
  });
});
