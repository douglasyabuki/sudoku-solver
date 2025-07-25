export interface Coordinates {
  row: number;
  col: number;
}

export interface Cell {
  value: number;
  isFixed: boolean;
  error: boolean;
}
