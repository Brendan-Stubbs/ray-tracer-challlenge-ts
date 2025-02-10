export class Matrix {
  public data: number[][];
  constructor(data: number[][]) {
    if (data.length === 0 || data[0].length === 0) {
      throw new Error("Matrix cannot have empty rows or columns.");
    }

    this.data = data;
  }

  get(row: number, col: number): number {
    return this.data[row][col];
  }

  equals(other: Matrix): boolean {
    if (this.data.length !== other.data.length) {
      return false;
    }

    if (this.data[0].length !== other.data[0].length) {
      return false;
    }

    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.data[0].length; j++) {
        if (this.data[i][j] !== other.data[i][j]) {
          return false;
        }
      }
    }

    return true;
  }
}

export const matrixMultiply = (a: Matrix, b: Matrix): Matrix => {
  const result: number[][] = Array.from({ length: a.data.length }, () =>
    new Array(b.data[0].length).fill(0)
  );

  for (let i = 0; i < a.data.length; i++) {
    for (let j = 0; j < a.data[0].length; j++) {
      for (let k = 0; k < result[0].length; k++) {
        result[i][j] += a.data[i][k] * b.data[k][j];
      }
    }
  }

  return new Matrix(result);
};
