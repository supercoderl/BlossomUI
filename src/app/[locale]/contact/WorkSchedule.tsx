import { ClockIcon } from "@/components/Icon/clock";
import { LocationIcon } from "@/components/Icon/location";
import { PhoneIcon } from "@/components/Icon/phone";
import { cn } from "@/utils/helpers";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import Link from "next/link";

const WorkSchedule = ({
    font
} : {
    font: NextFontWithVariable
}) => {
    return (
        <section className={
            cn(
                "py-[50px] md:py-[100px] relative",
                font.className
            )
        }>
            <div className="h-full w-full absolute top-0 left-0"></div>
            <div className="max-w-[767px] md:max-w-[1170px] flex mx-auto relative">
                <div className="w-full relative min-h flex">
                    <div className="flex relative w-full flex-wrap content-start">
                        <div className="mb-2.5 w-full">
                            <div className="">
                                <div className="grid md:grid-cols-3 text-center">
                                    <div className="mb-[50px]">
                                        <div className="mb-[19px]">
                                            <PhoneIcon className='w-12 h-12' />
                                        </div>
                                        <h6 className="mb-2.5 text-[16px] text-[20px] font-medium">Contact</h6>
                                        <div className="text-center text-[16px]">
                                            <p className="m-0">T: +44 23 8061 3526<br />blossom_nails2018@outlook.com</p>
                                        </div>
                                    </div>
                                    <div className="mb-[50px]">
                                        <div className="mb-[19px]">
                                            <ClockIcon className='w-12 h-12' />
                                        </div>
                                        <h6 className="mb-2.5 text-[16px] text-[20px] font-medium">Hours</h6>
                                        <div className="text-center text-[16px]">
                                            <p className="m-0">Mon to Sat: 09:00 am — 06:00 pm<br />Sun: close</p>
                                        </div>
                                    </div>
                                    <div className="mb-[50px]">
                                        <div className="mb-[19px]">
                                            <LocationIcon className='w-12 h-12' />
                                        </div>
                                        <h6 className="mb-2.5 text-[16px] text-[20px] font-medium">Location</h6>
                                        <div className="text-center text-[16px]">
                                            <p className='mb-0'>8c wells place SO50 5PP,<br />Eastleigh, UK</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full relative">
                            <div className="">
                                <div className="text-center">
                                    <Link href="/appointments" className="text-[14px] font-medium text-center uppercase inline-block border border-solid border-black text-black py-[14px] px-[31px] bg-transparent transition duration-300 hover:bg-black hover:text-white">Book Appointment</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WorkSchedule;