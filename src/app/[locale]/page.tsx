'use client'

import { message } from "antd";
import { useTranslations } from 'next-intl';
import HomeLayout from "@/components/Layout/home";
import HeroSection from "@/components/Home/hero";
import ServiceSection from "@/components/Home/service";
import StorySection from "@/components/Home/story";
import ShopSection from "@/components/Home/shop";
import AboutSection from "@/components/Home/about";
import BlogSection from "@/components/Home/blog";
import ArticleSection from "@/components/Home/article";
import FollowSection from "@/components/Home/follow";
import InstagramSection from "@/components/Home/instagram";
import ContactSection from "@/components/Home/contact";

export default function Home() {
    const t = useTranslations('index');
    const [messageApi, contextHolder] = message.useMessage();

    return (
        <HomeLayout curActive="/" isDark={false}>
            {contextHolder}
            <div>
                <HeroSection />
                <ServiceSection />
                <StorySection />
                <ShopSection />
                <AboutSection />
                <BlogSection />
                <ArticleSection />
                <FollowSection />
                <InstagramSection />
                <ContactSection />
            </div>
        </HomeLayout>
    );
}
