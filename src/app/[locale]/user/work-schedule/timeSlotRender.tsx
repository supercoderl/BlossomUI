import { getEmployeeById } from "@/utils/employee";
import { Button, Card, message, Tag, Typography } from "antd";
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    UserOutlined,
    LoadingOutlined,
    ThunderboltOutlined,
    ClockCircleOutlined,
} from '@ant-design/icons';
import { TechnicianInfo } from "@/types/user";
import { stringToColor } from "@/utils/color";
import { Booking } from "@/types/booking";
import dayjs from "dayjs";

const { Text } = Typography;

export const renderTimeSlot = (
    timeSlot: any,
    bookings: Booking[],
    selectedDate: any,
    openScheduleModal: (timeSlot: string, schedule: Booking | null) => void,
    employees: TechnicianInfo[],
    setBookings: (values: Booking[]) => void,
    loading: Record<string, boolean>
) => {
    const getSchedulesForDateTime = (date: any, timeSlot: string) => {
        const dateStr = date.format('YYYY-MM-DD');
        return bookings.filter(booking =>
            dayjs(booking.scheduleTime).format('YYYY-MM-DD') === dateStr &&
            dayjs(booking.scheduleTime).format('HH:mm') <= timeSlot &&
            dayjs(booking.scheduleTime).add(booking.bookingDetails?.[0].service?.durationMinutes ?? 0, 'minutes').format('HH:mm') >= timeSlot
        );
    };

    const deleteSchedule = (bookingId: string) => {
        setBookings(bookings.filter(b => b.id !== bookingId));
        message.success('Booking deleted successfully');
    };

    const schedulesInSlot = getSchedulesForDateTime(selectedDate, timeSlot.value);

    return (
        <Card
            key={timeSlot.value}
            style={{
                marginBottom: '8px',
                borderRadius: '8px',
                border: schedulesInSlot.length > 0 ? '2px solid #DA0C81' : '1px solid #FFDBAA',
                minHeight: '80px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
            }}
            styles={{
                body: {
                    padding: 12
                }
            }}
            hoverable
            onClick={() => openScheduleModal(timeSlot.value, null)}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                    <Text strong style={{ fontSize: '14px', color: '#DA0C81' }}>
                        {timeSlot.display}
                    </Text>

                    {schedulesInSlot.length > 0 ? (
                        <div style={{ marginTop: '8px' }}>
                            {schedulesInSlot.map((schedule) => {
                                const employee = getEmployeeById(schedule.technicianId ?? "", employees);
                                return (
                                    <div key={schedule.id} style={{ marginBottom: 12 }}>
                                        <Tag
                                            color={stringToColor(employee?.id ?? "")}
                                            style={{
                                                borderRadius: '12px',
                                                padding: '2px 8px',
                                                fontSize: '12px',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '4px'
                                            }}
                                        >
                                            <UserOutlined style={{ fontSize: '10px' }} />
                                            {employee?.fullName ?? "N/A"}
                                        </Tag>
                                        <Tag
                                            color={stringToColor(schedule.guestName ?? "")}
                                            style={{
                                                borderRadius: '12px',
                                                padding: '2px 8px',
                                                fontSize: '12px',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '4px'
                                            }}
                                        >
                                            <ThunderboltOutlined style={{ fontSize: '10px' }} />
                                            {schedule.guestName ?? "N/A"}
                                        </Tag>
                                        <Tag
                                            color={stringToColor(dayjs(schedule.scheduleTime).format('DDTHH:mm:ss'))}
                                            style={{
                                                borderRadius: '12px',
                                                padding: '2px 8px',
                                                fontSize: '12px',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '4px'
                                            }}
                                        >
                                            <ClockCircleOutlined style={{ fontSize: '10px' }} />
                                            {dayjs(schedule.scheduleTime).format('HH:mm')} - {dayjs(schedule.scheduleTime).add(schedule.bookingDetails?.[0].service?.durationMinutes ?? 0, 'minutes').format('HH:mm')}
                                        </Tag>
                                        <div style={{ marginTop: '2px', display: 'flex', gap: '4px' }}>
                                            <Button
                                                size="small"
                                                icon={<EditOutlined />}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openScheduleModal('', schedule);
                                                }}
                                                style={{ fontSize: '10px', height: '20px' }}
                                            />
                                            <Button
                                                size="small"
                                                danger
                                                icon={<DeleteOutlined />}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteSchedule(schedule.id);
                                                }}
                                                style={{ fontSize: '10px', height: '20px' }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div style={{ marginTop: '8px', textAlign: 'center' }}>
                            {loading['get-bookings'] ? <LoadingOutlined style={{ color: '#ccc', fontSize: '16px' }} /> : <PlusOutlined style={{ color: '#ccc', fontSize: '16px' }} />}
                            <Text style={{ color: '#999', fontSize: '12px', display: 'block' }}>
                                Click to add schedule
                            </Text>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
};