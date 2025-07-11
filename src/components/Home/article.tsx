import { cn } from "@/utils/helpers";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";

const ArticleSection = ({
    font,
    font2
}: {
    font: NextFontWithVariable,
    font2: NextFontWithVariable
}) => {
    return (
        <section className="pt-[50px] md:pt-[100px] pb-[30px] md:pb-[80px] relative" data-aos="fade-zoom-in">
            <div className="max-w-[767px] md:max-w-[1170px] flex mx-auto relative">
                <div className="w-full relative min-h flex">
                    <div className="flex relative w-full flex-wrap content-start">
                        <div className="mb-6 md:mb-[34px] text-center w-full relative">
                            <div className={
                                cn(
                                    font2.className
                                )
                            }>
                                <h5 className="text-black mb-[16px] text-[20px] md:text-[22px]">As Seen On</h5>
                            </div>
                        </div>
                        <div className="w-full relative">
                            <div className="">
                                <div className="">
                                    <div className="px-[30px] md:px-[100px]">
                                        <div className="">
                                            <div data-id="1" className="text-center">
                                                <div className="mb-[50px] text-[28px] md:text-[42px] font-medium">
                                                    <p className={
                                                        cn(
                                                            "m-0",
                                                            font.className
                                                        )
                                                    }>
                                                        “The place with its style, soul and uncompromising quality.“
                                                    </p>
                                                </div>
                                                <div className="text-[13px] pb-[4px]">
                                                    <a href="https://www.vogue.co.uk/" target="_blank" className="border-b border-solid border-black font-medium text-[13px] uppercase decoration-none pb-[5px] !text-black">Read Full Article</a>
                                                </div>
                                            </div>
                                            <div data-id="2" className="hidden">
                                                <div className="mb-[50px] text-[42px] font-medium">
                                                    <p className={
                                                        cn(
                                                            "m-0",
                                                            font.className
                                                        )
                                                    }>
                                                        “Beauty heaven in the heart of Manhattan. Must visit place for beauty lovers.“
                                                    </p>
                                                </div>
                                                <div className="text-[13px] pb-[4px]">
                                                    <a href="https://www.harpersbazaar.com/" target="_blank" className="border-b border-solid border-black font-medium text-[13px] uppercase decoration-none pb-[5px] !text-black">Read Full Article</a>
                                                </div>
                                            </div>
                                            <div data-id="3" className="hidden">
                                                <div className="mb-[50px] text-[42px] font-medium">
                                                    <p className={
                                                        cn(
                                                            "m-0",
                                                            font.className
                                                        )
                                                    }>
                                                        “Awesome atmosphere, professional team and beautiful people around.“
                                                    </p>
                                                </div>
                                                <div className="text-[13px] pb-[4px]">
                                                    <a href="https://www.elle.com/uk/" target="_blank" className="border-b border-solid border-black font-medium text-[13px] uppercase decoration-none pb-[5px] !text-black">Read Full Article</a>
                                                </div>
                                            </div>
                                        </div>

                                        <ul className="flex justify-center w-auto whitespace-nowrap flex-nowrap mt-[69px] pb-[20px]">
                                            <li data-id="1" className="px-[61px] transition-opacity duration-200 ease-in-out">
                                                <img decoding="async" src="https://firstsight.design/cherie/beauty/wp-content/uploads/2020/11/Vogue.svg" alt="Mention" />
                                            </li>
                                            <li data-id="2" className="px-[61px] transition-opacity duration-200 ease-in-out opacity-[0.4]">
                                                <img decoding="async" src="https://firstsight.design/cherie/beauty/wp-content/uploads/2020/11/Bazaar-2.svg" alt="Mention" />
                                            </li>
                                            <li data-id="3" className="px-[61px] transition-opacity duration-200 ease-in-out opacity-[0.4]">
                                                <img decoding="async" src="https://firstsight.design/cherie/beauty/wp-content/uploads/2020/11/Elle.svg" alt="Mention" />
                                            </li>
                                        </ul>
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

export default ArticleSection;