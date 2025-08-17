import { cn } from "@/utils/helpers";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import { useRef, useState, useEffect } from "react";

const AboutSection = ({
    font,
    font2
}: {
    font: NextFontWithVariable,
    font2: NextFontWithVariable
}) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [translateX, setTranslateX] = useState(0);
    const [giftCardSlide, setGiftCardSlide] = useState(0);
    const sliderRef = useRef(null);

    const images = [
        "/gallery/box-1.jpg",
        "/gallery/box-2.jpg",
        "/gallery/box-3.jpg",
        "/gallery/box-4.jpg"
    ];

    const giftCardImages = [
        "/gallery/box-5.jpg",
        "/gallery/box-6.jpg"
    ];

    // Auto-play for gift cards
    useEffect(() => {
        const interval = setInterval(() => {
            setGiftCardSlide(prev => (prev + 1) % giftCardImages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [giftCardImages.length]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % images.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [images.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    // Touch/Mouse event handlers
    const handleStart = (clientX: number) => {
        setIsDragging(true);
        setStartX(clientX);
        setTranslateX(0);
    };

    const handleMove = (clientX: number) => {
        if (!isDragging) return;
        const diff = clientX - startX;
        setTranslateX(diff);
    };

    const handleEnd = () => {
        if (!isDragging) return;
        const threshold = 50;

        if (translateX > threshold) {
            prevSlide();
        } else if (translateX < -threshold) {
            nextSlide();
        }

        setIsDragging(false);
        setTranslateX(0);
    };

    return (
        <div className="w-full" data-aos="fade-zoom-in">
            {/* Beauty Box Section */}
            <section className="bg-rose-50 py-16 lg:py-24 scroll-smooth">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">

                        {/* Image Slider Section */}
                        <div className="w-full lg:w-1/2">
                            <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white">
                                <div
                                    ref={sliderRef}
                                    className={`flex transition-all ease-out select-none ${isDragging ? 'cursor-grabbing duration-75' : 'cursor-grab duration-700'
                                        }`}
                                    style={{
                                        transform: `translateX(${translateX - currentSlide * 100}%)`
                                    }}
                                >
                                    {images.map((image, index) => (
                                        <div key={index} className="w-full flex-shrink-0">
                                            <img
                                                src={image}
                                                alt={`Beauty product ${index + 1}`}
                                                className="w-full h-80 lg:h-[500px] object-cover pointer-events-none"
                                                loading="lazy"
                                                draggable={false}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Navigation Dots */}
                            <div className="flex justify-center mt-6 space-x-3">
                                {images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-110 ${currentSlide === index
                                            ? 'bg-rose-500 shadow-lg scale-125'
                                            : 'bg-gray-300 hover:bg-rose-300'
                                            }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="w-full lg:w-1/2">
                            <h2 className={
                                cn(
                                    "text-4xl lg:text-6xl font-light text-gray-900 mb-8 tracking-wide leading-tight",
                                    font.className
                                )
                            }>
                                Nail Art Box
                            </h2>

                            <div className={
                                cn(
                                    "text-gray-600 text-lg lg:text-xl leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0",
                                    font2.className
                                )
                            }>
                                <p className="text-[18px] font-[300] leading-[1.7em] text-left">
                                    Our Nail Art Box is a curated set of trendy nail essentials inspired by the latest styles — like these bold checkered and black-tipped designs. Whether you’re into sleek minimalism or daring patterns, we’ve got everything you need to recreate salon-worthy looks at home. Try once or subscribe monthly to keep your nails always on point.
                                </p>
                            </div>

                            <div className={
                                cn(
                                    "inline-block text-center md:text-left w-full",
                                    font2.className
                                )
                            }>
                                <a
                                    href="/beauty-box-2/"
                                    className="inline-block bg-transparent border-2 border-gray-900 text-gray-900 px-10 py-4 font-semibold tracking-widest text-sm uppercase hover:bg-gray-900 hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-4 focus:ring-gray-300"
                                    rel="nofollow"
                                >
                                    Shop Now
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gift Cards Section */}
            <section className="bg-white py-16 lg:py-24 scroll-smooth">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">

                        {/* Content Section */}
                        <div className="w-full lg:w-1/2 order-2 lg:order-1">
                            <h2 className={
                                cn(
                                    "text-4xl lg:text-6xl font-light text-gray-900 mb-8 tracking-wide leading-tight",
                                    font.className
                                )
                            }>
                                Color Your Way
                            </h2>

                            <div className={
                                cn(
                                    "text-gray-600 text-lg lg:text-xl leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0",
                                    font2.className
                                )
                            }>
                                <p className="text-[18px] font-[300] leading-[1.7em] text-left">
                                    Let them express themselves in every shade! Our gift cards unlock a world of colors — from bold neons to chic pastels. Whether it’s for a new look, a mood boost, or just some self-care, this is the gift that fits every style. No expiry, total freedom. Perfect for birthdays, thank-yous, or just because.
                                </p>
                            </div>

                            <div className={
                                cn(
                                    "inline-block",
                                    font2.className
                                )
                            }>
                                <a
                                    href="/gift-cards/"
                                    className="inline-block bg-gray-900 text-white border-2 border-gray-900 px-10 py-4 font-semibold tracking-widest text-sm uppercase hover:bg-transparent hover:text-gray-900 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-4 focus:ring-gray-300"
                                >
                                    Learn More
                                </a>
                            </div>
                        </div>

                        {/* Image Slider Section */}
                        <div className="w-full lg:w-1/2 order-1 lg:order-2">
                            <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white">
                                <div
                                    className="flex transition-transform duration-700 ease-out"
                                    style={{
                                        transform: `translateX(-${giftCardSlide * 100}%)`
                                    }}
                                >
                                    {giftCardImages.map((image, index) => (
                                        <div key={index} className="w-full flex-shrink-0">
                                            <img
                                                src={image}
                                                alt={`Gift card ${index + 1}`}
                                                className="w-full h-80 lg:h-[500px] object-cover"
                                                loading="lazy"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Navigation Dots */}
                            <div className="flex justify-center mt-6 space-x-3">
                                {giftCardImages.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setGiftCardSlide(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-110 ${giftCardSlide === index
                                            ? 'bg-gray-700 shadow-lg scale-125'
                                            : 'bg-gray-300 hover:bg-gray-500'
                                            }`}
                                        aria-label={`Go to gift card slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutSection;