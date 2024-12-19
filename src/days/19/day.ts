import { assertEquals } from "jsr:@std/assert";
import * as input from "./input.ts";
import * as test from "./test.ts";

export function partOne({ patterns, designs }: typeof input): number {
  const cache = new Map<string, boolean>();

  return designs.filter((design) => {
    return canMake(design);
  }).length;

  function canMake(design: string): boolean {
    if (cache.has(design)) {
      return cache.get(design)!;
    }

    const result = _canMake(design);
    cache.set(design, result);
    return result;
  }

  function _canMake(design: string): boolean {
    for (const pattern of patterns) {
      if (design.startsWith(pattern)) {
        const nextDesign = design.slice(pattern.length);
        if (nextDesign === "") {
          return true;
        }

        if (canMake(nextDesign)) {
          return true;
        }
      }
    }

    return false;
  }
}

export function partTwo({ patterns, designs }: typeof input): number {
  const cache = new Map<string, number>();

  return designs.reduce((acc, design) => {
    return acc + count(design);
  }, 0);

  function count(design: string): number {
    if (cache.has(design)) {
      return cache.get(design)!;
    }

    const result = _count(design);
    cache.set(design, result);
    return result;
  }

  function _count(design: string): number {
    return patterns.reduce((acc, pattern) => {
      if (design.startsWith(pattern)) {
        const nextDesign = design.slice(pattern.length);
        if (nextDesign === "") {
          return acc + 1;
        }

        return acc + count(nextDesign);
      }

      return acc;
    }, 0);
  }
}

Deno.test("Test One", () => {
  assertEquals(partOne(test), 6);
});

Deno.test("Part One", () => {
  console.log(partOne(input));
});

Deno.test("Test Two", () => {
  assertEquals(partTwo(test), 16);
});

Deno.test("Part Two", () => {
  console.log(partTwo(input));
});
