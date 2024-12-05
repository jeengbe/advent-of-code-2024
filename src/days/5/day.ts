import { assertEquals } from "jsr:@std/assert";
import * as input from "./input.ts";
import * as test from "./test.ts";

function isUpdateValid(orders: number[][], update: number[]): boolean {
  const indices = new Map(update.map((page, index) => [page, index]));

  return orders.every((order) => {
    const [a, b] = order;
    const aIndex = indices.get(a);
    const bIndex = indices.get(b);

    if (aIndex === undefined || bIndex === undefined) {
      return true;
    }

    return aIndex < bIndex;
  });
}

export function partOne({
  orders,
  updates,
}: {
  orders: number[][];
  updates: number[][];
}): number {
  const validUpdates = updates.filter((update) =>
    isUpdateValid(orders, update)
  );

  return validUpdates.reduce(
    (acc, update) => acc + update[(update.length - 1) / 2],
    0
  );
}

export function partTwo({
  orders,
  updates,
}: {
  orders: number[][];
  updates: number[][];
}): number {
  const invalidUpdates = updates.filter(
    (update) => !isUpdateValid(orders, update)
  );

  const fixedUpdates = invalidUpdates.map((update) => {
    return update.toSorted((a, b) => {
      const order = orders.find(
        ([x, y]) => (x === a && y === b) || (x === b && y === a)
      );

      if (!order) {
        return 0;
      }

      return order[0] === a ? -1 : 1;
    });
  });

  return fixedUpdates.reduce(
    (acc, update) => acc + update[(update.length - 1) / 2],
    0
  );
}

Deno.test("Test One", () => {
  assertEquals(partOne(test), 143);
});

Deno.test("Part One", () => {
  console.log(partOne(input));
});

Deno.test("Test Two", () => {
  assertEquals(partTwo(test), 123);
});

Deno.test("Part Two", () => {
  console.log(partTwo(input));
});
