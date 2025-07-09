'use client'

import React from 'react';
import HomeLayout from '@/components/Layout/home';
import HeroSection from './Hero';
import PhilosophySection from './Philosophy';
import ContentSection from './Content';
import TeamSection from './Team';
import ProductSection from './Product';
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

const Appointments = () => {
  return (
    <HomeLayout
      curActive='/our-story'
    >
      <main>
        <HeroSection font={eb} />
        <PhilosophySection font={eb} font2={jost} />
        <ContentSection font={eb} font2={jost} />
        <TeamSection font={eb} font2={jost} />
        <ProductSection font={eb} font2={jost} />
      </main >
    </HomeLayout >
  );
};

export default Appointments;