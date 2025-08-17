"use client"

import { message } from "antd";
import HomeLayout from "@/components/Layout/home";
import HeroSection from "@/components/Home/hero";
import ServiceSection from "@/components/Home/service";
import StorySection from "@/components/Home/story";
import ShopSection from "@/components/Home/shop";
import AboutSection from "@/components/Home/about";
import BlogSection from "@/components/Home/blog";
import FollowSection from "@/components/Home/follow";
import InstagramSection from "@/components/Home/instagram";
import ContactSection from "@/components/Home/contact";
import { EB_Garamond, Jost } from "next/font/google";
import { useApiLoadingStore } from "@/stores/loadingStore";

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
    const { loading } = useApiLoadingStore();

    return (
        <HomeLayout
            curActive="/"
            isDark={false}
            loading={loading['get-categories'] || loading['get-blogs']}
        >
            {contextHolder}
            <div>
                <HeroSection font={eb} font2={jost} />
                <ServiceSection messageApi={messageApi} font={eb} font2={jost} />
                <StorySection font={eb} font2={jost} />
                <ShopSection font={eb} font2={jost} />
                <AboutSection font={eb} font2={jost} />
                <BlogSection font={eb} font2={jost} messageApi={messageApi} />
                <FollowSection font={jost} messageApi={messageApi} loading={loading} />
                <InstagramSection font={eb} font2={jost} />
                <ContactSection font={jost} />
            </div>
        </HomeLayout>
    );
}
