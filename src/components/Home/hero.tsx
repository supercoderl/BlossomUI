import { cn } from "@/utils/helpers";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";

const HeroSection = ({
    font,
    font2
} : {
    font: NextFontWithVariable,
    font2: NextFontWithVariable
}) => {
    return (
        <section className="mt-0 mb-[50px] md:mb-[100px] relative">
            <div className="flex mx-auto relative">
                <div className="w-full">
                    <div className="p-0 flex relative w-full flex-wrap content-start">
                        <div className="w-full relative">
                            <div className="">
                                <div className="bg-cover bg-top md:min-h-[760px] relative m-0 pb-[30px] md:pt-[30px] md:p-0"
                                    style={{
                                        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('/gallery/banner.jpg')`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                    }}>
                                    <div className="max-w-[1170px] w-full px-[15px] mx-auto">
                                        <div className="relative pt-[80px] md:pt-[136px] flex flex-col justify-center md:min-w-[760px] h-full text-center">
                                            <div className="md:px-[125px]">
                                                <h1 className={
                                                    cn(
                                                        "text-white mb-[52px] md:mb-[70px] text-[30px] md:text-[60px]",
                                                        font.className
                                                    )
                                                }>Always Make Room for a Little Beauty in Your Life</h1>
                                                <div className="flex flex-col md:flex-row justify-center">
                                                    <div className="mb-4 md:m-0 px-[13px]">
                                                        <a href="/appointments" className="decoration-none font-medium text-center text-[14px] uppercase text-black bg-white inline-block pt-[16px] px-[32px] pb-[14px] transition-all duration-300 hover:text-black hover:scale-110">Book Appointment</a>
                                                    </div>
                                                    <div className="mb-4 md:m-0 px-[13px]">
                                                        <a href="/service-menu" className="decoration-none font-medium text-center text-[14px] uppercase text-white border border-solid border-white inline-block py-[14px] px-[31px] transition-all duration-300 hover:bg-white hover:text-black hover:scale-110">View Service Menu</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={
                                                cn(
                                                    "text-white hidden md:flex justify-between mt-[118px] px-[50px]",
                                                    font2.className
                                                )
                                            }>
                                                <div className="w-[270px]">
                                                    <span className="font-medium text-[13px] uppercase inline-block mb-[9px]">Contact</span>
                                                    <div className="text-[15px]">
                                                        <p className="m-0">T: +44 23 8061 3526<br />blossom_nails2018@outlook.com</p>
                                                    </div>
                                                </div>
                                                <div className="w-[270px]">
                                                    <span className="font-medium text-[13px] uppercase inline-block mb-[9px]">Hours</span>
                                                    <div className="text-[15px]">
                                                        <p className="m-0">Mon to Sat: 09:00 am — 06:00 pm<br />Sun: close</p>
                                                    </div>
                                                </div>
                                                <div className="w-[270px]">
                                                    <span className="font-medium text-[13px] uppercase inline-block mb-[9px]">Location</span>
                                                    <div className="text-[15px]">
                                                        <p className='mb-0'>8c wells place SO50 5PP,<br />Eastleigh, UK</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:hidden bg-[#F6EBE7] py-[50px]">
                                    <div className="flex flex-col items-center px-[15px]">
                                        <div className="text-center w-[270px] mb-[30px]">
                                            <span className="font-medium text-[13px] uppercase inline-block mb-[9px]">Contact</span>
                                            <div className="">
                                                <p className="m-0">T: +44 23 8061 3526<br />blossom_nails2018@outlook.com</p>
                                            </div>
                                        </div>
                                        <div className="text-center w-[270px] mb-[30px]">
                                            <span className="font-medium text-[13px] uppercase inline-block mb-[9px]">Hours</span>
                                            <div className="">
                                                <p className="m-0">Mon to Sat: 09:00 am — 06:00 pm<br />Sun: close</p>
                                            </div>
                                        </div>
                                        <div className="text-center w-[270px]">
                                            <span className="font-medium text-[13px] uppercase inline-block mb-[9px]">Location</span>
                                            <div className="">
                                                <p className='mb-0'>8c wells place SO50 5PP,<br />Eastleigh, UK</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default HeroSection;