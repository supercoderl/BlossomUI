import { BookingStatus } from "@/enums/bookingStatus";

export interface Booking {
    id: string;
    customerId?: string | null;
    technicianId?: string | null;
    scheduleTime: Date;
    totalPrice: number;
    status: BookingStatus;
    note?: string | null;
    guestName?: string | null;
    guestPhone?: string | null;
    guestEmail?: string | null;
    createdAt: Date;
    updatedAt?: Date | null;
    bookingDetails: BookingDetail[];
}

interface BookingDetail {
    id: string;
    quantity: number;
    unitPrice: number;
    service?: ServiceOrOption | null;
}

interface ServiceOrOption {
    id: string;
    durationMinutes: number;
}