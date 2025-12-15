import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { categories } from "@/lib/mock-data";
import * as LucideIcons from "lucide-react";

type IconName = keyof typeof LucideIcons;

export function CategoryGrid() {
  return (
    <section>
      <h2 className="text-3xl font-headline font-bold text-center mb-8">
        Jelajahi Kategori
      </h2>
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4">
        {categories.map((category) => {
          const IconComponent = LucideIcons[category.icon as IconName] as React.ElementType;
          return (
            <Link key={category.slug} href={`/products?category=${category.slug}`} className="group">
              <Card className="h-full transition-all hover:bg-accent hover:shadow-lg">
                <CardContent className="p-4 flex flex-col items-center justify-center gap-2 aspect-square">
                  {IconComponent && <IconComponent className="h-8 w-8 text-primary" />}
                  <span className="text-sm font-medium text-center">{category.name}</span>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
