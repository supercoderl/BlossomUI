import { BookingStatus } from '@/enums/bookingStatus';

export interface BusinessData {
    revenue: {
        currentTotalRevenue: number,
        previousTotalRevenue: number,
        currentTransactionCount: number,
        previousTransactionCount: number,
        avgTransactionDifference: number,
        revenuePercentageChange: number,
        revenueTrend: string
    };
    bookings: {
        currentPeriodBookings: number,
        previousPeriodBookings: number,
        bookingsDifference: number,
        percentageChange: number,
        trend: string
    };
    totalCustomers: number;
    averageServiceValue: number;
    conversionRate: number;
    customerRetentionRate: {
        previousCustomers: number,
        returningCustomers: number,
        customerRetentionRate: number
    };
    categories: {
        categoryId: string,
        categoryIsActive: boolean,
        categoryName: string,
        serviceCount: number,
        serviceOptionCount: number
    }[];
    technicians: {
        id: string,
        userId: string,
        fullname: string,
        avatarUrl: string,
        yearsOfExperience: number
    }[];
    services: {
        serviceName: string,
        price: number,
        durationMinutes: number,
        bookingCount: number,
        totalRevenue: number,
        averageRating: number,
        serviceType: string,
        sourceId: string,
        reviewCount: number,
        averageRevenuePerBooking: number,
        previousBookingCount: number,
        previousTotalRevenue: number,
        previousAverageRating: number,
        bookingCountChangePercent: number,
        revenueChangePercent: number,
        ratingChangePoints: number,
        bookingCountChange: number,
        revenueChange: number,
        trendStatus: string
    }[],
    schedules: {
        id: string;
        customerName: string;
        customerPhone: string;
        technicianName: string;
        startTime: string;
        endTime: string;
        durationMinutes: number;
        status: BookingStatus;
        note?: string | null;
    }[]
}