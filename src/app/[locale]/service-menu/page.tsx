'use client'

import React from 'react';
import HomeLayout from '@/components/Layout/home';
import HeroSection from './Hero';
import ServiceSection from './Service';
import FAQsSection from './FAQs';
import { useApiLoadingStore } from '@/stores/loadingStore';

const ServiceMenu = () => {
  const { loading } = useApiLoadingStore();

  return (
    <HomeLayout curActive='/service-menu' isDark loading={loading["get-categories"]}>
      <main>
        <HeroSection />
        <ServiceSection />
        <FAQsSection />
      </main>
    </HomeLayout>
  );
};

export default ServiceMenu;