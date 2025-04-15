import { Canvas, pixelAt } from "../canvas";
import { PNG } from "pngjs";

export const canvasToPNG = (canvas: Canvas): Buffer => {
  const { width, height } = canvas;
  const png = new PNG({ width, height });

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (width * y + x) << 2;
      const { red, green, blue } = pixelAt(canvas, x, y);
      png.data[idx] = Math.round(red * 255);
      png.data[idx + 1] = Math.round(green * 255);
      png.data[idx + 2] = Math.round(blue * 255);
      png.data[idx + 3] = 255;
    }
  }

  return PNG.sync.write(png);
};
