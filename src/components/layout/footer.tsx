import Link from 'next/link';
import { Github, Twitter, Instagram } from 'lucide-react';
import { Icons } from '../icons';

export function AppFooter() {
  return (
    <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Icons.CremonicaLogo className="h-8 w-auto" />
          <p className="text-center text-sm leading-loose md:text-left">
            Built for dream weddings in Java. Find your perfect vendor with us.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-center text-sm md:text-left">
            © {new Date().getFullYear()} Cremonica. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <Link href="#" target="_blank" rel="noreferrer">
              <div className="h-8 w-8 flex items-center justify-center rounded-md border transition-colors hover:bg-muted">
                <Instagram className="h-4 w-4" />
              </div>
            </Link>
            <Link href="#" target="_blank" rel="noreferrer">
              <div className="h-8 w-8 flex items-center justify-center rounded-md border transition-colors hover:bg-muted">
                <Twitter className="h-4 w-4" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
