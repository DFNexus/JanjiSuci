
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, DocumentData, QueryDocumentSnapshot, getDoc } from 'firebase/firestore';
import type { Product, ProductInput } from '@/lib/types';
import { getVendors } from './vendor-service';

const PRODUCTS_COLLECTION = 'products';

// This function is no longer the primary source of data for getProducts,
// but is kept for reference or potential future use with Firestore.
const productFromDoc = async (docSnapshot: QueryDocumentSnapshot<DocumentData>): Promise<Product> => {
    const data = docSnapshot.data();
    let vendorLocation = 'N/A';
    
    if (data.vendorId) {
        try {
            // Since getVendors now reads from Firestore, we can use it to find the location
            const vendors = await getVendors();
            const vendor = vendors.find(v => v.id === data.vendorId);
            if (vendor) {
                vendorLocation = vendor.location;
            }
        } catch (error) {
            console.error("Error fetching vendor for product:", docSnapshot.id, error);
        }
    }

    return {
        id: docSnapshot.id,
        vendorId: data.vendorId,
        category: data.category,
        price: data.price,
        title: data.title,
        description: data.description,
        images: data.images || ['https://picsum.photos/seed/default/600/400'],
        specificAttributes: data.specificAttributes,
        rating: data.rating || 0,
        reviewCount: data.reviewCount || 0,
        location: vendorLocation,
    };
}


// Create - This still writes to Firestore
export async function addProduct(productData: ProductInput): Promise<string> {
  const completeProductData = {
    ...productData,
    rating: 0,
    reviewCount: 0,
    images: ['https://picsum.photos/seed/newproduct/600/400'], // Placeholder image
  };

  const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), completeProductData);
  return docRef.id;
}

// Read - Now returns mock data
export async function getProducts(): Promise<Product[]> {
  try {
    const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    if (querySnapshot.empty) {
        console.log("No products found in Firestore.");
        return [];
    }
    const products = await Promise.all(querySnapshot.docs.map(doc => productFromDoc(doc)));
    return products;
  } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Failed to fetch products from Firestore.");
  }
}

// Update - This still updates Firestore
export async function updateProduct(id: string, productData: Partial<ProductInput>): Promise<void> {
  const productRef = doc(db, PRODUCTS_COLLECTION, id);
  await updateDoc(productRef, productData);
}

// Delete - This still deletes from Firestore
export async function deleteProduct(id: string): Promise<void> {
  await deleteDoc(doc(db, PRODUCTS_COLLECTION, id));
}

