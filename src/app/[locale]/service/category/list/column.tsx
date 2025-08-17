import { EditFilled, DeleteFilled } from '@ant-design/icons';
import { Popconfirm, Space, Tag, type TableProps } from 'antd';

interface DataType {
    id: string;
    name: string;
    isActive: boolean;
    priority: number;
    createdAt: Date;
    updatedAt: Date;
}

const getColumns = (onDelete: (id: string) => void, loading: boolean): TableProps<DataType>['columns'] => [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
    },
    {
        title: 'Priority',
        dataIndex: 'priority',
        key: 'priority',
        fixed: 'right'
    },
    {
        title: 'Status',
        dataIndex: 'isActive',
        key: 'isActive',
        render: (isActive) => (
            <Tag color={isActive ? 'green' : 'volcano'}>
                {isActive ? 'ACTIVE' : 'INACTIVE'}
            </Tag>
        )
    },
    {
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (date) => new Date(date).toDateString(),
    },
    {
        title: 'Updated At',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        render: (date) => new Date(date).toDateString(),
    },
    {
        title: 'Actions',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a href={`/service/category/${record.id}/edit`}>
                    <EditFilled style={{ color: '#E43636' }} />
                </a>
                <Popconfirm
                    title={`Are you sure to delete the category - ${record.name}?`}
                    onConfirm={() => onDelete(record.id)}
                    okText="Yes"
                    okButtonProps={{ loading: loading, disabled: loading }}
                    cancelText="No"
                >
                    <DeleteFilled style={{ color: '#E43636' }} />
                </Popconfirm>
            </Space>
        ),
    },
];

export {
    getColumns
}