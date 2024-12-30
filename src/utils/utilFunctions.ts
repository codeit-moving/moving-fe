import { format, parseISO, formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { SERVICE_CODES } from "@/variables/services";
import { SERVICE_TEXTS } from "@/variables/service";
import { REGION_TEXTS } from "@/variables/regions";

export const formatCount = (count: number) => {
  if (count > 9999) return "9,999+";
  return count.toLocaleString();
};

//ServiceChip 용
export const mapServiceType = (services: number[]) => {
  return services
    .filter((service) => service >= 1 && service <= 3)
    .map((service) => SERVICE_CODES[service as keyof typeof SERVICE_CODES]);
};

//형식: 2024.07.01
export const formatDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, "yyyy.MM.dd", { locale: ko });
  } catch (error) {
    console.error("Invalid date format:", error);
    return "날짜 오류";
  }
};

//형식: 2024.07.01(월)
export const formatDateWithDay = (date: string | Date): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return format(dateObj, "yyyy. MM. dd(E)", { locale: ko });
};

//형식: 2024.07.01(월) 오전 10:00
export const formatDateWithDayTime = (date: string | Date): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return format(dateObj, "yyyy. MM. dd(E) a h:mm", { locale: ko });
};

export const getRegionText = (code: number): string => {
  return REGION_TEXTS[code as keyof typeof REGION_TEXTS] || "지역 미정";
};

export const getServiceText = (code: number): string => {
  return SERVICE_TEXTS[code as keyof typeof SERVICE_TEXTS] || "서비스 미정";
};

export const formatTimeAgo = (dateString: string) => {
  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }

    return formatDistanceToNow(date, {
      addSuffix: true,
      locale: ko,
    });
  } catch (error) {
    console.error("Date formatting error:", error);
    return "날짜 없음";
  }
};

export const isAllTrue = (arr: boolean[]) => arr.every(Boolean);
