import { assertEquals } from "jsr:@std/assert";
import input from "./input.ts";
import test from "./test.ts";

export function partOne(map: number[]): number {
  const disk: (number | null)[] = [];

  for (const [i, size] of map.entries()) {
    const isFile = i % 2 === 0;
    const fileIndex = i / 2;

    disk.push(...Array(size).fill(isFile ? fileIndex : null));
  }

  for (let i = disk.length - 1; i >= 0; i--) {
    if (disk[i] === null) continue;

    const blockToInsert = disk.findIndex((block) => block === null);

    if (blockToInsert >= i) {
      break;
    }

    if (blockToInsert !== -1) {
      disk[blockToInsert] = disk[i];
      disk[i] = null;
    }
  }

  return disk.reduce<number>(
    (acc, block, i) => (block !== null ? acc + block * i : acc),
    0
  );
}

export function partTwo(map: number[]): number {
  const disk: [number, number | null][] = [];

  for (const [i, size] of map.entries()) {
    disk.push([size, i % 2 === 0 ? i / 2 : null]);
  }

  for (let i = disk.length - 1; i >= 0; i--) {
    if (disk[i][1] === null) continue;

    const blockToInsert = disk.findIndex(
      (block) => block[1] === null && block[0] >= disk[i][0]
    );

    if (blockToInsert >= i) {
      continue;
    }

    if (blockToInsert !== -1) {
      if (disk[blockToInsert][0] > disk[i][0]) {
        disk.splice(blockToInsert + 1, 0, [
          disk[blockToInsert][0] - disk[i][0],
          null,
        ]);
        i++;
      }

      disk[blockToInsert] = disk[i];
      disk[i] = [disk[i][0], null];
    }
  }

  let blockIndex = 0;

  return disk.reduce<number>((acc, [size, fileNumber]) => {
    if (fileNumber === null) {
      blockIndex += size;
      return acc;
    }

    for (let j = 0; j < size; j++) {
      acc += (blockIndex + j) * fileNumber;
    }

    blockIndex += size;
    return acc;
  }, 0);
}

Deno.test("Test One", () => {
  assertEquals(partOne(test), 1928);
});

Deno.test("Part One", () => {
  console.log(partOne(input));
});

Deno.test("Test Two", () => {
  assertEquals(partTwo(test), 2858);
});

Deno.test("Part Two", () => {
  console.log(partTwo(input));
});
