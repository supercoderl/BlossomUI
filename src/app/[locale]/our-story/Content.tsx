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
                                    <span>Dear friends, I would certainly love to meet you all in persone, so come and just say hi. If it’s not possible at the moment, I would loke to introduce myself‚ I’m Vicky, the founder of Cherie Beauty Studio. I’m certain that new haircut, professional makup or just getting your nails done — is a pretty easy way to make your day or week better. I guarantee that you will appreciate the atmosphere of our place. Looking forward to meeting you!</span>
                                </p>
                            </div>
                        </div>
                        <div className="w-full relative">
                            <div className={cn("mt-[30px]", font2.className)}>
                                <h6 className="mb-4 text-[16px] md:text-[20px] font-medium">– Emma Underwood</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContentSection;