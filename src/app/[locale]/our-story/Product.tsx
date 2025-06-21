const ProductSection = () => {
    return (
        <section className="bg-[#FBF4F1] mt-[55px] py-[100px] relative">
            <div className="h-full w-full absolute top-0 left-0"></div>
            <div className="max-w-[1170px] flex mx-auto relative">
                <div className="w-[49.959%] relative min-h flex">
                    <div className="content-center items-center mr-[66px] flex relative w-full flex-wrap">
                        <div className="w-full relative">
                            <div className="mb-[30px]">
                                <h2 className="mb-4 text-[42px] font-medium">Our Products</h2>
                            </div>
                        </div>
                        <div className="w-full relative">
                            <div className="">
                                <p className="m-0">All our products are cruelty-free, it’s a category containing all cosmetics that have not been tested on animals. Each cosmetic is subject to strict control by independent inspection bodies chosen by the Coalition for Consumer Information in Cosmetics (CCIC), which is an NGO founded by 8 international animal protection groups such as: American Anti-Vivisection Society, Animal Alliance of Canada, Doris Day Animal League, etc.</p>						</div>
                        </div>
                        <div className="w-full relative">
                            <div className="mt-[50px]">
                                <div className="text-left">
                                    <a href="https://firstsight.design/cherie/beauty/shop/" className="text-[14px] font-medium text-center uppercase text-black border border-solid border-black bg-transparent tranition-all duration-300 hover:bg-black hover:text-white inline-block py-[14px] px-[31px]">Shop now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 relative">
                    <div className="px-[15px] flex relative w-full flex-wrap content-start">
                        <div className="flex text-center relative">
                            <div className="">
                                <img decoding="async" width="833" height="833" src="https://firstsight.design/cherie/beauty/wp-content/uploads/2020/09/Our-Story-3-1.jpg" className="attachment-large size-large wp-image-3126" alt="" srcSet="https://firstsight.design/cherie/beauty/wp-content/uploads/2020/09/Our-Story-3-1.jpg 833w, https://firstsight.design/cherie/beauty/wp-content/uploads/2020/09/Our-Story-3-1-600x600.jpg 600w, https://firstsight.design/cherie/beauty/wp-content/uploads/2020/09/Our-Story-3-1-120x120.jpg 120w, https://firstsight.design/cherie/beauty/wp-content/uploads/2020/09/Our-Story-3-1-300x300.jpg 300w, https://firstsight.design/cherie/beauty/wp-content/uploads/2020/09/Our-Story-3-1-150x150.jpg 150w, https://firstsight.design/cherie/beauty/wp-content/uploads/2020/09/Our-Story-3-1-768x768.jpg 768w" sizes="(max-width: 833px) 100vw, 833px" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductSection;