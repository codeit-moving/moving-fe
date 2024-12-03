export interface BaseMoverData {
  id: number;
  imageUrl: string;
  nickname: string;
  career: number;
  ratings: {
    "1": number;
    "2": number;
    "3": number;
    "4": number;
    "5": number;
    average: number;
  };
  reviewCount: number;
  confirmCount: number;
}

export interface ProfileData {
  name: string;
  phoneNumber: string;
  email: string;
}

export interface FavoriteFields {
  favoriteCount: number;
  isFavorite: boolean;
}
export interface FullMoverData extends BaseMoverData {
  introduction: string;
  services: number[];
  regions: number[];
  isDesignated?: boolean;
}

export interface CardProps {
  size?: "fixed" | "responsive";
  className?: string;
}

export interface Address {
  pickupAddress: string;
  dropOffAddress: string;
}

export interface RequestDetails {
  movingDate: string;
  requestDate: string;
  cost: number;
}
