'use client';

import { Card, Table, Typography } from 'antd';
import AvaForm from './AvaForm';
import { getColumns } from './column';
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import { useApiLoadingStore } from '@/stores/loadingStore';
import { deleteService, getServices } from '../api';
import ServiceCreator from './CreateForm';
import CategoryCreator from '@/components/Category/CategoryFormCreator';
import { getCategories } from '../category/api';
import { useGlobalMessage } from '@/providers/messageProvider';
import UploadImageForm from './UploadImageForm';
const { Title, Text } = Typography;

export default function Service() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pageQuery, setPageQuery] = useState({ page: 1, pageSize: 5 });
  const [searchTerm, setSearchTerm] = useState('');
  const [totalPage, setTotalPage] = useState(0);
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const { loading } = useApiLoadingStore();
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isUploadImageOpen, setIsUploadImageOpen] = useState('');
  const [messageApi] = useGlobalMessage();

  const handleOpenService = () => {
    setIsServiceOpen(true);
  }

  const handleCloseService = () => {
    setIsServiceOpen(false);
  }

  const handleOpenCategory = () => {
    setIsCategoryOpen(true);
  }

  const handleCloseCategory = () => {
    setIsCategoryOpen(false);
  }

  const onLoad = async () => {
    const [serviceRes, categoryRes] = await Promise.all([
      getServices({
        query: { ...pageQuery },
        searchTerm,
        includeDeleted
      }),
      getCategories({})
    ]);

    const services = serviceRes?.data?.items || [];
    const categoryList = categoryRes?.data?.items || [];

    if (services.length > 0) {
      setServices(services);
      setTotalPage(serviceRes?.data?.count ?? 0);
    }

    setCategories(categoryList.map((cat: any) => ({
      id: cat.id,
      name: cat.name,
    })));
  }

  const onDelete = async (id: string) => {
    await deleteService(id).then(async (res: any) => {
      if (res && res.success) {
        messageApi.success("Service was deleted!");
        await onLoad();
      }
    })
  }

  const handleTableChange = (paginationInfo: any) => {
    setPageQuery({
      ...pageQuery,
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
    <Layout curActive='/service/list'>
      <main>
        <div style={{ marginBottom: '24px' }}>
          <Title level={2} style={{ margin: 0 }}>
            Service Manager
          </Title>
          <Text type="secondary">
            Manage and monitor services
          </Text>
        </div>

        {/* Filter */}
        <AvaForm
          filters={undefined}
          setFilters={() => { }}
          applyFilters={onLoad}
          clearFilters={onClear}
          onReload={onLoad}
          onOpen={handleOpenService}
          search={searchTerm}
          handleValue={setSearchTerm}
        />

        {/* Review Table */}
        <Card>
          <Table
            columns={getColumns(onDelete, loading['delete-service'], setIsUploadImageOpen)}
            dataSource={services}
            pagination={{ pageSize: pageQuery.pageSize, total: totalPage }}
            scroll={{ x: 1000 }}
            rowKey="id"
            loading={loading['get-services'] || loading['get-categories']}
            onChange={handleTableChange}
          />
        </Card>
      </main>

      <ServiceCreator
        isOpen={isServiceOpen}
        onClose={handleCloseService}
        categories={categories}
        onReload={onLoad}
        onOpenCategory={handleOpenCategory}
      />

      <CategoryCreator
        isOpen={isCategoryOpen}
        onClose={handleCloseCategory}
        onReload={onLoad}
      />

      <UploadImageForm
        id={isUploadImageOpen}
        onClose={() => setIsUploadImageOpen('')}
      />
    </Layout>
  );
}
