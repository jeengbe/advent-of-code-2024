import { assertEquals } from "jsr:@std/assert";
import input from "./input.ts";
import test from "./test.ts";

export function partOne(grid: string[][]): number {
  return run(grid, 1, 1);
}

export function partTwo(grid: string[][]): number {
  return run(grid, 0, Infinity);
}

function run(
  grid: string[][],
  minDistance: number,
  maxDistance: number
): number {
  const antinodes = new Set<string>();

  const antennas = new Map<string, [y: string, x: string][]>();

  for (const y in grid) {
    for (const x in grid[y]) {
      if (grid[y][x] !== ".") {
        const key = grid[y][x];
        antennas.set(key, antennas.get(key) ?? []);
        antennas.get(key)!.push([y, x]);
      }
    }
  }

  for (const [, locations] of antennas) {
    for (let i = 0; i < locations.length; i++) {
      for (let j = 0; j < locations.length; j++) {
        if (i === j) continue;
        const [y1, x1] = locations[i].map(Number);
        const [y2, x2] = locations[j].map(Number);

        const dy = y2 - y1;
        const dx = x2 - x1;

        for (let i = minDistance; i <= maxDistance; i++) {
          const newY = y2 + i * dy;
          const newX = x2 + i * dx;

          if (
            newY < 0 ||
            newY >= grid.length ||
            newX < 0 ||
            newX >= grid[0].length
          )
            break;

          antinodes.add(`${newX},${newY}`);
        }
      }
    }
  }

  return antinodes.size;
}

Deno.test("Test One", () => {
  assertEquals(partOne(test), 14);
});

Deno.test("Part One", () => {
  console.log(partOne(input));
});

Deno.test("Test Two", () => {
  assertEquals(partTwo(test), 34);
});

Deno.test("Part Two", () => {
  console.log(partTwo(input));
});
