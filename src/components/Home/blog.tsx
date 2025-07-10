import { blogs } from "@/data/blog";
import { cn } from "@/utils/helpers";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";

const BlogSection = ({
    font,
    font2
}: {
    font: NextFontWithVariable,
    font2: NextFontWithVariable
}) => {
    return (
        <section className="py-[50px] md:py-[100px] relative" data-aos="fade-zoom-in">
            <div className="bg-[#F6EBE7] h-full w-full absolute top-0 left-0"></div>
            <div className="max-w-[767px] md:max-w-[1170px] relative mx-auto flex">
                <div className="w-full relative min-h flex">
                    <div className="p-0 flex relative w-full flex-wrap content-start">
                        <div className="mb-0 text-center w-full relative">
                            <div className="mb-[40px] md:mb-[50px]">
                                <h2 className={
                                    cn(
                                        "text-black mb-[16px] text-[28px] md:text-[42px] font-medium m-0 p-0",
                                        font.className
                                    )
                                }>Blog</h2>
                            </div>
                        </div>
                        <div className={
                            cn(
                                "mb-0 w-full relative",
                                font2.className
                            )
                        }>
                            <div className="">
                                <div className="">
                                    <div className="flex flex-wrap">
                                        {
                                            blogs.map(item => (
                                                <div key={item.id} className="mb-[31px] flex-[0_0_100%] md:flex-[0_0_25%] max-w-full md:max-w-[25%] px-[15px]">
                                                    <div className="mb-[24px]">
                                                        <a href={item.url}>
                                                            <img loading="lazy" decoding="async" width="769" height="1024" src={item.image} className="attachment-large size-large wp-post-image" alt="" />
                                                        </a>
                                                    </div>
                                                    <div className="uppercase text-center mb-[13px] text-black text-[12px]">
                                                        <span className="relative pr-[15px] before:content-[''] before:absolute before:top-[7px] before:right-[3px] before:w-[3px] before:h-[3px] before:rounded-full before:bg-black">{item.tags.join(", ")}</span>
                                                        <span className="">{item.date}</span>
                                                    </div>

                                                    <div className="">
                                                        <h3 className="text-center mb-0 text-[16px] font-medium text-black">
                                                            <a href={item.url} className="text-black">{item.title}</a>
                                                        </h3>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full relative">
                            <div className="mt-[50px]">
                                <div className="text-center">
                                    <a href="/blog/" className="decoration-none font-medium text-center uppercase text-black border border-solid border-black py-[14px] px-[31px] hover:bg-black hover:text-white transition-all duration-300">VIEW ALL POSTS</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BlogSection;