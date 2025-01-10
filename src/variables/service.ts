export const SERVICE_CODES = {
  ALL: 99,
  MOVE_SMALL: 1,
  MOVE_HOME: 2,
  MOVE_OFFICE: 3,
} as const;

export const SERVICE_TEXTS = {
  [SERVICE_CODES.ALL]: "전체",
  [SERVICE_CODES.MOVE_SMALL]: "소형 이사",
  [SERVICE_CODES.MOVE_HOME]: "가정 이사",
  [SERVICE_CODES.MOVE_OFFICE]: "사무실 이사",
} as const;
