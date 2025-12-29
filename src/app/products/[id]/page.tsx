
import { getProducts } from "@/services/product-service";
import { getVendors } from "@/services/vendor-service";
import { reviews } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RatingStars } from "@/components/shared/rating-stars";
import { formatPrice } from "@/lib/utils";
import { AddToCartButton } from "@/components/pages/product-detail/add-to-cart-button";
import { ContactVendorButton } from "@/components/pages/product-detail/contact-vendor-button";
import { ReviewSection } from "@/components/pages/product-detail/review-section";
import { MapPin, Building } from "lucide-react";
import type { Product, Vendor } from "@/lib/types";
import { RelatedProducts } from "@/components/pages/product-detail/related-products";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const products = await getProducts();
  const product = products.find((p) => p.id === params.id);
  if (!product) {
    return {
      title: "Product Not Found",
    };
  }
  return {
    title: `${product.title} - Janji Suci`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const allProducts = await getProducts();
  const product = allProducts.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }
  
  const allVendors = await getVendors();
  const vendor = allVendors.find((v) => v.id === product.vendorId);
  const productReviews = reviews.filter((r) => r.productId === product.id);

  return (
    <div className="container py-12 space-y-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <div className="relative aspect-square w-full overflow-hidden rounded-lg border">
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              data-ai-hint="product image"
            />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-4">
            {product.images.slice(0, 4).map((img, index) => (
              <div key={index} className="relative aspect-square w-full overflow-hidden rounded-lg border">
                <Image
                  src={img}
                  alt={`${product.title} - view ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="25vw"
                  data-ai-hint="product gallery"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <Badge variant="secondary">{product.category}</Badge>
            <h1 className="text-4xl font-headline font-bold mt-2">{product.title}</h1>
            <div className="mt-4 flex items-center gap-4">
              <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-1.5 h-4 w-4" />
                {product.location}
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <p className="text-4xl font-bold font-headline text-primary">{formatPrice(product.price)}</p>
          </div>

          <p className="text-muted-foreground">{product.description}</p>
          
          {product.specificAttributes && (
             <Card>
                <CardContent className="p-4 space-y-2 text-sm">
                   {Object.entries(product.specificAttributes).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                         <span className="text-muted-foreground">{key}</span>
                         <span className="font-medium">{value}</span>
                      </div>
                   ))}
                </CardContent>
             </Card>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <AddToCartButton product={product} />
             {vendor && <ContactVendorButton vendor={vendor} />}
          </div>

          {vendor && (
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <Building className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Vendor</p>
                  <p className="font-semibold">{vendor.name}</p>
                  <RatingStars rating={vendor.rating} reviewCount={vendor.reviewCount} className="mt-1" />
                </div>
              </CardContent>
            </Card>
          )}

        </div>
      </div>
      
      <Separator />
      
      <ReviewSection reviews={productReviews} />

      <Separator />

      <Suspense fallback={<RelatedProductsSkeleton />}>
        <RelatedProducts currentProductId={product.id} category={product.category} />
      </Suspense>

    </div>
  );
}

function RelatedProductsSkeleton() {
  return (
    <section>
      <h2 className="text-3xl font-headline font-bold text-center mb-8">
        Direkomendasikan untuk Anda
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </section>
  )
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}
