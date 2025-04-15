import { canvas, canvasToPPM, writePixel } from "../canvas";
import { point } from "../coordinate";
import { multiplyMatrixByCoordinate } from "../matrix";
import { rotationY } from "../transformation";
import { color } from "../color";
import * as fs from "fs";
import { OUTPUT_DIRECTORY } from "./constants";
import { canvasToPNG } from "../utils/png";

export const chapter4 = () => {
  const size = 400;
  const radius = size * (3 / 8);
  const center = size / 2;
  const c = canvas(size, size);
  const pixelColor = color(1, 1, 0);

  for (let i = 0; i < 12; i++) {
    const radians = (i / 12) * 2 * Math.PI;

    const pRot = multiplyMatrixByCoordinate(rotationY(radians), point(0, 0, 1));

    const xWorld = pRot.x * radius;
    const zWorld = pRot.z * radius;

    const xPixel = Math.round(center + xWorld);
    const yPixel = Math.round(center - zWorld);

    writePixel(c, xPixel, yPixel, pixelColor);
  }

  const png = canvasToPNG(c);
  fs.writeFileSync(`${OUTPUT_DIRECTORY}/chapter4.png`, png);
};
