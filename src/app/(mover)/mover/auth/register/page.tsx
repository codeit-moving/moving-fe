import React from "react";
import SignUpComponent from "@/components/auth/SignUpComponent";

export default function SignUpPage() {
  const styles = {
    container: `flex items-center w-full h-full mt-[57px] mb-[100px]
    tablet:w-[327px] mx-auto px-0
    pc:w-[640px] pc:mt-[26px]`,
  };
  return (
    <div className={styles.container}>
      <SignUpComponent isUser={false} />
    </div>
  );
}
