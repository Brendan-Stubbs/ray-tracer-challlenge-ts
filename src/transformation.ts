import { IDENTITY_MATRIX, Matrix, matrixMultiply } from "./matrix";

export const translation = (x: number, y: number, z: number): Matrix => {
  return [
    [1, 0, 0, x],
    [0, 1, 0, y],
    [0, 0, 1, z],
    [0, 0, 0, 1],
  ];
};

export const scaling = (x: number, y: number, z: number): Matrix => {
  return [
    [x, 0, 0, 0],
    [0, y, 0, 0],
    [0, 0, z, 0],
    [0, 0, 0, 1],
  ];
};

export const rotationX = (radians: number) => {
  const cosR = Math.cos(radians);
  const sinR = Math.sin(radians);

  return [
    [1, 0, 0, 0],
    [0, cosR, -sinR, 0],
    [0, sinR, cosR, 0],
    [0, 0, 0, 1],
  ];
};

export const rotationY = (radians: number) => {
  const cosR = Math.cos(radians);
  const sinR = Math.sin(radians);

  return [
    [cosR, 0, sinR, 0],
    [0, 1, 0, 0],
    [-sinR, 0, cosR, 0],
    [0, 0, 0, 1],
  ];
};

export const rotationZ = (radians: number) => {
  const cosR = Math.cos(radians);
  const sinR = Math.sin(radians);
  return [
    [cosR, -sinR, 0, 0],
    [sinR, cosR, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ];
};

export const shearing = (
  xy: number,
  xz: number,
  yx: number,
  yz: number,
  zx: number,
  zy: number
): Matrix => {
  return [
    [1, xy, xz, 0],
    [yx, 1, yz, 0],
    [zx, zy, 1, 0],
    [0, 0, 0, 1],
  ];
};

export class Transform {
  private readonly matrix: Matrix;

  constructor(matrix: Matrix = IDENTITY_MATRIX) {
    this.matrix = matrix;
  }

  apply(transform: Matrix): Transform {
    return new Transform(matrixMultiply(this.matrix, transform));
  }

  translate(x: number, y: number, z: number): Transform {
    return this.apply(translation(x, y, z));
  }

  scale(x: number, y: number, z: number): Transform {
    return this.apply(scaling(x, y, z));
  }

  rotateX(radians: number): Transform {
    return this.apply(rotationX(radians));
  }

  rotateY(radians: number): Transform {
    return this.apply(rotationY(radians));
  }

  rotateZ(radians: number): Transform {
    return this.apply(rotationZ(radians));
  }

  shear(
    xy: number,
    xz: number,
    yx: number,
    yz: number,
    zx: number,
    zy: number
  ): Transform {
    return this.apply(shearing(xy, xz, yx, yz, zx, zy));
  }

  getMatrix(): Matrix {
    return this.matrix;
  }
}
