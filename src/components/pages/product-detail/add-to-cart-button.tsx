"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar as CalendarIcon, ShoppingCart } from 'lucide-react';
import { format } from 'date-fns';

import { useAuth } from '@/context/auth-context';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/lib/types';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [bookingDate, setBookingDate] = useState<Date | undefined>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useAuth();
  const { addToCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();

  const handleAddToCartClick = () => {
    if (!user) {
      toast({
        title: "Login Diperlukan",
        description: "Anda harus login untuk menambahkan item ke keranjang.",
        variant: "destructive",
      });
      router.push('/login?redirect=/products/' + product.id);
      return;
    }
    setIsDialogOpen(true);
  };

  const handleConfirmAddToCart = () => {
    if (!bookingDate) {
       toast({
        title: "Tanggal Diperlukan",
        description: "Silakan pilih tanggal pemesanan.",
        variant: "destructive",
      });
      return;
    }

    addToCart(product, quantity, bookingDate);
    toast({
      title: "Berhasil Ditambahkan",
      description: `${product.title} telah ditambahkan ke keranjang Anda.`,
    });
    setIsDialogOpen(false);
    setBookingDate(undefined);
  };

  return (
    <>
      <div className="flex gap-2">
        <Input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-20"
          aria-label="Quantity"
        />
        <Button onClick={handleAddToCartClick} className="flex-1">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Tambah ke Keranjang
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Pilih Tanggal Pemesanan</DialogTitle>
            <DialogDescription>
              Pilih tanggal untuk layanan "{product.title}".
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 flex justify-center">
            <Calendar
              mode="single"
              selected={bookingDate}
              onSelect={setBookingDate}
              disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
              initialFocus
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Batal
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleConfirmAddToCart}>
              Konfirmasi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
