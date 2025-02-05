import { Color } from "./Color";
import { scaleColorComponents } from "./utils/ppm";

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

// export const canvasToPPM = (canvas: Canvas): string => {
//   const ppmIdentifier = "P3";
//   const dimensions = `${canvas.width} ${canvas.height}`;
//   const colorDepth = 255;
//   const maxLength = 70;

//   const pixels = Array.from({ length: canvas.height }, () => "");

//   for (const [index, pixel] of canvas.pixels.entries()) {
//     const row = Math.floor(index / canvas.width);
//     const scaled = scaleColorComponents(pixel, colorDepth);

//     pixels[row] = pixels[row].concat(
//       ` ${scaled.red} ${scaled.green} ${scaled.blue}`
//     );
//   }

//   const cleanedPixels = pixels.map((p) => p.trim());

//   return [ppmIdentifier, dimensions, colorDepth, ...cleanedPixels].join("\n");
// };

export const canvasToPPM = (canvas: Canvas): string => {
  const ppmIdentifier = "P3";
  const dimensions = `${canvas.width} ${canvas.height}`;
  const colorDepth = 255;
  const maxLength = 70;

  const pixels = Array.from({ length: canvas.height }, () => "");

  let rows = [];

  for (let row = 0; row < canvas.height; row++) {
    let currentRowString = "";
    let currentRow = [];
    for (let column = 0; column < canvas.width; column++) {
      const pixel = pixelAt(canvas, row, column);
      const scaled = scaleColorComponents(pixel, colorDepth);
      const flatScaled = [
        String(scaled.red),
        String(scaled.green),
        String(scaled.blue),
      ];

      for (const sp of flatScaled) {
        if (currentRowString.length + sp.length > maxLength) {
          currentRowString.concat(sp);
        } else {
          currentRow.push(currentRowString);
          currentRowString = "";
        }
      }
    }
  }

  // for (const [index, pixel] of canvas.pixels.entries()) {
  //   const row = Math.floor(index / canvas.width);
  //   const scaled = scaleColorComponents(pixel, colorDepth);

  //   for (const pixel of scaled) {
  //   }

  //   pixels[row] = pixels[row].concat(
  //     ` ${scaled.red} ${scaled.green} ${scaled.blue}`
  //   );
  // }

  // const cleanedPixels = pixels.map((p) => p.trim());

  // return [ppmIdentifier, dimensions, colorDepth, ...cleanedPixels].join("\n");
};
