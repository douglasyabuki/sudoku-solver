import type { Cell } from "@/types/types";
import { deepClone } from "@/utils/deep-clone";
import { countSolutions, findErrors, getSolution } from "@/utils/sudoku-utils";
import { useState } from "react";
import { useToast } from "../ui/toast/toast-context/ToastContext";
import { Actions } from "./actions/Actions";
import { Board } from "./board/Board";

const initialBoard: Cell[][] = Array(9).fill(
  Array(9).fill({ value: 0, isFixed: false, error: false }),
);

export const Game = () => {
  const [board, setBoard] = useState(initialBoard);
  const [isValidPuzzle, setIsValidPuzzle] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const { pushToast } = useToast();

  return (
    <div className="bg-circle flex h-screen flex-col items-center justify-center gap-6 py-20 md:justify-start md:gap-12 md:py-36">
      <Board
        board={board}
        onCellChange={(rowId: number, colId: number, value: number) => {
          const copy = deepClone(
            board.map((r) => r.map((c) => ({ ...c, error: false }))),
          );
          copy[rowId][colId] = { value, isFixed: value !== 0, error: false };
          const errors = findErrors(
            copy.map((r: Cell[]) => r.map((c: Cell) => c.value)),
          );
          errors.forEach(({ row, col }) => {
            copy[row][col].error = true;
          });
          setBoard(copy);
          setIsValidPuzzle(false);
          setIsSolved(false);
        }}
        isSolved={isSolved}
      />
      <Actions
        isValidPuzzle={isValidPuzzle}
        onClear={() => {
          setBoard(initialBoard);
          setIsValidPuzzle(false);
          setIsSolved(false);
        }}
        isPuzzleSolved={isSolved}
        isClearDisabled={!board.some((r) => r.some(({ value }) => value !== 0))}
        onPuzzleValidate={() => {
          const solutions = countSolutions(
            deepClone(board.map((r) => r.map((c) => c.value))),
          );
          if (solutions >= 1) {
            setIsValidPuzzle(true);
            if (solutions === 1) {
              return pushToast({
                variant: "success",
                title: "Valid puzzle",
                description:
                  "This is a perfectly valid puzzle! Click on Solve Board to check the solution.",
              });
            }
            return pushToast({
              variant: "warning",
              title: "Malformed puzzle",
              description:
                "A well-formed sudoku puzzle should have only one solution.",
            });
          }
          setIsValidPuzzle(false);
          pushToast({
            variant: "error",
            title: "Unsolvable puzzle",
            description: "This puzzle is unsolvable.",
          });
        }}
        onPuzzleSolve={() => {
          const solution = getSolution(
            deepClone(board.map((r) => r.map((c) => c.value))),
          );
          if (solution) {
            const copy = board.map((r, rId) =>
              r.map((c, cId) => ({ ...c, value: solution[rId][cId] })),
            );
            setBoard(copy);
            setIsSolved(true);
            return pushToast({
              variant: "success",
              title: "Success!",
              description: "The puzzle has been solved!",
            });
          }
          setIsSolved(false);
        }}
      />
    </div>
  );
};
