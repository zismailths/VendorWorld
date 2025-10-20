
"use client";

import React from 'react';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { SellerOffer } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

type CompetitorsTableProps = {
  offers: SellerOffer[];
};

export function CompetitorsTable({ offers }: CompetitorsTableProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card>
        <CardHeader>
            <CardTitle>Top 10 Competitors</CardTitle>
            <CardDescription>
                Here are the top offers for this product model.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="border rounded-lg">
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[60px] text-center">Rank</TableHead>
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead>Offer</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {offers.map((offer) => (
                    <TableRow key={offer.id}>
                         <TableCell className="text-center">
                            <Badge variant={offer.rank === 1 ? 'default' : 'secondary'} className={cn(offer.rank === 1 && 'bg-amber-500 hover:bg-amber-600 text-white')}>
                                #{offer.rank}
                            </Badge>
                        </TableCell>
                        <TableCell>
                        <Image
                            src={offer.imageUrl}
                            alt={offer.model}
                            width={64}
                            height={48}
                            className="rounded-md object-cover"
                            data-ai-hint="modern laptop"
                        />
                        </TableCell>
                        <TableCell>
                        <div className="font-medium">Competitive Offer</div>
                        <div className="text-sm text-muted-foreground">{offer.condition} Grade</div>
                        </TableCell>
                        <TableCell className="text-right font-medium">{formatCurrency(offer.price)}</TableCell>
                    </TableRow>
                    ))}
                    {offers.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={4} className="h-24 text-center">
                                No competitor data available for this product yet.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                </Table>
            </div>
      </CardContent>
    </Card>
  );
}
