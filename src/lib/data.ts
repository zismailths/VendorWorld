import type { UserProfile, LaptopModel, SellerOffer, Alert } from './types';
import { PlaceHolderImages } from './placeholder-images';

export const userProfile: UserProfile = {
  name: 'Alex Vendor',
  email: 'alex@vendor.co',
  phone: '123-456-7890',
  avatarUrl: PlaceHolderImages.find(p => p.id === 'user-avatar')?.imageUrl || '',
};

export const laptopModels: LaptopModel[] = [
  { id: 'mbp-14-m3', name: 'MacBook Pro 14" M3' },
  { id: 'mbp-16-m3', name: 'MacBook Pro 16" M3 Max' },
  { id: 'mba-13-m2', name: 'MacBook Air 13" M2' },
  { id: 'xps-15-9530', name: 'Dell XPS 15 9530' },
  { id: 'spectre-x360-14', name: 'HP Spectre x360 14' },
];

export const sellerOffers: SellerOffer[] = [
  {
    id: '1',
    model: 'MacBook Pro 16" M3 Max',
    modelId: 'mbp-16-m3',
    serial: 'C02G8R2JLV2F',
    price: 280000,
    rank: 1,
    rank1Price: 280000,
    status: 'ACTIVE',
    condition: 'A',
    imageUrl: PlaceHolderImages.find(p => p.id === 'laptop-1')?.imageUrl || '',
    createdAt: '2024-05-20T14:48:00.000Z',
  },
  {
    id: '2',
    model: 'Dell XPS 15 9530',
    modelId: 'xps-15-9530',
    serial: 'F7G8H9J0K1L2',
    price: 155000,
    rank: 3,
    rank1Price: 152000,
    status: 'ACTIVE',
    condition: 'B',
    imageUrl: PlaceHolderImages.find(p => p.id === 'laptop-2')?.imageUrl || '',
    createdAt: '2024-05-19T11:20:00.000Z',
  },
  {
    id: '3',
    model: 'MacBook Pro 14" M3',
    modelId: 'mbp-14-m3',
    serial: 'A1B2C3D4E5F6',
    price: 195000,
    rank: 2,
    rank1Price: 194500,
    status: 'ACTIVE',
    condition: 'A',
    imageUrl: PlaceHolderImages.find(p => p.id === 'laptop-3')?.imageUrl || '',
    createdAt: '2024-05-21T09:00:00.000Z',
  },
  {
    id: '4',
    model: 'MacBook Air 13" M2',
    modelId: 'mba-13-m2',
    serial: 'QWERTYUIOP12',
    price: 95000,
    status: 'SOLD',
    rank: 1,
    rank1Price: 95000,
    condition: 'C',
    imageUrl: PlaceHolderImages.find(p => p.id === 'laptop-1')?.imageUrl || '',
    createdAt: '2024-04-15T18:30:00.000Z',
  },
  {
    id: '5',
    model: 'HP Spectre x360 14',
    modelId: 'spectre-x360-14',
    serial: 'ZXCVBNMASDFG',
    price: 130000,
    status: 'EXPIRED',
    rank: 5,
    rank1Price: 125000,
    condition: 'B',
    imageUrl: PlaceHolderImages.find(p => p.id === 'laptop-2')?.imageUrl || '',
    createdAt: '2024-04-10T12:00:00.000Z',
  },
];

export const alerts: Alert[] = [
    {
        id: '1',
        type: 'RANK_1',
        message: 'Your offer for MacBook Pro 16" is now Rank #1!',
        createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    },
    {
        id: '2',
        type: 'UNDERCUT',
        message: 'Your Dell XPS 15 offer was undercut by ₹2,500.',
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    },
];

export const salesData = [
    { month: 'Jan', sold: 4, revenue: 450000 },
    { month: 'Feb', sold: 3, revenue: 320000 },
    { month: 'Mar', sold: 5, revenue: 680000 },
    { month: 'Apr', sold: 2, revenue: 210000 },
    { month: 'May', sold: 6, revenue: 850000 },
    { month: 'Jun', sold: 4, revenue: 510000 },
];

export const stats = {
    averageRank: 2.1,
    soldVsWithdrawn: {
        sold: 23,
        withdrawn: 5,
    },
    totalActiveOffers: sellerOffers.filter(o => o.status === 'ACTIVE').length,
    totalLaptopsSold: 23,
    lifetimeRevenue: 2920000,
};
