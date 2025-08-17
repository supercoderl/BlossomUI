'use client';
import { Form, Input, InputNumber, Select, Upload, Button, message, Row, Col, Modal } from 'antd';
import { UploadOutlined, SaveOutlined, PlusOutlined } from '@ant-design/icons';
import { theme } from 'antd';
import { useState } from 'react';
import type { UploadFile, UploadProps } from 'antd';
import { useGlobalMessage } from '@/providers/messageProvider';
import { useApiLoadingStore } from '@/stores/loadingStore';
import { createService } from '../api';

const { TextArea } = Input;
const { Option } = Select;

interface ServiceFormData {
    name: string;
    description?: string;
    categoryId: string;
    price: number;
    durationMinutes: number;
    representativeImage?: UploadFile[];
}

interface Category {
    id: string;
    name: string;
}

export default function ServiceCreator({
    isOpen,
    onClose,
    categories,
    onReload,
    onOpenCategory
}: {
    isOpen: boolean,
    onClose: () => void,
    categories: Category[],
    onReload: () => void,
    onOpenCategory: () => void
}) {
    const { token } = theme.useToken();
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [messageApi] = useGlobalMessage();
    const { loading } = useApiLoadingStore();

    const formStyle: React.CSSProperties = {
        maxWidth: 'none',
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 24,
    };

    const onFinish = async (values: ServiceFormData) => {
        try {
            // Prepare form data for API submission
            const formData = new FormData();
            formData.append('Name', values.name);
            formData.append('Description', values.description || '');
            formData.append('CategoryId', values.categoryId);
            formData.append('Price', values.price.toString());
            formData.append('DurationInMinutes', values.durationMinutes.toString());

            // Add image file if selected
            if (fileList.length > 0 && fileList[0].originFileObj) {
                formData.append('RepresentativeImage', fileList[0].originFileObj);
            }

            await createService(formData).then((res: any) => {
                if (res && res.success) {
                    messageApi.success('Service created successfully');
                    form.resetFields();
                    setFileList([]);
                    onReload();
                }
            });
        } catch (error) {
            message.error('Failed to create service');
        }
    };

    const uploadProps: UploadProps = {
        fileList,
        beforeUpload: (file) => {
            const isImage = file.type.startsWith('image/');
            if (!isImage) {
                message.error('You can only upload image files!');
                return false;
            }
            const isLt10M = file.size / 1024 / 1024 < 10;
            if (!isLt10M) {
                message.error('Image must be smaller than 10MB!');
                return false;
            }
            return false; // Prevent auto upload
        },
        onChange: ({ fileList: newFileList }) => {
            setFileList(newFileList.slice(-1)); // Keep only the last file
        },
        onRemove: () => {
            setFileList([]);
        },
    };

    return (
        <Modal
            open={isOpen}
            title="Create Service"
            onCancel={onClose}
            footer={null}
            width={800}
        >
            <main>
                <Form
                    form={form}
                    name="service_creator"
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
                                name="name"
                                label="Service Name"
                                rules={[
                                    { required: true, message: 'Please enter service name!' },
                                    { min: 2, message: 'Service name must be at least 2 characters!' },
                                    { max: 100, message: 'Service name cannot exceed 100 characters!' }
                                ]}
                            >
                                <Input placeholder="Enter service name" />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="categoryId"
                                label="Category"
                                rules={[{ required: true, message: 'Please select a category!' }]}
                            >
                                <Select
                                    placeholder="Select a category"
                                    loading={loading['get-categories']}
                                    suffixIcon={
                                        <Button
                                            icon={<PlusOutlined />}
                                            type="text"
                                            onMouseDown={(e) => e.stopPropagation()}
                                            onClick={onOpenCategory}
                                        />
                                    }
                                >
                                    {categories.map(category => (
                                        <Option key={category.id} value={category.id}>
                                            {category.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="price"
                                label="Price (£)"
                                rules={[
                                    { required: true, message: 'Please enter the price!' },
                                    { type: 'number', min: 0, message: 'Price must be a positive number!' }
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
                                name="durationMinutes"
                                label="Duration (Minutes)"
                                rules={[
                                    { required: true, message: 'Please enter the duration!' },
                                    { type: 'number', min: 1, message: 'Duration must be at least 1 minute!' }
                                ]}
                            >
                                <InputNumber
                                    style={{ width: '100%' }}
                                    placeholder="Enter duration in minutes"
                                    min={1}
                                    max={480} // 8 hours max
                                    step={15}
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
                            <Form.Item
                                name="representativeImage"
                                label="Representative Image"
                                extra="Upload an image to represent this service. Supported formats: JPG, PNG, GIF. Max size: 10MB."
                            >
                                <Upload
                                    {...uploadProps}
                                    listType="picture-card"
                                    maxCount={1}
                                    showUploadList={{
                                        showPreviewIcon: false,
                                        showRemoveIcon: true,
                                        showDownloadIcon: false,
                                    }}
                                >
                                    {fileList.length >= 1 ? null : (
                                        <div>
                                            <UploadOutlined />
                                            <div style={{ marginTop: 8 }}>Upload</div>
                                        </div>
                                    )}
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col span={24}>
                            <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading['create-service']}
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