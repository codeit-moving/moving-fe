import React from "react";
import Image from "next/image";
import assets from "@/variables/images";
import { cva, type VariantProps } from "class-variance-authority";
import cn from "@/config/clsx";
import Link from "next/link";

// 버튼 스타일 정의
const buttonVariants = cva(
  // 기본 클래스
  "button text-lg font-semibold px-6 py-4",
  {
    variants: {
      variant: {
        primary: "bg-pr-blue-300 text-gray-50 hover:bg-pr-blue-200",
        outlined:
          "bg-transparent text-pr-blue-300 border-[1px] border-pr-blue-300 hover:bg-pr-blue-50",
        gray: "bg-transparent text-grayscale-300 border-[1px] border-grayscale-200 hover:bg-pr-blue-50",
      },
      disabled: {
        true: "cursor-not-allowed",
        false: "",
      },
      withIcon: {
        true: "flex items-center justify-center",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "primary",
        disabled: true,
        className: "bg-gray-100 text-gray-50 hover:bg-gray-100",
      },
      {
        variant: "outlined",
        disabled: true,
        className: "text-gray-100 border-gray-100 hover:bg-transparent",
      },
    ],
    defaultVariants: {
      variant: "primary",
      disabled: false,
      withIcon: false,
    },
  }
);

type ButtonVariantProps = Omit<VariantProps<typeof buttonVariants>, "disabled">;

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariantProps {
  width?: string | number;
  height?: string | number;
  radius?: string | number;
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
 * <Button variant="gray">Outlined Gray Button</Button>;
 *
 *
 * // 아이콘이 있는 버튼
 * <Button variant="primary" withIcon>Write Post</Button>
 * <Button variant="outlined" withIcon>New Draft</Button>
 * <Button variant="gray" withIcon> 기본 정보 수정</Button>
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

const Button = ({
  className = "",
  onClick,
  width = "auto",
  height = "auto",
  radius = "16px",
  children,
  disabled = false,
  variant = "primary",
  type = "button",
  withIcon = false,
  href,
  ...rest
}: ButtonProps): JSX.Element => {
  const formatDimension = (value: string | number) => {
    if (typeof value === "number") return `${value}px`;
    if (typeof value === "string" && !isNaN(Number(value))) return `${value}px`;
    return value;
  };

  const getStyles = () => {
    const styles: React.CSSProperties = {
      borderRadius: formatDimension(radius),
    };

    if (width !== "auto") {
      styles.width = formatDimension(width);
    }

    if (height !== "auto") {
      styles.height = formatDimension(height);
    }

    return styles;
  };

  const renderIcon = () => {
    if (!withIcon) return null;
    const icon =
      variant === "gray" ? assets.icons.writingGray : assets.icons.writing;
    return (
      <Image
        src={icon}
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
          className={cn(
            buttonVariants({
              variant,
              disabled,
              withIcon,
            }),
            className
          )}
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
      className={cn(
        buttonVariants({
          variant,
          disabled,
          withIcon,
        }),
        className
      )}
      {...rest}
    >
      {children}
      {renderIcon()}
    </button>
  );
};

export default Button;
