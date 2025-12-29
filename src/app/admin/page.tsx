
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
import { addVendor, getVendors, deleteVendor, updateVendor } from '@/services/vendor-service';
import { addProduct, getProducts, deleteProduct, updateProduct } from '@/services/product-service';
import type { Vendor, Product, VendorInput, ProductInput } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Edit } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { EditVendorDialog } from '@/components/pages/admin/edit-vendor-dialog';
import { EditProductDialog } from '@/components/pages/admin/edit-product-dialog';

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const fetchAllData = async () => {
    setIsLoadingData(true);
    try {
        const [vendorList, productList] = await Promise.all([getVendors(), getProducts()]);
        setVendors(vendorList);
        setProducts(productList);
    } catch (error) {
        console.error("Failed to fetch data:", error);
        toast({ title: 'Error', description: 'Gagal memuat data dari database.', variant: 'destructive' });
    } finally {
        setIsLoadingData(false);
    }
  };

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      toast({
        title: 'Akses Ditolak',
        description: 'Anda tidak memiliki izin untuk mengakses halaman ini.',
        variant: 'destructive',
      });
      router.push('/');
    } else if (user) {
        fetchAllData();
    }
  }, [user, loading, router, toast]);


  if (loading || !user || user.role !== 'admin') {
    return <div className="container py-12 text-center">Memverifikasi akses...</div>;
  }
  
  const handleAddVendor = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const vendorData: VendorInput = {
      name: formData.get('vendorName') as string,
      category: formData.get('vendorCategory') as string,
      location: formData.get('vendorLocation') as string,
      whatsappNumber: formData.get('vendorWhatsapp') as string,
    };
    
    try {
      await addVendor(vendorData);
      toast({ title: 'Sukses', description: 'Vendor baru berhasil ditambahkan.' });
      (e.target as HTMLFormElement).reset();
      fetchAllData();
    } catch (error) {
      console.error("Error adding vendor: ", error);
      toast({ title: 'Error', description: 'Gagal menambahkan vendor.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditVendor = async (id: string, vendorData: Partial<VendorInput>) => {
    try {
      await updateVendor(id, vendorData);
      toast({ title: 'Sukses', description: 'Vendor berhasil diperbarui.'});
      fetchAllData();
    } catch (error) {
      console.error("Error updating vendor:", error);
      toast({ title: 'Error', description: 'Gagal memperbarui vendor.', variant: 'destructive' });
    }
  }
  
  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target as HTMLFormElement);
    
    const vendorId = formData.get('productVendor') as string;
    const selectedVendor = vendors.find(v => v.id === vendorId);

    if (!selectedVendor) {
        toast({ title: 'Error', description: 'Vendor tidak ditemukan.', variant: 'destructive' });
        setIsSubmitting(false);
        return;
    }

    const productData: ProductInput = {
        vendorId: vendorId,
        title: formData.get('productTitle') as string,
        price: Number(formData.get('productPrice')),
        description: formData.get('productDescription') as string,
        category: selectedVendor.category,
    };

    try {
      await addProduct(productData);
      toast({ title: 'Sukses', description: 'Produk baru berhasil ditambahkan.' });
      (e.target as HTMLFormElement).reset();
      fetchAllData();
    } catch (error) {
      console.error("Error adding product: ", error);
      toast({ title: 'Error', description: 'Gagal menambahkan produk.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditProduct = async (id: string, productData: Partial<ProductInput>) => {
    try {
      await updateProduct(id, productData);
      toast({ title: 'Sukses', description: 'Produk berhasil diperbarui.'});
      fetchAllData();
    } catch (error) {
      console.error("Error updating product:", error);
      toast({ title: 'Error', description: 'Gagal memperbarui produk.', variant: 'destructive' });
    }
  };

  const handleDeleteVendor = async (id: string) => {
    try {
      await deleteVendor(id);
      toast({ title: 'Sukses', description: 'Vendor berhasil dihapus.' });
      fetchAllData();
    } catch (error) {
       console.error("Error deleting vendor: ", error);
       toast({ title: 'Error', description: 'Gagal menghapus vendor.', variant: 'destructive' });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id);
      toast({ title: 'Sukses', description: 'Produk berhasil dihapus.' });
      fetchAllData();
    } catch (error) {
       console.error("Error deleting product: ", error);
       toast({ title: 'Error', description: 'Gagal menghapus produk.', variant: 'destructive' });
    }
  };

  return (
    <div className="container py-12 space-y-12">
      <h1 className="text-4xl font-headline font-bold">Admin Dashboard</h1>
      
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
                <Label htmlFor="productVendor">Pilih Vendor yang Sudah Ada</Label>
                <Select name="productVendor" required disabled={vendors.length === 0}>
                  <SelectTrigger><SelectValue placeholder={vendors.length > 0 ? "Pilih Vendor" : "Belum ada vendor"} /></SelectTrigger>
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
              <Button type="submit" className="w-full" disabled={isSubmitting || vendors.length === 0}>
                {isSubmitting ? 'Menambahkan...' : 'Tambah Produk'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-8">
        <Card>
            <CardHeader>
                <CardTitle>Daftar Vendor</CardTitle>
                <CardDescription>Kelola semua vendor yang terdaftar di platform.</CardDescription>
            </CardHeader>
            <CardContent>
                <VendorTable vendors={vendors} onDelete={handleDeleteVendor} onEdit={handleEditVendor} isLoading={isLoadingData} />
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Daftar Produk</CardTitle>
                <CardDescription>Kelola semua produk atau layanan yang ditawarkan.</CardCardDescription>
            </CardHeader>
            <CardContent>
                <ProductTable products={products} allVendors={vendors} onDelete={handleDeleteProduct} onEdit={handleEditProduct} isLoading={isLoadingData} />
            </CardContent>
        </Card>
      </div>

    </div>
  );
}

function VendorTable({ vendors, onDelete, onEdit, isLoading }: { vendors: Vendor[], onDelete: (id: string) => void, onEdit: (id: string, data: Partial<VendorInput>) => void, isLoading: boolean }) {
    if (isLoading) return <p>Memuat data vendor...</p>
    if (vendors.length === 0) return <p className="text-muted-foreground text-center">Belum ada vendor.</p>

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Lokasi</TableHead>
                    <TableHead>WhatsApp</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {vendors.map(vendor => (
                    <TableRow key={vendor.id}>
                        <TableCell className="font-medium">{vendor.name}</TableCell>
                        <TableCell>{vendor.category}</TableCell>
                        <TableCell>{vendor.location}</TableCell>
                        <TableCell>{vendor.whatsappNumber}</TableCell>
                        <TableCell className="text-right flex items-center justify-end gap-2">
                           <EditVendorDialog vendor={vendor} onSave={(data) => onEdit(vendor.id, data)} />
                           <DeleteButton onConfirm={() => onDelete(vendor.id)} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

function ProductTable({ products, allVendors, onDelete, onEdit, isLoading }: { products: Product[], allVendors: Vendor[], onDelete: (id: string) => void, onEdit: (id: string, data: Partial<ProductInput>) => void, isLoading: boolean }) {
    const getVendorName = (vendorId: string) => {
        return allVendors.find(v => v.id === vendorId)?.name || 'N/A';
    }

    if (isLoading) return <p>Memuat data produk...</p>
    if (products.length === 0) return <p className="text-muted-foreground text-center">Belum ada produk.</p>

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nama Produk</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Harga</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map(product => (
                    <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.title}</TableCell>
                        <TableCell>{getVendorName(product.vendorId)}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{formatPrice(product.price)}</TableCell>
                        <TableCell className="text-right flex items-center justify-end gap-2">
                           <EditProductDialog product={product} allVendors={allVendors} onSave={(data) => onEdit(product.id, data)}/>
                           <DeleteButton onConfirm={() => onDelete(product.id)} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

function DeleteButton({ onConfirm }: { onConfirm: () => void }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            Tindakan ini tidak bisa dibatalkan. Ini akan menghapus data secara permanen dari server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-destructive hover:bg-destructive/90">Hapus</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
