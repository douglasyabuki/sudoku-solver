import type { Cell } from "@/types/types";
import { deepClone } from "@/utils/deep-clone";
import { countSolutions, findErrors } from "@/utils/sudoku-utils";
import { useCallback, useState } from "react";
import { useToast } from "../ui/toast/toast-context/ToastContext";
import { Actions } from "./actions/Actions";
import { Board } from "./board/Board";

const isValidPlacement = (
  board: Cell[][],
  r: number,
  c: number,
  val: number,
): boolean => {
  for (let i = 0; i < 9; i++) {
    if (board[r][i].value === val && i !== c) return false;
    if (board[i][c].value === val && i !== r) return false;
    const boxRow = 3 * Math.floor(r / 3) + Math.floor(i / 3);
    const boxCol = 3 * Math.floor(c / 3) + (i % 3);
    if (board[boxRow][boxCol].value === val && (boxRow !== r || boxCol !== c))
      return false;
  }
  return true;
};

const DELAY = 2; // Delay in milliseconds for the solving animation

const initialBoard: Cell[][] = Array(9).fill(
  Array(9).fill({ value: 0, isFixed: false, error: false }),
);

export const Game = () => {
  const [board, setBoard] = useState(initialBoard);
  const [isValidPuzzle, setIsValidPuzzle] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const [isStepSolutionToggled, setIsStepSolutionToggled] = useState(false);
  const [steps, setSteps] = useState(0);
  const { pushToast } = useToast();

  const handlePuzzleSolve = useCallback(async () => {
    const _board = deepClone(board);
    setSteps(0);

    const solve = async (): Promise<boolean> => {
      if (isStepSolutionToggled)
        await new Promise((resolve) => setTimeout(resolve, DELAY));
      setBoard(() => _board);
      setSteps((prev) => prev + 1);

      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (_board[r][c].value === 0) {
            for (let d = 1; d <= 9; d++) {
              if (isValidPlacement(_board, r, c, d)) {
                _board[r][c].value = d;
                if (await solve()) return true;
                _board[r][c].value = 0;
              }
            }
            return false;
          }
        }
      }
      return true;
    };
    await solve();

    setBoard(_board);
    setIsSolved(true);
  }, [board, isStepSolutionToggled]);

  return (
    <div className="bg-circle flex h-screen flex-col items-center justify-center gap-6 py-20 md:justify-start md:gap-12 md:py-36">
      <p className="rounded-full bg-white/10 px-4 py-1 text-white">
        Step count: {steps}
      </p>

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
          setSteps(0);
          setBoard(initialBoard);
          setIsValidPuzzle(false);
          setIsSolved(false);
        }}
        isStepSolutionToggled={isStepSolutionToggled}
        onStepSolutionToggle={() => setIsStepSolutionToggled((prev) => !prev)}
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
        onPuzzleSolve={handlePuzzleSolve}
      />
    </div>
  );
};
