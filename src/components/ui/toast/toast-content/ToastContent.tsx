import { Icons } from "@/icons/Icons";
import { twMerge } from "tailwind-merge";

interface ToastContent {
  className?: string;
  description?: string;
  title?: string;
  Icon: React.ReactNode;
  onClose: () => void;
}

export const ToastContent = ({
  className,
  description,
  title,
  Icon,
  onClose,
}: ToastContent) => {
  return (
    <span
      className={twMerge(
        "flex h-fit min-h-16 items-center justify-between gap-2 px-4 py-3 text-sm",
        className,
      )}
    >
      <div className="flex items-start justify-center gap-2">
        {Icon}
        <span className="flex flex-col items-start justify-center gap-1">
          <h5 className="text-md font-bold tracking-tight">{title}</h5>
          <p className="line-clamp-2">{description}</p>
        </span>
      </div>
      <button onClick={onClose} className="cursor-pointer">
        <Icons.Close />
      </button>
    </span>
  );
};
