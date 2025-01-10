import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const CheckBoxButton: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  className,
  ...props
}) => {
  const baseClass = "font-semibold rounded-lg transition-colors";

  const variantClasses = {
    primary:
      "bg-pr-blue-300 text-white hover:bg-pr-blue-200 disabled:bg-gray-200",
    secondary:
      "bg-white text-pr-blue-300 border border-pr-blue-300 hover:bg-pr-blue-50",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const buttonClass = clsx(
    baseClass,
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};

export default CheckBoxButton;
