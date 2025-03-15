export interface Color {
  red: number;
  green: number;
  blue: number;
}

export const color = (red: number, green: number, blue: number): Color => {
  return { red, green, blue };
};

export const add = (a: Color, b: Color): Color => {
  return color(a.red + b.red, a.green + b.green, a.blue + b.blue);
};

export const subtract = (a: Color, b: Color): Color => {
  return color(a.red - b.red, a.green - b.green, a.blue - b.blue);
};

export const multiply = (a: Color, multiplier: number | Color): Color => {
  if (typeof multiplier === "number") {
    return color(a.red * multiplier, a.green * multiplier, a.blue * multiplier);
  } else {
    return hadamardProduct(a, multiplier);
  }
};

export const hadamardProduct = (a: Color, b: Color): Color => {
  return color(a.red * b.red, a.green * b.green, a.blue * b.blue);
};
