import { ArrowRight, Maximize, Settings2 } from "lucide-react"
import { AreaChart } from "./Area"

export const SecondCharts = () => {
    return (
        <div className="row">
            <div className="h-[100%_-_24px] mb-6 bg-white rounded-[5px] border border-solid border-white border-b-[3px] border-b-[#eee] border-t-[3px] border-[#eee]">
                <div className="p-6 border-b border-solid border-[#eee] flex justify-between">
                    <h4 className="m-0 text-[16px] text-[#484d54] font-bold capitalize flex items-center">Revenue Overview</h4>
                    <div className="h-[30px] flex items-center justify-center">
                        <a href="javascript:void(0)" className="w-[30px] h-[30px] flex items-center justify-center text-[#777] border border-solid border-[#eee] rounded-[5px] mr-2.5">
                            <Maximize className="w-[16px] h-[16px]" />
                        </a>
                    </div>
                </div>
                <div className="p-6">
                    <div className="p-2.5 flex justify-around bg-[rgba(72,_85,_104,_0.07)] rounded-[5px]">
                        <div className="p-2.5 text-center">
                            <h6 className="text-[#777] text-[14px] mb-2">Bookings</h6>
                            <h5 className="m-0 text-[#485568] font-semibold text-[15px]">825
                                <span className="up"><i className="ri-arrow-up-line"></i>24%</span>
                            </h5>
                        </div>
                        <div className="p-2.5 text-center">
                            <h6 className="text-[#777] text-[14px] mb-2">Revenue</h6>
                            <h5 className="m-0 text-[#485568] font-semibold text-[15px]">$89k
                                <span className="up"><i className="ri-arrow-up-line"></i>24%</span>
                            </h5>
                        </div>
                        <div className="p-2.5 text-center">
                            <h6 className="text-[#777] text-[14px] mb-2">Expence</h6>
                            <h5 className="m-0 text-[#485568] font-semibold text-[15px]">$68k
                                <span className="down"><i className="ri-arrow-down-line"></i>24%</span>
                            </h5>
                        </div>
                        <div className="p-2.5 text-center">
                            <h6 className="text-[#777] text-[14px] mb-2">Profit</h6>
                            <h5 className="m-0 text-[#485568] font-semibold text-[15px]">$21k
                                <span className="up"><i className="ri-arrow-up-line"></i>24%</span>
                            </h5>
                        </div>
                    </div>
                    <div className="chart-content">
                        <div id="overviewChart" className="min-h-[380px]">
                            <AreaChart />
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-[100%_-_24px] mb-6 bg-white rounded-[5px] border border-solid border-white border-b-[3px] border-b-[#eee] border-t-[3px] border-[#eee]" id="lhmap">
                <div className="p-6 border-b border-solid border-[#eee] flex justify-between">
                    <h4 className="m-0 text-[16px] text-[#484d54] font-bold capitalize flex items-center">Top Country</h4>
                    <div className="h-[30px] flex items-center justify-center">
                        <div className="w-[30px] h-[30px] flex items-center justify-center text-[#777] border border-solid border-[#eee] rounded-[5px]">
                            <span>
                                <a href="javascript:void(0)" className="calendar">
                                    <Settings2 className="w-[16px] h-[16px] text-[#777]" />
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="p-6">
                    <div>
                        <div className="my-[15px] pb-[15px] flex justify-between border-b border-solid border-[#eee]">
                            <h5 className="m-0 text-[15px] text-[#484d54] font-semibold">Revenue</h5>
                            <a
                                href=""
                                className="flex items-center text-[12px]"
                            >view
                                <ArrowRight className="w-[12px] h-[12px] ml-[5px]" />
                            </a>
                        </div>
                        <div className="mb-6">
                            <div className="flex justify-between text-[#777]">
                                <div>
                                    <label className="text-[13px] mb-[5px] text-[#999] font-semibold">India</label>
                                    <span className="down">
                                        <i className="ri-arrow-down-line"></i>
                                        2.6%
                                    </span>
                                </div>
                                <p className="mb-[5px] text-[#777] font-semibold text-[14px] leading-[28px] tracking-[0.03rem]">$958.5k</p>
                            </div>
                            <div className="transition-all duration-300 ease-in-out h-[5px] flex overflow-hidden text-[0.75rem] bg-[#e9ecef] rounded-[0.375rem]">
                                <div className="bg-[#799ffe] flex flex-col justify-center overflow-hidden text-white text-center w-[95%]" role="progressbar"></div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <div className="flex justify-between text-[#777]">
                                <div>
                                    <label className="text-[13px] mb-[5px] text-[#999] font-semibold">Morocco</label>
                                    <span className="up"><i className="ri-arrow-up-line"></i>5.6%</span>
                                </div>
                                <p className="mb-[5px] text-[#777] font-semibold text-[14px] leading-[28px] tracking-[0.03rem]">$788.7k</p>
                            </div>
                            <div className="transition-all duration-300 ease-in-out h-[5px] flex overflow-hidden text-[0.75rem] bg-[#e9ecef] rounded-[0.375rem]">
                                <div className="bg-[#485568] flex flex-col justify-center overflow-hidden text-white text-center w-[84%]" role="progressbar"></div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <div className="flex justify-between text-[#777]">
                                <div>
                                    <label className="text-[13px] mb-[5px] text-[#999] font-semibold">Brazil</label>
                                    <span className="up"><i className="ri-arrow-up-line"></i>3.7%</span>
                                </div>
                                <p className="mb-[5px] text-[#777] font-semibold text-[14px] leading-[28px] tracking-[0.03rem]">$592.2k</p>
                            </div>
                            <div className="transition-all duration-300 ease-in-out h-[5px] flex overflow-hidden text-[0.75rem] bg-[#e9ecef] rounded-[0.375rem]">
                                <div className="bg-[#485568] flex flex-col justify-center overflow-hidden text-white text-center w-[76%]" role="progressbar"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}