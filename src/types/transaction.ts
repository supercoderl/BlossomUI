import { PaymentMethod } from "@/enums/paymentMethod";
import { PaymentStatus } from "@/enums/paymentStatus";

export interface Transaction {
    id: string;
    bookingId: string;
    amount: number;
    method: PaymentMethod;
    status: PaymentStatus;
    transactionCode: string;
    createdAt: Date;
}