
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: "5 Tips Memilih Venue Pernikahan yang Tepat - Janji Suci",
    description: "Memilih venue adalah salah satu keputusan terbesar dalam perencanaan pernikahan. Dapatkan tipsnya di sini.",
};

export default function BlogPostVenue() {
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
                    src="https://images.unsplash.com/photo-1583939411023-14783179e581?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHx3ZWRkaW5nJTIwcGxhbm5pbmd8ZW58MHx8fHwxNzY1ODEzODMxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Wedding planning"
                    fill
                    className="object-cover"
                    data-ai-hint="wedding planning"
                />
            </div>
            <h1 className="text-4xl font-headline font-bold mb-4">5 Tips Memilih Venue Pernikahan yang Tepat</h1>
            <p className="text-muted-foreground mb-8">Diposting pada 15 Juli 2024</p>
            
            <div className="prose lg:prose-xl max-w-none">
                <p>Memilih venue pernikahan adalah salah satu keputusan paling fundamental dalam seluruh proses perencanaan. Venue tidak hanya menjadi latar belakang hari istimewa Anda, tetapi juga menentukan tanggal, kapasitas tamu, dan suasana keseluruhan acara. Berikut adalah lima tips penting untuk membantu Anda memilih venue yang sempurna.</p>
                
                <h2>1. Tentukan Anggaran, Jumlah Tamu, dan Konsep</h2>
                <p>Sebelum Anda mulai mencari, Anda harus memiliki gambaran yang jelas tentang tiga hal ini. Berapa anggaran maksimal Anda untuk sewa tempat? Berapa banyak tamu yang akan Anda undang? Apa konsep pernikahan impian Anda (misalnya, modern, tradisional, outdoor, indoor)? Mengetahui hal ini akan mempersempit pilihan Anda secara signifikan.</p>
                
                <h2>2. Pertimbangkan Lokasi dan Aksesibilitas</h2>
                <p>Pikirkan tentang kemudahan akses bagi tamu Anda. Apakah lokasinya mudah dijangkau? Apakah tersedia parkir yang memadai? Jika banyak tamu yang datang dari luar kota, pertimbangkan kedekatan venue dengan hotel atau penginapan.</p>
                
                <h2>3. Kunjungi Venue Secara Langsung</h2>
                <p>Foto bisa menipu. Selalu jadwalkan kunjungan langsung ke venue yang masuk dalam daftar pendek Anda. Perhatikan tata letak, pencahayaan, kebersihan, dan suasana keseluruhan. Jangan ragu untuk bertanya banyak hal kepada manajer venue.</p>
                
                <h2>4. Pahami Apa Saja yang Termasuk dalam Paket</h2>
                <p>Setiap venue menawarkan paket yang berbeda. Apakah harga sewa sudah termasuk meja, kursi, dan sound system? Apakah ada biaya tambahan untuk kebersihan atau keamanan? Pastikan Anda mendapatkan rincian lengkap secara tertulis untuk menghindari biaya tak terduga.</p>

                <h2>5. Baca Ulasan dan Minta Rekomendasi</h2>
                <p>Cari tahu pengalaman pasangan lain yang pernah menggunakan venue tersebut. Ulasan online bisa menjadi sumber informasi yang berharga. Selain itu, jangan ragu untuk meminta rekomendasi dari teman, keluarga, atau vendor pernikahan lain yang Anda percaya.</p>
            </div>
        </div>
    );
}
