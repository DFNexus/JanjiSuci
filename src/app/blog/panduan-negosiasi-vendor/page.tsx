
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: "Panduan Lengkap Negosiasi dengan Vendor Pernikahan - Janji Suci",
    description: "Dapatkan harga terbaik tanpa mengorbankan kualitas. Pelajari cara negosiasi yang efektif.",
};

export default function BlogPostNegotiation() {
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
                     src="https://images.unsplash.com/photo-1754039985008-a15410211b67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxjaGVja2xpc3QlMjBoYW5kc3xlbnwwfHx8fDE3NjU4MTM4MzF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Checklist hands"
                    fill
                    className="object-cover"
                    data-ai-hint="checklist hands"
                />
            </div>
            <h1 className="text-4xl font-headline font-bold mb-4">Panduan Lengkap Negosiasi dengan Vendor Pernikahan</h1>
            <p className="text-muted-foreground mb-8">Diposting pada 14 Juli 2024</p>
            
            <div className="prose lg:prose-xl max-w-none">
                <p>Salah satu kunci untuk tetap sesuai anggaran pernikahan adalah kemampuan bernegosiasi dengan vendor. Negosiasi bukan berarti mencari harga termurah, tetapi mendapatkan nilai terbaik untuk uang Anda. Berikut adalah panduan untuk bernegosiasi secara efektif dan sopan.</p>
                
                <h2>1. Lakukan Riset Anda</h2>
                <p>Ketahui harga pasaran untuk layanan yang Anda cari. Dengan memiliki pemahaman yang baik tentang biaya rata-rata, Anda akan tahu apakah penawaran yang diberikan vendor wajar atau tidak. Bandingkan beberapa vendor sebelum membuat keputusan.</p>
                
                <h2>2. Jadilah Fleksibel</h2>
                <p>Jika Anda bisa fleksibel dengan tanggal atau waktu, Anda mungkin bisa mendapatkan harga yang lebih baik. Menikah di luar musim ramai (off-season) atau pada hari kerja seringkali jauh lebih murah daripada di akhir pekan.</p>
                
                <h2>3. Tanyakan Apa yang Bisa Disesuaikan</h2>
                <p>Daripada langsung meminta diskon, tanyakan, "Apakah ada komponen dari paket ini yang bisa disesuaikan untuk lebih cocok dengan anggaran kami?" Mungkin Anda bisa mengurangi jumlah jam layanan atau mengganti beberapa item dengan alternatif yang lebih terjangkau.</p>
                
                <h2>4. Bangun Hubungan Baik</h2>
                <p>Ingatlah bahwa Anda sedang membangun kemitraan. Bersikaplah ramah, sopan, dan tunjukkan antusiasme terhadap pekerjaan mereka. Vendor akan lebih bersedia membantu klien yang mereka sukai.</p>

                <h2>5. Minta Semuanya Secara Tertulis</h2>
                <p>Setelah kesepakatan tercapai, pastikan semua detail, termasuk harga, layanan yang termasuk, dan jadwal pembayaran, tertuang dalam kontrak yang jelas. Ini akan melindungi Anda dan vendor dari kesalahpahaman di kemudian hari.</p>
            </div>
        </div>
    );
}
