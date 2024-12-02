import { assertEquals } from "jsr:@std/assert";
import input from "./input.ts";
import test from "./test.ts";

function isReportSafe(report: number[]): boolean {
  if (report.length < 2) return true;
  const increasing = report[0] < report[1];

  for (let i = 0; i < report.length - 1; i++) {
    if (increasing && report[i] > report[i + 1]) return false;
    if (!increasing && report[i] < report[i + 1]) return false;

    const difference = Math.abs(report[i] - report[i + 1]);

    if (difference < 1 || difference > 3) return false;
  }

  return true;
}

export function partOne(input: number[][]): number {
  return input.filter(isReportSafe).length;
}

export function partTwo(input: number[][]): number {
  return input.filter((report) => {
    for (let i = 0; i < report.length; i++) {
      const arr = [...report];
      arr.splice(i, 1);

      if (isReportSafe(arr)) return true;
    }
    return false;
  }).length;
}

Deno.test("Test One", () => {
  assertEquals(partOne(test), 2);
});

Deno.test("Part One", () => {
  console.log(partOne(input));
});

Deno.test("Test Two", () => {
  assertEquals(partTwo(test), 4);
});

Deno.test("Part Two", () => {
  console.log(partTwo(input));
});
