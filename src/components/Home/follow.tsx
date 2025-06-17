import {
    FacebookOutlined,
    InstagramOutlined
} from '@ant-design/icons';

const FollowSection = () => {
    return (
        <section className="py-[100px] relative">
            <div className="bg-[#F6EBE7] h-full w-full absolute top-0 left-0"></div>
            <div className="max-w-[1170px] flex mx-auto relative">
                <div className="w-full relative min-h flex">
                    <div className="p-[10px] flex relative w-full flex-wrap content-start">
                        <div className="w-full relative">
                            <div className="">
                                <div className="flex">
                                    <div className="w-1/2 text-center py-[40px] px-[20px]">
                                        <h5 className="mb-[10px] text-[22px]">Follow Us</h5>
                                        <p className="mb-[30px]">Don’t miss promotions, follow us for the latest news</p>
                                        <div className="flex items-center justify-center">
                                            <a
                                                href="https://instagram.com/firstsight.design?igshid=1l15xjywpp9gt"
                                                target="_blank"
                                                rel="nofollow"
                                                className="text-black px-[15px] decoration-none"
                                            >
                                                <InstagramOutlined className='text-[32px]' />
                                            </a>
                                            <a
                                                href="https://www.facebook.com/Firstsightdesign-108914574269860"
                                                target="_blank"
                                                rel="nofollow"
                                                className="text-black px-[15px] decoration-none"
                                            >
                                                <FacebookOutlined className='text-[32px]' />
                                            </a>
                                        </div>
                                    </div>

                                    <div className="border-l border-solid border-black w-1/2 text-center p-[40px]">
                                        <h5 className="mb-[10px] text-[22px]">We Don’t Keep Our Beauty Secrets</h5>
                                        <p className="mb-[20px]">Subscribe now and thank us later</p>
                                        <form className="" method="post" data-id="226" data-name="First form">
                                            <div className="">
                                                <p className="mb-0 relative max-w-[420px] mx-auto bg-white">
                                                    <input className="pr-[160px] pl-[15px] border border-solid border-black text-black w-full h-[50px]" type="email" name="EMAIL" placeholder="you@example.com" required />
                                                    <input type="submit" value="subscribe" className="absolute top-0 right-0 font-medium text-center uppercase text-black border border-solid border-black inline-block py-[14px] px-[31px]" />
                                                </p>
                                            </div>
                                            <label style={{ display: 'none' }}>Leave this field empty if you're human:
                                                <input type="text" name="_mc4wp_honeypot" value="" tabIndex={-1} autoComplete="off" />
                                            </label>
                                            <input type="hidden" value="1749866678" />
                                            <input type="hidden" value="226" />
                                            <input type="hidden" value="mc4wp-form-1" />
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