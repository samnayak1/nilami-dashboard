
export interface Bid {
  id: string;
  created: string;
  itemId: string;
  creatorId: string;
  price: number;
}

export interface UserBid {
  id: string;
  itemId: string;
  price: number;
  createdAt: string;
  isHighestBid: boolean;
  title: string;
  basePrice: number;
  brand: string;
  expiryTime: string;
}

export interface UserBidsResponse {
  success: boolean;
  message: string;
  data: UserBid[];
}

export interface BidsResponse {
  success: boolean;
  message: string;
  data: Bid[];
}

export type BidPlacedPayload = {
    eventId: string;
    itemId: string;
    bidId: string;
    amount: number| string;
    userId: string;
    timestamp: Date;
}

export interface IdempotentResponse {
  success: boolean;
  data: {
    idempotentKey: string;
    itemId: string;
    bidAmount: number;
  };
}

export interface CreateBidRequest {
  itemId: string;
  price: number;
  idempotentKey: string;
}