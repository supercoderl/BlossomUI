"use client"

import { useGlobalMessage } from "@/providers/messageProvider";
import { cn } from "@/utils/helpers";
import React from "react";
import { useEffect, useState } from "react";
import { getCategories } from "../service/category/api";
import { Category } from "@/types/category";
import { iconMap } from "@/components/Icon";
import { Service } from "@/types/service";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import { formatter } from "@/utils/currency";
import { getServices } from "../service/api";

const ServiceSection = ({ font, font2 }: { font: NextFontWithVariable, font2: NextFontWithVariable }) => {
    const [scrolled, setScrolled] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [services, setServices] = useState<Service[]>([]);
    const [messageApi] = useGlobalMessage();

    const onLoad = async () => {
        try {
            const [serviceRes, categoryRes] = await Promise.all([getServices({ query: { page: 1, pageSize: 50 } }), getCategories({})])

            const services = serviceRes?.data?.items || [];
            const categories = categoryRes?.data?.items || [];

            setServices(services);
            setCategories(categories);
            if (categories.length > 0) {
                setSelectedCategory(categories[0]);
            }
        } catch (error: any) {
            if (error && error.response && error.response.data) {
                const errors = error.response.data.errors;
                if (errors && errors.length > 0) {
                    errors.forEach((error: any) => {
                        messageApi.error(error || 'Login failed');
                    })
                }
            }
            else {
                messageApi.error("Request failed, please try again later");
            }
        }
    }

    const filterServices = (category: Category) => {
        return services.filter(s => s.categoryId === category.id);
    }

    // Add smooth scroll function
    const scrollToCategory = (e: React.MouseEvent<HTMLAnchorElement>, category: Category) => {
        e.preventDefault(); // Prevent default anchor behavior
        
        const targetElement = document.getElementById(category.url);
        if (targetElement) {
            // Calculate offset to account for sticky header
            const headerOffset = 120; // Adjust this value based on your header height
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        
        setSelectedCategory(category);
    }

    useEffect(() => {
        onLoad();
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="relative">
            <div className="flex mx-auto relative">
                <div className="w-full relative min-h flex">
                    <div className="flex relative w-full flex-wrap content-start">
                        <div className="w-full relative">
                            <div className="">
                                <div className="relative">
                                    <div
                                        id="scroll-spy"
                                        className={
                                            cn(
                                                "sticky top-[60px] transition-all duration-500 hidden md:block min-h min-w-[210px] z-47",
                                                scrolled ? "bg-white shadow-md pt-[0px]" : "bg-transparent pt-[100px]"
                                            )
                                        }
                                    >
                                        <div className={
                                            cn(
                                                "pb-[1px] flex items-center justify-center",
                                            )
                                        }>
                                            {
                                                categories.map(item => {
                                                    const Icon = iconMap[item.icon] || iconMap.HairIcon;

                                                    return (
                                                        <ul key={item.id} className="flex flex-col">
                                                            <li className={
                                                                cn(
                                                                    "w-[210px]",
                                                                    scrolled ? "my-[25px]" : "mb-[50px]",
                                                                    font2.className
                                                                )
                                                            }>
                                                                <a
                                                                    href={`#${item.url}`}
                                                                    className="group flex flex-col items-center decoration-none relative z-200 text-black transition-all duration-300 ease hover:text-inherit hover:scale-110 cursor-pointer"
                                                                    onClick={(e) => scrollToCategory(e, item)}
                                                                >
                                                                    <Icon className={
                                                                        cn(
                                                                            "transition-all duration-300",
                                                                            scrolled ? "w-6 h-6" : "w-12 h-12"
                                                                        )
                                                                    }
                                                                    />
                                                                    <span className={
                                                                        cn(
                                                                            "border-solid border-black border-0 font-medium text-[13px] pb-[5px] uppercase transition-all duration-300 group-hover:border-b",
                                                                            scrolled ? "text-xs mt-3" : "text-md mt-[22px]",
                                                                            selectedCategory?.id === item.id ? "border-b" : ""
                                                                        )
                                                                    }>{item.name}</span>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    )
                                                })
                                            }
                                            <div className="absolute overflow-hidden -z-1 visibility-hidden">
                                                <div className="absolute inset-0 overflow-hidden -z-1 visibility-hidden">
                                                    <div className="absolute left-0 top-0 transition-all w-[220px] h-[835px]"></div>
                                                </div>
                                                <div className="absolute inset-0 overflow-hidden -z-1 visibility-hidden">
                                                    <div className="absolute left-0 top-0 transition-all w-[200%] h-[200%]"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="relative min-h w-full mx-auto">
                                            <div className="pb-[1px] static">
                                                {
                                                    categories.map((category, index) => (
                                                        <div id={category.url} key={category.id} className={cn(
                                                            index % 2 !== 0 ? "bg-[#F6EBE7]" : "bg-white"
                                                        )}>
                                                            <div className="mx-auto py-[50px] md:py-[100px] md:px-28">
                                                                <div className="text-center">
                                                                    <h2 className={
                                                                        cn(
                                                                            "mb-[30px] text-[28px] md:text-[42px] font-medium",
                                                                            font.className
                                                                        )
                                                                    }>{category.name}</h2>
                                                                    <div className="mb-[40px] md:mb-[50px] px-[15px] md:px-[120px]">
                                                                        <p className="italic text-gray-400">Summary of this category</p><p>&nbsp;</p><p>&nbsp;</p>
                                                                    </div>
                                                                </div>
                                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                                                    {filterServices(category).map(service => (
                                                                        <div key={service.id} className="group">
                                                                            {/* Service Header */}
                                                                            <div className="mb-6">
                                                                                <h3 className={
                                                                                    cn(
                                                                                        "text-xl font-medium text-gray-900 tracking-tight",
                                                                                        font2.className
                                                                                    )
                                                                                }>
                                                                                    {service.name}
                                                                                </h3>
                                                                            </div>

                                                                            {/* Service Content */}
                                                                            <div className="space-y-3">
                                                                                {service.options.length <= 0 ? (
                                                                                    // Single service without options
                                                                                    <div className={
                                                                                        cn(
                                                                                            "border border-gray-200 rounded-lg p-5 hover:border-gray-300 transition-colors",
                                                                                            font2.className
                                                                                        )
                                                                                    }>
                                                                                        <div className="flex items-center justify-between">
                                                                                            <div className="flex-1">
                                                                                                <p className="text-gray-700 font-medium mb-1 line-clamp-3">
                                                                                                    {service.description}
                                                                                                </p>
                                                                                                <p className="text-sm text-gray-500">
                                                                                                    {service.durationMinutes} min
                                                                                                </p>
                                                                                            </div>
                                                                                            <div className="text-right ml-4">
                                                                                                <p className="text-xl font-semibold text-gray-900">
                                                                                                    {formatter().format(service.price ?? 0)}
                                                                                                </p>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                ) : (
                                                                                    // Multiple service options
                                                                                    service.options.map((option) => (
                                                                                        <div
                                                                                            key={option.serviceOptionId}
                                                                                            className={
                                                                                                cn(
                                                                                                    "border border-gray-200 rounded-lg p-5 hover:border-gray-300 transition-colors",
                                                                                                    font2.className
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            <div className="flex items-center justify-between">
                                                                                                <div className="flex-1">
                                                                                                    <p className="text-gray-700 font-medium mb-1">
                                                                                                        {option.variantName}
                                                                                                    </p>
                                                                                                    <p className="text-sm text-gray-500">
                                                                                                        {option.durationMinutes} min
                                                                                                    </p>
                                                                                                </div>
                                                                                                <div className="text-right ml-4">
                                                                                                    <p className="text-xl font-semibold text-gray-900">
                                                                                                        {formatter().format(option.priceFrom ?? 0)}{Number(option.priceTo) > 0 && `/${formatter().format(option.priceTo ?? 0)}`}
                                                                                                    </p>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    ))
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                <div className="flex flex-wrap mb-[23px]">
                                                                </div>
                                                                <div className="flex flex-wrap mb-[23px]">
                                                                </div>
                                                                <div className="text-center">
                                                                    <a href="/appointments" className="text-center uppercase font-medium text-black border border-solid border-black hover:bg-black hover:text-white transition-all duration-300 inline-block py-[14px] px-[31px]">Book Appointment</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                                <div className="resize-sensor">
                                                    <div className="resize-sensor-expand">
                                                        <div></div>
                                                    </div>
                                                    <div className="resize-sensor-shrink">
                                                        <div></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ServiceSection;