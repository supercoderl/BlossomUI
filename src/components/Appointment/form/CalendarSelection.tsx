import { Dispatch, SetStateAction, useState } from "react";
import {
    DownOutlined,
    LeftOutlined,
    RightOutlined
} from '@ant-design/icons';
import styles from '../index.module.css';
import { cn } from "@/utils/helpers";
import { getDaysInMonth, getFirstDayOfMonth, getPreviousMonthDays, isDateInPast, isSlotOverlapping, parseSlotRange } from "@/utils/date";
import { daysOfWeek, months, timeSlots } from "@/data/date";
import { getAllTimeSlotsForTechnician } from "@/app/[locale]/booking/api";

const CalendarSelection = ({
    currentMonth,
    currentYear,
    selectedDate,
    selectedTime,
    setSelectedDate,
    setSelectedTime,
    setCurrentMonth,
    setCurrentYear,
    employeeId,
    loading
}: {
    currentMonth: number;
    currentYear: number;
    selectedDate: number | null;
    selectedTime: string;
    setSelectedDate: Dispatch<SetStateAction<number | null>>;
    setSelectedTime: Dispatch<SetStateAction<string>>;
    setCurrentMonth: Dispatch<SetStateAction<number>>;
    setCurrentYear: Dispatch<SetStateAction<number>>;
    employeeId?: string | null;
    loading: Record<string, boolean>
}) => {
    const [unavailableSlots, setUnavailableSlots] = useState<any[]>([]);

    const generateCalendarDays = () => {
        const daysInMonth = getDaysInMonth(currentMonth, currentYear);
        const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
        const prevMonthDays = getPreviousMonthDays(currentMonth, currentYear);
        const days = [];

        // Previous month's trailing days
        for (let i = firstDay - 1; i >= 0; i--) {
            days.push({
                day: prevMonthDays - i,
                isCurrentMonth: false,
                isPrevMonth: true
            });
        }

        // Current month's days
        for (let day = 1; day <= daysInMonth; day++) {
            days.push({
                day,
                isCurrentMonth: true,
                isPrevMonth: false
            });
        }

        // Next month's leading days
        const totalCells = Math.ceil(days.length / 7) * 7;
        for (let day = 1; days.length < totalCells; day++) {
            days.push({
                day,
                isCurrentMonth: false,
                isPrevMonth: false
            });
        }

        return days;
    };

    const handleDateClick = async (day: number, isCurrentMonth: boolean) => {
        if (isCurrentMonth) {
            setSelectedDate(day);
            setSelectedTime('');
            if (employeeId) {
                await disableSomeDatesAreInCalendar(day);
            }
        }
    };

    const disableSomeDatesAreInCalendar = async (day: number) => {
        // This function can be used to disable specific dates based on your logic
        // For example, you can fetch unavailable dates from an API and set them in state
        // Here we just return true for demonstration purposes
        const timeSlots = await getAllTimeSlotsForTechnician(employeeId ?? "", `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
        if (timeSlots.data.length === 0) {
            setUnavailableSlots([]);
            return false;
        }

        setUnavailableSlots(timeSlots.data);
        return true;
    }

    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
        setSelectedDate(null);
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
        setSelectedDate(null);
    };

    const calendarDays = generateCalendarDays();

    return (
        <div className="max-w-md mx-auto bg-white">
            {/* Month/Year Header */}
            <div className={
                cn(
                    "flex items-center justify-between mb-6",
                    styles.slideUp
                )
            } style={{ animationDelay: '0ms' }}>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <select
                            value={currentMonth}
                            onChange={(e) => {
                                setCurrentMonth(parseInt(e.target.value));
                                setSelectedDate(null);
                            }}
                            className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {months.map((month, index) => (
                                <option key={index} value={index}>{month}</option>
                            ))}
                        </select>
                        <DownOutlined className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>

                    <div className="relative">
                        <select
                            value={currentYear}
                            onChange={(e) => {
                                setCurrentYear(parseInt(e.target.value));
                                setSelectedDate(null);
                            }}
                            className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {Array.from({ length: 10 }, (_, i) => currentYear - 5 + i).map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                        <DownOutlined className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <button
                        onClick={handlePrevMonth}
                        type="button"
                        className="p-2 hover:bg-gray-100 rounded-md"
                    >
                        <LeftOutlined className="w-4 h-4" />
                    </button>
                    <button
                        onClick={handleNextMonth}
                        type="button"
                        className="p-2 hover:bg-gray-100 rounded-md"
                    >
                        <RightOutlined className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Days of Week Header */}
            <div className={
                cn(
                    "grid grid-cols-7 gap-1 mb-2",
                    styles.slideUp
                )
            } style={{ animationDelay: '70ms' }}>
                {daysOfWeek.map(day => (
                    <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className={
                cn(
                    "grid grid-cols-7 gap-1 mb-6",
                    styles.slideUp
                )
            } style={{ animationDelay: '70ms' }}>
                {calendarDays.map((dateObj, index) => {
                    const isSelected = selectedDate === dateObj.day && dateObj.isCurrentMonth;
                    const isToday = dateObj.day === new Date().getDate() && dateObj.isCurrentMonth && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear();

                    // Check if the date is in the past
                    const isPastDate = dateObj.isCurrentMonth && isDateInPast(dateObj.day, currentMonth, currentYear);
                    const isDisabled = isPastDate || !dateObj.isCurrentMonth;

                    return (
                        <button
                            key={index}
                            onClick={() => {
                                if (isDisabled) return; // Prevent action for disabled dates

                                if (selectedDate === dateObj.day) {
                                    setSelectedDate(null);
                                } else {
                                    handleDateClick(dateObj.day, dateObj.isCurrentMonth);
                                }
                            }}
                            disabled={isDisabled}
                            className={`
                                h-10 w-10 text-sm rounded-md transition-colors
                                ${dateObj.isCurrentMonth ? 'text-gray-900' : 'text-gray-300'}
                                ${isPastDate ? 'text-gray-400 cursor-not-allowed opacity-50' : ''}
                                ${isSelected ? 'bg-gray-800 text-white' : ''}
                                ${isToday && !isSelected ? 'bg-gray-200' : ''}
                                ${dateObj.isCurrentMonth && !isPastDate ? 'hover:bg-gray-100' : ''}
                                ${isSelected ? 'hover:bg-gray-700' : ''}
                                ${isDisabled ? 'hover:bg-transparent' : ''}
                            `}
                            type="button"
                        >
                            {dateObj.day}
                        </button>
                    );
                })}
            </div>

            {/* Time Selection */}
            {selectedDate && (
                <div className="border-t pt-4">
                    <div className="text-sm text-gray-600 mb-4">
                        {months[currentMonth]} {selectedDate}, {currentYear} - 9:00 AM
                    </div>

                    {
                        loading['get-time-slots'] ?
                            <div className="flex items-center justify-center h-20">
                                <div className="animate-spin h-10 w-10 rounded-full border-4 border-t-transparent"></div>
                            </div>
                            :
                            <div className="max-h-full grid grid-cols-2 gap-y-2 gap-x-3">
                                {timeSlots.map((timeSlot, index) => {
                                    const [slotStart, slotEnd] = parseSlotRange(timeSlot, `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`);
                                    const isDisabled = isSlotOverlapping(slotStart, slotEnd, unavailableSlots);

                                    return (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                if (isDisabled) return;
                                                setSelectedTime(timeSlot)
                                            }}
                                            className={
                                                cn(
                                                    "w-full p-[4px] md:p-3 text-[12px] md:text-sm rounded-md border transition-colors",
                                                    selectedTime === timeSlot ? 'bg-black text-white border-black' : 'text-gray-700 border-gray-300 hover:bg-gray-200',
                                                    styles.slideUp,
                                                    isDisabled ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : ''
                                                )}
                                            style={{ animationDelay: `${70 * index + Math.floor(Math.random() * 30)}ms` }}
                                            type="button"
                                            disabled={isDisabled}
                                        >
                                            {timeSlot}
                                        </button>
                                    )
                                })}
                            </div>
                    }
                </div>
            )}
        </div>
    );
}

export default CalendarSelection;