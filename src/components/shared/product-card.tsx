
import Image from 'next/image';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { RatingStars } from './rating-stars';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md border-0 rounded-lg">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative h-48 w-full">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover rounded-t-lg"
            data-ai-hint="product image"
          />
        </div>
      </Link>
      <CardContent className="p-3 space-y-1">
        <h3 className="font-semibold text-base truncate">
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </h3>
        <div className="flex items-center text-sm text-muted-foreground">
          <span>{product.location}</span>
        </div>
        <div className="text-base font-semibold text-primary">{formatPrice(product.price)}</div>
      </CardContent>
    </Card>
  );
}
