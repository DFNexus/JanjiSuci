"use client";

import { ProductCard } from "@/components/shared/product-card";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Frown } from "lucide-react";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-full rounded-lg border-2 border-dashed border-muted-foreground/30 py-24">
         <Frown className="w-16 h-16 text-muted-foreground/50 mb-4" />
        <h2 className="text-2xl font-bold">Tidak Ada Produk Ditemukan</h2>
        <p className="text-muted-foreground mt-2 mb-6">
          Coba ubah filter atau kembali ke halaman utama.
        </p>
        <Link href="/products">
          <Button>Hapus Semua Filter</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
