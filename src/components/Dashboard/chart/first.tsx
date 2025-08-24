import { BadgeDollarSign, CircleDollarSign, ShieldUser, ShoppingBag } from 'lucide-react';
import { StackedBarChart } from './StackedBar';
import SparklineLineChart from './SparklineLine';
import { BusinessData } from '@/types/dashboard';
import { formatter } from '@/utils/currency';
import { toFraction } from '@/utils/text';
import { LoadingOutlined } from '@ant-design/icons';

export const FirstCharts = ({
    businessData,
    loading
}: {
    businessData: BusinessData,
    loading: Record<string, boolean>
}) => {
    return (
        <div className="grid grid-cols-4 gap-x-6">
            <div className="h-[100%_-_24px] mb-6 rounded-[5px] bg-[#dfe5fa]">
                <div className="p-6">
                    <div className="flex justify-between">
                        <div>
                            <h4 className="mb-3 text-[#777] text-[15px] font-medium">Visitors</h4>
                            <h5 className="m-0 text-[#485568] text-[22px] leading-[20px] font-bold">
                                {
                                    loading['business-analytics'] ?
                                        <LoadingOutlined />
                                        :
                                        businessData.totalCustomers
                                }
                            </h5>
                        </div>
                        <span className="w-[50px] h-[50px] p-[5px] bg-[rgba(72,_85,_104,_0.1)] flex items-center justify-center rounded-[5px]">
                            <ShieldUser />
                        </span>
                    </div>
                    <p className="text-[#2bbb93] mt-2.5 text-[14px] flex items-center mb-4 block">
                        <i className="ri-arrow-up-line"></i>
                        25%
                        <span className='ml-[5px] text-[#999] text-[14px]'>Last Month</span>
                    </p>
                    <div className="mini-chart">
                        <StackedBarChart />
                    </div>
                </div>
            </div>
            <div className="h-[100%_-_24px] mb-6 rounded-[5px] bg-[#fde1f5]">
                <div className="p-6">
                    <div className="flex justify-between">
                        <div>
                            <h4 className="mb-3 text-[#777] text-[15px] font-medium">Bookings</h4>
                            <h5 className="m-0 text-[#485568] text-[22px] leading-[20px] font-bold">
                                {
                                    loading['business-analytics'] ?
                                        <LoadingOutlined />
                                        :
                                        businessData.bookings.currentPeriodBookings
                                }
                            </h5>
                        </div>
                        <span className="w-[50px] h-[50px] p-[5px] bg-[rgba(72,_85,_104,_0.1)] flex items-center justify-center rounded-[5px]">
                            <ShoppingBag />
                        </span>
                    </div>
                    <p className="text-[#2bbb93] mt-2.5 text-[14px] flex items-center mb-4 block">
                        <i className="ri-arrow-down-line"></i>
                        .5%
                        <span className='ml-[5px] text-[#999] text-[14px]'>Last Month</span>
                    </p>
                    <div className="mini-chart">
                        <SparklineLineChart />
                    </div>
                </div>
            </div>
            <div className="h-[100%_-_24px] mb-6 rounded-[5px] bg-[#ffeae9]">
                <div className="p-6">
                    <div className="flex justify-between">
                        <div>
                            <h4 className="mb-3 text-[#777] text-[15px] font-medium">Revenue</h4>
                            <h5 className="m-0 text-[#485568] text-[22px] leading-[20px] font-bold">
                                {
                                    loading['business-analytics'] ?
                                        <LoadingOutlined />
                                        :
                                        formatter().format(businessData.revenue.currentTotalRevenue)
                                }
                            </h5>
                        </div>
                        <span className="w-[50px] h-[50px] p-[5px] bg-[rgba(72,_85,_104,_0.1)] flex items-center justify-center rounded-[5px]">
                            <CircleDollarSign />
                        </span>
                    </div>
                    <p className="text-[#2bbb93] mt-2.5 text-[14px] flex items-center mb-4 block">
                        <i className="ri-arrow-down-line"></i>
                        2.1%
                        <span className='ml-[5px] text-[#999] text-[14px]'>Last Month</span>
                    </p>
                    <div className="mini-chart">
                        <StackedBarChart />
                    </div>
                </div>
            </div>
            <div className="h-[100%_-_24px] mb-6 rounded-[5px] bg-[#d8f6d8]">
                <div className="p-6">
                    <div className="flex justify-between">
                        <div>
                            <h4 className="mb-3 text-[#777] text-[15px] font-medium">Conversation Rate</h4>
                            <h5 className="m-0 text-[#485568] text-[22px] leading-[20px] font-bold">
                                {
                                    loading['business-analytics'] ?
                                        <LoadingOutlined />
                                        :
                                        toFraction(businessData.conversionRate)
                                }
                            </h5>
                        </div>
                        <span className="w-[50px] h-[50px] p-[5px] bg-[rgba(72,_85,_104,_0.1)] flex items-center justify-center rounded-[5px]">
                            <BadgeDollarSign />
                        </span>
                    </div>
                    <p className="text-[#2bbb93] mt-2.5 text-[14px] flex items-center mb-4">
                        <i className="ri-arrow-up-line"></i>
                        9%
                        <span className='ml-[5px] text-[#999] text-[14px]'>Last Month</span>
                    </p>
                    <div className="mini-chart">
                        <SparklineLineChart />
                    </div>
                </div>
            </div>
        </div >
    )
}