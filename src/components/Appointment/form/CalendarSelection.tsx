import { Dispatch, SetStateAction, useState } from "react";
import {
    DownOutlined,
    LeftOutlined,
    RightOutlined
} from '@ant-design/icons';
import styles from '../index.module.css';
import { cn } from "@/utils/helpers";

const CalendarSelection = ({
    currentMonth,
    currentYear,
    selectedDate,
    selectedTime,
    setSelectedDate,
    setSelectedTime,
    setCurrentMonth,
    setCurrentYear,
    months,
    daysOfWeek,
    timeSlots
} : {
    currentMonth: number;
    currentYear: number;
    selectedDate: any;
    selectedTime: string;
    setSelectedDate: Dispatch<SetStateAction<any>>;
    setSelectedTime: Dispatch<SetStateAction<string>>;
    setCurrentMonth: Dispatch<SetStateAction<number>>;
    setCurrentYear: Dispatch<SetStateAction<number>>;
    months: string[];
    daysOfWeek: string[];
    timeSlots: string[];
}) => {
    const getDaysInMonth = (month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (month: number, year: number) => {
        const firstDay = new Date(year, month, 1).getDay();
        return firstDay === 0 ? 6 : firstDay - 1; // Convert Sunday (0) to 6, Monday (1) to 0, etc.
    };

    const getPreviousMonthDays = (month: number, year: number) => {
        const prevMonth = month === 0 ? 11 : month - 1;
        const prevYear = month === 0 ? year - 1 : year;
        return getDaysInMonth(prevMonth, prevYear);
    };

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

    const handleDateClick = (day: any, isCurrentMonth: boolean) => {
        if (isCurrentMonth) {
            setSelectedDate(day);
        }
    };

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
                        className="p-2 hover:bg-gray-100 rounded-md"
                    >
                        <LeftOutlined className="w-4 h-4" />
                    </button>
                    <button
                        onClick={handleNextMonth}
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
                    const isToday = dateObj.day === 17 && dateObj.isCurrentMonth && currentMonth === 5 && currentYear === 2025; // June 17, 2025

                    return (
                        <button
                            key={index}
                            onClick={() => {
                                if (selectedDate === dateObj.day) {
                                    setSelectedDate(null);
                                }
                                else {
                                    handleDateClick(dateObj.day, dateObj.isCurrentMonth);
                                }
                            }}
                            className={`
                h-10 w-10 text-sm rounded-md transition-colors
                ${dateObj.isCurrentMonth ? 'text-gray-900' : 'text-gray-300'}
                ${isSelected ? 'bg-gray-800 text-white' : ''}
                ${isToday && !isSelected ? 'bg-gray-200' : ''}
                ${dateObj.isCurrentMonth ? 'hover:bg-gray-100' : ''}
                ${isSelected ? 'hover:bg-gray-700' : ''}
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

                    <div className="max-h-81 grid grid-cols-2 gap-y-2 gap-x-3">
                        {timeSlots.map((timeSlot, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedTime(timeSlot)}
                                className={
                                    cn(
                                        "w-full p-3 text-sm rounded-md border transition-colors",
                                        selectedTime === timeSlot ? 'bg-black text-white border-black' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200',
                                        styles.slideUp
                                    )}
                                style={{ animationDelay: `${70 * index + Math.floor(Math.random() * 30)}ms` }}
                                type="button"
                            >
                                {timeSlot}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CalendarSelection;