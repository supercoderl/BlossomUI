'use client';
import { useTranslations } from 'next-intl';
import { Card, Table, Typography } from 'antd';
import AvaForm from './AvaForm';
import { columnsWithRowStyling } from './column';
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import { useApiLoadingStore } from '@/stores/loadingStore';
import { paginationOptions } from '@/data/pagination';
import { getContacts } from '../api';

const { Title, Text } = Typography;

export default function Contact() {
  const [contacts, setContacts] = useState([]);
  const [pageQuery, setPageQuery] = useState({ page: 1, pageSize: 5 });
  const [totalPage, setTotalPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const { loading } = useApiLoadingStore();

  const onLoad = async () => {
    await getContacts({
      ...pageQuery,
      searchTerm,
      includeDeleted
    }).then((res) => {
      if (res && res.data) {
        setContacts(res.data.items || []);
        setTotalPage(res.data.count ?? 0);
      }
    });
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
    <Layout curActive='/contact/list'>
      <main>
        <div style={{ marginBottom: '24px' }}>
          <Title level={2} style={{ margin: 0 }}>
            Contact
          </Title>
          <Text type="secondary">
            Manage and monitor contacts
          </Text>
        </div>

        {/* Filter */}
        <AvaForm
          onReload={onLoad}
          filters={undefined}
          setFilters={() => { }}
          applyFilters={onLoad}
          clearFilters={onClear}
          search={searchTerm}
          handleValue={setSearchTerm}
        />

        {/* Review Table */}
        <Card>
          <Table
            columns={columnsWithRowStyling}
            dataSource={contacts}
            pagination={{
              pageSize: pageQuery.pageSize,
              total: totalPage,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} contacts`,
              ...paginationOptions
            }}
            scroll={{ x: 1000 }}
            rowKey="id"
            loading={loading['get-contacts']}
            onChange={handleTableChange}
          />
        </Card>
      </main>
    </Layout>
  );
}
