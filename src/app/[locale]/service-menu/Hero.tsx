const HeroSection = () => {
    return (
        <section className="relative">
            <div className="flex mx-auto relative">
                <div className="w-full relative min-h flex">
                    <div className="flex relative w-full flex-wrap content-start">
                        <div className="w-full relative">
                            <div className="">
                                <div className="pt-[160px] pb-[132px] bg-cover bg-center flex items-center" style={{ backgroundImage: "url(https://firstsight.design/cherie/beauty/wp-content/uploads/2020/07/Service-Menu-Hero.png)" }}>
                                    <div className="max-w-[1170px] w-full px-[15px] mx-auto">
                                        <div className="text-center px-[15px]">
                                            <h1 className="mb-0 text-[60px]">Service Menu</h1>
                                            <div className="mt-[40px] px-[285px]">
                                                <p className="text-[18px]">We enhance individial beauty with state-of-the-art technologies and personalized service. Our professional team is ready to provide the greatest service you’ve ever had.</p>
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