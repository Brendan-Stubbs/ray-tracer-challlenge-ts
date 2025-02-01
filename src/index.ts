import { environment } from "./environment";
import { projectile, tick } from "./projectile";
import { normalize, point, vector } from "./tuple";

const p = projectile(point(0, 1, 0), normalize(vector(1, 1, 0)));
const e = environment(vector(0, -0.1, 0), vector(-0.01, 0, 0));

console.log(tick(e, p));

let currentProjectile = p;
let ticks = 0;

while (currentProjectile.position.y > 0) {
  currentProjectile = tick(e, currentProjectile);
  console.log(currentProjectile);
  ticks++;
}

console.log(`Projectile hit the ground after ${ticks} ticks`);
