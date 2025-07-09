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
import { createBooking } from '../booking/api';
import { Button } from 'antd';
import { Service, ServiceOption } from '@/types/service';
import { TechnicianInfo } from '@/types/user';
import { parseStartTime } from '@/utils/date';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { NextFontWithVariable } from 'next/dist/compiled/@next/font';

const BookingFormSection = ({ loading, router, font }: { loading: Record<string, boolean>, router: AppRouterInstance, font: NextFontWithVariable }) => {
    const [messageApi] = useGlobalMessage();
    const [selectedService, setSelectedService] = useState<(Service & { type: 'service' }) | (ServiceOption & { type: 'option' }) | null>(null);
    const [selectedEmployee, setSelectedEmployee] = useState<TechnicianInfo | null>(null);
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // June (0-indexed)
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear()); // Current year
    const [state, setState] = useState(1);
    const [information, setInformation] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    })
    const [isSubmit, setIsSubmit] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const onSubmit = async () => {
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
                if (!selectedTime || selectedTime === "") {
                    messageApi.warning("Please select time!");
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
                const { hours, minutes } = parseStartTime(selectedTime);
                const dateStr = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${selectedDate?.toString().padStart(2, '0')}`;
                const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
                
                await createBooking({
                    customerId: null,
                    technicianId: selectedEmployee?.id,
                    scheduleTime: `${dateStr}T${timeStr}`,
                    serviceId: selectedService?.type === "service" ? selectedService?.id : null,
                    serviceOptionId: selectedService?.type === "option" ? selectedService?.serviceOptionId : null,
                    quantity: 1,
                    price: selectedService?.type === "service" ? (selectedService?.price ?? 0) : selectedService?.type === "option" ? selectedService?.priceFrom : 0,
                    note: null,
                    guestName: information.firstName + " " + information.lastName,
                    guestPhone: information.phone,
                    guestEmail: information.email
                }).then((res: any) => {
                    if (res && res.success) {
                        messageApi.success('Booking created successfully');
                        setIsSubmit(true);
                    }
                })
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
                                                            <LeftContentSubmit
                                                                isCollapsed={isCollapsed}
                                                            />
                                                            :
                                                            <LeftContent
                                                                state={state}
                                                                selectedService={selectedService}
                                                                selectedEmployee={selectedEmployee}
                                                                selectedDate={selectedDate}
                                                                information={information
                                                                }
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
                                                            <RightContentSubmit
                                                                selectedDate={selectedDate}
                                                                selectedTime={selectedTime}
                                                                selectedService={selectedService}
                                                                selectedEmployee={selectedEmployee}
                                                                currentMonth={currentMonth}
                                                                currentYear={currentYear}
                                                                information={information}
                                                            />
                                                            :
                                                            <RightContent
                                                                state={state}
                                                                setState={setState}
                                                                selectedService={selectedService}
                                                                selectedEmployee={selectedEmployee}
                                                                selectedDate={selectedDate}
                                                                selectedTime={selectedTime}
                                                                information={information}
                                                                currentMonth={currentMonth}
                                                                currentYear={currentYear}
                                                                setSelectedService={setSelectedService}
                                                                setSelectedEmployee={setSelectedEmployee}
                                                                setSelectedDate={setSelectedDate}
                                                                setSelectedTime={setSelectedTime}
                                                                setCurrentMonth={setCurrentMonth}
                                                                setCurrentYear={setCurrentYear}
                                                                setInformation={setInformation}
                                                                messageApi={messageApi}
                                                                loading={loading}
                                                            />
                                                    }
                                                    <div className="flex items-center justify-end w-full py-2.5 px-8 bg-transparent shadow-[0_-2px_3px_rgba(26,_44,_55,_0.15)]">
                                                        <Button
                                                            className="!bg-black text-white transition-all duration-300 ease-in-out cursor-pointer"
                                                            onClick={() => {
                                                                if (isSubmit) {
                                                                    router.replace("/");
                                                                } else {
                                                                    onSubmit();
                                                                }
                                                            }}
                                                            loading={loading["create-booking"]}
                                                            disabled={loading["create-booking"]}
                                                            size="large"
                                                            type="primary"
                                                        >
                                                            <span>{isSubmit ? 'Back to home' : 'Continue'}</span>
                                                        </Button>
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
                <div className={
                    cn(
                        "w-full md:w-1/3 mt-24 md:m-0 relative min-h flex",
                        font.className
                    )
                }>
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
                                            <p className='mb-0 text-[16px] font-[300] tracking-[0.02em] leading-[26px]'>T: +44 23 8061 3526<br />blossom_nails2018@outlook.com</p>
                                        </div>
                                    </div>
                                    <div className="mb-[50px] flex-[0_0_100%] max-w-full relative w-full min-h px-[15px]">
                                        <div className="mb-[19px]">
                                            <ClockIcon className='w-12 h-12' />
                                        </div>
                                        <h6 className="mb-[10px] text-[20px] font-medium">Hours</h6>
                                        <div className="text-center px-[49px] text-[16px]">
                                            <p className='mb-0 text-[16px] font-[300] tracking-[0.02em] leading-[26px]'>Mon – Sat: 09:00 am — 06:00 pm<br />Sun: close</p>
                                        </div>
                                    </div>
                                    <div className="mb-[50px] flex-[0_0_100%] max-w-full relative w-full min-h px-[15px]">
                                        <div className="mb-[19px]">
                                            <LocationIcon className='w-12 h-12' />
                                        </div>
                                        <h6 className="mb-[10px] text-[20px] font-medium">Location</h6>
                                        <div className="text-center px-[49px] text-[16px]">
                                            <p className='mb-0 text-[16px] font-[300] tracking-[0.02em] leading-[26px]'>8c wells place SO50 5PP,<br />Eastleigh, UK</p>
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