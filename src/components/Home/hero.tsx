const HeroSection = () => {
    return (
        <section className="mt-0 mb-[100px] relative">
            <div className="flex mx-auto relative">
                <div className="w-full">
                    <div className="p-0 flex relative w-full flex-wrap content-start">
                        <div className="w-full relative">
                            <div className="">
                                <div className="bg-cover bg-top min-h-[760px] relative m-0 p-0" style={{ backgroundImage: 'url(https://firstsight.design/cherie/beauty/wp-content/uploads/2023/04/cheroooo-scaled.jpg)' }}>
                                    <div className="max-w-[1170px] w-full px-[15px] mx-auto">
                                        <div className="relative pt-[136px] flex flex-col justify-center min-w-[760px] h-full text-center">
                                            <div className="px-[125px]">
                                                <h1 className="text-white mb-[70px] text-[60px]">Always Make Room for a Little Beauty in Your Life</h1>
                                                <div className="flex justify-center">
                                                    <div className="px-[13px]">
                                                        <a href="https://firstsight.design/cherie/beauty/appointments/" className="decoration-none font-medium text-center uppercase text-black bg-white inline-block pt-[16px] px-[32px] pb-[14px]">Book Appointment</a>
                                                    </div>
                                                    <div className="px-[13px]">
                                                        <a href="https://firstsight.design/cherie/beauty/service-menu-v2/" className="decoration-none font-medium text-center uppercase text-white border border-solid border-white inline-block py-[14px] px-[31px] hover:bg-white hover:text-black transition-all duration-300">View Service Menu</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-white flex justify-between mt-[118px] px-[50px]">
                                                <div className="w-[270px]">
                                                    <span className="font-medium text-[13px] uppercase inline-block mb-[9px]">Contact</span>
                                                    <div className="text-[15px]">
                                                        <p className="m-0">T: 070 9485 7568<br />info@beautysalon.com</p>
                                                    </div>
                                                </div>
                                                <div className="w-[270px]">
                                                    <span className="font-medium text-[13px] uppercase inline-block mb-[9px]">Hours</span>
                                                    <div className="text-[15px]">
                                                        <p className="m-0">Mon to Fri: 7:30 am — 1:00 am<br />Sat: 9:00 am — 1:00 am<br />Sun: 9:00 am — 11:30 pm</p>
                                                    </div>
                                                </div>
                                                <div className="w-[270px]">
                                                    <span className="font-medium text-[13px] uppercase inline-block mb-[9px]">Location</span>
                                                    <div className="text-[15px]">
                                                        <p className="m-0">85 Royal Mint Street,<br />London, E1 8LG<br />United Kingdom</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden">
                                    <div className="art-hero-header-additional-info">
                                        <div className="art-additional-info-item">
                                            <span>Contact</span>
                                            <div className="art-info-item-content">
                                                <p>T: 070 9485 7568<br />info@beautysalon.com</p>
                                            </div>
                                        </div>
                                        <div className="art-additional-info-item">
                                            <span>Hours</span>
                                            <div className="art-info-item-content">
                                                <p>Mon to Fri: 7:30 am — 1:00 am<br />Sat: 9:00 am — 1:00 am<br />Sun: 9:00 am — 11:30 pm</p>
                                            </div>
                                        </div>
                                        <div className="art-additional-info-item">
                                            <span>Location</span>
                                            <div className="art-info-item-content">
                                                <p>85 Royal Mint Street,<br />London, E1 8LG<br />United Kingdom</p>
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