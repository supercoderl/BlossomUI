import { apps } from "@/data/dashboard"
import { LayoutGrid } from "lucide-react"

export const AppsMenuHeader = () => {
    return (
        <div
            className="group transition-all duration-300 ease-in-out h-[40px] w-[40px] flex items-center justify-center relative rounded-[5px] hover:bg-gray-200"
        >
            <div>
                <LayoutGrid className='w-[20px] h-[20px] text-[#485568]' />
            </div>
            <div className="right-0 min-w-[290px] transition-all duration-300 ease-in-out mt-[15px] p-2.5 absolute text-left opacity-0 visibility-hidden top-[55px] left-auto bg-white shadow-[0_0_10px_-3px_rgba(0,_0,_0,_0.15)] block z-[-1] rounded-[5px] group-hover:opacity-100 group-hover:visibility group-hover:z-[9] group-hover:top-[35px]">
                <h6 className="-mt-2.5 -mx-2.5 mb-2.5 p-[15px] text-[17px] leading-normal font-bold border border-solid border-[#eee] text-[#484d54]">Apps</h6>
                <ul className='flex flex-wrap'>
                    {
                        apps.map(item => (
                            <li
                                key={item.id}
                                className='w-[90px] text-[#777] text-[14px] leading-[21px] tracking-[0.03rem] rounded-[5px] transition-all duration-300 ease-in-out hover:bg-gray-200'>
                                <a
                                    href={item.url}
                                    className='p-[15px] flex flex-col justify-center items-center w-full rounded-[5px] text-[#777] text-[13px]'
                                >
                                    <img className="w-[35px] h-[35px] mb-[5px]" src={item.image} alt="flag" />{item.title}
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}