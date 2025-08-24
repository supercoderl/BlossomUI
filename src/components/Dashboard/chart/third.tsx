import { Clock, Crown, Ellipsis, User } from "lucide-react"
import Calendar from "@/components/Calendar"
import { BusinessData } from "@/types/dashboard"
import { GenericDonutChart } from "@/components/ChartList/Donut"
import { stringToColor } from "@/utils/color"
import { AppointmentCardSkeleton } from "@/components/Loading/appointment"
import { EmployeeListItemSkeleton } from "@/components/Loading/user"
import { getOnlineStatus } from "@/utils/employee"
import { useEffect, useRef, useState } from "react"
import { getScheduleDate } from "@/app/[locale]/booking/api"
import moment from "moment"

export const ThirdCharts = ({
    businessData,
    loading,
    onlineUsers
}: {
    businessData: BusinessData,
    loading: Record<string, boolean>,
    onlineUsers: string[]
}) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [schedules, setSchedules] = useState<any>(null);
    const isFirst = useRef(true);

    const getScheduleDateAsync = async () => {
        await getScheduleDate(moment(currentDate).format("YYYY-MM-DD")).then((res: any) => {
            if (res && res.success) {
                setSchedules(res.data);
            }
        })
    }

    useEffect(() => {
        if (isFirst.current) {
            isFirst.current = false;
            return;
        }

        getScheduleDateAsync();
    }, [currentDate]);

    return (
        <div className="grid grid-cols-4 gap-x-6">
            <div className="shadow-[0px_5px_10px_0px_rgba(0,_0,_0,_0.02)] relative flex flex-col h-[100%_-_1.5rem] text-[#97A1C0] bg-white border border-solid border-[#eee] rounded-2xl">
                <div className="rounded-[5px] py-5 px-5 flex items-center justify-between border-0 pb-0">
                    <h6 className="text-[#0C243C] text-[16px] mb-0">Category types </h6>
                    <div className="rounded-[8px] relative inline-flex vertical-middle">
                        <button className="text-[14px] w-[32px] h-[32px] relative flex-1 inline-flex items-center justify-center">
                            <Ellipsis />
                        </button>
                        <ul className="hidden dropdown-menu dropdown-menu-end">
                            <li>
                                <a className="dropdown-item" href="javascript:void(0);">Onsite</a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="javascript:void(0);">Remote</a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="javascript:void(0);">Hybrid</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="py-0 px-4 h-full flex items-center justify-center">
                    <div className="max-w-[250xp] relative w-full">
                        <GenericDonutChart
                            data={businessData.categories.map(item => ({
                                value: item.serviceCount,
                                label: item.categoryName,
                                color: stringToColor(item.categoryName)
                            }))}
                            loading={loading['business-analytics']}
                        />
                    </div>
                </div>
            </div>
            <div className="shadow-[0px_5px_10px_0px_rgba(0,_0,_0,_0.02)] relative flex flex-col h-[100%_-_1.5rem] text-[#97A1C0] bg-white border border-solid border-[#eee] rounded-2xl">
                <div className="rounded-[5px] py-5 px-5 flex items-center justify-between border-0 pb-0">
                    <h6 className="text-[#0C243C] text-[16px] mb-0">Team</h6>
                    <div className="clearfix">
                        <a href="javascript:void(0);" className="btn-link">View All</a>
                    </div>
                </div>
                <div className="h-[325px] px-5 pt-5 overflow-y-auto">
                    <ul className="flex flex-col rounded-[5px] gap-y-4">
                        {
                            loading['business-analytics'] ?
                                [...Array(4)].map((_, index) => (
                                    <EmployeeListItemSkeleton key={index} />
                                ))
                                :
                                businessData.technicians.map(item => (
                                    <li
                                        key={item.id}
                                        className="relative group overflow-hidden border border-solid rounded-[5px] transition-background-color duration-300 ease flex items-center justify-between relative p-2.5 bg-white border-[#eee]"
                                    >
                                        <div className="mr-auto">
                                            <h6 className="mb-0 text-[0.875rem] font-semibold text-[#0C243C]">{item.fullname}</h6>
                                            <small className="text-[rgb(151,_161,_192)] font-medium block text-[0.875rem]">EXP:
                                                <span className="text-[rgb(49,_106,_255)] font-medium text-[0.875rem] ml-1">{item.yearsOfExperience}</span>
                                            </small>
                                        </div>
                                        <div className="flex relative">
                                            <div
                                                className="h-[35px] w-[35px] text-[18px] flex items-center justify-center rounded-full border-2 border-solid border-gray-200 overflow-hidden"
                                            >
                                                <img
                                                    src={item.avatarUrl}
                                                    alt=""
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            {
                                                getOnlineStatus(onlineUsers, item.userId) &&
                                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                                            }
                                        </div>

                                        <div
                                            className="absolute inset-0 bg-[rgba(0,_0,_0,_0.6)] opacity-0 transition-all duration-300 ease-in-out flex items-center justify-center cursor-pointer group-hover:opacity-100"
                                        >
                                            <span className="text-white text-[16px] font-medium italic">Click to chat</span>
                                        </div>
                                    </li>
                                ))
                        }
                    </ul>
                </div>
            </div>
            <div className="h-[100%_-_1.5rem] bg-[1.5rem] flex overflow-hidden col-span-2 rounded-2xl border border-solid border-[#eee]">
                <div className="w-full shadow-[0px_5px_10px_0px_rgba(0,_0,_0,_0.02)] relative flex flex-col h-[100%_-_1.5rem] text-[#97A1C0] bg-white border-r border-solid border-[#eee]">
                    <div className="rounded-[5px] py-5 px-5 flex items-center justify-between border-0 pb-0">
                        <h6 className="text-[#0C243C] text-[16px] mb-0">Schedule</h6>
                        <button type="button" className="btn btn-sm btn-outline-light btn-shadow waves-effect text-primary ms-3">
                            <i className="fi fi-rr-plus text-2xs me-1"></i> Create New
                        </button>
                    </div>
                    <div className="p-3">
                        <Calendar currentDate={currentDate} setCurrentDate={setCurrentDate} />
                    </div>
                </div>
                <div className="w-full shadow-[0px_5px_10px_0px_rgba(0,_0,_0,_0.02)] relative flex flex-col h-[100%_-_1.5rem] text-[#97A1C0] bg-white">
                    <div className="h-[325px] relative flex-1 p-5">
                        <div className="-m-5 overflow-hidden">
                            <div className="h-full w-full max-w-[1px] relative float-left max-h-[1px] overflow-hidden z-[-1]">
                                <div className="block opacity-0 absolute top-0 left-0 h-full w-full min-h-[1px] min-w-[1px] overflow-hidden z-[-1]"></div>
                            </div>
                            <div className="absolute overflow-hidden inset-0 w-auto h-auto z-0">
                                <div className="absolute inset-0">
                                    <div className="relative block h-full w-auto overflow-x-hidden overflow-y-auto">
                                        <div className="p-5">
                                            {
                                                loading['business-analytics'] || loading['get-schedule-date'] ?
                                                    [...Array(5)].map((_, index) => (
                                                        <AppointmentCardSkeleton key={index} />
                                                    ))
                                                    :
                                                    (schedules !== null ? schedules : businessData.schedules).map((item: any) => (
                                                        <div
                                                            className="p-4 rounded-[5px] bg-[rgba(236,_242,_253,_0.5)] mb-4"
                                                            key={item.id}
                                                        >
                                                            <div className="flex items-center justify-between mb-1">
                                                                <h6 className="mb-0 text-[0.875rem] font-semibold text-[#0C243C] flex items-center gap-1">
                                                                    <Crown className="w-[16px] h-[16px]" />
                                                                    {item.customerName}
                                                                </h6>
                                                                <div className="flex items-center">
                                                                    <div className="rounded-[8px] relative inline-flex vertical-middle">
                                                                        <button className="relative inline-flex" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                            <Ellipsis className="w-[16px] h-[16px]" />
                                                                        </button>
                                                                        <ul className="hidden dropdown-menu dropdown-menu-end">
                                                                            <li>
                                                                                <a className="dropdown-item" href="javascript:void(0);">Edit</a>
                                                                            </li>
                                                                            <li>
                                                                                <a className="dropdown-item" href="javascript:void(0);">Delete</a>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="text-2xs flex gap-1 items-center">
                                                                <User className="w-[16px] h-[16px]" />
                                                                <span>{item.technicianName}</span>
                                                            </div>
                                                            <div className="mt-4 flex items-center justify-between">
                                                                <span className="min-w-[26px] py-[5px] px-2.5 bg-white font-semibold">{item.customerPhone}</span>
                                                                <span className="text-[12px] text-[rgb(49,_106,_255)] font-semibold flex items-center">
                                                                    <Clock className="w-[16px] h-[16px]" /> &nbsp; {item.startTime} - {item.endTime}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[317px] max-h-full max-w-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}