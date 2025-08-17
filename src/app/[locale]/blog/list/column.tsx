import { Popconfirm, Space, type TableProps } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { Blog } from '@/types/blog';

const getColumns = (
    onDelete: (id: string) => void,
    loading: boolean
): TableProps<Blog>['columns'] => [
        {
            title: '',
            dataIndex: 'thumbnailUrl',
            key: 'thumbnailUrl',
            align: 'center',
            render: (url) => (
                <img
                    src={url}
                    alt="thumbnailUrl"
                    style={{ height: 60 }}
                />
            ),
            width: 80
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            fixed: 'left',
            ellipsis: true
        },
        {
            title: 'Content',
            dataIndex: 'content',
            key: 'content',
            width: '30%',
            ellipsis: true,
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            key: 'tags'
        },
        {
            title: 'Published At',
            dataIndex: 'publishedAt',
            key: 'publishedAt',
            render: (date) => new Date(date).toDateString(),
        },
        {
            title: 'Actions',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a href={`/blog/${record.id}/edit`}>
                        <EditFilled style={{ color: '#E43636' }} />
                    </a>
                    <Popconfirm
                        title={`Are you sure to delete the blog - ${record.title}?`}
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