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

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/products', label: 'Products', icon: LayoutGrid },
  { href: '/blog', label: 'Blog', icon: Newspaper },
];

export function AppHeader() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();

  const getAvatarFallback = (name: string | null | undefined) => {
    return name ? name.charAt(0).toUpperCase() : <User className="h-5 w-5" />;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-headline text-lg font-bold">Janji Suci</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground/60 transition-colors hover:text-foreground/80"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        
        {/* Mobile Nav */}
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
              {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <link.icon className="h-5 w-5" />
                {link.label}
              </Link>
            ))}
            </nav>
          </SheetContent>
        </Sheet>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Search can be added here if needed */}
          </div>
          <nav className="flex items-center gap-2">
            <Link href="/cart">
              <Button variant="ghost" size="icon" aria-label="Cart">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge variant="destructive" className="absolute top-0 right-0 h-5 w-5 justify-center p-0">{cartCount}</Badge>
                )}
              </Button>
            </Link>

            {user ? (
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
            ) : (
              <Link href="/login">
                <Button>
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
