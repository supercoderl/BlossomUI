import {
    LeftCircleOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { useGlobalMessage } from '@/providers/messageProvider';
import LeftContent from '@/components/Appointment/left';
import LeftContentSubmit from '@/components/Appointment/left/content-2';
import RightContentSubmit from '@/components/Appointment/right/content-2';
import RightContent from '@/components/Appointment/right';
import { cn } from '@/utils/helpers';
import { PhoneIcon } from '@/components/Icon/phone';
import { ClockIcon } from '@/components/Icon/clock';
import { LocationIcon } from '@/components/Icon/location';

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];


const BookingFormSection = () => {
    const [messageApi] = useGlobalMessage();
    const [selectedService, setSelectedService] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('9:00 AM - 10:00 AM');
    const [currentMonth, setCurrentMonth] = useState(5); // June (0-indexed)
    const [currentYear, setCurrentYear] = useState(2025);
    const [state, setState] = useState(1);
    const [information, setInformation] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    })
    const [isSubmit, setIsSubmit] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const onSubmit = () => {
        switch (state) {
            case 1:
                if (!selectedService) {
                    messageApi.warning("Please select a service!");
                    return;
                }
                setState(prev => prev + 1);
                break;
            case 2:
                if (!selectedDate) {
                    messageApi.warning("Please select date!");
                    return;
                }
                setState(prev => prev + 1);
                break;
            case 3:
                if (!information.firstName || !information.lastName) {
                    messageApi.warning("Please input required fields!");
                    return;
                }
                setState(prev => prev + 1);
                break;
            case 4:
                setState(prev => prev + 1);
                break;
        }
    }


    return (
        <section className="mt-[100px] mb-[70px] relative">
            <div className="max-w-[767px] md:max-w-[1170px] flex flex-wrap flex-col md:flex-row relative mx-auto">
                <div className="w-full md:w-2/3 relative min-h flex">
                    <div className="px-[15px] flex relative flex-wrap w-full content-start">
                        <div className="w-full relative">
                            <div className="">
                                <div className="">
                                    <div className="bg-transparent">
                                        <div className={
                                            cn(
                                                'flex justify-center w-full rounded-[8px] shadow-[0_30px_40px_#0000001f] transition-max-width duration-300 ease-in-out',
                                                isCollapsed ? "max-w-[592px]" : "max-w-[760px]"
                                            )
                                        }>
                                            <div className={
                                                cn(
                                                    "pb-[16px] flex-[0_0_auto] relative hidden md:flex flex-col justify-between text-[16px] bg-[rgba(246,_235,_231,_1)] text-black py-4 pr-2 pl-4 transition-width duration-300 ease-in-out",
                                                    isCollapsed ? "w-[72px]" : "w-[240px]"
                                                )
                                            }>
                                                <div className="pr-2 overflow-x-hidden max-w-md">
                                                    {
                                                        isSubmit ?
                                                            <LeftContentSubmit />
                                                            :
                                                            <LeftContent
                                                                state={state}
                                                                selectedService={selectedService}
                                                                selectedEmployee={selectedEmployee}
                                                                selectedDate={selectedDate}
                                                                information={information
                                                                }
                                                                months={months}
                                                                currentMonth={currentMonth}
                                                                currentYear={currentYear}
                                                                selectedTime={selectedTime}
                                                                isCollapsed={isCollapsed}
                                                            />
                                                    }

                                                    <div className="absolute bottom-4 left-4 w-[calc(100%-32px)]">
                                                        <div
                                                            className="flex items-center justify-between border-t border-black/10 pt-3 cursor-pointer"
                                                            onClick={() => setIsCollapsed(!isCollapsed)}
                                                        >
                                                            {!isCollapsed && <span className="text-base font-medium">Collapse menu</span>}
                                                            <LeftCircleOutlined className={
                                                                cn(
                                                                    "text-[24px] bg-black rounded-full !text-white",
                                                                    isCollapsed && "mx-auto"
                                                                )
                                                            } />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="max-w-[520px] w-full bg-white overflow-hidden">
                                                <div className="overflow-hidden relative h-full">
                                                    {
                                                        isSubmit ?
                                                            <RightContentSubmit />
                                                            :
                                                            <RightContent
                                                                state={state}
                                                                setState={setState}
                                                                selectedService={selectedService}
                                                                selectedEmployee={selectedEmployee}
                                                                selectedDate={selectedDate}
                                                                selectedTime={selectedTime}
                                                                information={information}
                                                                months={months}
                                                                currentMonth={currentMonth}
                                                                currentYear={currentYear}
                                                                setSelectedService={setSelectedService}
                                                                setSelectedEmployee={setSelectedEmployee}
                                                                setSelectedDate={setSelectedDate}
                                                                setSelectedTime={setSelectedTime}
                                                                setCurrentMonth={setCurrentMonth}
                                                                setCurrentYear={setCurrentYear}
                                                                setInformation={setInformation} />
                                                    }
                                                    <div className="flex items-center justify-end w-full py-2 px-8 bg-transparent shadow-[0_-2px_3px_rgba(26,_44,_55,_0.15)]">
                                                        <button
                                                            className="bg-black text-white border border-solid border-black inline-flex items-center justify-center h-[40px] text-[15px] font-medium whitespace-nowrap decoration-none transition-all duration-300 ease-in-out py-2 px-5 rounded-[6px] cursor-pointer hover:bg-[rgba(0,_0,_0,_0.8)]"
                                                            type="button"
                                                            onClick={onSubmit}
                                                        >
                                                            <span>Continue</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/3 mt-24 md:m-0 relative min-h flex">
                    <div className="w-full pt-[10px] flex relative flex-wrap content-start">
                        <div className="w-full relative">
                            <div className="">
                                <div className="flex-col flex flex-wrap text-center">
                                    <div className="mb-[50px] flex-[0_0_100%] max-w-full relative w-full min-h px-[15px]">
                                        <div className="mb-[19px]">
                                            <PhoneIcon className='w-12 h-12' />
                                        </div>
                                        <h6 className="mb-[10px] text-[20px] font-medium">Contact</h6>
                                        <div className="text-center px-[49px] text-[16px]">
                                            <p className='mb-0'>T: +44 23 8061 3526<br />blossom_nails2018@outlook.com</p>
                                        </div>
                                    </div>
                                    <div className="mb-[50px] flex-[0_0_100%] max-w-full relative w-full min-h px-[15px]">
                                        <div className="mb-[19px]">
                                            <ClockIcon className='w-12 h-12' />
                                        </div>
                                        <h6 className="mb-[10px] text-[20px] font-medium">Hours</h6>
                                        <div className="text-center px-[49px] text-[16px]">
                                            <p className='mb-0'>Mon – Sat: 09:00 am — 06:00 pm<br />Sun: close</p>
                                        </div>
                                    </div>
                                    <div className="mb-[50px] flex-[0_0_100%] max-w-full relative w-full min-h px-[15px]">
                                        <div className="mb-[19px]">
                                            <LocationIcon className='w-12 h-12' />
                                        </div>
                                        <h6 className="mb-[10px] text-[20px] font-medium">Location</h6>
                                        <div className="text-center px-[49px] text-[16px]">
                                            <p className='mb-0'>8c wells place SO50 5PP,<br />Eastleigh, UK</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BookingFormSection;