import { TextButton } from "@/components/ui/text-button/TextButton";
import { Icons } from "@/icons/Icons";

interface StepTracker {
  steps: number;
  isStepSolutionToggled: boolean;
  onStepSolutionToggle: () => void;
}

export const StepTracker = ({
  steps,
  isStepSolutionToggled,
  onStepSolutionToggle,
}: StepTracker) => {
  return (
    <div className="relative flex min-h-10 w-[15.5rem] items-center justify-center rounded-full border-[2px] border-[var(--slate-primary)] bg-white/10 px-4 py-1 text-white duration-150 md:min-h-12 md:w-[19rem] lg:w-[23.5rem]">
      <p className="rounded-full text-sm text-white md:text-base">
        Steps: {steps}
      </p>
      <TextButton
        onClick={onStepSolutionToggle}
        className="absolute right-4 p-1"
        title={
          isStepSolutionToggled
            ? "Activate fast solution"
            : "Activate step by step solution"
        }
      >
        {isStepSolutionToggled ? <Icons.Play /> : <Icons.ForwardStep />}
      </TextButton>
    </div>
  );
};
