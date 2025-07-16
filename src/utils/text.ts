import { PromotionChecker } from "@/types/promotion";
import { formatter } from "./currency";
import { DiscountType } from "@/enums/discountType";

export const getTotalPriceValue = (totalPrice: number, promotion?: PromotionChecker | null) => {
    if(!promotion) return {
        discountValue: formatter().format(0),
        totalPrice: formatter().format(totalPrice),
        label: formatter().format(totalPrice)
    }

    if(promotion.type === DiscountType.Fixed) {
        return {
            discountValue: formatter().format(promotion.value),
            totalPrice: totalPrice - promotion.value,
            label: formatter().format(totalPrice - promotion.value)
        };
    }

    return {
        discountValue: formatter().format(totalPrice * (promotion.value / 100)),
        totalPrice: totalPrice - (totalPrice * (promotion.value / 100)),
        label: formatter().format(totalPrice - (totalPrice * (promotion.value / 100)))
    };
}