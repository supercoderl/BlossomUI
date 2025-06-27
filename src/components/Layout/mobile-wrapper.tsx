import { menus } from "@/data/menu";
import { cn } from "@/utils/helpers";
import { List } from "antd";
import Link from "next/link";

interface MobileWrapperProps {
    isOpen: boolean;
    handleOpen: (value: boolean) => void;
}

const MobileWrapper = ({ isOpen, handleOpen }: MobileWrapperProps) => {
    return (
        <>
            {/* Overlay background mờ */}
            <div
                className={cn(
                    "fixed inset-0 z-[1098] bg-[rgba(0,0,0,0.6)] transition-opacity duration-300",
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                onClick={() => handleOpen(false)}
            />

            {/* Sidebar trượt vào */}
            <div
                className={cn(
                    "fixed top-0 right-0 w-[280px] h-screen bg-white z-[1800] shadow-lg transition-transform duration-300 border-l border-solid border-[rgba(0,0,0,0.1)] overflow-y-auto",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <nav className="py-4 px-3">
                    <List
                        itemLayout="vertical"
                        dataSource={menus}
                        renderItem={(item) => (
                            <List.Item className="!border-0 !p-0">
                                <Link
                                    className="block py-[15px] pr-[40px] pl-6 text-sm uppercase font-medium text-black"
                                    href={`/${item.url}`}
                                >
                                    {item.label}
                                </Link>
                            </List.Item>
                        )}
                    />
                </nav>
            </div >
        </>
    );
};

export default MobileWrapper;
