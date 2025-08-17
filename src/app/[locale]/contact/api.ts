import { Filter } from "@/types/filter";
import { withApiLoading } from "@/utils/helpers";
import req from "@/utils/req";

export const getContacts = (filter: Filter) =>
    withApiLoading('get-contacts', () =>
        req.get('/Contact', {
            params: {
                query: filter.query,
                searchTerm: filter.searchTerm,
                includeDeleted: filter.includeDeleted
            }
        }));

export const getContactsByEmail = (filter: Filter) =>
    withApiLoading('get-contacts-by-email', () =>
        req.get('/Contact/with-email', {
            params: {
                query: filter.query,
                includeResponses: filter.includeResponses,
                email: filter.email
            }
        }));

export const createContact = (data: unknown) =>
    withApiLoading('create-contact', () =>
        req.post(`/Contact`, data));

export const responseContact = (data: unknown) =>
    withApiLoading('response-contact', () =>
        req.post(`/ContactResponse`, data));