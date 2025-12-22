'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import type { Product, ProductInput } from '@/lib/types';

const PRODUCTS_COLLECTION = 'products';

// Create
export async function addProduct(productData: ProductInput): Promise<Product> {
  const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
    ...productData,
    rating: 0, // Initial value
    reviewCount: 0, // Initial value
  });
  return {
    id: docRef.id,
    ...productData,
    rating: 0,
    reviewCount: 0,
  };
}

// Read
export async function getProducts(): Promise<Product[]> {
  const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
  const products: Product[] = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() } as Product);
  });
  return products;
}

// Update
export async function updateProduct(id: string, productData: Partial<ProductInput>): Promise<void> {
  const productRef = doc(db, PRODUCTS_COLLECTION, id);
  await updateDoc(productRef, productData);
}

// Delete
export async function deleteProduct(id: string): Promise<void> {
  await deleteDoc(doc(db, PRODUCTS_COLLECTION, id));
}
