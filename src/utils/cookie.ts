'use server';

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