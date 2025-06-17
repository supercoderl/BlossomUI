import { useRef, useState, useEffect } from "react";

const AboutSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [translateX, setTranslateX] = useState(0);
    const [giftCardSlide, setGiftCardSlide] = useState(0);
    const sliderRef = useRef(null);

    const images = [
        "https://firstsight.design/cherie/beauty/wp-content/uploads/2020/09/1.jpg",
        "https://firstsight.design/cherie/beauty/wp-content/uploads/2020/09/4.jpg",
        "https://firstsight.design/cherie/beauty/wp-content/uploads/2020/09/3.jpg",
        "https://firstsight.design/cherie/beauty/wp-content/uploads/2020/09/2.jpg"
    ];

    const giftCardImages = [
        "https://firstsight.design/cherie/beauty/wp-content/uploads/2020/09/Gift-Card-1-1@1.5x.jpg",
        "https://firstsight.design/cherie/beauty/wp-content/uploads/2020/09/Gift-Card-3@1.5x.jpg"
    ];

    // Auto-play for gift cards
    useEffect(() => {
        const interval = setInterval(() => {
            setGiftCardSlide(prev => (prev + 1) % giftCardImages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [giftCardImages.length]);

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

    // Mouse events
    const handleMouseDown = (e: any) => handleStart(e.clientX);
    const handleMouseMove = (e: any) => handleMove(e.clientX);
    const handleMouseUp = () => handleEnd();

    // Touch events
    const handleTouchStart = (e: any) => handleStart(e.touches[0].clientX);
    const handleTouchMove = (e: any) => handleMove(e.touches[0].clientX);
    const handleTouchEnd = () => handleEnd();

    return (
        <div className="w-full">
            {/* Beauty Box Section */}
            <section className="bg-rose-50 py-16 lg:py-24 scroll-smooth">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                        
                        {/* Image Slider Section */}
                        <div className="w-full lg:w-1/2">
                            <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white">
                                <div
                                    ref={sliderRef}
                                    className={`flex transition-all ease-out select-none ${
                                        isDragging ? 'cursor-grabbing duration-75' : 'cursor-grab duration-700'
                                    }`}
                                    style={{
                                        transform: `translateX(${translateX - currentSlide * 100}%)`
                                    }}
                                    onMouseDown={handleMouseDown}
                                    onMouseMove={handleMouseMove}
                                    onMouseUp={handleMouseUp}
                                    onMouseLeave={handleMouseUp}
                                    onTouchStart={handleTouchStart}
                                    onTouchMove={handleTouchMove}
                                    onTouchEnd={handleTouchEnd}
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
                                        className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                                            currentSlide === index
                                                ? 'bg-rose-500 shadow-lg scale-125'
                                                : 'bg-gray-300 hover:bg-rose-300'
                                        }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="w-full lg:w-1/2 text-center lg:text-left">
                            <h2 className="text-4xl lg:text-6xl font-light text-gray-900 mb-8 tracking-wide leading-tight">
                                Beauty Box
                            </h2>

                            <div className="text-gray-600 text-lg lg:text-xl leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
                                <p>
                                    Our beauty box is a set of best full-size products that are top
                                    sellers in our online shop. We want you to be able to try
                                    everything at once and make sure that our selection of products is
                                    about quality, our products just do their job, no compromises. You
                                    can subscribe and get our beauty box every month or just buy it once.
                                </p>
                            </div>

                            <div className="inline-block">
                                <a
                                    href="https://firstsight.design/cherie/beauty/product/beauty-box-2/"
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
                        <div className="w-full lg:w-1/2 text-center lg:text-left order-2 lg:order-1">
                            <h2 className="text-4xl lg:text-6xl font-light text-gray-900 mb-8 tracking-wide leading-tight">
                                Gift Cards
                            </h2>

                            <div className="text-gray-600 text-lg lg:text-xl leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
                                <p>
                                    When in doubt what to buy as a gift, this is the best option. Our gift cards 
                                    have no expiration date and can be used to pay for all the services in our 
                                    beauty studio or in our cosmetic shop. You can choose physical or electronic 
                                    format of the gift card. Amount is also flexible. You can personalize your 
                                    gift card with a message.
                                </p>
                            </div>

                            <div className="inline-block">
                                <a
                                    href="https://firstsight.design/cherie/beauty/gift-cards/"
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
                                        className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                                            giftCardSlide === index
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