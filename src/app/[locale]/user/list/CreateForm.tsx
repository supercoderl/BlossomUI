'use client';
import { Form, Input, Select, Button, message, Row, Col, Modal, DatePicker } from 'antd';
import { SaveOutlined, ShakeOutlined } from '@ant-design/icons';
import { theme } from 'antd';
import { useState } from 'react';
import type { UploadFile, UploadProps } from 'antd';
import { useGlobalMessage } from '@/providers/messageProvider';
import { useApiLoadingStore } from '@/stores/loadingStore';
import { UserRoles } from '@/enums/userRoles';
import { Gender } from '@/enums/gender';
import { registerApi } from '../api';
import dayjs from 'dayjs';
import { generatePassword } from '@/utils/text';

const { TextArea } = Input;
const { Option } = Select;

interface UserFormData {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    phoneNumber: string;
    gender: Gender;
    website: string;
    dateOfBirth: Date;
    role: UserRoles;
}

export default function UserCreator({
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
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [messageApi] = useGlobalMessage();
    const { loading } = useApiLoadingStore();

    const formStyle: React.CSSProperties = {
        maxWidth: 'none',
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 24,
    };

    const onFinish = async (values: UserFormData) => {
        try {
            await registerApi(
                values.email,
                values.password,
                values.firstName,
                values.lastName,
                values.phoneNumber,
                values.gender,
                values.dateOfBirth,
                values.website,
                values.role
            ).then((res: any) => {
                if (res && res.success) {
                    messageApi.success('User created successfully');
                    form.resetFields();
                    onReload();
                }
            });
        } catch (error) {
            message.error('Failed to create user');
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
            title="Create User"
            onCancel={onClose}
            footer={null}
            width={800}
        >
            <main>
                <Form
                    form={form}
                    name="user_creator"
                    style={formStyle}
                    onFinish={onFinish}
                    layout="vertical"
                    initialValues={{
                        password: generatePassword(18)
                    }}
                >
                    <Row gutter={24}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="firstName"
                                label="First Name"
                                rules={[
                                    { required: true, message: 'Please enter first name!' }
                                ]}
                            >
                                <Input placeholder="Enter first name" size='large' />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="lastName"
                                label="Last Name"
                                rules={[
                                    { required: true, message: 'Please enter last name!' }
                                ]}
                            >
                                <Input placeholder="Enter last name" size='large' />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    { required: true, message: 'Please enter email!' },
                                    { type: 'email', message: 'Please enter a valid email!' }
                                ]}
                            >
                                <Input placeholder="Enter email" size='large' />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[
                                    { required: true, message: 'Please enter password!' }
                                ]}
                            >
                                <Input
                                    placeholder="Enter password"
                                    size='large'
                                    suffix={
                                        <Button
                                            type="text"
                                            style={{ paddingInline: 8 }}
                                            onClick={() => form.setFieldsValue({ password: generatePassword(18) })}
                                        >
                                            <ShakeOutlined />
                                        </Button>
                                    }
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="phoneNumber"
                                label="Phone Number"
                                rules={[
                                    { required: true, message: 'Please enter phone number!' }
                                ]}
                            >
                                <Input placeholder="Enter phone number" size='large' />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="gender"
                                label="Gender"
                                rules={[{ required: true, message: 'Please select a gender!' }]}
                            >
                                <Select
                                    placeholder="Select a gender"
                                    size='large'
                                >
                                    {Object.keys(Gender)
                                        .filter(g => isNaN(Number(g)))
                                        .map(gender => (
                                            <Option key={gender} value={Gender[gender as keyof typeof Gender]}>
                                                {gender}
                                            </Option>
                                        ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col xs={24}>
                            <Form.Item
                                name="website"
                                label="Website"
                                rules={[
                                    { required: true, message: 'Please enter website!' },
                                    { type: 'url', message: 'Please enter a valid URL!' }
                                ]}
                            >
                                <Input placeholder="Enter website" size='large' />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="dateOfBirth"
                                label="Date of Birth"
                                rules={[
                                    { required: true, message: 'Please enter date of birth!' }
                                ]}
                            >
                                <DatePicker
                                    placeholder='Select your birth date'
                                    size='large'
                                    variant="filled"
                                    style={{ width: '100%' }}
                                    disabledDate={(current) => {
                                        const todayMinus6Years = dayjs().subtract(6, 'years').startOf('day');
                                        return current && current.isAfter(todayMinus6Years, 'day');
                                    }}
                                    format="DD-MM-YYYY"
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="role"
                                label="Role"
                                rules={[
                                    { required: true, message: 'Please select a role!' }
                                ]}
                            >
                                <Select placeholder="Select a role" size='large'>
                                    {Object.keys(UserRoles)
                                        .filter(r => isNaN(Number(r)))
                                        .map(role => (
                                            <Option
                                                key={role}
                                                value={UserRoles[role as keyof typeof UserRoles]}>
                                                {role}
                                            </Option>
                                        ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* <Row gutter={24}>
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
                    </Row> */}

                    <Row gutter={24}>
                        <Col span={24}>
                            <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading['register']}
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