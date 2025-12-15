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

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth();
  const { addToCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (!user) {
      toast({
        title: "Login Diperlukan",
        description: "Anda harus login untuk menambahkan item ke keranjang.",
        variant: "destructive",
      });
      router.push('/login');
      return;
    }

    addToCart(product, quantity);
    toast({
      title: "Berhasil Ditambahkan",
      description: `${product.title} telah ditambahkan ke keranjang Anda.`,
    });
  };

  return (
    <div className="flex gap-2">
      <Input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
        className="w-20"
        aria-label="Quantity"
      />
      <Button onClick={handleAddToCart} className="flex-1">
        <ShoppingCart className="mr-2 h-4 w-4" />
        Tambah ke Keranjang
      </Button>
    </div>
  );
}
