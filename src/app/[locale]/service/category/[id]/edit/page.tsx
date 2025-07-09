'use client';
import { Form, Input, InputNumber, Select, Button, message, Row, Col } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { theme } from 'antd';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import Layout from '@/components/Layout';
import { useGlobalMessage } from '@/providers/messageProvider';
import { useApiLoadingStore } from '@/stores/loadingStore';
import LoadingBackground from '@/components/Loading';
import { getCategoryById, updateCategory } from '../../api';

const { Option } = Select;

interface CategoryFormData {
    categoryId: string;
    name: string;
    isActive: boolean;
    priority: number;
}

export default function CategoryEditor() {
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
            await getCategoryById(id as string).then((res) => {
                if (res && res.data) {
                    const category = res.data;
                    if (category) {
                        form.setFieldsValue({
                            categoryId: category.id,
                            name: category.name,
                            isActive: category.isActive,
                            priority: category.priority
                        });
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

    const onFinish = async (values: CategoryFormData) => {
        try {
            await updateCategory(values).then((res: any) => {
                if (res && res.success) {
                    messageApi.success('Category saved successfully');
                }
            });
        } catch {
            message.error('Failed to save category');
        }
    };

    return (
        <Layout curActive={`/service/category/${id}/edit`}>
            <LoadingBackground loading={loading['get-category-by-id']}>
                <main>
                    <Form
                        form={form}
                        name="category_editor"
                        style={formStyle}
                        onFinish={onFinish}
                        layout="vertical"
                        initialValues={{
                            categoryId: id
                        }}
                    >
                        <Row gutter={24}>
                            <Col span={24} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <h2 style={{ marginBottom: 24 }}>
                                    Edit Category
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
                                    label="Category Name"
                                    rules={[
                                        { required: true, message: 'Please enter category name!' },
                                        { min: 2, message: 'Category name must be at least 2 characters!' },
                                        { max: 100, message: 'Category name cannot exceed 100 characters!' }
                                    ]}
                                >
                                    <Input placeholder="Enter category name" />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="priority"
                                    label="Priority"
                                    rules={[
                                        { required: true, message: 'Please enter the priority!' },
                                        { type: 'number', min: 0, message: 'Priority must be a positive number!' }
                                    ]}
                                >
                                    <InputNumber
                                        style={{ width: '100%' }}
                                        placeholder="0"
                                        min={0}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={24}>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="isActive"
                                    label="Status"
                                    rules={[{ required: true, message: 'Please select status!' }]}
                                >
                                    <Select
                                        placeholder="Select status"
                                    >
                                        <Option value={true}>
                                            Active
                                        </Option>
                                        <Option value={false}>
                                            Inactive
                                        </Option>
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                {/* Hidden field for CategoryId */}
                                <Form.Item name="categoryId" hidden>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={24}>
                            <Col span={24}>
                                <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        loading={loading['update-category']}
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