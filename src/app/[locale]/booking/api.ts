import { Filter } from "@/types/filter";
import { withApiLoading } from "@/utils/helpers";
import req from "@/utils/req";

export const getTransactions = (filter: Filter) =>
    withApiLoading('get-transactions', () =>
        req.get('/Payment', {
            params: {
                query: filter.query,
                searchTerm: filter.searchTerm,
                includeDeleted: filter.includeDeleted
            }
        }));

export const getBookings = (filter: Filter) =>
    withApiLoading('get-bookings', () =>
        req.get('/Booking', {
            params: {
                query: filter.query,
                searchTerm: filter.searchTerm,
                includeDeleted: filter.includeDeleted
            }
        }));