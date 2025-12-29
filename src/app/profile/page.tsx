
"use client";

import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Edit, LogOut, ShoppingBasket } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Order, OrderItem } from '@/lib/types';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';


const orderFromDoc = (doc: any): Order => {
  const data = doc.data();
  return {
    id: doc.id,
    customerInfo: data.customerInfo,
    items: data.items,
    total: data.total,
    status: data.status,
    timestamp: data.timestamp.toDate(),
    userId: data.userId,
  };
};

export default function ProfilePage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/profile');
      return;
    }

    const fetchOrders = async () => {
      if (!user) return;
      setIsLoadingOrders(true);
      try {
        const ordersRef = collection(db, 'orders');
        const q = query(ordersRef, where('userId', '==', user.uid), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetchedOrders = querySnapshot.docs.map(orderFromDoc);
        setUserOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders: ", error);
      } finally {
        setIsLoadingOrders(false);
      }
    };
    
    if(user) {
        fetchOrders();
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
          <Card className="border-2">
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
               <Button variant="destructive" className="w-full" onClick={() => { logout(); router.push('/') }}>
                    <LogOut className="mr-2 h-4 w-4" /> Keluar
                </Button>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Riwayat Pesanan Saya</CardTitle>
              <CardDescription>Daftar semua transaksi yang pernah Anda lakukan.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {isLoadingOrders ? (
                  <p>Memuat riwayat pesanan...</p>
                ) : userOrders.length > 0 ? userOrders.map(order => (
                    <Card key={order.id} className="bg-secondary/50">
                        <CardHeader className="pb-2 flex-row justify-between items-start">
                           <div>
                            <p className="font-semibold">Order #{order.id.substring(0, 7)}</p>
                            <p className="text-sm text-muted-foreground">{format(order.timestamp, 'PPP', { locale: id })}</p>
                           </div>
                           <Badge variant={order.status === 'completed' ? 'default' : 'secondary'} className="capitalize">{order.status}</Badge>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {order.items.map((item: OrderItem) => (
                                    <div key={item.productId} className="text-sm flex justify-between">
                                        <span>{item.productName} x {item.quantity}</span>
                                        <span>{formatPrice(item.price * item.quantity)}</span>
                                    </div>
                                ))}
                            </div>
                            <Separator className="my-2" />
                            <div className="flex justify-between items-center font-semibold">
                                <span>Total: </span>
                                <span>{formatPrice(order.total)}</span>
                            </div>
                        </CardContent>
                    </Card>
                )) : (
                    <div className="text-center py-12 border-2 border-dashed rounded-lg">
                        <ShoppingBasket className="mx-auto h-12 w-12 text-muted-foreground/50" />
                        <p className="mt-4 text-muted-foreground">Anda belum memiliki riwayat pesanan.</p>
                    </div>
                )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
