import { assertEquals } from "jsr:@std/assert";
import input from "./input.ts";
import test from "./test.ts";

export function partOne(robots: typeof input, w: number, h: number): number {
  const grid = new Array(h).fill(0).map(() => new Array(w).fill(0));

  for (const robot of robots) {
    grid[robot.pos.y][robot.pos.x]++;
  }

  for (let i = 0; i < 100; i++) {
    for (const robot of robots) {
      grid[robot.pos.y][robot.pos.x]--;

      robot.pos.x += robot.vel.x;
      robot.pos.y += robot.vel.y;

      // https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-numbers
      robot.pos.x = ((robot.pos.x % w) + w) % w;
      robot.pos.y = ((robot.pos.y % h) + h) % h;

      grid[robot.pos.y][robot.pos.x]++;
    }
  }

  const quads = [
    [0, 0],
    [0, 0],
  ];

  for (let y = 0; y < h; y++) {
    if (Math.floor(h / 2) === y) continue;
    for (let x = 0; x < w; x++) {
      if (Math.floor(w / 2) === x) continue;

      quads[Math.round(x / w)][Math.round(y / h)] += grid[y][x];
    }
  }

  return quads.flat().reduce((a, b) => a * b, 1);
}

export function partTwo(robots: typeof input, w: number, h: number): number {
  const grid = new Array(h).fill(0).map(() => new Array(w).fill(0));

  for (const robot of robots) {
    grid[robot.pos.y][robot.pos.x]++;
  }

  for (let i = 0; i < 500000; i++) {
    for (const robot of robots) {
      grid[robot.pos.y][robot.pos.x]--;

      robot.pos.x += robot.vel.x;
      robot.pos.y += robot.vel.y;

      // https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-numbers
      robot.pos.x = ((robot.pos.x % w) + w) % w;
      robot.pos.y = ((robot.pos.y % h) + h) % h;

      grid[robot.pos.y][robot.pos.x]++;
    }

    // No way I'd thought of this
    if (grid.flat().every((value) => value <= 1)) {
      console.log(grid.map((row) => row.map((value) => value || ".").join("")));

      return i + 1;
    }
  }

  return -1;
}

Deno.test("Test One", () => {
  assertEquals(partOne(test, 11, 7), 12);
});

Deno.test("Part One", () => {
  console.log(partOne(input, 101, 103));
});

Deno.test("Part Two", () => {
  console.log(partTwo(input, 101, 103));
});
