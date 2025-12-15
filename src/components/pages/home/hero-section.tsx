import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export function HeroSection() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'promo-1');

  return (
    <section className="relative h-[60vh] min-h-[400px] w-full flex items-center justify-center text-center text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
      <div className="relative z-10 container flex flex-col items-center gap-6">
        <h1 className="text-4xl md:text-6xl font-headline font-bold drop-shadow-lg">
          Wujudkan Pernikahan Impian Anda di Jawa
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-slate-200 drop-shadow-md">
          Dari Impian Menjadi Kenyataan
        </p>
        <form className="w-full max-w-xl mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari layanan, vendor, atau lokasi..."
              className="w-full rounded-full pl-10 pr-24 h-12 text-base text-foreground"
            />
            <Button type="submit" className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full h-9">
              Cari
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
