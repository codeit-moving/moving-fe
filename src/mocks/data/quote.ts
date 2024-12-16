// (기사님) 보낸 견적 목록조회
export const SENT_QUOTE_LIST = {
  nextCursor: 21,
  hasNext: true,
  list: [
    {
      id: 100,
      requestDate: "2024-03-17T12:00:00.000Z",
      service: 0,
      isDesignated: true,
      name: "김일반",
      movingDate: "2024-11-30T12:00:00.000Z",
      pickupAddress: "서울특별시 강남구 역삼동 123-456",
      dropOffAddress: "서울특별시 서초구 서초동 789-012",
      isCompleted: false,
      isConfirmed: true,
      cost: 150000,
    },
    {
      id: 101,
      requestDate: "2024-03-17T12:00:00.000Z",
      service: 0,
      isDesignated: true,
      name: "김일반",
      movingDate: "2024-11-30T12:00:00.000Z",
      pickupAddress: "서울특별시 강남구 역삼동 123-456",
      dropOffAddress: "서울특별시 서초구 서초동 789-012",
      isCompleted: false,
      isConfirmed: false,
      cost: 150000,
    },
    {
      id: 102,
      requestDate: "2024-03-17T12:00:00.000Z",
      service: 0,
      isDesignated: true,
      name: "김일반",
      movingDate: "2024-11-30T12:00:00.000Z",
      pickupAddress: "서울특별시 강남구 역삼동 123-456",
      dropOffAddress: "서울특별시 서초구 서초동 789-012",
      isCompleted: true,
      isConfirmed: true,
      cost: 150000,
    },
    {
      id: 103,
      requestDate: "2024-03-17T12:00:00.000Z",
      service: 1,
      isDesignated: false,
      name: "김일반",
      movingDate: "2024-11-30T12:00:00.000Z",
      pickupAddress: "서울특별시 강남구 역삼동 123-456",
      dropOffAddress: "서울특별시 서초구 서초동 789-012",
      isCompleted: true,
      isConfirmed: false,
      cost: 150000,
    },
  ],
};

// (기사님) 반려한 견적 목록 조회
export const REJECTED_QUOTE_LIST = {
  nextCursor: 21,
  hasNext: true,
  list: [
    {
      id: 4,
      service: 0,
      name: "김다나",
      movingDate: "2024-11-30T12:00:00.000Z",
      pickupAddress: "서울특별시 강남구 역삼동 123-456",
      dropOffAddress: "서울특별시 서초구 서초동 789-012",
      requestDate: "2024-09-30T12:00:00.000Z",
      isDesignated: true,
    },
    {
      id: 5,
      service: 1,
      name: "이수민",
      movingDate: "2024-12-01T12:00:00.000Z",
      pickupAddress: "서울특별시 송파구 문정동 101-202",
      dropOffAddress: "서울특별시 강북구 수유동 303-404",
      requestDate: "2024-10-01T12:00:00.000Z",
      isDesignated: false,
    },
    {
      id: 6,
      service: 2,
      name: "박지윤",
      movingDate: "2024-12-05T12:00:00.000Z",
      pickupAddress: "경기도 성남시 분당구 야탑동 505-606",
      dropOffAddress: "경기도 용인시 수지구 동천동 707-808",
      requestDate: "2024-10-03T12:00:00.000Z",
      isDesignated: true,
    },
    {
      id: 7,
      service: 0,
      name: "최민호",
      movingDate: "2024-12-10T12:00:00.000Z",
      pickupAddress: "부산광역시 해운대구 좌동 909-1010",
      dropOffAddress: "부산광역시 사하구 감천동 111-212",
      requestDate: "2024-10-05T12:00:00.000Z",
      isDesignated: false,
    },
    {
      id: 8,
      service: 1,
      name: "정예린",
      movingDate: "2024-12-15T12:00:00.000Z",
      pickupAddress: "서울특별시 노원구 중계동 313-414",
      dropOffAddress: "서울특별시 관악구 봉천동 515-616",
      requestDate: "2024-10-10T12:00:00.000Z",
      isDesignated: true,
    },
    {
      id: 9,
      service: 2,
      name: "윤채영",
      movingDate: "2024-12-20T12:00:00.000Z",
      pickupAddress: "인천광역시 연수구 송도동 717-818",
      dropOffAddress: "인천광역시 계양구 계산동 919-1011",
      requestDate: "2024-10-15T12:00:00.000Z",
      isDesignated: false,
    },
    {
      id: 10,
      service: 0,
      name: "강민준",
      movingDate: "2024-12-25T12:00:00.000Z",
      pickupAddress: "대전광역시 유성구 장대동 1020-1121",
      dropOffAddress: "대전광역시 동구 성남동 1222-1323",
      requestDate: "2024-10-20T12:00:00.000Z",
      isDesignated: true,
    },
    {
      id: 11,
      service: 1,
      name: "김소희",
      movingDate: "2025-01-01T12:00:00.000Z",
      pickupAddress: "경상남도 창원시 성산구 중앙동 1324-1425",
      dropOffAddress: "경상남도 진주시 혁신도시 1526-1627",
      requestDate: "2024-10-25T12:00:00.000Z",
      isDesignated: false,
    },
    {
      id: 12,
      service: 2,
      name: "황현우",
      movingDate: "2025-01-05T12:00:00.000Z",
      pickupAddress: "광주광역시 북구 문흥동 1728-1829",
      dropOffAddress: "광주광역시 동구 충장로 1920-2021",
      requestDate: "2024-11-01T12:00:00.000Z",
      isDesignated: true,
    },
  ],
};

export const SENT_QUOTE_DETAIL = {
  id: 103,
  requestDate: "2024-03-17T12:00:00.000Z",
  service: 1,
  isDesignated: true,
  name: "김일반",
  movingDate: "2024-11-30T12:00:00.000Z",
  pickupAddress: "서울특별시 강남구 역삼동 123-456",
  dropOffAddress: "서울특별시 서초구 서초동 789-012",
  isCompleted: true,
  isConfirmed: true,
  cost: 150000,
};