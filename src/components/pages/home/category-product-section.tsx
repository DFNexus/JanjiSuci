
import { getProducts } from "@/services/product-service";
import { ProductCard } from "@/components/shared/product-card";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CategoryProductSectionProps {
    category: {
        name: string;
        slug: string;
    }
}

export async function CategoryProductSection({ category }: CategoryProductSectionProps) {
  const allProducts = await getProducts();
  const categoryProducts = allProducts
    .filter(p => p.category === category.name)
    .sort((a, b) => b.reviewCount - a.reviewCount) // Sort by popularity
    .slice(0, 4);

  if (categoryProducts.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-headline font-bold">
          Pilihan {category.name} Untukmu
        </h2>
        <Link href={`/products?category=${category.slug}`}>
            <Button variant="outline">
                Lihat Semua <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categoryProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
