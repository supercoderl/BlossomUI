'use client';

import { Card, Table, Typography, Progress } from 'antd';
import AvaForm from './AvaForm';
import { getColumns } from './column';
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import { useApiLoadingStore } from '@/stores/loadingStore';
import ServiceCreator from './CreateForm';
import CategoryCreator from '@/components/Category/CategoryFormCreator';
import { useGlobalMessage } from '@/providers/messageProvider';
import { paginationOptions } from '@/data/pagination';
import { Blog } from '@/types/blog';
import { getBlogs } from '../api';
import { Filter } from '@/types/filter';
import BlogCreator from './CreateForm';

const { Title, Text } = Typography;

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [totalPage, setTotalPage] = useState(0);
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const { loading } = useApiLoadingStore();
  const [filter, setFilter] = useState<Filter>({
    query: { page: 1, pageSize: 5 },
    searchTerm: '',
    includeDeleted: false
  });
  const [messageApi] = useGlobalMessage();

  const handleOpenBlog = () => {
    setIsBlogOpen(true);
  }

  const handleCloseBlog = () => {
    setIsBlogOpen(false);
  }

  const onLoad = async () => {
    await getBlogs(filter).then((res: any) => {
      if (res && res.success) {
        setBlogs(res.data.items);
      }
    })
  }

  const handleTableChange = (paginationInfo: any) => {
    setFilter(prev => ({
      ...prev,
      query: {
        pageSize: paginationInfo.showSizeChanger ? paginationInfo.pageSize : filter.query?.page,
        page: paginationInfo.current,
      }
    }));
  };

  const onClear = () => {
    setFilter({
      query: { page: 1, pageSize: 5 },
      searchTerm: '',
      includeDeleted: false
    });
  }

  useEffect(() => {
    onLoad();
  }, [filter]);

  return (
    <Layout curActive='/blog/list'>
      <main>
        <div style={{ marginBottom: '24px' }}>
          <Title level={2} style={{ margin: 0 }}>
            Blog Manager
          </Title>
          <Text type="secondary">
            Manage and monitor blogs
          </Text>
        </div>

        {/* Filter */}
        <AvaForm
          filters={undefined}
          setFilters={() => { }}
          applyFilters={onLoad}
          clearFilters={onClear}
          onReload={onLoad}
          onOpen={handleOpenBlog}
          search={filter.searchTerm ?? ''}
          handleValue={(value) => setFilter(prev => ({ ...prev, searchTerm: value }))}
        />

        {/* Review Table */}
        <Card>
          <Table
            columns={getColumns(() => { }, loading['delete-blog'])}
            dataSource={blogs}
            pagination={{
              pageSize: filter.query?.pageSize,
              total: totalPage,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} blogs`,
              ...paginationOptions
            }}
            scroll={{ x: 1000 }}
            rowKey="id"
            loading={loading['get-blogs']}
            onChange={handleTableChange}
          />
        </Card>
      </main>

      {/* Blog Creator Modal */}
      <BlogCreator
        isOpen={isBlogOpen}
        onClose={handleCloseBlog}
        onReload={onLoad}
      />
    </Layout>
  );
}