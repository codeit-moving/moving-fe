"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

import {
  Dropdown,
  DropdownList,
  DropdownItem,
  DropdownFilter,
  DropdownImage,
} from "../common/Dropdown";
import { getServiceText } from "@/utils/utilFunctions";

import { SERVICE_CODES, SERVICE_TEXTS } from "@/variables/service";

type DropdownServiceProps = {
  value: number | null;
  onChange: (value: number | null) => void;
  disabled?: boolean;
};

export default function DropdownService({
  value,
  onChange,
  disabled = false,
}: DropdownServiceProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSelectService, setCurrentSelectService] = useState<
    (typeof SERVICE_TEXTS)[keyof typeof SERVICE_TEXTS] | string
  >("서비스");

  const dropdownStyles = {
    base: "relative box-border flex flex-row justify-between items-center \
        pl-3.5 pr-2.5 w-[87px] h-[36px] \
        border-solid border-[1px] border-grayscale-100 rounded-lg \
        bg-transparent shadow-[4px_4px_10px_rgba(238,238,238,0.1)] \
        text-black-400 \
        cursor-pointer \
        pc:w-[328px] pc:h-16 pc:px-6 pc:rounded-2xl",
    able: "shadow-md hover:bg-pr-blue-50",
    open: "border-pr-blue-300 text-pr-blue-300",
    disabled: "cursor-not-allowed",
  };

  const dropdownTriggerClass = clsx(dropdownStyles.base, {
    [dropdownStyles.able]: !disabled,
    [dropdownStyles.open]: isOpen,
    [dropdownStyles.disabled]: disabled,
  });

  const dropdownListClass = clsx(
    "absolute flex flex-col items-center overflow-hidden\
    top-[42px] w-[89px] h-[144px] \
    border-solid border-[1px] border-line-100 rounded-2xl \
    bg-white \
    tablet:top-11 \
    pc:top-[72px] pc:w-[328px] pc:h-[256px]"
  );

  const dropdownItemClass = clsx(
    "box-border flex flex-row items-center \
    px-3.5 \
    w-[89px] h-9 \
    text-md font-medium text-nowrap \
    hover:bg-pr-blue-50 \
    cursor-pointer \
    pc:px-6 pc:w-[328px] pc:h-[64px] pc:text-2lg"
  );

  const handleSelectService = (key: string) => {
    const serrviceCode = SERVICE_CODES[key as keyof typeof SERVICE_CODES];
    onChange?.(serrviceCode);
    setCurrentSelectService(
      getServiceText(SERVICE_CODES[key as keyof typeof SERVICE_CODES])
    );
    setIsOpen(false);
  };

  const keys = Object.keys(SERVICE_CODES);
  const items = keys.map((key) => {
    return {
      label: getServiceText(SERVICE_CODES[key as keyof typeof SERVICE_CODES]),
      onClick: () => handleSelectService(key),
    };
  });

  const handleSetService = (code: number | null) => {
    if (code === null) {
      setCurrentSelectService("서비스");
    } else {
      const regionText = SERVICE_TEXTS[code as keyof typeof SERVICE_TEXTS];
      setCurrentSelectService(regionText);
    }
    onChange?.(code);
  };

  useEffect(() => {
    if (value !== undefined) {
      handleSetService(value);
    }
  }, [value]);

  return (
    <Dropdown
      trigger={
        <div className={dropdownTriggerClass}>
          <DropdownFilter>{currentSelectService}</DropdownFilter>
          <DropdownImage isOpen={isOpen} />
        </div>
      }
      isOpen={isOpen}
      onToggle={() => setIsOpen((prev) => !prev)}
    >
      <DropdownList
        className={dropdownListClass}
        items={items.map((item, index) => (
          <DropdownItem
            key={index}
            className={dropdownItemClass}
            onClick={item.onClick}
          >
            {item.label}
          </DropdownItem>
        ))}
      />
    </Dropdown>
  );
}
