
"use client";

import { Button } from "@/components/ui/button";
import type { Vendor } from "@/lib/types";
import { MessageCircle } from "lucide-react";

interface ContactVendorButtonProps {
    vendor: Vendor;
}

export function ContactVendorButton({ vendor }: ContactVendorButtonProps) {
    const handleContact = () => {
        // Format number for WhatsApp API: remove '+' and any non-numeric characters
        const formattedPhone = vendor.whatsappNumber.replace(/[^0-9]/g, '');
        const message = `Halo ${vendor.name}, saya tertarik dengan salah satu produk Anda di Janji Suci.`;
        const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <Button variant="secondary-outline" onClick={handleContact}>
            <MessageCircle className="mr-2 h-4 w-4" />
            Hubungi Vendor
        </Button>
    )
}
