import { Space, Tag, Tooltip, Badge, type TableProps } from 'antd';
import { EditFilled, ExclamationCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Contact } from '@/types/contact';
import Link from 'next/link';

// Alternative version with row styling for better visual indication
const columnsWithRowStyling: TableProps<Contact>['columns'] = [
    {
        title: '',
        dataIndex: 'avatarUrl',
        key: 'avatarUrl',
        align: 'center',
        render: (url, record) => (
            <Badge 
                dot={!record.hasResponse} 
                color="#ff4d4f"
                offset={[-5, 5]}
            >
                <img
                    src="/dummy.webp"
                    alt="avatar"
                    style={{ 
                        width: 32, 
                        height: 32, 
                        borderRadius: '50%',
                        opacity: record.hasResponse ? 1 : 0.8
                    }}
                />
            </Badge>
        ),
        width: 60
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
        render: (name: string, record) => (
            <Tooltip title={name} align={{ offset: [0, 10] }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Link 
                        href={`${encodeURIComponent(btoa(record.email))}/response`}
                        style={{ 
                            fontWeight: record.hasResponse ? 'normal' : 'bold',
                            color: record.hasResponse ? 'inherit' : '#1890ff'
                        }}
                    >
                        {name}
                    </Link>
                </div>
            </Tooltip>
        ),
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        ellipsis: true,
        render: (email: string) => <Tooltip title={email}>{email}</Tooltip>,
    },
    {
        title: 'Message',
        dataIndex: 'message',
        key: 'message',
        width: '40%',
        render: (message: string, record) => (
            <div style={{ 
                fontStyle: record.hasResponse ? 'normal' : 'italic',
                color: record.hasResponse ? 'inherit' : '#595959'
            }}>
                {message}
            </div>
        )
    },
    {
        title: 'Status',
        dataIndex: 'hasResponse',
        key: 'status',
        align: 'center',
        render: (hasResponse: boolean) => (
            hasResponse ? (
                <Tag 
                    icon={<CheckCircleOutlined />} 
                    color="success"
                >
                    ✓
                </Tag>
            ) : (
                <Tag 
                    icon={<ExclamationCircleOutlined />} 
                    color="error"
                    style={{ animation: 'pulse 2s infinite' }}
                >
                    !
                </Tag>
            )
        ),
        filters: [
            { text: 'Needs Response', value: false },
            { text: 'Responded', value: true },
        ],
        onFilter: (value, record) => record.hasResponse === value,
        width: 120
    },
    {
        title: 'Actions',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                {!record.hasResponse && (
                    <Tooltip title="Click to respond">
                        <Link href={`${encodeURIComponent(btoa(record.email))}/response`}>
                            <Tag 
                                color="volcano" 
                                style={{ 
                                    cursor: 'pointer', 
                                    margin: 0,
                                    fontWeight: 'bold'
                                }}
                            >
                                RESPOND
                            </Tag>
                        </Link>
                    </Tooltip>
                )}
            </Space>
        ),
        width: 120
    },
];

// CSS for pulse animation (add this to your global CSS file)
const pulseCSS = `
@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
`;

// Usage in your table component:
// <Table 
//   columns={columns} 
//   dataSource={contacts}
//   rowClassName={(record) => !record.hasResponse ? 'pending-response-row' : ''}
// />

// Add this CSS for row styling:
const additionalCSS = `
.pending-response-row {
  background-color: #fff7e6 !important;
  border-left: 3px solid #faad14;
}

.pending-response-row:hover {
  background-color: #fff1b8 !important;
}
`;

export {
    columnsWithRowStyling,
    pulseCSS,
    additionalCSS
}