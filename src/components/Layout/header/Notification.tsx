import { Bell, Clock } from "lucide-react"

export const NotificationHeader = () => {
    return (
        <div className="group relative">
            <a
                className="relative flex w-[40px] h-[40px] items-center justify-center rounded-[5px] transition-all duration-300 ease-in-out hover:bg-gray-200"
                href="javascript:void(0)"
            >
                <Bell className='w-[20px] h-[20px] text-[#485568]' />
                <span className="w-[8px] h-[8px] absolute top-[5px] right-[5px] bg-[#ff4f7f] rounded-full animate-[blinker_2s_infinite]"></span>
            </a>
            <div className="absolute inset-[55px_0_auto_auto] block shadow-[0px_5px_10px_0px_rgba(0,_0,_0,_0.05)] w-[350px] rounded-[5px] z-[-1] bg-white opacity-0 visibility-hidden transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:visibility-visible group-hover:top-[51px] group-hover:z-1000">
                <div className="p-4 flex items-center justify-between border-b border-solid border-[#eee]">
                    <h6 className="mb-0 text-[0.875rem] text-[#0C243C] leading-[0.875rem]">Notifications
                        <span className="p-[3px] text-[11px] w-[20px] h-[20px] font-bold rounded-full bg-[rgb(49,_106,_255)] ml-2 inline-block text-white text-center">9</span>
                    </h6>
                </div>
                <div className="h-[300px] p-2 relative">
                    <div className="-m-2 overflow-hidden">
                        <div className="absolute overflow-hidden inset-0 z-0">
                            <div className="absolute inset-0">
                                <div className="relative overflow-x-hidden overflow-y-auto h-full block w-auto">
                                    <div className="p-2">
                                        <ul>
                                            <li className="flex items-center justify-between relative text-[#0C243C] p-2.5">
                                                <div className="h-[35px] w-[35px] text-[20px] rounded-full overflow-hidden">
                                                    <img src="https://gxon.layoutdrop.com/demo/assets/images/avatar/avatar2.webp" alt="" />
                                                </div>
                                                <div className="ml-2 flex-1">
                                                    <h6 className="mb-0 text-[0.875rem] font-semibold leading-[20px]">Emma Smith</h6>
                                                    <small className="text-[rgb(151,_161,_192)] block text-[0.875rem] leading-[20px]">Need to update the details.</small>
                                                    <small className="text-[rgba(151,_161,_192,_0.75)] mr-4 mt-2 absolute top-0 right-0 text-[0.875rem] leading-[20px]">7 hr ago</small>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[298px] h-[411px]"></div>
                    </div>
                </div>
                <div className="px-2">
                    <a
                        href="javascript:void(0);"
                        className="w-full bg-[#316AFF] text-white inline-block py-[0.532rem] px-[1.2rem] text-[0.875rem] text-center border border-solid border-[#eee] rounded-md relative leading-[1.5]"
                    >
                        View all notifications
                    </a>
                </div>
            </div>
        </div>
    )
}