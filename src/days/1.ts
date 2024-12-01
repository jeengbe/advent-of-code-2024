import { assertEquals } from "jsr:@std/assert";
import input from "./input.ts";
import test from "./test.ts";

function splitList(input: readonly string[]): [number[], number[]] {
  return input.reduce<[number[], number[]]>(
    (acc, line) => {
      const [leftText, rightText] = line.split("   ");

      return [
        [...acc[0], Number(leftText)],
        [...acc[1], Number(rightText)],
      ];
    },
    [[], []]
  );
}

export function partOne(input: readonly string[]): number {
  const [left, right] = splitList(input);

  const sortedLeft = left.toSorted();
  const sortedRight = right.toSorted();

  return sortedLeft.reduce((acc, leftValue, index) => {
    const rightValue = sortedRight[index];

    return acc + Math.abs(leftValue - rightValue);
  }, 0);
}

export function partTwo(input: readonly string[]): number {
  const [left, right] = splitList(input);

  return left.reduce((acc, value) => {
    return (
      acc + value * right.filter((rightValue) => rightValue === value).length
    );
  }, 0);
}

Deno.test("Test One", () => {
  assertEquals(partOne(test), 11);
});

Deno.test("Part One", () => {
  console.log(partOne(input));
});

Deno.test("Test Two", () => {
  assertEquals(partTwo(test), 31);
});

Deno.test("Part Two", () => {
  console.log(partTwo(input));
});
