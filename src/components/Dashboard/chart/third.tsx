import { Clock, Ellipsis } from "lucide-react"
import { DonutChart } from "./Donut"
import Calendar from "@/components/Calendar"

export const ThirdCharts = () => {
    return (
        <div className="grid grid-cols-4 gap-x-6">
            <div className="shadow-[0px_5px_10px_0px_rgba(0,_0,_0,_0.02)] relative flex flex-col h-[100%_-_1.5rem] text-[#97A1C0] bg-white border border-solid border-[#eee] rounded-2xl">
                <div className="rounded-[5px] py-5 px-5 flex items-center justify-between border-0 pb-0">
                    <h6 className="text-[#0C243C] text-[16px] mb-0">Employee Type </h6>
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
                        <DonutChart />
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
                <div className="px-4 pb-4 pt-5">
                    <ul className="flex flex-col rounded-[5px]">
                        <li className="mb-[5px] border border-solid rounded-[5px] transition-background-color duration-300 ease flex items-center justify-between relative p-2.5 bg-white border-[#eee]">
                            <div className="mr-auto">
                                <h6 className="mb-0 text-[0.875rem] font-semibold text-[#0C243C]">Marketing</h6>
                                <small className="text-[rgb(151,_161,_192)] font-medium block text-[0.875rem]">Member 
                                    <span className="text-[rgb(49,_106,_255)] font-medium text-[0.875rem]">03</span>
                                </small>
                            </div>
                            <div className="avatar-group">
                                <div className="avatar avatar-xs rounded-circle border border-2 border-white">
                                    <img src="assets/images/avatar/avatar1.webp" alt="" />
                                </div>
                            </div>
                        </li>
                        <li className="mb-[5px] border border-solid rounded-[5px] transition-background-color duration-300 ease flex items-center justify-between relative p-2.5 bg-white border-[#eee]">
                            <div className="mr-auto">
                                <h6 className="mb-0 text-[0.875rem] font-semibold text-[#0C243C]">Development</h6>
                                <small className="text-[rgb(151,_161,_192)] font-medium block text-[0.875rem]">Member 
                                    <span className="text-[rgb(49,_106,_255)] font-medium text-[0.875rem]">40</span>
                                </small>
                            </div>
                            <div className="avatar-group">
                                <div className="avatar avatar-xs rounded-circle border border-2 border-white">
                                    <img src="assets/images/avatar/avatar4.webp" alt="" />
                                </div>
                                <div className="avatar avatar-xs rounded-circle border border-2 border-white">
                                    <img src="assets/images/avatar/avatar5.webp" alt="" />
                                </div>
                                <div className="avatar avatar-xs rounded-circle border border-2 border-white">
                                    <img src="assets/images/avatar/avatar1.webp" alt="" />
                                </div>
                                <div className="avatar avatar-xs rounded-circle border border-2 border-white">
                                    <img src="assets/images/avatar/avatar2.webp" alt="" />
                                </div>
                            </div>
                        </li>
                        <li className="mb-[5px] border border-solid rounded-[5px] transition-background-color duration-300 ease flex items-center justify-between relative p-2.5 bg-white border-[#eee]">
                            <div className="me-auto">
                                <h6 className="mb-0 text-[0.875rem] font-semibold text-[#0C243C]">Designing Team</h6>
                                <small className="text-[rgb(151,_161,_192)] font-medium block text-[0.875rem]">Member <span className="text-suc">03</span>
                                </small>
                            </div>
                            <div className="avatar-group">
                                <div className="avatar avatar-xs rounded-circle border border-2 border-white">
                                    <img src="assets/images/avatar/avatar3.webp" alt="" />
                                </div>
                                <div className="avatar avatar-xs rounded-circle border border-2 border-white">
                                    <img src="assets/images/avatar/avatar4.webp" alt="" />
                                </div>
                                <div className="avatar avatar-xs rounded-circle border border-2 border-white">
                                    <img src="assets/images/avatar/avatar5.webp" alt="" />
                                </div>
                            </div>
                        </li>
                        <li className="mb-[5px] border border-solid rounded-[5px] transition-background-color duration-300 ease flex items-center justify-between relative p-2.5 bg-white border-[#eee]">
                            <div className="me-auto">
                                <h6 className="mb-0 text-[0.875rem] font-semibold text-[#0C243C]">Management</h6>
                                <small className="text-[rgb(151,_161,_192)] font-medium block text-[0.875rem]">Member <span className="text-primary">02</span>
                                </small>
                            </div>
                            <div className="avatar-group">
                                <div className="avatar avatar-xs rounded-circle border border-2 border-white">
                                    <img src="assets/images/avatar/avatar1.webp" alt="" />
                                </div>
                                <div className="avatar avatar-xs rounded-circle border border-2 border-white">
                                    <img src="assets/images/avatar/avatar2.webp" alt="" />
                                </div>
                            </div>
                        </li>
                        <li className="mb-[5px] border border-solid rounded-[5px] transition-background-color duration-300 ease flex items-center justify-between relative p-2.5 bg-white border-[#eee]">
                            <div className="me-auto">
                                <h6 className="mb-0 text-[0.875rem] font-semibold text-[#0C243C]">Finance</h6>
                                <small className="text-[rgb(151,_161,_192)] font-medium block text-[0.875rem]">Member <span className="text-primary">12</span>
                                </small>
                            </div>
                            <div className="avatar-group">
                                <div className="avatar avatar-xs rounded-circle border border-2 border-white">
                                    <img src="assets/images/avatar/avatar5.webp" alt="" />
                                </div>
                                <div className="avatar avatar-xs rounded-circle border border-2 border-white">
                                    <img src="assets/images/avatar/avatar4.webp" alt="" />
                                </div>
                                <div className="avatar avatar-xs rounded-circle border border-2 border-white">
                                    <img src="assets/images/avatar/avatar3.webp" alt="" />
                                </div>
                                <div className="avatar avatar-xs rounded-circle border border-2 border-white">
                                    <img src="assets/images/avatar/avatar2.webp" alt="" />
                                </div>
                            </div>
                        </li>
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
                        <Calendar />
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
                                            <div className="p-4 rounded-[5px] bg-[rgba(236,_242,_253,_0.5)] mb-2">
                                                <div className="flex items-center justify-between">
                                                    <h6 className="mb-0 text-[0.875rem] font-semibold text-[#0C243C]">Team Stand Up</h6>
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
                                                <div className="text-2xs d-flex gap-1 align-items-center">
                                                    <img src="assets/images/icons/google-meet.svg" alt="" />
                                                    <span>On Google Meet</span>
                                                </div>
                                                <div className="mt-4 flex items-center justify-between">
                                                    <span className="min-w-[26px] py-[5px] px-2.5 bg-white font-semibold">Marketing</span>
                                                    <span className="text-[12px] text-[rgb(49,_106,_255)] font-semibold flex items-center">
                                                        <Clock className="w-[16px] h-[16px]" /> &nbsp; 06:00 - 07:00
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-4 rounded-[5px] bg-[rgba(236,_242,_253,_0.5)] mb-2">
                                                <div className="flex items-center justify-between">
                                                    <h6 className="mb-0 text-[0.875rem] font-semibold text-[#0C243C]">All Hands Meeting</h6>
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
                                                <div className="text-2xs d-flex gap-1 align-items-center">
                                                    <img src="assets/images/icons/google-meet.svg" alt="" />
                                                    <span>On Google Meet</span>
                                                </div>
                                                <div className="mt-4 flex items-center justify-between">
                                                    <span className="min-w-[26px] py-[5px] px-2.5 bg-white font-semibold">Manager</span>
                                                    <span className="text-[12px] text-[rgb(49,_106,_255)] font-semibold flex items-center">
                                                        <Clock className="w-[16px] h-[16px]" /> &nbsp; 06:00 - 07:00
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-4 rounded-[5px] bg-[rgba(236,_242,_253,_0.5)] mb-2">
                                                <div className="flex items-center justify-between">
                                                    <h6 className="mb-0 text-[0.875rem] font-semibold text-[#0C243C]">Sprint Planning</h6>
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
                                                <div className="text-2xs d-flex gap-1 align-items-center">
                                                    <img src="assets/images/icons/google-meet.svg" alt="" />
                                                    <span>On Google Meet</span>
                                                </div>
                                                <div className="mt-4 flex items-center justify-between">
                                                    <span className="min-w-[26px] py-[5px] px-2.5 bg-white font-semibold">HR</span>
                                                    <span className="text-[12px] text-[rgb(49,_106,_255)] font-semibold flex items-center">
                                                        <Clock className="w-[16px] h-[16px]" /> &nbsp; 06:00 - 07:00
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-4 rounded-[5px] bg-[rgba(236,_242,_253,_0.5)] mb-2">
                                                <div className="flex items-center justify-between">
                                                    <h6 className="mb-0 text-[0.875rem] font-semibold text-[#0C243C]">Team Stand Up</h6>
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
                                                <div className="text-2xs d-flex gap-1 align-items-center">
                                                    <img src="assets/images/icons/google-meet.svg" alt="" />
                                                    <span>On Google Meet</span>
                                                </div>
                                                <div className="mt-4 flex items-center justify-between">
                                                    <span className="min-w-[26px] py-[5px] px-2.5 bg-white font-semibold">Marketing</span>
                                                    <span className="text-[12px] text-[rgb(49,_106,_255)] font-semibold flex items-center">
                                                        <Clock className="w-[16px] h-[16px]" /> &nbsp; 06:00 - 07:00
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-4 rounded-[5px] bg-[rgba(236,_242,_253,_0.5)] mb-2">
                                                <div className="flex items-center justify-between">
                                                    <h6 className="mb-0">All Hands Meeting</h6>
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
                                                <div className="text-2xs d-flex gap-1 align-items-center">
                                                    <img src="assets/images/icons/google-meet.svg" alt="" />
                                                    <span>On Google Meet</span>
                                                </div>
                                                <div className="mt-4 flex items-center justify-between">
                                                    <span className="min-w-[26px] py-[5px] px-2.5 bg-white font-semibold">Manager</span>
                                                    <span className="text-[12px] text-[rgb(49,_106,_255)] font-semibold flex items-center">
                                                        <Clock className="w-[16px] h-[16px]" /> &nbsp; 06:00 - 07:00
                                                    </span>
                                                </div>
                                            </div>
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