'use client';
import { Form, Input, InputNumber, Select, Button, message, Row, Col, DatePicker } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { theme } from 'antd';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import Layout from '@/components/Layout';
import { useGlobalMessage } from '@/providers/messageProvider';
import { useApiLoadingStore } from '@/stores/loadingStore';
import LoadingBackground from '@/components/Loading';
import { DiscountType } from '@/enums/discountType';
import { getPromotionById, updatePromotion } from '../../api';
import moment from 'moment';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;

interface PromotionFormData {
    promotionId: string;
    code: string;
    description?: string;
    discountType: DiscountType;
    discountValue: number;
    minimumSpend: number;
    startDate: Date;
    endDate: Date;
    maxUsage: number;
    isActive: boolean;
}

export default function PromotionEditor() {
    const { token } = theme.useToken();
    const [form] = Form.useForm();
    const { id } = useParams();
    const [messageApi] = useGlobalMessage();
    const { loading } = useApiLoadingStore();

    const formStyle: React.CSSProperties = {
        maxWidth: 'none',
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 24,
    };

    const onLoad = async () => {
        try {
            await getPromotionById(id as string).then((res) => {
                if (res && res.data) {
                    const promotion = res.data;
                    if (promotion) {
                        form.setFieldsValue({
                            promotionId: promotion.id,
                            code: promotion.code,
                            description: promotion.description || '',
                            discountType: promotion.discountType,
                            discountValue: promotion.discountValue,
                            minimumSpend: promotion.minimumSpend,
                            startDate: dayjs(promotion.startDate),
                            endDate: dayjs(promotion.endDate),
                            maxUsage: promotion.maxUsage,
                            isActive: promotion.isActive
                        })
                    }
                }
            })
        } catch (error: any) {
            if (error && error.response && error.response.data) {
                const errors = error.response.data.errors;
                if (errors && errors.length > 0) {
                    errors.forEach((error: any) => {
                        messageApi.error(error || 'Login failed');
                    })
                }
            }
            else {
                messageApi.error("Request failed, please try again later");
            }
        }
    }

    useEffect(() => {
        if (id) {
            onLoad();
        }
    }, [id]);

    const onFinish = async (values: PromotionFormData) => {
        try {
            await updatePromotion(values).then((res: any) => {
                if (res && res.success) {
                    messageApi.success('Promotion saved successfully');
                }
            });
        } catch {
            message.error('Failed to save promotion');
        }
    };

    return (
        <Layout curActive={`/promotion/${id}/edit`}>
            <LoadingBackground loading={loading['get-promotion-by-id']}>
                <main>
                    <Form
                        form={form}
                        name="promotion_editor"
                        style={formStyle}
                        onFinish={onFinish}
                        layout="vertical"
                        initialValues={{
                            promotionId: id,
                            isActive: true
                        }}
                    >
                        <Row gutter={24}>
                            <Col span={24} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <h2 style={{ marginBottom: 24 }}>
                                    Edit Promotion
                                </h2>
                                <Button onClick={() => window.history.back()} type="primary">
                                    Back
                                </Button>
                            </Col>
                        </Row>

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

                        {/* Hidden field for PromotionId */}
                        <Form.Item name="promotionId" hidden>
                            <Input />
                        </Form.Item>

                        <Form.Item name="isActive" hidden>
                            <Input />
                        </Form.Item>

                        <Row gutter={24}>
                            <Col span={24}>
                                <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        loading={loading['update-promotion']}
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
            </LoadingBackground>
        </Layout>
    );
};