import type { Product, Vendor, Review } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || `https://picsum.photos/seed/${id}/600/400`;

export const vendors: Vendor[] = [
  { id: 'v1', name: 'Gedung Pernikahan Mewah', category: 'Venue', location: 'Jakarta', whatsappNumber: '+6281234567890', rating: 4.9, reviewCount: 120 },
  { id: 'v2', name: 'Catering Rasa Nusantara', category: 'Catering', location: 'Bandung', whatsappNumber: '+6281234567891', rating: 4.8, reviewCount: 250 },
  { id: 'v3', name: 'Gaun Pengantin Elegan', category: 'Dress', location: 'Surabaya', whatsappNumber: '+6281234567892', rating: 5.0, reviewCount: 88 },
  { id: 'v4', name: 'Abadi Photo Studio', category: 'Photo/Studio', location: 'Yogyakarta', whatsappNumber: '+6281234567893', rating: 4.7, reviewCount: 150 },
  { id: 'v5', name: 'Dekorasi Pelaminan Impian', category: 'Decor', location: 'Semarang', whatsappNumber: '+6281234567894', rating: 4.9, reviewCount: 95 },
];

export const products: Product[] = [
  { id: 'p1', vendorId: 'v1', category: 'Venue', price: 75000000, title: 'Sewa Gedung Grand Ballroom', description: 'Gedung serbaguna dengan kapasitas 1000 orang, full AC, dan parkir luas.', images: [getImage('product-1'), getImage('promo-1')], specificAttributes: { Kapasitas: '1000 Tamu' }, rating: 4.9, reviewCount: 120, location: 'Jakarta' },
  { id: 'p2', vendorId: 'v3', category: 'Dress', price: 15000000, title: 'Gaun Pengantin "Princessa"', description: 'Gaun putih elegan dengan detail kristal Swarovski, tersedia dalam berbagai ukuran.', images: [getImage('product-2'), getImage('category-dress')], rating: 5.0, reviewCount: 88, location: 'Surabaya' },
  { id: 'p3', vendorId: 'v4', category: 'Photo/Studio', price: 8000000, title: 'Paket Foto & Video "Eternal Love"', description: 'Paket lengkap liputan foto dan video seharian, termasuk album cetak dan drone shot.', images: [getImage('product-3'), getImage('product-7')], rating: 4.7, reviewCount: 150, location: 'Yogyakarta' },
  { id: 'p4', vendorId: 'v5', category: 'Decor', price: 25000000, title: 'Dekorasi Pelaminan Rustic', description: 'Dekorasi pelaminan dengan tema rustic, menggunakan bunga asli dan kayu berkualitas.', images: [getImage('product-4'), getImage('blog-1')], rating: 4.9, reviewCount: 95, location: 'Semarang' },
  { id: 'p5', vendorId: 'v2', category: 'Catering', price: 45000000, title: 'Paket Catering Nusantara 500 Porsi', description: 'Menu masakan tradisional Indonesia lengkap dengan gubukan dan dessert.', images: [getImage('product-5'), getImage('promo-2')], specificAttributes: { Porsi: 500 }, rating: 4.8, reviewCount: 250, location: 'Bandung' },
  { id: 'p6', vendorId: 'v1', category: 'Audio/MC', price: 5000000, title: 'MC Profesional & Sound System', description: 'MC berpengalaman untuk memandu acara resepsi Anda, plus sound system 5000 watt.', images: [getImage('product-6'), getImage('promo-3')], rating: 4.8, reviewCount: 75, location: 'Jakarta' },
  { id: 'p7', vendorId: 'v4', category: 'Pre-wed', price: 3500000, title: 'Sesi Foto Pre-wedding Outdoor', description: 'Sesi foto pre-wedding selama 4 jam di lokasi outdoor pilihan di Yogyakarta.', images: [getImage('product-7'), getImage('product-3')], rating: 4.9, reviewCount: 210, location: 'Yogyakarta' },
  { id: 'p8', vendorId: 'v1', category: 'Souvenir', price: 2000000, title: '500 Pcs Souvenir Gelas Custom', description: 'Souvenir gelas dengan desain custom nama dan tanggal pernikahan.', images: [getImage('product-8'), getImage('category-venue')], specificAttributes: { Jumlah: 500 }, rating: 4.6, reviewCount: 130, location: 'Jakarta' },
  { id: 'p9', vendorId: 'v3', category: 'Makeup', price: 2500000, title: 'Makeup Artist (MUA) Akad & Resepsi', description: 'Jasa makeup untuk pengantin wanita pada saat akad dan resepsi.', images: [getImage('category-makeup'), getImage('user-avatar-3')], rating: 5.0, reviewCount: 112, location: 'Surabaya' },
];

export const reviews: Review[] = [
  { id: 'r1', productId: 'p1', userId: 'u1', userName: 'Anisa Putri', userAvatar: getImage('user-avatar-1'), rating: 5, comment: 'Gedungnya megah dan bersih, pelayanan sangat profesional. Recommended!', date: '2023-04-10' },
  { id: 'r2', productId: 'p1', userId: 'u2', userName: 'Budi Santoso', userAvatar: getImage('user-avatar-2'), rating: 4, comment: 'Tempatnya bagus, tapi parkiran agak sempit kalau tamu sedang ramai.', date: '2023-05-20' },
  { id: 'r3', productId: 'p2', userId: 'u3', userName: 'Citra Lestari', userAvatar: getImage('user-avatar-3'), rating: 5, comment: 'Gaunnya persis seperti di foto, cantik sekali! Membuatku merasa seperti ratu sehari.', date: '2023-06-01' },
];

export const promoSlides = [
  { id: 'slide1', title: 'Paket Pernikahan Hemat', description: 'Diskon 20% untuk pemesanan paket lengkap!', image: getImage('promo-1'), link: '/products?promo=hemat' },
  { id: 'slide2', title: 'Penawaran Spesial Katering', description: 'Gratis 50 porsi untuk setiap pemesanan di atas 500 porsi.', image: getImage('promo-2'), link: '/products/p5' },
  { id: 'slide3', title: 'Vendor Terpopuler Bulan Ini', description: 'Lihat vendor dengan rating tertinggi dari pasangan bahagia lainnya.', image: getImage('promo-3'), link: '/products?sort=rating' },
];

export const categories = [
  { name: "Venue", icon: "Building2", slug: "venue" },
  { name: "Dress", icon: "Shirt", slug: "dress" },
  { name: "Makeup", icon: "Sparkles", slug: "makeup" },
  { name: "Decor", icon: "Wind", slug: "decor" },
  { name: "Souvenir", icon: "Gift", slug: "souvenir" },
  { name: "Audio/MC", icon: "Mic", slug: "audio-mc" },
  { name: "Catering", icon: "UtensilsCrossed", slug: "catering" },
  { name: "Photo/Studio", icon: "Camera", slug: "photo-studio" },
  { name: "Pre-wed", icon: "Heart", slug: "pre-wed" },
];

export const javaLocations = [
  "Jakarta",
  "West Java",
  "Central Java",
  "East Java",
  "Yogyakarta",
  "Banten",
];

export const priceRanges = [
  { label: 'Semua', value: 'all' },
  { label: '< 10jt', value: '0-10000000' },
  { label: '10jt - 50jt', value: '10000000-50000000' },
  { label: '50jt - 100jt', value: '50000000-100000000' },
  { label: '> 100jt', value: '100000000-Infinity' },
];

export const sortOptions = [
  { label: 'Populer', value: 'popular' },
  { label: 'Rating Tertinggi', value: 'rating' },
  { label: 'Harga Terendah', value: 'price_asc' },
  { label: 'Harga Tertinggi', value: 'price_desc' },
];

export const mockOrders: (Omit<import('./types').Order, 'items'> & { items: { productId: string, quantity: number }[] })[] = [
  { id: 'ord1', userId: 'u1', items: [{ productId: 'p1', quantity: 1 }, { productId: 'p2', quantity: 1 }], total: 90000000, status: 'completed', date: '2023-07-15' },
  { id: 'ord2', userId: 'u1', items: [{ productId: 'p5', quantity: 1 }], total: 45000000, status: 'paid', date: '2024-05-20' },
];

export const blogPosts = [
  { id: 'b1', title: '5 Tips Memilih Venue Pernikahan yang Tepat', excerpt: 'Memilih venue adalah salah satu keputusan terbesar dalam perencanaan pernikahan...', image: getImage('blog-1'), link: '#' },
  { id: 'b2', title: 'Panduan Lengkap Negosiasi dengan Vendor Pernikahan', excerpt: 'Dapatkan harga terbaik tanpa mengorbankan kualitas. Pelajari cara negosiasi yang efektif...', image: getImage('blog-2'), link: '#' },
  { id: 'b3', title: 'Inspirasi Destinasi Bulan Madu Romantis di Pulau Jawa', excerpt: 'Tidak perlu jauh-jauh, Pulau Jawa menyimpan banyak permata tersembunyi untuk bulan madu...', image: getImage('blog-3'), link: '#' },
];
