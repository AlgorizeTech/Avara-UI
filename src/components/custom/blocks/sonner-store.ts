"use client";

export type ToastType = "default" | "success" | "error" | "info";

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastProps {
  id: string;
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
  action?: ToastAction;
}

export type ToastOptions = Omit<ToastProps, "id" | "title">;

class ToastObserver {
  private toasts: ToastProps[] = [];
  private listeners: Set<(toasts: ToastProps[]) => void> = new Set();

  subscribe(listener: (toasts: ToastProps[]) => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener([...this.toasts]));
  }

  add(title: string, options?: ToastOptions) {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastProps = { id, title, duration: 4000, ...options };

    // Add to front of array
    this.toasts = [newToast, ...this.toasts].slice(0, 5); // Max 5 in stack
    this.notify();

    if (newToast.duration !== Infinity) {
      setTimeout(() => this.dismiss(id), newToast.duration);
    }
    return id;
  }

  dismiss(id: string) {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.notify();
  }

  clear() {
    this.toasts = [];
    this.notify();
  }
}

export const toastState = new ToastObserver();

export const toast = Object.assign(
  (title: string, options?: ToastOptions) => toastState.add(title, options),
  {
    success: (title: string, options?: ToastOptions) =>
      toastState.add(title, { ...options, type: "success" as const }),
    error: (title: string, options?: ToastOptions) =>
      toastState.add(title, { ...options, type: "error" as const }),
    info: (title: string, options?: ToastOptions) =>
      toastState.add(title, { ...options, type: "info" as const }),
    dismiss: (id: string) => toastState.dismiss(id),
    clear: () => toastState.clear(),
  },
);
