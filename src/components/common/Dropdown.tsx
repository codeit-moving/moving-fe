"use client";

import Image from "next/image";
import React, { useRef, useEffect, useCallback } from "react";
import clsx from "clsx";

import assets from "@/variables/images";

type DropdownFilterProps = {
  children: React.ReactNode | string;
};

export function DropdownFilter({ children }: DropdownFilterProps) {
  const dropdownFilterClass = clsx(
    "text-nowrap text-md pc:text-2lg font-medium"
  );

  return <div className={dropdownFilterClass}>{children}</div>;
}

type DropdownImageProps = {
  isOpen: boolean;
};

export function DropdownImage({ isOpen }: DropdownImageProps) {
  return (
    <div className="relative w-5 h-5 pc:w-9 pc:h-9">
      <Image
        src={isOpen ? assets.icons.chevronDownActive : assets.icons.chevronDown}
        alt="드롭 다운"
        fill
      />
    </div>
  );
}

type ProfileImageProps = {
  imageUrl?: string;
};

export function ProfileImage({
  imageUrl = assets.icons.userProfile,
}: ProfileImageProps) {
  const commonImageFrameClass = clsx(
    "relative w-6 h-6 rounded-full overflow-hidden pc:w-9 pc:h-9"
  );

  return (
    <div className={commonImageFrameClass}>
      <Image src={imageUrl} alt="프로필 드롭 다운" fill />
    </div>
  );
}

type DropdownUserNameProps = {
  name?: string;
};

export function DropdownUserName({ name = "사용자명" }: DropdownUserNameProps) {
  const dropdownUserNameClass = clsx(
    "hidden pc:block text-md text-nowrap pc:text-2lg font-medium"
  );

  return <div className={dropdownUserNameClass}>{name}</div>;
}

type DropdownBellProps = {
  className?: string;
  isEmpty?: boolean;
};

export function DropdownBell({ className, isEmpty }: DropdownBellProps) {
  const commonImageFrameClass = clsx(
    "relative w-6 h-6 pc:w-9 pc:h-9",
    className
  );

  return (
    <div className={commonImageFrameClass}>
      <Image
        src={isEmpty ? assets.icons.alarm : assets.icons.alarmBlue}
        alt="알림 드롭 다운"
        fill
      />
    </div>
  );
}

type SortDropdownImageProps = {
  isOpen: boolean;
};

export function SortDropdownImage({ isOpen }: SortDropdownImageProps) {
  return (
    <div className="relative w-5 h-5">
      <Image
        src={isOpen ? assets.icons.chevronDownActive : assets.icons.chevronDown}
        alt="정렬 드롭 다운"
        fill
      />
    </div>
  );
}

type DropdownSortTriggerProps = {
  curretnSort: string;
};

export function DropdownSortTrigger({ curretnSort }: DropdownSortTriggerProps) {
  const dropdownSortMoverClass = clsx(
    "text-nowrap text-xs pc:text-md font-semibold"
  );

  return <div className={dropdownSortMoverClass}>{curretnSort}</div>;
}

type DropdownItemProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
};

export function DropdownItem({
  children,
  onClick,
  className,
  as: Component = "div",
}: DropdownItemProps) {
  return (
    <Component className={clsx(className)} onClick={onClick}>
      {children}
    </Component>
  );
}

type DropdownListProps = {
  items?: React.ReactNode[];
  className?: string;
};

export function DropdownList({ items, className }: DropdownListProps) {
  return (
    <div className={clsx("z-50", className)}>
      {items &&
        items.map((item, index) => (
          <div key={index} className="w-full">
            {item}
          </div>
        ))}
    </div>
  );
}

type DropdownProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
};

export function Dropdown({
  trigger,
  children,
  isOpen,
  onToggle,
  className,
}: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onToggle();
      }
    },
    [onToggle]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  return (
    <div ref={dropdownRef} className={clsx("relative", className)}>
      <div onClick={onToggle}>{trigger}</div>
      {isOpen && <>{children}</>}
    </div>
  );
}
