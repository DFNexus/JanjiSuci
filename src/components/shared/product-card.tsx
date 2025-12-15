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
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative h-48 w-full">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            data-ai-hint="product image"
          />
        </div>
      </Link>
      <CardContent className="p-4 space-y-2">
        <Badge variant="secondary" className="font-normal">{product.category}</Badge>
        <h3 className="font-headline text-lg font-bold">
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </h3>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-1 h-4 w-4" />
          <span>{product.location}</span>
        </div>
        <div className="flex items-center justify-between">
            <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
        </div>
        <div className="pt-2 text-right">
          <p className="text-sm text-muted-foreground">Mulai dari</p>
          <p className="text-xl font-bold font-headline text-primary">{formatPrice(product.price)}</p>
        </div>
      </CardContent>
    </Card>
  );
}
