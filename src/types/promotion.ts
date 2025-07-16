import { DiscountType } from "@/enums/discountType";

export interface PromotionChecker {
    isValid: boolean;
    value: number;
    type: DiscountType;
}