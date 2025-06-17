import { Avatar, Button, Popconfirm, Rate, Space, Typography } from "antd";
const { Text } = Typography;
import {
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
    UserOutlined,
    CalendarOutlined
} from '@ant-design/icons';

const getColumn = (
    getRatingColor: (rating: number) => string,
    handleView: (record: any) => void,
    handleEdit: (record: any) => void,
    handleDelete: (id: any) => void
) => [
        {
            title: 'Customer',
            dataIndex: 'customerName',
            key: 'customer',
            render: (name: any, record: any) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Avatar size="small" icon={< UserOutlined />} />
                    < div >
                        <div style={{ fontWeight: 500 }}> {name} </div>
                        < Text type="secondary" style={{ fontSize: '12px' }}>
                            {record.customerEmail}
                        </Text>
                    </div>
                </div>
            ),
        },
        {
            title: 'Product',
            dataIndex: 'productName',
            key: 'product',
            render: (product: any, record: any) => (
                <div>
                    <div style={{ fontWeight: 500 }
                    }> {product} </div>
                    < Text type="secondary" style={{ fontSize: '12px' }}>
                        {record.productId}
                    </Text>
                </div>
            ),
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            render: (rating: any) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }
                }>
                    <Rate disabled defaultValue={rating} style={{ fontSize: '14px' }} />
                    < Text style={{ color: getRatingColor(rating), fontWeight: 500 }}>
                        {rating} / 5
                    </Text>
                </div>
            ),
            sorter: (a: any, b: any) => a.rating - b.rating,
        },
        {
            title: 'Review',
            dataIndex: 'title',
            key: 'title',
            render: (title: any, record: any) => (
                <div style={{ maxWidth: 200 }
                }>
                    <div style={{ fontWeight: 500, marginBottom: 2 }}> {title} </div>
                    < Text type="secondary" style={{ fontSize: '12px' }}>
                        {record.comment?.substring(0, 60)}...
                    </Text>
                </div>
            ),
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'date',
            render: (date: any) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }
                }>
                    <CalendarOutlined style={{ color: '#999' }} />
                    < Text > {date} </Text>
                </div>
            ),
            sorter: (a: any, b: any) => new Date(a?.createdAt ?? new Date()).getTime() - new Date(b.createdAt).getTime(),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: any) => (
                <Space>
                    <Button
                        type="text"
                        icon={< EyeOutlined />}
                        onClick={() => handleView(record)}
                        title="View Details"
                    />
                    <Button
                        type="text"
                        icon={< EditOutlined />}
                        onClick={() => handleEdit(record)}
                        title="Edit Status"
                    />
                    <Popconfirm
                        title="Are you sure you want to delete this review?"
                        onConfirm={() => handleDelete(record.id)}
                    >
                        <Button
                            type="text"
                            danger
                            icon={< DeleteOutlined />}
                            title="Delete Review"
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

export { getColumn };