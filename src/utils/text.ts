import { PromotionChecker } from "@/types/promotion";
import { formatter } from "./currency";
import { DiscountType } from "@/enums/discountType";

export const getTotalPriceValue = (totalPrice: number, promotion?: PromotionChecker | null) => {
    if (!promotion) return {
        discountValue: formatter().format(0),
        totalPrice: totalPrice,
        label: formatter().format(totalPrice)
    }

    if (promotion.type === DiscountType.Fixed) {
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

export function generatePassword(length = 12) {
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

    const allChars = lower + upper + numbers + symbols;

    let password = '';

    password += lower[Math.floor(Math.random() * lower.length)];
    password += upper[Math.floor(Math.random() * upper.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];

    for (let i = password.length; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    password = password.split('').sort(() => Math.random() - 0.5).join('');

    return password;
}

export function toFraction(x: number, tolerance = 1e-10) {
    let h1 = 1, h2 = 0;
    let k1 = 0, k2 = 1;
    let b = x;

    do {
        let a = Math.floor(b);
        let aux = h1; h1 = a * h1 + h2; h2 = aux;
        aux = k1; k1 = a * k1 + k2; k2 = aux;
        b = 1 / (b - a);
    } while (Math.abs(x - h1 / k1) > x * tolerance);

    return `${h1}/${k1}`;
}