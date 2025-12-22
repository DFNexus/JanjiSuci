export type User = {
  uid: string;
  email: string | null;
  name: string | null;
  role: 'user' | 'admin';
  profileData?: {
    [key: string]: any;
  };
};

export type Vendor = {
  id: string;
  name: string;
  category: string;
  location: string;
  whatsappNumber: string;
  rating: number;
  reviewCount: number;
};

export type Product = {
  id: string;
  vendorId: string;
  category: string;
  price: number;
  title: string;
  description: string;
  images: string[];
  specificAttributes?: {
    [key: string]: string | number;
  };
  rating: number;
  reviewCount: number;
  location: string;
};

export type Review = {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
};


export type CartItem = {
  product: Product;
  quantity: number;
};

export type Order = {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'paid' | 'completed' | 'cancelled';
  date: string;
};

// Types for Firestore data manipulation
export type VendorInput = Omit<Vendor, 'id' | 'rating' | 'reviewCount'>;
export type ProductInput = Omit<Product, 'id' | 'rating' | 'reviewCount' | 'vendorId' | 'location'> & {
    vendorId: string;
};
