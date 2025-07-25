import { twMerge } from "tailwind-merge";

interface ProgressBar {
  className?: string;
  remaining: number;
  total: number;
  isPaused: boolean;
  isReverse?: boolean;
}

export const ProgressBar = ({
  className,
  remaining,
  total,
  isPaused,
  isReverse,
}: ProgressBar) => {
  const progress = isReverse
    ? Math.max(0, Math.min(1, remaining / total)) * 100
    : Math.max(0, Math.min(1, (total - remaining) / total)) * 100;

  return (
    <div
      className={twMerge(
        "h-1 w-full rounded-b-md border-none bg-[var(--gray-400)] ring-[0.5px] ring-[var(--gray-500)] ring-inset",
        className,
      )}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
    >
      <div
        className={twMerge(
          "box-border h-full animate-pulse border-r-[1px] border-[var(--blue-primary)] bg-slate-700 transition-all duration-100 ease-linear",
          isPaused && "animate-none",
        )}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
