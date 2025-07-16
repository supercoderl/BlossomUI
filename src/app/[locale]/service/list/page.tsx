'use client';

import { Card, Table, Typography, Progress } from 'antd';
import AvaForm from './AvaForm';
import { getColumns } from './column';
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import { useApiLoadingStore } from '@/stores/loadingStore';
import { deleteService, getServices } from '../api';
import ServiceCreator from './CreateForm';
import CategoryCreator from '@/components/Category/CategoryFormCreator';
import { getCategories } from '../category/api';
import { useGlobalMessage } from '@/providers/messageProvider';
import UploadImageForm from './UploadImageForm';
import { paginationOptions } from '@/data/pagination';
import { useSignalRContext } from '@/providers/signalRProvider';

const { Title, Text } = Typography;

interface ProgressItem {
  fileName: string;
  percent: number;
  index: number;
}

export default function Service() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pageQuery, setPageQuery] = useState({ page: 1, pageSize: 5 });
  const [searchTerm, setSearchTerm] = useState('');
  const [totalPage, setTotalPage] = useState(0);
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const { loading } = useApiLoadingStore();
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isUploadImageOpen, setIsUploadImageOpen] = useState('');
  const [messageApi] = useGlobalMessage();
  const { connection, isConnected } = useSignalRContext();
  const [progressList, setProgressList] = useState<ProgressItem[]>([]);
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
  const [currentUploadService, setCurrentUploadService] = useState<string>('');
  const [uploadStatus, setUploadStatus] = useState<'uploading' | 'completed' | 'idle'>('idle');

  const handleOpenService = () => {
    setIsServiceOpen(true);
  }

  const handleCloseService = () => {
    setIsServiceOpen(false);
  }

  const handleOpenCategory = () => {
    setIsCategoryOpen(true);
  }

  const handleCloseCategory = () => {
    setIsCategoryOpen(false);
  }

  const handleOpenUploadImage = (serviceId: string) => {
    setIsUploadImageOpen(serviceId);
    setCurrentUploadService(serviceId);
    setProgressList([]);
    setUploadStatus('idle');
  }

  const handleCloseUploadImage = () => {
    setIsUploadImageOpen('');
    setCurrentUploadService('');
    setProgressList([]);
    setUploadStatus('idle');
    setIsProgressModalOpen(false);
  }

  const onLoad = async () => {
    const [serviceRes, categoryRes] = await Promise.all([
      getServices({
        query: { ...pageQuery },
        searchTerm,
        includeDeleted
      }),
      getCategories({})
    ]);

    const services = serviceRes?.data?.items || [];
    const categoryList = categoryRes?.data?.items || [];

    if (services.length > 0) {
      setServices(services);
      setTotalPage(serviceRes?.data?.count ?? 0);
    }

    setCategories(categoryList.map((cat: any) => ({
      id: cat.id,
      name: cat.name,
    })));
  }

  const onDelete = async (id: string) => {
    await deleteService(id).then(async (res: any) => {
      if (res && res.success) {
        messageApi.success("Service was deleted!");
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

  const onClear = () => {
    setPageQuery({ page: 1, pageSize: 5 });
    setSearchTerm("");
  }

  // Calculate overall progress
  const calculateOverallProgress = () => {
    if (progressList.length === 0) return 0;
    const totalProgress = progressList.reduce((sum, item) => sum + item.percent, 0);
    return Math.round(totalProgress / progressList.length);
  };

  // Get completed files count
  const getCompletedFilesCount = () => {
    return progressList.filter(item => item.percent === 100).length;
  };

  useEffect(() => {
    onLoad();
  }, [pageQuery]);

  useEffect(() => {
    if (!isConnected || !connection) return;

    if (isUploadImageOpen) {
      const connectSignalR = async () => {
        try {
          if (connection.state === "Disconnected") {
            await connection.start();
          }

          await connection.invoke("JoinGroup", `service-${isUploadImageOpen}`);
          console.log(`Joined group: service-${isUploadImageOpen}`);
        } catch (error) {
          console.error("SignalR connection error:", error);
        }
      };

      connectSignalR();

      connection.on("joinedGroup", (groupId) => {
        console.log("Joined group:", groupId);
        setUploadStatus('uploading');
      });

      connection.on("receiveData", (payload) => {
        if (payload.type === "system") {
          const data = payload.data;
          
          // Show progress modal when upload starts
          if (!isProgressModalOpen) {
            setIsProgressModalOpen(true);
          }

          setProgressList(prev => {
            const updated = [...prev];
            
            // Ensure array is large enough
            while (updated.length < data.currentFile) {
              updated.push({
                fileName: '',
                percent: 0,
                index: updated.length + 1
              });
            }

            updated[data.currentFile - 1] = {
              fileName: data.currentFileName,
              percent: data.progress,
              index: data.currentFile
            };

            return updated;
          });

          // Check if upload is completed
          if (data.progress === 100) {
            setTimeout(() => {
              setUploadStatus('completed');
            }, 500);
          }
        }
      });

      connection.on("uploadCompleted", () => {
        setUploadStatus('completed');
        messageApi.success("All images uploaded successfully!");
        
        // Auto close progress modal after 3 seconds
        setTimeout(() => {
          setIsProgressModalOpen(false);
          handleCloseUploadImage();
          onLoad(); // Refresh the services list
        }, 3000);
      });

      connection.on("uploadError", (error) => {
        messageApi.error(`Upload failed: ${error.message}`);
        setUploadStatus('idle');
      });

      // cleanup
      return () => {
        connection.off("joinedGroup");
        connection.off("receiveData");
        connection.off("uploadCompleted");
        connection.off("uploadError");
      };
    }
  }, [isUploadImageOpen, isConnected, connection, isProgressModalOpen]);

  return (
    <Layout curActive='/service/list'>
      <main>
        <div style={{ marginBottom: '24px' }}>
          <Title level={2} style={{ margin: 0 }}>
            Service Manager
          </Title>
          <Text type="secondary">
            Manage and monitor services
          </Text>
        </div>

        {/* Filter */}
        <AvaForm
          filters={undefined}
          setFilters={() => { }}
          applyFilters={onLoad}
          clearFilters={onClear}
          onReload={onLoad}
          onOpen={handleOpenService}
          search={searchTerm}
          handleValue={setSearchTerm}
        />

        {/* Review Table */}
        <Card>
          <Table
            columns={getColumns(onDelete, loading['delete-service'], handleOpenUploadImage)}
            dataSource={services}
            pagination={{
              pageSize: pageQuery.pageSize,
              total: totalPage,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} services`,
              ...paginationOptions
            }}
            scroll={{ x: 1000 }}
            rowKey="id"
            loading={loading['get-services'] || loading['get-categories']}
            onChange={handleTableChange}
          />
        </Card>

        {/* Progress Notification Card */}
        {uploadStatus === 'uploading' && progressList.length > 0 && (
          <Card 
            size="small" 
            style={{ 
              position: 'fixed', 
              bottom: 20, 
              right: 20, 
              width: 300,
              zIndex: 1000,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <Text strong>Uploading Images</Text>
              <Text type="secondary">
                {getCompletedFilesCount()}/{progressList.length}
              </Text>
            </div>
            <Progress
              percent={calculateOverallProgress()}
              status="active"
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
              size="small"
            />
            <Text type="secondary" style={{ fontSize: '12px' }}>
              Service: {currentUploadService}
            </Text>
          </Card>
        )}
      </main>

      {/* Service Creator Modal */}
      <ServiceCreator
        isOpen={isServiceOpen}
        onClose={handleCloseService}
        categories={categories}
        onReload={onLoad}
        onOpenCategory={handleOpenCategory}
      />

      {/* Category Creator Modal */}
      <CategoryCreator
        isOpen={isCategoryOpen}
        onClose={handleCloseCategory}
        onReload={onLoad}
      />

      {/* Upload Image Form */}
      <UploadImageForm
        id={isUploadImageOpen}
        onClose={handleCloseUploadImage}
      />
    </Layout>
  );
}