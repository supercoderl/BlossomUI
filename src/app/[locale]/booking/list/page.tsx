'use client';

import { Card, Table, Typography } from 'antd';
import AvaForm from './AvaForm';
import { getColumns } from './column';
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import { useApiLoadingStore } from '@/stores/loadingStore';
import { useGlobalMessage } from '@/providers/messageProvider';
import { getBookings, updateBookingStatus } from '../api';
import { paginationOptions } from '@/data/pagination';
import { Booking } from '@/types/booking';
import { BookingStatus } from '@/enums/bookingStatus';
const { Title, Text } = Typography;

export default function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [pageQuery, setPageQuery] = useState({ page: 1, pageSize: 5 });
  const [totalPage, setTotalPage] = useState(0);
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

  const onChangeStatus = async (bookingId: string, status: BookingStatus) => {
    const data = {
      id: bookingId,
      status
    };

    messageApi.info('Updating...');

    await updateBookingStatus(data).then(async (res: any) => {
      if (res && res.success) {
        messageApi.success("Booking was updated!");
        await onLoad();
      }
    })
  }

  useEffect(() => {
    onLoad();
  }, [pageQuery]);

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
          applyFilters={onLoad}
          clearFilters={onClear}
          onReload={onLoad}
        />

        {/* Review Table */}
        <Card>
          <Table
            columns={getColumns(onChangeStatus, loading)}
            dataSource={bookings}
            pagination={{
              pageSize: pageQuery.pageSize,
              total: totalPage,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} reviews`,
              ...paginationOptions
            }}
            scroll={{ x: 1000 }}
            rowKey="id"
            loading={loading['get-bookings']}
            onChange={handleTableChange}
          />
        </Card>
      </main>
    </Layout>
  );
}
