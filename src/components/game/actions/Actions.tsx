import { Button } from "@/components/ui/button/Button";
import type { SolutionStatus } from "@/types/types";
import { twMerge } from "tailwind-merge";

interface Actions {
  isValidPuzzle: boolean;
  isClearDisabled: boolean;
  solutionStatus: SolutionStatus;
  onClear: () => void;
  onPuzzleValidate: () => void;
  onPuzzleSolve: () => void;
}
export const Actions = ({
  isValidPuzzle,
  isClearDisabled,
  solutionStatus,
  onClear,
  onPuzzleValidate,
  onPuzzleSolve,
}: Actions) => {
  return (
    <div className="flex gap-8 md:gap-10 lg:gap-12">
      <Button
        onClick={onClear}
        disabled={isClearDisabled || solutionStatus === "solving"}
      >
        Clear Board
      </Button>
      {isValidPuzzle ? (
        <Button
          onClick={onPuzzleSolve}
          disabled={["solved", "solving"].includes(solutionStatus)}
          className={twMerge(
            ["unsolved", "solving"].includes(solutionStatus) && "border-active",
          )}
        >
          Solve
        </Button>
      ) : (
        <Button onClick={onPuzzleValidate}>Validate Board</Button>
      )}
    </div>
  );
};
