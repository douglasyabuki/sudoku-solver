import type { Coordinates } from "@/types/types";
import { deepClone } from "./deep-clone";

const isValidPlacement = (
  board: number[][],
  r: number,
  c: number,
  val: number,
): boolean => {
  for (let i = 0; i < 9; i++) {
    if (board[r][i] === val && i !== c) return false;
    if (board[i][c] === val && i !== r) return false;
    const boxRow = 3 * Math.floor(r / 3) + Math.floor(i / 3);
    const boxCol = 3 * Math.floor(c / 3) + (i % 3);
    if (board[boxRow][boxCol] === val && (boxRow !== r || boxCol !== c))
      return false;
  }
  return true;
};

const collectDuplicates = <T>(
  counts: Record<number, T[]>,
  add: (entry: T) => void,
) => {
  Object.values(counts).forEach((entries) => {
    if (entries.length > 1) entries.forEach(add);
  });
};

export const findErrors = (board: number[][]): Coordinates[] => {
  const errors: Coordinates[] = [];

  const addError = (r: number, c: number) => {
    if (!errors.some((e) => e.row === r && e.col === c)) {
      errors.push({ row: r, col: c });
    }
  };

  // Check rows and columns
  for (let i = 0; i < 9; i++) {
    const rowCount: Record<number, number[]> = {};
    const colCount: Record<number, number[]> = {};

    for (let j = 0; j < 9; j++) {
      const rowVal = board[i][j];
      const colVal = board[j][i];

      if (rowVal !== 0) (rowCount[rowVal] ||= []).push(j);
      if (colVal !== 0) (colCount[colVal] ||= []).push(j);
    }

    collectDuplicates(rowCount, (col) => addError(i, col));
    collectDuplicates(colCount, (row) => addError(row, i));
  }

  // Check boxes
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const count: Record<number, Coordinates[]> = {};

      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          const row = boxRow * 3 + r;
          const col = boxCol * 3 + c;
          const val = board[row][col];
          if (val !== 0) (count[val] ||= []).push({ row, col });
        }
      }

      collectDuplicates(count, ({ row, col }) => addError(row, col));
    }
  }

  return errors;
};

export const getSolution = (input: number[][]): number[][] | null => {
  const board = deepClone(input);

  const solve = (): boolean => {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === 0) {
          for (let d = 1; d <= 9; d++) {
            if (isValidPlacement(board, r, c, d)) {
              board[r][c] = d;
              if (solve()) return true;
              board[r][c] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  return solve() ? board : null;
};

export const countSolutions = (input: number[][]): 0 | 1 | 2 => {
  let solutions = 0;
  const board = deepClone(input);

  const isBoardValid = (): boolean => {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const val = board[r][c];
        if (val !== 0 && !isValidPlacement(board, r, c, val)) {
          return false;
        }
      }
    }
    return true;
  };

  const solve = (): boolean => {
    if (solutions >= 2) return true;

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === 0) {
          for (let d = 1; d <= 9; d++) {
            if (isValidPlacement(board, r, c, d)) {
              board[r][c] = d;
              if (solve()) return true;
              board[r][c] = 0;
            }
          }
          return false;
        }
      }
    }

    solutions++;
    return solutions >= 2;
  };

  if (!isBoardValid()) return 0;

  solve();
  return solutions as 0 | 1 | 2;
};
