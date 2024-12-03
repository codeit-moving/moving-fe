import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { REGION_TEXTS } from "@/variables/regions";
import { SERVICE_CODES } from "@/variables/services";

export const formatCount = (count: number) => {
  if (count > 9999) return "9,999+";
  return count.toLocaleString();
};

export const mapServiceType = (services: number[]) => {
  return services.map(
    (service) => SERVICE_CODES[service as keyof typeof SERVICE_CODES]
  );
};

export const formatDateWithDay = (date: string | Date): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return format(dateObj, "yyyy. MM. dd(E)", { locale: ko });
};

export const getRegionText = (code: number): string => {
  return REGION_TEXTS[code as keyof typeof REGION_TEXTS] || "지역 미정";
};
