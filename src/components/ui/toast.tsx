"use client";

import * as React from "react";
import { Transition } from "@headlessui/react";
import { cn } from "@/lib/utils";

type ToastVariant = "default" | "destructive";

interface ToastContextValue {
  toasts: ToastData[];
  addToast: (toast: Omit<ToastData, "id">) => void;
  removeToast: (id: string) => void;
}

interface ToastData {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  action?: React.ReactNode;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export const useToastContext = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("Toast components must be used within a ToastProvider");
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
}

const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = React.useState<ToastData[]>([]);

  const addToast = React.useCallback((toast: Omit<ToastData, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

interface ToastViewportProps {
  className?: string;
}

const ToastViewport: React.FC<ToastViewportProps> = ({ className }) => {
  const { toasts } = useToastContext();

  return (
    <div
      className={cn(
        "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
        className
      )}
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
};

interface ToastProps extends ToastData {
  className?: string;
}

const Toast: React.FC<ToastProps> = ({
  id,
  title,
  description,
  variant = "default",
  action,
  className,
}) => {
  const { removeToast } = useToastContext();

  const variantClasses = {
    default: "border bg-background text-foreground",
    destructive: "border-destructive bg-destructive text-destructive-foreground",
  };

  return (
    <Transition
      appear
      show={true}
      enter="transition-all duration-300"
      enterFrom="opacity-0 translate-x-full"
      enterTo="opacity-100 translate-x-0"
      leave="transition-all duration-300"
      leaveFrom="opacity-100 translate-x-0"
      leaveTo="opacity-0 translate-x-full"
    >
      <div
        className={cn(
          "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg",
          variantClasses[variant],
          className
        )}
      >
        <div className="grid gap-1">
          {title && <ToastTitle>{title}</ToastTitle>}
          {description && <ToastDescription>{description}</ToastDescription>}
        </div>
        {action}
        <ToastClose onClick={() => removeToast(id)} />
      </div>
    </Transition>
  );
};

interface ToastTitleProps {
  children: React.ReactNode;
  className?: string;
}

const ToastTitle: React.FC<ToastTitleProps> = ({ children, className }) => (
  <div className={cn("text-sm font-semibold", className)}>{children}</div>
);

interface ToastDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

const ToastDescription: React.FC<ToastDescriptionProps> = ({ children, className }) => (
  <div className={cn("text-sm opacity-90", className)}>{children}</div>
);

interface ToastCloseProps {
  className?: string;
  onClick?: () => void;
}

const ToastClose: React.FC<ToastCloseProps> = ({ className, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity",
      "group-hover:opacity-100 hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2",
      className
    )}
  >
    <span className="material-symbols-rounded text-[16px]">close</span>
  </button>
);

interface ToastActionProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const ToastAction: React.FC<ToastActionProps> = ({ children, className, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium",
      "ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      className
    )}
  >
    {children}
  </button>
);

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
