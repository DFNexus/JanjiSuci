import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { promoSlides } from "@/lib/mock-data";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function PromoSlider() {
  return (
    <Carousel
      className="w-full"
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {promoSlides.map((slide) => (
          <CarouselItem key={slide.id}>
            <Card className="overflow-hidden">
              <div className="relative h-60 md:h-80 w-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1200px"
                  data-ai-hint="wedding promotion"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
                <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-center items-start text-white max-w-lg">
                  <h2 className="text-3xl md:text-4xl font-headline font-bold mb-2">
                    {slide.title}
                  </h2>
                  <p className="text-lg text-slate-200 mb-4">
                    {slide.description}
                  </p>
                  <Link href={slide.link}>
                    <Button>Lihat Selengkapnya</Button>
                  </Link>
                </div>
              </div>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4" />
      <CarouselNext className="absolute right-4" />
    </Carousel>
  );
}
