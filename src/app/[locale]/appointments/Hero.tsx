import { cn } from "@/utils/helpers";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";

const HeroSection = ({
    font
} : {
    font : NextFontWithVariable
}) => {
    return (
        <section className={
            cn(
                "relative",
                font.className
            )
        }>
            <div className="relative mx-auto flex">
                <div className="w-full relative min-h flex">
                    <div className="flex relative w-full flex-wrap content-start">
                        <div className="w-full relative">
                            <div className="text-white">
                                <div className="pt-[91px] md:pt-[160px] pb-[55px] md:pb-[132px] bg-cover bg-top flex items-center" style={{ backgroundImage: "url(https://scontent.fhan4-3.fna.fbcdn.net/v/t1.6435-9/45672255_2289577481327178_3480567734910058496_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGZDnoihL5P6z7DpIzk61ePCR9IeCDIoloJH0h4IMiiWtiIPLDuFNngb0-eq744aNke_-qxUbA_gYkITBoyWbZE&_nc_ohc=dR00mbG-GecQ7kNvwFZ7am2&_nc_oc=AdlvmTRFX8EBs-luKxn6B4D9aQrzpjmK9byVVyFkhkA0LHsXFW3LEeCiuySVHpRw8NA&_nc_zt=23&_nc_ht=scontent.fhan4-3.fna&_nc_gid=6q3SyFD7dpsdaeKj7O71AA&oh=00_AfMdrenBAudEhXwkf3mCo4w248gR7qh7E5KekVEJw_uACA&oe=688AC5D1)" }}>
                                    <div className="max-w-[1170px] w-full px-[15px] mx-auto">
                                        <div className="text-center px-[15px]">
                                            <h1 className="m-0 text-[30px] md:text-[60px]">Book Appointment</h1>
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