import { Vector } from "./tuples/Coordinate";
import { Tuple } from "./tuples/Tuple";

export type Environment = {
  gravity: Vector; // Vector
  wind: Vector; // Vector
};

export const environment = (gravity: Vector, wind: Vector): Environment => {
  return { gravity, wind };
};
