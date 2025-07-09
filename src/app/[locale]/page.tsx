"use client"

import { message } from "antd";
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
import { EB_Garamond, Jost } from "next/font/google";

const eb = EB_Garamond({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
    variable: "--font-inter",
});

const jost = Jost({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
    variable: "--font-inter",
});

export default function Home() {
    const [messageApi, contextHolder] = message.useMessage();

    return (
        <HomeLayout
            curActive="/"
            isDark={false}
        >
            {contextHolder}
            <div>
                <HeroSection font={eb} font2={jost} />
                <ServiceSection messageApi={messageApi} font={eb} font2={jost} />
                <StorySection font={eb} font2={jost} />
                <ShopSection font={eb} font2={jost} />
                <AboutSection font={eb} font2={jost} />
                <BlogSection font={eb} font2={jost} />
                <ArticleSection font={eb} font2={jost} />
                <FollowSection font={jost} />
                <InstagramSection font={eb} font2={jost} />
                <ContactSection font={jost} />
            </div>
        </HomeLayout>
    );
}
