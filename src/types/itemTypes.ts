export interface Item {
  id: string;
  title: string;
  description: string;
  basePrice: number;
  brand: string;
  creatorUserId: string;
  pictureIds: string[];
  categoryId: string;
  expiryTime: string;
  highestBidPrice: number;
}
 

export interface ItemsResponse {
  content: Item[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number; 
}



export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface CategoryResponse {
  content: Category[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
 
}

export interface CreateItemPayload {
  title: string;
  description: string;

  brand: string;
  basePrice: number;
  categoryId: string;
  expiryTime: string; 
}

export interface CreateItemResponse {
  success: boolean;
  message: string;
  data:string;
}