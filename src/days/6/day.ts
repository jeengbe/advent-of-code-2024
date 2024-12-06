import { assertEquals } from "jsr:@std/assert";
import input from "./input.ts";
import test from "./test.ts";

let steps = 0;

function runGuard(grid: string[][]): ["gone" | "loop", Set<string>] {
  let posY = 0;
  let posX = 0;
  let dirY = -1;
  let dirX = 0;

  const seen = new Set<string>();
  const seenWithDir = new Set<string>();

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === "^") {
        posY = i;
        posX = j;
        seen.add(`${i},${j}`);
        seenWithDir.add(`${i},${j},${dirY},${dirX}`);
      }
    }
  }

  while (true) {
    const newY = posY + dirY;
    const newX = posX + dirX;

    steps++;

    if (newY < 0 || newY >= grid.length || newX < 0 || newX >= grid[0].length) {
      break;
    }

    if (seenWithDir.has(`${newY},${newX},${dirY},${dirX}`)) {
      return ["loop", seen];
    }

    if (grid[newY][newX] === "#") {
      [dirY, dirX] = [dirX, -dirY];
      continue;
    }

    posY = newY;
    posX = newX;
    seen.add(`${posY},${posX}`);
    seenWithDir.add(`${posY},${posX},${dirY},${dirX}`);
  }

  return ["gone", seen];
}

export function partOne(grid: string[][]): number {
  const [fate, seen] = runGuard(grid);

  assertEquals(fate, "gone");

  return seen.size;
}

export function partTwo(grid: string[][]): number {
  let count = 0;

  const [, defaultSeen] = runGuard(grid);

  for (const e of defaultSeen) {
    const [i, j] = e.split(",").map(Number);

    if (grid[i][j] !== ".") {
      continue;
    }

    grid[i][j] = "#";

    const [fate] = runGuard(grid);

    if (fate === "loop") {
      count++;
    }

    grid[i][j] = ".";
  }

  return count;
}

Deno.test("Test One", () => {
  assertEquals(partOne(test), 41);
});

Deno.test("Part One", () => {
  console.log(partOne(input));
});

Deno.test("Test Two", () => {
  assertEquals(partTwo(test), 6);
});

Deno.test("Part Two", () => {
  console.log(partTwo(input));
  console.log(steps);
});
