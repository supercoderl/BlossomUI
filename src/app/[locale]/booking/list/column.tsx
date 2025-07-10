import { BookingStatus } from '@/enums/bookingStatus';
import { stringToColor } from '@/utils/color';
import { formatter } from '@/utils/currency';
import { Space, Tag, type TableProps } from 'antd';

interface DataType {
    id: string;
    scheduleTime: Date;
    totalPrice: number;
    status: BookingStatus;
    note?: string | null;
    updatedAt: Date;
}

const getColumns = (): TableProps<DataType>['columns'] => [
    {
        title: 'Time',
        dataIndex: 'scheduleTime',
        key: 'scheduleTime',
        render: (date) => new Date(date).toLocaleString(),
    },
    {
        title: 'Price',
        dataIndex: 'totalPrice',
        key: 'totalPrice',
        fixed: 'right',
        render: (price) => formatter().format(price.toFixed(2)),
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status) => <Tag color={stringToColor(BookingStatus[status])}>{BookingStatus[status]}</Tag>,
        align: 'center',
        width: 120
    },
    {
        title: 'Note',
        dataIndex: 'note',
        key: 'note',
        width: '30%',
        ellipsis: true
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
                <a href={`/booking/${record.id}/edit`}>View details</a>
            </Space>
        ),
    },
];

export {
    getColumns
}