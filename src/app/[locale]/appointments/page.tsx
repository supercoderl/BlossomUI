'use client'

import React from 'react';
import HomeLayout from '@/components/Layout/home';
import HeroSection from './Hero';
import BookingFormSection from './BookingForm';
import { useApiLoadingStore } from '@/stores/loadingStore';
import { useRouter } from 'next/navigation';
import { EB_Garamond, Jost } from 'next/font/google';

const eb = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

const Appointments = () => {
  const { loading } = useApiLoadingStore();
  const router = useRouter();

  return (
    <HomeLayout
      curActive='/appointments'
      loading={loading['get-services'] || loading['get-technicians']}
    >
      <main>
        <HeroSection font={eb} />
        <BookingFormSection loading={loading} router={router} font={jost} />
      </main >
    </HomeLayout >
  );
};

export default Appointments;