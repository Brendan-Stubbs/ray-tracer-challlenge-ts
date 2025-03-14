import { coordinate, Coordinate } from "./coordinate";

export type Matrix = number[][];

export const get = (m: Matrix, row: number, col: number): number => {
  return m[row][col];
};

export const equals = (a: Matrix, b: Matrix): boolean => {
  if (a.length !== b.length || a[0].length !== b[0].length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a[i].length; j++) {
      if (a[i][j] !== b[i][j]) {
        return false;
      }
    }
  }

  return true;
};

export const matrixMultiply = (a: Matrix, b: Matrix): Matrix => {
  const result: number[][] = Array.from({ length: a.length }, () =>
    new Array(b[0].length).fill(0)
  );

  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b[0].length; j++) {
      for (let k = 0; k < a[0].length; k++) {
        result[i][j] += a[i][k] * b[k][j];
      }
    }
  }

  return result;
};

export const multiplyMatrixByCoordinate = (a: Matrix, b: Coordinate) => {
  const convertedB = [[b.x], [b.y], [b.z], [b.w]];
  const result = matrixMultiply(a, convertedB);
  const x = result[0][0];
  const y = result[1][0];
  const z = result[2][0];
  const w = result[3][0];

  return coordinate(x, y, z, w);
};

export const IDENTITY_MATRIX: Matrix = [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
];

export const transposeMatrix = (m: Matrix): Matrix => {
  const output: Matrix = m.map((row) => [...row]);

  for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m.length; j++) {
      output[j][i] = m[i][j];
    }
  }

  return output;
};

// NB this currently only supports 2x2 matrices
export const determinant = (m: Matrix) => {
  return m[0][0] * m[1][1] - m[0][1] * m[1][0];
};

export const submatrix = (m: Matrix, row: number, column: number) => {
  const output: Matrix = [];

  for (let i = 0; i < m.length; i++) {
    if (i === row) {
      continue;
    }
    let currentRow: number[] | undefined;
    for (let j = 0; j <= m[i].length; j++) {
      if (j === column) {
        continue;
      }

      currentRow = currentRow ? currentRow : [];
      currentRow.push(m[i][j]);
    }
    if (currentRow) {
      output.push(currentRow.filter((item) => item !== undefined));
    }
  }

  return output;
};
