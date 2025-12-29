
import Image from 'next/image';
import Link from 'next/link';

import type { Product } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { RatingStars } from './rating-stars';
import { formatPrice } from '@/lib/utils';
import { Badge } from '../ui/badge';

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
           <Badge variant="secondary" className="absolute top-2 left-2">{product.category}</Badge>
        </div>
        <div className="pt-3 space-y-1">
            <h3 className="font-semibold text-base truncate group-hover:underline">{product.title}</h3>
            <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
            <p className="text-lg font-bold text-primary">{formatPrice(product.price)}</p>
        </div>
      </Link>
    </Card>
  );
}
