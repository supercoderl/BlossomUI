import { Gender } from "@/enums/gender";
import { UserRoles } from "@/enums/userRoles";
import { UserStatus } from "@/enums/userStatus";

export interface TechnicianInfo {
    id: string;
    userId: string;
    bio: string;
    rating: number;
    yearsOfExperience: number;
    fullName: string;
    avatarUrl: string;
}

export interface UserInfo {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
    coverPhotoUrl?: string | null;
    role: UserRoles;
    website?: string | null;
    email: string;
    phoneNumber: string;
    status: UserStatus;
    dateOfBirth: Date;
    technicianInfo?: TechnicianInfo | null;
}

export interface UserCookieInfo {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    role: UserRoles;
    avatarUrl: string;
    lastLogin?: Date | null;
    connectionId: string;
    coverPhotoUrl?: string | null;
    currentRoomId?: string | null;
    dateOfBirth: string;
    device: string;
    gender: Gender;
    status: UserStatus;
    website?: string | null;
}

export interface UserContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    userInfo: UserCookieInfo | null;
    setUserInfo: (value: UserCookieInfo) => void;
}