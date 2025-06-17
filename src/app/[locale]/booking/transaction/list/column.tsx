import { PaymentMethod } from '@/enums/paymentMethod';
import { PaymentStatus } from '@/enums/paymentStatus';
import { Transaction } from '@/types/transaction';
import { stringToColor } from '@/utils/color';
import { formatter } from '@/utils/currency';
import { Space, Tag, type TableProps } from 'antd';

const getColumns = (): TableProps<Transaction>['columns'] => [
    {
        title: 'Code',
        dataIndex: 'transactionCode',
        key: 'transactionCode',
        render: (text) => `#${text}`,
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        fixed: 'right',
        render: (amount) => formatter().format(amount.toFixed(2)),
    },
    {
        title: 'Method',
        dataIndex: 'method',
        key: 'method',
        render: (method) => (
            <Tag color={stringToColor(PaymentMethod[method])}>
                {PaymentMethod[method].toUpperCase()}
            </Tag>
        ),
        align: 'center',
        width: '12%'
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status) => (
            <Tag color={stringToColor(PaymentStatus[status])}>
                {PaymentStatus[status].toUpperCase()}
            </Tag>
        ),
        align: 'center',
        width: '12%'
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
            </Space>
        ),
    },
];

export {
    getColumns
}