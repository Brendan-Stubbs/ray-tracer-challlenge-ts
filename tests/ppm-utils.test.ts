import { color } from "../src/Color";
import { scaleColorComponents } from "../src/utils/ppm";

describe("PPM Utils", () => {
  it("Scaling the color component (Max)", () => {
    const c1 = color(1, 0, 0.5);
    const scaled = scaleColorComponents(c1, 255);
    expect(scaled.red).toBe(255);
    expect(scaled.green).toBe(0);
    expect(scaled.blue).toBe(128);
  });
});
