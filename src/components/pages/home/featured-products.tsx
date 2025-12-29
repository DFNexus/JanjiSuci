
import { products, categories } from "@/lib/mock-data";
import { ProductCard } from "@/components/shared/product-card";
import type { Product } from "@/lib/types";

export function FeaturedProducts() {
  // Get one top-rated product from each category
  const featuredProducts = categories.map(category => {
    const topProductInCategory = products
      .filter(p => p.category === category.name)
      .sort((a, b) => b.rating - a.rating)[0];
    return topProductInCategory;
  }).filter((p): p is Product => p !== undefined);

  return (
    <section>
      <h2 className="text-3xl font-headline font-bold text-center mb-8">
        Pilihan Teratas Untukmu
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
