import { assertEquals, assertGreater, assertLess } from "jsr:@std/assert";
import input from "./input.ts";
import test from "./test.ts";

function invert2x2([[a, b], [c, d]]: number[][]): number[][] | null {
  const det = a * d - b * c;

  if (det === 0) {
    return null;
  }

  return [
    [d / det, -b / det],
    [-c / det, a / det],
  ];
}

export function partOne(inn: typeof input): number {
  return inn.reduce((acc, { prize, a: clawA, b: clawB }) => {
    if (prize.x % clawA.x === 0 && prize.x / clawA.x === prize.y / clawA.y) {
      return acc + prize.x / clawA.x;
    }
    if (prize.x % clawB.x === 0 && prize.x / clawB.x === prize.y / clawB.y) {
      return acc + prize.x / clawB.x;
    }

    const inverse = invert2x2([
      [clawA.x, clawB.x],
      [clawA.y, clawB.y],
    ]);

    if (!inverse) {
      return acc;
    }

    let [i, j] = inverse.map(([a, b]) => a * prize.x + b * prize.y);

    i = Math.round(i * 1000) / 1000;
    j = Math.round(j * 1000) / 1000;

    if (i < 0 || j < 0 || i % 1 !== 0 || j % 1 !== 0) {
      return acc;
    }

    return acc + 3 * i + j;
  }, 0);
}

export function partTwo(inn: typeof input): number {
  return partOne(
    inn.map(({ prize, a, b }) => ({
      prize: { x: prize.x + 10000000000000, y: prize.y + 10000000000000 },
      a,
      b,
    }))
  );
}

Deno.test("Test One", () => {
  assertEquals(partOne(test), 480);
});

Deno.test("Part One", () => {
  assertLess(partOne(input), 37398);
  assertGreater(partOne(input), 24695);
  console.log(partOne(input));
});

Deno.test("Part Two", () => {
  console.log(partTwo(input));
});
