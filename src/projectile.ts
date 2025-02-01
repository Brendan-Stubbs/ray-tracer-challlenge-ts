import { Environment } from "./environment";
import { add, Tuple } from "./tuple";

export type Projectile = {
  position: Tuple; // Point
  velocity: Tuple; // Vector
};

export const projectile = (position: Tuple, velocity: Tuple): Projectile => {
  return { position, velocity };
};

export const tick = (env: Environment, proj: Projectile): Projectile => {
  const position = add(proj.position, proj.velocity);
  const velocity = add(proj.velocity, env.gravity, env.wind);

  return projectile(position, velocity);
};
