import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ToastRoot extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
  description: string;
}

export const ToastRoot = forwardRef<HTMLDivElement, ToastRoot>(
  ({ className, title, description, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title}
        aria-describedby={description}
        className={twMerge(
          "3xl:w-md xs:w-[22.875rem] relative flex w-[21rem] flex-col rounded-sm bg-[var(--gray-100)] text-[var(--gray-500)] shadow-xl focus:outline-1 focus:outline-[var(--blue-dark)]",
          className,
        )}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
      </div>
    );
  },
);
