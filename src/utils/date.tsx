export const isDateInPast = (day: number, month: number, year: number) => {
    const today = new Date();
    const dateToCheck = new Date(year, month, day);
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    return dateToCheck < todayDate;
};

export const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1; // Convert Sunday (0) to 6, Monday (1) to 0, etc.
};

export const getPreviousMonthDays = (month: number, year: number) => {
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    return getDaysInMonth(prevMonth, prevYear);
};

export const getCurrentTimeSlot = (timeSlots: string[]) => {
    const now = new Date();
    const minTime = new Date();
    const maxTime = new Date();

    // Set min = 9:00 AM
    minTime.setHours(9, 0, 0, 0);

    // Set max = 5:00 PM (17:00)
    maxTime.setHours(17, 0, 0, 0);

    if (now < minTime || now >= maxTime) {
        return '09:00 AM - 10:00 AM';
    }

    for (const slot of timeSlots) {
        const [startStr, endStr] = slot.split(' - ');

        const start = parseTimeToDate(startStr);
        const end = parseTimeToDate(endStr);

        if (now >= start && now < end) {
            return slot;
        }
    }

    return '09:00 AM - 10:00 AM';
};

const parseTimeToDate = (timeStr: string): Date => {
    const [time, modifier] = timeStr.trim().split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
};

export const parseStartTime = (slot: string): { hours: number, minutes: number } => {
    const [startStr] = slot.split(' - ');
    const [time, modifier] = startStr.trim().split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    return { hours, minutes };
};

export const parseSlotRange = (range: string, baseDate: string): [Date, Date] => {
    const [startStr, endStr] = range.split(" - ");

    const parse = (timeStr: string) =>
        new Date(`${baseDate}T${convertTo24Hour(timeStr)}`);

    return [parse(startStr), parse(endStr)];
}

const convertTo24Hour = (time: string): string => {
    const [hourMin, period] = time.split(" ");
    let [hour, min] = hourMin.split(":").map(Number);
    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;
    return `${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}:00`;
}

export const isSlotOverlapping = (slotStart: Date, slotEnd: Date, bookings: any[]): boolean => {
  return bookings.some(booking => {
    const start = new Date(booking.start);
    const end = new Date(start.getTime() + parseDuration(booking.duration));
    return (
      slotStart < end && slotEnd > start
    );
  });
}

const parseDuration = (durationStr: string): number => {
  const [hours, minutes, seconds] = durationStr.split(":").map(Number);
  return ((hours * 60 + minutes) * 60 + seconds) * 1000;
}