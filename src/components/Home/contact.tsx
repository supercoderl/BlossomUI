import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import { ClockIcon } from "../Icon/clock";
import { LocationIcon } from "../Icon/location";
import { PhoneIcon } from "../Icon/phone";
import { cn } from "@/utils/helpers";

const ContactSection = ({
    font
} : {
    font: NextFontWithVariable
}) => {
    return (
        <section className={
            cn(
                "pt-[50px] md:pt-[100px] md:pb-[50px] relative",
                font.className
            )
        } data-aos="fade-zoom-in">
            <div className="max-w-[767px] max-w-[1170px] flex mx-auto relative">
                <div className="w-full relative min-h flex">
                    <div className="p-0 flex relative w-full flex-wrap content-start">
                        <div className="w-full relative">
                            <div className="">
                                <div className="grid md:grid-cols-3 text-center">
                                    <div className="mb-[50px] relative w-full min-h px-[15px]">
                                        <div className="mb-[19px]">
                                            <PhoneIcon className='w-12 h-12' />
                                        </div>
                                        <h6 className="mb-[10px]">Contacts</h6>
                                        <div className="text-center px-[49px] text-[16px]">
                                            <p className="m-0 text-[16px] font-[300] leading-[26px] tracking-[0.02em]">T: +44 23 8061 3526<br />blossom_nails2018@outlook.com</p>
                                        </div>
                                    </div>
                                    <div className="mb-[50px] relative w-full min-h px-[15px]">
                                        <div className="mb-[19px]">
                                            <ClockIcon className='w-12 h-12' />
                                        </div>
                                        <h6 className="mb-[10px]">Hours</h6>
                                        <div className="text-center px-[49px] text-[16px]">
                                            <p className="m-0 text-[16px] font-[300] leading-[26px] tracking-[0.02em]">Mon to Sat: 09:00 am — 06:00 pm<br />Sun: close</p>
                                        </div>
                                    </div>
                                    <div className="mb-[50px] relative w-full min-h px-[15px]">
                                        <div className="mb-[19px]">
                                            <LocationIcon className='w-12 h-12' />
                                        </div>
                                        <h6 className="mb-[10px]">Location</h6>
                                        <div className="text-center px-[49px] text-[16px]">
                                            <p className='mb-0 text-[16px] font-[300] leading-[26px] tracking-[0.02em]'>8c wells place SO50 5PP,<br />Eastleigh, UK</p>
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

export default ContactSection;