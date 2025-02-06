import { Environment } from "./environment";
import { add, Point, Vector } from "./coordinate";

export type Projectile = {
  position: Point;
  velocity: Vector;
};

export const projectile = (position: Point, velocity: Vector): Projectile => {
  return { position, velocity };
};

export const tick = (env: Environment, proj: Projectile): Projectile => {
  const position = add(proj.position, proj.velocity);
  const velocity = add(proj.velocity, env.gravity, env.wind);

  return projectile(position, velocity);
};
