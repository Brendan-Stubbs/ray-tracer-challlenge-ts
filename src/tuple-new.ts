export interface Tuple {
  x: number;
  y: number;
  z: number;
  w: number;
}

export const tuple = (x: number, y: number, z: number, w: number): Tuple => {
  if (w == 1) {
    return point(x, y, z);
  }

  if (w == 0) {
    return vector(x, y, z);
  }

  return { x, y, z, w };
};

export const point = (x: number, y: number, z: number): Tuple => {
  return { x, y, z, w: 1 };
};

export const vector = (x: number, y: number, z: number): Tuple => {
  return { x, y, z, w: 0 };
};

export const isPoint = (t: Tuple): boolean => {
  return t.w === 1;
};

export const isVector = (t: Tuple): boolean => {
  return t.w === 0;
};

export const add = (a: Tuple, b: Tuple): Tuple => {
  return tuple(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w);
};

export const subtract = (a: Tuple, b: Tuple): Tuple => {
  return tuple(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w);
};

export const negate = (t: Tuple): Tuple => {
  return tuple(-t.x, -t.y, -t.z, -t.w);
};

export const multiply = (t: Tuple, scalar: number): Tuple => {
  return tuple(t.x * scalar, t.y * scalar, t.z * scalar, t.w * scalar);
};

export const divide = (t: Tuple, scalar: number): Tuple => {
  return tuple(t.x / scalar, t.y / scalar, t.z / scalar, t.w / scalar);
};

export const magnitude = (t: Tuple): number => {
  return Math.sqrt(t.x ** 2 + t.y ** 2 + t.z ** 2 + t.w ** 2);
};

/**
 * Functions specific to vector
 */
export const normalize = (t: Tuple): Tuple => {
  const mag = magnitude(t);
  return tuple(t.x / mag, t.y / mag, t.z / mag, t.w / mag);
};

export const dot = (a: Tuple, b: Tuple): number => {
  return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
};

export const cross = (a: Tuple, b: Tuple): Tuple => {
  return vector(
    a.y * b.z - a.z * b.y,
    a.z * b.x - a.x * b.z,
    a.x * b.y - a.y * b.x
  );
};
