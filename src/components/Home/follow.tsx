import { subscribe } from '@/app/[locale]/user/api';
import { cn } from '@/utils/helpers';
import {
    FacebookOutlined,
    InstagramOutlined
} from '@ant-design/icons';
import { Button } from 'antd';
import { MessageInstance } from 'antd/es/message/interface';
import { NextFontWithVariable } from 'next/dist/compiled/@next/font';
import { useState } from 'react';

const FollowSection = ({
    font,
    messageApi,
    loading
}: {
    font: NextFontWithVariable,
    messageApi: MessageInstance,
    loading: Record<string, boolean>
}) => {
    const [email, setEmail] = useState('');

    const onSubscribe = async () => {
        try {
            await subscribe(email).then(() => {
                messageApi.success("Subscribed successfully! You will receive updates to your email.");
                setEmail('');
            })
        } catch (error: any) {
            console.error('Subscribe error:', error);
            if (error && error.response && error.response.data) {
                const errors = error.response.data.errors;
                if (errors && errors.length > 0) {
                    errors.forEach((error: any) => {
                        messageApi.error(error || 'Subscribe failed');
                    })
                }
            }
            else {
                messageApi.error("Request failed, please try again later");
            }
        }
    }

    return (
        <section className={
            cn(
                "py-2.5 md:py-[100px] relative",
                font.className
            )
        } data-aos="fade-zoom-in">
            <div className="max-w-[767px] md:max-w-[1170px] flex mx-auto relative">
                <div className="w-full relative min-h flex">
                    <div className="p-[10px] flex relative w-full flex-wrap content-start">
                        <div className="w-full relative">
                            <div className="">
                                <div className="flex flex-col md:flex-row">
                                    <div className="w-full md:w-1/2 text-center py-[40px] px-[20px]">
                                        <h5 className="mb-[10px] text-[20px] md:text-[22px] font-[400] leading-[32px] tracking-[0.02em]">Follow Us</h5>
                                        <p className="mb-[30px] text-[18px] font-[300] leading-[1.7em]">Don’t miss promotions, follow us for the latest news</p>
                                        <div className="flex items-center justify-center">
                                            <a
                                                href="https://www.instagram.com/blossom_nails.eastleigh"
                                                target="_blank"
                                                rel="nofollow"
                                                className="text-black px-[15px] decoration-none transition-all duration-300 ease hover:text-inherit hover:scale-110"
                                            >
                                                <InstagramOutlined className='text-[32px]' />
                                            </a>
                                            <a
                                                href="https://www.facebook.com/blossomnailseastleigh"
                                                target="_blank"
                                                rel="nofollow"
                                                className="text-black px-[15px] decoration-none transition-all duration-300 ease hover:text-inherit hover:scale-110"
                                            >
                                                <FacebookOutlined className='text-[32px]' />
                                            </a>
                                        </div>
                                    </div>

                                    <div className="border-t md:border-t-0 md:border-l border-solid border-black w-full md:w-1/2 text-center px-5 py-10 md:p-[40px]">
                                        <h5 className="mb-[10px] text-[20px] md:text-[22px] font-[400] leading-[32px] tracking-[0.02em]">We Don’t Keep Our Beauty Secrets</h5>
                                        <p className="mb-[20px] text-[18px] font-[300] leading-[1.7em]">Subscribe now and thank us later</p>
                                        <form className="" method="post" data-id="226" data-name="First form">
                                            <div className="">
                                                <p className="mb-0 relative max-w-[420px] mx-auto bg-white">
                                                    <input
                                                        className="pr-[160px] pl-[15px] border border-solid border-black text-black w-full h-[50px]"
                                                        type="email"
                                                        name="EMAIL"
                                                        placeholder="you@example.com"
                                                        required
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                    <Button
                                                        loading={loading['subscribe']}
                                                        disabled={loading['subscribe']}
                                                        type="text"
                                                        className="!absolute !h-full !rounded-none top-0 right-0 font-medium text-center uppercase !border-l !border-solid !border-black inline-block hover:!bg-black hover:!text-white !opacity-100"
                                                        onClick={onSubscribe}
                                                    >
                                                        Subscribe
                                                    </Button>
                                                </p>
                                            </div>
                                            <div className="text-center"></div>
                                        </form>
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

export default FollowSection;