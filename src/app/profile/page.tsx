
"use client";

import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Edit, LogOut } from 'lucide-react';
import { mockOrders, products } from '@/lib/mock-data';
import type { Order, CartItem } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function ProfilePage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [userOrders, setUserOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/profile');
    } else if (user) {
      // Filter orders based on the current user's ID
      const fetchedOrders = mockOrders.filter(order => order.userId === user.uid).map(order => ({
        ...order,
        items: order.items.map(item => {
            const product = products.find(p => p.id === item.productId);
            // This assertion is risky if a product can be deleted, but we'll assume it exists for now.
            return { product: product!, quantity: item.quantity };
        }).filter(item => item.product) as CartItem[],
      }));
      setUserOrders(fetchedOrders);
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div className="container py-12 text-center">Loading profile...</div>;
  }
  
  const getAvatarFallback = (name: string | null | undefined) => {
    return name ? name.charAt(0).toUpperCase() : <User className="h-5 w-5" />;
  };

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-headline font-bold mb-8">Profil Saya</h1>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                 <AvatarImage src={user.profileData?.avatar} alt={user.name || 'User'} />
                 <AvatarFallback className="text-4xl">{getAvatarFallback(user.name)}</AvatarFallback>
              </Avatar>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>{user.role === 'admin' ? 'Super Admin' : 'Customer'}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center text-sm">
                  <User className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{user.name}</span>
               </div>
               <div className="flex items-center text-sm">
                  <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{user.email}</span>
               </div>
               <Separator />
               <Button variant="outline" className="w-full">
                    <Edit className="mr-2 h-4 w-4" /> Edit Profil
                </Button>
               <Button variant="destructive" className="w-full" onClick={() => { logout(); router.push('/') }}>
                    <LogOut className="mr-2 h-4 w-4" /> Keluar
                </Button>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Riwayat Pesanan</CardTitle>
              <CardDescription>Daftar semua transaksi yang pernah Anda lakukan.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {userOrders.length > 0 ? userOrders.map(order => (
                    <Card key={order.id} className="bg-secondary/50">
                        <CardHeader className="pb-2">
                           <div>
                            <p className="font-semibold">Order #{order.id}</p>
                            <p className="text-sm text-muted-foreground">{new Date(order.date).toLocaleDateString()}</p>
                           </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {order.items.map(item => (
                                    <div key={item.product.id} className="text-sm flex justify-between">
                                        <span>{item.product.title} x {item.quantity}</span>
                                        <span>{formatPrice(item.product.price * item.quantity)}</span>
                                    </div>
                                ))}
                            </div>
                            <Separator className="my-2" />
                            <div className="flex justify-between items-center">
                                <div className="font-semibold">
                                    <span>Total: </span>
                                    <span>{formatPrice(order.total)}</span>
                                </div>
                                <Badge variant={order.status === 'completed' ? 'default' : 'secondary'}>{order.status}</Badge>
                            </div>
                        </CardContent>
                    </Card>
                )) : (
                    <p className="text-muted-foreground text-center py-8">Anda belum memiliki riwayat pesanan.</p>
                )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

    