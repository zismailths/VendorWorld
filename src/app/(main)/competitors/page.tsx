
"use client";

import { useState } from "react";
import Image from "next/image";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, RefreshCw, ChevronsUpDown } from "lucide-react";
import { sellerOffers } from "@/lib/data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { SellerOffer } from "@/lib/types";
import { CompetitorsTable } from "@/components/competitors/competitors-table";

export default function CompetitorsPage() {
  const [selectedOffer, setSelectedOffer] = useState<SellerOffer | null>(
    sellerOffers.find((o) => o.status === "ACTIVE") || null
  );

  const activeOffers = sellerOffers.filter((o) => o.isSellerOffer && o.status === "ACTIVE");
  
  const competitorOffers = selectedOffer
    ? sellerOffers.filter(
        (o) => o.modelId === selectedOffer.modelId && !o.isSellerOffer
      ).sort((a,b) => a.rank - b.rank).slice(0, 10)
    : [];

  return (
    <>
      <PageHeader
        title="Competitors"
        description="Analyze the competitive landscape for your products."
      >
        <Button variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </PageHeader>
      <main className="p-6 pt-0 space-y-6">
        {!selectedOffer && (
             <Card>
                <CardHeader>
                    <CardTitle>Select Your Product</CardTitle>
                    <CardDescription>
                    Choose one of your active offers to see how it stacks up against the competition.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full md:w-[300px] justify-between">
                        <span>{selectedOffer ? selectedOffer.model : "Select an offer"}</span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full md:w-[300px]">
                        {activeOffers.map((offer) => (
                        <DropdownMenuItem key={offer.id} onSelect={() => setSelectedOffer(offer)}>
                            {offer.model} ({offer.serial})
                        </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                    </DropdownMenu>
                </CardContent>
             </Card>
        )}

        {selectedOffer && (
          <>
            <Card>
                <CardHeader className="flex-row items-start justify-between">
                  <div>
                    <CardTitle>Competitive Analysis for: <span className="text-primary">{selectedOffer.model}</span></CardTitle>
                    <CardDescription>
                    Your current rank is <span className="font-bold text-primary">#{selectedOffer.rank}</span> with a price of <span className="font-bold text-primary">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(selectedOffer.price)}</span>.
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="justify-between w-auto">
                        <span>Change Product</span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {activeOffers.map((offer) => (
                        <DropdownMenuItem key={offer.id} onSelect={() => setSelectedOffer(offer)}>
                            {offer.model} ({offer.serial})
                        </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                    </DropdownMenu>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left p-8 bg-muted/50 rounded-lg">
                        <Image src={selectedOffer.imageUrl} alt={selectedOffer.model} width={150} height={150} className="rounded-lg object-cover" data-ai-hint="modern laptop" />
                        <div>
                            <h3 className="text-2xl font-bold text-primary">Rank #{selectedOffer.rank}</h3>
                            <p className="text-lg font-semibold">Your Price: {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(selectedOffer.price)}</p>
                            <p className="text-muted-foreground">The Rank #1 price for this model is <span className="font-semibold">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(selectedOffer.rank1Price)}</span>.</p>
                             <p className="text-muted-foreground">You are <span className="font-semibold text-destructive">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(selectedOffer.price - selectedOffer.rank1Price)}</span> away from the top spot.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <CompetitorsTable offers={competitorOffers} />
          </>
        )}
      </main>
    </>
  );
}
