import { Filter } from '@/types/filter';
import { withApiLoading } from '@/utils/helpers';
import req from '@/utils/req';

export const loginApi = (email: string, pwd: string) => req.post('/user/login', { email, pwd })

export const registerApi = (email: string, pwd: string) => req.post('/user/register', { email, pwd })

export const getBusinessAnalytics = (body: any) =>
    withApiLoading("business-analytics", () =>
        req.post("Dashboard/analytics", body));

export const getNotifications = (filter: Filter) =>
    withApiLoading('get-notifications', () =>
        req.get('/Notification', {
            params: {
                query: filter.query,
                searchTerm: filter.searchTerm,
                includeDeleted: filter.includeDeleted
            }
        }));