import { TechnicianInfo } from "@/types/user";
import { cn } from "@/utils/helpers";
import { MessageInstance } from "antd/es/message/interface";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import { useEffect, useState } from "react";
import { getTechnicians } from "../user/api";
import { Filter } from "@/types/filter";

const TeamSection = ({
    font,
    font2,
    messageApi
}: {
    font: NextFontWithVariable,
    font2: NextFontWithVariable,
    messageApi: MessageInstance
}) => {
    const [technicians, setTechnicians] = useState<TechnicianInfo[]>([]);
    const [filter, setFilter] = useState<Filter>({
        query: { page: 1, pageSize: 8 },
        includeDeleted: false,
        searchTerm: ''
    })

    const onLoad = async () => {
        try {
            await getTechnicians(filter).then((res: any) => {
                if (res && res.success) {
                    setTechnicians(res.data.items);
                }
            });
        } catch (error: any) {
            if (error && error.response && error.response.data) {
                const errors = error.response.data.errors;
                if (errors && errors.length > 0) {
                    errors.forEach((error: any) => {
                        messageApi.error(error || 'Get technicians failed');
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
        <>
            <section className="mt-[50px] md:mt-[100px] mb-6 md:mb-[34px] relative">
                <div className="max-w-[767px] max-w-[1170px] flex mx-auto relative">
                    <div className="w-full relative min-h flex">
                        <div className="px-[15px] flex relative w-full flex-wrap content-start">
                            <div className="text-center w-full relative">
                                <div className={cn(font.className)}>
                                    <h2 className="mb-4 text-[28px] md:text-[42px] font-medium">Our Team</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="relative">
                <div className="max-w-[767px] max-w-[1170px] flex mx-auto relative">
                    <div className="w-full relative min-h flex">
                        <div className="flex relative w-full flex-wrap content-start">
                            <div className="w-full relative">
                                <div className="">
                                    <div className={cn(font2.className)}>
                                        <div className="grid md:grid-cols-4 gap-x-8">
                                            {
                                                technicians.map((technician) => (
                                                    <div
                                                        className="mb-[40px] md:mb-[45px] px-[15px] md:p-0"
                                                        key={technician.id}
                                                    >
                                                        <div className="text-center h-[62%]">
                                                            <a className="block h-full w-full overflow-hidden flex items-center justify-center mb-[30px] bg-pink-100">
                                                                <img
                                                                    className="max-h-full max-w-full object-contain"
                                                                    decoding="async"
                                                                    src={technician.avatarUrl}
                                                                    alt={technician.fullName}
                                                                />
                                                            </a>
                                                            <a href="#art-team-member-685602409dced-popup-1" className="block mb-2.5">
                                                                <span className="text-black text-[16px] font-medium">{technician.fullName}</span>
                                                            </a>
                                                            <span className="block text-[14px]">Professional with {technician.yearsOfExperience} YOE</span>
                                                        </div>
                                                        <div className="relative bg-white py-[100px] px-[178px] w-auto max-w-[1366px] my-[20px] mx-auto hidden">
                                                            <div className="art-team-widget-popup">
                                                                <div className="art-team-popup-container">
                                                                    <div className="art-team-popup-left">
                                                                        <img className="h-auto max-w-full mb-[30px]" decoding="async" src="https://firstsight.design/cherie/beauty/wp-content/uploads/2023/04/Team-12.webp" alt="Team Member" />
                                                                    </div>
                                                                    <div className="art-team-popup-right">
                                                                        <div className="member-popup-title art-h2">Dr. Victoria De Vito</div>
                                                                        <span className="member-popup-position text-[16px] font-medium">Founder – MD, Facts</span>
                                                                        <div className="art-popup-member-description">
                                                                            <p>As co-founder of the first all-woman physician plastic surgery practice in Atlanta, Dr. Diane Z. Alexander is a nationally recognized leader in cosmetic surgery, non-invasive facial rejuvenation and anti-aging. As much an artist as a surgeon, she sees Artisan Beauté as the natural fulfillment of her journey for the women she serves.</p>										</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default TeamSection;