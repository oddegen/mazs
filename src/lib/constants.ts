export const MAX_ROWS = 9;
export const MAX_COLS = 16;

export const N = 1,
  S = 2,
  E = 4,
  W = 8;
export const DX = { [E]: 1, [W]: -1, [N]: 0, [S]: 0 };
export const DY = { [E]: 0, [W]: 0, [N]: -1, [S]: 1 };
export const OPPOSITE = { [E]: W, [W]: E, [N]: S, [S]: N };
