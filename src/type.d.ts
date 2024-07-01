export type TileType = {
  row: number;
  col: number;
  cell: number;
  parent?: TileType | null;
};

export type GridType = TileType[][];

type GeneratorFunctionType = (
  grid: GridType,
  row: number,
  col: number
) => { newGrid: GridType; nextRow: number; nextCol: number };

export type AlgorithmType = {
  name: string;
  slug: string;
  importfn: () => GeneratorFunctionType;
};
