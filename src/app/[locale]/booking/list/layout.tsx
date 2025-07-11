import { NextIntlClientProvider, useMessages } from 'next-intl';



export default function LocaleLayout({ children, params: { locale } }: any) {
    // Receive messages provided in `i18n.ts`
    const messages = useMessages();

    return <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
    </NextIntlClientProvider>
}