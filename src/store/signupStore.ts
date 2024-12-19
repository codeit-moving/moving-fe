import { create } from "zustand";

interface SignUpState {
  userEmail: string;
  userPassword: string;
  userName: string;
  userPhone: string;
  setUserData: (data: {
    email: string;
    password: string;
    name: string;
    phoneNumber: string;
  }) => void;
}

export const useSignUpStore = create<SignUpState>((set) => ({
  userEmail: "",
  userPassword: "",
  userName: "",
  userPhone: "",
  setUserData: (data) =>
    set({
      userEmail: data.email,
      userPassword: data.password,
      userName: data.name,
      userPhone: data.phoneNumber,
    }),
}));
