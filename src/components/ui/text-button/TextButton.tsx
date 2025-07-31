import { twMerge } from "tailwind-merge";

interface TextButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

export const TextButton = ({ className, children, ...props }: TextButton) => {
  return (
    <button
      className={twMerge(
        "flex items-center gap-2 rounded-full border-[2px] border-dashed border-transparent text-sm text-white opacity-80 duration-150 active:border-solid enabled:cursor-pointer enabled:hover:border-[var(--slate-primary)] enabled:hover:opacity-100 disabled:opacity-60 md:text-base",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
