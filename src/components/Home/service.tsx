import { getCategories } from "@/app/[locale]/service/category/api";
import { Category } from "@/types/category";
import { MessageInstance } from "antd/es/message/interface";
import { useEffect, useState } from "react";
import { iconMap } from "../Icon";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import { cn } from "@/utils/helpers";

const ServiceSection = ({ messageApi, font, font2 }: { messageApi: MessageInstance, font: NextFontWithVariable, font2: NextFontWithVariable }) => {
    const [categories, setCategories] = useState<Category[]>([]);

    const onLoad = async () => {
        try {
            await getCategories({}).then((res) => {
                if (res && res.data) {
                    setCategories(res.data.items ?? []);
                }
            })
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

    useEffect(() => {
        onLoad();
    }, []);

    return (
        <div data-aos="fade-zoom-in">
            <section className="relative">
                <div className="max-w-[767px] md:max-w-[1170px] flex mx-auto relative">
                    <div className="w-full relative min-h flex ">
                        <div className="px-[15px] flex relative w-full flex-wrap content-start">
                            <div className="text-center w-full">
                                <div className="mb-[40px] md:mb-[50px]">
                                    <h2 className={
                                        cn(
                                            "text-black mb-[16px] text-[28px] md:text-[42px] font-medium",
                                            font.className
                                        )
                                    }>Service Menu </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={
                cn(
                    "relative",
                    font2.className
                )
            }>
                <div className="max-w-[767px] md:max-w-[1170px] flex mx-auto relative">
                    <div className="w-full relative min-h flex">
                        <div className="px-[15px] flex relative w-full flex-wrap content-start">
                            <div className="w-full relative">
                                <div>
                                    <div>
                                        <div>
                                            <ul className="flex md:justify-center pb-[20px] mb-[18px] w-auto text-center flex-nowrap overflow-x-auto md:overflow-x-unset hide-scrollbar">
                                                {
                                                    categories.map(category => {
                                                        const Icon = iconMap[category.icon] || iconMap.HairIcon;

                                                        return (
                                                            <li key={category.id} className="m-0 flex flex-col items-center px-3 md:px-[35px]">
                                                                <Icon className="w-12 h-12 transition-all duration-300" />
                                                                <span className="white-space-nowrap text-[13px] mt-[22px] pb-[5px] border-b border-solid border-black font-medium">{category.name}</span>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                            <div className="w-full text-center">
                                                <div data-id="1" className="max-w-[570px] mx-auto text-black">
                                                    <p className="mb-0 text-[18px] font-[300] leading-[1.7em]">Get your nails done for great mood. Simple pleasures can make your week, not just day.</p>
                                                </div>
                                                <div data-id="2" className="max-w-[570px] mx-auto text-black hidden">
                                                    <p className="mb-0 text-[18px] font-[300] leading-[1.7em]">Brows can change it all. Try out styling and tinting your brows and see the difference.</p>
                                                </div>
                                                <div data-id="3" className="max-w-[570px] mx-auto text-black hidden">
                                                    <p className="mb-0 text-[18px] font-[300] leading-[1.7em]">Stylish hair cuts, gorgeous styling, incredible color services and best hair treatments. Choose your dream service!</p>
                                                </div>
                                                <div data-id="4" className="max-w-[570px] mx-auto text-black hidden">
                                                    <p className="mb-0 text-[18px] font-[300] leading-[1.7em]">Indulge a little longer with a customized facial to help achieve your skin goals in 60-90 minutes.</p>
                                                </div>
                                                <div data-id="5" className="max-w-[570px] mx-auto text-black hidden">
                                                    <p className="mb-0 text-[18px] font-[300] leading-[1.7em]">Complete your service with beautiful makeup and simply be amazing with complete look.</p>
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
            <section className="relative">
                <div className="max-w-[1170px] flex mx-auto relative">
                    <div className="w-full relative min-h flex">
                        <div className="px-[15px] flex relative w-full flex-wrap content-start">
                            <div className="w-full relative">
                                <div className="mt-[37px]">
                                    <div className="text-center">
                                        <a href="/service-menu/" className="decoration-none font-medium text-center uppercase text-white bg-black inline-block pt-[16px] pb-[14px] px-[32px]">VIEW SERVICE MENU</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ServiceSection;