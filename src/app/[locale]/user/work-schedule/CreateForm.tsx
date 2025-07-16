import { Booking } from "@/types/booking";
import { TechnicianInfo } from "@/types/user";
import { stringToColor } from "@/utils/color";
import { Button, Form, FormInstance, Input, Modal, Select, Space, TimePicker } from "antd"

const { Option } = Select;

const CreateScheduleForm = ({ editingSchedule, disable, isOpen, onClose, form, onSubmit, employees, loading }: {
    editingSchedule: Booking | null,
    disable: boolean,
    isOpen: boolean,
    onClose: () => void,
    form: FormInstance<any>,
    onSubmit: (values: any) => void,
    employees: TechnicianInfo[],
    loading: Record<string, boolean>
}) => {
    return (
        <Modal
            title={
                <span style={{ fontSize: '18px', fontWeight: '600' }}>
                    {editingSchedule ? "✏️ Edit Schedule" : "➕ Add New Schedule"}
                </span>
            }
            open={isOpen}
            onCancel={onClose}
            footer={null}
            width={500}
            style={{ borderRadius: '12px' }}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onSubmit}
                initialValues={{
                    isDayOff: false
                }}
                style={{ marginTop: '20px' }}
            >
                <Form.Item
                    label="Employee"
                    name="employeeId"
                    rules={[{ required: true, message: 'Please select an employee' }]}
                >
                    <Select placeholder="Select an employee" size="large">
                        {employees.map(employee => (
                            <Option key={employee.id} value={employee.id}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div
                                        style={{
                                            width: '8px',
                                            height: '8px',
                                            borderRadius: '50%',
                                            backgroundColor: stringToColor(employee.id)
                                        }}
                                    />
                                    {employee.fullName}
                                </div>
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <Form.Item
                        label="Start Time"
                        name="startTime"
                        rules={[{ required: !disable, message: 'Please select start time' }]}
                    >
                        <TimePicker
                            format="HH:mm"
                            style={{ width: '100%' }}
                            size="large"
                            readOnly
                            disabled={disable}
                        />
                    </Form.Item>

                    <Form.Item
                        label="End Time"
                        name="endTime"
                        rules={[{ required: !disable, message: 'Please select end time' }]}
                    >
                        <TimePicker
                            format="HH:mm"
                            style={{ width: '100%' }}
                            size="large"
                            readOnly
                            disabled={disable}
                        />
                    </Form.Item>
                </div>

                <Form.Item
                    label="Guest Name"
                    name="guestName"
                    rules={[{ required: true, message: 'Please input guest name' }]}
                >
                    <Input placeholder="Enter guest name" />
                </Form.Item>

                <Form.Item
                    label="Phone Number"
                    name="guestPhone"
                    rules={[{ required: true, message: 'Please input phone number' }]}
                >
                    <Input placeholder="Enter phone number" />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="guestEmail"
                    rules={[{ required: true, message: 'Please input email' }]}
                >
                    <Input placeholder="Enter email" type="email" />
                </Form.Item>

                <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
                    <Space>
                        <Button onClick={onClose} size="large">
                            Cancel
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            style={{ borderRadius: '8px' }}
                            loading={loading['create-work-schedule']}
                        >
                            {editingSchedule ? '💾 Update' : '✅ Create'} Schedule
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default CreateScheduleForm;