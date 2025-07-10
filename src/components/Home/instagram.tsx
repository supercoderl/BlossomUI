import { cn } from "@/utils/helpers";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";

const InstagramSection = ({
    font,
    font2
} : {
    font: NextFontWithVariable,
    font2: NextFontWithVariable
}) => {
    return (
        <section className="py-[50px] md:py-[100px] relative" data-aos="fade-zoom-in">
            {/* Background overlay */}
            <div className="bg-black h-full w-full absolute top-0 left-0"></div>

            <div className="container mx-auto relative z-10">
                <div className="w-full relative min-h-0 flex">
                    <div className="px-[12px] flex relative w-full flex-wrap content-start">
                        {/* Section title */}
                        <div className="text-center mb-[20px] w-full relative">
                            <div className="mb-[19px]">
                                <h2 className={
                                    cn(
                                        "text-white mb-[16px] text-[42px] font-medium",
                                        font.className
                                    )
                                }>Instagram</h2>
                            </div>
                        </div>

                        {/* Instagram feed container */}
                        <div className={
                            cn(
                                "mb-[20px] w-full relative",
                                font2.className
                            )
                        }>
                            <div className="">
                                <div className="">
                                    <div id="sb_instagram" className="w-full mx-auto" style={{ paddingBottom: 10 }}>
                                        {/* Instagram header */}
                                        <div className="sb_instagram_header sbi_medium sbi_no_avatar" style={{ padding: 5, paddingBottom: 8, marginBottom: 10 }}>
                                            <a
                                                href="https://www.instagram.com/blossom_nails.eastleigh"
                                                target="_blank"
                                                rel="nofollow noopener"
                                                title="@blossom.nails"
                                                className="flex items-center"
                                            >
                                                {/* Profile avatar */}
                                                <div className="w-[80px] h-[80px] rounded-full flex-shrink-0 overflow-hidden bg-[#333] text-white flex items-center justify-center">
                                                    <svg
                                                        className="w-[36px] h-[36px] text-white"
                                                        aria-hidden="true"
                                                        aria-label="Instagram"
                                                        viewBox="0 0 448 512"
                                                        fill="currentColor"
                                                    >
                                                        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                                                    </svg>
                                                </div>

                                                {/* Username */}
                                                <div className="ml-4">
                                                    <h3 className="text-white text-[20px] font-medium">cherie.wp.theme</h3>
                                                </div>
                                            </a>
                                        </div>

                                        {/* Instagram images grid */}
                                        <div id="sbi_images" className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ padding: 5 }}>
                                            {/* Main large image */}
                                            <div className="md:col-span-2 md:row-span-2">
                                                <a
                                                    className="block w-full h-full"
                                                    href="https://www.instagram.com/p/CBksqelFI0N/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <img
                                                        decoding="async"
                                                        src="https://scontent.cdninstagram.com/v/t51.29350-15/104001778_339412460374066_3750821398236813329_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=18de74&_nc_ohc=u73vUgNAw2kQ7kNvgFS3Lpn&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=AWpaplv0mQhqyiR7VAo2yRF&oh=00_AYDdiQidIzLcw-5GZjcTh5i6Bun2j-rmKdG8El8FcyV31Q&oe=67561504"
                                                        alt="Instagram post"
                                                        className="w-full h-full object-cover rounded-lg hover:opacity-80 transition-opacity duration-300"
                                                    />
                                                </a>
                                            </div>

                                            {/* Smaller images */}
                                            <div className="space-y-4">
                                                <a
                                                    className="block"
                                                    href="https://www.instagram.com/p/CBkspialhZH/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <img
                                                        decoding="async"
                                                        src="https://scontent.cdninstagram.com/v/t51.29350-15/103619849_269900061024070_56231655535861878_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=18de74&_nc_ohc=GNhG1Vuqji4Q7kNvgH5k-tB&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=AWpaplv0mQhqyiR7VAo2yRF&oh=00_AYBma3kyLdQIzUgxAa9BYRr6m2zbE4hCRTOOwIzoQpoqvw&oe=675640AE"
                                                        alt="Instagram post"
                                                        className="w-full h-32 object-cover rounded-lg hover:opacity-80 transition-opacity duration-300"
                                                    />
                                                </a>

                                                <a
                                                    className="block"
                                                    href="https://www.instagram.com/p/CBksozdlpv2/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <img
                                                        decoding="async"
                                                        src="https://scontent.cdninstagram.com/v/t51.29350-15/83456045_188806739177619_8236763175280629579_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=18de74&_nc_ohc=gzocrWH0igMQ7kNvgEE6O5P&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=AWpaplv0mQhqyiR7VAo2yRF&oh=00_AYAThdBgV9Zb_ZcZ1Dx3ntnbuSCQxymfpXoZX9Nsyz4TbA&oe=67560E16"
                                                        alt="Instagram post"
                                                        className="w-full h-32 object-cover rounded-lg hover:opacity-80 transition-opacity duration-300"
                                                    />
                                                </a>
                                            </div>

                                            {/* Additional images in a row */}
                                            <div className="md:col-span-3 grid grid-cols-3 gap-4">
                                                <a
                                                    className="block"
                                                    href="https://www.instagram.com/p/CBksn3sFdGl/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <img
                                                        decoding="async"
                                                        src="https://scontent.cdninstagram.com/v/t51.29350-15/104433904_499896994089931_2724931858311431472_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=18de74&_nc_ohc=RhbahwJzz24Q7kNvgGRyyKN&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=AWpaplv0mQhqyiR7VAo2yRF&oh=00_AYAgKIFLedkeL5jpp2IZLNRvq9VA25O8nzcggsp4ehZrbA&oe=675641F0"
                                                        alt="Instagram post"
                                                        className="w-full h-32 object-cover rounded-lg hover:opacity-80 transition-opacity duration-300"
                                                    />
                                                </a>

                                                <a
                                                    className="block"
                                                    href="https://www.instagram.com/p/CBksmM-FdwF/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <img
                                                        decoding="async"
                                                        src="https://scontent.cdninstagram.com/v/t51.29350-15/104247821_1494413917396172_1195103049944755326_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=18de74&_nc_ohc=mJ-1HrApOSMQ7kNvgEs6koz&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=AWpaplv0mQhqyiR7VAo2yRF&oh=00_AYCSGRktB0NEHZTydffviUWehz9j7F3bawq5hyUY1e4evw&oe=67562C51"
                                                        alt="Instagram post"
                                                        className="w-full h-32 object-cover rounded-lg hover:opacity-80 transition-opacity duration-300"
                                                    />
                                                </a>

                                                <a
                                                    className="block"
                                                    href="https://www.instagram.com/p/CBkskrXlBcS/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <img
                                                        decoding="async"
                                                        src="https://scontent.cdninstagram.com/v/t51.29350-15/104057439_125791889154420_1425966027809178850_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=18de74&_nc_ohc=upzda6TCvdwQ7kNvgFbfLIz&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=AWpaplv0mQhqyiR7VAo2yRF&oh=00_AYBhIR0AkGdCcxz_c5sdCWHUef2w0Z6VMiwHxcWDwLdTLA&oe=675615F2"
                                                        alt="Instagram post"
                                                        className="w-full h-32 object-cover rounded-lg hover:opacity-80 transition-opacity duration-300"
                                                    />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Follow button */}
                            <div className="w-full relative">
                                <div className="mt-[18px]">
                                    <div className="text-center">
                                        <a
                                            href="https://www.instagram.com/blossom_nails.eastleigh"
                                            rel="nofollow noopener"
                                            target="_blank"
                                            className="no-underline font-medium text-center uppercase text-white border border-solid border-white inline-block py-[14px] px-[31px] hover:bg-white hover:text-black transition-all duration-300"
                                        >
                                            Follow Us @blossom_nails.eastleigh
                                        </a>
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

export default InstagramSection;