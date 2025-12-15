import { blogPosts } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Blog & Tips Pernikahan - Cremonica",
  description: "Dapatkan tips, inspirasi, dan panduan untuk merencanakan pernikahan impian Anda di Jawa.",
};

export default function BlogPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold">Tips & Inspirasi Pernikahan</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Panduan Anda untuk merencanakan hari yang sempurna, dari memilih vendor hingga ide bulan madu.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden group">
            <Link href={post.link} className="block">
              <div className="relative h-56 w-full">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  data-ai-hint="blog post"
                />
              </div>
            </Link>
            <CardContent className="p-6">
              <h2 className="text-xl font-headline font-bold mb-2">
                <Link href={post.link}>{post.title}</Link>
              </h2>
              <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
              <Link href={post.link}>
                <Button variant="link" className="p-0 h-auto">
                  Baca Selengkapnya <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
