'use client';

import { NextIntlClientProvider, useMessages } from 'next-intl';

export default function LocaleLayout({ children, params }: any) {
    // Receive messages provided in `i18n.ts`
    const messages = useMessages();

    return <NextIntlClientProvider locale={params?.locale ?? "en"} messages={messages}>
        {children}
    </NextIntlClientProvider>
}