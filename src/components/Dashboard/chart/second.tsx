import { ArrowDown, ArrowRight, ArrowUp, EqualApproximately, Maximize, Minimize } from "lucide-react"
import { BusinessData } from "@/types/dashboard"
import { formatter } from "@/utils/currency"
import { GenericAreaChart } from "@/components/ChartList/Area"
import { months } from "@/data/date"
import { useEffect, useRef, useState } from "react"

export const SecondCharts = ({
    businessData,
    loading
}: {
    businessData: BusinessData,
    loading: Record<string, boolean>
}) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = () => {
            setIsFullscreen(document.fullscreenElement === divRef.current);
        };

        document.addEventListener("fullscreenchange", handler);
        return () => document.removeEventListener("fullscreenchange", handler);
    }, []);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement && divRef.current) {
            divRef.current.requestFullscreen();
        } else if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    };

    const getProgressPercentage = (revenue: number, target: number) => {
        return Math.min((revenue / target) * 100, 100);
    };

    const formatCurrency = (amount: number) => {
        if (amount >= 1000) {
            return `$${(amount / 1000).toFixed(1)}k`;
        }
        return `$${amount.toFixed(0)}`;
    };

    const getTrendIcon = (service: any) => {
        if (service.revenueChange > 0) {
            return <ArrowUp className="inline w-3 h-3 mr-1" />;
        } else if (service.revenueChange < 0) {
            return <ArrowDown className="inline w-3 h-3 mr-1" />;
        }
        return null;
    };

    const getTrendColor = (service: any) => {
        if (service.revenueChange > 0) return 'text-green-500';
        if (service.revenueChange < 0) return 'text-red-500';
        return 'text-gray-500';
    };

    const getBarColor = (service: any) => {
        if (service.revenueChange > 0) return 'bg-blue-400';
        if (service.revenueChange < 0) return 'bg-red-400';
        return 'bg-gray-600';
    };

    const chartData = [
        {
            name: "Bookings",
            data: [21, 11, 22, 22, 20, 40, 35, 30, 50, 40, 35],
            color: "#4b5563"
        },
        {
            name: "Revenue",
            data: [45, 55, 20, 30, 25, 50, 40, 39, 50, 35, 38],
            color: "#9ca3af"
        },
        {
            name: "Expense",
            data: [30, 25, 35, 38, 40, 38, 45, 44, 50, 42, 40],
            color: "#60a5fa"
        }
    ];

    const totalServiceRevenue = businessData.services.reduce((sum, service) => sum + service.totalRevenue, 0);
    // Calculate estimated expenses (30% of revenue for this example)
    const estimatedExpenses = totalServiceRevenue * 0.3;

    // Calculate profit
    const estimatedProfit = totalServiceRevenue - estimatedExpenses;

    return (
        <div className="row">
            <div
                className="h-[100%_-_24px] bg-white rounded-[5px] border border-solid border-white border-b-[3px] border-b-[#eee] border-t-[3px] border-[#eee]"
                ref={divRef}
            >
                <div className="p-6 border-b border-solid border-[#eee] flex justify-between">
                    <h4 className="m-0 text-[16px] text-[#484d54] font-bold capitalize flex items-center">Revenue Overview</h4>
                    <div className="h-[30px] flex items-center justify-center">
                        <a
                            href="javascript:void(0)"
                            className="w-[30px] h-[30px] flex items-center justify-center text-[#777] border border-solid border-[#eee] rounded-[5px] mr-2.5"
                            onClick={toggleFullscreen}
                        >
                            {
                                isFullscreen ?
                                    <Minimize className="w-[16px] h-[16px]" />
                                    :
                                    <Maximize className="w-[16px] h-[16px]" />
                            }
                        </a>
                    </div>
                </div>
                <div className="p-6">
                    <div className="p-2.5 flex justify-around bg-[rgba(72,_85,_104,_0.07)] rounded-[5px]">
                        <div className="p-2.5 text-center">
                            <h6 className="text-[#777] text-[14px] mb-2">Bookings</h6>
                            <h5 className="m-0 text-[#485568] font-semibold text-[15px]">{businessData.bookings.currentPeriodBookings}
                                {
                                    businessData.bookings.trend === "Trend" ?
                                        (
                                            <span className="ml-1 text-[#2bbb93] text-[11px] inline-flex items-center justify-center ">
                                                <ArrowUp className="w-[11px] h-[11px]" />
                                                {businessData.bookings.percentageChange}%
                                            </span>
                                        ) :
                                        (
                                            <span className="ml-1 text-[#2bbb93] text-[11px] inline-flex items-center justify-center ">
                                                <EqualApproximately className="w-[11px] h-[11px]" />
                                                0%
                                            </span>
                                        )
                                }
                            </h5>
                        </div>
                        <div className="p-2.5 text-center">
                            <h6 className="text-[#777] text-[14px] mb-2">Revenue</h6>
                            <h5 className="m-0 text-[#485568] font-semibold text-[15px]">{formatter().format(businessData.revenue.currentTotalRevenue)}
                                {
                                    businessData.revenue.revenueTrend === "Trend" ?
                                        (
                                            <span className="ml-1 text-[#2bbb93] text-[11px] inline-flex items-center justify-center ">
                                                <ArrowUp className="w-[11px] h-[11px]" />
                                                {businessData.revenue.revenuePercentageChange}%
                                            </span>
                                        ) :
                                        (
                                            <span className="ml-1 text-[#2bbb93] text-[11px] inline-flex items-center justify-center ">
                                                <EqualApproximately className="w-[11px] h-[11px]" />
                                                0%
                                            </span>
                                        )
                                }
                            </h5>
                        </div>
                        <div className="p-2.5 text-center">
                            <h6 className="text-[#777] text-[14px] mb-2">Expence</h6>
                            <h5 className="m-0 text-[#485568] font-semibold text-[15px]">{formatter().format(estimatedExpenses)}
                                <span className="ml-1 text-[#f90c4c] text-[11px] inline-flex items-center justify-center ">
                                    <ArrowDown className="w-[11px] h-[11px]" />
                                    24%
                                </span>
                            </h5>
                        </div>
                        <div className="p-2.5 text-center">
                            <h6 className="text-[#777] text-[14px] mb-2">Profit</h6>
                            <h5 className="m-0 text-[#485568] font-semibold text-[15px]">{formatter().format(estimatedProfit)}
                                <span className="ml-1 text-[#2bbb93] text-[11px] inline-flex items-center justify-center ">
                                    <ArrowUp className="w-[11px] h-[11px]" />
                                    24%
                                </span>
                            </h5>
                        </div>
                    </div>
                    <div className="chart-content">
                        <div id="overviewChart" className="min-h-[380px]">
                            <GenericAreaChart
                                series={chartData}
                                categories={months}
                                fillOpacity={[0.8, 0.4, 0.2]}
                                loading={loading['business-analytics']}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-[100%_-_24px] mb-6 bg-white rounded-[5px] border border-solid border-white border-b-[3px] border-b-[#eee] border-t-[3px] border-[#eee]" id="lhmap">
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
                        <div className="space-y-6">
                            {businessData.services.map((service, index) => (
                                <div key={index} className="space-y-2">
                                    {/* Service name, change indicator, and revenue */}
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-gray-600 font-medium">{service.serviceName}</span>
                                            <span className={`text-sm flex items-center ${getTrendColor(service)}`}>
                                                {getTrendIcon(service)}
                                                {service.revenueChange > 0 && '+'}
                                                {service.revenueChangePercent.toFixed(1)}%
                                            </span>
                                        </div>
                                        <span className="text-gray-800 font-semibold text-lg">
                                            {formatCurrency(service.totalRevenue)}
                                        </span>
                                    </div>

                                    {/* Progress bar */}
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full transition-all duration-500 ${getBarColor(service)}`}
                                            style={{ width: `${getProgressPercentage(service.totalRevenue, 100)}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}