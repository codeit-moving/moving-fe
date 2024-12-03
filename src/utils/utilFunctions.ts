import { SERVICE_TYPES } from "@/variables/var";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { REGION_TEXTS } from "@/variables/regions";
import { SERVICE_TEXTS } from "@/variables/service";

export const formatCount = (count: number) => {
  if (count > 9999) return "9,999+";
  return count.toLocaleString();
};

export const mapServiceType = (services: number[]) => {
  return services.map(
    (service) => SERVICE_TYPES[service as keyof typeof SERVICE_TYPES]
  );
};

export const formatDateWithDay = (date: string | Date): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return format(dateObj, "yyyy. MM. dd(E)", { locale: ko });
};

export const getRegionText = (code: number): string => {
  return REGION_TEXTS[code as keyof typeof REGION_TEXTS] || "지역 미정";
};

export const getServiceText = (code: number): string => {
  return SERVICE_TEXTS[code as keyof typeof SERVICE_TEXTS] || "서비스 미정";
};
