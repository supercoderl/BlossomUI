"use client"

import { UserContextType, UserCookieInfo } from '@/types/user';
import { createContext, useContext, useState } from 'react';

const UserContext = createContext<UserContextType | null>(null);

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};

interface UserProviderProps {
    children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInfo, setUserInfo] = useState<UserCookieInfo | null>(null);

    return (
        <UserContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated,
            userInfo,
            setUserInfo
        }}>
            {children}
        </UserContext.Provider>
    )
}