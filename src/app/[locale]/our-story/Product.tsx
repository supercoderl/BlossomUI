import { cn } from "@/utils/helpers";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";

const ProductSection = ({
    font,
    font2
}: {
    font: NextFontWithVariable,
    font2: NextFontWithVariable
}) => {
    return (
        <section className="bg-[#FBF4F1] md:mt-[55px] py-[50px] md:py-[100px] relative">
            <div className="h-full w-full absolute top-0 left-0"></div>
            <div className="max-w-[767px] md:max-w-[1170px] flex mx-auto relative flex-wrap flex-col-reverse md:flex-row">
                <div className="w-full md:w-[49.959%] relative min-h flex">
                    <div className="content-center items-center md:mr-[66px] px-[15px] flex relative w-full flex-wrap">
                        <div className="w-full relative">
                            <div className="mt-[30px] mb-4 md:mb-[30px]">
                                <h2 className={cn(
                                    "mb-4 text-[28px] md:text-[42px] font-medium",
                                    font.className
                                )}>Our Products</h2>
                            </div>
                        </div>
                        <div className="w-full relative">
                            <div className={cn(font2.className)}>
                                <p className="m-0 text-[18px] font-[300] leading-[1.7em] text-left">All our products are cruelty-free, it’s a category containing all cosmetics that have not been tested on animals. Each cosmetic is subject to strict control by independent inspection bodies chosen by the Coalition for Consumer Information in Cosmetics (CCIC), which is an NGO founded by 8 international animal protection groups such as: American Anti-Vivisection Society, Animal Alliance of Canada, Doris Day Animal League, etc.</p>						</div>
                        </div>
                        <div className="w-full relative">
                            <div className="mt-[50px]">
                                <div className={
                                    cn(
                                        "text-center md:text-left",
                                        font2.className
                                    )
                                }>
                                    <a href="https://firstsight.design/cherie/beauty/shop/" className="text-[14px] font-medium text-center uppercase text-black border border-solid border-black bg-transparent tranition-all duration-300 hover:bg-black hover:text-white inline-block py-[14px] px-[31px]">Shop now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 relative">
                    <div className="px-[15px] flex relative w-full flex-wrap content-start">
                        <div className="flex text-center relative">
                            <div className="">
                                <img decoding="async" width="833" height="833" src="https://scontent.fhan4-3.fna.fbcdn.net/v/t39.30808-6/494098197_1247518567379387_1819519410571707430_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFPc6w9gRwAc9w9KLUgxewXWv90DxXlzkha_3QPFeXOSKHGhISuWLt8tCljkQwSKoBT437O0luJpRhi8xLB7YnS&_nc_ohc=DnS6Hitu_zAQ7kNvwF38kpU&_nc_oc=AdmDKcvtyMvGyrAYJKF_pOzChnn-d6CRfBUMU2iglNzuHXd236mIGRYUaATNI6V4qYs&_nc_zt=23&_nc_ht=scontent.fhan4-3.fna&_nc_gid=YPeq2Jf8if42c5dDcbLbtA&oh=00_AfNKzuPGyGpYAdnfZKK0k2t2bQZvQpnIOs7qeotLPz_FXQ&oe=68692CA8" sizes="(max-width: 833px) 100vw, 833px" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductSection;