import { useTimeout } from "@/hooks/use-timeout";
import { Icons } from "@/icons/Icons";
import { useCallback, useEffect, useRef } from "react";
import { ProgressBar } from "../progress-bar/ProgressBar";
import { ToastContent } from "./toast-content/ToastContent";
import { ToastRoot } from "./toast-root/ToastRoot";
import type { ToastVariant } from "./toast-types/toast-types";

const variantIcon: Record<ToastVariant, React.ReactNode> = {
  success: <Icons.NotificationSuccess />,
  error: <Icons.NotificationError />,
  warning: <Icons.NotificationWarning />,
  info: <Icons.NotificationInfo />,
};

interface Toast {
  isOpen: boolean;
  onClose: () => void;
  variant?: ToastVariant;
  title?: string;
  description?: string;
  className?: string;
  selfClosesAfter?: number;
}

export const Toast = ({
  isOpen,
  onClose,
  variant = "warning",
  title = "toast-title",
  description = "toast-description",
  className,
  selfClosesAfter,
}: Toast) => {
  const toastRef = useRef<HTMLDivElement>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      lastFocusedElementRef.current = document.activeElement as HTMLElement;
      toastRef.current?.focus();

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }

    lastFocusedElementRef.current?.focus();
  }, [isOpen, handleKeyDown]);

  const { pause, resume, remaining, isPaused } = useTimeout(
    () => {
      if (isOpen) onClose();
    },
    isOpen && selfClosesAfter ? selfClosesAfter : null,
  );

  return (
    <ToastRoot
      ref={toastRef}
      title={title}
      description={description}
      className={className}
      onPointerEnter={() => (selfClosesAfter ? pause() : {})}
      onPointerLeave={() => (selfClosesAfter ? resume() : {})}
    >
      <ToastContent
        title={title}
        description={description}
        Icon={variantIcon[variant]}
        onClose={onClose}
      />
      {selfClosesAfter && (
        <ProgressBar
          remaining={remaining ?? 0}
          total={selfClosesAfter}
          isPaused={isPaused}
          isReverse
        />
      )}
    </ToastRoot>
  );
};
