import { assertEquals } from "jsr:@std/assert";
import input from "./input.ts";
import test from "./test.ts";

export function partOne(equations: number[][]): number {
  return run(equations, [(a, b) => a + b, (a, b) => a * b]);
}

export function partTwo(equations: number[][]): number {
  return run(equations, [
    (a, b) => a + b,
    (a, b) => a * b,
    (a, b) => Number(String(a) + String(b)),
  ]);
}

function run(
  equations: number[][],
  operators: ((a: number, b: number) => number)[]
): number {
  return equations
    .filter((equation) => {
      const [result, value, ...operands] = equation;

      return _run(value, operands, operators, result);
    })
    .reduce((acc, curr) => acc + curr[0], 0);
}

function _run(
  value: number,
  operands: number[],
  operators: ((a: number, b: number) => number)[],
  result: number
): boolean {
  if (operands.length === 0) {
    return value === result;
  }

  for (const operator of operators) {
    if (
      _run(operator(value, operands[0]), operands.slice(1), operators, result)
    ) {
      return true;
    }
  }

  return false;
}

Deno.test("Test One", () => {
  assertEquals(partOne(test), 3749);
});

Deno.test("Part One", () => {
  console.log(partOne(input));
});

Deno.test("Test Two", () => {
  assertEquals(partTwo(test), 11387);
});

Deno.test("Part Two", () => {
  console.log(partTwo(input));
});
