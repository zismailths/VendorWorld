export type SellerOffer = {
  id: string;
  model: string;
  modelId: string;
  serial: string;
  price: number;
  rank: number;
  rank1Price: number;
  status: 'ACTIVE' | 'SOLD' | 'EXPIRED';
  condition: 'A' | 'B' | 'C' | 'D';
  imageUrl: string;
  createdAt: string;
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
