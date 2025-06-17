'use client';

import { Card, Table, theme, Typography } from 'antd';
import AvaForm from './AvaForm';
import { getColumns } from './column';
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import { useApiLoadingStore } from '@/stores/loadingStore';
import { getTransactions } from '../../api';
const { Title, Text } = Typography;

export default function Service() {
  const [transactions, setTransactions] = useState([]);
  const [pageQuery, setPageQuery] = useState({ page: 1, pageSize: 5 });
  const [searchTerm, setSearchTerm] = useState('');
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const { loading } = useApiLoadingStore();

  const onLoad = async () => {
    await getTransactions({
      query: { ...pageQuery },
      searchTerm,
      includeDeleted
    }).then((res) => {
      if (res && res.data && res.data.items.length > 0) {
        setTransactions(res.data.items);
      }
    })
  }

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <Layout curActive='/booking/transaction/list'>
      <main>
        <div style={{ marginBottom: '24px' }}>
          <Title level={2} style={{ margin: 0 }}>
            Transactions
          </Title>
          <Text type="secondary">
            Manage and monitor transactions
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
            dataSource={transactions}
            pagination={{ pageSize: pageQuery.pageSize }}
            scroll={{ x: 1000 }}
            rowKey="id"
            loading={loading['get-transactions']}
          />
        </Card>
      </main>
    </Layout>
  );
}
