import { Icons } from "@/icons/Icons";
import type { Cell, SolutionStatus } from "@/types/types";
import { deepClone } from "@/utils/deep-clone";
import {
  countSolutions,
  findErrors,
  generatePuzzle,
} from "@/utils/sudoku-utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { TextButton } from "../ui/text-button/TextButton";
import { useToast } from "../ui/toast/toast-context/ToastContext";
import { Actions } from "./actions/Actions";
import { Board } from "./board/Board";
import { StepTracker } from "./step-tracker/StepTracker";

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

const DELAY = 2;

const initialBoard: Cell[][] = Array(9).fill(
  Array(9).fill({ value: 0, isFixed: false, error: false }),
);

export const Game = () => {
  const [board, setBoard] = useState(initialBoard);
  const [isValidPuzzle, setIsValidPuzzle] = useState(false);
  const [solutionStatus, setSolutionStatus] =
    useState<SolutionStatus>("unsolved");
  const [isStepSolutionToggled, setIsStepSolutionToggled] = useState(false);
  const [steps, setSteps] = useState(0);
  const { pushToast } = useToast();

  // Ref to hold live toggle state
  const isStepSolutionToggledRef = useRef(isStepSolutionToggled);

  useEffect(() => {
    isStepSolutionToggledRef.current = isStepSolutionToggled;
  }, [isStepSolutionToggled]);

  const handlePuzzleSolve = useCallback(() => {
    const _board = deepClone(board);
    setSteps(0);
    setSolutionStatus("solving");

    const stack: { row: number; col: number; nextDigit: number }[] = [];
    let done = false;

    const findNextEmpty = () => {
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (_board[r][c].value === 0) return { r, c };
        }
      }
      return null;
    };

    const solveStep = () => {
      while (!done) {
        const empty = findNextEmpty();
        if (!empty) {
          done = true;
          setSolutionStatus("solved");
          setBoard(deepClone(_board));
          return;
        }

        const { r, c } = empty;
        let placed = false;

        for (let d = 1; d <= 9; d++) {
          if (isValidPlacement(_board, r, c, d)) {
            _board[r][c].value = d;
            stack.push({ row: r, col: c, nextDigit: d + 1 });
            placed = true;
            break;
          }
        }

        if (!placed) {
          while (stack.length > 0) {
            const { row, col, nextDigit } = stack.pop()!;
            let found = false;
            for (let d = nextDigit; d <= 9; d++) {
              if (isValidPlacement(_board, row, col, d)) {
                _board[row][col].value = d;
                stack.push({ row, col, nextDigit: d + 1 });
                found = true;
                break;
              }
            }

            if (found) break;
            else _board[row][col].value = 0;
          }
        }

        setSteps((prev) => prev + 1);

        if (isStepSolutionToggledRef.current) {
          setBoard(deepClone(_board));
          setTimeout(solveStep, DELAY);
          return;
        }
      }

      setBoard(deepClone(_board));
    };

    solveStep();
  }, [board]);

  return (
    <div className="bg-circle flex h-screen flex-col items-center justify-center gap-12 py-20 md:justify-start xl:py-36">
      <StepTracker
        steps={steps}
        isStepSolutionToggled={isStepSolutionToggled}
        onStepSolutionToggle={() => {
          const _isStepSolutionToggled = !isStepSolutionToggled;
          setIsStepSolutionToggled(_isStepSolutionToggled);
          pushToast({
            variant: "success",
            title: _isStepSolutionToggled ? "Step by step mode" : "Fast mode",
            description: _isStepSolutionToggled
              ? "The puzzle will be solved step by step."
              : "The puzzle will be solved at once.",
          });
        }}
      />

      <div className="relative flex flex-col">
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
            setSolutionStatus("unsolved");
          }}
          solutionStatus={solutionStatus}
        />
        <TextButton
          className="absolute -top-9 -right-0 size-8 p-1 hover:bg-white/10"
          title="Generate random puzzle"
          onClick={() => {
            const newPuzzle = generatePuzzle(25);
            setBoard(
              newPuzzle.map((r) =>
                r.map((value) => ({
                  value,
                  isFixed: value !== 0,
                  error: false,
                })),
              ),
            );
            setIsValidPuzzle(true);
            setSteps(0);
            setSolutionStatus("unsolved");
          }}
          disabled={solutionStatus === "solving"}
        >
          <Icons.Puzzle />
        </TextButton>
      </div>

      <Actions
        isValidPuzzle={isValidPuzzle}
        onClear={() => {
          setSteps(0);
          setBoard(initialBoard);
          setIsValidPuzzle(false);
          setSolutionStatus("unsolved");
        }}
        solutionStatus={solutionStatus}
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
