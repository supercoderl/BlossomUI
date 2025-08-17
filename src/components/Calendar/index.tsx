import { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date(2025, 7, 17)); // August 2025, day 17
    const [showMonthDropdown, setShowMonthDropdown] = useState(false);

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const getPreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const getNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const selectMonth = (monthIndex: number) => {
        setCurrentDate(new Date(currentDate.getFullYear(), monthIndex, currentDate.getDate()));
        setShowMonthDropdown(false);
    };

    const renderCalendarDays = () => {
        const daysInMonth = getDaysInMonth(currentDate);
        const firstDay = getFirstDayOfMonth(currentDate);
        const days = [];

        // Previous month's days
        const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0);
        const daysInPrevMonth = prevMonth.getDate();

        for (let i = firstDay - 1; i >= 0; i--) {
            days.push(
                <button
                    key={`prev-${daysInPrevMonth - i}`}
                    className="w-10 h-10 flex items-center justify-center text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    {daysInPrevMonth - i}
                </button>
            );
        }

        // Current month's days
        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = day === 17; // Highlighting day 17 as shown in the image
            days.push(
                <button
                    key={`current-${day}`}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-colors ${isToday
                            ? 'bg-blue-500 text-white shadow-md'
                            : 'text-gray-900 hover:bg-gray-100'
                        }`}
                >
                    {day}
                </button>
            );
        }

        // Next month's days
        const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
        const remainingCells = totalCells - (firstDay + daysInMonth);

        for (let day = 1; day <= remainingCells; day++) {
            days.push(
                <button
                    key={`next-${day}`}
                    className="w-10 h-10 flex items-center justify-center text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    {day}
                </button>
            );
        }

        return days;
    };

    return (
        <div className="bg-white rounded-lg max-w-sm mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                <button
                    onClick={getPreviousMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <button
                            onClick={() => setShowMonthDropdown(!showMonthDropdown)}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            <span className="font-medium text-gray-700">
                                {months[currentDate.getMonth()]}
                            </span>
                            <ChevronDown className="w-4 h-4 text-gray-600" />
                        </button>

                        {showMonthDropdown && (
                            <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                                {months.map((month, index) => (
                                    <button
                                        key={month}
                                        onClick={() => selectMonth(index)}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                                    >
                                        {month}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <span className="font-medium text-gray-700 bg-gray-100 px-4 py-2 rounded-lg">
                        {currentDate.getFullYear()}
                    </span>
                </div>

                <button
                    onClick={getNextMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
            </div>

            {/* Days of Week */}
            <div className="grid grid-cols-7">
                {daysOfWeek.map((day) => (
                    <div key={day} className="text-center py-2">
                        <span className="text-sm font-medium text-gray-600">{day}</span>
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7">
                {renderCalendarDays()}
            </div>
        </div>
    );
};

export default Calendar;