import { cn } from "@/utils/helpers";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";

const CareerSection = ({
    font
} : {
    font: NextFontWithVariable,
}) => {
    return (
        <section className={
            cn(
                "bg-[#F6EBE7] py-2.5 md:py-[100px]",
                font.className
            )
        }>
            <div className="max-w-[767px] md:max-w-[1170px] flex mx-auto relative">
                <div className="w-full relative min-h flex">
                    <div className="flex relative w-full flex-wrap content-start">
                        <div className="w-full relative">
                            <div className="">
                                <div className="flex flex-col md:flex-row">
                                    <div className="w-full md:w-1/2 text-center p-[40px] md:py-4 md:px-[40px]">
                                        <div className="">
                                            <svg className="mx-auto" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><g clipPath="url(#clip0)"><path d="M17.5 16.3209C17.5 19.0325 16.5387 20.75 14.9723 22.3372C14.1762 23.1438 13.2264 23.9135 12.1523 24.7647C12.0355 24.8573 11.9172 24.9508 11.7977 25.0453C10.9213 25.7384 9.9747 26.4869 8.994 27.3398C8.0802 26.5725 7.2052 25.889 6.39345 25.2549C6.17957 25.0879 5.97008 24.9242 5.76544 24.7634C4.68438 23.9138 3.7414 23.1447 2.95864 22.3398C1.41922 20.7569 0.5 19.0394 0.5 16.3208C0.5 13.6936 1.96449 12.0691 3.63452 11.6258C5.29728 11.1844 7.29404 11.8789 8.45886 14.1884C8.68187 14.6306 9.31815 14.6305 9.54114 14.1884C10.706 11.8787 12.7027 11.1843 14.3655 11.6257C16.0355 12.0691 17.5 13.6937 17.5 16.3209Z" fill="white" stroke="black"></path><path d="M31.5 16.3209C31.5 19.0325 30.5387 20.75 28.9723 22.3372C28.1762 23.1438 27.2264 23.9135 26.1523 24.7647C26.0355 24.8573 25.9172 24.9508 25.7977 25.0453C24.9213 25.7384 23.9747 26.4869 22.994 27.3398C22.0802 26.5725 21.2052 25.889 20.3934 25.2549C20.1796 25.0879 19.9701 24.9242 19.7654 24.7634C18.6844 23.9138 17.7414 23.1447 16.9586 22.3398C15.4192 20.7569 14.5 19.0394 14.5 16.3208C14.5 13.6936 15.9645 12.0691 17.6345 11.6258C19.2973 11.1844 21.294 11.8789 22.4589 14.1884C22.6819 14.6306 23.3181 14.6305 23.5411 14.1884C24.706 11.8787 26.7027 11.1843 28.3655 11.6257C30.0355 12.0691 31.5 13.6937 31.5 16.3209Z" fill="white" stroke="black"></path><rect x="15" y="2" width="1" height="5" fill="black"></rect><rect x="24.3611" y="3.13907" width="1" height="5" transform="rotate(35.3572 24.3611 3.13907)" fill="black"></rect><rect width="1" height="5" transform="matrix(-0.842361 0.538914 0.538914 0.842361 6.75195 3.09195)" fill="black"></rect></g><defs><clipPath id="clip0"><rect width="32" height="32" fill="white"></rect></clipPath></defs></svg>
                                        </div>
                                        <h5 className="mt-4 mb-2.5 text-[20px] md:text-[22px] text-black">Join Our Team</h5>
                                        <div className="mb-[30px]">
                                            <p className="m-0 text-[18px] font-[300] leading-[1.7em]">Please send us an email at blossom_nails2018@outlook.com telling us a bit about yourself. Oh…and attach your resume.</p>
                                        </div>
                                        <div className="">
                                            <a href="https://firstsight.design/cherie/beauty/career-archive/" className="text-[14px] font-medium text-center uppercase text-black border border-solid border-black inline-block py-[14px] px-[31px] bg-transparent transition-all duration-300 hover:bg-black hover:text-white">View Positions</a>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/2 text-center md:border-l border-solid p-[40px] md:py-4 md:px-[40px] border-black">
                                        <div className="">
                                            <svg className="mx-auto" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="10.5" cy="8.5" r="6" fill="white" stroke="black"></circle><path d="M20.5 21C20.5 21.2244 20.4454 21.3931 20.3559 21.5301C20.2638 21.6711 20.1165 21.8057 19.8921 21.9289C19.4298 22.1829 18.7171 22.3476 17.7643 22.4398C16.4267 22.5693 14.763 22.5466 12.9249 22.5217C12.1442 22.511 11.332 22.5 10.5 22.5C9.88421 22.5 9.27833 22.5039 8.68751 22.5076C6.61171 22.5208 4.72188 22.5329 3.24144 22.3722C2.28841 22.2688 1.57015 22.099 1.10269 21.8494C0.663853 21.6151 0.5 21.3472 0.5 21C0.5 20.8803 0.543373 20.6803 0.669459 20.3995C0.792279 20.1259 0.97971 19.8063 1.23103 19.4569C1.73346 18.7584 2.4702 17.9704 3.389 17.2304C5.23147 15.7465 7.74909 14.5 10.5 14.5C13.2509 14.5 15.7685 15.7465 17.611 17.2304C18.5298 17.9704 19.2665 18.7584 19.769 19.4569C20.0203 19.8063 20.2077 20.1259 20.3305 20.3995C20.4566 20.6803 20.5 20.8803 20.5 21Z" fill="white" stroke="black"></path><circle cx="21.5" cy="16.5" r="6" fill="white" stroke="black"></circle><path d="M31.5 29C31.5 29.2244 31.4454 29.3931 31.3559 29.5301C31.2638 29.6711 31.1165 29.8057 30.8921 29.9289C30.4298 30.1829 29.7171 30.3476 28.7643 30.4398C27.4267 30.5693 25.763 30.5466 23.9249 30.5217C23.1442 30.511 22.332 30.5 21.5 30.5C20.8842 30.5 20.2783 30.5039 19.6875 30.5076C17.6117 30.5208 15.7219 30.5329 14.2414 30.3722C13.2884 30.2688 12.5701 30.099 12.1027 29.8494C11.6639 29.6151 11.5 29.3472 11.5 29C11.5 28.8803 11.5434 28.6803 11.6695 28.3995C11.7923 28.1259 11.9797 27.8063 12.231 27.4569C12.7335 26.7584 13.4702 25.9704 14.389 25.2304C16.2315 23.7465 18.7491 22.5 21.5 22.5C24.2509 22.5 26.7685 23.7465 28.611 25.2304C29.5298 25.9704 30.2665 26.7584 30.769 27.4569C31.0203 27.8063 31.2077 28.1259 31.3305 28.3995C31.4566 28.6803 31.5 28.8803 31.5 29Z" fill="white" stroke="black"></path></svg>
                                        </div>
                                        <h5 className="mt-4 mb-2.5 text-[20px] md:text-[22px] text-black">Become Our Partner</h5>
                                        <div className="mb-[30px]">
                                            <p className="m-0 text-[18px] font-[300] leading-[1.7em]">Interested in a Blossom Tech? Drop us a line on blossom_nails2018@outlook.com and find out more.</p>
                                        </div>
                                        <div className="">
                                            <a href="https://firstsight.design/cherie/beauty/franchise/" className="text-[14px] font-medium text-center uppercase text-black border border-solid border-black inline-block py-[14px] px-[31px] bg-transparent transition-all duration-300 hover:bg-black hover:text-white">Tell Me More</a>
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

export default CareerSection;