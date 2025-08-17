'use client'

import React from 'react';
import HomeLayout from '@/components/Layout/home';
import HeroSection from './Hero';
import WorkSchedule from './WorkSchedule';
import LocationSection from './Location';
import FormSection from './Form';
import CareerSection from './Career';
import FAQSection from './Faq';
import { EB_Garamond, Jost } from 'next/font/google';
import { useGlobalMessage } from '@/providers/messageProvider';
import { useApiLoadingStore } from '@/stores/loadingStore';

const eb = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-inter",
});

const Contact = () => {
  const [messageApi] = useGlobalMessage();
  const { loading } = useApiLoadingStore();

  return (
    <HomeLayout curActive='/contact'>
      <main>
        <HeroSection font={eb} font2={jost} />
        <WorkSchedule font={jost} />
        <LocationSection />
        <FormSection font={eb} font2={jost} messageApi={messageApi} loading={loading} />
        <CareerSection font={jost} />
        <FAQSection font={jost} />
      </main >
    </HomeLayout >
  );
};

export default Contact;