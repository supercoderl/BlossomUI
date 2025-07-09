'use client'

import React from 'react';
import HomeLayout from '@/components/Layout/home';
import HeroSection from './Hero';
import ServiceSection from './Service';
import FAQsSection from './FAQs';
import { useApiLoadingStore } from '@/stores/loadingStore';
import { EB_Garamond, Jost } from 'next/font/google';

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

const ServiceMenu = () => {
  const { loading } = useApiLoadingStore();

  return (
    <HomeLayout curActive='/service-menu' isDark loading={loading["get-categories"] || loading["get-services"]}>
      <main>
        <HeroSection font={eb} />
        <ServiceSection font={eb} font2={jost} />
        <FAQsSection font={eb} font2={jost} />
      </main>
    </HomeLayout>
  );
};

export default ServiceMenu;