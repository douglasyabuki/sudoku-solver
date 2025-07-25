import type { Cell as CellType } from "@/types/types";
import { twMerge } from "tailwind-merge";
import { Cell } from "../cell/Cell";

interface Board {
  board: CellType[][];
  onCellChange: (rowId: number, colId: number, newValue: number) => void;
  isSolved: boolean;
}

export const Board = ({ board, onCellChange, isSolved }: Board) => {
  return (
    <div
      className={twMerge(
        "flex flex-col border-[8px] border-slate-500/50",
        isSolved && "border-active",
      )}
    >
      {board.map((row, rowId) => (
        <div
          className={twMerge(
            "flex",
            [2, 5].includes(rowId) && "border-b-[1px] border-b-slate-500/80",
            [3, 6].includes(rowId) && "border-t-[1px] border-t-slate-500/80",
          )}
          key={`row-${rowId}`}
        >
          {row.map(({ value, isFixed, error }, colId) => (
            <Cell
              className={twMerge(
                [2, 5].includes(colId) &&
                  "border-r-[1px] border-r-slate-500/80",
                [3, 6].includes(colId) &&
                  "border-l-[1px] border-l-slate-500/80",
              )}
              onChange={(newValue) => onCellChange(rowId, colId, newValue)}
              value={value}
              isFixed={isFixed}
              error={error}
              key={`cell-r${rowId}-c${colId}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
