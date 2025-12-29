
import { getProducts } from "@/services/product-service";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/shared/product-card";

interface RelatedProductsProps {
  currentProductId: string;
  category: string;
}

export async function RelatedProducts({ currentProductId, category }: RelatedProductsProps) {
  const allProducts = await getProducts();
  
  const relatedProducts = allProducts
    .filter(
      (p) =>
        p.category === category &&
        p.id !== currentProductId
    )
    .sort((a,b) => b.rating - a.rating)
    .slice(0, 4);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-3xl font-headline font-bold text-center mb-8">
        Direkomendasikan untuk Anda
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
