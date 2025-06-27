import {
    LeftOutlined,
} from '@ant-design/icons';
import { Dispatch, SetStateAction } from 'react';
import ServiceSelection from '../form/ServiceSelection';
import CalendarSelection from '../form/CalendarSelection';
import Information from '../form/Information';
import Confirmation from '../form/Confirmation';
import ConfirmationSkeleton from '../form/Skeleton';

const RightContent = ({
    state,
    setState,
    selectedService,
    selectedEmployee,
    selectedDate,
    selectedTime,
    information,
    months,
    currentMonth,
    currentYear,
    setSelectedService,
    setSelectedEmployee,
    setSelectedDate,
    setSelectedTime,
    setCurrentMonth,
    setCurrentYear,
    setInformation
}: {
    state: number,
    setState: Dispatch<SetStateAction<number>>,
    selectedService: string,
    selectedEmployee: string,
    selectedDate: any,
    selectedTime: string,
    information: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
    },
    months: string[],
    currentMonth: number,
    currentYear: number,
    setSelectedService: Dispatch<SetStateAction<string>>,
    setSelectedEmployee: Dispatch<SetStateAction<string>>,
    setSelectedDate: Dispatch<SetStateAction<null>>,
    setSelectedTime: Dispatch<SetStateAction<string>>,
    setCurrentMonth: Dispatch<SetStateAction<number>>,
    setCurrentYear: Dispatch<SetStateAction<number>>,
    setInformation: Dispatch<SetStateAction<{
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
    }>>
}) => {
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const timeSlots = [
        '9:00 AM - 10:00 AM',
        '11:00 AM - 12:00 PM',
        '11:30 AM - 12:30 PM',
        '12:00 PM - 1:00 PM',
        '12:30 PM - 1:30 PM',
        '1:00 PM - 2:00 PM',
        '1:30 PM - 2:30 PM',
        '2:00 PM - 3:00 PM',
        '2:30 PM - 3:30 PM',
        '3:00 PM - 4:00 PM',
        '3:30 PM - 4:30 PM',
        '4:00 PM - 5:00 PM'
    ];

    const renderHeader = () => {
        switch (state) {
            case 1:
                return (
                    <span className="flex items-center">
                        <span className="text-[18px] font-medium text-[#33434C] m-0 whitespace-nowrap">Service Selection</span>
                    </span>
                );
            case 2:
                return (
                    <span className="flex items-center">
                        <button
                            className="w-[24px] mr-[12px] bg-transparent text-[#1A2C37] border border-solid border-[rgba(26,_44,_55,_0.3)] inline-flex items-center justify-center h-[24px] text-[16px] font-medium whitespace-nowrap decoration-none rounded-[6px] p-[2px] cursor-pointer transition-all duration-300 ease-in-out"
                            type="button"
                            onClick={() => setState(prev => prev - 1)}
                        >
                            <LeftOutlined className='flex items-center justify-center overflow-hidden' />
                        </button>
                        <span className="text-[18px] font-medium text-[#33434C] m-0 whitespace-nowrap">Date & Time</span>
                    </span>
                );
            case 3:
                return (
                    <span className="flex items-center">
                        <button
                            className="w-[24px] mr-[12px] bg-transparent text-[#1A2C37] border border-solid border-[rgba(26,_44,_55,_0.3)] inline-flex items-center justify-center h-[24px] text-[16px] font-medium whitespace-nowrap decoration-none rounded-[6px] p-[2px] cursor-pointer transition-all duration-300 ease-in-out"
                            type="button"
                            onClick={() => setState(prev => prev - 1)}
                        >
                            <LeftOutlined className='flex items-center justify-center overflow-hidden' />
                        </button>
                        <span className="text-[18px] font-medium text-[#33434C] m-0 whitespace-nowrap">Your Information</span>
                    </span>
                );
            case 4:
                return (
                    <span className="flex items-center">
                        <button
                            className="w-[24px] mr-[12px] bg-transparent text-[#1A2C37] border border-solid border-[rgba(26,_44,_55,_0.3)] inline-flex items-center justify-center h-[24px] text-[16px] font-medium whitespace-nowrap decoration-none rounded-[6px] p-[2px] cursor-pointer transition-all duration-300 ease-in-out"
                            type="button"
                            onClick={() => setState(prev => prev - 1)}
                        >
                            <LeftOutlined className='flex items-center justify-center overflow-hidden' />
                        </button>
                        <span className="text-[18px] font-medium text-[#33434C] m-0 whitespace-nowrap">Payments</span>
                    </span>
                );
        }
    }

    const renderItem = () => {
        switch (state) {
            case 1:
                return (
                    <ServiceSelection
                        selectedService={selectedService}
                        setSelectedService={setSelectedService}
                        selectedEmployee={selectedEmployee}
                        setSelectedEmployee={setSelectedEmployee}
                    />
                );
            case 2:
                return (
                    <CalendarSelection
                        currentMonth={currentMonth}
                        currentYear={currentYear}
                        selectedDate={selectedDate}
                        selectedTime={selectedTime}
                        setSelectedDate={setSelectedDate}
                        setSelectedTime={setSelectedTime}
                        setCurrentMonth={setCurrentMonth}
                        setCurrentYear={setCurrentYear}
                        months={months}
                        daysOfWeek={daysOfWeek}
                        timeSlots={timeSlots}
                    />
                );
            case 3:
                return (
                    <Information
                        information={information}
                        setInformation={setInformation}
                    />
                );
            case 4:
                return (
                    <Confirmation />
                );
            case 5: return (
                <ConfirmationSkeleton />
            )
            default:
                return (
                    <ServiceSelection
                        selectedService={selectedService}
                        setSelectedService={setSelectedService}
                        selectedEmployee={selectedEmployee}
                        setSelectedEmployee={setSelectedEmployee}
                    />
                );
        }
    }

    return (
        <>
            <div className="py-4 px-8 shadow-[0_2px_3px_rgba(26,_44,_55,_0.15)] relative">
                {renderHeader()}
            </div>
            <div className="pt-[40px] block overflow-x-hidden h-[444px] py-4 px-8">
                <form className="">
                    {renderItem()}
                </form>
                <div className="hidden">
                    <div className="am-slide-popup__up-inner">
                        <p className="am-fs__popup-x">
                            <span className="am-icon-close"></span>
                        </p>
                        <div className="am-fs__ps-popup">
                            <div className="am-fs__ps-popup__heading">Hey, there are special packages with this service, check them out!</div>
                            <div className="am-fs__ps am-fs__ps-popup">
                            </div>
                            <div className="am-fs__ps-popup__or">Or</div>
                        </div>
                        <div className="am-slide-popup__up-footer">
                            <button id="" className="am-button am-button--filled am-button--medium am-button--primary am-package-popup-continue am-fs__ps-popup__btn-mobile" type="button">
                                <span className="am-button__inner">Skip packages and continue with the selected service</span><div className="am-fs__ps-pill">$0.00</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RightContent;