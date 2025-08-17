import { cn } from "@/utils/helpers";
import { MessageInstance } from "antd/es/message/interface";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import { useState } from "react";
import { createContact } from "./api";
import { Button } from "antd";

const FormSection = ({
    font,
    font2,
    messageApi,
    loading
}: {
    font: NextFontWithVariable,
    font2: NextFontWithVariable,
    messageApi: MessageInstance,
    loading: Record<string, boolean>
}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const onSubmit = async () => {
        if (!name || !email || !message) {
            messageApi.error('Please fill in all fields.');
            return;
        }

        try {
            await createContact({
                name,
                email,
                message
            }).then(() => {
                messageApi.success('Contact created successfully');
                setName('');
                setEmail('');
                setMessage('');
            });
        } catch (error: any) {
            if (error && error.response && error.response.data) {
                const errors = error.response.data.errors;
                if (errors && errors.length > 0) {
                    errors.forEach((error: any) => {
                        messageApi.error(error || 'Contact failed');
                    })
                }
            }
            else {
                messageApi.error("Request failed, please try again later");
            }
        }
    }

    return (
        <>
            <section className="mt-[50px] md:mt-[150px] relative">
                <div className="max-w-[767px] md:max-w-[1170px] flex mx-auto relative">
                    <div className="w-full relative min-h flex">
                        <div className="flex relative w-full flex-wrap content-start">
                            <div className="text-center w-full relative">
                                <div className={
                                    cn(
                                        "mb-[30px]",
                                        font.className
                                    )
                                }>
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
                                <div className={
                                    cn(
                                        font2.className
                                    )
                                }>
                                    <p className="m-0 text-[18px] font-[300] leading-[1.7em]">Leave us a message and we will get back to you as soon as possible. We’d love hearing from you.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={
                cn(
                    "mb-[50px] md:mb-[100px] relative",
                    font2.className
                )
            }>
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
                                                    <p className="m-0 w-full grid md:grid-cols-2">
                                                        <span className="px-[15px] mb-[30px] w-full" data-name="your-name">
                                                            <input
                                                                size={40}
                                                                className="border border-solid border-black text-black w-full h-[50px] px-4 text-[14px]"
                                                                placeholder="Name *"
                                                                value={name}
                                                                onChange={(e) => setName(e.target.value)}
                                                                type="text"
                                                                name="your-name"
                                                            />
                                                        </span>
                                                        <span className="px-[15px] mb-[30px] w-full" data-name="your-email">
                                                            <input
                                                                size={40}
                                                                className="border border-solid border-black text-black w-full h-[50px] px-4 text-[14px]"
                                                                placeholder="Email Address *"
                                                                value={email}
                                                                onChange={(e) => setEmail(e.target.value)}
                                                                type="email"
                                                                name="your-email"
                                                            />
                                                        </span>
                                                    </p>
                                                </div>
                                                <p className="mb-[30px]">
                                                    <span className="relative">
                                                        <textarea
                                                            cols={40}
                                                            rows={10}
                                                            className="w-full h-[240px] p-4 text-black border border-solid border-black text-[14px]"
                                                            placeholder="Message *"
                                                            name="your-message"
                                                            value={message}
                                                            onChange={(e) => setMessage(e.target.value)}
                                                        ></textarea>
                                                    </span>
                                                </p>
                                                <div className="flex justify-end">
                                                    <p className="m-0 flex flex-row-reverse">
                                                        <Button
                                                            className="!border !border-solid !border-black !h-12 !px-8 !rounded-none font-medium text-center uppercase !text-white !bg-black !inline-block hover:!bg-white hover:!text-inherit hover:!scale-110"
                                                            type="text"
                                                            value="Send Message"
                                                            loading={loading['create-contact']}
                                                            disabled={loading['create-contact']}
                                                            onClick={onSubmit}
                                                        >
                                                            <span className={loading['create-contact'] ? "ml-2" : ""}>Send Message</span>
                                                        </Button>
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