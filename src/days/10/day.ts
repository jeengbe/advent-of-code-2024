import { assertEquals } from "jsr:@std/assert";
import input from "./input.ts";
import test from "./test.ts";

export function partOne(map: number[][]): number {
  let count = 0;

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] !== 0) {
        continue;
      }

      const ends = new Set<string>();
      aggrTrailEnds(y, x, 1, ends);

      count += ends.size;
    }
  }

  return count;

  function aggrTrailEnds(
    y: number,
    x: number,
    expect: number,
    ends: Set<string>
  ): void {
    for (const d of [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ]) {
      const [newY, newX] = [y + d[0], x + d[1]];

      if (map[newY]?.[newX] !== expect) {
        continue;
      }

      if (expect === 9) {
        ends.add(`${newY},${newX}`);
        continue;
      }

      aggrTrailEnds(newY, newX, expect + 1, ends);
    }
  }
}

export function partTwo(map: number[][]): number {
  let count = 0;

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] !== 0) {
        continue;
      }

      count += countTrails(y, x, 1);
    }
  }

  return count;

  function countTrails(y: number, x: number, expect: number): number {
    return [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ].reduce((acc, d) => {
      const [newY, newX] = [y + d[0], x + d[1]];

      if (map[newY]?.[newX] !== expect) {
        return acc;
      }

      if (expect === 9) {
        return acc + 1;
      }

      return acc + countTrails(newY, newX, expect + 1);
    }, 0);
  }
}

Deno.test("Test One", () => {
  assertEquals(partOne(test), 36);
});

Deno.test("Part One", () => {
  console.log(partOne(input));
});

Deno.test("Test Two", () => {
  assertEquals(partTwo(test), 81);
});

Deno.test("Part Two", () => {
  console.log(partTwo(input));
});
