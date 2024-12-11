import { assertEquals } from "jsr:@std/assert";
import input from "./input.ts";
import test from "./test.ts";

export function partOne(stones: number[]): number {
  const cache = new Map<string, number>();
  return stones.reduce((acc, stone) => acc + count(cache, stone, 25), 0);
}

export function partTwo(stones: number[]): number {
  const cache = new Map<string, number>();
  return stones.reduce((acc, stone) => acc + count(cache, stone, 75), 0);
}

function count(
  cache: Map<string, number>,
  stone: number,
  steps: number
): number {
  if (!steps) return 1;
  if (cache.has(`${stone}-${steps}`)) return cache.get(`${stone}-${steps}`)!;

  const result = _count(cache, stone, steps);
  cache.set(`${stone}-${steps}`, result);
  return result;
}

function _count(
  cache: Map<string, number>,
  stone: number,
  steps: number
): number {
  if (stone === 0) return count(cache, 1, steps - 1);

  if (String(stone).length % 2 === 0) {
    const a = String(stone).slice(0, String(stone).length / 2);
    const b = String(stone).slice(String(stone).length / 2);

    return (
      count(cache, Number(a), steps - 1) + count(cache, Number(b), steps - 1)
    );
  }

  return count(cache, stone * 2024, steps - 1);
}

Deno.test("Test One", () => {
  assertEquals(partOne(test), 55312);
});

Deno.test("Part One", () => {
  console.log(partOne(input));
});

Deno.test("Part Two", () => {
  console.log(partTwo(input));
});
