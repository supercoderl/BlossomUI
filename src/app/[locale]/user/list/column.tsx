import { UserRoles } from '@/enums/userRoles';
import { UserStatus } from '@/enums/userStatus';
import { TechnicianInfo, UserInfo } from '@/types/user';
import { stringToColor } from '@/utils/color';
import { Space, Tag, type TableProps } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';

const columns: TableProps<UserInfo>['columns'] = [
    {
        title: '',
        dataIndex: 'avatarUrl',
        key: 'avatarUrl',
        align: 'center',
        render: (url) => (
            <img
                src={url}
                alt="avatar"
                style={{ width: 32, height: 32, borderRadius: '50%' }}
            />
        ),
        width: 60
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (_, record) => <a>{record.firstName} {record.lastName}</a>,
        fixed: 'left',
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        render: role => (
            <Tag color={stringToColor(UserRoles[role].toUpperCase() || 'UNKNOW')}>
                {UserRoles[role].toUpperCase() || 'UNKNOW'}
            </Tag>
        ),
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Phone Number',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
    },
    {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: (status) => (
            <Tag color={status === UserStatus.Active ? 'green' : 'volcano'}>
                {UserStatus[status].toUpperCase()}
            </Tag>
        ),
    },
    {
        title: 'Actions',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a href={`/user/${record.id}/edit`}>
                    <EditFilled style={{ color: '#E43636' }} />
                </a>
                <a>
                    <DeleteFilled style={{ color: '#E43636' }} />
                </a>
            </Space>
        ),
    },
];

const technicianColumns: TableProps<TechnicianInfo>['columns'] = [
    {
        title: 'Bio',
        dataIndex: 'bio',
        key: 'bio',
        width: '40%',
        ellipsis: true
    },
    {
        title: 'Experience Years',
        dataIndex: 'yearsOfExperience',
        key: 'yearsOfExperience',
    },
    {
        title: 'Rating',
        dataIndex: 'rating',
        key: 'rating',
    }
];

export {
    columns,
    technicianColumns
}