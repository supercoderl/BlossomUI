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
import { SignalRProvider } from "@/providers/signalRProvider";
import { UserProvider } from "@/providers/userProvider";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'index' });

  return {
    title: t('title'),
    description: t('desc'),
  };
}

export default async function BasicLayout({ children, params }: any) {
  const messages = await getMessages({ locale: params?.locale });

  return (
    <html lang={params?.locale}>
      <body>
        <NextIntlClientProvider locale={params?.locale} messages={messages}>
          <UserProvider>
            <SignalRProvider>
              <MessageProvider>
                <AntdRegistry>{children}</AntdRegistry>
              </MessageProvider>
            </SignalRProvider>
          </UserProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}