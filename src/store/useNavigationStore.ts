import { create } from "zustand";

interface NavigationState {
  isClientNavigating: boolean;
  startNavigation: () => void;
  endNavigation: () => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  isClientNavigating: false,
  startNavigation: () => set({ isClientNavigating: true }),
  endNavigation: () => set({ isClientNavigating: false }),
}));
