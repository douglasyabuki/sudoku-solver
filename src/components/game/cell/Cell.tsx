import type { Cell as CellContent } from "@/types/types";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";

interface Cell extends CellContent {
  className?: string;
  onChange: (newValue: number) => void;
}

export const Cell = ({ className, value, onChange, isFixed, error }: Cell) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <input
      ref={inputRef}
      onFocus={(e) => e.target.select()}
      className={twMerge(
        "flex size-8 items-center justify-center bg-white text-center text-gray-600 ring-1 ring-black/20 duration-150 outline-none ring-inset focus:ring-2 focus:ring-[var(--blue-secondary)] md:size-10 lg:size-12",
        isFixed && "font-bold text-black",
        error && "text-red-800",
        className,
      )}
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;

        if (/^[0-9]?$/.test(input)) {
          onChange(+input);
          if (inputRef.current) {
            inputRef.current.blur();
          }
        }
      }}
      value={value || ""}
    />
  );
};
