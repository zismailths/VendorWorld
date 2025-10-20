
"use client";

import { PageHeader } from "@/components/shared/page-header";
import { OffersTable } from "@/components/offers/offers-table";
import { sellerOffers } from "@/lib/data";
import type { SellerOffer } from "@/lib/types";

export type GroupedOffer = {
  modelId: string;
  model: string;
  totalQuantity: number;
  imageUrl: string;
  offerIds: string[];
  bestRank: number;
  averagePrice: number;
  rank1Price: number;
  totalViews: number;
  dailyViews: number;
  offers: SellerOffer[];
}

export default function OffersPage() {

  const groupedOffers = sellerOffers
    .filter(offer => offer.isSellerOffer)
    .reduce<Record<string, GroupedOffer>>((acc, offer) => {
      if (!acc[offer.modelId]) {
        acc[offer.modelId] = {
          modelId: offer.modelId,
          model: offer.model,
          totalQuantity: 0,
          imageUrl: offer.imageUrl,
          offerIds: [],
          bestRank: Infinity,
          averagePrice: 0,
          rank1Price: offer.rank1Price,
          totalViews: 0,
          dailyViews: 0,
          offers: [],
        };
      }
      const group = acc[offer.modelId];
      group.totalQuantity += offer.quantity ?? 1;
      group.offerIds.push(offer.id);
      group.offers.push(offer);
      
      if (offer.rank < group.bestRank) {
        group.bestRank = offer.rank;
      }

      group.totalViews += offer.totalViews ?? 0;
      group.dailyViews += offer.dailyViews ?? 0;

      return acc;
    }, {});
  
  // Calculate average price after grouping
  Object.values(groupedOffers).forEach(group => {
    const totalValue = group.offers.reduce((sum, offer) => sum + (offer.price * (offer.quantity ?? 1)), 0);
    group.averagePrice = group.totalQuantity > 0 ? totalValue / group.totalQuantity : 0;
  });

  return (
    <>
      <PageHeader
        title="Your Products"
        description="View, edit, and manage all your product offers."
      />
      <main className="p-6 pt-0">
        <OffersTable groupedOffers={Object.values(groupedOffers)} />
      </main>
    </>
  );
}
