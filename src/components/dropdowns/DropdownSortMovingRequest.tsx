"use client";

import { useState } from "react";
import clsx from "clsx";

import {
  Dropdown,
  DropdownList,
  DropdownItem,
  SortDropdownImage,
  DropdownSortTrigger,
} from "../common/Dropdown";

import {
  SORT_MOVING_REQUEST_CODES,
  SORT_MOVING_REQUEST_TEXTS,
} from "@/variables/dropdown";

type DropdownSortMovingRequestProps = {
  onSelect: (sortCode: number) => void;
  disabled?: boolean;
};

export default function DropdownSortMovingRequest({
  onSelect,
  disabled = false,
}: DropdownSortMovingRequestProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSortMover, setCurrentSortMover] = useState<
    (typeof SORT_MOVING_REQUEST_TEXTS)[keyof typeof SORT_MOVING_REQUEST_TEXTS]
  >(SORT_MOVING_REQUEST_TEXTS[SORT_MOVING_REQUEST_CODES.DATE]);

  const dropdownStyles = {
    base: "relative flex flex-row justify-between items-center \
        px-1.5 m-auto w-[91px] h-8 \
        bg-transparent rounded-lg \
        text-black-400 \
        cursor-pointer \
        pc:px-2.5 pc:w-[114px] pc:h-10",
    able: "",
    open: "text-pr-blue-300",
    disabled: "cursor-not-allowed",
  };

  const dropdownTriggerClass = clsx(dropdownStyles.base, {
    [dropdownStyles.able]: !disabled,
    [dropdownStyles.open]: isOpen,
    [dropdownStyles.disabled]: disabled,
  });

  const dropdownListClass = clsx(
    "absolute flex flex-col items-center overflow-hidden\
    top-10 right-0 w-[91px] \
    border-solid border-[1px] border-line-100 rounded-lg \
    bg-white \
    pc:top-12 pc:w-[114px]"
  );

  const dropdownItemClass = clsx(
    "flex flex-col justify-center \
    px-1.5 w-full h-8 \
    text-xs text-black-400 font-medium \
    hover:bg-pr-blue-50 \
    cursor-pointer \
    pc:px-2.5 pc:h-10 pc:text-md"
  );

  const handleSortChange = (code: keyof typeof SORT_MOVING_REQUEST_CODES) => {
    setCurrentSortMover(
      SORT_MOVING_REQUEST_TEXTS[SORT_MOVING_REQUEST_CODES[code]]
    );
    onSelect(SORT_MOVING_REQUEST_CODES[code]);
    setIsOpen(false);
  };

  const keys = Object.keys(SORT_MOVING_REQUEST_CODES) as Array<
    keyof typeof SORT_MOVING_REQUEST_CODES
  >;
  const items = keys.map((key) => {
    const code = SORT_MOVING_REQUEST_CODES[key];
    return {
      label: SORT_MOVING_REQUEST_TEXTS[code],
      onClick: () =>
        handleSortChange(key as keyof typeof SORT_MOVING_REQUEST_CODES),
    };
  });

  return (
    <Dropdown
      trigger={
        <div className={dropdownTriggerClass}>
          <DropdownSortTrigger curretnSort={currentSortMover} />
          <SortDropdownImage isOpen={isOpen} />
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
