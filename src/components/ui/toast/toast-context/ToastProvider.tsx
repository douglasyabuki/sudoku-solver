import { useState } from "react";
import { ToastContainer } from "../toast-container/ToastContainer";
import type { ToastEntry, ToastOptions } from "../toast-types/toast-types";
import { ToastContext } from "./ToastContext";

let toastId = 0;

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);

  const pushToast = (options: ToastOptions) => {
    const id = ++toastId;

    const toast: ToastEntry = { id, ...options, visible: false, mounted: true };
    setToasts((prev) => [...prev, toast]);

    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, visible: true } : t)),
      );
    }, 10);
  };

  const onToastClose = (toastId: number) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === toastId ? { ...t, visible: false } : t)),
    );

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== toastId));
    }, 300);
  };

  return (
    <ToastContext.Provider value={{ toasts, pushToast, onToastClose }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};
