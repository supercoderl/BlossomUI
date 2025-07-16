'use client';

import { Card, Table, Typography } from 'antd';
import AvaForm from './AvaForm';
import { getColumns } from './column';
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import { useApiLoadingStore } from '@/stores/loadingStore';
import { useGlobalMessage } from '@/providers/messageProvider';
import { deleteCategory, getCategories } from '../api';
import CategoryCreator from '@/components/Category/CategoryFormCreator';
import { paginationOptions } from '@/data/pagination';
const { Title, Text } = Typography;

export default function Service() {
  const [categories, setCategories] = useState([]);
  const [pageQuery, setPageQuery] = useState({ page: 1, pageSize: 5 });
  const [totalPage, setTotalPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const { loading } = useApiLoadingStore();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [messageApi] = useGlobalMessage();

  const handleOpenCategory = () => {
    setIsCategoryOpen(true);
  }

  const handleCloseCategory = () => {
    setIsCategoryOpen(false);
  }

  const onLoad = async () => {
    await getCategories({
      ...pageQuery,
      searchTerm,
      includeDeleted
    }).then((res) => {
      if (res && res.data && res.data.items.length > 0) {
        setCategories(res.data.items);
        setTotalPage(res.data.count ?? 0);
      }
    })
  }

  const onDelete = async (id: string) => {
    await deleteCategory(id).then(async (res: any) => {
      if (res && res.success) {
        messageApi.success("Category was deleted!");
        await onLoad();
      }
    })
  }

  const handleTableChange = (paginationInfo: any) => {
    setPageQuery({
      pageSize: paginationInfo.showSizeChanger ? paginationInfo.pageSize : pageQuery.pageSize,
      page: paginationInfo.current,
    });
  };

  const onClear = () => {
    setPageQuery({ page: 1, pageSize: 5 });
    setSearchTerm("");
  }

  useEffect(() => {
    onLoad();
  }, [pageQuery]);

  return (
    <Layout curActive='/service/category/list'>
      <main>
        <div style={{ marginBottom: '24px' }}>
          <Title level={2} style={{ margin: 0 }}>
            Category Manager
          </Title>
          <Text type="secondary">
            Manage and monitor categories
          </Text>
        </div>

        {/* Filter */}
        <AvaForm
          filters={undefined}
          setFilters={() => { }}
          applyFilters={onLoad}
          clearFilters={onClear}
          onReload={onLoad}
          onOpen={handleOpenCategory}
          search={searchTerm}
          handleValue={setSearchTerm}
        />

        {/* Review Table */}
        <Card>
          <Table
            columns={getColumns(onDelete, loading['delete-category'])}
            dataSource={categories}
            pagination={{
              pageSize: pageQuery.pageSize,
              total: totalPage,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} reviews`,
              ...paginationOptions
            }}
            scroll={{ x: 1000 }}
            rowKey="id"
            loading={loading['get-categories']}
            onChange={handleTableChange}
          />
        </Card>
      </main>

      <CategoryCreator
        isOpen={isCategoryOpen}
        onClose={handleCloseCategory}
        onReload={onLoad}
      />
    </Layout>
  );
}
