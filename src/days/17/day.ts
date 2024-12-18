import { assert, assertEquals } from "jsr:@std/assert";
import * as input from "./input.ts";
import * as test from "./test.ts";
import * as test2 from "./test2.ts";

export function partOne({ registers, program }: typeof input): string {
  return [...run(program, [...registers])].join(",");
}

export function partTwo({ program }: typeof input): number {
  return _partTwo(0, program, program.toReversed());
}

function _partTwo(result: number, program: number[], expect: number[]): number {
  if (expect.length === 0) {
    return result;
  }

  return Math.min(
    ...new Array(8).fill(0).map((_, i) => {
      const attempt = result * 8 + i;

      if (run(program, [attempt, 0, 0]).next().value !== expect[0]) {
        return Infinity;
      }

      return _partTwo(attempt, program, expect.slice(1));
    })
  );
}

function* run(program: number[], registers: number[]): Generator<number> {
  let inst = 0;

  while (inst < program.length) {
    const operation = program[inst];
    const operand = program[inst + 1];
    assert(operand !== undefined);
    inst += 2;

    switch (operation) {
      case 0:
        registers[0] >>= combo(operand);
        break;
      case 1:
        registers[1] ^= operand;
        break;
      case 2:
        registers[1] = combo(operand) & 7;
        break;
      case 3:
        if (!registers[0]) continue;
        inst = operand;
        break;
      case 4:
        registers[1] ^= registers[2];
        break;
      case 5:
        yield combo(operand) & 7;
        break;
      case 6:
        registers[1] = registers[0] >> combo(operand);
        break;
      case 7:
        registers[2] = registers[0] >> combo(operand);
        break;
    }
  }

  function combo(operand: number): number {
    switch (operand) {
      case 0:
      case 1:
      case 2:
      case 3:
        return operand;
      case 4:
      case 5:
      case 6:
        return registers[operand - 4];
      case 7:
        throw new Error("Unexpected 7 operand");
      default:
        throw new Error("Unexpected operand: " + operand);
    }
  }
}

Deno.test("Test One", () => {
  assertEquals(partOne(test), "4,6,3,5,6,3,5,2,1,0");
});

Deno.test("Part One", () => {
  console.log(partOne(input));
});

Deno.test("Test Two", () => {
  assertEquals(partTwo(test2), 117440);
});

Deno.test("Part Two", () => {
  console.log(partTwo(input));
});
