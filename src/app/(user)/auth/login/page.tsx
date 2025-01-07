import React from "react";
import LoginComponent from "@/components/auth/LoginComponent";

export default function LoginPage() {
  const styles = {
    container: `flex items-center w-full mt-[57px]
    tablet:w-[327px] tablet:mx-auto tablet:px-0
    pc:w-[640px] pc:mt-[26px]`,
  };
  return (
    <div className={styles.container}>
      <LoginComponent isUser={true} />
    </div>
  );
}
