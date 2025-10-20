
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Pencil, Trash2, Eye, EyeOff, Copy } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import type { SellerOffer } from '@/lib/types';
import { cn } from '@/lib/utils';

type OffersTableProps = {
  offers: SellerOffer[];
};

export function OffersTable({ offers }: OffersTableProps) {
  const { toast } = useToast();
  const [editingOffer, setEditingOffer] = useState<SellerOffer | null>(null);
  const [deletingOffer, setDeletingOffer] = useState<SellerOffer | null>(null);
  const [hidingOffer, setHidingOffer] = useState<SellerOffer | null>(null);
  const [newPrice, setNewPrice] = useState('');

  const handleEditClick = (offer: SellerOffer) => {
    setEditingOffer(offer);
    setNewPrice(String(offer.price));
  };
  
  const handleDeleteClick = (offer: SellerOffer) => {
    setDeletingOffer(offer);
  };

  const handleHideClick = (offer: SellerOffer) => {
    setHidingOffer(offer);
  };
  
  const handleCopyClick = (offer: SellerOffer) => {
    localStorage.setItem('copiedOffer', JSON.stringify(offer));
    toast({
        title: "Offer Copied",
        description: `Details for ${offer.model} have been copied for auto-fill.`,
    });
  };

  const handlePriceUpdate = () => {
    if (editingOffer && newPrice) {
      console.log(`Updating price for ${editingOffer.id} to ${newPrice}`);
      toast({
        title: "Offer Updated",
        description: `Price for ${editingOffer.model} has been updated.`,
      });
      setEditingOffer(null);
    }
  };

  const handleDeleteConfirm = () => {
    if(deletingOffer) {
      console.log(`Deleting offer ${deletingOffer.id}`);
       toast({
        title: "Offer Deleted",
        description: `Offer for ${deletingOffer.model} has been deleted.`,
        variant: 'destructive'
      });
      setDeletingOffer(null);
    }
  };
  
  const handleHideConfirm = () => {
    if(hidingOffer) {
      console.log(`Hiding offer ${hidingOffer.id}`);
       toast({
        title: "Offer Hidden",
        description: `Offer for ${hidingOffer.model} is now hidden from listings.`,
      });
      setHidingOffer(null);
    }
  };


  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <TooltipProvider>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Model & Serial</TableHead>
              <TableHead className="text-right">Offered Price</TableHead>
              <TableHead className="text-center">Rank</TableHead>
              <TableHead className="text-right">Rank #1 Price</TableHead>
              <TableHead className="text-center">Views</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="w-[140px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offers.map((offer) => (
              <TableRow key={offer.id}>
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
                  <div className="font-medium">{offer.model}</div>
                  <div className="text-sm text-muted-foreground font-mono">{offer.serial}</div>
                </TableCell>
                <TableCell className="text-right font-medium">{formatCurrency(offer.price)}</TableCell>
                <TableCell className="text-center">
                  <Badge variant={offer.rank === 1 ? 'default' : 'secondary'} className={cn(offer.rank === 1 && 'bg-amber-500 hover:bg-amber-600 text-white')}>
                    #{offer.rank}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{formatCurrency(offer.rank1Price)}</TableCell>
                <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                        <Eye className="h-4 w-4" />
                        <span>{offer.totalViews ?? 0}</span>
                        <span className="text-xs text-green-500">(+{offer.dailyViews ?? 0})</span>
                    </div>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant={
                    offer.status === 'ACTIVE' ? 'secondary' : offer.status === 'SOLD' ? 'default' : 'destructive'
                  } className={cn(offer.status === 'SOLD' && 'bg-green-600 hover:bg-green-700')}>
                    {offer.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                   <div className="flex items-center justify-end gap-0.5">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEditClick(offer)}>
                                    <Pencil className="h-4 w-4" />
                                    <span className="sr-only">Edit</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Edit</TooltipContent>
                        </Tooltip>
                         <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleHideClick(offer)}>
                                    <EyeOff className="h-4 w-4" />
                                    <span className="sr-only">Hide</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Hide</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDeleteClick(offer)}>
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Delete</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Delete</TooltipContent>
                        </Tooltip>
                         <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleCopyClick(offer)}>
                                    <Copy className="h-4 w-4" />
                                    <span className="sr-only">Copy</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Copy</TooltipContent>
                        </Tooltip>
                   </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Price Dialog */}
      <Dialog open={!!editingOffer} onOpenChange={() => setEditingOffer(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-headline">Edit Offer Price</DialogTitle>
            <DialogDescription>
              Update the price for {editingOffer?.model} ({editingOffer?.serial}).
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                New Price
              </Label>
              <div className="col-span-3 relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">Rs</span>
                <Input
                  id="price"
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingOffer(null)}>Cancel</Button>
            <Button onClick={handlePriceUpdate}>Update Price</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Offer Alert Dialog */}
      <AlertDialog open={!!deletingOffer} onOpenChange={() => setDeletingOffer(null)}>
          <AlertDialogContent>
              <AlertDialogHeader>
                  <AlertDialogTitle className="font-headline">Are you sure you want to delete?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete your offer for the {deletingOffer?.model}. This action cannot be undone.
                  </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive hover:bg-destructive/90">
                    Yes, Delete Offer
                  </AlertDialogAction>
              </AlertDialogFooter>
          </AlertDialogContent>
      </AlertDialog>

      {/* Hide Offer Alert Dialog */}
      <AlertDialog open={!!hidingOffer} onOpenChange={() => setHidingOffer(null)}>
          <AlertDialogContent>
              <AlertDialogHeader>
                  <AlertDialogTitle className="font-headline">Are you sure you want to hide?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will hide your offer for the {hidingOffer?.model} from public listings. You can unhide it later.
                  </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleHideConfirm}>
                    Yes, Hide Offer
                  </AlertDialogAction>
              </AlertDialogFooter>
          </AlertDialogContent>
      </AlertDialog>
    </TooltipProvider>
  );
}

    