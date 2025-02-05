import { Color } from "../Color";

export const calculateScale = (color: number, depth: number) => {
  if (color < 0) {
    return 0;
  }

  if (color > 1) {
    return depth;
  }

  return Math.round(color * depth);
};

export const scaleColorComponents = (color: Color, depth: number) => {
  const totalColorSize = depth;

  return {
    red: calculateScale(color.red, totalColorSize),
    green: calculateScale(color.green, totalColorSize),
    blue: calculateScale(color.blue, totalColorSize),
  };
};
