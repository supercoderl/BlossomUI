'use client';

import { Card, Table, Typography } from 'antd';
import AvaForm from './AvaForm';
import { columns, technicianColumns } from './column';
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import { getUsers } from '../api';
import { useApiLoadingStore } from '@/stores/loadingStore';
import { UserRoles } from '@/enums/userRoles';

const { Title, Text } = Typography;

export default function User() {
  const [users, setUsers] = useState([]);
  const { loading } = useApiLoadingStore();
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

  const onLoad = async () => {
    await getUsers({
      query: { page: 1, pageSize: 5 },
      searchTerm: '',
      includeDeleted: false
    }).then((res) => {
      if (res && res.data) {
        setUsers(res.data.items || []);
      }
    });
  }

  useEffect(() => {
    onLoad();
  }, []);

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
          applyFilters={() => { }}
          clearFilters={() => { }}
        />

        {/* Review Table */}
        <Card>
          <Table
            columns={columns}
            dataSource={users}
            pagination={{ pageSize: 5 }}
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
          />
        </Card>
      </main>
    </Layout>
  );
}
