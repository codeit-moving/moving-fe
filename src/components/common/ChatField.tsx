import React from "react";

interface ChatFieldProps {
  radius?: string | number;
  value?: string | React.ReactNode;
  variant?: "default" | "primary" | "secondary";
  className?: string;
  type?: "custom" | "admin";
}

export default function ChatField({
  radius = "24px",
  value = "",
  variant = "default",
  className = "",
  type = "admin",
}: ChatFieldProps): JSX.Element {
  const variantClasses = {
    default: `
      bg-white text-black-400
      text-md font-medium px-[20px] py-[12px]
      pc:text-2lg pc:px-[40px] pc:py-[20px]
    `,
    primary: `
      bg-pr-blue-300 text-white text-left
      text-md px-[20px] py-[12px]
      pc:text-2lg pc:px-[24px] pc:py-[16px]
    `,
    secondary: `
      bg-pr-blue-100 text-pr-blue-300
      text-md px-[20px] py-[12px]
      pc:text-2lg pc:px-[24px] pc:py-[16px]
    `,
  };

  // 컨테이너 스타일 관련, 상위에서 조정 예정이라 제거함

  const borderRadiusStyles = (type: string) => {
    switch (type) {
      case "custom":
        return {
          borderTopLeftRadius: radius,
          borderTopRightRadius: "0",
          borderBottomRightRadius: radius,
          borderBottomLeftRadius: radius,
        };
      case "admin":
      default:
        return {
          borderTopLeftRadius: "0",
          borderTopRightRadius: radius,
          borderBottomRightRadius: radius,
          borderBottomLeftRadius: radius,
        };
    }
  };

  return (
    <div>
      <div
        style={{
          display: "inline-block",
          boxShadow: "2px 2px 8px 0px #E0E0E033",
          wordBreak: "break-word",
          ...borderRadiusStyles(type),
        }}
        className={`${variantClasses[variant]} ${className}`}
      >
        {value}
      </div>
    </div>
  );
}
