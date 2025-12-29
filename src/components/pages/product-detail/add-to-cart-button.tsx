
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';

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
  DialogClose,
} from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';

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
      <Button onClick={handleAddToCartClick} className="w-full">
        <ShoppingCart className="mr-2 h-4 w-4" />
        Tambah ke Keranjang
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Pilih Tanggal Pemesanan</DialogTitle>
            <DialogDescription>
              Pilih tanggal untuk layanan "{product.title}". Tanggal yang dipilih akan ditandai.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 flex justify-center">
            <Calendar
              mode="single"
              selected={bookingDate}
              onSelect={setBookingDate}
              disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
              initialFocus
              className="rounded-md border"
            />
          </div>
           <div className="flex items-center gap-4">
              <label htmlFor="quantity" className="text-sm font-medium">Jumlah:</label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20"
                aria-label="Quantity"
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
