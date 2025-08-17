import { cn } from "@/utils/helpers";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";

const HeroSection = ({ font, font2 }: { font: NextFontWithVariable, font2: NextFontWithVariable }) => {
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
                            <div className="">
                                <div className="pt-[91px] md:pt-[160px] pb-[55px] md:pb-[132px] bg-cover bg-top flex items-center" style={{ backgroundImage: "url(/gallery/banner-2.jpg)" }}>
                                    <div className="max-w-[1170px] w-full px-[15px] mx-auto">
                                        <div className="text-center px-[15px] text-white">
                                            <h1 className="m-0 text-[30px] md:text-[60px]">Contact</h1>
                                            <div className="p-0 md:px-[285px] mt-5 md:mt-[40px]">
                                                <p className={
                                                    cn(
                                                        "m-0 text-[18px] font-[300] leading-[1.7em]",
                                                        font2.className
                                                    )
                                                }>We would love hearing from you and moreover meeting you in person. Below you can find all contact details. See you soon!</p>
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

export default HeroSection;