import { Filter } from "@/types/filter";
import { withApiLoading } from "@/utils/helpers";
import req from "@/utils/req";

export const getServiceImages = (filter: Filter) =>
    withApiLoading('get-service-images', () =>
        req.get(`/ServiceImage`, {
            params: {
                query: filter.query,
                searchTerm: filter.searchTerm,
                includeDeleted: filter.includeDeleted
            }
        }));

export const createServiceImage = (formData: any) =>
    withApiLoading('create-service-image', () =>
        req.post(`/ServiceImage`, formData)
    );

export const updateServiceImage = (data: any) =>
    withApiLoading('update-service-image', () =>
        req.put(`/ServiceImage`, data)
    );