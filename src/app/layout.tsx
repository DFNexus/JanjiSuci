import type { Metadata } from 'next';
import './globals.css';
import { Alegreya } from 'next/font/google';
import { cn } from '@/lib/utils';
import { AuthProvider } from '@/context/auth-context';
import { CartProvider } from '@/context/cart-context';
import { AppHeader } from '@/components/layout/header';
import { AppFooter } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';

const alegreya = Alegreya({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-alegreya',
});

export const metadata: Metadata = {
  title: 'Cremonica - Your Javanese Wedding Marketplace',
  description:
    'Discover and book the finest wedding vendors across Java Island. Cremonica connects you with top-tier services for your special day.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
          alegreya.variable
        )}
      >
        <AuthProvider>
          <CartProvider>
            <div className="relative flex min-h-dvh flex-col bg-background">
              <AppHeader />
              <main className="flex-1">{children}</main>
              <AppFooter />
            </div>
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
