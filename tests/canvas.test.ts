import { canvas, canvasToPPM, pixelAt, writePixel } from "../src/Canvas";
import { color } from "../src/Color";

describe("Canvas", () => {
  it("Creating a canvas", () => {
    const c = canvas(10, 20);
    expect(c.width).toBe(10);
    expect(c.height).toBe(20);
    for (let x = 0; x < c.width; x++) {
      for (let y = 0; y < c.height; y++) {
        expect(c.pixels[y * c.width + x]).toEqual(color(0, 0, 0));
      }
    }
  });

  it("Writing pixels to a canvas", () => {
    const c = canvas(10, 20);
    const red = color(1, 0, 0);
    writePixel(c, 2, 3, red);
    expect(pixelAt(c, 2, 3)).toEqual(red);
  });

  it("Constructing the PPM header", () => {
    const c = canvas(5, 3);
    const ppm = canvasToPPM(c);
    const expectedLines = ["P3", "5 3", "255"];
    expect(ppm.split("\n").slice(0, 3)).toStrictEqual(expectedLines);
  });

  it("Constructing the PPM pixel data TEMP", () => {
    const c = canvas(5, 3);
    const c1 = color(1.5, 0, 0);
    const c2 = color(0, 0.5, 0);
    const c3 = color(-0.5, 0, 1);
    writePixel(c, 0, 0, c1);
    writePixel(c, 2, 1, c2);
    writePixel(c, 4, 2, c3);

    const ppm = canvasToPPM(c);
    const expectedLines = [
      "255 0 0 0 0 0 0 0 0 0 0 0 0 0 0",
      "0 0 0 0 0 0 0 128 0 0 0 0 0 0 0",
      "0 0 0 0 0 0 0 0 0 0 0 0 0 0 255",
    ];
    expect(ppm.split("\n").slice(3, 6)).toStrictEqual(expectedLines);
  });

  it("Splitting long lines in PPM files", () => {
    const c = canvas(10, 2);
    const c1 = color(1, 0.8, 0.6);
    for (let x = 0; x < c.width; x++) {
      for (let y = 0; y < c.height; y++) {
        writePixel(c, x, y, c1);
      }
    }

    const ppm = canvasToPPM(c);
    const expectedLines = [
      "255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204",
      "153 255 204 153 255 204 153 255 204 153 255 204 153",
      "255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204",
      "153 255 204 153 255 204 153 255 204 153 255 204 153",
    ];
    expect(ppm.split("\n").slice(3, 7)).toStrictEqual(expectedLines);
  });
});
