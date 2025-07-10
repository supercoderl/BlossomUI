'use client';
import { Form, Input, InputNumber, Select, Button, message, Row, Col, Modal, DatePicker } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { theme } from 'antd';
import { useGlobalMessage } from '@/providers/messageProvider';
import { useApiLoadingStore } from '@/stores/loadingStore';
import { DiscountType } from '@/enums/discountType';
import { createPromotion } from '../api';
import moment from 'moment';

const { TextArea } = Input;
const { Option } = Select;

interface PromotionFormData {
    code: string;
    description?: string;
    discountType: DiscountType;
    discountValue: number;
    minimumSpend: number;
    startDate: Date;
    endDate: Date;
    maxUsage: number
}

export default function DiscountCreator({
    isOpen,
    onClose,
    onReload
}: {
    isOpen: boolean,
    onClose: () => void,
    onReload: () => void
}) {
    const { token } = theme.useToken();
    const [form] = Form.useForm();
    const [messageApi] = useGlobalMessage();
    const { loading } = useApiLoadingStore();

    const formStyle: React.CSSProperties = {
        maxWidth: 'none',
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 24,
    };

    const onFinish = async (values: PromotionFormData) => {
        try {
            // Prepare form data for API submission
            await createPromotion({
                ...values,
                startDate: moment(values.startDate).format('YYYY-MM-DD'),
                endDate: moment(values.endDate).format('YYYY-MM-DD')
            }).then((res: any) => {
                if (res && res.success) {
                    messageApi.success('Promotion created successfully');
                    form.resetFields();
                    onReload();
                }
            });
        } catch (error) {
            message.error('Failed to create promotion');
        }
    };

    return (
        <Modal
            open={isOpen}
            title="Create Promotion"
            onCancel={onClose}
            footer={null}
            width={800}
        >
            <main>
                <Form
                    form={form}
                    name="promotion_creator"
                    style={formStyle}
                    onFinish={onFinish}
                    layout="vertical"
                    initialValues={{
                        durationInMinutes: 30,
                        price: 0,
                    }}
                >
                    <Row gutter={24}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="code"
                                label="Code"
                                rules={[
                                    { required: true, message: 'Please enter code!' },
                                ]}
                            >
                                <Input placeholder="Enter code" />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="discountValue"
                                label="Value"
                                rules={[
                                    { required: true, message: 'Please input value!' },
                                    { type: 'number', min: 0, message: 'Value must be a positive number!' }
                                ]}
                            >
                                <InputNumber
                                    style={{ width: '100%' }}
                                    placeholder="0.00"
                                    min={0}
                                    step={0.01}
                                    precision={2}
                                    formatter={(value) => `£ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="minimumSpend"
                                label="Minimum Spend (£)"
                                rules={[
                                    { required: true, message: 'Please enter the minimum!' },
                                    { type: 'number', min: 0, message: 'Minimum must be a positive number!' }
                                ]}
                            >
                                <InputNumber
                                    style={{ width: '100%' }}
                                    placeholder="0.00"
                                    min={0}
                                    step={0.01}
                                    precision={2}
                                    formatter={(value) => `£ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="discountType"
                                label="Type"
                                rules={[
                                    { required: true, message: 'Please select a type!' }
                                ]}
                            >
                                <Select
                                    placeholder="Select a type"
                                >
                                    {Object.entries(DiscountType).filter(([key]) => isNaN(Number(key))).map(([key, value]) => (
                                        <Option key={value} value={value}>
                                            {key}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item
                                name="startDate"
                                label="Start"
                                rules={[
                                    { required: true, message: 'Please choose start date!' }
                                ]}
                            >
                                <DatePicker
                                    placeholder='Select start date'
                                    size='large'
                                    variant="filled"
                                    style={{ width: '100%' }}
                                    disabledDate={(current) => current && current < moment().subtract(1, 'day')}
                                    format="DD-MM-YYYY"
                                    key="startDate"
                                />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="endDate"
                                label="End"
                                rules={[
                                    { required: true, message: 'Please choose end date!' }
                                ]}
                            >
                                <DatePicker
                                    placeholder='Select end date'
                                    size='large'
                                    variant="filled"
                                    style={{ width: '100%' }}
                                    disabledDate={(current) => current && current < moment().subtract(1, 'day')}
                                    format="DD-MM-YYYY"
                                    key="endDate"
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col span={24}>
                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[
                                    { max: 500, message: 'Description cannot exceed 500 characters!' }
                                ]}
                            >
                                <TextArea
                                    rows={4}
                                    placeholder="Enter service description (optional)"
                                    showCount
                                    maxLength={500}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col span={24}>
                            <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading['create-promotion']}
                                    icon={<SaveOutlined />}
                                    size="large"
                                    style={{ minWidth: 120 }}
                                >
                                    Save
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </main>
        </Modal>
    );
};