import * as fs from "fs";
import { canvas, canvasToPPM, writePixel } from "./Canvas";
import { color } from "./Color";
import { environment } from "./Environment";
import { projectile, tick } from "./Projectile";
import { normalize, point, vector, multiply } from "./tuples/Coordinate";

const start = point(0, 1, 0);
const velocity = multiply(normalize(vector(1, 1.8, 0)), 11.25);

const gravity = vector(0, -0.1, 0);
const wind = vector(-0.01, 0, 0);

const p = projectile(start, velocity);
const e = environment(gravity, wind);
const c = canvas(900, 550);

let currentProjectile = p;
let ticks = 0;

while (currentProjectile.position.y > 0) {
  const red = color(1, 0, 0);
  currentProjectile = tick(e, currentProjectile);
  console.log(currentProjectile);
  const x = Math.round(currentProjectile.position.x);
  const y = Math.round(c.height - currentProjectile.position.y - 1);

  writePixel(c, x, y, red);
  ticks++;
}

const filePath = "output.ppm";
const fileContent = canvasToPPM(c);
fs.writeFileSync(filePath, fileContent, "utf8");
console.log(`Projectile hit the ground after ${ticks} ticks`);
