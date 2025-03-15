import { Color } from "./color";
import {
  convertRowToString,
  flattenPixel,
  scaleColorComponents,
} from "./utils/ppm";

export interface Canvas {
  width: number;
  height: number;
  pixels: Color[];
}

export const canvas = (width: number, height: number): Canvas => {
  return {
    width,
    height,
    pixels: Array(width * height).fill({ red: 0, green: 0, blue: 0 }),
  };
};

export const writePixel = (
  canvas: Canvas,
  x: number,
  y: number,
  color: Color
): void => {
  canvas.pixels[y * canvas.width + x] = color;
};

export const pixelAt = (canvas: Canvas, x: number, y: number): Color => {
  return canvas.pixels[y * canvas.width + x];
};

export const canvasToPPM = (canvas: Canvas): string => {
  const ppmIdentifier = "P3";
  const colorDepth = 255;
  const maxLength = 70;
  const dimensions = `${canvas.width} ${canvas.height}`;
  const rows: number[][] = [];

  for (let row = 0; row < canvas.height; row++) {
    rows[row] = [];
    for (let column = 0; column < canvas.width; column++) {
      const scaledPixel = scaleColorComponents(
        pixelAt(canvas, column, row),
        colorDepth
      );

      rows[row].push(...flattenPixel(scaledPixel));
    }
  }

  let lines: string[] = [];
  rows.forEach((row) => {
    lines.push(...convertRowToString(row, maxLength));
  });

  return [ppmIdentifier, dimensions, colorDepth, ...lines].join("\n");
};
