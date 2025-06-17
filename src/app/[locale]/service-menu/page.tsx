'use client'

import React, { useState, useEffect } from 'react';
import {
  Table,
  Card,
  Rate,
  Button,
  Modal,
  Divider,
  Typography,
  message,
  Row,
  Col
} from 'antd';
import HomeLayout from '@/components/Layout/home';
import HeroSection from './Hero';
import ServiceSection from './Service';
import FAQsSection from './FAQs';

const { Title, Text, Paragraph } = Typography;

const ServiceMenu = () => {

  return (
    <HomeLayout curActive='/service-menu' isDark>
      <main>
        <HeroSection />
        <ServiceSection />
        <FAQsSection />
      </main>
    </HomeLayout>
  );
};

export default ServiceMenu;