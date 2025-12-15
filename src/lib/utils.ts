import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(
  price: number,
  options: {
    currency?: 'USD' | 'EUR' | 'GBP' | 'IDR';
    notation?: Intl.NumberFormatOptions['notation'];
  } = {}
) {
  const { currency = 'IDR', notation = 'compact' } = options;

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency,
    notation,
    maximumFractionDigits: 0,
  }).format(price);
}
