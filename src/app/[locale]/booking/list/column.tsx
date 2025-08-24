import { BookingStatus } from '@/enums/bookingStatus';
import { stringToColor } from '@/utils/color';
import { formatter } from '@/utils/currency';
import { Button, Space, Tag, type TableProps } from 'antd';
import { CheckOutlined, CloseOutlined, EyeOutlined } from '@ant-design/icons';

interface DataType {
    id: string;
    scheduleTime: Date;
    totalPrice: number;
    status: BookingStatus;
    note?: string | null;
    updatedAt: Date;
}

const getColumns = (onChangeStatus: (id: string, status: BookingStatus) => void, loading: Record<string, boolean>): TableProps<DataType>['columns'] => [
    {
        title: 'Time',
        dataIndex: 'scheduleTime',
        key: 'scheduleTime',
        render: (date) => new Date(date).toLocaleString(),
        width: '20%'
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
        render: (status) => <Tag color={stringToColor("booking_status_" + BookingStatus[status])}>{BookingStatus[status]}</Tag>,
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
                <Button
                    type="text"
                    href='`/booking/${record.id}/edit`'
                    disabled={loading['update-booking-status']}
                    className='!p-2'
                >
                    <EyeOutlined />
                </Button>
                <Button
                    type="text"
                    onClick={() => onChangeStatus(record.id, BookingStatus.Confirmed)}
                    disabled={loading['update-booking-status'] || record.status !== BookingStatus.Pending}
                    className='!p-2'
                >
                    <CheckOutlined className='!text-[#DC3C22]' />
                </Button>
                <Button
                    type="text"
                    onClick={() => onChangeStatus(record.id, BookingStatus.Canceled)}
                    disabled={loading['update-booking-status'] || record.status !== BookingStatus.Pending}
                    className='!p-2'
                >
                    <CloseOutlined className='!text-[#687FE5]' />
                </Button>
            </Space>
        ),
    },
];

export {
    getColumns
}