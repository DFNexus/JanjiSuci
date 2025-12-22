"use client";

import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { categories, javaLocations } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';
import { addVendor, getVendors } from '@/services/vendor-service';
import { addProduct } from '@/services/product-service';
import type { Vendor } from '@/lib/types';

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  useEffect(() => {
    if (user && user.role === 'admin') {
      const fetchVendors = async () => {
        const vendorList = await getVendors();
        setVendors(vendorList);
      };
      fetchVendors();
    }
  }, [user]);

  if (loading || !user || user.role !== 'admin') {
    return <div className="container py-12 text-center">Memverifikasi akses...</div>;
  }
  
  const handleAddVendor = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const vendorData = {
      name: formData.get('vendorName') as string,
      category: formData.get('vendorCategory') as string,
      location: formData.get('vendorLocation') as string,
      whatsappNumber: formData.get('vendorWhatsapp') as string,
    };
    
    try {
      const newVendor = await addVendor(vendorData);
      setVendors(prev => [...prev, newVendor]);
      toast({ title: 'Sukses', description: 'Vendor baru berhasil ditambahkan.' });
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Error adding vendor: ", error);
      toast({ title: 'Error', description: 'Gagal menambahkan vendor.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const productData = {
        vendorId: formData.get('productVendor') as string,
        category: vendors.find(v => v.id === formData.get('productVendor'))?.category || '',
        title: formData.get('productTitle') as string,
        price: Number(formData.get('productPrice')),
        description: formData.get('productDescription') as string,
        location: vendors.find(v => v.id === formData.get('productVendor'))?.location || '',
        images: ['https://picsum.photos/seed/newproduct/600/400'], // Placeholder image
    };

    try {
      await addProduct(productData);
      toast({ title: 'Sukses', description: 'Produk baru berhasil ditambahkan.' });
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Error adding product: ", error);
      toast({ title: 'Error', description: 'Gagal menambahkan produk.', variant: 'destructive' });
    } finally {
        setIsSubmitting(false);
    }
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
                <Input id="vendorName" name="vendorName" placeholder="Contoh: Gedung Pernikahan Mewah" required />
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
                <Input id="vendorWhatsapp" name="vendorWhatsapp" placeholder="+6281234567890" required />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Menambahkan...' : 'Tambah Vendor'}
              </Button>
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
                <Input id="productTitle" name="productTitle" placeholder="Contoh: Paket Foto & Video" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="productPrice">Harga</Label>
                <Input id="productPrice" name="productPrice" type="number" placeholder="Contoh: 8000000" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="productDescription">Deskripsi</Label>
                <Textarea id="productDescription" name="productDescription" placeholder="Deskripsi singkat produk/layanan" required />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Menambahkan...' : 'Tambah Produk'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
