import { cn } from "@/utils/helpers";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";

const ContentSection = ({
    font,
    font2
} : {
    font: NextFontWithVariable,
    font2: NextFontWithVariable
}) => {
    return (
        <section className="py-[50px] md:py-[100px] relative">
            <div className="bg-[#F6EBE7] opacity-100 h-full w-full absolute top-0 left-0"></div>
            <div className="max-w-[767px] max-w-[1170px] flex mx-auto relative flex-wrap">
                <div className="w-full md:w-1/2 relative min-h flex">
                    <div className="px-[15px] flex relative w-full flex-wrap content-start">
                        <div className="w-full text-center relative">
                            <div className="">
                                <img fetchPriority="high" decoding="async" width="1024" height="1024" src="/gallery/service.jpg" sizes="(max-width: 1024px) 100vw, 1024px" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-[49.959%] relative min-h flex">
                    <div className="content-center items-center m-0 md:ml-[67px] px-[15px] flex relative w-full flex-wrap">
                        <div className="w-full relative">
                            <div className="mt-[30px] md:mt-4 mb-4 md:mb-[30px]">
                                <h2 className={
                                    cn(
                                        "mb-4 text-[28px] md:text-[42px] font-medium",
                                        font.className
                                    )
                                }>Our Story</h2>
                            </div>
                        </div>
                        <div className="w-full relative">
                            <div className={font2.className}>
                                <p className="m-0 text-[18px] font-[300] leading-[1.7em] text-left">
                                    <span>Welcome to our world of elegance and self-expression. At Cherie Beauty Studio, we believe that beauty is found in the smallest details — like a delicate flower on your fingertips. Our passion lies in helping you feel confident, refreshed, and radiant with every visit.

From custom nail art to relaxing beauty rituals, our mission is to create a space where you feel cared for, seen, and celebrated. Whether you're here to treat yourself or simply take a break from the busy world, we’re so glad you found us.</span>
                                </p>
                            </div>
                        </div>
                        <div className="w-full relative">
                            <div className={cn("mt-[30px]", font2.className)}>
                                <h6 className="mb-4 text-[16px] md:text-[20px] font-medium">– Vicky, Founder of Cherie Beauty Studio</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContentSection;