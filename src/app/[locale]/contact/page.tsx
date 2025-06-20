'use client'

import React from 'react';
import {
  Typography,
} from 'antd';
import HomeLayout from '@/components/Layout/home';
import HeroSection from './Hero';
import WorkSchedule from './WorkSchedule';
import LocationSection from './Location';
import FormSection from './Form';
import CareerSection from './Career';
import FAQSection from './Faq';

const { Title, Text, Paragraph } = Typography;

const Contact = () => {

  return (
    <HomeLayout curActive='/contact' isDark>
      <main>
        <HeroSection />
        <WorkSchedule />
        <LocationSection />
        <FormSection />
        <CareerSection />
        <FAQSection />
      </main >
    </HomeLayout >
  );
};

export default Contact;