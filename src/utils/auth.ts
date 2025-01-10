import { useUserStore } from "@/store/userStore";

export function resetUserStore() {
  const guestUserInfo = {
    userEmail: "",
    userName: "",
    userPhone: "",
    userRole: null,
  };
  useUserStore.setState(guestUserInfo);
}
