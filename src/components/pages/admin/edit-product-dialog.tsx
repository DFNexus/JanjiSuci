
"use client";

import { useState, useEffect } from 'react';
import { Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { Product, ProductInput, Vendor } from '@/lib/types';
import { categories } from '@/lib/mock-data';

interface EditProductDialogProps {
  product: Product;
  allVendors: Vendor[];
  onSave: (data: Partial<ProductInput>) => void;
}

export function EditProductDialog({ product, allVendors, onSave }: EditProductDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<ProductInput>>({
    title: product.title,
    price: product.price,
    description: product.description,
    vendorId: product.vendorId,
    category: product.category,
  });

  useEffect(() => {
    // When the selected vendor changes, update the category
    const selectedVendor = allVendors.find(v => v.id === formData.vendorId);
    if (selectedVendor && selectedVendor.category !== formData.category) {
        setFormData(prev => ({ ...prev, category: selectedVendor.category }));
    }
  }, [formData.vendorId, allVendors, formData.category]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'price' ? Number(value) : value }));
  };

  const handleSelectChange = (name: keyof ProductInput) => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Edit className="h-4 w-4 text-blue-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Produk</DialogTitle>
          <DialogDescription>
            Lakukan perubahan pada detail produk di bawah ini.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Nama Produk</Label>
            <Input id="title" name="title" value={formData.title} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="vendorId">Vendor</Label>
            <Select name="vendorId" value={formData.vendorId} onValueChange={handleSelectChange('vendorId')}>
              <SelectTrigger><SelectValue placeholder="Pilih Vendor" /></SelectTrigger>
              <SelectContent>{allVendors.map(v => <SelectItem key={v.id} value={v.id}>{v.name}</SelectItem>)}</SelectContent>
            </Select>
          </div>
           <div className="space-y-2">
            <Label htmlFor="price">Harga</Label>
            <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} />
          </div>
           <p className="text-sm text-muted-foreground">
             Kategori produk akan otomatis mengikuti kategori vendor yang dipilih: <span className="font-bold">{formData.category}</span>
           </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">Batal</Button>
          </DialogClose>
          <Button type="button" onClick={handleSubmit}>Simpan Perubahan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
