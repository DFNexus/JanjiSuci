
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import type { Vendor, VendorInput } from '@/lib/types';

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

// Create
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

// Read
export async function getVendors(): Promise<Vendor[]> {
  const querySnapshot = await getDocs(collection(db, VENDORS_COLLECTION));
  return querySnapshot.docs.map(vendorFromDoc);
}

// Update
export async function updateVendor(id: string, vendorData: Partial<VendorInput>): Promise<void> {
  const vendorRef = doc(db, VENDORS_COLLECTION, id);
  await updateDoc(vendorRef, vendorData);
}

// Delete
export async function deleteVendor(id: string): Promise<void> {
  await deleteDoc(doc(db, VENDORS_COLLECTION, id));
}
