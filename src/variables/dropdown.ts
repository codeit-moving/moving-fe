export const PROFILE_CUSTOMER_OAUTH = [
  { text: "프로필 수정", link: "/me/profile-edit" },
  { text: "찜한 기사님", link: "/me/mover" },
  { text: "이사 리뷰", link: "/me/review" },
];
export const PROFILE_CUSTOMER = [
  { text: "기본정보 수정", link: "/me/info-edit" },
  ...PROFILE_CUSTOMER_OAUTH,
];
export const PROFILE_MOVER = [
  { text: "마이페이지", link: "/mover/my-page" },
  { text: "받은 견적", link: "/mover/request" },
];

export const SORT_MOVER_CODES = {
  REVIEW: 0,
  RATING: 1,
  CAREER: 2,
  CONFIRM: 3,
} as const;

export const SORT_MOVER_TEXTS: Record<
  (typeof SORT_MOVER_CODES)[keyof typeof SORT_MOVER_CODES],
  string
> = {
  [SORT_MOVER_CODES.REVIEW]: "리뷰 많은순",
  [SORT_MOVER_CODES.RATING]: "평점 높은순",
  [SORT_MOVER_CODES.CAREER]: "경력 높은순",
  [SORT_MOVER_CODES.CONFIRM]: "확정 많은순",
} as const;

export const SORT_MOVING_REQUEST_CODES = {
  DATE: 0,
  REQUEST: 1,
} as const;

export const SORT_MOVING_REQUEST_TEXTS: Record<
  (typeof SORT_MOVING_REQUEST_CODES)[keyof typeof SORT_MOVING_REQUEST_CODES],
  string
> = {
  [SORT_MOVING_REQUEST_CODES.DATE]: "이사 빠른순",
  [SORT_MOVING_REQUEST_CODES.REQUEST]: "요청일 빠른순",
} as const;

export enum DropdownType {
  PROFILE_CUSTOMER,
  PROFILE_MOVER,
  NOTIFICATION,
  SORT_MOVER,
  SORT_MOVING_REQUEST,
}

export const DROPDOWN_ITEM_CLASSES: Record<DropdownType, string> = {
  [DropdownType.PROFILE_CUSTOMER]:
    "box-border flex flex-col items-left \
    px-3 py-2 \
    w-full h-10 \
    text-md text-black-400 font-medium no-wrap\
    hover:bg-pr-blue-50 \
    cursor-pointer \
    pc:px-6 pc:py-3.5 pc:h-[54px] pc:text-lg",
  [DropdownType.PROFILE_MOVER]:
    "box-border flex flex-col items-left \
    px-3 py-2 \
    w-full h-10 \
    text-md text-black-400 font-medium \
    hover:bg-pr-blue-50 \
    cursor-pointer \
    pc:px-6 pc:py-3.5 pc:h-[54px] pc:text-lg",
  [DropdownType.NOTIFICATION]:
    "box-border flex flex-col items-left \
    px-6 py-3 \
    w-full \
    text-lg text-black-400 font-medium \
    hover:bg-pr-blue-50 \
    cursor-pointer \
    pc:py-4",
  [DropdownType.SORT_MOVER]:
    "flex flex-col items-center justify-center \
    w-full h-8 \
    text-xs text-black-400 font-medium \
    hover:bg-pr-blue-50 \
    cursor-pointer \
    pc:h-10 pc:text-md",
  [DropdownType.SORT_MOVING_REQUEST]:
    "flex flex-col items-center justify-center \
    w-full h-8 \
    text-xs text-black-400 font-medium \
    hover:bg-pr-blue-50 \
    cursor-pointer \
    pc:h-10 pc:text-md",
};

export const DROPDOWN_LIST_CLASSES: Record<DropdownType, string> = {
  [DropdownType.PROFILE_CUSTOMER]:
    "absolute flex flex-col items-center \
    p-1.5 pt-2.5 top-[37px] right-0 w-[152px] \
    border-solid border-[1px] border-line-100 rounded-2xl \
    bg-white \
    pc:top-[54px] pc:w-[248px]",
  [DropdownType.PROFILE_MOVER]:
    "absolute flex flex-col items-center \
    p-1.5 pt-2.5 top-[37px] right-0 w-[152px] \
    border-solid border-[1px] border-line-100 rounded-2xl \
    bg-white \
    pc:top-[54px] pc:w-[248px]",
  [DropdownType.NOTIFICATION]:
    "absolute flex flex-col items-center \
    p-4 py-2.5 top-[37px] right-[-100px] w-[312px] \
    border-solid border-[1px] border-line-100 rounded-2xl \
    bg-white \
    tablet:right-[-56px] \
    pc:top-[54px] pc:w-[359px] pc:right-0",
  [DropdownType.SORT_MOVER]:
    "absolute flex flex-col items-center \
    top-10 right-0 w-[91px] \
    border-solid border-[1px] border-line-100 rounded-2xl \
    bg-white \
    pc:top-12 pc:w-[114px]",
  [DropdownType.SORT_MOVING_REQUEST]:
    "absolute flex flex-col items-center \
    top-10 right-0 w-[91px] \
    border-solid border-[1px] border-line-100 rounded-2xl \
    bg-white \
    pc:top-12 pc:w-[114px]",
};

export const DROPDOWN_CLASSES: Record<
  DropdownType,
  {
    base: string;
    able: string;
    open: string;
    disabled: string;
  }
> = {
  [DropdownType.PROFILE_CUSTOMER]: {
    base: "relative flex flex-row gap-4 items-center justify-between rounded-full cursor-pointer",
    able: "",
    open: "",
    disabled: "cursor-not-allowed",
  },
  [DropdownType.PROFILE_MOVER]: {
    base: "relative flex flex-row gap-4 items-center justify-between rounded-full cursor-pointer",
    able: "",
    open: "",
    disabled: "cursor-not-allowed",
  },
  [DropdownType.NOTIFICATION]: {
    base: "relative w-6 h-6 rounded-full cursor-pointer",
    able: "",
    open: "",
    disabled: "cursor-not-allowed",
  },
  [DropdownType.SORT_MOVER]: {
    base: "relative flex flex-row justify-center items-center \
        px-1.5 m-auto w-[91px] h-8 \
        bg-transparent rounded-lg \
        text-black-400 \
        cursor-pointer \
        pc:px-2.5 pc:w-[114px] pc:h-10",
    able: "",
    open: "text-pr-blue-300",
    disabled: "cursor-not-allowed",
  },
  [DropdownType.SORT_MOVING_REQUEST]: {
    base: "relative flex flex-row justify-center items-center \
        px-1.5 m-auto w-[91px] h-8 \
        bg-transparent rounded-lg \
        text-black-400 \
        cursor-pointer \
        pc:px-2.5 pc:w-[114px] pc:h-10",
    able: "",
    open: "text-pr-blue-300",
    disabled: "cursor-not-allowed",
  },
};
