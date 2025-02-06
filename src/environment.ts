import { Vector } from "./coordinate";

export type Environment = {
  gravity: Vector;
  wind: Vector;
};

export const environment = (gravity: Vector, wind: Vector): Environment => {
  return { gravity, wind };
};
