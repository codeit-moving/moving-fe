export const SERVICE_CODES = {
  MOVE_SMALL: 0,
  MOVE_HOME: 1,
  MOVE_OFFICE: 2,
} as const;

export const SERVICE_TEXTS = {
  [SERVICE_CODES.MOVE_SMALL]: "소형 이사",
  [SERVICE_CODES.MOVE_HOME]: "가정 이사",
  [SERVICE_CODES.MOVE_OFFICE]: "사무실 이사",
} as const;
