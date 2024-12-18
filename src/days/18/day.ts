import { assertEquals } from "jsr:@std/assert";
import input from "./input.ts";
import test from "./test.ts";

export function partOne(
  bytes: typeof input,
  take: number,
  w: number,
  h: number
): number {
  const grid: boolean[][] = new Array(h)
    .fill(0)
    .map(() => new Array(w).fill(true));

  for (let i = 0; i < take; i++) {
    const byte = bytes[i];
    grid[byte[1]][byte[0]] = false;
  }

  return shortestPath(grid, [0, 0], [w - 1, h - 1]).length - 1;
}

export function partTwo(
  bytes: typeof input,
  take: number,
  w: number,
  h: number
): string {
  const grid: boolean[][] = new Array(h)
    .fill(0)
    .map(() => new Array(w).fill(true));

  for (let i = 0; i < take; i++) {
    const byte = bytes[i];
    grid[byte[1]][byte[0]] = false;
  }

  let path = new Set(
    shortestPath(grid, [0, 0], [w - 1, h - 1]).map(([y, x]) => `${x},${y}`)
  );

  for (const byte of bytes.slice(take)) {
    const [x, y] = byte;
    grid[y][x] = false;

    if (!path.has(`${x},${y}`)) {
      continue;
    }

    path = new Set(
      shortestPath(grid, [0, 0], [w - 1, h - 1]).map(([y, x]) => `${x},${y}`)
    );
    if (!path.size) {
      return `${x},${y}`;
    }
  }

  return "";
}

function shortestPath(
  grid: boolean[][],
  start: number[],
  end: number[]
): number[][] {
  if (!grid || grid.length === 0 || grid[0].length === 0) return [];
  const [startRow, startCol] = start;
  const [endRow, endCol] = end;
  const rows = grid.length;
  const cols = grid[0].length;

  // Early exit if start or end is not walkable
  if (!grid[startRow][startCol] || !grid[endRow][endCol]) return [];

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const parent: ([number, number] | null)[][] = Array.from(
    { length: rows },
    () => Array(cols).fill(null)
  );

  visited[startRow][startCol] = true;
  const queue: [number, number][] = [[startRow, startCol]];

  while (queue.length > 0) {
    const [r, c] = queue.shift()!;
    if (r === endRow && c === endCol) {
      // Reconstruct path
      const path: [number, number][] = [];
      let cur: [number, number] | null = [r, c];
      while (cur) {
        path.push(cur);
        cur = parent[cur[0]][cur[1]];
      }
      path.reverse();
      return path;
    }

    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;
      if (
        nr >= 0 &&
        nr < rows &&
        nc >= 0 &&
        nc < cols &&
        grid[nr][nc] &&
        !visited[nr][nc]
      ) {
        visited[nr][nc] = true;
        parent[nr][nc] = [r, c];
        queue.push([nr, nc]);
      }
    }
  }

  // No path found
  return [];
}

Deno.test("Test One", () => {
  assertEquals(partOne(test, 12, 7, 7), 22);
});

Deno.test("Part One", () => {
  console.log(partOne(input, 1024, 71, 71));
});

Deno.test("Test Two", () => {
  assertEquals(partTwo(test, 12, 7, 7), "6,1");
});

Deno.test("Part Two", () => {
  assertEquals(partTwo(input, 1024, 71, 71), "8,51");
  console.log(partTwo(input, 1024, 71, 71));
});
