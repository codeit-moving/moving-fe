import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ButtonProps {
  onClick?: () => void;
  width?: string | number;
  height?: string | number;
  radius?: string | number;
  children: React.ReactNode;
  disabled?: boolean;
  variant?: "primary" | "outlined";
  type?: "button" | "submit" | "reset";
  className?: string;
  withIcon?: boolean;
  href?: string;
}

/**
 * 범용적으로 사용할 수 있는 Button 컴포넌트
 *
 * @example
 * // 기본 사용법
 * <Button onClick={() => console.log('clicked')}>Click me</Button>
 *
 * // variant 설정
 * <Button variant="primary">Primary Button</Button>
 * <Button variant="outlined">Outlined Button</Button>
 *
 * // 아이콘이 있는 버튼
 * <Button variant="primary" withIcon>Write Post</Button>
 * <Button variant="outlined" withIcon>New Draft</Button>
 *
 * // 크기 커스터마이징
 * <Button width="200px" height="50px">Custom Size</Button>
 *
 * // 비활성화
 * <Button disabled>Disabled Button</Button>
 *
 * @param {Function} onClick - 클릭 이벤트 핸들러
 * @param {string|number} [width] - 버튼의 너비 (px, rem, % 등 단위 포함)
 * @param {string|number} [height] - 버튼의 높이 (px, rem, % 등 단위 포함)
 * @param {string|number} [radius] - 버튼의 모서리 둥글기 (기본값: 16px)
 * @param {React.ReactNode} children - 버튼 내부 콘텐츠
 * @param {boolean} [disabled] - 버튼 비활성화 여부
 * @param {'primary'|'outlined'} [variant] - 버튼 스타일 변형
 * @param {'button'|'submit'|'reset'} [type] - 버튼의 HTML type 속성
 * @param {string} [className] - 추가 스타일링을 위한 클래스명
 * @param {boolean} [withIcon] - 우측에 아이콘 표시 여부
 */
const Button = ({ ...props }: ButtonProps): JSX.Element => {
  const {
    onClick,
    width = "auto",
    height = "auto",
    radius = "16px",
    children,
    disabled = false,
    variant = "primary",
    type = "button",
    className = "",
    withIcon = false,
    href,
  } = props;

  const formatDimension = (value: string | number) => {
    if (typeof value === "number") return `${value}px`;
    if (typeof value === "string" && !isNaN(Number(value))) return `${value}px`;
    return value;
  };

  const variantClasses = {
    primary: {
      default: `bg-pr-blue-300 text-gray-50 text-lg font-semibold p-4 hover:bg-pr-blue-200`,
      disabled: "bg-gray-100 text-gray-50 cursor-not-allowed",
    },
    outlined: {
      default:
        "bg-transparent text-pr-blue-300 text-left border border-solid border-pr-blue-300 hover:bg-pr-blue-50",
      disabled:
        "bg-transparent text-left text-gray-100 border border-solid border-gray-100 cursor-not-allowed",
    },
  };

  const getStyles = () => ({
    width: formatDimension(width),
    height: formatDimension(height),
    borderRadius: formatDimension(radius),
  });

  const getClassNames = () => {
    const baseClasses = "button text-lg font-semibold px-6 py-4";
    const layoutClasses = withIcon ? "flex items-center justify-center" : "";
    const variantClass =
      variantClasses[variant][disabled ? "disabled" : "default"];

    return [baseClasses, layoutClasses, variantClass, className]
      .filter(Boolean)
      .join(" ");
  };

  const renderIcon = () => {
    if (!withIcon) return null;

    return (
      <Image
        src="/icons/ic_writing.svg"
        alt="writing icon"
        width={24}
        height={24}
        className="ml-1"
      />
    );
  };

  if (href) {
    return (
      <Link href={href}>
        <div
          style={getStyles()}
          className={getClassNames()}
          aria-disabled={disabled}
        >
          {children}
          {renderIcon()}
        </div>
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      style={getStyles()}
      className={getClassNames()}
    >
      {children}
      {renderIcon()}
    </button>
  );
};

export default Button;

/**TODO
 * 1. 전역 폰트 설정
 */
