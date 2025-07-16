'use client'

import React, { useState, useEffect } from 'react';
import {
    Card,
    Button,
    Input,
    Select,
    Space,
    Row,
    Col,
    Dropdown,
    message,
    Empty,
    Pagination,
    Tooltip,
    Image,
    Typography
} from 'antd';
import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    DownloadOutlined,
    MoreOutlined,
    AppstoreOutlined,
    BarsOutlined,
    FilterOutlined,
    CheckOutlined
} from '@ant-design/icons';
import { deleteImages, getServiceImages } from './api';
import moment from 'moment';
import { useApiLoadingStore } from '@/stores/loadingStore';
import Lottie from 'lottie-react';
import EditServiceImageForm from './EditForm';
import { useGlobalMessage } from '@/providers/messageProvider';
import { GalleryImage } from '@/types/image';
import Layout from '@/components/Layout';
import { ConfirmationModal } from '@/components/Modal/confirmation';

const { Option } = Select;
const { Title, Text } = Typography;

export default function GalleryManagement() {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [viewMode, setViewMode] = useState('grid');
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [currentEditImage, setCurrentEditImage] = useState(null);
    const [pageQuery, setPageQuery] = useState({ page: 1, pageSize: 10 });
    const [totalPage, setTotalPage] = useState(0);
    const [filterCategory, setFilterCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [includeDeleted, setIncludeDeleted] = useState(false);
    const { loading } = useApiLoadingStore();
    const [messageApi] = useGlobalMessage();
    const [bulkDeleteModal, setBulkDeleteModal] = useState(false);
    const [singleDeleteModal, setSingleDeleteModal] = useState(false);

    const categories = ['Nature', 'Architecture', 'Art', 'Portrait', 'Street', 'Abstract'];

    const onLoad = async () => {
        await getServiceImages({
            query: { ...pageQuery },
            searchTerm,
            includeDeleted
        }).then((res) => {
            if (res && res.data && res.data.items.length > 0) {
                setImages(res.data.items);
                setTotalPage(res.data.count ?? 0);
            }
        })
    }

    useEffect(() => {
        onLoad()
    }, [pageQuery]);

    const handlePaginationChange = (page: number, pageSize: number) => {
        setPageQuery({ pageSize, page });
    };

    const handleDelete = (type: "bulk" | "single", imageId?: string) => {
        if (type === "bulk") {
            if (selectedImages.length === 0) {
                message.warning('Please select images to delete');
                return;
            }
            setBulkDeleteModal(true)
        }
        else if (imageId) {
            setSingleDeleteModal(true);
            setSelectedImages([imageId]);
        }
    };

    const handleEdit = (image: any) => {
        setCurrentEditImage(image);
        setIsEditModalVisible(true);
    };

    const handleImageSelect = (imageId: string) => {
        setSelectedImages(prev =>
            prev.includes(imageId)
                ? prev.filter(id => id !== imageId)
                : [...prev, imageId]
        );
    };

    const handleSelectAll = () => {
        if (selectedImages.length === images.length && selectedImages.length > 0) {
            setSelectedImages([]);
        } else {
            images.map(item => {
                setSelectedImages(prev =>
                    !prev.includes(item.id)
                        ? [...prev, item.id] : [...prev]
                );
            })
        }
    };

    const getImageMenu = (image: any) => ({
        items: [
            {
                key: 'edit',
                icon: <EditOutlined />,
                label: 'Edit',
                onClick: () => handleEdit(image)
            },
            {
                key: 'download',
                icon: <DownloadOutlined />,
                label: 'Download',
                onClick: () => {
                    const link = document.createElement('a');
                    link.href = image.imageUrl;
                    link.download = image.imageName;
                    link.click();
                }
            },
            {
                key: 'delete',
                icon: <DeleteOutlined />,
                label: 'Delete',
                danger: true,
                onClick: () => handleDelete("single", image.id)
            }
        ]
    });

    return (
        <Layout curActive="/service/gallery">
            <main>
                <div style={{ marginBottom: '24px' }}>
                    <Title level={2} style={{ margin: 0 }}>
                        Gallery
                    </Title>
                    <Text type="secondary">
                        Manage and monitor images
                    </Text>
                </div>

                {/* Filters and Controls */}
                <Card style={{ marginBottom: '24px' }}>
                    <Row gutter={16} align="middle">
                        <Col flex="auto">
                            <Space size="middle">
                                <Input.Search
                                    placeholder="Search by title or tags..."
                                    style={{ width: 300 }}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    allowClear
                                />
                                <Select
                                    value={filterCategory}
                                    onChange={setFilterCategory}
                                    style={{ width: 150 }}
                                    prefix={<FilterOutlined />}
                                >
                                    <Option value="all">All Categories</Option>
                                    {categories.map(cat => (
                                        <Option key={cat} value={cat}>{cat}</Option>
                                    ))}
                                </Select>
                            </Space>
                        </Col>
                        <Col>
                            <Space>
                                <Space.Compact>
                                    <Button
                                        type={viewMode === 'grid' ? 'primary' : 'default'}
                                        icon={<AppstoreOutlined />}
                                        onClick={() => setViewMode('grid')}
                                    />
                                    <Button
                                        type={viewMode === 'list' ? 'primary' : 'default'}
                                        icon={<BarsOutlined />}
                                        onClick={() => setViewMode('list')}
                                    />
                                </Space.Compact>
                                {selectedImages.length > 0 && (
                                    <Button
                                        danger
                                        icon={<DeleteOutlined />}
                                        onClick={() => handleDelete("bulk")}
                                    >
                                        Delete Selected ({selectedImages.length})
                                    </Button>
                                )}
                                <Button onClick={handleSelectAll}>
                                    {selectedImages.length === images.length && selectedImages.length > 0 ? "Unselect All" : "Select All"}
                                </Button>
                                <Button type="primary" danger onClick={onLoad}>
                                    Reload
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                </Card>

                {/* Image Gallery */}
                {
                    loading['get-service-images'] ? (
                        <Lottie
                            animationData={require('../../../../../public/animations/loading.json')}
                            loop
                            className='w-1/4 h-1/4 mx-auto'
                        />
                    ) :
                        images.length === 0 ? (
                            <Card>
                                <Empty description="No images found" />
                            </Card>
                        ) : (
                            <>
                                {viewMode === 'grid' ? (
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                                        gap: '16px',
                                        alignItems: 'stretch' // This ensures all grid items have equal height
                                    }}>
                                        {images.map(image => (
                                            <div key={image.id} style={{ display: 'flex' }}>
                                                <Card
                                                    hoverable
                                                    style={{
                                                        position: 'relative',
                                                        border: '1px solid #d9d9d9',
                                                        width: '100%',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        height: '100%' // Takes full height of grid cell
                                                    }}
                                                    styles={{
                                                        body: {
                                                            padding: '16px',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            flexGrow: 1
                                                        }
                                                    }}
                                                    cover={
                                                        <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                                                            <Image
                                                                src={image.imageUrl}
                                                                alt={image.imageName}
                                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                                preview={{
                                                                    mask: <EyeOutlined />
                                                                }}
                                                            />
                                                            <div
                                                                style={{
                                                                    position: 'absolute',
                                                                    top: 8,
                                                                    left: 8,
                                                                    width: 20,
                                                                    height: 20,
                                                                    border: '2px solid #fff',
                                                                    borderRadius: '4px',
                                                                    borderColor: selectedImages.some(x => x === image.id) ? '#9929EA' : '#fff',
                                                                    background: selectedImages.some(x => x === image.id) ? '#9929EA' : 'transparent',
                                                                    cursor: 'pointer',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center'
                                                                }}
                                                                onClick={() => handleImageSelect(image.id)}
                                                            >
                                                                {selectedImages.some(x => x === image.id) && <CheckOutlined className='!text-white' />}
                                                            </div>
                                                            <Dropdown
                                                                menu={getImageMenu(image)}
                                                                trigger={['click']}
                                                                placement="bottomRight"
                                                            >
                                                                <Button
                                                                    type="text"
                                                                    icon={<MoreOutlined />}
                                                                    style={{
                                                                        position: 'absolute',
                                                                        top: 8,
                                                                        right: 8,
                                                                        background: 'rgba(255,255,255,0.9)'
                                                                    }}
                                                                />
                                                            </Dropdown>
                                                        </div>
                                                    }
                                                >
                                                    <div style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        height: '100%',
                                                        justifyContent: 'space-between'
                                                    }}>
                                                        <div>
                                                            <div style={{
                                                                fontSize: '16px',
                                                                fontWeight: '500',
                                                                marginBottom: '8px',
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                                whiteSpace: 'nowrap'
                                                            }}>
                                                                <Tooltip title={image.imageName}>{image.imageName}</Tooltip>
                                                            </div>
                                                            <Typography.Paragraph
                                                                ellipsis={{
                                                                    rows: 1,
                                                                    expanded: false
                                                                }}
                                                                style={{ margin: 0 }}
                                                            >{image.description}</Typography.Paragraph>
                                                        </div>

                                                        <div style={{
                                                            fontSize: '12px',
                                                            color: '#666',
                                                            marginTop: 'auto',
                                                            paddingTop: '8px'
                                                        }}>
                                                            Service: {image.serviceName}
                                                        </div>

                                                        <div style={{
                                                            fontSize: '12px',
                                                            color: '#666',
                                                            marginTop: 'auto',
                                                            paddingTop: '8px'
                                                        }}>
                                                            {moment(image.createdAt).format("YYYY-MM-DD HH:ss:mm")}
                                                        </div>
                                                    </div>
                                                </Card>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <Card>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            {images.map(image => (
                                                <div
                                                    key={image.id}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        padding: '12px',
                                                        border: '1px solid #f0f0f0',
                                                        borderRadius: '8px',
                                                        gap: 12
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            width: 20,
                                                            height: 20,
                                                            border: '2px solid',
                                                            borderRadius: '4px',
                                                            borderColor: selectedImages.some(x => x === image.id) ? '#9929EA' : '#d9d9d9',
                                                            background: selectedImages.some(x => x === image.id) ? '#9929EA' : 'transparent',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                        }}
                                                        onClick={() => handleImageSelect(image.id)}
                                                    >
                                                        {selectedImages.some(x => x === image.id) && <CheckOutlined className='!text-white' />}
                                                    </div>
                                                    <Image
                                                        src={image.imageUrl}
                                                        alt={image.imageName}
                                                        width={60}
                                                        height={60}
                                                        style={{ objectFit: 'cover', borderRadius: '4px', marginRight: '16px' }}
                                                    />
                                                    <div style={{ flex: 1 }}>
                                                        <h4 style={{ margin: 0, marginBottom: '4px' }}>{image.imageName}</h4>
                                                        <div style={{
                                                            fontSize: '12px',
                                                            color: '#666',
                                                        }}>
                                                            Service: {image.serviceName}
                                                        </div>
                                                        <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                                                            {moment(image.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                                                        </div>
                                                    </div>
                                                    <Dropdown menu={getImageMenu(image)} trigger={['click']}>
                                                        <Button type="text" icon={<MoreOutlined />} />
                                                    </Dropdown>
                                                </div>
                                            ))}
                                        </div>
                                    </Card>
                                )}

                                {/* Pagination */}
                                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                                    <Pagination
                                        current={pageQuery.page}
                                        pageSize={pageQuery.pageSize}
                                        total={totalPage}
                                        showSizeChanger={false}
                                        showQuickJumper
                                        showTotal={(total, range) =>
                                            `${range[0]}-${range[1]} of ${total} images`
                                        }
                                        onChange={handlePaginationChange}
                                    />
                                </div>
                            </>
                        )}


                {/* Edit Modal */}
                <EditServiceImageForm
                    isOpen={isEditModalVisible}
                    onClose={() => setIsEditModalVisible(false)}
                    messageApi={messageApi}
                    onReload={onLoad}
                    currentEditImage={currentEditImage}
                    loading={loading}
                />

                {/* Bulk Delete Modal */}
                <ConfirmationModal
                    open={bulkDeleteModal || singleDeleteModal}
                    onConfirm={async () => {
                        await deleteImages(selectedImages).then(() => {
                            setBulkDeleteModal(false);
                            setSingleDeleteModal(false);
                            setSelectedImages([]);
                            onLoad();
                        })
                    }}
                    onCancel={() => {
                        if (singleDeleteModal && selectedImages.length === 1) setSelectedImages([]);
                        setBulkDeleteModal(false);
                        setSingleDeleteModal(false);
                    }}
                    title={`Delete ${singleDeleteModal ? 'image' : `${selectedImages.length} images`}?`}
                    content={`This action cannot be undone. ${singleDeleteModal ? "The image will be permanently deleted." : "All selected images will be permanently deleted."}`}
                    confirmText={`Delete ${bulkDeleteModal ? "All" : ""}`}
                    cancelText="Cancel"
                    type="error"
                    danger={true}
                    loading={loading["delete-service-images"]}
                />
            </main>
        </Layout>
    );
}