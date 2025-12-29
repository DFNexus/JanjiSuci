
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, DocumentData, QueryDocumentSnapshot, getDoc } from 'firebase/firestore';
import type { Product, ProductInput } from '@/lib/types';
import { getVendors } from './vendor-service';

const PRODUCTS_COLLECTION = 'products';

const productFromDoc = async (docSnapshot: QueryDocumentSnapshot<DocumentData>): Promise<Product> => {
    const data = docSnapshot.data();
    let vendorLocation = 'N/A';
    
    // The product's category is now directly on the product document.
    // The vendor's location still needs to be fetched.
    if (data.vendorId) {
        try {
            const vendorRef = doc(db, 'vendors', data.vendorId);
            const vendorSnap = await getDoc(vendorRef);
            if (vendorSnap.exists()) {
                vendorLocation = vendorSnap.data().location;
            }
        } catch (error) {
            console.error("Error fetching vendor for product:", docSnapshot.id, error);
        }
    }

    return {
        id: docSnapshot.id,
        vendorId: data.vendorId,
        category: data.category, // Use category from product itself
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


// Create
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

// Read
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

// Update
export async function updateProduct(id: string, productData: Partial<ProductInput>): Promise<void> {
  const productRef = doc(db, PRODUCTS_COLLECTION, id);
  await updateDoc(productRef, productData);
}

// Delete
export async function deleteProduct(id: string): Promise<void> {
  await deleteDoc(doc(db, PRODUCTS_COLLECTION, id));
}
