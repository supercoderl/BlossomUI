'use client';
import { Form, Input, Button, message, Row, Col, Modal } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { theme } from 'antd';
import { useGlobalMessage } from '@/providers/messageProvider';
import { useApiLoadingStore } from '@/stores/loadingStore';
import { createCategory } from '@/app/[locale]/service/category/api';

interface CategoryFormData {
    name: string;
}

export default function CategoryCreator({ isOpen, onClose, onReload }: { isOpen: boolean, onClose: () => void, onReload: () => void }) {
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

    const onFinish = async (values: CategoryFormData) => {
        try {
            await createCategory({
                name: values.name,
                priority: 0
            }).then((res: any) => {
                if (res && res.success) {
                    messageApi.success('Category created successfully');
                    form.resetFields();
                    onReload();
                }
            });
        } catch (error) {
            message.error('Failed to create category');
        }
    };

    return (
        <Modal
            open={isOpen}
            title="Create Category"
            onCancel={onClose}
            footer={null}
            width={800}
        >
            <main>
                <Form
                    form={form}
                    name="category_creator"
                    style={formStyle}
                    onFinish={onFinish}
                    layout="vertical"
                    initialValues={{
                        durationInMinutes: 30,
                        price: 0,
                    }}
                >
                    <Row gutter={24}>
                        <Col span={24}>
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
                    </Row>

                    <Row gutter={24}>
                        <Col span={24}>
                            <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading['create-category']}
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