import { create } from "zustand";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastState {
  message: string | null;
  type: ToastType | null;
  showToast: (message: string, type: ToastType) => void;
  clearToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  message: null,
  type: null,
  showToast: (message, type) => set({ message, type }),
  clearToast: () => set({ message: null, type: null }),
}));
