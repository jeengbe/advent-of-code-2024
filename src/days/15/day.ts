import { assertEquals } from "jsr:@std/assert";
import * as input from "./input.ts";
import * as test from "./test.ts";

export function partOne({ room, movements }: typeof input): number {
  runRoom(room, movements);

  return room.reduce(
    (acc, cur, y) =>
      acc +
      cur.reduce((acc, cur, x) => acc + (cur === "O" ? 100 * y + x : 0), 0),
    0
  );
}

export function partTwo({ room, movements }: typeof input): number {
  const newRoom = room.map((row) =>
    row.flatMap(
      (tile) =>
        ((
          {
            "#": ["#", "#"],
            O: ["[", "]"],
            ".": [".", "."],
            "@": ["@", "."],
          } as const
        )[tile])
    )
  );

  runRoom(newRoom, movements);

  return newRoom.reduce(
    (acc, cur, y) =>
      acc +
      cur.reduce((acc, cur, x) => acc + (cur === "[" ? 100 * y + x : 0), 0),
    0
  );
}

function runRoom(
  room: ("#" | "O" | "." | "@" | "[" | "]")[][],
  movements: ("^" | "v" | "<" | ">")[]
): void {
  let [rx, ry] = [0, 0];

  for (let y = 0; y < room.length; y++) {
    for (let x = 0; x < room[y].length; x++) {
      if (room[y][x] === "@") {
        [rx, ry] = [x, y];
      }
    }
  }

  for (const movement of movements) {
    const [dx, dy] = {
      "^": [0, -1],
      v: [0, 1],
      "<": [-1, 0],
      ">": [1, 0],
    }[movement];

    if (canMove(rx, ry, dx, dy)) {
      move(rx, ry, dx, dy);
      [rx, ry] = [rx + dx, ry + dy];
    }
  }

  function canMove(x: number, y: number, dx: number, dy: number): boolean {
    switch (room[y + dy][x + dx]) {
      case "#":
        return false;
      case ".":
        return true;
      case "O":
        return canMove(x + dx, y + dy, dx, dy);
      case "[":
        if (dy) {
          assertEquals(dx, 0);
          return canMove(x, y + dy, dx, dy) && canMove(x + 1, y + dy, dx, dy);
        }

        assertEquals(dx, 1);
        assertEquals(dy, 0);
        return canMove(x + 1 + dx, y + dy, dx, dy);

      case "]":
        if (dy) {
          assertEquals(dx, 0);
          return canMove(x, y + dy, dx, dy) && canMove(x - 1, y + dy, dx, dy);
        }

        assertEquals(dx, -1);
        assertEquals(dy, 0);
        return canMove(x - 1 + dx, y + dy, dx, dy);

      default:
        throw new Error("Unknown tile");
    }
  }

  function move(x: number, y: number, dx: number, dy: number): void {
    switch (room[y + dy][x + dx]) {
      case ".":
        room[y + dy][x + dx] = room[y][x];
        room[y][x] = ".";
        break;
      case "O":
        move(x + dx, y + dy, dx, dy);
        room[y + dy][x + dx] = room[y][x];
        room[y][x] = ".";
        break;
      case "[":
        if (dy) {
          assertEquals(dx, 0);

          move(x, y + dy, dx, dy);

          if (room[y + dy][x + 1] === "]") {
            move(x + 1, y + dy, dx, dy);
          }

          room[y + dy][x + dx] = room[y][x];
          room[y][x] = ".";
        } else {
          assertEquals(dx, 1);
          assertEquals(dy, 0);

          move(x + 1 + dx, y + dy, dx, dy);

          room[y + dy][x + 1 + dx] = room[y][x + 1];
          room[y + dy][x + dx] = room[y][x];
          room[y][x] = ".";
        }
        break;
      case "]":
        if (dy) {
          assertEquals(dx, 0);

          move(x, y + dy, dx, dy);

          if (room[y + dy][x - 1] === "[") {
            move(x - 1, y + dy, dx, dy);
          }

          room[y + dy][x + dx] = room[y][x];
          room[y][x] = ".";
        } else {
          assertEquals(dx, -1);
          assertEquals(dy, 0);

          move(x - 1 + dx, y + dy, dx, dy);

          room[y + dy][x - 1 + dx] = room[y][x - 1];
          room[y + dy][x + dx] = room[y][x];
          room[y][x] = ".";
        }

        break;
      default:
        throw new Error("Unknown tile");
    }
  }
}

Deno.test("Test One", () => {
  assertEquals(partOne(test), 10092);
});

Deno.test("Part One", () => {
  console.log(partOne(input));
});

Deno.test("Test Two", () => {
  assertEquals(partTwo(test), 9021);
});

Deno.test("Part Two", () => {
  console.log(partTwo(input));
});
