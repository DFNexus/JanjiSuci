
"use client";

import { useCart } from '@/context/cart-context';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatPrice } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { CustomerInfo } from '@/lib/types';
import { createOrder } from '@/services/order-service';

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user) {
      toast({ title: "Login Diperlukan", description: "Silakan login untuk melanjutkan.", variant: "destructive" });
      router.push('/login?redirect=/checkout');
    }
    if (cartItems.length === 0) {
      router.push('/products');
    }
  }, [user, cartItems, router, toast]);

  const handleSubmitOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const customerInfo: CustomerInfo = {
      fullName: formData.get('fullName') as string,
      phoneNumber: formData.get('phoneNumber') as string,
      email: user.email || '',
      shippingAddress: formData.get('address') as string,
    };

    try {
      await createOrder({ customerInfo, cartItems, userId: user.uid, total: cartTotal });
      toast({
        title: "Pesanan Berhasil Diterima!",
        description: "Pesanan Anda telah kami terima dan sedang diproses.",
      });
      clearCart();
      router.push('/profile');
    } catch (error) {
      console.error("Error creating order:", error);
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal membuat pesanan. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user || cartItems.length === 0) {
    return <div className="container py-12 text-center">Loading...</div>;
  }

  return (
    <div className="container py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-headline font-bold mb-8 text-center">Checkout</h1>
      <form onSubmit={handleSubmitOrder} className="grid md:grid-cols-2 gap-12">
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Informasi Pengiriman</CardTitle>
                    <CardDescription>Masukkan detail Anda untuk pengiriman dan kontak.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Nama Lengkap</Label>
                        <Input id="fullName" name="fullName" defaultValue={user.name || ''} required />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Nomor Telepon</Label>
                        <Input id="phoneNumber" name="phoneNumber" type="tel" required />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" defaultValue={user.email || ''} required readOnly/>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="address">Alamat Pengiriman</Label>
                        <Textarea id="address" name="address" required />
                    </div>
                </CardContent>
            </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Ringkasan Pesanan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {cartItems.map(({ product, quantity }) => (
                  <div key={product.id} className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{product.title}</p>
                      <p className="text-sm text-muted-foreground">Qty: {quantity}</p>
                    </div>
                    <p className="font-medium">{formatPrice(product.price * quantity)}</p>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>{formatPrice(cartTotal)}</p>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <p>Total</p>
                  <p>{formatPrice(cartTotal)}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Memproses Pesanan...' : `Bayar & Pesan (${formatPrice(cartTotal)})`}
              </Button>
            </CardFooter>
          </Card>
           <p className="text-xs text-muted-foreground mt-4 text-center">
                Dengan melanjutkan, Anda menyetujui Syarat & Ketentuan kami. Pembayaran akan disimulasikan.
            </p>
        </div>
      </form>
    </div>
  );
}
