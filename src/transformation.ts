import { Matrix } from "./matrix";

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
