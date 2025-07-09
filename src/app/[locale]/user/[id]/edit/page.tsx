'use client';
import { Form, Input, Select, Upload, Button, message, Row, Col, DatePicker } from 'antd';
import { UploadOutlined, SaveOutlined } from '@ant-design/icons';
import { theme } from 'antd';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import type { UploadFile, UploadProps } from 'antd';
import Layout from '@/components/Layout';
import { useGlobalMessage } from '@/providers/messageProvider';
import { useApiLoadingStore } from '@/stores/loadingStore';
import LoadingBackground from '@/components/Loading';
import { Gender } from '@/enums/gender';
import { getUserById, updateUser } from '../../api';
import dayjs from 'dayjs';
import { UserRoles } from '@/enums/userRoles';

const { Option } = Select;

interface ServiceFormData {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    gender: Gender;
    dateOfBirth: Date;
    avatarFile?: UploadFile[];
    role: UserRoles;
}

export default function UserEditor() {
    const { token } = theme.useToken();
    const [form] = Form.useForm();
    const { id } = useParams();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
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
            await getUserById(id as string).then((res) => {
                if (res && res.data) {
                    const user = res.data;

                    form.setFieldsValue({
                        userId: user.id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        phoneNumber: user.phoneNumber,
                        gender: user.gender,
                        dateOfBirth: dayjs(user.dateOfBirth),
                        role: user.role
                    });

                    if (user.avatarUrl) {
                        setFileList([{
                            uid: '-1',
                            name: user.avatarUrl,
                            status: 'done',
                            url: user.avatarUrl,
                        }]);
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

    const onFinish = async (values: ServiceFormData) => {
        try {
            // Prepare form data for API submission
            const formData = new FormData();
            formData.append('Id', values.userId || '');
            formData.append('Email', values.email);
            formData.append('FirstName', values.firstName);
            formData.append('LastName', values.lastName);
            formData.append('PhoneNumber', values.phoneNumber);
            formData.append('Gender', values.gender.toString());
            formData.append('DateOfBirth', dayjs(values.dateOfBirth).format('YYYY-MM-DD'));
            formData.append('Role', values.role.toString());

            // Add image file if selected
            if (fileList.length > 0 && fileList[0].originFileObj) {
                formData.append('AvatarFile', fileList[0].originFileObj);
            }

            Array.from(formData.entries()).forEach(([key, value]) => {
                console.log(`${key}: ${value}`);
            });

            await updateUser(formData).then((res: any) => {
                if (res && res.success) {
                    messageApi.success('User saved successfully');
                }
            });
        } catch {
            message.error('Failed to save user');
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
        <Layout curActive={`/user/${id}/edit`}>
            <LoadingBackground loading={loading['get-user-by-id']}>
                <main>
                    <Form
                        form={form}
                        name="user_editor"
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
                                    Edit User
                                </h2>
                                <Button onClick={() => window.history.back()} type="primary">
                                    Back
                                </Button>
                            </Col>
                        </Row>

                        <Row gutter={24}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="email"
                                    label="Email"
                                    rules={[
                                        { required: true, message: 'Please enter email!' },
                                        { type: 'email', message: 'Please enter the correct format email' }
                                    ]}
                                >
                                    <Input placeholder="Enter email" />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="gender"
                                    label="Gender"
                                    rules={[{ required: true, message: 'Please select gender!' }]}
                                >
                                    <Select
                                        placeholder="Select gender"
                                    >
                                        {Object.entries(Gender).filter(([key]) => isNaN(Number(key))).map(([key, value]) => (
                                            <Option key={value} value={value}>
                                                {key}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={24}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="firstName"
                                    label="Fist Name"
                                    rules={[
                                        { required: true, message: 'Please enter first name!' }
                                    ]}
                                >
                                    <Input placeholder="Enter first name" />
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
                                    <Input placeholder="Enter last name" />
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
                                    <Input placeholder="Enter phone number" />
                                </Form.Item>
                            </Col>

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
                        </Row>

                        <Row gutter={24}>
                            <Col span={24}>
                                <Form.Item
                                    name="avatarFile"
                                    label="Avatar"
                                    extra="Upload an image to avatar. Supported formats: JPG, PNG, GIF. Max size: 10MB."
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

                        {/* Hidden field for UserId */}
                        <Form.Item name="userId" hidden>
                            <Input />
                        </Form.Item>

                        <Form.Item name="role" hidden>
                            <Input />
                        </Form.Item>

                        <Row gutter={24}>
                            <Col span={24}>
                                <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        loading={loading['update-user']}
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