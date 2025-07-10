import { UserRoles } from "@/enums/userRoles";
import { UserStatus } from "@/enums/userStatus";

export interface TechnicianInfo {
    id: string;
    userId: string;
    bio: string;
    rating: number;
    yearsOfExperience: number;
    fullName: string;
}

export interface UserInfo {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
    role: UserRoles;
    email: string;
    phoneNumber: string;
    status: UserStatus;
    dateOfBirth: Date;
    technicianInfo?: TechnicianInfo | null;
}

export interface UserCookieInfo {
    id: string;
    email: string;
    fullName: string;
    phoneNumber: string;
    role: string;
    avatarUrl: string;
    lastLogin?: Date | null;
}