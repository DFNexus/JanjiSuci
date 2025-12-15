"use client";

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface ProductFiltersProps {
  categories: { name: string; slug: string }[];
  locations: string[];
  priceRanges: { label: string; value: string }[];
  sortOptions: { label: string; value: string }[];
}

export function ProductFilters({
  categories,
  locations,
  priceRanges,
  sortOptions,
}: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === 'all') {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      return params.toString();
    },
    [searchParams]
  );
  
  const handleSelectChange = (name: string) => (value: string) => {
      router.push(pathname + '?' + createQueryString(name, value));
  };
  
  const handleRadioChange = (name: string) => (value: string) => {
      router.push(pathname + '?' + createQueryString(name, value));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filter & Urutkan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Kategori</Label>
          <Select
            value={searchParams.get('category') || 'all'}
            onValueChange={handleSelectChange('category')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kategori</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.slug} value={cat.slug}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Lokasi</Label>
          <Select
            value={searchParams.get('location') || 'all'}
            onValueChange={handleSelectChange('location')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih Lokasi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Lokasi</SelectItem>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Urutkan</Label>
          <Select
            value={searchParams.get('sort') || 'popular'}
            onValueChange={handleSelectChange('sort')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Urutkan Berdasarkan" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label>Rentang Harga</Label>
          <RadioGroup
             value={searchParams.get('price') || 'all'}
             onValueChange={handleRadioChange('price')}
             className="space-y-2"
          >
            {priceRanges.map((range) => (
              <div key={range.value} className="flex items-center space-x-2">
                <RadioGroupItem value={range.value} id={`price-${range.value}`} />
                <Label htmlFor={`price-${range.value}`} className="font-normal">
                  {range.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
}
