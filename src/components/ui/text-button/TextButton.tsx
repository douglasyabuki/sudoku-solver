import { twMerge } from "tailwind-merge";

interface TextButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

export const TextButton = ({ className, children, ...props }: TextButton) => {
  return (
    <button
      className={twMerge(
        "flex items-center gap-2 rounded-full border-[2px] border-dashed border-transparent px-4 py-1 text-sm text-white opacity-80 duration-150 hover:border-[var(--slate-primary)] active:border-solid enabled:hover:opacity-100 md:text-base",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
