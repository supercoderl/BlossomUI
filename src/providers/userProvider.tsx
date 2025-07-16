import { UserCookieInfo } from '@/types/user';
import { createContext, useContext } from 'react';

export const UserContext = createContext<UserCookieInfo | undefined>(undefined);

export const useUser = () => useContext(UserContext);