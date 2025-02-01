import { Tuple } from "./tuple";

export type Environment = {
  gravity: Tuple; // Vector
  wind: Tuple; // Vector
};

export const environment = (gravity: Tuple, wind: Tuple): Environment => {
  return { gravity, wind };
};
