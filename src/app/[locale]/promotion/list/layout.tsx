import { NextIntlClientProvider, useMessages } from 'next-intl';

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
    // Receive messages provided in `i18n.ts`
    const messages = useMessages();
    const { locale } = await params;

    return <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
    </NextIntlClientProvider>
}