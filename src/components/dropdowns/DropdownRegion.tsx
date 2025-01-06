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
import { getRegionText } from "@/utils/utilFunctions";

import { REGION_CODES, REGION_TEXTS } from "@/variables/regions";

type DropdownRegionProps = {
  onSelect: (regionCode: number) => void;
  value?: number | null;
  onChange?: (value: number | null) => void;
  disabled?: boolean;
};

export default function DropdownRegion({
  onSelect,
  value,
  onChange,
  disabled = false,
}: DropdownRegionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSelectRegion, setCurrentSelectRegion] = useState<
    (typeof REGION_TEXTS)[keyof typeof REGION_TEXTS] | string
  >("지역");

  const keys = Object.keys(REGION_CODES);

  const dropdownStyles = {
    base: "relative box-border flex flex-row justify-between items-center \
    pl-3.5 pr-2.5 w-[75px] h-[36px] \
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

  const dropdownListWrapperClass = clsx(
    "absolute box-border overflow-hidden z-50",
    "top-[42px] w-[150px] h-[179px]",
    "border-solid border-[1px] border-line-100 rounded-lg",
    "bg-white",
    "tablet:top-11",
    "pc:top-[72px] pc:w-[328px] pc:h-[320px] pc:rounded-2xl"
  );

  const dynamicLineHeight = `${Math.ceil(keys.length / 2) * 36}px`;
  const dynamicLineHeightPC = `${Math.ceil(keys.length / 2) * 64}px`;
  const dynamicLineClass = clsx(
    "absolute",
    "top-0 bottom-0 left-1/2 w-px",
    "bg-line-100 pointer-events-none",
    `h-[${dynamicLineHeight}] pc:h-[${dynamicLineHeightPC}]`
  );

  const dropdownListClass = clsx(
    "grid grid-cols-2 overflow-y-scroll \
    h-full \
    scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar \
    scrollbar-thumb-grayscale-200 scrollbar-w-1 \
    pc:scrollbar-w-1.5"
  );

  const dropdownItemClass = clsx(
    "box-border flex flex-row items-center \
    px-3.5 \
    w-full h-9 \
    text-md font-medium \
    hover:bg-pr-blue-50 \
    cursor-pointer \
    pc:px-6 pc:h-[64px] pc:text-2lg"
  );

  const handleSelectRegion = (key: string) => {
    onSelect(REGION_CODES[key as keyof typeof REGION_CODES]);
    setCurrentSelectRegion(
      getRegionText(REGION_CODES[key as keyof typeof REGION_CODES])
    );
    setIsOpen(false);
  };

  const items = keys.map((key) => {
    return {
      label: getRegionText(REGION_CODES[key as keyof typeof REGION_CODES]),
      onClick: () => handleSelectRegion(key),
    };
  });

  const itemsWithDivider = [
    ...items.map((item, index) => (
      <DropdownItem
        key={index}
        className={dropdownItemClass}
        onClick={item.onClick}
      >
        {item.label}
      </DropdownItem>
    )),
    <div key="divider" className={dynamicLineClass}></div>,
  ];

  const handleSetRegion = (code: number | null) => {
    if (code === null) {
      setCurrentSelectRegion("지역");
    } else {
      const regionText = REGION_TEXTS[code as keyof typeof REGION_TEXTS];
      setCurrentSelectRegion(regionText);
    }
    onChange?.(code);
  };

  useEffect(() => {
    if (value !== undefined) {
      handleSetRegion(value);
    }
  }, [value]);

  return (
    <Dropdown
      trigger={
        <div className={dropdownTriggerClass}>
          <DropdownFilter>{currentSelectRegion}</DropdownFilter>
          <DropdownImage isOpen={isOpen} />
        </div>
      }
      isOpen={isOpen}
      onToggle={() => setIsOpen((prev) => !prev)}
    >
      <div className={dropdownListWrapperClass}>
        <DropdownList className={dropdownListClass} items={itemsWithDivider} />
      </div>
    </Dropdown>
  );
}
