export type ToastVariant = "success" | "error" | "warning" | "info";

export interface ToastOptions {
  variant?: ToastVariant;
  title?: string;
  description?: string;
  duration?: number;
  className?: string;
}

export interface ToastEntry extends ToastOptions {
  id: number;
  mounted: boolean;
  visible: boolean;
}
