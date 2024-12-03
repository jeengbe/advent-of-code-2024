import { assertEquals } from "jsr:@std/assert";
import test2 from "./test-2.ts";
import test from "./test.ts";
const input = Deno.readTextFileSync("src/days/3/input.ts");

export function partOne(input: string): number {
  const matches = input.matchAll(/mul\((?<a>\d{1,3}),(?<b>\d{1,3})\)/g);

  return Array.from(matches).reduce((acc, match) => {
    const a = Number(match.groups!.a);
    const b = Number(match.groups!.b);
    return acc + a * b;
  }, 0);
}

export function partTwo(input: string): number {
  const matches = input.matchAll(
    /(?:mul\((?<a>\d{1,3}),(?<b>\d{1,3})\))|(?:do(?:n't)?\(\))/g
  );

  let enabled = true;

  return Array.from(matches).reduce((acc, match) => {
    if (match[0] === "do()") {
      enabled = true;
      return acc;
    }
    if (match[0] === "don't()") {
      enabled = false;
      return acc;
    }

    if (!enabled) return acc;

    const a = Number(match.groups!.a);
    const b = Number(match.groups!.b);
    return acc + a * b;
  }, 0);
}

Deno.test("Test One", () => {
  assertEquals(partOne(test), 161);
});

Deno.test("Part One", () => {
  console.log(partOne(input));
});

Deno.test("Test Two", () => {
  assertEquals(partTwo(test2), 48);
});

Deno.test("Part Two", () => {
  console.log(partTwo(input));
});
