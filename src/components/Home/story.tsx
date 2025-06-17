const StorySection = () => {
    return (
        <section className="my-[100px] py-[100px] relative">
            <div className="bg-[#F6EBE7] h-full w-full absolute top-0 left-0"></div>
            <div className="max-w-[1170px] flex mx-auto relative">
                <div className="w-1/2 relative min-h flex">
                    <div className="px-[15px] flex relative w-full flex-wrap content-start">
                        <div className="w-full text-center">
                            <div className="">
                                <img
                                    fetchPriority="high"
                                    decoding="async"
                                    width="1024"
                                    height="1024"
                                    src="https://firstsight.design/cherie/beauty/wp-content/uploads/2020/08/image-126@2x-1-1024x1024.jpg"
                                    className="max-w-full h-auto align-middle inline-block"
                                    alt=""
                                    srcSet="https://firstsight.design/cherie/beauty/wp-content/uploads/2020/08/image-126@2x-1-1024x1024.jpg 1024w, https://firstsight.design/cherie/beauty/wp-content/uploads/2020/08/image-126@2x-1-600x600.jpg 600w, https://firstsight.design/cherie/beauty/wp-content/uploads/2020/08/image-126@2x-1-120x120.jpg 120w, https://firstsight.design/cherie/beauty/wp-content/uploads/2020/08/image-126@2x-1-300x300.jpg 300w, https://firstsight.design/cherie/beauty/wp-content/uploads/2020/08/image-126@2x-1-150x150.jpg 150w, https://firstsight.design/cherie/beauty/wp-content/uploads/2020/08/image-126@2x-1-768x768.jpg 768w, https://firstsight.design/cherie/beauty/wp-content/uploads/2020/08/image-126@2x-1.jpg 1110w"
                                    sizes="(max-width: 1024px) 100vw, 1024px" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[49.959%] relative min-h flex">
                    <div className="px-[15px] flex relative w-full flex-wrap content-center items-center ml-[67px]">
                        <div className="mb-0 w-full">
                            <div className="mb-[30px]">
                                <h2 className="text-black mb-[16px] text-[42px] font-medium">Our Story</h2>
                            </div>
                        </div>
                        <div className="mb-0 w-full">
                            <div className="">
                                <p className="mb-0">We started as a small beauty studio in Islington, London. Our main idea was to create the best beauty studio in the world. Can there be compromises in the best studio in the world? Our answer is always no, we care about the best quality, we hire the best specialists and provide the best customer service. This approach allowed us to grow and create awesome team that is passionate about everything we do.</p>
                            </div>
                        </div>
                        <div className="w-full relative">
                            <div className="mt-[50px]">
                                <div className="text-left">
                                    <a href="https://firstsight.design/cherie/beauty/our-story/" className="decoration-none font-medium text-center uppercase text-black border border-solid border-black inline-block py-[14px] px-[31px] hover:bg-black hover:text-white transition-all duration-300">Learn More</a>
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