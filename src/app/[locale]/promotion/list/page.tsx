'use client';

import { Card, Table, Typography, } from 'antd';
import AvaForm from './AvaForm';
import { getColumns } from './column';
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import { useApiLoadingStore } from '@/stores/loadingStore';
import { useGlobalMessage } from '@/providers/messageProvider';
import { deletePromotion, getPromotions } from '../api';
import DiscountCreator from './CreateForm';
import { paginationOptions } from '@/data/pagination';

const { Title, Text } = Typography;

export default function Promotion() {
  const [promotions, setPromotions] = useState([]);
  const [pageQuery, setPageQuery] = useState({ page: 1, pageSize: 5 });
  const [totalPage, setTotalPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const { loading } = useApiLoadingStore();
  const [isPromotionOpen, setIsPromotionOpen] = useState(false);
  const [messageApi] = useGlobalMessage();

  const handleOpenPromotion = () => {
    setIsPromotionOpen(true);
  }

  const handleClosePromotion = () => {
    setIsPromotionOpen(false);
  }

  const onLoad = async () => {
    await getPromotions({
      query: { ...pageQuery },
      searchTerm,
      includeDeleted
    }).then((res) => {
      if (res && res.data && res.data.items.length > 0) {
        setPromotions(res.data.items);
        setTotalPage(res.data.count ?? 0);
      }
    })
  }

  const onDelete = async (id: string) => {
    await deletePromotion(id).then(async (res: any) => {
      if (res && res.success) {
        messageApi.success("Promotion was deleted!");
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

  const onClose = () => {
    setPageQuery({ page: 1, pageSize: 5 });
    setSearchTerm("");
  }

  useEffect(() => {
    onLoad();
  }, [pageQuery]);

  return (
    <Layout curActive='/promotion'>
      <main>
        <div style={{ marginBottom: '24px' }}>
          <Title level={2} style={{ margin: 0 }}>
            Promotion Manager
          </Title>
          <Text type="secondary">
            Manage and monitor promotions across all products
          </Text>
        </div>

        {/* Filter */}
        <AvaForm
          onReload={onLoad}
          onOpen={handleOpenPromotion}
          filters={undefined}
          setFilters={() => { }}
          applyFilters={onLoad}
          clearFilters={onClose}
          search={searchTerm}
          handleValue={setSearchTerm}
        />

        {/* Review Tables */}
        <Card>
          <Table
            columns={getColumns(onDelete, loading['delete-promotion'])}
            dataSource={promotions}
            pagination={{
              pageSize: pageQuery.pageSize,
              total: totalPage,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} reviews`,
              ...paginationOptions
            }}
            scroll={{ x: 1000 }}
            rowKey="id"
            loading={loading['get-promotions']}
            onChange={handleTableChange}
          />
        </Card>
      </main>

      <DiscountCreator
        isOpen={isPromotionOpen}
        onClose={handleClosePromotion}
        onReload={onLoad}
      />
    </Layout>
  );
}
