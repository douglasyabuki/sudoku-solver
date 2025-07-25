import { twMerge } from "tailwind-merge";
import { Toast } from "../Toast";
import { useToast } from "../toast-context/ToastContext";

export const ToastContainer = () => {
  const { toasts, onToastClose } = useToast();

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col-reverse gap-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={twMerge(
            "transform transition-all duration-300 ease-in-out",
            toast.visible
              ? "translate-x-0 opacity-100"
              : "translate-x-8 opacity-0",
          )}
        >
          <Toast
            isOpen={true}
            className={toast.className}
            onClose={() => onToastClose(toast.id)}
            variant={toast.variant}
            title={toast.title}
            description={toast.description}
            selfClosesAfter={toast.duration ?? 5000}
          />
        </div>
      ))}
    </div>
  );
};
