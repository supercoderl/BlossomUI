import BasicLoading from "@/components/Loading/basic";
import { Booking } from "@/types/booking";
import { TechnicianInfo } from "@/types/user";
import { stringToColor } from "@/utils/color";
import { getEmployeeById } from "@/utils/employee";
import { Card, Empty, Tag, Typography } from "antd";
import dayjs from "dayjs";

const { Text } = Typography;

const DailySummary = ({ allDaySchedules, employees, loading }: {
    allDaySchedules: Booking[],
    employees: TechnicianInfo[],
    loading: Record<string, boolean>
}) => {
    return (
        <Card
            title="Daily Summary"
            style={{
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                borderRadius: '12px',
                border: 'none'
            }}
        >
            {
                loading['get-bookings'] ?
                    <BasicLoading
                        className="w-1/2 h-1/2 mx-auto"
                    />
                    :
                    allDaySchedules.length > 0 ? (
                        <div>
                            <Text strong>Total Schedules: {allDaySchedules.length}</Text>
                            <div style={{ marginTop: '12px' }}>
                                {allDaySchedules.map(schedule => {
                                    const employee = getEmployeeById(schedule.technicianId ?? "", employees);
                                    return (
                                        <div key={schedule.id} style={{
                                            marginBottom: '8px',
                                            padding: '8px',
                                            borderRadius: '6px',
                                            border: `2px solid ${stringToColor(employee?.id ?? "")}20`
                                        }}>
                                            <Tag color={stringToColor(employee?.id ?? "")} style={{ marginBottom: '4px' }}>
                                                {employee?.fullName}
                                            </Tag>
                                            <Text style={{ fontSize: '12px', display: 'block' }}>
                                                {dayjs(schedule.scheduleTime).format('HH:mm')} - {dayjs(schedule.scheduleTime).add(schedule.bookingDetails?.[0].service?.durationMinutes ?? 0, 'minutes').format('HH:mm')}
                                            </Text>
                                            {schedule && (
                                                <Text style={{ fontSize: '11px', color: '#666', fontStyle: 'italic' }}>
                                                    asdasd
                                                </Text>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <Empty
                            description="No schedules for this day"
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                        />
                    )}
        </Card>
    )
}

export default DailySummary;