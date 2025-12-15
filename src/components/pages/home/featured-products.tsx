import { products } from "@/lib/mock-data";
import { ProductCard } from "@/components/shared/product-card";

export function FeaturedProducts() {
  // Get top 4 rated products as featured
  const featuredProducts = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <section>
      <h2 className="text-3xl font-headline font-bold text-center mb-8">
        Pilihan Teratas Untukmu
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
