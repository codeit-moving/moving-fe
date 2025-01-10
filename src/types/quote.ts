export interface QuoteData {
  id: number;
  cost: number;
  comment: string;
}

export interface QuoteDetailsData {
  id: number;
  requestDate: string;
  service: number;
  isDesignated: boolean;
  isConfirmed?: boolean;
  name: string;
  movingDate: string;
  pickupAddress: string;
  dropOffAddress: string;
}

export interface SentQuoteData extends QuoteDetailsData {
  isCompleted: boolean;
  isConfirmed: boolean;
  cost: number;
}

export interface ConfirmedQuoteResponse {
  message: string;
  data: {
    id: number;
    movingRequest: number;
    quoteId: number;
    moverId: number;
  };
}
