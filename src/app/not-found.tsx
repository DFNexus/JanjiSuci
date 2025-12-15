import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SearchX } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container flex h-[80vh] flex-col items-center justify-center text-center">
        <SearchX className="h-24 w-24 text-muted-foreground/20" />
      <h1 className="mt-8 text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">
        Halaman Tidak Ditemukan
      </h1>
      <p className="mt-4 text-base text-muted-foreground sm:mt-6">
        Maaf, kami tidak dapat menemukan halaman yang Anda cari.
      </p>
      <div className="mt-10 flex justify-center">
        <Link href="/">
          <Button>Kembali ke Beranda</Button>
        </Link>
      </div>
    </div>
  );
}
