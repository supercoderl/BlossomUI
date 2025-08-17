import { Gender } from "@/enums/gender";
import { UserRoles } from "@/enums/userRoles";
import { Filter } from "@/types/filter";
import { withApiLoading } from "@/utils/helpers";
import req from "@/utils/req";
import moment from "moment";

export const getUsers = (filter: Filter) =>
    withApiLoading('get-users', () =>
        req.get('/User', {
            params: filter
        }));

export const loginApi = (email: string, pwd: string) =>
    withApiLoading('login', () =>
        req.post('/User/login', {
            identifier: email,
            password: pwd,
        }));

export const registerApi = (
    email: string,
    pwd: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    gender: Gender,
    dateOfBirth: Date,
    website: string,
    role?: UserRoles
) =>
    withApiLoading('register', () =>
        req.post('/User', {
            email,
            firstName,
            lastName,
            phoneNumber,
            gender,
            dateOfBirth: moment(new Date(dateOfBirth)).format('YYYY-MM-DD'),
            password: pwd,
            website,
            role: role ?? UserRoles.Customer
        })
    );

export const getUserById = (id: string) =>
    withApiLoading('get-user-by-id', () =>
        req.get(`/User/${id}`));

export const getMyProfile = () =>
    withApiLoading('get-my-profile', () =>
        req.get(`/User/me`));

export const updateUser = (formData: any) =>
    withApiLoading('update-user', () =>
        req.put(`/User`, formData));

export const getTechnicians = (filter: Filter) =>
    withApiLoading('get-technicians', () =>
        req.get('/Technician', {
            params: {
                query: filter.query,
                searchTerm: filter.searchTerm,
                includeDeleted: filter.includeDeleted
            }
        }));

export const getWorkSchedules = (filter: Filter) =>
    withApiLoading('get-work-schedules', () =>
        req.get('/WorkSchedule', {
            params: {
                query: filter.query,
                searchTerm: filter.searchTerm,
                includeDeleted: filter.includeDeleted,
                excludeBot: filter.excludeBot
            }
        }));

export const createWorkSchedule = (data: any) =>
    withApiLoading('create-work-schedule', () =>
        req.post('/WorkSchedule', data));

export const forgotPassword = (identifier: string) =>
    withApiLoading('forgot-password', () =>
        req.post('/User/forgot-password', { identifier }));

export const resetPassword = (code: string, newPassword: string) =>
    withApiLoading('reset-password', () =>
        req.post('/User/reset-password', { code, newPassword }));

export const subscribe = (email: string) =>
    withApiLoading('subscribe', () =>
        req.post('/Subscriber', { email })); 