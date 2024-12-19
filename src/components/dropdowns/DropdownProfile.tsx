"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";

import {
  Dropdown,
  DropdownList,
  DropdownItem,
  ProfileImage,
  DropdownUserName,
} from "../common/Dropdown";
import { logout } from "@/api/auth";

import { PROFILE_CUSTOMER, PROFILE_MOVER } from "@/variables/dropdown";

type DropdownProfileProps = {
  onSelect?: (href: string) => void;
  isMover?: boolean;
  profileImageUrl?: string;
  name?: string;
  disabled?: boolean;
};

export default function DropdownProfile({
  onSelect,
  isMover = false,
  profileImageUrl,
  name,
  disabled = false,
}: DropdownProfileProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownStyles = {
    base: "relative flex flex-row gap-4 items-center justify-between rounded-full cursor-pointer",
    able: "",
    open: "",
    disabled: "cursor-not-allowed",
  };

  const dropdownTriggerClass = clsx(dropdownStyles.base, {
    [dropdownStyles.able]: !disabled,
    [dropdownStyles.open]: isOpen,
    [dropdownStyles.disabled]: disabled,
  });

  const dropdownListClass = clsx(
    "absolute flex flex-col items-center \
    p-1.5 pt-2.5 top-[37px] right-0 w-[152px] \
    border-solid border-[1px] border-line-100 rounded-2xl \
    bg-white \
    tablet:top-[39px] \
    pc:top-[54px] pc:w-[248px]"
  );

  const dropdownItemClass = clsx(
    "box-border flex flex-col items-left \
    px-3 py-2 \
    w-full h-10 \
    text-md text-black-400 font-medium no-wrap\
    hover:bg-pr-blue-50 \
    cursor-pointer \
    pc:px-6 pc:py-3.5 pc:h-[54px] pc:text-lg"
  );

  const nameClass = clsx(
    "flex flex-row justify-left items-center",
    "pl-3 w-full h-[54px]",
    "text-2lg text-black-300 font-bold",
    "pc:pl-6"
  );

  const signOutClass = clsx(
    "flex flex-row justify-center items-center",
    "w-full h-[46px]",
    "border-solid border-t-[1px] border-t-line-100",
    "text-md text-grayscale-500 font-medium",
    "cursor-pointer"
  );

  const handleSignOutClick = async () => {
    await logout();
    setIsOpen(false);
    window.location.href = "/";
  };

  const customerItemsWithDivider = [
    <div key={"customer label"} className={nameClass}>{`${name} 고객님`}</div>,
    ...PROFILE_CUSTOMER.map((item, index) => (
      <Link href={item.link}>
        <DropdownItem
          key={index}
          className={dropdownItemClass}
          onClick={() => setIsOpen(false)}
        >
          {item.text}
        </DropdownItem>
      </Link>
    )),
    <div key={"sign-out"} className={signOutClass} onClick={handleSignOutClick}>
      로그아웃
    </div>,
  ];

  const moverItemsWithDivider = [
    <div key={"mover label"} className={nameClass}>{`${name} 기사님`}</div>,
    ...PROFILE_MOVER.map((item, index) => (
      <Link href={item.link}>
        <DropdownItem
          key={index}
          className={dropdownItemClass}
          onClick={() => setIsOpen(false)}
        >
          {item.text}
        </DropdownItem>
      </Link>
    )),
    <div key={"sign-out"} className={signOutClass} onClick={handleSignOutClick}>
      로그아웃
    </div>,
  ];

  return (
    <Dropdown
      trigger={
        <div className={dropdownTriggerClass}>
          <ProfileImage imageUrl={profileImageUrl} />
          <DropdownUserName name={name} />
        </div>
      }
      isOpen={isOpen}
      onToggle={() => setIsOpen((prev) => !prev)}
    >
      <DropdownList
        className={dropdownListClass}
        items={isMover ? moverItemsWithDivider : customerItemsWithDivider}
      />
    </Dropdown>
  );
}
