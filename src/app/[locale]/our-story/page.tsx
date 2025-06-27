'use client'

import React from 'react';
import HomeLayout from '@/components/Layout/home';
import HeroSection from './Hero';
import PhilosophySection from './Philosophy';
import ContentSection from './Content';
import TeamSection from './Team';
import ProductSection from './Product';

const Appointments = () => {
  return (
    <HomeLayout
      curActive='/our-story'
      isDark
    >
      <main>
        <HeroSection />
        <PhilosophySection />
        <ContentSection />
        <TeamSection />
        <ProductSection />
      </main >
    </HomeLayout >
  );
};

export default Appointments;