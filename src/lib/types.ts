
export type SellerOffer = {
  id: string;
  isSellerOffer?: boolean;
  model: string;
  modelId: string;
  serialNumbers: string[];
  price: number;
  quantity?: number;
  rank: number;
  rank1Price: number;
  status: 'ACTIVE' | 'SOLD' | 'EXPIRED';
  condition: 'A' | 'B' | 'C' | 'D';
  imageUrl: string;
  createdAt: string;
  totalViews?: number;
  dailyViews?: number;
};

export type LaptopModel = {
  id: string;
  name: string;
};

export type Alert = {
  id: string;
  type: 'RANK_1' | 'UNDERCUT';
  message: string;
  createdAt: string;
};

export type UserProfile = {
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
};
