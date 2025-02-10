export type Matrix = number[][];

export const get = (m: Matrix, row: number, col: number): number => {
  return m[row][col];
};

export const equals = (a: Matrix, b: Matrix): boolean => {
  return JSON.stringify(a) === JSON.stringify(b);
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
