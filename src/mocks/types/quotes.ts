interface Rating {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  totalCount: number;
  totalSum: number;
  average: number;
}

interface Mover {
  id: number;
  nickname: string;
  imageUrl: string | null;
  career: number;
  introduction: string;
  services: number[];
  name: string;
  isDesignated: boolean;
  isFavorite: boolean;
  reviewCount: number;
  favoriteCount: number;
  confirmCount: number;
  rating: Rating;
}

interface MovingRequest {
  service: number;
  movingDate: string;
  pickupAddress: string;
  dropOffAddress: string;
  requestDate: string;
  isConfirmed: boolean;
  status: "PENDING" | "CONFIRMED";
}

interface Quote {
  id: number;
  cost: number;
  comment: string;
  isConfirmed: boolean;
  movingRequest: MovingRequest;
  mover: Mover;
}

interface MovingRequestResponse {
  list: Quote[];
}

export type { MovingRequestResponse, Quote, Mover, MovingRequest, Rating };
