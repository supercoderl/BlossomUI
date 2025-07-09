import { Filter } from "@/types/filter";
import { withApiLoading } from "@/utils/helpers";
import req from "@/utils/req";

export const getPromotions = (filter: Filter) =>
    withApiLoading('get-promotions', () =>
        req.get('/Promotion', {
            params: {
                query: filter.query,
                searchTerm: filter.searchTerm,
                includeDeleted: filter.includeDeleted
            }
        }));

export const createPromotion = (data: any) =>
    withApiLoading('create-promotion', () =>
        req.post(`/Promotion`, data));

export const deletePromotion = (id: string) =>
    withApiLoading('delete-promotion', () =>
        req.delete(`/Promotion/${id}`));

export const getPromotionById = (id: string) =>
    withApiLoading('get-promotion-by-id', () =>
        req.get(`/Promotion/${id}`));

export const updatePromotion = (data: any) =>
    withApiLoading('update-promotion', () =>
        req.put(`/Promotion`, data));