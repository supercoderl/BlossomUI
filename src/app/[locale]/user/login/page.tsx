'use client'
import { Button, DatePicker, Divider, Form, Input, Segmented, Select, type FormProps } from 'antd';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginApi, registerApi } from '../api';
import {
    GoogleOutlined,
    FacebookOutlined,
    GithubOutlined,
    TwitterOutlined,
    LinkedinOutlined
} from '@ant-design/icons';
import styles from './index.module.css';
import moment from 'moment';
import { useApiLoadingStore } from '@/stores/loadingStore';
import { useGlobalMessage } from '@/providers/messageProvider';
import { Gender } from '@/enums/gender';
import { setRefreshTokenCookie, setTokenCookie, setUserInfo } from '@/utils/cookie';

type FieldType = {
    email?: string;
    pwd?: string;
    code?: string;
    remember?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    gender?: Gender;
    dateOfBirth?: string;
};

const mode = ['Login', 'Register'];

export default function Home() {
    const [curMode, setCurMode] = useState(mode[0]);
    const [form] = Form.useForm();
    const router = useRouter();
    const { loading } = useApiLoadingStore();
    const [messageApi] = useGlobalMessage();

    const onFinish: FormProps<FieldType>["onFinish"] = async (values: any) => {
        try {
            if (curMode === mode[0]) {
                const { email, pwd } = values;
                await loginApi(email, pwd).then(res => {
                    // login logic
                    if (res.data) {
                        setTokenCookie(res.data.accessToken);
                        setRefreshTokenCookie(res.data.refreshToken);
                        setUserInfo(res.data.userInfo);
                        router.push('/dashboard');
                    }
                });
                return;
            }

            if (curMode === mode[1]) {
                const { email, pwd, firstName, lastName, phoneNumber, gender, dateOfBirth } = values;
                await registerApi(email, pwd, firstName, lastName, phoneNumber, gender, dateOfBirth).then(res => {
                    // register logic
                    messageApi.success("Registration successful, please log in");
                    setCurMode(mode[0]);
                    form.resetFields();
                })
            }
        } catch (error: any) {
            console.error('Login/Register error:', error);
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
    };

    const handleSocialLogin = (provider: string) => {
        // Implement your social login logic here
        console.log(`Login with ${provider}`);

        // Example implementation:
        // setLoading(prev => ({ ...prev, [provider]: true }));
        // 
        // try {
        //     // Your social login API call
        //     await socialLogin(provider);
        // } catch (error) {
        //     console.error(`${provider} login failed:`, error);
        // } finally {
        //     setLoading(prev => ({ ...prev, [provider]: false }));
        // }
    };

    return (
        <main className={styles.loginWrap}>
            <div className={styles.leftBanner}>
                <span className={styles.logo}>
                    <img className="w-full" src="/logo.png" alt="Admin Logo" />
                </span>
                <h2>Blossom Nails for management</h2>
                <div style={{ textAlign: 'center' }}>Ready to use • Next front-end and back-end are isomorphic • Digitalization • Aggregation of industry best practices</div>
                <div className={styles.banner}><img src="/logo_bg.svg" alt="" /></div>
            </div>
            <div className={styles.content}>
                <div className={styles.innerContent}>
                    <h1>Welcome to Blossom management system</h1>
                    <Segmented<string>
                        options={mode}
                        size="large"
                        onChange={(value) => {
                            setCurMode(value);
                            form.resetFields();
                        }}
                    />
                    <Form
                        name="basic"
                        className={styles.form}
                        wrapperCol={{ span: 24 }}
                        form={form}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        {
                            curMode === mode[0] ?
                                <>
                                    <Form.Item<FieldType>
                                        name="email"
                                        rules={[
                                            {
                                                type: 'email',
                                                message: 'The email address is illegal!',
                                            },
                                            {
                                                required: true,
                                                message: 'Please enter your email',
                                            },
                                        ]}
                                    >
                                        <Input placeholder='Please enter your email' size='large' variant="filled" />
                                    </Form.Item>

                                    <Form.Item<FieldType>
                                        name="pwd"
                                        rules={[{ required: true, message: 'Please enter password' }]}
                                    >
                                        <Input.Password size='large' placeholder='Please enter password' variant="filled" />
                                    </Form.Item>

                                    <Form.Item wrapperCol={{ span: 24 }}>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            block
                                            size='large'
                                            loading={loading['login']}
                                            disabled={loading['login']}
                                        >
                                            Log in
                                        </Button>
                                    </Form.Item>

                                    {/* Divider */}
                                    <Form.Item wrapperCol={{ span: 24 }}>
                                        <Divider style={{ margin: '24px 0' }}>
                                            <span style={{ color: '#999', fontSize: '14px' }}>Or continue with</span>
                                        </Divider>
                                    </Form.Item>

                                    {/* Social Login Buttons */}
                                    <Form.Item wrapperCol={{ span: 24 }}>
                                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                            <Button
                                                icon={<GoogleOutlined />}
                                                size="large"
                                                style={{
                                                    flex: 1,
                                                    minWidth: '120px',
                                                    background: 'linear-gradient(135deg, #34a853 25%, #ea4335 75%)',
                                                    color: 'white',
                                                    fontWeight: '600',
                                                    boxShadow: '0 4px 12px rgba(66, 133, 244, 0.3)',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                loading={loading['google']}
                                                disabled={loading['google']}
                                                onClick={() => handleSocialLogin('google')}
                                            >
                                                Google
                                            </Button>
                                            <Button
                                                icon={<FacebookOutlined />}
                                                size="large"
                                                style={{
                                                    flex: 1,
                                                    minWidth: '120px',
                                                    background: 'linear-gradient(135deg, #1877f2 0%, #42a5f5 100%)',
                                                    color: 'white',
                                                    fontWeight: '600',
                                                    boxShadow: '0 4px 12px rgba(24, 119, 242, 0.3)',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                loading={loading['facebook']}
                                                disabled={loading['facebook']}
                                                onClick={() => handleSocialLogin('facebook')}
                                            >
                                                Facebook
                                            </Button>
                                            <Button
                                                icon={<GithubOutlined />}
                                                size="large"
                                                style={{
                                                    flex: 1,
                                                    minWidth: '120px',
                                                    background: 'linear-gradient(135deg, #24292e 100%, #6f42c1 0%)',
                                                    color: 'white',
                                                    fontWeight: '600',
                                                    boxShadow: '0 4px 12px rgba(36, 41, 46, 0.3)',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                loading={loading['github']}
                                                disabled={loading['github']}
                                                onClick={() => handleSocialLogin('github')}
                                            >
                                                GitHub
                                            </Button>
                                        </div>
                                    </Form.Item>
                                </> :
                                <>
                                    <div className='flex items-center gap-4' style={{ gap: 8 }}>
                                        <Form.Item<FieldType>
                                            className='w-full'
                                            name="firstName"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter your first name',
                                                },
                                                {
                                                    min: 2,
                                                    message: 'First name must be at least 2 characters',
                                                },
                                            ]}
                                        >
                                            <Input
                                                placeholder='Enter your first name'
                                                size='large'
                                                variant="filled"
                                            />
                                        </Form.Item>

                                        <Form.Item<FieldType>
                                            name="lastName"
                                            className='w-full'
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter your last name',
                                                },
                                                {
                                                    min: 2,
                                                    message: 'Last name must be at least 2 characters',
                                                },
                                            ]}
                                        >
                                            <Input placeholder='Enter your last name' size='large' variant="filled" />
                                        </Form.Item>
                                    </div>

                                    <div className='flex items-center gap-4' style={{ gap: 8 }}>
                                        <Form.Item<FieldType>
                                            className='w-full'
                                            name="email"
                                            rules={[
                                                {
                                                    type: 'email',
                                                    message: 'The email address is invalid!',
                                                },
                                                {
                                                    required: true,
                                                    message: 'Please enter your email address',
                                                },
                                            ]}
                                        >
                                            <Input placeholder='Enter your email address' size='large' variant="filled" />
                                        </Form.Item>

                                        <Form.Item<FieldType>
                                            className='w-full'
                                            name="phoneNumber"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter your phone number',
                                                },
                                                {
                                                    pattern: /^[\+]?[1-9][\d]{0,15}$/,
                                                    message: 'Please enter a valid phone number',
                                                },
                                            ]}
                                        >
                                            <Input placeholder='Enter your phone number' size='large' variant="filled" />
                                        </Form.Item>
                                    </div>

                                    <Form.Item<FieldType>
                                        className='w-full'
                                        name="pwd"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter password',
                                            },
                                            {
                                                min: 8,
                                                message: 'Password must be at least 8 characters',
                                            },
                                            {
                                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                                                message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
                                            },
                                        ]}
                                    >
                                        <Input.Password size='large' placeholder='Password' variant="filled" />
                                    </Form.Item>

                                    <div className='flex items-center gap-4' style={{ gap: 8 }}>
                                        <Form.Item<FieldType>
                                            className='w-full'
                                            name="gender"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please select your gender',
                                                },
                                            ]}
                                        >
                                            <Select placeholder='Select your gender' size='large' variant="filled">
                                                {Object.entries(Gender)
                                                    .filter(([key, value]) => isNaN(Number(key)))
                                                    .map(([key, value]) => (
                                                        <Select.Option key={key} value={value}>{key}</Select.Option>
                                                    ))
                                                }
                                            </Select>
                                        </Form.Item>

                                        <Form.Item<FieldType>
                                            className='w-full'
                                            name="dateOfBirth"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please select your birth date',
                                                },
                                            ]}
                                        >
                                            <DatePicker
                                                placeholder='Select your birth date'
                                                size='large'
                                                variant="filled"
                                                style={{ width: '100%' }}
                                                disabledDate={(current) => current && current > moment().subtract(13, 'years')}
                                                format="DD-MM-YYYY"
                                            />
                                        </Form.Item>
                                    </div>

                                    <Form.Item wrapperCol={{ span: 24 }}>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            block
                                            size='large'
                                            loading={loading['register']}
                                            disabled={loading['register']}
                                        >
                                            Register
                                        </Button>
                                    </Form.Item>
                                </>
                        }
                    </Form>
                </div>
            </div>
        </main>
    );
}
