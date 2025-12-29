
import Image from 'next/image';
import Link from 'next/link';

import type { Product } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { RatingStars } from './rating-stars';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md w-full border-none shadow-none">
      <Link href={`/products/${product.id}`} className="block group">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="product image"
          />
        </div>
        <div className="pt-3 space-y-1">
            <h3 className="font-semibold text-base truncate group-hover:underline">{product.title}</h3>
            <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
        </div>
      </Link>
    </Card>
  );
}
