const HeroSection = () => {
    return (
        <section className="relative">
            <div className="relative mx-auto flex">
                <div className="w-full relative min-h flex">
                    <div className="flex relative w-full flex-wrap content-start">
                        <div className="w-full relative">
                            <div className="">
                                <div className="py-[91px] md:pt-[160px] pb-[55px] md:pb-[132px] bg-cover bg-center flex items-center" style={{ backgroundImage: "url(https://firstsight.design/cherie/beauty/wp-content/uploads/2020/07/Our-Story-Hero.png)" }}>
                                    <div className="max-w-[1170px] w-full px-[15px] mx-auto">
                                        <div className="text-center px-[15px]">
                                            <h1 className="m-0 text-[30px] md:text-[60px]">Our Story</h1>
                                            <div className="p-0 md:px-[285px] mt-5 md:mt-[40px]">
                                                <p className="m-0">Our main goal was to create the best beauty studio in the world. Can there be any compromises in the best studio in the world?</p>
                                            </div>
                                        </div>
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

export default HeroSection;