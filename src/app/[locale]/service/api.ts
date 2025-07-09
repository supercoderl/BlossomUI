import { Filter } from "@/types/filter";
import { withApiLoading } from "@/utils/helpers";
import req from "@/utils/req";

export const getServices = (filter: Filter) =>
    withApiLoading('get-services', () =>
        req.get('/Service', {
            params: {
                ...filter.query,
                searchTerm: filter.searchTerm,
                includeDeleted: filter.includeDeleted
            }
        }));

export const createService = (formData: any) =>
    withApiLoading('create-service', () =>
        req.post(`/Service`, formData));

export const deleteService = (id: string) =>
    withApiLoading('delete-service', () =>
        req.delete(`/Service/${id}`));

export const getServiceById = (id: string) =>
    withApiLoading('get-service-by-id', () =>
        req.get(`/Service/${id}`));

export const updateService = (formData: any) =>
    withApiLoading('update-service', () =>
        req.put(`/Service`, formData));