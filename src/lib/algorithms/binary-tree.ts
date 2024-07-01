import { AlgorithmType, GeneratorFunctionType, GridType } from "@/type";
import { DX, DY, MAX_COLS, MAX_ROWS, N, OPPOSITE, W } from "../constants";
import { slugify } from "../utils";

export const binaryTree: AlgorithmType = {
  name: "Binary Tree",
  importfn: () => binaryTreeGenerator,
  slug: slugify("Binary Tree"),
};

const binaryTreeGenerator: GeneratorFunctionType = (grid, row, col) => {
  const newGrid: GridType = JSON.parse(JSON.stringify(grid));
  const dirs = [];
  if (row > 0) dirs.push(N);
  if (col > 0) dirs.push(W);

  const dir = dirs[Math.floor(Math.random() * dirs.length)];
  if (dir) {
    const nx = col + DX[dir];
    const ny = row + DY[dir];
    newGrid[row][col].cell |= dir;
    newGrid[ny][nx].cell |= OPPOSITE[dir];
  }

  let nextRow = row,
    nextCol = col;
  if (col < MAX_COLS - 1) {
    nextCol = col + 1;
  } else if (row < MAX_ROWS - 1) {
    nextRow = row + 1;
    nextCol = 0;
  } else {
    return { newGrid, nextRow: -1, nextCol: -1 };
  }

  return { newGrid: grid, nextRow, nextCol };
};
