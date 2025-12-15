"use client";

import { useCart } from '@/context/cart-context';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatPrice } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Banknote } from 'lucide-react';

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      router.push('/login?redirect=/checkout');
    }
    if (cartItems.length === 0) {
      router.push('/products');
    }
  }, [user, cartItems, router]);

  const handlePayment = () => {
    // Mock payment processing
    toast({
      title: "Pembayaran Berhasil!",
      description: "Pesanan Anda telah dikonfirmasi. Terima kasih!",
    });
    clearCart();
    router.push('/profile');
  };

  if (!user || cartItems.length === 0) {
    return <div className="container py-12 text-center">Loading...</div>;
  }

  return (
    <div className="container py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-headline font-bold mb-8 text-center">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-8">
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
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Informasi Pembayaran</CardTitle>
              <CardDescription>
                Silakan lakukan pembayaran melalui transfer bank.
              </CardDescription>
            </CardHeader>
            <CardContent>
                <Alert>
                    <Banknote className="h-4 w-4" />
                    <AlertTitle>Transfer Bank</AlertTitle>
                    <AlertDescription className="space-y-2 mt-2">
                        <p><strong>Bank Janji Suci (BCA)</strong></p>
                        <p>No. Rekening: <strong>123-456-7890</strong></p>
                        <p>Atas Nama: <strong>PT Janji Suci Jaya</strong></p>
                        <p>Total: <strong className="text-primary">{formatPrice(cartTotal)}</strong></p>
                    </AlertDescription>
                </Alert>
                <p className="text-xs text-muted-foreground mt-4">
                Pesanan Anda akan diproses setelah kami menerima bukti pembayaran. Harap konfirmasi pembayaran Anda ke admin kami.
                </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handlePayment}>
                Saya Sudah Membayar
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
