import { cn } from "@/utils/helpers";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";

const StorySection = ({ font, font2 }: { font: NextFontWithVariable, font2: NextFontWithVariable }) => {
    return (
        <section className="my-[50px] md:my-[100px] py-[50px] md:py-[100px] relative" data-aos="fade-zoom-in">
            <div className="bg-[#F6EBE7] h-full w-full absolute top-0 left-0"></div>
            <div className="max-w-[767px] md:max-w-[1170px] flex mx-auto relative flex-wrap">
                <div className="w-full md:w-1/2 relative min-h flex">
                    <div className="px-[15px] flex relative w-full flex-wrap content-start">
                        <div className="w-full text-center">
                            <div className="">
                                <img
                                    fetchPriority="high"
                                    decoding="async"
                                    width="1024"
                                    height="1024"
                                    src="/gallery/nails.jpg"
                                    className="max-w-full h-auto align-middle inline-block"
                                    alt=""
                                    sizes="(max-width: 1024px) 100vw, 1024px" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-[49.959%] relative min-h flex">
                    <div className="px-[15px] flex relative w-full flex-wrap content-center items-center md:ml-[67px]">
                        <div className="mb-0 w-full">
                            <div className="mt-[30px] mb-4 md:mt-0 md:mb-[30px]">
                                <h2 className={
                                    cn(
                                        "text-black mb-[16px] text-[28px] md:text-[42px] font-medium",
                                        font.className
                                    )
                                }>Our Story</h2>
                            </div>
                        </div>
                        <div className="mb-0 w-full">
                            <div>
                                <p className={
                                    cn(
                                        "mb-0 text-[18px] font-[300] leading-[1.7em]",
                                        font2.className
                                    )
                                }>Blossom Nail began as a cosy little nail studio tucked away in Eastleigh, UK. From day one, our dream was bold: to become the world’s most loved destination for nail care and artistry.
                                    This commitment to “no compromises” has helped Blossom Nail bloom. What started as a single chair and a handful of colours has grown into a vibrant, forward-thinking studio staffed by passionate professionals who live and breathe nail art.</p>
                            </div>
                        </div>
                        <div className="w-full relative">
                            <div className="mt-[50px]">
                                <div className="text-center md:text-left">
                                    <a href="/our-story" className="decoration-none font-medium text-center uppercase text-black border border-solid border-black inline-block py-[14px] px-[31px] hover:bg-black hover:text-white transition-all duration-300">Learn More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default StorySection;