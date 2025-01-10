import { create } from "zustand";

interface UserState {
  userEmail: string;
  userName: string;
  userPhone: string;
  userRole: "MOVER" | "USER" | null;
  isOAuth: boolean;
  setUserData: (data: {
    email: string;
    name: string;
    phoneNumber: string;
    role: "MOVER" | "USER" | null;
    isOAuth: boolean;
  }) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userEmail: "",
  userName: "",
  userPhone: "",
  userRole: null,
  isOAuth: false,
  setUserData: (data) =>
    set({
      userEmail: data.email,
      userName: data.name,
      userPhone: data.phoneNumber,
      userRole: data.role,
      isOAuth: data.isOAuth,
    }),
}));
