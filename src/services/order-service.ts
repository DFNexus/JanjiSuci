
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import type { CartItem, CustomerInfo } from '@/lib/types';

const ORDERS_COLLECTION = 'orders';

interface CreateOrderArgs {
    customerInfo: CustomerInfo;
    cartItems: CartItem[];
    userId: string;
    total: number;
}

export async function createOrder({ customerInfo, cartItems, userId, total }: CreateOrderArgs): Promise<string> {
    
    const orderItems = cartItems.map(item => ({
        productId: item.product.id,
        productName: item.product.title,
        vendorId: item.product.vendorId,
        price: item.product.price,
        quantity: item.quantity,
        // Convert bookingDate to a string for Firestore serialization
        bookingDate: item.bookingDate ? item.bookingDate.toISOString() : 'N/A',
    }));

    const newOrder = {
        customerInfo,
        items: orderItems,
        userId,
        total,
        status: 'pending',
        timestamp: serverTimestamp(),
    };

    try {
        const docRef = await addDoc(collection(db, ORDERS_COLLECTION), newOrder);
        return docRef.id;
    } catch (error) {
        console.error("Error creating order in Firestore: ", error);
        throw new Error("Could not create the order.");
    }
}
