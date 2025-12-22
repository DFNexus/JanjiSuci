'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import type { Product, ProductInput } from '@/lib/types';
import { getVendors } from './vendor-service';

const PRODUCTS_COLLECTION = 'products';

const productFromDoc = (doc: QueryDocumentSnapshot<DocumentData>): Product => {
    const data = doc.data();
    return {
        id: doc.id,
        vendorId: data.vendorId,
        category: data.category,
        price: data.price,
        title: data.title,
        description: data.description,
        images: data.images || [],
        specificAttributes: data.specificAttributes,
        rating: data.rating || 0,
        reviewCount: data.reviewCount || 0,
        location: data.location
    };
}


// Create
export async function addProduct(productData: ProductInput): Promise<Product> {
  const vendors = await getVendors();
  const vendor = vendors.find(v => v.id === productData.vendorId);
  if (!vendor) {
    throw new Error('Vendor not found');
  }

  const completeProductData = {
    ...productData,
    category: vendor.category,
    location: vendor.location,
    rating: 0,
    reviewCount: 0,
    images: productData.images || ['https://picsum.photos/seed/newproduct/600/400'], // Placeholder image
  };

  const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), completeProductData);
  
  return {
    id: docRef.id,
    ...completeProductData
  };
}

// Read
export async function getProducts(): Promise<Product[]> {
  const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
  return querySnapshot.docs.map(productFromDoc);
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
