
import { getProducts } from "@/services/product-service";
import { ProductCard } from "@/components/shared/product-card";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
    .sort((a, b) => b.reviewCount - a.reviewCount); // Sort by popularity

  if (categoryProducts.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-headline font-bold">
            {category.name} di Indonesia
          </h2>
          <p className="text-muted-foreground">Lihat Rekomendasi dengan semua budget</p>
        </div>
        <Link href={`/products?category=${category.slug}`}>
            <Button variant="outline" className="bg-background/80 backdrop-blur-sm">
                Lihat semua {category.name} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </Link>
      </div>
      <Carousel
        opts={{
          align: "start",
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {categoryProducts.map((product) => (
            <CarouselItem key={product.id} className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                <div className="p-1">
                 <ProductCard product={product} />
                </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-[-1.5rem] top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-[-1.5rem] top-1/2 -translate-y-1/2" />
      </Carousel>
    </section>
  );
}
