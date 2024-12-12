import { assertEquals } from "jsr:@std/assert";
import input from "./input.ts";
import test from "./test.ts";

export function partOne(garden: string[][]): number {
  const seen = new Set<string>();
  const regions: { of: string; at: Set<string> }[] = [];

  for (let y = 0; y < garden.length; y++) {
    for (let x = 0; x < garden[y].length; x++) {
      if (!seen.has(`${x},${y}`)) {
        regions.push(getRegion(x, y, garden, seen));
      }
    }
  }

  return regions.reduce((acc, { at: regionAt }) => {
    const perimeter = [...regionAt].reduce((acc, current) => {
      const [x, y] = current.split(",").map(Number);

      return (
        acc +
        (regionAt.has(`${x + 1},${y}`) ? 0 : 1) +
        (regionAt.has(`${x - 1},${y}`) ? 0 : 1) +
        (regionAt.has(`${x},${y + 1}`) ? 0 : 1) +
        (regionAt.has(`${x},${y - 1}`) ? 0 : 1)
      );
    }, 0);

    return acc + regionAt.size * perimeter;
  }, 0);
}

export function partTwo(garden: string[][]): number {
  const seen = new Set<string>();
  const regions: { of: string; at: Set<string> }[] = [];

  for (let y = 0; y < garden.length; y++) {
    for (let x = 0; x < garden[y].length; x++) {
      if (!seen.has(`${x},${y}`)) {
        regions.push(getRegion(x, y, garden, seen));
      }
    }
  }

  return regions.reduce((acc, { at: regionAt }) => {
    let sides = 0;

    for (const current of regionAt) {
      const [x, y] = current.split(",").map(Number);

      // Top
      if (
        !regionAt.has(`${x},${y - 1}`) &&
        (regionAt.has(`${x - 1},${y - 1}`) || !regionAt.has(`${x - 1},${y}`))
      ) {
        sides++;
      }

      // Left
      if (
        !regionAt.has(`${x - 1},${y}`) &&
        (regionAt.has(`${x - 1},${y - 1}`) || !regionAt.has(`${x},${y - 1}`))
      ) {
        sides++;
      }

      // Bottom
      if (
        !regionAt.has(`${x},${y + 1}`) &&
        (regionAt.has(`${x - 1},${y + 1}`) || !regionAt.has(`${x - 1},${y}`))
      ) {
        sides++;
      }

      // Right
      if (
        !regionAt.has(`${x + 1},${y}`) &&
        (regionAt.has(`${x + 1},${y - 1}`) || !regionAt.has(`${x},${y - 1}`))
      ) {
        sides++;
      }
    }

    return acc + regionAt.size * sides;
  }, 0);
}

function getRegion(
  x: number,
  y: number,
  garden: string[][],
  seen: Set<string>
): { of: string; at: Set<string> } {
  const region = _getRegion(garden[y][x], x, y, garden, seen);

  return { of: garden[y][x], at: new Set(region) };
}

function _getRegion(
  expect: string,
  x: number,
  y: number,
  garden: string[][],
  seen: Set<string>
): string[] {
  if (garden[y]?.[x] !== expect) return [];

  if (seen.has(`${x},${y}`)) return [];
  seen.add(`${x},${y}`);

  return [
    `${x},${y}`,
    ..._getRegion(expect, x + 1, y, garden, seen),
    ..._getRegion(expect, x - 1, y, garden, seen),
    ..._getRegion(expect, x, y + 1, garden, seen),
    ..._getRegion(expect, x, y - 1, garden, seen),
  ];
}

Deno.test("Test One", () => {
  assertEquals(partOne(test), 1930);
});

Deno.test("Part One", () => {
  console.log(partOne(input));
});

Deno.test("Test Two", () => {
  assertEquals(partTwo(test), 1206);
});

Deno.test("Part Two", () => {
  console.log(partTwo(input));
});
