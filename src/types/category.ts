export interface Category {
    id: string;
    name: string;
    isActive: boolean;
    priority: number;
    createdAt: Date;
    updatedAt?: Date | null;
    deletedAt?: Date | null;
    icon: string;
    url: string;
}