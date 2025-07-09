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

export const createBooking = (data: any) =>
    withApiLoading('create-booking', () =>
        req.post(`/Booking`, data));

export const getAllTimeSlotsForTechnician = (technicianId: string, date: string) => {
    return withApiLoading('get-time-slots', () =>
        req.get(`/Booking/time-slots`, {
            params: {
                technicianId,
                selectedDate: date
            }
        }));
}