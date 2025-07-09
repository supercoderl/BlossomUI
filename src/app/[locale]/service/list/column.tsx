import { formatter } from '@/utils/currency';
import { Popconfirm, Space, type TableProps } from 'antd';

interface DataType {
    id: string;
    name: string;
    descripton?: string | null;
    price: number;
    representativeImage: string;
    createdAt: Date;
}

const getColumns = (onDelete: (id: string) => void, loading: boolean, onUpload: (id: string) => void): TableProps<DataType>['columns'] => [
    {
        title: '',
        dataIndex: 'representativeImage',
        key: 'representativeImage',
        align: 'center',
        render: (url) => (
            <img
                src={url}
                alt="representativeImage"
                style={{ width: 32, height: 32, borderRadius: '50%' }}
            />
        ),
        width: 60
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        width: '30%',
        ellipsis: true,
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        width: 120,
        render: (price) => formatter().format(price.toFixed(2)),
    },
    {
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (date) => new Date(date).toDateString(),
    },
    {
        title: 'Actions',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a href={`/service/${record.id}/edit`}>Edit</a>
                <Popconfirm
                    title={`Are you sure to delete the service - ${record.name}?`}
                    onConfirm={() => onDelete(record.id)}
                    okText="Yes"
                    okButtonProps={{ loading: loading, disabled: loading }}
                    cancelText="No"
                >
                    <a>Delete</a>
                </Popconfirm>
                <a onClick={() => onUpload(record.id)}>Upload</a>
            </Space>
        ),
    },
];

export {
    getColumns
}