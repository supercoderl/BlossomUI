import type { Metadata } from "next";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import {
    getMessages,
    getTranslations
} from 'next-intl/server';
import "./globals.css";
import { MessageProvider } from "@/providers/messageProvider";
import { NextIntlClientProvider } from "next-intl";
import 'aos/dist/aos.css'

type Props = {
    children: React.ReactNode;
    params: { locale: string };
};

export async function generateMetadata({
    params: { locale }
}: Omit<Props, 'children'>): Promise<Metadata> {
    const t = await getTranslations({ locale, namespace: 'index' });

    return {
        // metadataBase: new URL('http://localhost:3000'),
        title: t('title'),
        description: t('desc'),
    };
}

export default async function BasicLayout({ children, params: { locale } }: Readonly<Props>) {
    const messages = await getMessages({ locale });

    return (
        <html lang={locale}>
            <head>
            </head>
            <body>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <MessageProvider>
                        <AntdRegistry>{children}</AntdRegistry>
                    </MessageProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
