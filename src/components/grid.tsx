"use client";

import algorithms from "@/lib/algorithms";
import { E, MAX_COLS, MAX_ROWS, N, S, W } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { GridType } from "@/type";
import { useEffect, useRef, useState } from "react";

interface GridPropType {
  isPaused: boolean;
}

export function Grid({ isPaused }: GridPropType) {
  const [grid, setGrid] = useState<GridType>(() => {
    const grid: GridType = [];
    for (let y = 0; y < MAX_ROWS; ++y) {
      const row = [];
      for (let x = 0; x < MAX_COLS; ++x) {
        row.push({
          row: y,
          col: x,
          cell: 0,
        });
      }
      grid.push(row);
    }

    return grid;
  });

  const currentCell = useRef({ row: 0, col: 0 });
  const isPausedRef = useRef(isPaused);
  const requestRef = useRef<number>();
  const nextGridRef = useRef(grid);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  const animateMaze = () => {
    const { newGrid, nextRow, nextCol } = algorithms.binaryTree.importfn()(
      nextGridRef.current,
      currentCell.current.row,
      currentCell.current.col
    );
    setGrid(newGrid);
    nextGridRef.current = newGrid;
    if (nextRow !== -1 && nextCol !== -1) {
      currentCell.current = { row: nextRow, col: nextCol };
      requestRef.current = requestAnimationFrame(animateMaze);
    }
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animateMaze);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <div className={cn("flex flex-col border-sky-300 h-full")}>
      {grid.map((r, rowIndex) => (
        <div key={rowIndex} className="flex w-full h-full">
          {r.map((tile, tileIndex) => {
            return (
              <Tile
                key={tileIndex}
                row={tile.row}
                col={tile.col}
                cell={tile.cell}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export function Tile({
  row,
  col,
  cell,
}: {
  row: number;
  col: number;
  cell: number;
}) {
  const borderStyle =
    row === MAX_ROWS - 1 ? "border-b" : col === 0 ? "border-l" : "";
  const edgeStyle = row === MAX_ROWS - 1 && col === 0 ? "border-l" : "";

  return (
    <div
      className={cn(
        "min-w-[8px] min-h-[8px] border-stone-600 border-t border-r grow",
        borderStyle,
        edgeStyle,
        !(cell & N) ? "" : "border-t-transparent",
        !(cell & S) ? "" : "border-b-transparent",
        !(cell & E) ? "" : "border-r-transparent",
        !(cell & W) ? "" : "border-l-transparent"
      )}
      id={`${row}-${col}`}
    />
  );
}
