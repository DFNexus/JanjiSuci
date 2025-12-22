import { ProductGrid } from "@/components/pages/products/product-grid";
import { ProductFilters } from "@/components/pages/products/product-filters";
import { categories, javaLocations, priceRanges, sortOptions } from "@/lib/mock-data";
import { getProducts } from "@/services/product-service";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@/lib/types";

export const metadata = {
  title: "Browse Wedding Products - Janji Suci",
  description: "Find the perfect vendors and services for your wedding in Java.",
};

type SearchParams = {
  search?: string;
  category?: string;
  location?: string;
  price?: string;
  sort?: string;
  page?: string;
};

export default async function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
  const {
    search,
    category,
    location,
    price,
    sort,
  } = searchParams;

  const products = await getProducts();
  let filteredProducts: Product[] = [...products];

  if (search) {
    filteredProducts = filteredProducts.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (category) {
    const categoryName = categories.find(c => c.slug === category)?.name;
    if (categoryName) {
      filteredProducts = filteredProducts.filter(p => p.category === categoryName);
    }
  }

  if (location && location !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.location === location);
  }

  if (price && price !== 'all') {
    const [min, max] = price.split('-').map(Number);
    const maxPrice = max === Infinity ? Number.MAX_SAFE_INTEGER : max;
    filteredProducts = filteredProducts.filter(p => p.price >= min && p.price <= maxPrice);
  }
  
  if (sort) {
    switch(sort) {
        case 'popular':
            filteredProducts.sort((a, b) => b.reviewCount - a.reviewCount);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'price_asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price_desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
    }
  }

  const currentCategory = categories.find(c => c.slug === category);

  return (
    <div className="container py-12">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-headline font-bold">
          {currentCategory ? `Kategori: ${currentCategory.name}` : 'Semua Produk'}
        </h1>
        <p className="text-muted-foreground mt-2">
          Temukan semua yang Anda butuhkan untuk hari bahagia Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <ProductFilters
            categories={categories}
            locations={javaLocations}
            priceRanges={priceRanges}
            sortOptions={sortOptions}
          />
        </aside>

        <main className="lg:col-span-3">
          <Suspense fallback={<ProductGridSkeleton />}>
             <ProductGrid products={filteredProducts} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}

function ProductGridSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
                 <div key={i} className="space-y-4">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <div className="flex justify-between">
                       <Skeleton className="h-4 w-1/3" />
                       <Skeleton className="h-8 w-1/3" />
                    </div>
                 </div>
            ))}
        </div>
    )
}
