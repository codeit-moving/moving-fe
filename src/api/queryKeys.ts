export const moverKey = {
  all: ["mover"] as const,
  lists: () => [...moverKey.all, "lists"] as const,
  list: (params = {}) => [...moverKey.lists(), { ...params }] as const, // 기사 찾기 리스트
  details: () => [...moverKey.all, "detail"] as const,
  detail: (moverId: number) => [...moverKey.details(), moverId] as const, // 기사 상세 페이지
  favorite: (params = {}) => [...moverKey.list(params), "favorite"] as const, // 내가 찜한 기사 목록
  myPage: () => [...moverKey.details(), "myPage"] as const, // 기사님 마이페이지
};

export const reviewKey = {
  all: ["review"] as const,
  lists: () => [...reviewKey.all, "lists"] as const,
  list: (params = {}) => [...reviewKey.lists(), { ...params }] as const, //리뷰 리스트
  me: (params = {}) => [...reviewKey.lists(), "me", { ...params }] as const, // 내가 쓴 리뷰
  available: (params = {}) =>
    [...reviewKey.list(), "available", { ...params }] as const, // 내가 작성할 수 있는 리뷰
  mover: (moverId: number) => [...reviewKey.lists(), "mover", moverId] as const, // 특정 기사의 리뷰 목록
};

export const quoteKey = {
  all: ["quote"] as const,
  lists: () => [...quoteKey.all, "list"] as const,
  sent: () => [...quoteKey.lists(), "mover"] as const, // (기사님) 견적관리 보낸 목록 조회
  rejected: () => [...quoteKey.sent(), "rejected"] as const, // (기사님) 견적관리 반려 목록 조회
  details: () => [...quoteKey.all, "detail"] as const,
  detail: (quoteId: number) => [...quoteKey.details(), quoteId] as const, // (기사님) 견적 상세 페이지
};
