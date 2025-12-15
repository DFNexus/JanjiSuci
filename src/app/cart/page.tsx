"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatPrice } from '@/lib/utils';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();
  const router = useRouter();

  if (cartCount === 0) {
    return (
      <div className="container flex flex-col items-center justify-center min-h-[60vh] text-center">
        <ShoppingCart className="w-24 h-24 text-muted-foreground/30 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Keranjang Anda Kosong</h1>
        <p className="text-muted-foreground mb-6">
          Sepertinya Anda belum menambahkan layanan apa pun.
        </p>
        <Link href="/products">
          <Button>Mulai Belanja</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-headline font-bold mb-8">Keranjang Belanja</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map(({ product, quantity }) => (
            <Card key={product.id} className="overflow-hidden">
              <CardContent className="p-4 flex gap-4 items-start">
                <div className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>
                <div className="flex-grow">
                  <Link href={`/products/${product.id}`}>
                    <h3 className="font-bold hover:underline">{product.title}</h3>
                  </Link>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                  <p className="text-lg font-semibold text-primary mt-1">
                    {formatPrice(product.price)}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                   <div className="flex items-center gap-2">
                        <Input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => updateQuantity(product.id, parseInt(e.target.value))}
                            className="h-9 w-16 text-center"
                        />
                         <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(product.id)}
                            aria-label="Remove item"
                        >
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                   </div>
                  <p className="font-semibold">{formatPrice(product.price * quantity)}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Ringkasan Pesanan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal ({cartCount} item)</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Biaya Layanan</span>
                <span>{formatPrice(0)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Grand Total</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => router.push('/checkout')}>
                Lanjutkan ke Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
