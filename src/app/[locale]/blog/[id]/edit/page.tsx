'use client';
import { Form, Input, Select, Upload, Button, message, Row, Col, DatePicker } from 'antd';
import { UploadOutlined, SaveOutlined } from '@ant-design/icons';
import { theme } from 'antd';
import { useParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import type { UploadFile, UploadProps } from 'antd';
import Layout from '@/components/Layout';
import { useGlobalMessage } from '@/providers/messageProvider';
import { useApiLoadingStore } from '@/stores/loadingStore';
import LoadingBackground from '@/components/Loading';
import { getBlogById, updateBlog } from '../../api';
import { BlogFormData } from '@/types/blog';
import QuillEditor from '@/components/Editor/Editor';
import moment from 'moment';

const { Option } = Select;

export default function BlogEditor() {
    const { token } = theme.useToken();
    const [form] = Form.useForm();
    const { id } = useParams();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [messageApi] = useGlobalMessage();
    const { loading } = useApiLoadingStore();
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    const formStyle: React.CSSProperties = {
        maxWidth: 'none',
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 24,
    };

    const onLoad = async () => {
        try {
            await getBlogById(id as string).then((res: any) => {
                if (res && res.success) {
                    form.setFieldsValue({
                        blogId: res.data.id,
                        title: res.data.title,
                        slug: res.data.slug,
                        content: res.data.content,
                        tags: res.data.tags,
                        publishedAt: moment(res.data.publishedAt),
                        isPublished: res.data.isPublished,
                    });

                    if (res.data.thumbnailUrl) {
                        setFileList([{
                            uid: '-1',
                            name: res.data.thumbnailUrl,
                            status: 'done',
                            url: res.data.thumbnailUrl,
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

    const onFinish = async (values: BlogFormData) => {
        try {
            // Prepare form data for API submission
            const formData = new FormData();
            formData.append('BlogId', values.blogId ?? '');
            formData.append('Title', values.title);
            formData.append('Slug', values.slug);
            formData.append('Content', values.content);
            formData.append('Tags', values.tags);
            formData.append('PublishedAt', values.publishedAt.toISOString());
            formData.append('IsPublished', values.isPublished ? 'True' : 'False');

            // Add image file if selected
            if (fileList.length > 0 && fileList[0].originFileObj) {
                formData.append('Thumbnail', fileList[0].originFileObj);
            }

            // Array.from(formData.entries()).forEach(([key, value]) => {
            //     console.log(`${key}: ${value}`);
            // });

            await updateBlog(formData).then((res: any) => {
                if (res && res.success) {
                    messageApi.success('Blog saved successfully');
                }
            });
        } catch (error) {
            message.error('Failed to save blog');
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

    // Watch title's value and update slug accordingly
    useEffect(() => {
        return () => {
            if (debounceTimer.current) clearTimeout(debounceTimer.current);
        };
    }, []);

    const handleValuesChange = (changedValues: any, allValues: any) => {
        if ('title' in changedValues) {
            const title = changedValues.title || '';
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
            debounceTimer.current = setTimeout(() => {
                const slug = title
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/[^a-z0-9\s-]/g, '')
                    .trim()
                    .replace(/\s+/g, '-');
                form.setFieldsValue({ slug });
            }, 500);
        }
    };

    return (
        <Layout curActive={`/blog/${id}/edit`}>
            <LoadingBackground loading={loading['get-blog-by-id']}>
                <main>
                    <Form
                        form={form}
                        name="blog_editor"
                        style={formStyle}
                        onFinish={onFinish}
                        layout="vertical"
                        initialValues={{
                            blogUd: id,
                        }}
                    >
                        <Row gutter={24}>
                            <Col span={24} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <h2 style={{ marginBottom: 24 }}>
                                    Edit Blog
                                </h2>
                                <Button onClick={() => window.history.back()} type="primary">
                                    Back
                                </Button>
                            </Col>
                        </Row>

                        <Row gutter={24}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="title"
                                    label="Title"
                                    rules={[
                                        { required: true, message: 'Please enter title!' }
                                    ]}
                                >
                                    <Input placeholder="Enter title" />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="slug"
                                    label="Slug"
                                    rules={[
                                        { required: true, message: 'Please enter slug!' }
                                    ]}
                                >
                                    <Input placeholder="Enter URL slug" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={24}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="tags"
                                    label="Tags"
                                    rules={[{ required: true, message: 'Please enter tags!' }]}
                                >
                                    <Input placeholder="Enter tags (separated by commas)" />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="isPublished"
                                    label="Status"
                                >
                                    <Select placeholder="Select status">
                                        <Option value={true}>Published</Option>
                                        <Option value={false}>Draft</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={24}>
                            <Col span={24}>
                                <Form.Item
                                    name="content"
                                    label="Content"
                                    rules={[
                                        { required: true, message: 'Please enter content!' }
                                    ]}
                                >
                                    {/* Replace TextArea with our Rich Text Editor */}
                                    <QuillEditor />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={24}>
                            <Col span={24}>
                                <Form.Item
                                    name="thumbnailUrl"
                                    label="Thumbnail"
                                    extra="Upload an image to represent this blog. Supported formats: JPG, PNG, GIF. Max size: 10MB."
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

                                <Form.Item
                                    label="Publish Date"
                                    name="publishedAt"
                                >
                                    <DatePicker
                                        className='w-54'
                                        format="YYYY-MM-DD"
                                        placeholder="Select publish date"
                                        size='large'
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        {/* Hidden field for BlogId */}
                        <Form.Item name="blogId" hidden>
                            <Input />
                        </Form.Item>

                        <Row gutter={24}>
                            <Col span={24}>
                                <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        loading={loading['update-blog']}
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