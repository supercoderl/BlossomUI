import { Calendar, RefreshCcw, Settings2 } from 'lucide-react';

export const PageTitle = ({
    refresh
} : {
    refresh: () => void
}) => {
    return (
        <div className="pb-6 flex justify-between">
            <div className="breadcrumb">
                <h5 className="text-[19px] font-semibold text-[#484d54] mb-2">Dashboard</h5>
            </div>
            <div className="flex items-center">
                <a
                    href="javascript:void(0)"
                    className="w-[35px] h-[35px] flex items-center justify-center rounded-[5px] text-[#484d54] shadow-[0_0_10px_-3px_rgba(0,_0,_0,_0.15)] cursor-pointer"
                    onClick={refresh}
                    title="Refresh"
                >
                    <RefreshCcw className='w-[16px] h-[16px]' />
                </a>
                <div id="pagedate" className='pl-[5px]'>
                    <div>
                        <span>
                            <a
                                href="javascript:void(0)"
                                className="h-[35px] px-2 text-[12px] text-[#777] flex items-center justify-center bg-white shadow-[0_0_10px_-3px_rgba(0,_0,_0,_0.15)] rounded-[5px]"
                                title="Date"
                            >
                                <Calendar className='w-[16px] h-[16px] mr-[5px] text-[16px] text-[#484d54]' />
                                Jul 10, 2025 - Aug 10, 2025
                            </a>
                        </span>
                    </div>
                </div>
                <div className="pl-[5px]">
                    <div className="rounded-[5px] relative">
                        <button
                            className="w-[35px] h-[35px] p-0 bg-white shadow-[0_0_10px_-3px_rgba(0,_0,_0,_0.15)] rounded-[5px] text-[#484d54] text-[13px]"
                            type="button"
                        >
                            <Settings2 className='w-[16px] h-[16px] mx-auto' />
                        </button>
                        <ul
                            className="p-2.5 shadow-[0_2px_7px_rgba(58,_65,_74,_0.25)] absolute hidden right-0 rounded-[0.375rem] min-w-[10rem] text-[1rem] bg-white"
                        >
                            <li className='text-[#777] text-[14px] leading-[21px] tracking-[0.03em]'>
                                <a className="py-[5px] px-2.5 text-[#777] text-[13px] rounded-[5px] capitalize block" href="#">Booking</a>
                            </li>
                            <li className='text-[#777] text-[14px] leading-[21px] tracking-[0.03em]'>
                                <a className="py-[5px] px-2.5 text-[#777] text-[13px] rounded-[5px] capitalize block" href="#">Revenue</a>
                            </li>
                            <li className='text-[#777] text-[14px] leading-[21px] tracking-[0.03em]'>
                                <a className="py-[5px] px-2.5 text-[#777] text-[13px] rounded-[5px] capitalize block" href="#">Expence</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}