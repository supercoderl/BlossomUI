'use client'

import React, { useEffect, useState } from 'react';
import {
    Button,
    Form,
    Card,
    Typography,
    DatePicker,
    theme
} from 'antd';
import {
    PlusOutlined,
    ClockCircleOutlined,
    ReloadOutlined,
} from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import Layout from '@/components/Layout';
import { Schedule } from '@/types/workSchedule';
import EmployeeManagement from './Employee';
import CreateScheduleForm from './CreateForm';
import { renderTimeSlot } from './timeSlotRender';
import { createWorkSchedule, getTechnicians, getWorkSchedules } from '../api';
import { useApiLoadingStore } from '@/stores/loadingStore';
import DailySummary from './DailySummary';
import { TechnicianInfo } from '@/types/user';
import { useGlobalMessage } from '@/providers/messageProvider';

const { Title, Text } = Typography;

const DailyScheduleSystem = () => {
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [employees, setEmployees] = useState<TechnicianInfo[]>([]);
    const [pageQuery, setPageQuery] = useState({ page: 1, pageSize: 5 });
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
    const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
    const [form] = Form.useForm();
    const { loading } = useApiLoadingStore();
    const [messageApi] = useGlobalMessage();
    const { token } = theme.useToken();

    const onLoad = async () => {
        const [technicianRes, workScheduleRes] = await Promise.all([
            getTechnicians({
                query: { ...pageQuery },
                searchTerm: '',
                includeDeleted: false
            }),
            getWorkSchedules({
                query: { ...pageQuery },
                searchTerm: '',
                includeDeleted: false
            })
        ]);

        const technicians = technicianRes?.data?.items || [];
        const workSchedules = workScheduleRes?.data?.items || [];

        if (technicians.length > 0) {
            setEmployees(technicians);
        }

        if (workSchedules.length > 0) {
            setSchedules(workSchedules);
        }
    }

    useEffect(() => {
        onLoad();
    }, []);

    // Generate time slots from 6 AM to 5 PM
    const generateTimeSlots = () => {
        const slots = [];
        for (let hour = 6; hour <= 17; hour++) {
            const timeStr = `${hour.toString().padStart(2, '0')}:00`;
            const displayTime = hour === 12 ? '12:00 PM' :
                hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`;
            slots.push({
                value: timeStr,
                display: displayTime,
                hour: hour
            });
        }
        return slots;
    };

    const timeSlots = generateTimeSlots();

    const getAllSchedulesForDate = (date: Dayjs) => {
        const dateStr = date.format('YYYY-MM-DD');
        return schedules.filter(schedule => schedule.workDate === dateStr);
    };

    const openScheduleModal = (timeSlot: string = '', schedule: any = null) => {
        setEditingSchedule(schedule);

        if (schedule) {
            form.setFieldsValue({
                employeeId: schedule.employeeId,
                startTime: dayjs(schedule.startTime, 'HH:mm'),
                endTime: dayjs(schedule.endTime, 'HH:mm'),
                shift: schedule.shift,
                notes: schedule.notes
            });
        } else {
            form.resetFields();
            if (timeSlot) {
                form.setFieldsValue({
                    startTime: dayjs(timeSlot, 'HH:mm'),
                    endTime: dayjs(timeSlot, 'HH:mm').add(1, 'hour')
                });
            }
        }
        setIsScheduleModalOpen(true);
    };

    const handleScheduleSubmit = async (values: any) => {
        const newSchedule = {
            technicianId: values.employeeId,
            workDate: selectedDate.format('YYYY-MM-DD'),
            startTime: values.startTime.format('HH:mm:ss'),
            endTime: values.endTime.format('HH:mm:ss'),
            isDayOff: values.isDayOff
        };

        await createWorkSchedule(newSchedule).then((res: any) => {
            if (res && res.success) {
                messageApi.success("Work schedule saved successfully!");
                setIsScheduleModalOpen(false);
                setEditingSchedule(null);
                onLoad();
            }
        })
    };

    const allDaySchedules = getAllSchedulesForDate(selectedDate);

    return (
        <Layout curActive='/user/work-schedule'>
            <main>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '24px' }}>
                    {/* Daily Schedule Section */}
                    <Card
                        style={{
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            borderRadius: '12px',
                            border: 'none',
                            maxHeight: '80vh',
                            overflow: 'auto'
                        }}
                    >
                        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Title level={3} style={{ margin: 0, color: '#DA0C81' }}>
                                <ClockCircleOutlined /> Daily Schedule
                            </Title>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <DatePicker
                                    value={selectedDate}
                                    onChange={(date) => setSelectedDate(date || dayjs())}
                                    style={{ borderRadius: '8px' }}
                                />
                                <Button
                                    type="primary"
                                    icon={<PlusOutlined />}
                                    onClick={() => openScheduleModal()}
                                    style={{
                                        borderRadius: '8px',
                                        boxShadow: '0 2px 8px rgba(24, 144, 255, 0.3)'
                                    }}
                                >
                                    Add Schedule
                                </Button>
                                <Button
                                    type="primary"
                                    icon={<ReloadOutlined />}
                                    onClick={onLoad}
                                    style={{
                                        borderRadius: '8px',
                                        boxShadow: '0 2px 8px rgba(24, 144, 255, 0.3)'
                                    }}
                                    danger
                                >
                                    Reload
                                </Button>
                            </div>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <Text strong style={{ fontSize: '16px' }}>
                                {selectedDate.format('dddd, MMMM D, YYYY')}
                            </Text>
                        </div>

                        <div className="time-slots-container">
                            {timeSlots.map(timeSlot => renderTimeSlot(
                                timeSlot,
                                schedules,
                                selectedDate,
                                openScheduleModal,
                                employees,
                                setSchedules,
                                loading
                            ))}
                        </div>
                    </Card>

                    {/* Sidebar */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {/* Daily Summary */}
                        <DailySummary
                            allDaySchedules={allDaySchedules}
                            employees={employees}
                            loading={loading}
                        />

                        {/* Employee Management */}
                        <EmployeeManagement
                            employees={employees}
                            loading={loading}
                        />
                    </div>
                </div>

                {/* Schedule Modal */}
                <CreateScheduleForm
                    editingSchedule={editingSchedule}
                    isOpen={isScheduleModalOpen}
                    onClose={() => setIsScheduleModalOpen(false)}
                    form={form}
                    onSubmit={handleScheduleSubmit}
                    employees={employees}
                    loading={loading}
                />
            </main>
        </Layout>
    );
};

export default DailyScheduleSystem;