'use client';
import { useTranslations } from 'next-intl';
import { Card, Table, Typography } from 'antd';
import AvaForm from './AvaForm';
import { columns, technicianColumns } from './column';
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import { getUsers } from '../api';
import { useApiLoadingStore } from '@/stores/loadingStore';
import { UserRoles } from '@/enums/userRoles';
import { paginationOptions } from '@/data/pagination';

const { Title, Text } = Typography;

export default function User() {
  const t = useTranslations('user');
  const [users, setUsers] = useState([]);
  const [pageQuery, setPageQuery] = useState({ page: 1, pageSize: 5 });
  const [totalPage, setTotalPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const { loading } = useApiLoadingStore();
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

  const onLoad = async () => {
    await getUsers({
      ...pageQuery,
      searchTerm,
      includeDeleted
    }).then((res) => {
      if (res && res.data) {
        setUsers(res.data.items || []);
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
    <Layout curActive='/user'>
      <main>
        <div style={{ marginBottom: '24px' }}>
          <Title level={2} style={{ margin: 0 }}>
            User Manager
          </Title>
          <Text type="secondary">
            Manage and monitor users
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
            columns={columns}
            dataSource={users}
            pagination={{
              pageSize: pageQuery.pageSize,
              total: totalPage,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} reviews`,
              ...paginationOptions
            }}
            expandable={{
              expandedRowRender: (record) => {
                const technicianData = record.technicianInfo
                  ? [{ ...record.technicianInfo, key: 1 }]
                  : [];

                return (
                  <Table
                    columns={technicianColumns}
                    dataSource={technicianData}
                    pagination={false}
                    size="small"
                    style={{ margin: '16px 0' }}
                  />
                );
              },
              rowExpandable: (record) => record.role === UserRoles.Technician,
              showExpandColumn: false,
              expandedRowKeys: expandedRowKeys,
              onExpand: (expanded, record) => {
                const key = record.id;
                if (expanded) {
                  setExpandedRowKeys([...expandedRowKeys, key]);
                } else {
                  setExpandedRowKeys(expandedRowKeys.filter(k => k !== key));
                }
              },
            }}
            scroll={{ x: 1000 }}
            rowKey="id"
            loading={loading['get-users']}
            onRow={(record) => ({
              onClick: () => {
                // Only expand if the row is expandable
                if (record.role === UserRoles.Technician) {
                  const key = record.id;
                  const isExpanded = expandedRowKeys.includes(key);

                  if (isExpanded) {
                    setExpandedRowKeys(expandedRowKeys.filter(k => k !== key));
                  } else {
                    setExpandedRowKeys([...expandedRowKeys, key]);
                  }
                }
              },
              style: {
                cursor: record.role === UserRoles.Technician ? 'pointer' : 'default',
              },
            })}
            onChange={handleTableChange}
          />
        </Card>
      </main>
    </Layout>
  );
}
