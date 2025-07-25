import { twMerge } from "tailwind-merge";

interface Button extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

export const Button = ({ className, children, ...props }: Button) => {
  return (
    <button
      className={twMerge(
        "box-border flex w-32 items-center justify-center gap-[0.375rem] rounded-full border-[2px] border-[var(--slate-primary)] px-4 py-2 text-sm text-nowrap text-white transition-all duration-150 enabled:cursor-pointer disabled:opacity-50 md:w-40 md:text-base",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
