import { products } from "@/data/product";
import { formatter } from "@/utils/currency";
import { cn } from "@/utils/helpers";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";

const ShopSection = ({
    font,
    font2
}: {
    font: NextFontWithVariable,
    font2: NextFontWithVariable
}) => {
    return (
        <div data-aos="fade-zoom-in">
            <section className="relative">
                <div className="max-w-[767px] md:max-w-[1170px] flex mx-auto relative">
                    <div className="w-full relative min-h flex">
                        <div className="px-[15px] flex relative w-full flex-wrap content-start">
                            <div className="text-center w-full relative">
                                <div className="mb-[40px] md:mb-[50px]">
                                    <h2 className={
                                        cn(
                                            "text-black mb-[16px] text-[28px] md:text-[42px] font-medium",
                                            font.className
                                        )
                                    }>Shop</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={
                cn(
                    "relative",
                    font2.className
                )
            }>
                <div className="max-w-[767px] max-w-[1170px] flex mx-auto relative">
                    <div className="w-full relative min-h flex">
                        <div className="flex relative w-full flex-wrap content-start">
                            <div className="w-full">
                                <div className="">
                                    <div className="">
                                        <ul className="flex flex-wrap m-0 p-0 before:table before:content-[' ']">
                                            {
                                                products.map(item => (
                                                    <li key={item.id} className="w-full md:w-[calc(100%/3)] lg:w-[calc(100%/4)] float-none px-[15px] mb-[30px]">
                                                        <a href={item.url} className="relative block decoration-none text-black">
                                                            <div className="mb-[24px]">
                                                                <img loading="lazy" decoding="async" width="600" height="799" src={item.image} sizes="(max-width: 600px) 100vw, 600px" />
                                                            </div>
                                                            {item.isSale && <span className="absolute top-[17px] right-[17px] m-0 bg-white text-black font-medium text-[12px] min-h-[24px] min-w-[48px] p-0 border border-solid border-black leading-[24px] text-center">Sale!</span>}
                                                            <h3 className="font-medium text-[16px] text-center p-0 m-0 truncate">{item.title}</h3>
                                                            {
                                                                item.isSale ? (
                                                                    <span className="text-black text-center mt-[8px] block">
                                                                        <del aria-hidden="true">
                                                                            <span className="">
                                                                                <bdi>{formatter(undefined, 2).format(item.price)}</bdi>
                                                                            </span>
                                                                        </del>
                                                                        &nbsp;
                                                                        <ins className="decoration-none">
                                                                            <span className="">
                                                                                <bdi>{formatter(undefined, 2).format(item.salePrice)}</bdi>
                                                                            </span>
                                                                        </ins>
                                                                    </span>
                                                                )
                                                                    :
                                                                    (
                                                                        <span className="text-black text-center mt-[8px] block">
                                                                            <span className="">
                                                                                <bdi>{formatter(undefined, 2).format(item.price)}</bdi>
                                                                            </span>
                                                                        </span>
                                                                    )
                                                            }
                                                        </a>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="relative">
                <div className="max-w-[1170px] flex mx-auto relative">
                    <div className="w-full relative min-h flex">
                        <div className="px-[15px] flex relative w-full flex-wrap content-start">
                            <div className="w-full relative">
                                <div className="mt-[40px] mb-[50px] md:mb-[100px]">
                                    <div className="text-center">
                                        <a href="/shop" className="decoration-none font-medium text-center uppercase text-black border border-solid border-black inline-block py-[14px] px-[31px] hover:bg-black hover:text-white transition-all duration-300 hover:scale-110">SHOP ALL</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ShopSection;