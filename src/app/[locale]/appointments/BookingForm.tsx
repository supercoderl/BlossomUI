import {
    CalendarOutlined,
    CreditCardOutlined,
    LeftCircleOutlined,
    LeftOutlined,
    ShoppingOutlined,
    UserOutlined
} from '@ant-design/icons';
import styles from './index.module.css';
import { cn } from '@/utils/helpers';
import ServiceSelection from '@/components/Appointment/form/ServiceSelection';
import { SetStateAction, useState } from 'react';
import { useGlobalMessage } from '@/providers/messageProvider';
import CalendarSelection from '@/components/Appointment/form/CalendarSelection';

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

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

const BookingFormSection = () => {
    const [messageApi] = useGlobalMessage();
    const [selectedService, setSelectedService] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('9:00 AM - 10:00 AM');
    const [currentMonth, setCurrentMonth] = useState(5); // June (0-indexed)
    const [currentYear, setCurrentYear] = useState(2025);
    const [state, setState] = useState(1);

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
                break;
        }
    }

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
                        <span className="text-[18px] font-medium text-[#33434C] m-0 whitespace-nowrap">Service Selection</span>
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
        <section className="mt-[100px] mb-[70px] relative">
            <div className="max-w-[1170px] flex relative mx-auto">
                <div className="w-2/3 relative min-h flex">
                    <div className="px-[15px] flex relative flex-wrap w-full content-start">
                        <div className="w-full relative">
                            <div className="">
                                <div className="">
                                    <div className="bg-transparent">
                                        <div className='flex justify-center w-full max-w-[760px] rounded-[8px] shadow-[0_30px_40px_#0000001f] transition-max-width duration-300 ease-in-out'>
                                            <div className="w-[240px] pb-[16px] flex-[0_0_auto] relative flex flex-col justify-between text-[16px] bg-[rgba(246,_235,_231,_1)] text-black py-4 pr-2 pl-4 transition-width duration-300 ease-in-out">
                                                <div className="pr-2 overflow-x-hidden max-w-md">
                                                    <div className={
                                                        cn(
                                                            "bg-black/5 rounded p-2 mb-2",
                                                            styles.slideRight
                                                        )
                                                    }
                                                        style={{ animationDelay: '0ms' }}>
                                                        <div className="flex items-center justify-between">
                                                            <div className="relative w-6 h-5 text-2xl">
                                                                <ShoppingOutlined className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" size={20} />
                                                            </div>
                                                            <p className="font-medium mb-0 ml-1.5 text-sm">Service Selection</p>
                                                            <div className="flex items-center justify-center w-6 h-6 bg-orange-100 rounded-full border-4 border-black transition-all duration-300 ease-in-out ml-auto">
                                                            </div>
                                                        </div>
                                                        {selectedService && (
                                                            <span className={
                                                                cn(
                                                                    'block overflow-hidden',
                                                                    styles.slideRight
                                                                )
                                                            } style={{ animationDelay: '210ms', animationDuration: '0.7s' }}>
                                                                <p className={
                                                                    cn(
                                                                        'text-[12px] py-[4px] m-0 whitespace-pre',
                                                                        selectedEmployee ? 'border-b border-dashed border-[rgba(0,_0,_0,_0.1)]' : ''
                                                                    )
                                                                }>
                                                                    <span>{selectedService}</span>
                                                                </p>
                                                            </span>
                                                        )}
                                                        {
                                                            selectedEmployee && (
                                                                <span className={
                                                                    cn(
                                                                        'block overflow-hidden',
                                                                        styles.slideRight
                                                                    )
                                                                } style={{ animationDelay: '210ms', animationDuration: '0.7s' }}>
                                                                    <p className={
                                                                        cn(
                                                                            'text-[12px] pb-[4px] m-0 whitespace-pre',
                                                                        )
                                                                    }>
                                                                        <span>{selectedEmployee}</span>
                                                                    </p>
                                                                </span>
                                                            )
                                                        }
                                                    </div>

                                                    <div className={
                                                        cn(
                                                            "bg-black/5 rounded p-2 mb-2",
                                                            styles.slideRight
                                                        )
                                                    }
                                                        style={{ animationDelay: '70ms' }}>
                                                        <div className="flex items-center justify-between">
                                                            <div className="relative w-6 h-5 text-2xl">
                                                                <CalendarOutlined className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" size={20} />
                                                            </div>
                                                            <p className="font-medium mb-0 ml-1.5 text-sm">Date & Time</p>
                                                            <div className="flex items-center justify-center w-6 h-6 bg-orange-100 rounded-full border border-black/10 transition-all duration-300 ease-in-out ml-auto">
                                                            </div>
                                                        </div>
                                                        {selectedDate && (
                                                            <span className={
                                                                cn(
                                                                    'block overflow-hidden',
                                                                    styles.slideRight
                                                                )
                                                            } style={{ animationDelay: '210ms', animationDuration: '0.7s' }}>
                                                                <p className={
                                                                    cn(
                                                                        'text-[12px] py-[4px] m-0 whitespace-pre',
                                                                        selectedDate ? 'border-b border-dashed border-[rgba(0,_0,_0,_0.1)]' : ''
                                                                    )
                                                                }>
                                                                    <span>{months[currentMonth]} {selectedDate}, {currentYear} - {selectedTime.split(" - ")[0]}</span>
                                                                </p>
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div className={
                                                        cn(
                                                            "bg-black/5 rounded p-2 mb-2",
                                                            styles.slideRight
                                                        )
                                                    }
                                                        style={{ animationDelay: '140ms' }}>
                                                        <div className="flex items-center justify-between">
                                                            <div className="relative w-6 h-5 text-2xl">
                                                                <UserOutlined className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" size={20} />
                                                            </div>
                                                            <p className="font-medium mb-0 ml-1.5 text-sm">Your Information</p>
                                                            <div className="flex items-center justify-center w-6 h-6 bg-orange-100 rounded-full border border-black/10 transition-all duration-300 ease-in-out ml-auto">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className={
                                                        cn(
                                                            "bg-black/5 rounded p-2 mb-2",
                                                            styles.slideRight
                                                        )
                                                    }
                                                        style={{ animationDelay: '210ms' }}>
                                                        <div className="flex items-center justify-between">
                                                            <div className="relative w-6 h-5 text-2xl">
                                                                <CreditCardOutlined className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" size={20} />
                                                            </div>
                                                            <p className="font-medium mb-0 ml-1.5 text-sm">Payments</p>
                                                            <div className="flex items-center justify-center w-6 h-6 bg-orange-100 rounded-full border border-black/10 transition-all duration-300 ease-in-out ml-auto">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="absolute bottom-4 left-4 w-[calc(100%-32px)]">
                                                        <div className="flex items-center justify-between border-t border-black/10 pt-3 cursor-pointer">
                                                            <span className="text-base font-medium">Collapse menu</span>
                                                            <LeftCircleOutlined className="text-2xl bg-black rounded-full !text-white" size={24} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="max-w-[520px] w-full bg-white overflow-hidden">
                                                <div className="overflow-hidden relative h-full">
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
                <div className="w-1/3 relative min-h flex">
                    <div className="pt-[10px] flex relative flex-wrap content-start">
                        <div className="w-full relative">
                            <div className="">
                                <div className="flex-col flex flex-wrap text-center">
                                    <div className="mb-[50px] flex-[0_0_100%] max-w-full relative w-full min-h px-[15px]">
                                        <div className="mb-[19px]">
                                            <svg className='mx-auto' xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none"><rect x="11.5" y="2.5" width="24" height="43" rx="1.5" fill="#F6EBE7" stroke="black"></rect><rect x="20" y="7" width="7" height="1" fill="black"></rect><circle cx="23.5" cy="39.5" r="1.5" fill="black"></circle></svg>
                                        </div>
                                        <h6 className="mb-[10px] text-[20px] font-medium">Contact</h6>
                                        <div className="text-center px-[49px] text-[16px]">
                                            <p className='mb-0'>T: 070 9485 7568<br />info@beautysalon.com</p>
                                        </div>
                                    </div>
                                    <div className="mb-[50px] flex-[0_0_100%] max-w-full relative w-full min-h px-[15px]">
                                        <div className="mb-[19px]">
                                            <svg className='mx-auto' xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24.5" cy="24.5" r="19" fill="#F6EBE7" stroke="black"></circle><path d="M24 12.5V25.5L30 31.5" stroke="black"></path></svg>
                                        </div>
                                        <h6 className="mb-[10px] text-[20px] font-medium">Hours</h6>
                                        <div className="text-center px-[49px] text-[16px]">
                                            <p className='mb-0'>Mon – Fri: 8 am — 8 pm<br />Sat: 9 am — 6 pm<br />Sun: 9 am — 4 pm</p>
                                        </div>
                                    </div>
                                    <div className="mb-[50px] flex-[0_0_100%] max-w-full relative w-full min-h px-[15px]">
                                        <div className="mb-[19px]">
                                            <svg className='mx-auto' xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M39.5 18.5C39.5 22.9086 37.6893 26.8697 34.714 31.1637C32.7635 33.9788 30.3434 36.8965 27.6388 40.1573C26.3183 41.7493 24.93 43.4232 23.4953 45.2068C22.2962 43.7506 21.1349 42.3668 20.022 41.0407C16.9832 37.4197 14.3051 34.2285 12.2027 31.1656C9.2574 26.8745 7.5 22.9121 7.5 18.5C7.5 9.66344 14.6634 2.5 23.5 2.5C32.3366 2.5 39.5 9.66344 39.5 18.5Z" fill="#F6EBE7" stroke="black"></path><circle cx="23.5" cy="17.5" r="6" fill="white" stroke="black"></circle></svg>
                                        </div>
                                        <h6 className="mb-[10px] text-[20px] font-medium">Location</h6>
                                        <div className="text-center px-[49px] text-[16px]">
                                            <p className='mb-0'>85 Royal Mint Street,<br />London, E1 8LG, UK</p>
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