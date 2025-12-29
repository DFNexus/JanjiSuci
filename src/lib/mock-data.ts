import type { Product, Vendor, Review } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || `https://picsum.photos/seed/${id}/600/400`;

export const vendors: Vendor[] = [
  { id: 'v1', name: 'Gedung Pernikahan Mewah', category: 'Venue', location: 'Jakarta', whatsappNumber: '+6281234567890', rating: 4.9, reviewCount: 120 },
  { id: 'v2', name: 'Catering Rasa Nusantara', category: 'Catering', location: 'Bandung', whatsappNumber: '+6281234567891', rating: 4.8, reviewCount: 250 },
  { id: 'v3', name: 'Gaun Pengantin Elegan', category: 'Dress', location: 'Surabaya', whatsappNumber: '+6281234567892', rating: 5.0, reviewCount: 88 },
  { id: 'v4', name: 'Abadi Photo Studio', category: 'Photo/Studio', location: 'Yogyakarta', whatsappNumber: '+6281234567893', rating: 4.7, reviewCount: 150 },
  { id: 'v5', name: 'Dekorasi Pelaminan Impian', category: 'Decor', location: 'Semarang', whatsappNumber: '+6281234567894', rating: 4.9, reviewCount: 95 },
  { id: 'v6', name: 'Putri MUA Professional', category: 'Makeup', location: 'Jakarta', whatsappNumber: '+6281234567895', rating: 4.9, reviewCount: 180 },
  { id: 'v7', name: 'Harmoni Entertainment', category: 'Audio/MC', location: 'Bandung', whatsappNumber: '+6281234567896', rating: 4.8, reviewCount: 90 },
  { id: 'v8', name: 'Kenangan Manis Souvenir', category: 'Souvenir', location: 'Surabaya', whatsappNumber: '+6281234567897', rating: 4.7, reviewCount: 200 },
  { id: 'v9', name: 'Asmara Pre-Wedding', category: 'Pre-wed', location: 'Yogyakarta', whatsappNumber: '+6281234567898', rating: 4.9, reviewCount: 135 },
  { id: 'v10', name: 'The Royal Hall', category: 'Venue', location: 'Surabaya', whatsappNumber: '+6281234567810', rating: 4.8, reviewCount: 110 },
  { id: 'v11', name: 'Selera Raja Catering', category: 'Catering', location: 'Jakarta', whatsappNumber: '+6281234567811', rating: 4.9, reviewCount: 300 },
  { id: 'v12', name: 'Momentous Photography', category: 'Photo/Studio', location: 'Bandung', whatsappNumber: '+6281234567812', rating: 4.8, reviewCount: 180 },
  { id: 'v13', name: 'Kebaya Klasik Indonesia', category: 'Dress', location: 'Yogyakarta', whatsappNumber: '+6281234567813', rating: 4.9, reviewCount: 75 },
  { id: 'v14', name: 'Bunga Indah Decor', category: 'Decor', location: 'Jakarta', whatsappNumber: '+6281234567814', rating: 4.8, reviewCount: 115 },
  { id: 'v15', name: 'Glamour Makeup Art', category: 'Makeup', location: 'Bandung', whatsappNumber: '+6281234567815', rating: 5.0, reviewCount: 150 },
];

export const products: Product[] = [
  // Venue (5)
  { id: 'p1', vendorId: 'v1', category: 'Venue', price: 75000000, title: 'Sewa Gedung Grand Ballroom', description: 'Gedung serbaguna dengan kapasitas 1000 orang, full AC, dan parkir luas.', images: [getImage('product-1'), getImage('promo-1')], specificAttributes: { Kapasitas: '1000 Tamu' }, rating: 4.9, reviewCount: 120, location: 'Jakarta' },
  { id: 'p10', vendorId: 'v10', category: 'Venue', price: 90000000, title: 'The Royal Hall Crystal Palace', description: 'Venue mewah dengan interior kristal dan pemandangan kota Surabaya.', images: [getImage('category-venue'), getImage('product-1')], specificAttributes: { Kapasitas: '1200 Tamu' }, rating: 4.8, reviewCount: 110, location: 'Surabaya' },
  { id: 'p11', vendorId: 'v1', category: 'Venue', price: 50000000, title: 'Garden Wedding Paradise', description: 'Paket pernikahan outdoor di taman tropis yang asri di Jakarta.', images: [getImage('product-4'), getImage('blog-1')], specificAttributes: { Kapasitas: '300 Tamu' }, rating: 4.9, reviewCount: 95, location: 'Jakarta' },
  { id: 'p12', vendorId: 'v10', category: 'Venue', price: 45000000, title: 'Rooftop Wedding Intimate', description: 'Venue rooftop dengan pemandangan kota 360 derajat untuk acara yang lebih privat.', images: [getImage('promo-1'), getImage('product-1')], specificAttributes: { Kapasitas: '150 Tamu' }, rating: 4.7, reviewCount: 80, location: 'Surabaya' },
  { id: 'p13', vendorId: 'v1', category: 'Venue', price: 60000000, title: 'Pendopo Klasik Jawa', description: 'Venue pernikahan dengan arsitektur joglo otentik dan suasana tradisional.', images: [getImage('product-1'), getImage('category-venue')], specificAttributes: { Kapasitas: '500 Tamu' }, rating: 4.8, reviewCount: 105, location: 'Yogyakarta' },
  
  // Dress (5)
  { id: 'p2', vendorId: 'v3', category: 'Dress', price: 15000000, title: 'Gaun Pengantin "Princessa"', description: 'Gaun putih elegan dengan detail kristal Swarovski, tersedia dalam berbagai ukuran.', images: [getImage('product-2'), getImage('category-dress')], rating: 5.0, reviewCount: 88, location: 'Surabaya' },
  { id: 'p14', vendorId: 'v13', category: 'Dress', price: 12000000, title: 'Kebaya Pengantin "Anggun"', description: 'Set kebaya modern dengan payet dan kain batik tulis asli.', images: [getImage('category-dress'), getImage('product-2')], rating: 4.9, reviewCount: 75, location: 'Yogyakarta' },
  { id: 'p15', vendorId: 'v3', category: 'Dress', price: 8000000, title: 'Sewa Jas Pengantin Pria "Gentleman"', description: 'Set jas pengantin pria modern dari bahan wol berkualitas tinggi.', images: [getImage('product-2'), getImage('category-dress')], rating: 4.8, reviewCount: 60, location: 'Surabaya' },
  { id: 'p16', vendorId: 'v13', category: 'Dress', price: 5000000, title: 'Baju Bridesmaid "Pastel Dreams"', description: 'Paket sewa 4 gaun bridesmaid dengan pilihan warna pastel.', images: [getImage('category-dress'), getImage('product-2')], specificAttributes: { Jumlah: '4 Gaun' }, rating: 4.9, reviewCount: 92, location: 'Yogyakarta' },
  { id: 'p17', vendorId: 'v3', category: 'Dress', price: 18000000, title: 'Gaun Internasional "Ethereal"', description: 'Gaun A-line dengan bahan tulle lembut dan detail bordir bunga.', images: [getImage('product-2'), getImage('category-dress')], rating: 5.0, reviewCount: 101, location: 'Surabaya' },
  
  // Makeup (5)
  { id: 'p9', vendorId: 'v6', category: 'Makeup', price: 2500000, title: 'Makeup Artist (MUA) Akad & Resepsi', description: 'Jasa makeup untuk pengantin wanita pada saat akad dan resepsi.', images: [getImage('category-makeup'), getImage('user-avatar-3')], rating: 5.0, reviewCount: 112, location: 'Jakarta' },
  { id: 'p18', vendorId: 'v15', category: 'Makeup', price: 3000000, title: 'Paket Makeup "Flawless Glow"', description: 'Makeup pengantin dengan teknik airbrush untuk hasil yang tahan lama dan sempurna.', images: [getImage('user-avatar-3'), getImage('category-makeup')], rating: 5.0, reviewCount: 150, location: 'Bandung' },
  { id: 'p19', vendorId: 'v6', category: 'Makeup', price: 4000000, title: 'Makeup & Hairdo Keluarga (4 orang)', description: 'Paket makeup dan tatanan rambut untuk ibu dan saudari pengantin.', images: [getImage('category-makeup'), getImage('user-avatar-3')], specificAttributes: { Orang: 4 }, rating: 4.9, reviewCount: 130, location: 'Jakarta' },
  { id: 'p20', vendorId: 'v15', category: 'Makeup', price: 1500000, title: 'Jasa Touch Up Resepsi', description: 'Jasa touch up makeup untuk pengantin di lokasi resepsi.', images: [getImage('user-avatar-3'), getImage('category-makeup')], rating: 4.8, reviewCount: 95, location: 'Bandung' },
  { id: 'p21', vendorId: 'v6', category: 'Makeup', price: 2000000, title: 'Makeup Pengantin Adat Jawa', description: 'Rias pengantin lengkap dengan paes adat Jawa Solo atau Yogya.', images: [getImage('category-makeup'), getImage('user-avatar-3')], rating: 4.9, reviewCount: 160, location: 'Yogyakarta' },
  
  // Decor (5)
  { id: 'p4', vendorId: 'v5', category: 'Decor', price: 25000000, title: 'Dekorasi Pelaminan Rustic', description: 'Dekorasi pelaminan dengan tema rustic, menggunakan bunga asli dan kayu berkualitas.', images: [getImage('product-4'), getImage('blog-1')], rating: 4.9, reviewCount: 95, location: 'Semarang' },
  { id: 'p22', vendorId: 'v14', category: 'Decor', price: 40000000, title: 'Dekorasi "Glamour White"', description: 'Dekorasi elegan serba putih dengan aksen mawar dan kristal.', images: [getImage('promo-1'), getImage('product-4')], rating: 4.8, reviewCount: 115, location: 'Jakarta' },
  { id: 'p23', vendorId: 'v5', category: 'Decor', price: 15000000, title: 'Dekorasi Akad Nikah Minimalis', description: 'Dekorasi simpel dan elegan untuk prosesi akad nikah di rumah atau masjid.', images: [getImage('product-4'), getImage('blog-1')], rating: 4.7, reviewCount: 88, location: 'Semarang' },
  { id: 'p24', vendorId: 'v14', category: 'Decor', price: 30000000, title: 'Dekorasi Taman Bunga', description: 'Ubah venue Anda menjadi taman bunga impian dengan aneka bunga segar impor.', images: [getImage('blog-1'), getImage('product-4')], rating: 4.9, reviewCount: 105, location: 'Jakarta' },
  { id: 'p25', vendorId: 'v5', category: 'Decor', price: 7000000, title: 'Photo Booth Corner', description: 'Paket pembuatan photo booth tematik lengkap dengan properti lucu.', images: [getImage('product-4'), getImage('blog-1')], rating: 4.8, reviewCount: 120, location: 'Semarang' },

  // Souvenir (5)
  { id: 'p8', vendorId: 'v8', category: 'Souvenir', price: 2000000, title: '500 Pcs Souvenir Gelas Custom', description: 'Souvenir gelas dengan desain custom nama dan tanggal pernikahan.', images: [getImage('product-8'), getImage('category-venue')], specificAttributes: { Jumlah: 500 }, rating: 4.6, reviewCount: 130, location: 'Surabaya' },
  { id: 'p26', vendorId: 'v8', category: 'Souvenir', price: 3500000, title: '300 Pcs Pouch Kulit Sintetis', description: 'Pouch serbaguna dari kulit sintetis dengan emboss inisial nama.', images: [getImage('product-8'), getImage('category-venue')], specificAttributes: { Jumlah: 300 }, rating: 4.8, reviewCount: 90, location: 'Surabaya' },
  { id: 'p27', vendorId: 'v8', category: 'Souvenir', price: 2500000, title: '500 Pcs Kipas Tangan Batik', description: 'Kipas tangan cantik dengan kain motif batik tradisional.', images: [getImage('product-8'), getImage('category-venue')], specificAttributes: { Jumlah: 500 }, rating: 4.7, reviewCount: 150, location: 'Yogyakarta' },
  { id: 'p28', vendorId: 'v8', category: 'Souvenir', price: 5000000, title: '200 Pcs Reed Diffuser Aromaterapi', description: 'Souvenir mewah berupa pengharum ruangan aromaterapi.', images: [getImage('product-8'), getImage('category-venue')], specificAttributes: { Jumlah: 200 }, rating: 4.9, reviewCount: 75, location: 'Jakarta' },
  { id: 'p29', vendorId: 'v8', category: 'Souvenir', price: 1500000, title: '500 Pcs Gantungan Kunci Kayu Grafir', description: 'Gantungan kunci kayu dengan grafir nama dan tanggal.', images: [getImage('product-8'), getImage('category-venue')], specificAttributes: { Jumlah: 500 }, rating: 4.5, reviewCount: 200, location: 'Bandung' },

  // Audio/MC (5)
  { id: 'p6', vendorId: 'v7', category: 'Audio/MC', price: 5000000, title: 'MC Profesional & Sound System', description: 'MC berpengalaman untuk memandu acara resepsi Anda, plus sound system 5000 watt.', images: [getImage('product-6'), getImage('promo-3')], rating: 4.8, reviewCount: 75, location: 'Bandung' },
  { id: 'p30', vendorId: 'v7', category: 'Audio/MC', price: 8000000, title: 'Paket Akustik Band', description: 'Satu set band akustik (vokal, gitar, bass, cajon) untuk 2 sesi.', images: [getImage('product-6'), getImage('promo-3')], rating: 4.9, reviewCount: 65, location: 'Bandung' },
  { id: 'p31', vendorId: 'v7', category: 'Audio/MC', price: 12000000, title: 'Paket Full Band Entertainment', description: 'Full band dengan 2 vokalis dan alat musik lengkap untuk memeriahkan pesta Anda.', images: [getImage('product-6'), getImage('promo-3')], rating: 5.0, reviewCount: 80, location: 'Jakarta' },
  { id: 'p32', vendorId: 'v7', category: 'Audio/MC', price: 3000000, title: 'DJ Performance (2 Jam)', description: 'DJ profesional untuk sesi after-party yang lebih modern.', images: [getImage('product-6'), getImage('promo-3')], rating: 4.7, reviewCount: 50, location: 'Surabaya' },
  { id: 'p33', vendorId: 'v7', category: 'Audio/MC', price: 6000000, title: 'MC Adat Jawa & Pranotocoro', description: 'MC yang fasih memandu acara dengan adat dan bahasa Jawa halus.', images: [getImage('product-6'), getImage('promo-3')], rating: 4.9, reviewCount: 70, location: 'Yogyakarta' },
  
  // Catering (5)
  { id: 'p5', vendorId: 'v2', category: 'Catering', price: 45000000, title: 'Paket Catering Nusantara 500 Porsi', description: 'Menu masakan tradisional Indonesia lengkap dengan gubukan dan dessert.', images: [getImage('product-5'), getImage('promo-2')], specificAttributes: { Porsi: 500 }, rating: 4.8, reviewCount: 250, location: 'Bandung' },
  { id: 'p34', vendorId: 'v11', category: 'Catering', price: 80000000, title: 'Paket Catering Western 500 Porsi', description: 'Menu western food (steak, pasta, salad) untuk selera internasional.', images: [getImage('promo-2'), getImage('product-5')], specificAttributes: { Porsi: 500 }, rating: 4.9, reviewCount: 180, location: 'Jakarta' },
  { id: 'p35', vendorId: 'v2', category: 'Catering', price: 25000000, title: 'Catering Intimate 100 Porsi', description: 'Paket hemat untuk acara intimate dengan menu pilihan.', images: [getImage('product-5'), getImage('promo-2')], specificAttributes: { Porsi: 100 }, rating: 4.7, reviewCount: 120, location: 'Bandung' },
  { id: 'p36', vendorId: 'v11', category: 'Catering', price: 10000000, title: 'Gubukan Sate & Bakso (200 Porsi)', description: 'Tambahan gubukan sate ayam dan bakso Malang untuk 200 porsi.', images: [getImage('promo-2'), getImage('product-5')], specificAttributes: { Porsi: 200 }, rating: 4.8, reviewCount: 210, location: 'Jakarta' },
  { id: 'p37', vendorId: 'v2', category: 'Catering', price: 90000000, title: 'Paket Lengkap Royal 1000 Porsi', description: 'Paket terlengkap dengan menu nusantara, western, dan aneka dessert.', images: [getImage('product-5'), getImage('promo-2')], specificAttributes: { Porsi: 1000 }, rating: 4.9, reviewCount: 280, location: 'Surabaya' },
  
  // Photo/Studio (5)
  { id: 'p3', vendorId: 'v4', category: 'Photo/Studio', price: 8000000, title: 'Paket Foto & Video "Eternal Love"', description: 'Paket lengkap liputan foto dan video seharian, termasuk album cetak dan drone shot.', images: [getImage('product-3'), getImage('product-7')], rating: 4.7, reviewCount: 150, location: 'Yogyakarta' },
  { id: 'p38', vendorId: 'v12', category: 'Photo/Studio', price: 12000000, title: 'Paket Cinematic Wedding Film', description: 'Video pernikahan sinematik dengan durasi 5-7 menit dan 1 menit highlight.', images: [getImage('product-7'), getImage('product-3')], rating: 4.9, reviewCount: 130, location: 'Bandung' },
  { id: 'p39', vendorId: 'v4', category: 'Photo/Studio', price: 5000000, title: 'Jasa Fotografi Akad Saja', description: 'Liputan foto khusus untuk prosesi akad nikah (durasi 3 jam).', images: [getImage('product-3'), getImage('product-7')], rating: 4.6, reviewCount: 99, location: 'Yogyakarta' },
  { id: 'p40', vendorId: 'v12', category: 'Photo/Studio', price: 15000000, title: 'Paket Foto & Video "Diamond"', description: '2 fotografer, 2 videografer, drone, same-day edit, dan album eksklusif.', images: [getImage('product-7'), getImage('product-3')], rating: 5.0, reviewCount: 110, location: 'Jakarta' },
  { id: 'p41', vendorId: 'v4', category: 'Photo/Studio', price: 2000000, title: 'Photobooth Unlimited Print', description: 'Jasa photobooth dengan cetak foto sepuasnya selama 3 jam.', images: [getImage('product-3'), getImage('product-7')], rating: 4.8, reviewCount: 180, location: 'Semarang' },

  // Pre-wed (5)
  { id: 'p7', vendorId: 'v9', category: 'Pre-wed', price: 3500000, title: 'Sesi Foto Pre-wedding Outdoor', description: 'Sesi foto pre-wedding selama 4 jam di lokasi outdoor pilihan di Yogyakarta.', images: [getImage('product-7'), getImage('product-3')], rating: 4.9, reviewCount: 210, location: 'Yogyakarta' },
  { id: 'p42', vendorId: 'v9', category: 'Pre-wed', price: 5000000, title: 'Pre-wedding Video Clip', description: 'Pembuatan video clip pre-wedding romantis dengan konsep cerita.', images: [getImage('product-3'), getImage('product-7')], rating: 4.8, reviewCount: 120, location: 'Bandung' },
  { id: 'p43', vendorId: 'v9', category: 'Pre-wed', price: 6000000, title: 'Pre-wedding di Bromo', description: 'Paket petualangan pre-wedding di Gunung Bromo, termasuk transportasi dan izin.', images: [getImage('product-7'), getImage('product-3')], rating: 5.0, reviewCount: 95, location: 'Surabaya' },
  { id: 'p44', vendorId: 'v9', category: 'Pre-wed', price: 2500000, title: 'Foto Pre-wedding Studio Konsep', description: 'Sesi foto di studio dengan 3 konsep dan background berbeda.', images: [getImage('product-3'), getImage('product-7')], rating: 4.7, reviewCount: 150, location: 'Jakarta' },
  { id: 'p45', vendorId: 'v9', category: 'Pre-wed', price: 4000000, title: 'Pre-wedding Pantai di Banten', description: 'Sesi foto pre-wedding dengan latar belakang pantai dan matahari terbenam.', images: [getImage('product-7'), getImage('product-3')], rating: 4.9, reviewCount: 115, location: 'Banten' },
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
  "Bandung",
  "Surabaya",
  "Yogyakarta",
  "Semarang",
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
  { id: 'ord1', userId: 'mock-uid-1', items: [{ productId: 'p1', quantity: 1 }, { productId: 'p2', quantity: 1 }], total: 90000000, status: 'completed', date: '2023-07-15' },
  { id: 'ord2', userId: 'mock-uid-1', items: [{ productId: 'p5', quantity: 1 }], total: 45000000, status: 'paid', date: '2024-05-20' },
];

export const blogPosts = [
  { id: 'b1', title: '5 Tips Memilih Venue Pernikahan yang Tepat', excerpt: 'Memilih venue adalah salah satu keputusan terbesar dalam perencanaan pernikahan...', image: getImage('blog-1'), link: '/blog/5-tips-memilih-venue-pernikahan' },
  { id: 'b2', title: 'Panduan Lengkap Negosiasi dengan Vendor Pernikahan', excerpt: 'Dapatkan harga terbaik tanpa mengorbankan kualitas. Pelajari cara negosiasi yang efektif...', image: getImage('blog-2'), link: '/blog/panduan-negosiasi-vendor' },
  { id: 'b3', title: 'Inspirasi Destinasi Bulan Madu Romantis di Pulau Jawa', excerpt: 'Tidak perlu jauh-jauh, Pulau Jawa menyimpan banyak permata tersembunyi untuk bulan madu...', image: getImage('blog-3'), link: '/blog/destinasi-bulan-madu' },
];
