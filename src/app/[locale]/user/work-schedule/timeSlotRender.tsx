import { getEmployeeById } from "@/utils/employee";
import { Button, Card, GlobalToken, message, Tag, Typography } from "antd";
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    UserOutlined,
    LoadingOutlined,
} from '@ant-design/icons';
import { TechnicianInfo } from "@/types/user";
import { stringToColor } from "@/utils/color";
import { Schedule } from "@/types/workSchedule";

const { Text } = Typography;

export const renderTimeSlot = (
    timeSlot: any,
    schedules: Schedule[],
    selectedDate: any,
    openScheduleModal: (timeSlot: string, schedule: Schedule | null) => void,
    employees: TechnicianInfo[],
    setSchedules: (values: Schedule[]) => void,
    loading: Record<string, boolean>
) => {
    const getSchedulesForDateTime = (date: any, timeSlot: string) => {
        const dateStr = date.format('YYYY-MM-DD');
        return schedules.filter(schedule =>
            schedule.workDate === dateStr &&
            schedule.startTime <= timeSlot &&
            schedule.endTime > timeSlot
        );
    };

    const deleteSchedule = (scheduleId: any) => {
        setSchedules(schedules.filter(s => s.id !== scheduleId));
        message.success('Schedule deleted successfully');
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
                            {schedulesInSlot.map((schedule, index) => {
                                const employee = getEmployeeById(schedule.technicianId, employees);
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
                                            {employee?.fullName}
                                        </Tag>
                                        <Text style={{ fontSize: '11px', color: '#666', marginLeft: '8px' }}>
                                            {schedule.startTime} - {schedule.endTime}
                                        </Text>
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
                            {loading['get-work-schedules'] ? <LoadingOutlined style={{ color: '#ccc', fontSize: '16px' }} /> : <PlusOutlined style={{ color: '#ccc', fontSize: '16px' }} />}
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