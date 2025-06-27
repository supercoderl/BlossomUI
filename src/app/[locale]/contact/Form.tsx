const FormSection = () => {
    return (
        <>
            <section className="mt-[50px] md:mt-[100px] relative">
                <div className="max-w-[767px] md:max-w-[1170px] flex mx-auto relative">
                    <div className="w-full relative min-h flex">
                        <div className="flex relative w-full flex-wrap content-start">
                            <div className="text-center w-full relative">
                                <div className="mb-[30px]">
                                    <h2 className="mb-4 text-[28px] md:text-[42px] font-medium">Drop Us a Line</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mb-[50px] relative">
                <div className="max-w-[767px] max-w-[1170px] flex mx-auto relative">
                    <div className="w-full relative min-h flex">
                        <div className="px-[15px] md:px-[340px] flex relative w-full flex-wrap content-start">
                            <div className="text-center w-full relative">
                                <div className="">
                                    <p className="m-0">Leave us a message and we will get back to you as soon as possible. We’d love hearing from you.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mb-[50px] md:mb-[100px] relative">
                <div className="max-w-[767px] md:max-w-[1170px] flex mx-auto relative">
                    <div className="w-full relative min-h flex">
                        <div className="px-[15px] flex relative w-full flex-wrap content-start">
                            <div className="w-full relative">
                                <div className="">
                                    <div className="mx-auto max-w-[750px]">
                                        <div lang="en-US" dir="ltr">
                                            <div className="absolute overflow-hidden w-[1px] h-[1px] -m-[1px]">
                                                <p role="status" aria-live="polite" aria-atomic="true" className="mb-[30px]"></p>
                                            </div>
                                            <form action="" method="post" className="" aria-label="Contact form" noValidate={true}>
                                                <div className="flex -mx-[15px]">
                                                    <p className="m-0 w-full grid md:grid-cols-3">
                                                        <span className="px-[15px] mb-[30px] w-full" data-name="your-name">
                                                            <input size={40} className="border border-solid border-black text-black w-full h-[50px] px-4 text-[14px]" placeholder="Name *" value="" type="text" name="your-name" readOnly />
                                                        </span>
                                                        <span className="px-[15px] mb-[30px] w-full" data-name="your-email">
                                                            <input size={40} className="border border-solid border-black text-black w-full h-[50px] px-4 text-[14px]" placeholder="Email Address *" value="" type="email" name="your-email" readOnly />
                                                        </span>
                                                        <span className="px-[15px] mb-[30px] w-full" data-name="tel-550">
                                                            <input size={40} className="border border-solid border-black text-black w-full h-[50px] px-4 text-[14px]" placeholder="Phone" value="" type="tel" name="tel-550" readOnly />
                                                        </span>
                                                    </p>
                                                </div>
                                                <p className="mb-[30px]">
                                                    <span className="relative">
                                                        <input size={40} placeholder="Subject" className="border border-solid border-black text-black w-full h-[50px] px-4 text-[14px]" readOnly />
                                                    </span>
                                                </p>
                                                <p className="mb-[30px]">
                                                    <span className="relative">
                                                        <textarea cols={40} rows={10} className="w-full h-[240px] p-4 text-black border border-solid border-black text-[14px]" placeholder="Message *" name="your-message"></textarea>
                                                    </span>
                                                </p>
                                                <div className="flex justify-end">
                                                    <p className="m-0 flex flex-row-reverse">
                                                        <input className="text-[14px] font-medium text-center uppercase text-white bg-black inline-block pt-4 px-8 pb-[14px]" type="submit" value="Send Message" readOnly />
                                                        <span className="visibility-hidden inline-block bg-[#23282d] opacity-75 w-[24px] h-[24px] rounded-full mx-6 relative"></span>
                                                    </p>
                                                </div>
                                                <div className="hidden mt-[2em] mx-[0.5em] mb-[1em] py-[0.2em] px-[1em] border-2 border-solid border-[#00a0d2]"></div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default FormSection;