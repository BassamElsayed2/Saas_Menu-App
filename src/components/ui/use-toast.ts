import toast from "react-hot-toast";

// Re-export react-hot-toast for compatibility
export { toast };

// Simple hook wrapper for react-hot-toast
export const useToast = () => {
  return {
    toast: (message: string) => toast(message),
    success: (message: string) => toast.success(message),
    error: (message: string) => toast.error(message),
    loading: (message: string) => toast.loading(message),
    dismiss: (id?: string) => toast.dismiss(id),
  };
};
