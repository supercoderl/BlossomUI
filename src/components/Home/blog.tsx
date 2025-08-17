import { getBlogs } from "@/app/[locale]/blog/api";
import { Blog } from "@/types/blog";
import { cn } from "@/utils/helpers";
import { MessageInstance } from "antd/es/message/interface";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import { useEffect, useState } from "react";

const BlogSection = ({
    font,
    font2,
    messageApi
}: {
    font: NextFontWithVariable,
    font2: NextFontWithVariable,
    messageApi: MessageInstance
}) => {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    const onLoad = async () => {
        try {
            await getBlogs({
                query: { page: 1, pageSize: 4 }
            }).then((res) => {
                if (res && res.data) {
                    setBlogs(res.data.items ?? []);
                }
            })
        } catch (error: any) {
            if (error && error.response && error.response.data) {
                const errors = error.response.data.errors;
                if (errors && errors.length > 0) {
                    errors.forEach((error: any) => {
                        messageApi.error(error || 'Get blogs failed');
                    })
                }
            }
            else {
                messageApi.error("Request failed, please try again later");
            }
        }
    }

    useEffect(() => {
        onLoad();
    }, []);

    return (
        <section className="py-[50px] md:py-[100px] relative" data-aos="fade-zoom-in">
            <div className="bg-[#F6EBE7] h-full w-full absolute top-0 left-0"></div>
            <div className="max-w-[767px] md:max-w-[1170px] relative mx-auto flex">
                <div className="w-full relative min-h flex">
                    <div className="p-0 flex relative w-full flex-wrap content-start">
                        <div className="mb-0 text-center w-full relative">
                            <div className="mb-[40px] md:mb-[50px]">
                                <h2 className={
                                    cn(
                                        "text-black mb-[16px] text-[28px] md:text-[42px] font-medium m-0 p-0",
                                        font.className
                                    )
                                }>Blog</h2>
                            </div>
                        </div>
                        <div className={
                            cn(
                                "mb-0 w-full relative",
                                font2.className
                            )
                        }>
                            <div className="">
                                <div className="">
                                    <div className="flex flex-wrap">
                                        {
                                            blogs.map(item => (
                                                <div key={item.id} className="mb-[31px] flex-[0_0_100%] md:flex-[0_0_25%] max-w-full md:max-w-[25%] px-[15px]">
                                                    <div className="mb-[24px]">
                                                        <a href={`blogs/${item.slug}`}>
                                                            <img loading="lazy" decoding="async" width="769" height="1024" src={item.thumbnailUrl} className="attachment-large size-large wp-post-image" alt="" />
                                                        </a>
                                                    </div>
                                                    <div className="uppercase text-center mb-[13px] text-black text-[12px]">
                                                        <span className="relative pr-[15px] before:content-[''] before:absolute before:top-[7px] before:right-[3px] before:w-[3px] before:h-[3px] before:rounded-full before:bg-black">{item.tags}</span>
                                                        <span className="">{new Date(item.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                                    </div>

                                                    <div className="">
                                                        <h3 className="text-center mb-0 text-[16px] font-medium text-black">
                                                            <a href={`blogs/${item.slug}`} className="text-black">{item.title}</a>
                                                        </h3>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full relative">
                            <div className="mt-[50px]">
                                <div className="text-center">
                                    <a href="/blog/" className="inline-block decoration-none font-medium text-center uppercase text-black border border-solid border-black py-[14px] px-[31px] transition-all duration-300 hover:bg-black hover:text-white hover:scale-110">VIEW ALL POSTS</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BlogSection;