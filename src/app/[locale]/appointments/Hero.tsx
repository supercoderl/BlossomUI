import { cn } from "@/utils/helpers";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";

const HeroSection = ({
    font
} : {
    font : NextFontWithVariable
}) => {
    return (
        <section className={
            cn(
                "relative",
                font.className
            )
        }>
            <div className="relative mx-auto flex">
                <div className="w-full relative min-h flex">
                    <div className="flex relative w-full flex-wrap content-start">
                        <div className="w-full relative">
                            <div className="text-white">
                                <div className="pt-[91px] md:pt-[160px] pb-[55px] md:pb-[132px] bg-cover bg-top flex items-center" style={{ backgroundImage: "url(/gallery/banner-2.jpg)" }}>
                                    <div className="max-w-[1170px] w-full px-[15px] mx-auto">
                                        <div className="text-center px-[15px]">
                                            <h1 className="m-0 text-[30px] md:text-[60px]">Book Appointment</h1>
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

export default HeroSection;