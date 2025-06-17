'use client';
import { Form, Input, InputNumber, Select, Upload, Button, message, Row, Col } from 'antd';
import { UploadOutlined, SaveOutlined, PlusOutlined } from '@ant-design/icons';
import { theme } from 'antd';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import type { UploadFile, UploadProps } from 'antd';
import Layout from '@/components/Layout';
import { getServiceById, updateService } from '../../api';
import { useGlobalMessage } from '@/providers/messageProvider';
import { useApiLoadingStore } from '@/stores/loadingStore';
import LoadingBackground from '@/components/Loading';
import { getCategories } from '@/app/[locale]/service/category/api';
import CategoryCreator from '@/components/Category/CategoryFormCreator';

const { TextArea } = Input;
const { Option } = Select;

interface ServiceFormData {
    serviceId: string;
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

export default function ServiceEditor() {
    const { token } = theme.useToken();
    const [form] = Form.useForm();
    const { id } = useParams();
    const [categories, setCategories] = useState<Category[]>([]);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [messageApi] = useGlobalMessage();
    const { loading } = useApiLoadingStore();
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);

    const handleOpenCategory = () => {
        setIsCategoryOpen(true);
    }

    const handleCloseCategory = () => {
        setIsCategoryOpen(false);
    }

    const formStyle: React.CSSProperties = {
        maxWidth: 'none',
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 24,
    };

    const onLoad = async () => {
        try {
            const [serviceRes, categoryRes] = await Promise.all([
                getServiceById(id as string),
                getCategories()
            ]);

            const service = serviceRes?.data;
            const categoryList = categoryRes?.data?.items || [];

            if (service) {
                form.setFieldsValue({
                    serviceId: service.id,
                    name: service.name,
                    description: service.description || '',
                    categoryId: service.categoryId,
                    price: service.price,
                    durationMinutes: service.durationMinutes,
                });

                if (service.representativeImage) {
                    setFileList([{
                        uid: '-1',
                        name: service.representativeImage,
                        status: 'done',
                        url: service.representativeImage,
                    }]);
                }
            }

            setCategories(categoryList.map((cat: any) => ({
                id: cat.id,
                name: cat.name,
            })));
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

    const onFinish = async (values: ServiceFormData) => {
        try {
            // Prepare form data for API submission
            const formData = new FormData();
            formData.append('ServiceId', values.serviceId || '');
            formData.append('Name', values.name);
            formData.append('Description', values.description || '');
            formData.append('CategoryId', values.categoryId);
            formData.append('Price', values.price.toString());
            formData.append('DurationInMinutes', values.durationMinutes.toString());

            // Add image file if selected
            if (fileList.length > 0 && fileList[0].originFileObj) {
                formData.append('RepresentativeImage', fileList[0].originFileObj);
            }

            await updateService(formData).then((res: any) => {
                if (res && res.success) {
                    messageApi.success('Service saved successfully');
                }
            });
        } catch (error) {
            message.error('Failed to save service');
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
        <Layout curActive={`/service/${id}/edit`}>
            <LoadingBackground loading={loading['get-service-by-id'] || loading['get-categories']}>
                <main>
                    <Form
                        form={form}
                        name="service_editor"
                        style={formStyle}
                        onFinish={onFinish}
                        layout="vertical"
                        initialValues={{
                            serviceId: id,
                            durationInMinutes: 30,
                            price: 0,
                        }}
                    >
                        <Row gutter={24}>
                            <Col span={24} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <h2 style={{ marginBottom: 24 }}>
                                    Edit Service
                                </h2>
                                <Button onClick={() => window.history.back()} type="primary">
                                    Back
                                </Button>
                            </Col>
                        </Row>

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
                                                onClick={handleOpenCategory}
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

                        {/* Hidden field for ServiceId */}
                        <Form.Item name="serviceId" hidden>
                            <Input />
                        </Form.Item>

                        <Row gutter={24}>
                            <Col span={24}>
                                <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        loading={loading['update-service']}
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

            <CategoryCreator
                isOpen={isCategoryOpen}
                onClose={handleCloseCategory}
                onReload={onLoad}
            />
        </Layout>
    );
};