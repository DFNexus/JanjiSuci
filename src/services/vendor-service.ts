'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import type { Vendor, VendorInput } from '@/lib/types';

const VENDORS_COLLECTION = 'vendors';

// Create
export async function addVendor(vendorData: VendorInput): Promise<Vendor> {
  const docRef = await addDoc(collection(db, VENDORS_COLLECTION), {
    ...vendorData,
    rating: 0, // Initial value
    reviewCount: 0, // Initial value
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
  const vendors: Vendor[] = [];
  querySnapshot.forEach((doc) => {
    vendors.push({ id: doc.id, ...doc.data() } as Vendor);
  });
  return vendors;
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
