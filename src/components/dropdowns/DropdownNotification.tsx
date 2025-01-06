"use client";

import Image from "next/image";
import { useState } from "react";
import {
  InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import clsx from "clsx";

import { Dropdown, DropdownItem, DropdownBell } from "../common/Dropdown";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import Loader from "../common/Loader";
import {
  GetNotificationListData,
  getNotificationList,
  readNotification,
} from "@/api/notification";
import { NOTIFICATION_DEFAULT_PAGE_SIZE } from "@/variables/notification";
import assets from "@/variables/images";

function HighlightedText({ text }: { text: string }) {
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
}

type DropdownNotificationProps = {
  onSelect: (id: number) => void;
  disabled?: boolean;
};

export default function DropdownNotification({
  onSelect,
  disabled = false,
}: DropdownNotificationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const styles = {
    dropdown: {
      trigger: clsx("relative w-6 h-6 rounded-full cursor-pointer", {
        "cursor-not-allowed": disabled,
      }),
      badge: clsx(
        "absolute -top-1 -right-1",
        "flex items-center justify-center",
        "min-w-[16px] h-[16px]",
        "rounded-full bg-red-500",
        "text-[10px] text-white font-bold",
        "pc:min-w-[18px] pc:h-[18px] pc:text-[11px]"
      ),
      container: clsx(
        "absolute flex flex-col items-center",
        "p-4 py-2.5 top-[37px] right-[-100px] w-[312px]",
        "border-solid border-[1px] border-line-100 rounded-2xl",
        "bg-white",
        "tablet:top-[39px] tablet:right-[-56px]",
        "pc:top-[54px] pc:w-[359px] pc:right-0"
      ),
    },
    notification: {
      header: clsx(
        "flex flex-row justify-between items-center",
        "pl-4 pr-[15px] w-full h-[54px]",
        "text-lg text-black-400 font-bold",
        "pc:pl-6 pc:text-2lg"
      ),
      list: clsx(
        "overflow-y-auto",
        "max-h-[400px]",
        "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
      ),
      item: clsx(
        "box-border flex flex-col items-left",
        "px-6 py-3",
        "w-full",
        "border-solid border-t border-line-100",
        "text-lg text-black-400 font-medium",
        "hover:bg-pr-blue-50",
        "cursor-pointer",
        "pc:py-4"
      ),
      readItem: "bg-bg-300 hover:bg-bg-300",
      time: "text-sm text-gray-300 font-medium",
      loading: "flex justify-center items-center h-8",
      scrollTrigger: "h-10 bg-transparent",
    },
  };

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
    GetNotificationListData,
    Error,
    InfiniteData<GetNotificationListData>,
    string[],
    number | null
  >({
    queryKey: ["notifications"],
    queryFn: ({ pageParam = null }) =>
      getNotificationList({ lastCursorId: pageParam }),
    getNextPageParam: (lastPage) => {
      if (
        !lastPage.notifications?.length ||
        lastPage.lastCursorId === "" ||
        lastPage.lastCursorId === null
      ) {
        return null;
      }
      const cursor = Number(lastPage.lastCursorId);
      return isNaN(cursor) ? null : cursor;
    },
    initialPageParam: null,
  });

  const loadMoreRef = useInfiniteScroll({
    callback: () => {
      if (hasNextPage && !isFetching) fetchNextPage();
    },
    options: {
      threshold: 0.5,
    },
  });

  const handleReadNotification = async (id: number) => {
    queryClient.setQueryData<InfiniteData<GetNotificationListData>>(
      ["notifications"],
      (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            notifications: page.notifications.map((notification) =>
              notification.id === id
                ? { ...notification, isRead: true }
                : notification
            ),
          })),
        };
      }
    );

    try {
      await readNotification(id);
      onSelect(id);
    } catch (error) {
      queryClient.setQueryData<InfiniteData<GetNotificationListData>>(
        ["notifications"],
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              notifications: page.notifications.map((notification) =>
                notification.id === id
                  ? { ...notification, isRead: false }
                  : notification
              ),
            })),
          };
        }
      );
      console.error("알림 읽기 실패:", error);
    }
  };

  const notifications = data?.pages.flatMap((page) => page.notifications) ?? [];
  const unreadCount = notifications.filter((item) => !item.isRead).length;
  const lastCursorId =
    data?.pages[data?.pages.length - 1]?.lastCursorId ?? null;

  return (
    <Dropdown
      trigger={
        <div className="relative">
          <DropdownBell
            className={styles.dropdown.trigger}
            isEmpty={unreadCount < 1}
          />
          {unreadCount > 0 && (
            <div className={styles.dropdown.badge}>
              {lastCursorId
                ? `${unreadCount}+`
                : NOTIFICATION_DEFAULT_PAGE_SIZE < unreadCount
                ? `${NOTIFICATION_DEFAULT_PAGE_SIZE}+`
                : unreadCount}
            </div>
          )}
        </div>
      }
      isOpen={isOpen}
      onToggle={() => setIsOpen((prev) => !prev)}
    >
      <div className={styles.dropdown.container}>
        <div className={styles.notification.header}>
          <div>알림</div>
          <div onClick={() => setIsOpen(false)}>
            <Image
              src={assets.icons.x}
              alt="알림 닫기"
              width={24}
              height={24}
            />
          </div>
        </div>
        <div className={styles.notification.list}>
          {notifications.map((item, index) => (
            <DropdownItem
              key={item.id}
              className={clsx(
                styles.notification.item,
                index === 0 && "border-t-0",
                item.isRead && styles.notification.readItem
              )}
              onClick={() => handleReadNotification(item.id)}
            >
              <HighlightedText text={item.content} />
              <div className={styles.notification.time}>{item.timeGap}</div>
            </DropdownItem>
          ))}
          {isFetching && (
            <div className={styles.notification.loading}>
              <Loader />
            </div>
          )}
          <div
            ref={loadMoreRef}
            className={styles.notification.scrollTrigger}
          />
        </div>
      </div>
    </Dropdown>
  );
}
