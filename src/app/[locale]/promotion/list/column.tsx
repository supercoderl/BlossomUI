import { DiscountType } from '@/enums/discountType';
import { formatter } from '@/utils/currency';
import { Popconfirm, Space, type TableProps } from 'antd';

interface DataType {
    id: string;
    code: string;
    descripton?: string | null;
    discountType: DiscountType;
    discountValue: number;
    minimumSpend: number;
    startDate: Date;
    endDate: Date;
    maxUsage: number;
    currentUsage: number;
    isActive: boolean;
}

const getColumns = (onDelete: (id: string) => void, loading: boolean): TableProps<DataType>['columns'] => [
    {
        title: 'Code',
        dataIndex: 'code',
        key: 'code'
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        width: '30%',
        ellipsis: true,
    },
    {
        title: 'Type',
        dataIndex: 'discountType',
        key: 'discountType',
        render: (type) => DiscountType[type],
    },
    {
        title: 'Start',
        dataIndex: 'startDate',
        key: 'startDate',
        render: (date) => new Date(date).toDateString(),
    },
    {
        title: 'End',
        dataIndex: 'endDate',
        key: 'endDate',
        render: (date) => new Date(date).toDateString(),
    },
    {
        title: 'Usage',
        dataIndex: 'currentUsage',
        key: 'currentUsage'
    },
    {
        title: 'Actions',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a href={`/promotion/${record.id}/edit`}>Edit</a>
                <Popconfirm
                    title={`Are you sure to delete the promotion - ${record.code}?`}
                    onConfirm={() => onDelete(record.id)}
                    okText="Yes"
                    okButtonProps={{ loading: loading, disabled: loading }}
                    cancelText="No"
                >
                    <a>Delete</a>
                </Popconfirm>
            </Space>
        ),
    },
];

export {
    getColumns
}