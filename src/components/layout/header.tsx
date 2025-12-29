
"use client";

import Link from 'next/link';
import {
  Heart,
  Home,
  LayoutGrid,
  LogIn,
  LogOut,
  Newspaper,
  PanelLeft,
  Search,
  ShoppingCart,
  User,
} from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';

const mainNavLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Store' },
  { href: '/blog', label: 'Blog' },
];

export function AppHeader() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();

  const getAvatarFallback = (name: string | null | undefined) => {
    return name ? name.charAt(0).toUpperCase() : <User className="h-5 w-5" />;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
         <div className="flex items-center gap-4">
             <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                  <Link
                    href="#"
                    className="group flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                  >
                    <span className="font-headline text-lg font-bold">Janji Suci</span>
                  </Link>
                  {mainNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-headline text-xl font-bold">Janji Suci</span>
            </Link>
         </div>

        <div className="flex-1 mx-8 hidden md:block">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                type="search"
                placeholder="Cari vendor, produk, dan inspirasi..."
                className="w-full rounded-full pl-10 h-10 bg-muted/50 border-none"
                />
            </div>
        </div>
        
        <nav className="flex items-center gap-4">
            {user ? (
                <>
                <Link href="/cart">
                    <Button variant="ghost" size="icon" aria-label="Cart">
                        <ShoppingCart className="h-5 w-5" />
                        {cartCount > 0 && (
                        <Badge variant="destructive" className="absolute top-0 right-0 h-5 w-5 justify-center p-0">{cartCount}</Badge>
                        )}
                    </Button>
                </Link>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                        <AvatarImage src={user.profileData?.avatar} alt={user.name || 'User'} />
                        <AvatarFallback>{getAvatarFallback(user.name)}</AvatarFallback>
                        </Avatar>
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                        </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href="/profile"><User className="mr-2 h-4 w-4" />Profile</Link>
                    </DropdownMenuItem>
                    {user.role === 'admin' && (
                        <DropdownMenuItem asChild>
                            <Link href="/admin"><Heart className="mr-2 h-4 w-4" />Admin Dashboard</Link>
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
                <div className="flex items-center gap-2">
                    <Button variant="outline" asChild>
                        <Link href="/login">Masuk</Link>
                    </Button>
                    <Button asChild>
                         <Link href="/register">Daftar</Link>
                    </Button>
                </div>
            )}
        </nav>
      </div>
      <Separator />
       <div className="container hidden md:flex h-12 max-w-screen-2xl items-center">
            <nav className="flex items-center gap-6 text-sm font-medium">
            {mainNavLinks.map((link) => (
                <Link
                key={link.href}
                href={link.href}
                className="text-foreground/80 transition-colors hover:text-foreground"
                >
                {link.label}
                </Link>
            ))}
            </nav>
       </div>
    </header>
  );
}
