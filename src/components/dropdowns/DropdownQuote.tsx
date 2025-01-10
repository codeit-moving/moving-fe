"use client";

import { useState } from "react";
import cn from "@/config/cn";

import {
  Dropdown,
  DropdownList,
  DropdownItem,
  DropdownImage,
  DropdownFilter,
} from "../common/Dropdown";

type DropdownQuoteProps = {
  onSelect: (regionCode: number) => void;
  disabled: boolean;
};

const DROPDOWN_QUOTE_LIST: string[] = ["전체", "확정한 견적서"];
const ALL_QUOTE: number = 0;
const CONFIRMED_QUOTE: number = 1;

export default function DropdownQuote({
  onSelect,
  disabled,
}: DropdownQuoteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<string>(
    DROPDOWN_QUOTE_LIST[ALL_QUOTE]
  );

  const dropdownStyles = {
    base: "relative box-border flex flex-row justify-between items-center \
    pl-3.5 pr-2.5 w-[127px] h-[36px] \
    border-solid border-[1px] border-grayscale-100 rounded-lg \
    bg-transparent shadow-[4px_4px_10px_rgba(238,238,238,0.1)] \
    text-black-400 \
    cursor-pointer \
    pc:rounded-2xl pc:px-[24px] pc:w-[190px] pc:h-[64px] pc:text-2lg",
    able: "shadow-md hover:bg-pr-blue-50",
    open: "border-pr-blue-300 text-pr-blue-300",
    disabled: "cursor-not-allowed",
  };

  const dropdownTriggerClass = cn(dropdownStyles.base, {
    [dropdownStyles.able]: !disabled,
    [dropdownStyles.open]: isOpen,
    [dropdownStyles.disabled]: disabled,
  });

  const dropdownListClass = cn(
    "absolute flex flex-col items-center overflow-hidden\
    top-10 w-[127px] \
    border-solid border-[1px] border-line-100 rounded-lg \
    bg-white \
    pc:top-[72px] pc:w-[190px]"
  );

  const dropdownItemClass = cn(
    "flex flex-col justify-center \
    px-3.5 w-full h-[36px] \
    text-md text-black-400 font-medium \
    hover:bg-pr-blue-50 \
    cursor-pointer \
    pc:px-[24px] pc:h-[64px] pc:text-2lg"
  );

  const handleSortChange = (code: number) => {
    setCurrentFilter(DROPDOWN_QUOTE_LIST[code]);
    onSelect(code);
    setIsOpen(false);
  };

  const items = DROPDOWN_QUOTE_LIST.map((items, index) => {
    return {
      label: items,
      onClick: () => handleSortChange(index),
    };
  });

  return (
    <Dropdown
      trigger={
        <div className={dropdownTriggerClass}>
          <DropdownFilter>{currentFilter}</DropdownFilter>
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
