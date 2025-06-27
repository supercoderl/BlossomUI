import Jarallax from "@/components/Animation/Jarallax";
import JarallaxImage from "@/components/Animation/Jarallax/image";
import { services } from "@/data/service";
import { cn } from "@/utils/helpers";
import React from "react";
import { useEffect, useState } from "react";

const ServiceSection = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="relative">
            <div className="flex mx-auto relative">
                <div className="w-full relative min-h flex">
                    <div className="flex relative w-full flex-wrap content-start">
                        <div className="w-full relative">
                            <div className="">
                                <div className="relative">
                                    <div
                                        id="scroll-spy"
                                        className={
                                            cn(
                                                "sticky top-[60px] transition-all duration-500 hidden md:block min-h min-w-[210px] z-47",
                                                scrolled ? "bg-white shadow-md pt-[0px]" : "bg-transparent pt-[100px]"
                                            )
                                        }
                                    >
                                        <div className={
                                            cn(
                                                "pb-[1px] flex items-center justify-center",
                                            )
                                        }>
                                            {
                                                services.map(item => (
                                                    <ul key={item.id} className="flex flex-col">
                                                        <li className={
                                                            cn(
                                                                "w-[210px]",
                                                                scrolled ? "my-[25px]" : "mb-[50px]"
                                                            )
                                                        }>
                                                            <a href={item.href} className="flex flex-col items-center decoration-none relative z-200 text-black">
                                                                {React.cloneElement(item.icon, {
                                                                    className: cn(
                                                                        "transition-all duration-300",
                                                                        scrolled ? "w-6 h-6" : "w-12 h-12"
                                                                    )
                                                                })}
                                                                <span className={
                                                                    cn(
                                                                        "border-b border-solid border-black font-medium text-[13px] pb-[5px] uppercase",
                                                                        scrolled ? "text-xs mt-3" : "text-md mt-[22px]"
                                                                    )
                                                                }>{item.label}</span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                ))
                                            }
                                            <div className="absolute overflow-hidden -z-1 visibility-hidden">
                                                <div className="absolute inset-0 overflow-hidden -z-1 visibility-hidden">
                                                    <div className="absolute left-0 top-0 transition-all w-[220px] h-[835px]"></div>
                                                </div>
                                                <div className="absolute inset-0 overflow-hidden -z-1 visibility-hidden">
                                                    <div className="absolute left-0 top-0 transition-all w-[200%] h-[200%]"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="relative overflow-visible min-h w-full mx-auto">
                                            <div className="pb-[1px] static">
                                                <div id="service1" className="bg-white">
                                                    <div className="max-w-[854px] mx-auto py-[50px] md:py-[100px]">
                                                        <div className="text-center">
                                                            <h2 className="mb-[30px] text-[28px] md:text-[42px] font-medium">Hair</h2>
                                                            <div className="mb-[40px] md:mb-[50px] px-[15px] md:px-[120px]">
                                                                <p>Stylish hair cuts, gorgeous styling, incredible color services and best hair treatments. Choose your dream service!</p><p>&nbsp;</p><p>&nbsp;</p>
                                                            </div>
                                                        </div>
                                                        <h5 className="px-[30px] md:px-[54px] mb-6 text-[20px]">Haircut</h5>
                                                        <div className="flex flex-wrap mb-[23px]">
                                                            <div className="w-full md:w-1/2 px-[30px] md:px-[54px] mb-[27px]">
                                                                <div className="mb-[8px] flex justify-between">
                                                                    <span className="text-[16px] font-medium">Clipper Cut</span>
                                                                    <span className="">$39</span>
                                                                </div>
                                                                <div className="pr-[57px]">
                                                                    <p>A haircut using clippers to achieve an ultra-short design. (30 min)</p>                                                        </div>
                                                            </div>
                                                            <div className="w-full md:w-1/2 px-[30px] md:px-[54px] mb-[27px]">
                                                                <div className="mb-[8px] flex justify-between">
                                                                    <span className="text-[16px] font-medium">Kids Haircut</span>
                                                                    <span className="">$29</span>
                                                                </div>
                                                                <div className="pr-[57px]">
                                                                    <p>A haircut on a child age 10 &amp; under.<br />(30 min)</p>
                                                                </div>
                                                            </div>
                                                            <div className="w-full md:w-1/2 px-[30px] md:px-[54px] mb-[27px]">
                                                                <div className="mb-[8px] flex justify-between">
                                                                    <span className="text-[16px] font-medium">Haircut</span>
                                                                    <span className="">$39</span>
                                                                </div>
                                                                <div className="pr-[57px]">
                                                                    <p>A haircut, trim or shape on anyone over the age of 10. (60 min)</p>
                                                                </div>
                                                            </div>
                                                            <div className="w-full md:w-1/2 px-[30px] md:px-[54px] mb-[27px]">
                                                                <div className="mb-[8px] flex justify-between">
                                                                    <span className="text-[16px] font-medium">Bang Trim</span>
                                                                    <span className="">$19</span>
                                                                </div>
                                                                <div className="pr-[57px]">
                                                                    <p>A trim on the bang area. Shampoo, conditioner and scalp massage not included. (15 min)</p>                                                        </div>
                                                            </div>
                                                            <div className="w-full md:w-1/2 px-[30px] md:px-[54px] mb-[27px]">
                                                                <div className="mb-[8px] flex justify-between">
                                                                    <span className="text-[16px] font-medium">Signature Haircut</span>
                                                                    <span className="">$49</span>
                                                                </div>
                                                                <div className="pr-[57px]">
                                                                    <p>A haircut, trim, shape on anyone over the age of 10 with a customized conditioning treatment. (1 hr 15 min)</p>                                                        </div>
                                                            </div>
                                                        </div>
                                                        <h5 className="px-[30px] md:px-[54px] mb-6 text-[20px]">Color</h5>
                                                        <div className="flex flex-wrap mb-[23px]">
                                                            <div className="w-full md:w-1/2 px-[30px] md:px-[54px] mb-[27px]">
                                                                <div className="mb-[8px] flex justify-between">
                                                                    <span className="text-[16px] font-medium">All-Over Color</span>
                                                                    <span className="">$30</span>
                                                                </div>
                                                                <div className="pr-[57px]">
                                                                    <p>An all-over application of a single hair color from roots to ends. (1 hr 45 min)</p>                                                        </div>
                                                            </div>
                                                            <div className="w-full md:w-1/2 px-[30px] md:px-[54px] mb-[27px]">
                                                                <div className="mb-[8px] flex justify-between">
                                                                    <span className="text-[16px] font-medium">Full Root Touch-up</span>
                                                                    <span className="">$59</span>
                                                                </div>
                                                                <div className="pr-[57px]">
                                                                    <p>An application of hair color to the root area only. (1 hr 45 min)</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-wrap mb-[23px]">
                                                        </div>
                                                        <div className="flex flex-wrap mb-[23px]">
                                                        </div>
                                                        <div className="text-center">
                                                            <a href="" className="text-center uppercase font-medium text-black border border-solid border-black hover:bg-white hover:text-white transition-all duration-300 inline-block py-[14px] px-[31px]">Book Appointment</a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div id="service2" className=" bg-[#F6EBE7]">
                                                    <div className="max-w-[854px] mx-auto py-[50px] md:py-[100px]">
                                                        <div className="text-center">
                                                            <h2 className="mb-[30px] text-[28px] md:text-[42px] font-medium">Makeup</h2>
                                                            <div className="mb-[40px] md:mb-[50px] px-[15px] md:px-[120px]">
                                                                <p>Complete your service with beautiful makeup and simply be amazing with complete look.</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-wrap mb-[23px]">
                                                            <div className="w-full md:w-1/2 px-[30px] md:px-[54px] mb-[27px]">
                                                                <div className="mb-[8px] flex justify-between">
                                                                    <span className="text-[16px] font-medium">Complimentary Touch-up</span>
                                                                    <span className="">$30</span>
                                                                </div>
                                                                <div className="pr-[57px]">
                                                                    <p>Complete your service with this quick touch up, or pop in and meet with an available service professional or retail beauty advisor. (15 min)</p>                                                        </div>
                                                            </div>
                                                            <div className="w-full md:w-1/2 px-[30px] md:px-[54px] mb-[27px]">
                                                                <div className="mb-[8px] flex justify-between">
                                                                    <span className="text-[16px] font-medium">Everyday Makeup Application</span>
                                                                    <span className="">$39</span>
                                                                </div>
                                                                <div className="pr-[57px]">
                                                                    <p>Put your fresh face forward. This make up application will have you looking your best. (45 min)</p>                                                        </div>
                                                            </div>
                                                            <div className="w-full md:w-1/2 px-[30px] md:px-[54px] mb-[27px]">
                                                                <div className="mb-[8px] flex justify-between">
                                                                    <span className="text-[16px] font-medium">Formal Makeup Application</span>
                                                                    <span className="">$49</span>
                                                                </div>
                                                                <div className="pr-[57px]">
                                                                    <p>A make up application that includes enhanced make up techniques for a more dramatic look. (60 min)</p>                                                        </div>
                                                            </div>


                                                            <div className="w-full md:w-1/2 px-[30px] md:px-[54px] mb-[27px]">
                                                                <div className="mb-[8px] flex justify-between">
                                                                    <span className="text-[16px] font-medium">Cocktail Makeup</span>
                                                                    <span className="">$55</span>
                                                                </div>
                                                                <div className="pr-[57px]">
                                                                    <p>A make up application that includes enhanced make up techniques for a more dramatic look. (60 min)</p>                                                        </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-wrap mb-[23px]">
                                                        </div>
                                                        <div className="flex flex-wrap mb-[23px]">
                                                        </div>
                                                        <div className="flex flex-wrap mb-[23px]">
                                                        </div>
                                                        <div className="text-center">
                                                            <a href="" className="text-center uppercase font-medium text-black border border-solid border-black hover:bg-white hover:text-white transition-all duration-300 inline-block py-[14px] px-[31px]">Book Appointment</a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div id="service3" className=" bg-white">
                                                    <div className="max-w-[854px] mx-auto py-[50px] py-[100px]">
                                                        <div className="text-center">
                                                            <h2 className="mb-[30px] text-[28px] text-[42px] font-medium">Brows</h2>
                                                            <div className="mb-[40px] md:mb-[50px] px-[15px] md:px-[120px]">
                                                                <p>Brows can change it all. Try out styling and tinting your brows and see the difference.</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-wrap mb-[23px]">
                                                            <div className="w-full md:w-1/2 px-[30px] md:px-[54px] mb-[27px]">
                                                                <div className="mb-[8px] flex justify-between">
                                                                    <span className="text-[16px] font-medium">Brow Wax &amp; Style</span>
                                                                    <span className="">$29</span>
                                                                </div>
                                                                <div className="pr-[57px]">
                                                                    <p>Includes a brow consultation, wax &amp; style. (20 min)</p>                                                        </div>
                                                            </div>
                                                            <div className="w-full md:w-1/2 px-[30px] md:px-[54px] mb-[27px]">
                                                                <div className="mb-[8px] flex justify-between">
                                                                    <span className="text-[16px] font-medium">Brow Trim</span>
                                                                    <span className="">$20</span>
                                                                </div>
                                                                <div className="pr-[57px]">
                                                                    <p>Includes a brow consultation, trim &amp; style. (20 min)</p>                                                        </div>
                                                            </div>
                                                            <div className="w-full md:w-1/2 px-[30px] md:px-[54px] mb-[27px]">
                                                                <div className="mb-[8px] flex justify-between">
                                                                    <span className="text-[16px] font-medium">Brow Tweeze</span>
                                                                    <span className="">$20</span>
                                                                </div>
                                                                <div className="pr-[57px]">
                                                                    <p>Includes a brow consultation, tweeze &amp; style. (20 min)</p>                                                        </div>
                                                            </div>
                                                            <div className="w-full md:w-1/2 px-[30px] md:px-[54px] mb-[27px]">
                                                                <div className="mb-[8px] flex justify-between">
                                                                    <span className="text-[16px] font-medium">Bang Trim</span>
                                                                    <span className="">$19</span>
                                                                </div>
                                                                <div className="pr-[57px]">
                                                                    <p>A trim on the bang area. Shampoo, conditioner and scalp massage not included. (15 min)</p>                                                        </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-wrap mb-[23px]">
                                                        </div>
                                                        <div className="flex flex-wrap mb-[23px]">
                                                        </div>
                                                        <div className="flex flex-wrap mb-[23px]">
                                                        </div>
                                                        <div className="text-center">
                                                            <a href="" className="text-center uppercase font-medium text-black border border-solid border-black hover:bg-white hover:text-white transition-all duration-300 inline-block py-[14px] px-[31px]">Book Appointment</a>
                                                        </div>
                                                    </div>
                                                    <Jarallax speed={0.2} className="relative h-[770px]">
                                                        <div id="absolute top-0 left-0 w-full h-full overflow-hidden -z-100">
                                                            <JarallaxImage
                                                                decoding="async"
                                                                className="jarallax-img"
                                                                src="https://firstsight.design/cherie/beauty/wp-content/uploads/2020/09/image-21@1.5x-1.jpg"
                                                                alt="service image"
                                                            />
                                                        </div>
                                                    </Jarallax>
                                                </div>
                                                <div id="service4" className=" bg-[#F6EBE7]">
                                                    <div className="max-w-[854px] mx-auto py-[50px] py-[100px]">
                                                        <div className="text-center">
                                                            <h2 className="mb-[30px] text-[28px] text-[42px] font-medium">Nails</h2>
                                                            <div className="mb-[40px] md:mb-[50px] px-[15px] md:px-[120px]">
                                                                <p>Get your nails done for great mood. Simple pleasures can make your week, not just day.</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-wrap mb-[23px]">
                                                            <div className="w-full md:w-1/2 px-[30px] md:px-[54px] mb-[27px]">
                                                                <div className="mb-[8px] flex justify-between">
                                                                    <span className="text-[16px] font-medium">Cherie Manicure</span>
                                                                    <span className="">$50</span>
                                                                </div>
                                                                <div className="pr-[57px]">
                                                                    <p>Delicate cuticle work, buffing, and shaping. To finish, a relaxing hand massage, topped off with a perfect polish. (60 min)</p>                                                        </div>
                                                            </div>
                                                            <div className="w-full md:w-1/2 px-[30px] md:px-[54px] mb-[27px]">
                                                                <div className="mb-[8px] flex justify-between">
                                                                    <span className="text-[16px] font-medium">Buff Manicure</span>
                                                                    <span className="">$39</span>
                                                                </div>
                                                                <div className="pr-[57px]">
                                                                    <p>Our natural look manicure – no polish, but all of the pampering. (20 min)</p>                                                        </div>
                                                            </div>
                                                            <div className="w-full md:w-1/2 px-[30px] md:px-[54px] mb-[27px]">
                                                                <div className="mb-[8px] flex justify-between">
                                                                    <span className="text-[16px] font-medium">Gel Manicure</span>
                                                                    <span className="">$59</span>
                                                                </div>
                                                                <div className="pr-[57px]">
                                                                    <p>All the features of our Cherie manicure, but finish with nontoxic Gel Polish instead. (40 min)</p>                                                        </div>
                                                            </div>
                                                            <div className="w-full md:w-1/2 px-[30px] md:px-[54px] mb-[27px]">
                                                                <div className="mb-[8px] flex justify-between">
                                                                    <span className="text-[16px] font-medium">Cherie Pedicure</span>
                                                                    <span className="">$39</span>
                                                                </div>
                                                                <div className="pr-[57px]">
                                                                    <p>Our natural look pedi – no polish, but all of the pampering. Revitalize tired feet. (30 min)</p>                                                        </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-wrap mb-[23px]">
                                                        </div>
                                                        <div className="flex flex-wrap mb-[23px]">
                                                        </div>
                                                        <div className="flex flex-wrap mb-[23px]">
                                                        </div>
                                                        <div className="text-center">
                                                            <a href="" className="text-center uppercase font-medium text-black border border-solid border-black hover:bg-white hover:text-white transition-all duration-300 inline-block py-[14px] px-[31px]">Book Appointment</a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div id="service5" className="">
                                                    <div className="max-w-[854px] mx-auto py-[50px] md:py-[100px]">
                                                        <div className="text-center">
                                                            <h2 className="mb-[30px] text-[28px] text-[42px] font-medium">Cosmetology</h2>
                                                            <div className="mb-[40px] md:mb-[50px] px-[15px] md:px-[120px]">
                                                                <p>Indulge a little longer with a customized facial to help achieve your skin goals in 60-90 minutes.</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-wrap mb-[23px]">
                                                            <div className="w-full md:w-1/2 px-[30px] md:px-[54px] mb-[27px]">
                                                                <div className="mb-[8px] flex justify-between">
                                                                    <span className="text-[16px] font-medium">60 Minute Customized Facial</span>
                                                                    <span className="">$40</span>
                                                                </div>
                                                                <div className="pr-[57px]">
                                                                    <p>Customized Facial enhanced with your choice of Microdermabrasion for Smoother Skin. (60 min)</p>                                                        </div>
                                                            </div>
                                                            <div className="w-full md:w-1/2 px-[30px] md:px-[54px] mb-[27px]">
                                                                <div className="mb-[8px] flex justify-between">
                                                                    <span className="text-[16px] font-medium">Moisturizing Facial</span>
                                                                    <span className="">$20</span>
                                                                </div>
                                                                <div className="pr-[57px]">
                                                                    <p>Revives stressed, dehydrated and overworked skin in minutes. (60 min)</p>                                                        </div>
                                                            </div>
                                                            <div className="w-full md:w-1/2 px-[30px] md:px-[54px] mb-[27px]">
                                                                <div className="mb-[8px] flex justify-between">
                                                                    <span className="text-[16px] font-medium">Hydrafacial</span>
                                                                    <span className="">$39</span>
                                                                </div>
                                                                <div className="pr-[57px]">
                                                                    <p>The HydraFacial is a much-loved rejuvenation treatment, using patented Vortex technology to deliver botanical nutrients directly to the skin. (90 min)</p>                                                        </div>
                                                            </div>
                                                            <div className="w-full md:w-1/2 px-[30px] md:px-[54px] mb-[27px]">
                                                                <div className="mb-[8px] flex justify-between">
                                                                    <span className="text-[16px] font-medium">Anti-Aging Therapy</span>
                                                                    <span className="">$49</span>
                                                                </div>
                                                                <div className="pr-[57px]">
                                                                    <p>This anti-aging treatment stimulates collagen production for a firmer complextion. (60 min)</p>                                                        </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-wrap mb-[23px]">
                                                        </div>
                                                        <div className="flex flex-wrap mb-[23px]">
                                                        </div>
                                                        <div className="flex flex-wrap mb-[23px]">
                                                        </div>
                                                        <div className="text-center">
                                                            <a href="" className="text-center uppercase font-medium text-black border border-solid border-black hover:bg-white hover:text-white transition-all duration-300 inline-block py-[14px] px-[31px]">Book Appointment</a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="resize-sensor">
                                                    <div className="resize-sensor-expand">
                                                        <div></div>
                                                    </div>
                                                    <div className="resize-sensor-shrink">
                                                        <div></div>
                                                    </div>
                                                </div>
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

export default ServiceSection;