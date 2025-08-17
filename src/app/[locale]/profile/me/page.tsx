'use client';
import { Form, Input, Upload, Button, Select, DatePicker, message } from 'antd';
import { theme } from 'antd';
import { useState, useEffect } from 'react';
import type { UploadFile, UploadProps } from 'antd';
import { EditOutlined, DeleteOutlined, FileImageOutlined, CloseOutlined } from '@ant-design/icons';
import Layout from '@/components/Layout';
import { useGlobalMessage } from '@/providers/messageProvider';
import { useApiLoadingStore } from '@/stores/loadingStore';
import LoadingBackground from '@/components/Loading';
import { Gender } from '@/enums/gender';
import dayjs from 'dayjs';
import { UserRoles } from '@/enums/userRoles';
import { GlobalIcon } from '@/components/Icon/global';
import { cn } from '@/utils/helpers';
import { getMyProfile, updateUser } from '../../user/api';
import ImageEditModal from '@/components/Modal/image-edit';
import { RcFile } from 'antd/es/upload/interface';

const { Option } = Select;
const { TextArea } = Input;

interface ServiceFormData {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    gender: Gender;
    dateOfBirth: Date;
    avatarFile?: UploadFile[];
    coverPhoto?: UploadFile[];
    role: UserRoles;
    bio: string;
    website: string;
}

export default function PersonalInfo() {
    const { token } = theme.useToken();
    const [form] = Form.useForm();
    const [avatarFileList, setAvatarFileList] = useState<UploadFile[]>([]);
    const [coverFileList, setCoverFileList] = useState<UploadFile[]>([]);
    const [messageApi] = useGlobalMessage();
    const { loading } = useApiLoadingStore();

    // Image edit modal states
    const [isImageEditModalVisible, setIsImageEditModalVisible] = useState(false);
    const [currentEditFile, setCurrentEditFile] = useState<File | null>(null);
    const [editingType, setEditingType] = useState<'avatar' | 'cover' | null>(null);

    const formStyle: React.CSSProperties = {
        maxWidth: 'none',
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 24,
    };

    const onLoad = async () => {
        try {
            const response = await getMyProfile();
            if (response && response.data) {
                const user = response.data;
                form.setFieldsValue({
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phoneNumber: user.phoneNumber,
                    gender: user.gender,
                    dateOfBirth: user.dateOfBirth ? dayjs(user.dateOfBirth) : null,
                    role: user.role,
                    website: user.website
                });

                if (user.avatarUrl) {
                    setAvatarFileList([{
                        uid: '-1',
                        name: 'avatar',
                        status: 'done',
                        url: user.avatarUrl,
                    }]);
                }

                if (user.coverPhotoUrl) {
                    setCoverFileList([{
                        uid: '-2',
                        name: 'cover',
                        status: 'done',
                        url: user.coverPhotoUrl,
                    }]);
                }
            }
        } catch (error: any) {
            if (error && error.response && error.response.data) {
                const errors = error.response.data.errors;
                if (errors && errors.length > 0) {
                    errors.forEach((error: any) => {
                        messageApi.error(error || 'Failed to load user data');
                    });
                }
            } else {
                messageApi.error("Request failed, please try again later");
            }
        }
    };

    useEffect(() => {
        onLoad();
    }, []);

    const onFinish = async (values: ServiceFormData) => {
        try {
            console.log(values);
            const formData = new FormData();
            formData.append('Id', values.id || '');
            formData.append('Email', values.email);
            formData.append('FirstName', values.firstName);
            formData.append('LastName', values.lastName);
            formData.append('PhoneNumber', values.phoneNumber);
            formData.append('Gender', values.gender.toString());
            formData.append('DateOfBirth', dayjs(values.dateOfBirth).format('YYYY-MM-DD'));
            formData.append('Role', values.role.toString());
            formData.append('Website', values.website);

            if (avatarFileList.length > 0 && avatarFileList[0].originFileObj) {
                formData.append('AvatarFile', avatarFileList[0].originFileObj);
            }

            if (coverFileList.length > 0 && coverFileList[0].originFileObj) {
                formData.append('CoverPhoto', coverFileList[0].originFileObj);
            }

            await updateUser(formData).then((res: any) => {
                if (res && res.success) {
                    messageApi.success('Profile updated successfully');
                }
            });
        } catch (error) {
            messageApi.error('Failed to update profile');
        }
    };

    // Handle image selection and open edit modal
    const handleImageSelect = (file: File, type: 'avatar' | 'cover') => {
        setCurrentEditFile(file);
        setEditingType(type);
        setIsImageEditModalVisible(true);
        return false; // Prevent upload
    };

    // Handle edited image from modal
    const handleImageEditSave = (blob: Blob) => {
        const url = URL.createObjectURL(blob)

        const uploadFile: UploadFile = {
            uid: Date.now().toString(),
            name: `file-${Date.now().toString()}`,
            status: 'done',
            url,
            originFileObj: new File([blob], `file-${Date.now().toString()}`, { type: 'image/png' }) as RcFile,
        };

        if (editingType === 'avatar') {
            setAvatarFileList([uploadFile]);
        } else if (editingType === 'cover') {
            setCoverFileList([uploadFile]);
        }

        setIsImageEditModalVisible(false);
        setCurrentEditFile(null);
        setEditingType(null);
    };

    const handleImageEditCancel = () => {
        setIsImageEditModalVisible(false);
        setCurrentEditFile(null);
        setEditingType(null);
    };

    const avatarUploadProps: UploadProps = {
        fileList: avatarFileList,
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
            return handleImageSelect(file, 'avatar');
        },
        onChange: ({ fileList: newFileList }) => {
            // Only update if not opening edit modal
            if (!isImageEditModalVisible) {
                setAvatarFileList(newFileList.slice(-1));
            }
        },
        onRemove: () => {
            setAvatarFileList([]);
        },
        showUploadList: false,
    };

    const coverUploadProps: UploadProps = {
        fileList: coverFileList,
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
            return handleImageSelect(file, 'cover');
        },
        onChange: ({ fileList: newFileList }) => {
            if (!isImageEditModalVisible) {
                setCoverFileList(newFileList.slice(-1));
            }
        },
        onRemove: () => {
            setCoverFileList([]);
        },
        showUploadList: false,
    };

    const renderImageUpload = (
        fileList: UploadFile[],
        uploadProps: UploadProps,
        defaultImage?: string,
        roundImageClass?: string
    ) => {
        const rawFile = fileList[0];
        const imageUrl =
            rawFile?.url ||
            rawFile?.thumbUrl ||
            (rawFile?.originFileObj ? URL.createObjectURL(rawFile.originFileObj) : defaultImage);

        return (
            <div className="group block cursor-pointer">
                <div className="relative z-0 mt-1 flex justify-center rounded-xl border border-dashed border-neutral-300 transition-colors group-hover:border-neutral-400 dark:border-neutral-600">
                    <div className="flex-1 text-center">
                        <div className="">
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    className="w-full rounded-lg shadow-lg"
                                    alt="image"
                                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                                />
                            ) : (
                                <div className={
                                    cn(
                                        "flex flex-col items-center justify-center",
                                        roundImageClass
                                    )
                                }>
                                    <FileImageOutlined className="text-2xl text-neutral-400" />
                                    <p className="mt-2 text-sm text-neutral-500">Upload image</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="absolute inset-0 rounded-xl transition-colors group-hover:bg-black/10" aria-hidden="true"></div>
                    <Upload {...uploadProps}>
                        <div className="absolute start-2.5 top-2.5 z-20 flex cursor-pointer items-center gap-1 rounded-md bg-white p-1.5 pl-2 pr-2.5 text-xs font-medium text-black opacity-0 transition-opacity group-hover:opacity-100" title="Edit image">
                            <EditOutlined className="h-4 w-4" />
                            Edit
                        </div>
                    </Upload>
                    {imageUrl && (
                        <div
                            className="absolute end-1 top-1 z-20 flex cursor-pointer items-center gap-1 rounded-full bg-white p-1.5 text-xs text-black"
                            title="Delete image"
                            onClick={(e) => {
                                e.stopPropagation();
                                uploadProps.onRemove?.(fileList[0]);
                            }}
                        >
                            <CloseOutlined className="h-4 w-4 justify-center" />
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <Layout curActive={`/profile/me`}>
            <LoadingBackground loading={loading['get-my-profile']}>
                <main>
                    <Form
                        form={form}
                        name="profile_form"
                        style={formStyle}
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <div>
                            <div className="max-w-2xl">
                                <div className="flow-root">
                                    <div className="NcmazAccountPage-GeneralForm space-y-5 sm:space-y-6 md:sm:space-y-7">
                                        <div>
                                            <h2 className="text-xl font-semibold capitalize">Profile settings</h2>
                                            <span className="mt-2.5 block text-sm text-neutral-500 dark:text-neutral-400">Update your username and manage your account.</span>
                                        </div>
                                        <div className="w-24 border-b border-neutral-200 dark:border-neutral-700"></div>

                                        {/* Hidden fields */}
                                        <Form.Item name="id" hidden>
                                            <Input />
                                        </Form.Item>

                                        <Form.Item name="role" hidden>
                                            <Input />
                                        </Form.Item>

                                        {/* Profile Picture */}
                                        <div className="EditProfileForm__Profile-picture">
                                            <Form.Item label="Profile picture">
                                                <div className="mt-1.5 max-w-40">
                                                    {renderImageUpload(avatarFileList, avatarUploadProps, undefined, "py-12")}
                                                </div>
                                            </Form.Item>
                                        </div>

                                        {/* Cover Photo */}
                                        <div className="EditProfileForm__Cover-picture">
                                            <Form.Item label="Cover photo">
                                                <div className="mt-1.5 flex-1">
                                                    {renderImageUpload(coverFileList, coverUploadProps, undefined, "py-24")}
                                                </div>
                                            </Form.Item>
                                        </div>

                                        {/* Form Fields */}
                                        <Form.Item
                                            label="First Name"
                                            name="firstName"
                                            rules={[{ required: true, message: 'Please input your first name!' }]}
                                        >
                                            <Input
                                                placeholder="Enter your first name"
                                                size='large'
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label="Last Name"
                                            name="lastName"
                                            rules={[{ required: true, message: 'Please input your last name!' }]}
                                        >
                                            <Input
                                                placeholder="Enter your last name"
                                                size='large'
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label="Email"
                                            name="email"
                                            rules={[
                                                { required: true, message: 'Please input your email!' },
                                                { type: 'email', message: 'Please enter a valid email!' }
                                            ]}
                                        >
                                            <Input
                                                placeholder="Enter your email"
                                                size='large'
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label="Phone Number"
                                            name="phoneNumber"
                                        >
                                            <Input
                                                placeholder="Enter your phone number"
                                                size='large'
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label="Gender"
                                            name="gender"
                                        >
                                            <Select
                                                placeholder="Select your gender"
                                                size='large'
                                            >
                                                {
                                                    Object.keys(Gender)
                                                        .filter(x => isNaN(Number(x)))
                                                        .map(gender => {
                                                            const value = Gender[gender as keyof typeof Gender];
                                                            return (
                                                                <Option key={gender} value={value}>
                                                                    {gender}
                                                                </Option>
                                                            );
                                                        })
                                                }
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            label="Date of Birth"
                                            name="dateOfBirth"
                                        >
                                            <DatePicker
                                                className='w-54'
                                                format="YYYY-MM-DD"
                                                placeholder="Select your date of birth"
                                                size='large'
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label="Biographical Info"
                                            name="bio"
                                        >
                                            <div className='flex flex-col gap-y-2'>
                                                <span className="text-xs text-neutral-500 dark:text-neutral-400">Biographical Info, this will show up in the author page.</span>
                                                <TextArea
                                                    size='large'
                                                    className="block w-full rounded-xl border border-neutral-200 bg-white text-sm hover:ring hover:ring-primary-200/50 focus:border-primary-300 focus:ring focus:ring-primary-200/50 dark:border-neutral-600 dark:bg-transparent dark:hover:ring-primary-500/30 dark:focus:ring-primary-500/30 px-4 py-3 mt-1.5"
                                                    rows={5}
                                                    placeholder="Something about yourself in a few words"
                                                />
                                            </div>
                                        </Form.Item>

                                        <Form.Item
                                            label="Website"
                                            name="website"
                                        >
                                            <Input
                                                placeholder="yourwebsite.com"
                                                addonBefore={<GlobalIcon />}
                                                size="large"
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className="inline-flex pt-2">
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="relative inline-flex h-auto flex-shrink-0 items-center justify-center rounded-2xl border-transparent transition-colors bg-primary-700 hover:bg-primary-600 disabled:bg-primary-800 disabled:opacity-50 disabled:hover:bg-primary-700 text-primary-50 text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6"
                                        loading={loading['update-user']}
                                        disabled={loading['update-user']}
                                        size='large'
                                    >
                                        Update profile
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Form>

                    {/* Image Edit Modal */}
                    <ImageEditModal
                        visible={isImageEditModalVisible}
                        onCancel={handleImageEditCancel}
                        onSave={handleImageEditSave}
                        originalFile={currentEditFile}
                    />
                </main>
            </LoadingBackground>
        </Layout>
    );
}