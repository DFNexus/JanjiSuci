"use client";

import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { categories, javaLocations, vendors } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      toast({
        title: 'Akses Ditolak',
        description: 'Anda tidak memiliki izin untuk mengakses halaman ini.',
        variant: 'destructive',
      });
      router.push('/');
    }
  }, [user, loading, router, toast]);

  if (loading || !user || user.role !== 'admin') {
    return <div className="container py-12 text-center">Memverifikasi akses...</div>;
  }
  
  const handleAddVendor = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({ title: 'Sukses', description: 'Vendor baru berhasil ditambahkan (mock).' });
    (e.target as HTMLFormElement).reset();
  };
  
  const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({ title: 'Sukses', description: 'Produk baru berhasil ditambahkan (mock).' });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-headline font-bold mb-8">Admin Dashboard</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tambah Vendor Baru</CardTitle>
            <CardDescription>Vendor tidak bisa mendaftar sendiri.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddVendor} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="vendorName">Nama Vendor</Label>
                <Input id="vendorName" placeholder="Contoh: Gedung Pernikahan Mewah" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vendorCategory">Kategori</Label>
                <Select name="vendorCategory" required>
                  <SelectTrigger><SelectValue placeholder="Pilih Kategori" /></SelectTrigger>
                  <SelectContent>{categories.map(c => <SelectItem key={c.slug} value={c.name}>{c.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vendorLocation">Lokasi</Label>
                <Select name="vendorLocation" required>
                  <SelectTrigger><SelectValue placeholder="Pilih Lokasi" /></SelectTrigger>
                  <SelectContent>{javaLocations.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vendorWhatsapp">Nomor WhatsApp</Label>
                <Input id="vendorWhatsapp" placeholder="+6281234567890" required />
              </div>
              <Button type="submit" className="w-full">Tambah Vendor</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tambah Produk Baru</CardTitle>
            <CardDescription>Tambahkan produk untuk vendor yang sudah ada.</CardDescription>
          </CardHeader>
          <CardContent>
             <form onSubmit={handleAddProduct} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="productVendor">Vendor</Label>
                <Select name="productVendor" required>
                  <SelectTrigger><SelectValue placeholder="Pilih Vendor" /></SelectTrigger>
                  <SelectContent>{vendors.map(v => <SelectItem key={v.id} value={v.id}>{v.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="productTitle">Nama Produk/Layanan</Label>
                <Input id="productTitle" placeholder="Contoh: Paket Foto & Video" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="productPrice">Harga</Label>
                <Input id="productPrice" type="number" placeholder="Contoh: 8000000" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="productDescription">Deskripsi</Label>
                <Textarea id="productDescription" placeholder="Deskripsi singkat produk/layanan" required />
              </div>
              <Button type="submit" className="w-full">Tambah Produk</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
