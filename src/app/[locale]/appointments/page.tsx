'use client'

import React from 'react';
import {
  Typography,
} from 'antd';
import HomeLayout from '@/components/Layout/home';
import HeroSection from './Hero';
import BookingFormSection from './BookingForm';

const { Title, Text, Paragraph } = Typography;

const Appointments = () => {

  return (
    <HomeLayout curActive='/appointments' isDark>
      <main>
        <HeroSection />
        <BookingFormSection />
      </main >
    </HomeLayout >
  );
};

export default Appointments;