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
  favoriteCount: number;
  isFavorite: boolean;
  isDesignated: boolean;
}

export interface FullMoverData extends BaseMoverData {
  introduction: string;
  services: number[];
  regions: number[];
}

export interface CardProps {
  size?: "fixed" | "responsive";
  className?: string;
}
