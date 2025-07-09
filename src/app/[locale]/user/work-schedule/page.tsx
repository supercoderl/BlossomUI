'use client'

import React, { useEffect, useState } from 'react';
import {
    Button,
    Form,
    Card,
    Typography,
    DatePicker
} from 'antd';
import {
    PlusOutlined,
    ClockCircleOutlined,
    ReloadOutlined,
} from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import Layout from '@/components/Layout';
import EmployeeManagement from './Employee';
import CreateScheduleForm from './CreateForm';
import { renderTimeSlot } from './timeSlotRender';
import { createWorkSchedule, getTechnicians } from '../api';
import { useApiLoadingStore } from '@/stores/loadingStore';
import DailySummary from './DailySummary';
import { TechnicianInfo } from '@/types/user';
import { useGlobalMessage } from '@/providers/messageProvider';
import { getBookings } from '../../booking/api';
import { Booking } from '@/types/booking';

const { Title, Text } = Typography;

const DailyScheduleSystem = () => {
    const [employees, setEmployees] = useState<TechnicianInfo[]>([]);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
    const [editingSchedule, setEditingSchedule] = useState<Booking | null>(null);
    const [form] = Form.useForm();
    const { loading } = useApiLoadingStore();
    const [messageApi] = useGlobalMessage();

    const onLoad = async () => {
        const [technicianRes, bookingRes] = await Promise.all([
            getTechnicians({
                query: { page: 1, pageSize: 5 },
                searchTerm: '',
                includeDeleted: false
            }),
            getBookings({
                query: { page: 1, pageSize: 5 },
                searchTerm: '',
                includeDeleted: false
            })
        ]);

        const technicians = technicianRes?.data?.items || [];
        const bookings = bookingRes?.data?.items || [];
        console.log(bookings);

        if (technicians.length > 0) {
            setEmployees(technicians);
        }

        if (bookings.length > 0) {
            setBookings(bookings);
        }
    }

    useEffect(() => {
        onLoad();
    }, []);

    // Generate time slots from 6 AM to 5 PM
    const generateTimeSlots = () => {
        const slots = [];
        for (let hour = 9; hour <= 18; hour++) {
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
        return bookings.filter(booking => dayjs(booking.scheduleTime).format('YYYY-MM-DD') === dateStr);
    };

    const openScheduleModal = (timeSlot: string = '', schedule: Booking | null = null) => {
        setEditingSchedule(schedule);

        if (schedule) {
            form.setFieldsValue({
                employeeId: schedule.technicianId,
                startTime: dayjs(schedule.scheduleTime),
                endTime: dayjs(schedule.scheduleTime).add(schedule.bookingDetails?.[0].service?.durationMinutes ?? 0, 'minutes'),
                // shift: schedule.shift,
                notes: schedule.note
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
            startTime: values.startTime.format('HH:mm'),
            endTime: values.endTime.format('HH:mm'),
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
                                bookings,
                                selectedDate,
                                openScheduleModal,
                                employees,
                                setBookings,
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