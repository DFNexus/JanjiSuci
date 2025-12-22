'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, DocumentData, QueryDocumentSnapshot, getDoc } from 'firebase/firestore';
import type { Product, ProductInput } from '@/lib/types';
import { getVendors } from './vendor-service';

const PRODUCTS_COLLECTION = 'products';

const productFromDoc = async (doc: QueryDocumentSnapshot<DocumentData>): Promise<Product> => {
    const data = doc.data();
    const vendorSnapshot = await getDoc(doc(db, 'vendors', data.vendorId));
    const vendorData = vendorSnapshot.data();

    return {
        id: doc.id,
        vendorId: data.vendorId,
        category: vendorData?.category || data.category,
        price: data.price,
        title: data.title,
        description: data.description,
        images: data.images || [],
        specificAttributes: data.specificAttributes,
        rating: data.rating || 0,
        reviewCount: data.reviewCount || 0,
        location: vendorData?.location || data.location
    };
}


// Create
export async function addProduct(productData: Omit<ProductInput, 'images'>): Promise<Product> {
  const vendors = await getVendors();
  const vendor = vendors.find(v => v.id === productData.vendorId);
  if (!vendor) {
    throw new Error('Vendor not found');
  }

  const completeProductData = {
    ...productData,
    rating: 0,
    reviewCount: 0,
    images: ['https://picsum.photos/seed/newproduct/600/400'], // Placeholder image
  };

  const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), completeProductData);
  
  const vendorSnapshot = await getDoc(doc(db, 'vendors', completeProductData.vendorId));
  const vendorData = vendorSnapshot.data();

  return {
    id: docRef.id,
    ...completeProductData,
    category: vendorData?.category,
    location: vendorData?.location
  };
}

// Read
export async function getProducts(): Promise<Product[]> {
  const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
  return Promise.all(querySnapshot.docs.map(productFromDoc));
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
