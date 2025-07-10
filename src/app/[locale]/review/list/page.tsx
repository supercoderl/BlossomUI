'use client'

import React, { useState, useEffect } from 'react';
import {
  Table,
  Card,
  Rate,
  Button,
  Modal,
  Divider,
  Typography,
  message,
  Row,
  Col
} from 'antd';

import { getColumn } from './column';
import { getReviews } from '../api';
import { useApiLoadingStore } from '@/stores/loadingStore';
import Layout from '@/components/Layout';
import AvaForm from './AvaForm';

const { Title, Text, Paragraph } = Typography;

const CustomerReviewManager = () => {
  const [reviews, setReviews] = useState([]);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [pageQuery, setPageQuery] = useState({ page: 1, pageSize: 5 });
  const [totalPage, setTotalPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const { loading } = useApiLoadingStore();
  const [filters, setFilters] = useState<{
    rating: number | null,
    product: string | null
  }>({
    rating: null,
    product: null
  });

  const onLoad = async () => {
    await getReviews({
      ...pageQuery,
      searchTerm,
      includeDeleted: false
    }).then((res) => {
      if (res && res.data && res.data.items.length > 0) {
        setReviews(res.data.items);
        setTotalPage(res.data.count ?? 0);
      }
    })
  }

  useEffect(() => {
    onLoad();
  }, [pageQuery]);

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return '#52c41a';
    if (rating >= 3) return '#faad14';
    return '#ff4d4f';
  };

  const handleView = (record: any) => {
    setSelectedReview(record);
    setViewModalVisible(true);
  };

  const handleEdit = (record: any) => {
    setSelectedReview(record);
    setEditModalVisible(true);
  };

  const handleDelete = (id: any) => {
    message.success('Review deleted successfully');
  };

  const handleTableChange = (paginationInfo: any) => {
    setPageQuery({
      ...pageQuery,
      page: paginationInfo.current,
    });
  };

  const clearFilters = () => {
    setFilters({ rating: null, product: null });
    setPageQuery({ page: 1, pageSize: 5 });
    setSearchTerm("");
  };

  // const avgRating = reviews.length > 0
  //   ? (reviews.reduce((sum, r) => sum, 0) / reviews.length).toFixed(1)
  //   : 0;

  return (
    <Layout curActive='/review/list'>
      <main>
        <div style={{ marginBottom: '24px' }}>
          <Title level={2} style={{ margin: 0 }}>
            Customer Review Manager
          </Title>
          <Text type="secondary">
            Manage and monitor customer reviews across all products
          </Text>
        </div>

        {/* Filter */}
        <AvaForm
          filters={filters}
          setFilters={setFilters}
          applyFilters={onLoad}
          clearFilters={clearFilters}
          onReload={onLoad}
        />

        {/* Reviews Table */}
        <Card>
          <Table
            columns={getColumn(getRatingColor, handleView, handleEdit, handleDelete)}
            dataSource={reviews}
            loading={loading['get-reviews']}
            rowKey="id"
            pagination={{
              pageSize: 5,
              showSizeChanger: true,
              showQuickJumper: true,
              total: totalPage,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} reviews`,
            }}
            scroll={{ x: 800 }}
            onChange={handleTableChange}
          />
        </Card>

        {/* View Modal */}
        <Modal
          title="Review Details"
          open={viewModalVisible}
          onCancel={() => setViewModalVisible(false)}
          width={600}
          footer={[
            <Button key="close" onClick={() => setViewModalVisible(false)}>
              Close
            </Button>
          ]}
        >
          {selectedReview && (
            <div>
              <Row gutter={16}>
                <Col span={12}>
                  <Text strong>Customer:</Text>
                  <div style={{ marginBottom: 12 }}>
                    <div>{selectedReview.customerName}</div>
                    <Text type="secondary">{selectedReview.customerEmail}</Text>
                  </div>
                </Col>
                <Col span={12}>
                  <Text strong>Product:</Text>
                  <div style={{ marginBottom: 12 }}>
                    <div>{selectedReview.productName}</div>
                    <Text type="secondary">{selectedReview.productId}</Text>
                  </div>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Text strong>Rating:</Text>
                  <div style={{ marginBottom: 12 }}>
                    <Rate disabled value={selectedReview.rating} />
                    <Text style={{ marginLeft: 8 }}>
                      {selectedReview.rating}/5
                    </Text>
                  </div>
                </Col>
              </Row>

              <Divider />

              <div style={{ marginBottom: 12 }}>
                <Text strong>Title:</Text>
                <div style={{ marginTop: 4 }}>
                  <Text style={{ fontSize: 16 }}>{selectedReview.title}</Text>
                </div>
              </div>

              <div style={{ marginBottom: 12 }}>
                <Text strong>Comment:</Text>
                <Paragraph style={{ marginTop: 4, background: '#fafafa', padding: 12, borderRadius: 4 }}>
                  {selectedReview.comment}
                </Paragraph>
              </div>

              <Row gutter={16}>
                <Col span={12}>
                  <Text strong>Date:</Text>
                  <div>{selectedReview.createdAt}</div>
                </Col>
                <Col span={12}>
                  <Text strong>Helpful votes:</Text>
                  <div>{selectedReview.helpful}</div>
                </Col>
              </Row>

              {selectedReview.reported > 0 && (
                <div style={{ marginTop: 12, padding: 8, background: '#fff2f0', borderRadius: 4 }}>
                  <Text type="danger">
                    This review has been reported {selectedReview.reported} time(s)
                  </Text>
                </div>
              )}
            </div>
          )}
        </Modal>

        {/* Edit Modal */}
        <Modal
          title="Update Review Status"
          open={editModalVisible}
          onCancel={() => setEditModalVisible(false)}
          footer={null}
          width={400}
        >
          {selectedReview && (
            <div>
              <div style={{ marginBottom: 16 }}>
                <Text strong>Review by {selectedReview.customerName}</Text>
                <div style={{ marginTop: 4 }}>
                  <Rate disabled value={selectedReview.rating} />
                  <Text style={{ marginLeft: 8 }}>{selectedReview.title}</Text>
                </div>
              </div>

              <Divider />

              <div style={{ marginBottom: 16 }}>
                <Text strong>Change Status:</Text>
                <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <Button
                    type={selectedReview.status === 'published' ? 'primary' : 'default'}
                    onClick={() => {
                      setEditModalVisible(false);
                    }}
                  >
                    Publish
                  </Button>
                  <Button
                    type={selectedReview.status === 'pending' ? 'primary' : 'default'}
                    onClick={() => {
                      setEditModalVisible(false);
                    }}
                  >
                    Pending
                  </Button>
                  <Button
                    danger
                    type={selectedReview.status === 'flagged' ? 'primary' : 'default'}
                    onClick={() => {
                      setEditModalVisible(false);
                    }}
                  >
                    Flag
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </main>
    </Layout>
  );
};

export default CustomerReviewManager;