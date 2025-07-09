export interface Service {
    id: string;
    name: string;
    description?: string | null;
    categoryId: string;
    price?: number | null;
    durationMinutes?: number | null;
    representativeImage?: string | null;
    createdAt: Date;
    updatedAt: Date;
    options: ServiceOption[];
}

export interface ServiceOption {
    serviceOptionId: string;
    serviceId: string;
    variantName: string;
    priceFrom: number;
    priceTo?: number | null;
    durationMinutes?: number | null;
}