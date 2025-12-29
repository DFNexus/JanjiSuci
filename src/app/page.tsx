
import { CategoryGrid } from "@/components/pages/home/category-grid";
import { CategoryProductSection } from "@/components/pages/home/category-product-section";
import { HeroSection } from "@/components/pages/home/hero-section";
import { PromoSlider } from "@/components/pages/home/promo-slider";
import { Separator } from "@/components/ui/separator";
import { categories } from "@/lib/mock-data";

export default function Home() {
  return (
    <div className="flex flex-col space-y-12">
      <HeroSection />
      <div className="container px-4 sm:px-6 lg:px-8 space-y-12">
        <CategoryGrid />
        <Separator />
        <PromoSlider />
        <Separator />
        {categories.map((category) => (
            <CategoryProductSection key={category.slug} category={category} />
        ))}
      </div>
    </div>
  );
}
