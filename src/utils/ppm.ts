import { Color } from "../color.m";

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

export const flattenPixel = (color: Color) => {
  return [color.red, color.green, color.blue];
};

export const convertRowToString = (row: number[], maxLength: number) => {
  let output: string[] = [];
  let currentRow = "";

  row.forEach((color) => {
    const colorString = color.toString();

    if (
      currentRow.length +
        colorString.length +
        (currentRow.length > 0 ? 1 : 0) <=
      maxLength
    ) {
      const stringToConcat = currentRow ? ` ${colorString}` : colorString;
      currentRow = currentRow.concat(stringToConcat);
    } else {
      output.push(currentRow);
      currentRow = colorString;
    }
  });

  if (currentRow.length > 0) {
    output.push(currentRow);
  }

  return output;
};
