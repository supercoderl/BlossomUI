'use client';

import { Card, Table, theme, Typography } from 'antd';
import AvaForm from './AvaForm';
import { getColumns } from './column';
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import { useApiLoadingStore } from '@/stores/loadingStore';
import { useGlobalMessage } from '@/providers/messageProvider';
import { getBookings } from '../api';
const { Title, Text } = Typography;

export default function Service() {
  const { token } = theme.useToken();
  const [bookings, setBookings] = useState([]);
  const [pageQuery, setPageQuery] = useState({ page: 1, pageSize: 5 });
  const [searchTerm, setSearchTerm] = useState('');
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const { loading } = useApiLoadingStore();
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [messageApi] = useGlobalMessage();

  const onLoad = async () => {
    await getBookings({
      query: { ...pageQuery },
      searchTerm,
      includeDeleted
    }).then((res) => {
      if (res && res.data && res.data.items.length > 0) {
        setBookings(res.data.items);
      }
    })
  }

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <Layout curActive='/booking/list'>
      <main>
        <div style={{ marginBottom: '24px' }}>
          <Title level={2} style={{ margin: 0 }}>
            Bookings
          </Title>
          <Text type="secondary">
            Manage and monitor bookings
          </Text>
        </div>

        {/* Filter */}
        <AvaForm
          filters={undefined}
          setFilters={() => { }}
          applyFilters={() => { }}
          clearFilters={() => { }}
          onReload={onLoad}
        />

        {/* Review Table */}
        <Card>
          <Table
            columns={getColumns()}
            dataSource={bookings}
            pagination={{ pageSize: pageQuery.pageSize }}
            scroll={{ x: 1000 }}
            rowKey="id"
            loading={loading['get-bookings']}
          />
        </Card>
      </main>
    </Layout>
  );
}
