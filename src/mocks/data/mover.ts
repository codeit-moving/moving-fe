export const MOVER_LIST = {
  nextCursor: 21,
  hasNext: true,
  list: [
    {
      id: 11,
      imageUrl: null,
      nickname: "김기사11",
      career: 4,
      introduction: "열심히 하는 기사입니다. 고객 만족을 위해 최선을 다합니다.",
      services: [0, 1],
      regions: [82031, 8202],
      rating: {
        "1": 0,
        "2": 0,
        "3": 1,
        "4": 2,
        "5": 1,
        totalCount: 4, // 0+0+1+2+1
        totalSum: 16, // (3×1 + 4×2 + 5×1)
        average: 4, // 16/4
      },
      reviewCount: 7,
      confirmCount: 11,
      favoriteCount: 3,
      isFavorite: true,
      isDesignated: true,
    },
    {
      id: 12,
      imageUrl: null,
      nickname: "이기사",
      career: 2,
      introduction: "신속하고 안전한 운송을 제공합니다.",
      services: [1, 2],
      regions: [82021, 8103],
      rating: {
        "1": 1,
        "2": 0,
        "3": 2,
        "4": 3,
        "5": 4,
        totalCount: 10, // 1+0+2+3+4
        totalSum: 39, // (1×1 + 3×2 + 4×3 + 5×4)
        average: 3.9, // 39/10
      },
      reviewCount: 5,
      confirmCount: 8,
      favoriteCount: 1,
      isFavorite: true,
      isDesignated: false,
    },
    {
      id: 13,
      imageUrl: null,
      nickname: "박기사",
      career: 5,
      introduction: "친절한 응대와 책임감이 강한 기사입니다.",
      services: [0, 2],
      regions: [82031, 8204],
      rating: {
        "1": 0,
        "2": 1,
        "3": 2,
        "4": 1,
        "5": 1,
        totalCount: 5, // 0+1+2+1+1
        totalSum: 15, // (2×1 + 3×2 + 4×1 + 5×1)
        average: 3, // 15/5
      },
      reviewCount: 10,
      confirmCount: 15,
      favoriteCount: 5,
      isFavorite: true,
      isDesignated: false,
    },
    {
      id: 14,
      imageUrl: null,
      nickname: "최기사",
      career: 3,
      introduction: "시간 엄수와 안전 운송에 최선을 다합니다.",
      services: [1, 2],
      regions: [82032, 8203],
      rating: {
        "1": 0,
        "2": 0,
        "3": 2,
        "4": 0,
        "5": 2,
        totalCount: 4, // 0+0+2+0+2
        totalSum: 18, // (3×2 + 5×2)
        average: 4, // 18/4
      },
      reviewCount: 6,
      confirmCount: 9,
      favoriteCount: 2,
      isFavorite: true,
      isDesignated: true,
    },
    {
      id: 15,
      imageUrl: null,
      nickname: "정기사",
      career: 6,
      introduction: "경험 풍부한 기사로, 다양한 상황에 대처 가능합니다.",
      services: [0, 1],
      regions: [82031, 8205],
      rating: {
        "1": 1,
        "2": 1,
        "3": 0,
        "4": 2,
        "5": 2,
        totalCount: 6, // 1+1+0+2+2
        totalSum: 20, // (1×1 + 2×1 + 4×2 + 5×2)
        average: 3.3, // 20/6
      },
      reviewCount: 12,
      confirmCount: 20,
      favoriteCount: 4,
      isFavorite: true,
      isDesignated: false,
    },
    {
      id: 16,
      imageUrl: null,
      nickname: "류기사",
      career: 1,
      introduction: "신입이지만 열정이 가득한 기사입니다.",
      services: [2],
      regions: [82033, 8201],
      rating: {
        "1": 0,
        "2": 1,
        "3": 1,
        "4": 1,
        "5": 1,
        totalCount: 4, // 0+1+1+1+1
        totalSum: 14, // (2×1 + 3×1 + 4×1 + 5×1)
        average: 3.5, // 14/4
      },
      reviewCount: 3,
      confirmCount: 4,
      favoriteCount: 1,
      isFavorite: true,
      isDesignated: false,
    },
    {
      id: 17,
      imageUrl: null,
      nickname: "김베테랑",
      career: 10,
      introduction: "오랜 경력으로 신뢰를 드리는 베테랑 기사입니다.",
      services: [0, 2],
      regions: [82031, 8206],
      rating: {
        "1": 0,
        "2": 0,
        "3": 3,
        "4": 2,
        "5": 2,
        totalCount: 7, // 0+0+3+2+2
        totalSum: 27, // (3×3 + 4×2 + 5×2)
        average: 3, // 27/7
      },
      reviewCount: 20,
      confirmCount: 30,
      favoriteCount: 8,
      isFavorite: true,
      isDesignated: true,
    },
    {
      id: 18,
      imageUrl: null,
      nickname: "이친절",
      career: 2,
      introduction: "친절하고 꼼꼼한 서비스로 만족을 드립니다.",
      services: [1, 2],
      regions: [82034, 8202],
      rating: {
        "1": 2,
        "2": 0,
        "3": 0,
        "4": 2,
        "5": 1,
        totalCount: 5, // 2+0+0+2+1
        totalSum: 17, // (1×2 + 4×2 + 5×1)
        average: 3.4, // 17/5
      },
      reviewCount: 5,
      confirmCount: 7,
      favoriteCount: 2,
      isFavorite: true,
      isDesignated: false,
    },
    {
      id: 19,
      imageUrl: null,
      nickname: "박베스트",
      career: 7,
      introduction: "최고의 퍼포먼스로 고객을 만족시키는 베스트 기사입니다.",
      services: [2],
      regions: [82035, 8203],
      rating: {
        "1": 0,
        "2": 1,
        "3": 2,
        "4": 2,
        "5": 2,
        totalCount: 7, // 0+1+2+2+2
        totalSum: 27, // (2×1 + 3×2 + 4×2 + 5×2)
        average: 3.86, // 27/7
      },
      reviewCount: 15,
      confirmCount: 22,
      favoriteCount: 6,
      isFavorite: true,
      isDesignated: false,
    },
    {
      id: 20,
      imageUrl: null,
      nickname: "최성실",
      career: 3,
      introduction: "성실하게 일하며 고객의 신뢰를 쌓는 기사입니다.",
      services: [0, 1],
      regions: [82031, 8207],
      rating: {
        "1": 0,
        "2": 0,
        "3": 1,
        "4": 3,
        "5": 1,
        totalCount: 5, // 0+0+1+3+1
        totalSum: 18, // (3×1 + 4×3 + 5×1)
        average: 3.6, // 18/5
      },
      reviewCount: 9,
      confirmCount: 13,
      favoriteCount: 3,
      isFavorite: true,
      isDesignated: true,
    },
  ],
};

export const MOVER_MY_PAGE = {
  id: 3,
  imageUrl: null,
  services: [1],
  nickname: "김기사",
  name: "김영수",
  career: 3,
  regions: [82041, 82062],
  introduction: "정확하고 안전한 이사, 믿고 맡겨주세요.",
  isDesignated: true,
  isFavorite: true,
  reviewCount: 0,
  favoriteCount: 1,
  confirmCount: 0,
  rating: {
    "1": 0,
    "2": 0,
    "3": 1,
    "4": 3,
    "5": 6,
    totalCount: 10,
    totalSum: 45,
    average: 4.5,
  },
};
