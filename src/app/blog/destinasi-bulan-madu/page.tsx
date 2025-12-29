
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: "Inspirasi Destinasi Bulan Madu Romantis di Pulau Jawa - Janji Suci",
    description: "Tidak perlu jauh-jauh, Pulau Jawa menyimpan banyak permata tersembunyi untuk bulan madu.",
};

export default function BlogPostHoneymoon() {
    return (
        <div className="container py-12 max-w-4xl mx-auto">
            <Link href="/blog">
                <Button variant="ghost" className="mb-8">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Kembali ke Blog
                </Button>
            </Link>
            <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1595835018349-198460e1d309?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxqYXZhJTIwbGFuZHNjYXBlfGVufDB8fHx8MTc2NTgxMzgzMnww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Java landscape"
                    fill
                    className="object-cover"
                    data-ai-hint="java landscape"
                />
            </div>
            <h1 className="text-4xl font-headline font-bold mb-4">Inspirasi Destinasi Bulan Madu Romantis di Pulau Jawa</h1>
            <p className="text-muted-foreground mb-8">Diposting pada 13 Juli 2024</p>
            
            <div className="prose lg:prose-xl max-w-none">
                <p>Pulau Jawa tidak hanya pusat bisnis dan budaya, tetapi juga rumah bagi destinasi bulan madu yang menakjubkan. Dari pegunungan yang sejuk hingga pantai yang tenang, berikut adalah beberapa inspirasi untuk perjalanan romantis pertama Anda sebagai suami istri.</p>
                
                <h2>1. Yogyakarta: Budaya dan Romantisme</h2>
                <p>Yogyakarta menawarkan perpaduan sempurna antara budaya, seni, dan alam. Nikmati matahari terbit di Candi Borobudur, jelajahi keraton yang bersejarah, dan habiskan malam di restoran romantis dengan pemandangan Candi Prambanan.</p>
                
                <h2>2. Bandung: Sejuknya Paris van Java</h2>
                <p>Dengan udaranya yang sejuk dan pemandangan alam yang hijau, Bandung adalah pilihan yang tepat untuk pasangan yang mencari ketenangan. Menginap di villa pribadi di Lembang, menikmati kebun teh, dan berendam di pemandian air panas Ciater akan menjadi pengalaman yang tak terlupakan.</p>
                
                <h2>3. Karimunjawa: Surga Tersembunyi di Utara Jawa</h2>
                <p>Jika Anda dan pasangan menyukai pantai dan laut, Karimunjawa adalah jawabannya. Kepulauan ini menawarkan pantai pasir putih yang bersih, air laut yang jernih untuk snorkeling, dan suasana yang jauh lebih tenang dibandingkan Bali.</p>
                
                <h2>4. Malang & Batu: Pesona Pegunungan di Timur Jawa</h2>
                <p>Nikmati sejuknya udara pegunungan di Batu, kunjungi perkebunan apel, dan kagumi pemandangan Gunung Bromo yang ikonik. Malang dan Batu menawarkan banyak sekali spot foto yang indah dan kegiatan yang menyenangkan untuk pasangan.</p>

                <h2>5. Dataran Tinggi Dieng: Negeri di Atas Awan</h2>
                <p>Untuk pasangan petualang, Dieng menawarkan pengalaman unik. Saksikan "golden sunrise" di Sikunir, kunjungi kawah Sikidang yang aktif, dan lihat komplek candi Hindu tertua di Jawa. Udaranya yang dingin membuat suasana semakin romantis untuk berpelukan.</p>
            </div>
        </div>
    );
}
