import { Filter } from "@/types/filter";
import { withApiLoading } from "@/utils/helpers";
import req from "@/utils/req";

export const getCategories = (filter: Filter) =>
    withApiLoading('get-categories', () =>
        req.get(`/Category`, {
            params: {
                ...filter.query,
                searchTerm: filter.searchTerm,
                includeDeleted: filter.includeDeleted
            }
        }));

export const createCategory = (data: any) =>
    withApiLoading('create-category', () =>
        req.post(`/Category`, data));

export const deleteCategory = (id: string) =>
    withApiLoading('delete-category', () =>
        req.delete(`/Category/${id}`));

export const getCategoryById = (id: string) =>
    withApiLoading('get-category-by-id', () =>
        req.get(`/Category/${id}`));

export const updateCategory = (data: any) =>
    withApiLoading('update-category', () =>
        req.put(`/Category`, data));