import { boolean } from "zod";
import { axiosInstance } from "./axios";

import { NOTIFICATION_DEFAULT_PAGE_SIZE } from "@/variables/notification";

const PATH = "/notifications";

export interface Notification {
  id: number;
  content: string;
  isRead: boolean;
  createAt: Date;
  updateAt: Date;
  userId: number;
  timeGap: string;
}

export interface GetNotificationListData {
  notifications: Notification[];
  hasNext: boolean;
  lastCursorId: number | null;
}

export async function getNotificationList(): Promise<GetNotificationListData> {
  const params: Record<string, any> = {
    isRead: false,
    limit: NOTIFICATION_DEFAULT_PAGE_SIZE,
  };

  try {
    const response = await axiosInstance.get(PATH, { params });
    return response.data;
  } catch (error) {
    console.error("getNotificationList API 호출 오류:", error);
    return { notifications: [], hasNext: false, lastCursorId: null };
  }
}

export async function readNotification(notificationId: number) {
  try {
    const response = await axiosInstance.post(`${PATH}/${notificationId}`);
    return response.data;
  } catch (error) {
    console.error("readNotification API 호출 오류:", error);
    throw error;
  }
}
