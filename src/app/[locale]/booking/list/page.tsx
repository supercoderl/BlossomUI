'use client';

import { Card, Table, Typography } from 'antd';
import AvaForm from './AvaForm';
import { getColumns } from './column';
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import { useApiLoadingStore } from '@/stores/loadingStore';
import { getBookings } from '../api';
const { Title, Text } = Typography;

export default function Service() {
  const [bookings, setBookings] = useState([]);
  const { loading } = useApiLoadingStore();

  const onLoad = async () => {
    await getBookings({
      query: { page: 1, pageSize: 5 },
      searchTerm: '',
      includeDeleted: false
    }).then((res) => {
      if (res && res.data && res.data.items.length > 0) {
        setBookings(res.data.items);
      }
    })
  }

  useEffect(() => {
    onLoad();
  }, []);

  console.log(bookings);

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
            pagination={{ pageSize: 5 }}
            scroll={{ x: 1000 }}
            rowKey="id"
            loading={loading['get-bookings']}
          />
        </Card>
      </main>
    </Layout>
  );
}
