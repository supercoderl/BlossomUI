import { Button, Card, List, Popconfirm, Tag, Typography } from "antd"
import {
    EditOutlined,
    DeleteOutlined,
    ClockCircleOutlined,
    CalendarOutlined
} from '@ant-design/icons';
import { getEmployeeName, getShiftColor } from "@/utils/employee";
import { stringToColor } from "@/utils/color";

const { Title } = Typography;

const ScheduleSelection = ({ selectedDate, selectedDateSchedules, employees, openScheduleModal, deleteSchedule }: {
    selectedDate: any,
    selectedDateSchedules: any[],
    employees: any[],
    openScheduleModal: (schedule: any) => void,
    deleteSchedule: (id: any) => void
}) => {
    return (
        <Card
            style={{
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                borderRadius: '12px',
                border: 'none'
            }}
        >
            <Title level={4} style={{ color: '#1890ff', marginBottom: '16px', marginTop: 0 }}>
                <ClockCircleOutlined /> {selectedDate.format('MMMM D, YYYY')}
            </Title>
            {selectedDateSchedules.length > 0 ? (
                <List
                    size="small"
                    dataSource={selectedDateSchedules}
                    renderItem={(schedule) => (
                        <List.Item
                            style={{
                                padding: '12px',
                                marginBottom: '8px',
                                background: `linear-gradient(135deg, ${stringToColor(schedule.employeeId)}08, ${getShiftColor(schedule.shift)}08)`,
                                borderRadius: '8px',
                                border: `1px solid ${stringToColor(schedule.employeeId)}20`
                            }}
                            actions={[
                                <Button
                                    type="text"
                                    icon={<EditOutlined />}
                                    onClick={() => openScheduleModal(schedule)}
                                    style={{ color: '#1890ff' }}
                                    key="edit"
                                />,
                                <Popconfirm
                                    title="Delete this schedule?"
                                    onConfirm={() => deleteSchedule(schedule.id)}
                                    okText="Yes"
                                    cancelText="No"
                                    key="delete"
                                >
                                    <Button type="text" icon={<DeleteOutlined />} danger />
                                </Popconfirm>
                            ]}
                        >
                            <List.Item.Meta
                                title={
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div
                                            style={{
                                                width: '12px',
                                                height: '12px',
                                                borderRadius: '50%',
                                                backgroundColor: stringToColor(schedule.employeeId),
                                                boxShadow: `0 0 0 2px ${stringToColor(schedule.employeeId)}20`
                                            }}
                                        />
                                        <span style={{ fontWeight: '600', color: '#262626' }}>
                                            {getEmployeeName(schedule.employeeId, employees)}
                                        </span>
                                    </div>
                                }
                                description={
                                    <div style={{ marginTop: '4px' }}>
                                        <div style={{
                                            fontSize: '13px',
                                            fontWeight: '500',
                                            color: '#595959',
                                            marginBottom: '4px'
                                        }}>
                                            🕐 {schedule.startTime} - {schedule.endTime}
                                        </div>
                                        <Tag
                                            color={getShiftColor(schedule.shift)}
                                            style={{ borderRadius: '12px', fontSize: '11px' }}
                                        >
                                            {schedule.shift}
                                        </Tag>
                                        {schedule.notes && (
                                            <div style={{
                                                marginTop: '4px',
                                                fontSize: '12px',
                                                color: '#8c8c8c',
                                                fontStyle: 'italic'
                                            }}>
                                                💬 {schedule.notes}
                                            </div>
                                        )}
                                    </div>
                                }
                            />
                        </List.Item>
                    )}
                />
            ) : (
                <div style={{
                    textAlign: 'center',
                    padding: '40px 20px',
                    color: '#bfbfbf',
                    fontSize: '14px'
                }}>
                    <CalendarOutlined style={{ fontSize: '32px', marginBottom: '8px', display: 'block' }} />
                    No schedules for this date
                </div>
            )}
        </Card>
    )
}

export default ScheduleSelection;