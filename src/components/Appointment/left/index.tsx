import { cn } from '@/utils/helpers';
import {
    CalendarOutlined,
    CheckOutlined,
    CreditCardOutlined,
    ShoppingOutlined,
    UserOutlined
} from '@ant-design/icons';
import styles from '../index.module.css';

const LeftContent = ({
    state,
    selectedService,
    selectedEmployee,
    selectedDate,
    information,
    months,
    currentMonth,
    currentYear,
    selectedTime,
    isCollapsed
}: {
    state: number,
    selectedService: string,
    selectedEmployee: string,
    selectedDate: any,
    information: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
    },
    months: string[],
    currentMonth: number,
    currentYear: number,
    selectedTime: string,
    isCollapsed: boolean
}) => {
    return (
        <>
            <div className={
                cn(
                    "bg-black/5 rounded p-2 mb-2",
                    styles.slideRight
                )
            }
                style={{ animationDelay: '0ms' }}>
                <div className="flex items-center justify-between relative">
                    <div className="relative w-6 h-5 text-2xl">
                        <ShoppingOutlined className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" size={20} />
                    </div>
                    {!isCollapsed && <p className="font-medium mb-0 ml-1.5 text-sm">Service Selection</p>}
                    <div className={
                        cn(
                            "flex items-center justify-center w-6 h-6 bg-orange-100 rounded-full transition-all duration-300 ease-in-out ml-auto",
                            state === 1 ? "border-4 border-black" : "border-1 border-[rgba(0,_0,_0,_0.1)]",
                            isCollapsed && "absolute w-[16px] h-[16px] -bottom-[12px] -right-[12px] border-2"
                        )
                    }>
                        {selectedService && (<CheckOutlined className={
                            cn(
                                'absolute p-[4px] rounded-full bg-[#019719] !text-[rgba(246,_235,_231,_1)]',
                                isCollapsed ? "w-[14px] h-[14px] text-[20px]" : "w-[18px] h-[18px] text-[24px]"
                            )
                        } />)}
                    </div>
                </div>
                {selectedService && !isCollapsed && (
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
                    selectedEmployee && !isCollapsed && (
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
                    {!isCollapsed && <p className="font-medium mb-0 ml-1.5 text-sm">Date & Time</p>}
                    <div className={
                        cn(
                            "flex items-center justify-center w-6 h-6 bg-orange-100 rounded-full transition-all duration-300 ease-in-out ml-auto",
                            state === 2 ? "border-4 border-black" : "border-1 border-[rgba(0,_0,_0,_0.1)]",
                            isCollapsed && "absolute w-[16px] h-[16px] -bottom-[4px] -right-[4px] border-2"
                        )
                    }>
                        {selectedDate && (<CheckOutlined className={
                            cn(
                                'absolute p-[4px] rounded-full bg-[#019719] !text-[rgba(246,_235,_231,_1)]',
                                isCollapsed ? "w-[14px] h-[14px] text-[20px]" : "w-[18px] h-[18px] text-[24px]"
                            )
                        } />)}
                    </div>
                </div>
                {selectedDate && !isCollapsed && (
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
                    {!isCollapsed && <p className="font-medium mb-0 ml-1.5 text-sm">Your Information</p>}
                    <div className={
                        cn(
                            "flex items-center justify-center w-6 h-6 bg-orange-100 rounded-full transition-all duration-300 ease-in-out ml-auto",
                            state === 3 ? "border-4 border-black" : "border-1 border-[rgba(0,_0,_0,_0.1)]",
                            isCollapsed && "absolute w-[16px] h-[16px] -bottom-[4px] -right-[4px] border-2"
                        )
                    }>
                        {information.firstName && information.lastName && (<CheckOutlined className={
                            cn(
                                'absolute p-[4px] rounded-full bg-[#019719] !text-[rgba(246,_235,_231,_1)]',
                                isCollapsed ? "w-[14px] h-[14px] text-[20px]" : "w-[18px] h-[18px] text-[24px]"
                            )
                        } />)}
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
                    {!isCollapsed && <p className="font-medium mb-0 ml-1.5 text-sm">Payments</p>}
                    <div className={
                        cn(
                            "flex items-center justify-center w-6 h-6 bg-orange-100 rounded-full transition-all duration-300 ease-in-out ml-auto",
                            state === 4 ? "border-4 border-black" : "border-1 border-[rgba(0,_0,_0,_0.1)]",
                            isCollapsed && "absolute w-[16px] h-[16px] -bottom-[4px] -right-[4px] border-2"
                        )
                    }>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LeftContent;