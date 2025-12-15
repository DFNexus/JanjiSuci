import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RatingStars } from "@/components/shared/rating-stars";
import type { Review } from "@/lib/types";
import { User } from "lucide-react";

interface ReviewSectionProps {
  reviews: Review[];
}

export function ReviewSection({ reviews }: ReviewSectionProps) {
  return (
    <section>
      <h2 className="text-3xl font-headline font-bold mb-8">Ulasan Pelanggan</h2>
      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                 <Avatar>
                    <AvatarImage src={review.userAvatar} alt={review.userName} />
                    <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                 </Avatar>
                 <div className="flex-1">
                    <CardTitle className="text-base">{review.userName}</CardTitle>
                    <div className="flex items-center gap-4">
                        <RatingStars rating={review.rating} />
                        <p className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                 </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{review.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
           <User className="mx-auto h-12 w-12 text-muted-foreground/50" />
           <p className="mt-4 text-muted-foreground">Belum ada ulasan untuk produk ini.</p>
        </div>
      )}
    </section>
  );
}
