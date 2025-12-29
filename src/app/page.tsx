console.log("TEST API KEY:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
import { CategoryGrid } from "@/components/pages/home/category-grid";
import { FeaturedProducts } from "@/components/pages/home/featured-products";
import { HeroSection } from "@/components/pages/home/hero-section";
import { PromoSlider } from "@/components/pages/home/promo-slider";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <div className="container space-y-12 py-12">
        <PromoSlider />
        <Separator />
        <CategoryGrid />
        <Separator />
        <FeaturedProducts />
      </div>
    </div>
  );
}
