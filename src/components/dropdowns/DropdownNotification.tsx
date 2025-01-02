"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import clsx from "clsx";

import {
  Dropdown,
  DropdownList,
  DropdownItem,
  DropdownBell,
} from "../common/Dropdown";
import { getNotificationList, readNotification } from "@/api/notification";

import { type Notification } from "@/api/notification";
import { NOTIFICATION_DEFAULT_PAGE_SIZE } from "@/variables/notification";
import assets from "@/variables/images";

type DropdownNotificationProps = {
  onSelect: (id: number) => void;
  disabled?: boolean;
};

export default function DropdownNotification({
  onSelect,
  disabled = false,
}: DropdownNotificationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationList, setNotificationList] = useState<Notification[]>([]);

  const dropdownStyles = {
    base: "relative w-6 h-6 rounded-full cursor-pointer",
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
    p-4 py-2.5 top-[37px] right-[-100px] w-[312px] \
    border-solid border-[1px] border-line-100 rounded-2xl \
    bg-white \
    tablet:top-[39px] tablet:right-[-56px] \
    pc:top-[54px] pc:w-[359px] pc:right-0"
  );

  const dropdownItemClass = clsx(
    "box-border flex flex-col items-left \
    px-6 py-3 \
    w-full \
    border-solid border-t border-line-100 \
    text-lg text-black-400 font-medium \
    hover:bg-pr-blue-50 \
    cursor-pointer \
    pc:py-4"
  );

  const notificationClass = clsx(
    "flex flex-row justify-between items-center",
    "pl-4 pr-[15px] w-full h-[54px]",
    "text-lg text-black-400 font-bold",
    "pc:pl-6 pc:text-2lg"
  );

  const readNotificationClass = clsx("bg-bg-300 hover:bg-bg-300");

  const timeClass = clsx("text-sm text-gray-300 font-medium");

  const HighlightedText = ({ text }: { text: string }) => {
    const parseText = (text: string) => {
      const parts = text.split(",");
      return parts.map((part, index) => {
        const isHighlight = index % 2 === 1;
        return (
          <span key={index} className={isHighlight ? "text-pr-blue-300" : ""}>
            {part}
          </span>
        );
      });
    };

    return <p className="text-base">{parseText(text)}</p>;
  };

  const fetchNotifications = async () => {
    const data = await getNotificationList();
    setNotificationList(data.notifications);
  };

  const handleReadNotification = async (id: number) => {
    // 즉시 UI 업데이트
    setNotificationList((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );

    // API 호출은 백그라운드에서 실행
    try {
      await readNotification(id);
    } catch (error) {
      // API 호출이 실패하면 상태를 원래대로 되돌림
      setNotificationList((prev) =>
        prev.map((notification) =>
          notification.id === id
            ? { ...notification, isRead: false }
            : notification
        )
      );
      console.error("알림 읽기 실패:", error);
    }
  };

  const items = notificationList.map((item) => {
    const children = <HighlightedText text={item.content} />;

    return {
      id: item.id,
      children,
      time: item.timeGap,
      isRead: item.isRead,
      onClick: () => {
        handleReadNotification(item.id);
      },
    };
  });

  const handleCloseList = () => {
    setIsOpen(false);
  };

  const itemsWithDivider = [
    <div className={notificationClass}>
      <div>알림</div>
      <div onClick={handleCloseList}>
        <Image src={assets.icons.x} alt="알림 닫기" width={24} height={24} />
      </div>
    </div>,
    ...items.map((item, index) => (
      <DropdownItem
        key={item.id}
        className={clsx(
          dropdownItemClass,
          index === 0 && "border-t-0",
          item.isRead && readNotificationClass
        )}
        onClick={item.onClick}
      >
        {item.children}
        <div className={timeClass}>{item.time}</div>
      </DropdownItem>
    )),
  ];

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <Dropdown
      trigger={<DropdownBell className={dropdownTriggerClass} />}
      isOpen={isOpen}
      onToggle={() => setIsOpen((prev) => !prev)}
    >
      <DropdownList className={dropdownListClass} items={itemsWithDivider} />
    </Dropdown>
  );
}
