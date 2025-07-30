import { Button } from "@/components/ui/button/Button";
import { twMerge } from "tailwind-merge";

interface Actions {
  isValidPuzzle: boolean;
  isPuzzleSolved: boolean;
  isClearDisabled: boolean;
  onClear: () => void;
  onPuzzleValidate: () => void;
  onPuzzleSolve: () => void;
}
export const Actions = ({
  isValidPuzzle,
  isPuzzleSolved,
  isClearDisabled,
  onClear,
  onPuzzleValidate,
  onPuzzleSolve,
}: Actions) => {
  return (
    <div className="flex gap-8 md:gap-10 lg:gap-12">
      <Button onClick={onClear} disabled={isClearDisabled}>
        Clear Board
      </Button>
      {isValidPuzzle ? (
        <Button
          onClick={onPuzzleSolve}
          disabled={isPuzzleSolved}
          className={twMerge(!isPuzzleSolved && "border-active")}
        >
          Solve
        </Button>
      ) : (
        <Button onClick={onPuzzleValidate}>Validate Board</Button>
      )}
    </div>
  );
};
