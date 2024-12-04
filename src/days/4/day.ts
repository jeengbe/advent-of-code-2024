import { assertEquals } from "jsr:@std/assert";
import input from "./input.ts";
import test from "./test.ts";

export function partOne(grid: string[][]): number {
  const word = "XMAS";
  const deltas = [
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
  ];

  let count = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === word[0]) {
        for (let k = 0; k < deltas.length; k++) {
          let found = true;
          let x = i;
          let y = j;

          for (let l = 1; l < word.length; l++) {
            const [dx, dy] = deltas[k];
            x += dx;
            y += dy;

            if (x < 0 || x >= grid.length || y < 0 || y >= grid[i].length) {
              found = false;
              break;
            }

            if (grid[x][y] !== word[l]) {
              found = false;
              break;
            }
          }

          if (found) {
            count++;
          }
        }
      }
    }
  }

  return count;
}

export function partTwo(grid: string[][]): number {
  const word = "MAS";
  const deltas = [
    [
      [1, 1],
      [-1, -1],
    ],
    [
      [-1, 1],
      [-1, 1],
    ],
  ];

  let count = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === word[1]) {
        const diagA =
          (grid[i - 1]?.[j - 1] === word[0] &&
            grid[i + 1]?.[j + 1] === word[2]) ||
          (grid[i - 1]?.[j - 1] === word[2] &&
            grid[i + 1]?.[j + 1] === word[0]);

        const diagB =
          (grid[i - 1]?.[j + 1] === word[0] &&
            grid[i + 1]?.[j - 1] === word[2]) ||
          (grid[i - 1]?.[j + 1] === word[2] &&
            grid[i + 1]?.[j - 1] === word[0]);

        if (diagA && diagB) {
          count++;
        }
      }
    }
  }

  return count;
}

Deno.test("Test One", () => {
  assertEquals(partOne(test), 18);
});

Deno.test("Part One", () => {
  console.log(partOne(input));
});

Deno.test("Test Two", () => {
  assertEquals(partTwo(test), 9);
});

Deno.test("Part Two", () => {
  console.log(partTwo(input));
});
