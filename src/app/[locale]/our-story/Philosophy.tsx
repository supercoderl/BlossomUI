import { philosophy } from "@/data/philosophy";
import { cn } from "@/utils/helpers";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";

const PhilosophySection = ({
    font,
    font2
}: {
    font: NextFontWithVariable,
    font2: NextFontWithVariable
}) => {
    return (
        <>
            <section className="mt-[50px] md:mt-[100px] mb-6 md:mb-[34px] relative">
                <div className="max-w-[767px] max-w-[1170px] flex mx-auto relative">
                    <div className="w-full relative min-h flex">
                        <div className="px-[15px] flex relative w-full flex-wrap content-start">
                            <div className="text-center w-full relative">
                                <div className="">
                                    <h2 className={cn(
                                        "mb-4 text-[28px] md:text-[42px] font-medium",
                                        font.className
                                    )}>Philosophy</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pb-[50px] md:pb-[100px] relative">
                <div className="max-w-[767px] max-w-[1170px] flex mx-auto relative">
                    <div className="w-full relative min-h flex">
                        <div className="flex relative w-full flex-wrap content-start">
                            <div className={
                                cn(
                                    "mb-2.5 w-full relative",
                                    font2.className
                                )
                            }>
                                <div className="">
                                    <div className="grid md:grid-cols-3 flex-wrap text-center">
                                        {
                                            philosophy.map((item) => (
                                                <div className="relative w-full min-h px-[15px] mb-[50px]" key={item.id}>
                                                    <div className="mb-[19px] flex items-center justify-center">
                                                        {item.icon}
                                                    </div>
                                                    <h6 className="mb-2.5 text-[20px] font-medium">{item.title}</h6>
                                                    <div className="text-center px-[49px] text-[16px]">
                                                        <p className="m-0">{item.description}</p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="w-full relative">
                                <div className="">
                                    <div className="text-center">
                                        <a href="/appointments" className="text-[14px] font-medium uppercase text-center text-black border border-solid border-black inline-block py-[14px] px-[31px] bg-transparent transition-all duration-300 hover:bg-black hover:text-white hover:scale-110">Book Appointment</a>
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

export default PhilosophySection;