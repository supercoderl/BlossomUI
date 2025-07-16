'use client';

import { Card, Table, theme, Typography } from 'antd';
import AvaForm from './AvaForm';
import { getColumns } from './column';
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import { useApiLoadingStore } from '@/stores/loadingStore';
import { getTransactions } from '../../api';
import { paginationOptions } from '@/data/pagination';
const { Title, Text } = Typography;

export default function Service() {
  const [transactions, setTransactions] = useState([]);
  const [pageQuery, setPageQuery] = useState({ page: 1, pageSize: 5 });
  const [totalPage, setTotalPage] = useState(0);
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
        setTotalPage(res.data.count ?? 0);
      }
    })
  }

  const onClear = () => {
    setPageQuery({ page: 1, pageSize: 5 });
    setSearchTerm("");
  }

  const handleTableChange = (paginationInfo: any) => {
    setPageQuery({
      pageSize: paginationInfo.showSizeChanger ? paginationInfo.pageSize : pageQuery.pageSize,
      page: paginationInfo.current,
    });
  };

  useEffect(() => {
    onLoad();
  }, [pageQuery]);

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
          applyFilters={onLoad}
          clearFilters={onClear}
          onReload={onLoad}
          search={searchTerm}
          handleValue={setSearchTerm}
        />

        {/* Review Table */}
        <Card>
          <Table
            columns={getColumns()}
            dataSource={transactions}
            pagination={{
              pageSize: pageQuery.pageSize,
              total: totalPage,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} reviews`,
              ...paginationOptions
            }}
            scroll={{ x: 1000 }}
            rowKey="id"
            loading={loading['get-transactions']}
            onChange={handleTableChange}
          />
        </Card>
      </main>
    </Layout>
  );
}
