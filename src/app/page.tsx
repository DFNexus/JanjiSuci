
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "@/components/shared/product-card";
import { products } from "@/lib/mock-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { promoSlides } from "@/lib/mock-data";

const HomeHero = () => {
  const mainBanner = promoSlides[0];
  const sideBanner1 = promoSlides[1];
  const sideBanner2 = promoSlides[2];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <div className="lg:col-span-1">
           {mainBanner && (
             <Carousel
                className="w-full"
                opts={{
                  loop: true,
                }}
              >
                <CarouselContent>
                    <CarouselItem>
                       <div className="relative h-full min-h-[400px] rounded-lg overflow-hidden">
                         <Image
                           src={mainBanner.image}
                           alt={mainBanner.title}
                           fill
                           className="object-cover"
                           sizes="(max-width: 768px) 100vw, 50vw"
                           priority
                         />
                         <div className="absolute inset-0 bg-black/30" />
                         <div className="relative z-10 p-8 h-full flex flex-col justify-end text-white">
                           <h2 className="text-3xl font-bold mb-2">{mainBanner.title}</h2>
                           <p className="mb-4">{mainBanner.description}</p>
                           <Button asChild className="w-fit">
                             <Link href={mainBanner.link}>Lihat Selengkapnya</Link>
                           </Button>
                         </div>
                       </div>
                    </CarouselItem>
                     <CarouselItem>
                       <div className="relative h-full min-h-[400px] rounded-lg overflow-hidden">
                         <Image
                           src={sideBanner1.image}
                           alt={sideBanner1.title}
                           fill
                           className="object-cover"
                           sizes="(max-width: 768px) 100vw, 50vw"
                           priority
                         />
                         <div className="absolute inset-0 bg-black/30" />
                         <div className="relative z-10 p-8 h-full flex flex-col justify-end text-white">
                           <h2 className="text-3xl font-bold mb-2">{sideBanner1.title}</h2>
                           <p className="mb-4">{sideBanner1.description}</p>
                           <Button asChild className="w-fit">
                             <Link href={sideBanner1.link}>Lihat Selengkapnya</Link>
                           </Button>
                         </div>
                       </div>
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
           )}
        </div>
        <div className="hidden lg:grid grid-rows-2 gap-2">
            {sideBanner2 && (
              <div className="relative rounded-lg overflow-hidden">
                 <Image
                    src={sideBanner2.image}
                    alt={sideBanner2.title}
                    fill
                    className="object-cover"
                    sizes="50vw"
                 />
                 <div className="absolute inset-0 bg-black/30" />
                 <div className="relative z-10 p-6 h-full flex flex-col justify-end text-white">
                    <h3 className="text-xl font-bold">{sideBanner2.title}</h3>
                    <p className="text-sm">{sideBanner2.description}</p>
                 </div>
              </div>
            )}
            {sideBanner1 && (
                <div className="relative rounded-lg overflow-hidden">
                    <Image
                        src={PlaceHolderImages.find(img => img.id === 'promo-1')?.imageUrl || ''}
                        alt="Event Website"
                        fill
                        className="object-cover"
                        sizes="50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 opacity-80" />
                     <div className="relative z-10 p-6 h-full flex flex-col justify-center items-start text-gray-800">
                        <h3 className="text-2xl font-bold">Say Yes RSVP</h3>
                        <p className="mb-4">Kini hadir dengan Layanan dan Fitur Terbaik, Lebih Mudah, dan Lebih Lengkap</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <span className="bg-white/70 rounded-full px-3 py-1 text-center">Seating Management</span>
                            <span className="bg-white/70 rounded-full px-3 py-1 text-center">Desain Custom</span>
                            <span className="bg-white/70 rounded-full px-3 py-1 text-center">Jasa Admin RSVP</span>
                            <span className="bg-white/70 rounded-full px-3 py-1 text-center">QR Check in</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  )
}


const RecommendedVendors = () => {
  return (
    <section className="py-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Rekomendasi Vendor Untuk Saya</h2>
        <Button variant="ghost">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
        </Button>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" className="rounded-full">Venue</Button>
        <Button variant="outline" className="rounded-full">Wedding Planner</Button>
        <Button variant="outline" className="rounded-full">Fotografi</Button>
      </div>
    </section>
  )
}

const PromoBanner = () => {
    const banner = PlaceHolderImages.find(img => img.id === 'promo-1');
    return (
        <section className="py-6">
            <div className="relative rounded-lg overflow-hidden h-36 bg-gradient-to-r from-pink-300 to-purple-300 flex items-center justify-between px-12">
                 <h3 className="text-xl font-bold text-white">Kini Hadir dengan Layanan dan Fitur Terbaik,<br/> Lebih Mudah, dan Lebih Lengkap</h3>
                 <Button>Lihat Detail</Button>
            </div>
        </section>
    )
}

const VenuesSection = () => {
  const venueProducts = products.filter(p => p.category === 'Venue').slice(0, 4);

  return (
    <section className="py-12">
       <div className="flex justify-between items-center mb-6">
        <div>
            <h2 className="text-2xl font-bold">Venue di Indonesia</h2>
            <p className="text-muted-foreground">Lihat Rekomendasi dengan semua budget</p>
        </div>
        <Link href="/products?category=venue">
            <Button variant="link">
                Lihat semua Venue di Indonesia <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {venueProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="container px-4 sm:px-6 lg:px-8">
        <HomeHero />
        <RecommendedVendors />
        <PromoBanner />
        <VenuesSection />
      </div>
    </div>
  );
}
