
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import type { Vendor, VendorInput } from '@/lib/types';
import { vendors as mockVendors } from '@/lib/mock-data';

const VENDORS_COLLECTION = 'vendors';

const vendorFromDoc = (doc: QueryDocumentSnapshot<DocumentData>): Vendor => {
    const data = doc.data();
    return {
        id: doc.id,
        name: data.name,
        category: data.category,
        location: data.location,
        whatsappNumber: data.whatsappNumber,
        rating: data.rating || 0,
        reviewCount: data.reviewCount || 0,
    };
}

// Create - This still writes to Firestore
export async function addVendor(vendorData: VendorInput): Promise<Vendor> {
  const docRef = await addDoc(collection(db, VENDORS_COLLECTION), {
    ...vendorData,
    rating: 0,
    reviewCount: 0,
  });
  return {
    id: docRef.id,
    ...vendorData,
    rating: 0,
    reviewCount: 0,
  };
}

// Read - Now returns mock data
export async function getVendors(): Promise<Vendor[]> {
  // To use Firestore data again, comment out the following line
  // and uncomment the original Firestore logic.
  return Promise.resolve(mockVendors);
  
  /*
  // Original Firestore Logic
  const querySnapshot = await getDocs(collection(db, VENDORS_COLLECTION));
  return querySnapshot.docs.map(vendorFromDoc);
  */
}

// Update - This still updates Firestore
export async function updateVendor(id: string, vendorData: Partial<VendorInput>): Promise<void> {
  const vendorRef = doc(db, VENDORS_COLLECTION, id);
  await updateDoc(vendorRef, vendorData);
}

// Delete - This still deletes from Firestore
export async function deleteVendor(id: string): Promise<void> {
  await deleteDoc(doc(db, VENDORS_COLLECTION, id));
}
