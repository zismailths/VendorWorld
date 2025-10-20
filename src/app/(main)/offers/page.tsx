import { PageHeader } from "@/components/shared/page-header";
import { OffersTable } from "@/components/offers/offers-table";
import { sellerOffers } from "@/lib/data";

export default function OffersPage() {
  return (
    <>
      <PageHeader
        title="Offer Management"
        description="View, edit, and manage all your product offers."
      />
      <main className="p-6 pt-0">
        <OffersTable offers={sellerOffers} />
      </main>
    </>
  );
}
