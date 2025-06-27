import { menus } from '@/data/menu';
import { cn } from '@/utils/helpers';
import {
    InstagramOutlined,
    FacebookOutlined,
    MenuOutlined,
    CloseOutlined
} from '@ant-design/icons';
import { List } from 'antd';
import { url } from 'inspector';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const HomeHeader = ({ isDark, handleOpen, isOpen }: { isDark: boolean, handleOpen?: (value: boolean) => void, isOpen?: boolean }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="relative z-50 block">
            <div className={cn(
                "group px-[22px] md:px-[50px] w-full top-0 left-0 border-b border-solid transition-all duration-300 ease-in-out max-w-full",
                scrolled ? "fixed bg-white border-[rgba(0,_0,_0,_0.1)]" : "absolute bg-transparent border-transparent hover:bg-white"
            )}>
                <div className="flex items-center justify-between max-w-[1920px] mx-auto transition-all duration-300">
                    <div className="left-content grow-2 md:grow-[unset]">
                        <div className="max-h-[82px] flex items-center justify-center md:justify-start transition-all duration-300 ease-in-out">
                            <Link className={
                                cn(
                                    "py-[13px]",
                                    scrolled || isDark ? "hidden" : "block group-hover:hidden"
                                )
                            } href="/">
                                <img src="https://firstsight.design/cherie/beauty/wp-content/uploads/2020/09/Logo-White.svg" alt="Site Logotype" className="img-logotype" />
                            </Link>
                            <Link className={
                                cn(
                                    "py-[13px]",
                                    scrolled || isDark ? "block" : "hidden group-hover:block"
                                )
                            } href="/">
                                <img src="https://firstsight.design/cherie/beauty/wp-content/uploads/2020/09/Logo-Black.svg" alt="Site Logotype Dark" className="img-logotype" />
                            </Link>
                        </div>
                    </div>

                    <div className="center-content hidden md:block">
                        <nav className="block" role="navigation">
                            <List
                                className="px-[60px]"
                                itemLayout="vertical"
                                grid={{ gutter: 42 }}
                                dataSource={menus}
                                renderItem={(item) => (
                                    <List.Item
                                        className={
                                            cn(
                                                "relative px-[21px] transtion-all duration-300 ease-in-out h-fit",
                                            )
                                        }
                                        style={{
                                            paddingBlock: scrolled ? 14 : 25,
                                            margin: 0
                                        }}
                                    >
                                        <Link
                                            href={`/${item.url}`}
                                            className={
                                                cn(
                                                    "text-center block border-b solid border-transparent py-[6px] font-medium text-[13px] uppercase hover:border-black hover:text-black",
                                                    scrolled || isDark ? "text-black" : "text-white group-hover:text-black"
                                                )
                                            }
                                            id="accessible-megamenu-1749806307948-7"
                                        >
                                            {item.label}
                                        </Link>
                                    </List.Item>
                                )}
                            />
                            {/* <li id="menu-item-1974" className={
                                cn(
                                    "static py-[25px] px-[21px] transtion-all duration-300 ease-in-out h-fit",
                                    scrolled ? "py-[14px]" : "py-[25px]"
                                )
                            }>
                                <a className={
                                    cn(
                                        "text-center text-white block border-b border solid border-transparent py-[6px] font-medium text-[13px] uppercase",
                                        scrolled ? "text-black" : "text-white"
                                    )
                                }>Other</a>
                                <div className="opacity-0 visibility-hidden flex justify-center w-full absolute top-full left-0 min-w-[270px] mx-0 bg-white border-y border-solid border-[rgba(0,_0,_0,_0.1]" id="accessible-megamenu-1749806307949-9" role="region" aria-expanded="false" aria-hidden="true">
                                    <ul className="static max-w-[1640px] flex wrap pt-[50px] pb-[29px] px-[70px] opacity-0 visibility-hidden min-w-[270px] bg-white">
                                        <li id="menu-item-3187" className="w-[300px] p-0 relative m-0"><a className="mb-[11px] block decoration-none">CONTACT OPTIONS</a>
                                            <ul className="menu-depth-2 sub-menu double-sub-menu">
                                                <li id="menu-item-3185" className="sub-nav-item menu-item-depth-2 "><a href="https://firstsight.design/cherie/beauty/contact-v1/" className="mb-[11px] block decoration-none">One Location Big Map</a></li>
                                                <li id="menu-item-1975" className="sub-nav-item menu-item-depth-2 "><a href="https://firstsight.design/cherie/beauty/contact-v2/" className="mb-[11px] block decoration-none">One Location Small Map</a></li>
                                                <li id="menu-item-1977" className="sub-nav-item menu-item-depth-2 "><a href="https://firstsight.design/cherie/beauty/contact-ml-1/" className="mb-[11px] block decoration-none">Many Locations Big Map</a></li>
                                                <li id="menu-item-1976" className="sub-nav-item menu-item-depth-2 "><a href="https://firstsight.design/cherie/beauty/contact-ml-2/" className="mb-[11px] block decoration-none">Many Locations Small Map</a></li>
                                            </ul>
                                        </li>
                                        <li id="menu-item-3189" className="w-[300px] p-0 relative m-0"><a className="mb-[11px] block decoration-none">GIFT CARD OPTIONS</a>
                                            <ul className="menu-depth-2 sub-menu double-sub-menu">
                                                <li id="menu-item-1980" className="sub-nav-item menu-item-depth-2 "><a href="https://firstsight.design/cherie/beauty/gift-cards/" className="mb-[11px] block decoration-none">Vertical</a></li>
                                                <li id="menu-item-1981" className="sub-nav-item menu-item-depth-2 "><a href="https://firstsight.design/cherie/beauty/gift-cards-2/" className="mb-[11px] block decoration-none">Horizontal</a></li>
                                            </ul>
                                        </li>
                                        <li id="menu-item-3190" className="w-[300px] p-0 relative m-0"><a className="mb-[11px] block decoration-none">CAREER</a>
                                            <ul className="menu-depth-2 sub-menu double-sub-menu">
                                                <li id="menu-item-2630" className="sub-nav-item menu-item-depth-2 "><a href="https://firstsight.design/cherie/beauty/career-archive/" className="mb-[11px] block decoration-none">Positions Catalogue</a></li>
                                                <li id="menu-item-2638" className="sub-nav-item menu-item-depth-2 "><a href="https://firstsight.design/cherie/beauty/career/brow-specialist/" className="mb-[11px] block decoration-none">Position Details</a></li>
                                            </ul>
                                        </li>
                                        <li id="menu-item-3191" className="w-[300px] p-0 relative m-0"><a className="mb-[11px] block decoration-none">OTHER PAGES</a>
                                            <ul className="menu-depth-2 sub-menu double-sub-menu">
                                                <li id="menu-item-1978" className="sub-nav-item menu-item-depth-2 "><a href="https://firstsight.design/cherie/beauty/franchise/" className="mb-[11px] block decoration-none">Franchise</a></li>
                                                <li id="menu-item-1985" className="sub-nav-item menu-item-depth-2"><a href="https://firstsight.design/cherie/beauty/our-team/" className="mb-[11px] block decoration-none">Our Team</a></li>
                                                <li id="menu-item-2631" className="sub-nav-item menu-item-depth-2 "><a href="https://firstsight.design/cherie/beauty/blog/" className="mb-[11px] block decoration-none">Blog</a></li>
                                                <li id="menu-item-1986" className="sub-nav-item menu-item-depth-2"><a href="https://firstsight.design/cherie/beauty/rental/" className="mb-[11px] block decoration-none">Rental</a></li>
                                                <li id="menu-item-3851" className="sub-nav-item menu-item-depth-2"><a href="https://firstsight.design/cherie/beauty/%d1%81oming-soon/" className="mb-[11px] block decoration-none">Сoming soon</a></li>
                                                <li id="menu-item-1979" className="sub-nav-item menu-item-depth-2"><a href="https://firstsight.design/cherie/beauty/frequently-asked-questions/" className="mb-[11px] block decoration-none">FAQ</a></li>
                                            </ul>
                                        </li>
                                    </ul></div>
                            </li> */}
                        </nav>
                    </div>

                    <div className="right-content">
                        <div className="-mx-[7px] hidden md:block">
                            <Link
                                className={
                                    scrolled || isDark ? "text-black" : "text-white group-hover:text-black"
                                }
                                href="https://instagram.com"
                            >
                                <InstagramOutlined className='px-[7px] text-[19px]' />
                            </Link>
                            <Link
                                className={
                                    scrolled || isDark ? "text-black" : "text-white group-hover:text-black"
                                }
                                href="https://www.facebook.com">
                                <FacebookOutlined className='px-[7px] text-[19px]' />
                            </Link>
                        </div>
                        <div className="block md:hidden">
                            <button
                                className="pt-[7px] pb-[4px] inline-block transition-opacity duration-500 m-0" type="button"
                                onClick={() => {
                                    if (handleOpen !== undefined && isOpen !== undefined) {
                                        handleOpen(!isOpen);
                                    }
                                }}
                            >
                                <span className={
                                    cn(
                                        "absolute w-[20px] h-[15px] inline-block relative transition-all duration-300",
                                        isOpen ? "-translate-x-[280px]" : "translate-x-0"
                                    )
                                }>
                                    <MenuOutlined
                                        className={cn(
                                            'text-xl absolute inset-0 transition-opacity duration-300',
                                            isOpen ? 'opacity-0' : 'opacity-100',
                                            scrolled || isDark ? 'text-black' : '!text-white'
                                        )}
                                    />
                                    <CloseOutlined
                                        className={cn(
                                            'text-xl absolute inset-0 transition-opacity duration-300',
                                            isOpen ? 'opacity-100' : 'opacity-0',
                                            scrolled ||isDark ? 'text-black' : '!text-white'
                                        )}
                                    />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default HomeHeader;