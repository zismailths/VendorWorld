
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
  // Seller's Offers
  {
    id: 'seller-1',
    isSellerOffer: true,
    model: 'MacBook Pro 16" M3 Max',
    modelId: 'mbp-16-m3',
    serialNumbers: ['C02G8R2JLV2F', 'C02G8R2JLV2G', 'C02G8R2JLV2H', 'C02G8R2JLV2I', 'C02G8R2JLV2J'],
    price: 280000,
    quantity: 5,
    rank: 3,
    rank1Price: 275000,
    status: 'ACTIVE',
    condition: 'A',
    imageUrl: PlaceHolderImages.find(p => p.id === 'laptop-1')?.imageUrl || '',
    createdAt: '2024-05-20T14:48:00.000Z',
    totalViews: 1254,
    dailyViews: 88,
  },
  {
    id: 'seller-2',
    isSellerOffer: true,
    model: 'Dell XPS 15 9530',
    modelId: 'xps-15-9530',
    serialNumbers: Array.from({length: 10}, (_, i) => `F7G8H9J0K1L${i}`),
    price: 155000,
    quantity: 10,
    rank: 5,
    rank1Price: 152000,
    status: 'ACTIVE',
    condition: 'B',
    imageUrl: PlaceHolderImages.find(p => p.id === 'laptop-2')?.imageUrl || '',
    createdAt: '2024-05-19T11:20:00.000Z',
    totalViews: 876,
    dailyViews: 45,
  },
    {
    id: 'seller-3',
    isSellerOffer: true,
    model: 'MacBook Pro 14" M3',
    modelId: 'mbp-14-m3',
    serialNumbers: Array.from({length: 8}, (_, i) => `A1B2C3D4E5F${i}`),
    price: 197000,
    quantity: 8,
    rank: 2,
    rank1Price: 195000,
    status: 'ACTIVE',
    condition: 'A',
    imageUrl: PlaceHolderImages.find(p => p.id === 'laptop-3')?.imageUrl || '',
    createdAt: '2024-05-21T09:00:00.000Z',
    totalViews: 2109,
    dailyViews: 150,
  },
  {
    id: 'seller-4',
    isSellerOffer: true,
    model: 'MacBook Air 13" M2',
    modelId: 'mba-13-m2',
    serialNumbers: ['QWERTYUIOP12'],
    price: 95000,
    quantity: 1,
    status: 'SOLD',
    rank: 1,
    rank1Price: 95000,
    condition: 'C',
    imageUrl: PlaceHolderImages.find(p => p.id === 'laptop-1')?.imageUrl || '',
    createdAt: '2024-04-15T18:30:00.000Z',
    totalViews: 3421,
    dailyViews: 210,
  },
  {
    id: 'seller-5',
    isSellerOffer: true,
    model: 'HP Spectre x360 14',
    modelId: 'spectre-x360-14',
    serialNumbers: ['ZXCVBNMASDFG'],
    price: 130000,
    quantity: 1,
    status: 'EXPIRED',
    rank: 8,
    rank1Price: 125000,
    condition: 'B',
    imageUrl: PlaceHolderImages.find(p => p.id === 'laptop-2')?.imageUrl || '',
    createdAt: '2024-04-10T12:00:00.000Z',
    totalViews: 543,
    dailyViews: 21,
  },
  {
    id: 'seller-6',
    isSellerOffer: true,
    model: 'HP Spectre x360 14',
    modelId: 'spectre-x360-14',
    serialNumbers: Array.from({length: 4}, (_, i) => `BNM12345678${i}`),
    price: 128000,
    quantity: 4,
    rank: 6,
    rank1Price: 125000,
    status: 'ACTIVE',
    condition: 'A',
    imageUrl: PlaceHolderImages.find(p => p.id === 'laptop-2')?.imageUrl || '',
    createdAt: '2024-05-23T10:00:00.000Z',
    totalViews: 321,
    dailyViews: 50,
  },
  {
    id: 'seller-7',
    isSellerOffer: true,
    model: 'HP Spectre x360 14',
    modelId: 'spectre-x360-14',
    serialNumbers: Array.from({length: 6}, (_, i) => `VBN98765432${i}`),
    price: 129000,
    quantity: 6,
    rank: 7,
    rank1Price: 125000,
    status: 'ACTIVE',
    condition: 'A',
    imageUrl: PlaceHolderImages.find(p => p.id === 'laptop-2')?.imageUrl || '',
    createdAt: '2024-05-24T15:30:00.000Z',
    totalViews: 123,
    dailyViews: 30,
  },

  // Competitor Offers for MacBook Pro 16" M3 Max
  {
    id: 'comp-mbp16-1', isSellerOffer: false, model: 'MacBook Pro 16" M3 Max', modelId: 'mbp-16-m3', serialNumbers: ['COMP001'],
    price: 275000, rank: 1, rank1Price: 275000, status: 'ACTIVE', condition: 'A',
    imageUrl: PlaceHolderImages.find(p => p.id === 'laptop-1')?.imageUrl || '', createdAt: '2024-05-22T10:00:00.000Z',
  },
  {
    id: 'comp-mbp16-2', isSellerOffer: false, model: 'MacBook Pro 16" M3 Max', modelId: 'mbp-16-m3', serialNumbers: ['COMP002'],
    price: 278000, rank: 2, rank1Price: 275000, status: 'ACTIVE', condition: 'A',
    imageUrl: PlaceHolderImages.find(p => p.id === 'laptop-1')?.imageUrl || '', createdAt: '2024-05-22T11:00:00.000Z',
  },
  
  // Competitor Offers for Dell XPS 15 9530
  {
    id: 'comp-xps15-1', isSellerOffer: false, model: 'Dell XPS 15 9530', modelId: 'xps-15-9530', serialNumbers: ['COMP003'],
    price: 152000, rank: 1, rank1Price: 152000, status: 'ACTIVE', condition: 'A',
    imageUrl: PlaceHolderImages.find(p => p.id === 'laptop-2')?.imageUrl || '', createdAt: '2024-05-22T09:30:00.000Z',
  },
  {
    id: 'comp-xps15-2', isSellerOffer: false, model: 'Dell XPS 15 9530', modelId: 'xps-15-9530', serialNumbers: ['COMP004'],
    price: 153000, rank: 2, rank1Price: 152000, status: 'ACTIVE', condition: 'B',
    imageUrl: PlaceHolderImages.find(p => p.id === 'laptop-2')?.imageUrl || '', createdAt: '2024-05-22T09:35:00.000Z',
  },
  {
    id: 'comp-xps15-3', isSellerOffer: false, model: 'Dell XPS 15 9530', modelId: 'xps-15-9530', serialNumbers: ['COMP005'],
    price: 153000, rank: 3, rank1Price: 152000, status: 'ACTIVE', condition: 'A',
    imageUrl: PlaceHolderImages.find(p => p.id === 'laptop-2')?.imageUrl || '', createdAt: '2024-05-22T09:40:00.000Z',
  },
    {
    id: 'comp-xps15-4', isSellerOffer: false, model: 'Dell XPS 15 9530', modelId: 'xps-15-9530', serialNumbers: ['COMP006'],
    price: 154000, rank: 4, rank1Price: 152000, status: 'ACTIVE', condition: 'C',
    imageUrl: PlaceHolderImages.find(p => p.id === 'laptop-2')?.imageUrl || '', createdAt: '2024-05-22T09:45:00.000Z',
  },

  // Competitor Offers for MacBook Pro 14" M3
  {
    id: 'comp-mbp14-1', isSellerOffer: false, model: 'MacBook Pro 14" M3', modelId: 'mbp-14-m3', serialNumbers: ['COMP007'],
    price: 195000, rank: 1, rank1Price: 195000, status: 'ACTIVE', condition: 'A',
    imageUrl: PlaceHolderImages.find(p => p.id === 'laptop-3')?.imageUrl || '', createdAt: '2024-05-22T12:00:00.000Z',
  },
];


export const alerts: Alert[] = [
    {
        id: 'alert-3',
        type: 'NEW_OFFER',
        message: 'Your new listing for HP Spectre x360 14 is now active.',
        createdAt: new Date(Date.now() - 60000).toISOString(), // 1 minute ago
    },
    {
        id: 'alert-1',
        type: 'RANK_1',
        message: 'Your offer for MacBook Pro 16" is now Rank #1!',
        createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    },
    {
        id: 'alert-2',
        type: 'UNDERCUT',
        message: 'Your Dell XPS 15 offer was undercut by Rs 2,000.',
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    },
    {
        id: 'alert-4',
        type: 'NEW_OFFER',
        message: 'A new listing for MacBook Pro 14" M3 is now active.',
        createdAt: new Date(Date.now() - (2 * 86400000)).toISOString(), // 2 days ago
    },
    {
        id: 'alert-5',
        type: 'UNDERCUT',
        message: 'Your MacBook Pro 16" M3 Max offer was undercut by Rs 1,500.',
        createdAt: new Date(Date.now() - (3 * 86400000)).toISOString(), // 3 days ago
    },
    {
        id: 'alert-6',
        type: 'RANK_1',
        message: 'Congratulations! Your Dell XPS 15 is now the top-ranked offer.',
        createdAt: new Date(Date.now() - (4 * 86400000)).toISOString(), // 4 days ago
    },
    {
        id: 'alert-7',
        type: 'NEW_OFFER',
        message: 'You have successfully listed a new MacBook Air 13" M2.',
        createdAt: new Date(Date.now() - (5 * 86400000)).toISOString(), // 5 days ago
    },
    {
        id: 'alert-8',
        type: 'UNDERCUT',
        message: 'A competitor has lowered their price on the HP Spectre x360 14.',
        createdAt: new Date(Date.now() - (6 * 86400000)).toISOString(), // 6 days ago
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

export const activeProductsData = [
    { month: 'Jan', count: 18 },
    { month: 'Feb', count: 17 },
    { month: 'Mar', count: 20 },
    { month: 'Apr', count: 18 },
    { month: 'May', count: 22 },
    { month: 'Jun', count: 25 },
];

export const stats = {
    averageRank: 2.1,
    soldVsWithdrawn: {
        sold: 23,
        withdrawn: 5,
    },
    totalActiveOffers: sellerOffers.filter(o => o.status === 'ACTIVE' && o.isSellerOffer).length,
    totalLaptopsSold: 23,
    lifetimeRevenue: 2920000,
};
