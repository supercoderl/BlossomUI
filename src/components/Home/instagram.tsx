import { cn } from "@/utils/helpers";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";

const InstagramSection = ({
    font,
    font2
} : {
    font: NextFontWithVariable,
    font2: NextFontWithVariable
}) => {
    // Placeholder images - replace with your actual Instagram images
    const instagramPosts = [
        {
            id: 1,
            url: "https://www.instagram.com/p/CBksqelFI0N/",
            image: "https://picsum.photos/600/600?random=1",
            alt: "Beautiful nail art design"
        },
        {
            id: 2,
            url: "https://www.instagram.com/p/CBkspialhZH/",
            image: "https://picsum.photos/400/400?random=2",
            alt: "Elegant manicure"
        },
        {
            id: 3,
            url: "https://www.instagram.com/p/CBksozdlpv2/",
            image: "https://picsum.photos/400/400?random=3",
            alt: "Nail salon treatment"
        },
        {
            id: 4,
            url: "https://www.instagram.com/p/CBksn3sFdGl/",
            image: "https://picsum.photos/400/400?random=4",
            alt: "Professional nail care"
        },
        {
            id: 5,
            url: "https://www.instagram.com/p/CBksmM-FdwF/",
            image: "https://picsum.photos/400/400?random=5",
            alt: "Creative nail designs"
        },
        {
            id: 6,
            url: "https://www.instagram.com/p/CBkskrXlBcS/",
            image: "https://picsum.photos/400/400?random=6",
            alt: "Nail art studio"
        }
    ];

    return (
        <section className="py-[50px] md:py-[100px] relative bg-black" data-aos="fade-zoom-in">
            <div className="container mx-auto relative z-10 px-4">
                <div className="w-full">
                    {/* Section title */}
                    <div className="text-center mb-[40px]">
                        <h2 className={cn(
                            "text-white mb-[16px] text-[32px] md:text-[42px] font-medium",
                            font.className
                        )}>
                            Instagram
                        </h2>
                    </div>

                    {/* Instagram feed container */}
                    <div className={cn("mb-[20px] w-full", font2.className)}>
                        {/* Instagram header */}
                        <div className="mb-[30px] flex justify-center">
                            <a
                                href="https://www.instagram.com/blossom_nails.eastleigh"
                                target="_blank"
                                rel="nofollow noopener"
                                title="@blossom_nails.eastleigh"
                                className="flex items-center group"
                            >
                                {/* Profile avatar */}
                                <div className="w-[60px] h-[60px] rounded-full flex-shrink-0 overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-orange-400 p-[2px] group-hover:scale-105 transition-transform duration-300">
                                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                                        <svg
                                            className="w-[24px] h-[24px] text-white"
                                            aria-hidden="true"
                                            aria-label="Instagram"
                                            viewBox="0 0 448 512"
                                            fill="currentColor"
                                        >
                                            <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Username */}
                                <div className="ml-4">
                                    <h3 className="text-white text-[18px] md:text-[20px] font-medium group-hover:text-pink-400 transition-colors duration-300">
                                        @blossom_nails.eastleigh
                                    </h3>
                                </div>
                            </a>
                        </div>

                        {/* Instagram images grid */}
                        <div className="max-w-6xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
                                {/* Main large image - spans 2x2 on larger screens */}
                                <div className="md:col-span-2 lg:col-span-2 md:row-span-2">
                                    <a
                                        className="block w-full group"
                                        href={instagramPosts[0].url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <div className="relative overflow-hidden rounded-lg aspect-square">
                                            <img
                                                src={instagramPosts[0].image}
                                                alt={instagramPosts[0].alt}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                loading="lazy"
                                            />

                                        </div>
                                    </a>
                                </div>

                                {/* Smaller images */}
                                {instagramPosts.slice(1).map((post) => (
                                    <div key={post.id} className="md:col-span-1 lg:col-span-1">
                                        <a
                                            className="block group"
                                            href={post.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <div className="relative overflow-hidden rounded-lg aspect-square">
                                                <img
                                                    src={post.image}
                                                    alt={post.alt}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    loading="lazy"
                                                />

                                            </div>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Follow button */}
                        <div className="text-center mt-[40px]">
                            <a
                                href="https://www.instagram.com/blossom_nails.eastleigh"
                                rel="nofollow noopener"
                                target="_blank"
                                className="inline-block no-underline font-medium text-center uppercase text-white border-2 border-white py-[14px] px-[31px] transition-all duration-300 hover:scale-110 hover:text-white"
                            >
                                Follow Us @blossom_nails.eastleigh
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default InstagramSection;