'use server';

import { UserCookieInfo } from '@/types/user';
import { cookies } from 'next/headers';

export async function setTokenCookie(token: string) {
    const cookieStore = await cookies();

    cookieStore.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
    });
}

export async function getTokenCookie() {
    const cookieStore = await cookies();

    return cookieStore.get('token');
}

export async function setRefreshTokenCookie(token: string) {
    const cookieStore = await cookies();

    cookieStore.set('refresh-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
    });
}

export async function getRefreshTokenCookie() {
    const cookieStore = await cookies();

    return cookieStore.get('refresh-token');
}

export async function setUserInfo(userInfo: UserCookieInfo) {
    const cookieStore = await cookies();

    cookieStore.set('userInfo', JSON.stringify(userInfo), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
    });
}

export async function getUserInfo() {
    const cookieStore = await cookies();

    return cookieStore.get('userInfo');
}