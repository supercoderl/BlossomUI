import { useGlobalMessage } from "@/providers/messageProvider";
import { Button, Modal, Progress, Upload } from "antd";
import {
    PlusOutlined
} from '@ant-design/icons';
import { useApiLoadingStore } from "@/stores/loadingStore";
import { createServiceImage } from "../gallery/api";
import Lottie from "lottie-react";
import { useEffect, useRef, useState } from "react";
import { useSignalRContext } from "@/providers/signalRProvider";

interface UploadProgress {
    fileName: string;
    percent: number;
    index: number;
}

const UploadImageForm = ({ id, onClose }: { id: string, onClose: () => void }) => {
    const [messageApi] = useGlobalMessage();
    const [fileList, setFileList] = useState<any[]>([]);
    const { loading } = useApiLoadingStore();
    const containerRef = useRef<HTMLDivElement>(null);
    const { connection, isConnected } = useSignalRContext();
    
    // Progress tracking states
    const [progressList, setProgressList] = useState<UploadProgress[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadingFileIndex, setUploadingFileIndex] = useState<number | null>(null);

    // Setup SignalR connection for progress updates
    useEffect(() => {
        if (!isConnected || !connection || !id) return;

        const connectSignalR = async () => {
            if (connection.state === "Disconnected") {
                await connection.start();
            }
            await connection.invoke("JoinGroup", `service-${id}`);
        };

        connectSignalR();

        connection.on("joinedGroup", (groupId) => {
            console.log("Joined group:", groupId);
        });

        connection.on("receiveData", (payload) => {
            if (payload.type === "system") {
                const data = payload.data;
                setProgressList(prev => {
                    const updated = [...prev];
                    updated[data.currentFile - 1] = {
                        fileName: data.currentFileName,
                        percent: data.progress,
                        index: data.currentFile
                    };
                    return updated;
                });
            }
        });

        return () => {
            connection.off("joinedGroup");
            connection.off("receiveData");
        };
    }, [id, isConnected, connection]);

    // Focus container for Ctrl+V
    useEffect(() => {
        if (id && containerRef.current) {
            containerRef.current.focus();
        }
    }, [id]);

    // Enhanced API upload function with progress tracking
    const uploadToAPI = async (file: File, index: number) => {
        const formData = new FormData();
        formData.append('imageFile', file);
        formData.append('serviceId', id);
        formData.append('description', `File at ${new Date().toISOString()}`);

        // Set current uploading file
        setUploadingFileIndex(index);

        // Initialize progress for this file
        setProgressList(prev => {
            const updated = [...prev];
            updated[index] = {
                fileName: file.name,
                percent: 0,
                index: index + 1
            };
            return updated;
        });

        try {
            await createServiceImage(formData);
            
            // Mark as completed
            setProgressList(prev => {
                const updated = [...prev];
                updated[index] = {
                    fileName: file.name,
                    percent: 100,
                    index: index + 1
                };
                return updated;
            });
        } catch (error) {
            // Handle error - you might want to show error state
            setProgressList(prev => {
                const updated = [...prev];
                updated[index] = {
                    fileName: file.name,
                    percent: 0,
                    index: index + 1
                };
                return updated;
            });
            throw error;
        }
    };

    // Handle file selection (for preview only)
    const handleFileChange = (info: any) => {
        setFileList(info.fileList);
        // Reset progress when files change
        setProgressList([]);
    };

    // Custom request handler - prevent automatic upload
    const customRequest = ({ onSuccess }: any) => {
        onSuccess();
    };

    // Handle paste functionality
    const handlePaste = (e: React.ClipboardEvent) => {
        const items = e.clipboardData.items;
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.type.indexOf("image") !== -1) {
                const file = item.getAsFile();
                if (file) {
                    useApiLoadingStore.getState().setLoading(`paste-image`, true);

                    const newFile = {
                        uid: Date.now().toString(),
                        name: `pasted-image-${Date.now()}.png`,
                        status: 'done',
                        originFileObj: file,
                        url: URL.createObjectURL(file)
                    };

                    setTimeout(() => {
                        setFileList(prev => [...prev, newFile]);
                        useApiLoadingStore.getState().setLoading(`paste-image`, false);
                    }, 1000);
                }
            }
        }
    };

    // Enhanced upload handler with progress tracking
    const handleUpload = async () => {
        if (fileList.length === 0) {
            messageApi.warning('No files selected for upload!');
            return;
        }

        try {
            setIsUploading(true);
            setProgressList(new Array(fileList.length).fill(null).map((_, index) => ({
                fileName: '',
                percent: 0,
                index: index + 1
            })));

            messageApi.info('Uploading files...');

            // Upload files sequentially to better track progress
            for (let i = 0; i < fileList.length; i++) {
                const file = fileList[i];
                const fileToUpload = file.originFileObj || file;
                if (fileToUpload instanceof File) {
                    await uploadToAPI(fileToUpload, i);
                }
            }

            messageApi.success('All images uploaded successfully!');
            setFileList([]);
            setProgressList([]);
            onClose();
        } catch (error) {
            console.error('Upload error:', error);
            messageApi.error('Failed to upload images!');
        } finally {
            setIsUploading(false);
            setUploadingFileIndex(null);
        }
    };

    // Close handler with cleanup
    const handleClose = () => {
        setFileList([]);
        setProgressList([]);
        setIsUploading(false);
        setUploadingFileIndex(null);
        onClose();
    };

    return (
        <div
            ref={containerRef}
            onPaste={handlePaste}
            tabIndex={0}
            className="outline-none"
        >
            <Modal
                title="Upload Images"
                open={id !== ''}
                onCancel={handleClose}
                footer={null}
                closable={!isUploading}
                maskClosable={!isUploading}
            >
                <div className="space-y-4">
                    <Upload.Dragger
                        name="files"
                        multiple
                        accept="image/*"
                        customRequest={customRequest}
                        onChange={handleFileChange}
                        fileList={fileList}
                        showUploadList={{
                            showPreviewIcon: true,
                            showRemoveIcon: !isUploading,
                            showDownloadIcon: false
                        }}
                        disabled={loading['create-service-image'] || isUploading}
                        listType="picture-card"
                        className="upload-gallery"
                    >
                        {loading['create-service-image'] || loading['paste-image'] || isUploading ? (
                            <Lottie
                                animationData={require("../../../../../public/animations/loading.json")}
                                loop
                                className="w-1/2 h-1/2 mx-auto"
                            />
                        ) : (
                            <>
                                <p className="ant-upload-drag-icon">
                                    <PlusOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                                </p>
                                <p className="ant-upload-text">
                                    Click or drag images to this area to preview
                                </p>
                                <p className="ant-upload-hint">
                                    Support for single or bulk upload. Accepts JPG, PNG, GIF, WebP formats.
                                    You can also paste images directly (Ctrl+V).
                                </p>
                            </>
                        )}
                    </Upload.Dragger>

                    {/* Overall Progress */}
                    {isUploading && (
                        <div className="pt-2 border-t">
                            <div className="text-sm font-medium mb-2">
                                Overall Progress: {uploadingFileIndex !== null ? uploadingFileIndex + 1 : 0} of {fileList.length}
                            </div>
                            <Progress
                                percent={Math.round(((uploadingFileIndex || 0) / fileList.length) * 100)}
                                status="active"
                                strokeColor={{
                                    '0%': '#108ee9',
                                    '100%': '#87d068',
                                }}
                            />
                        </div>
                    )}

                    <div className="flex justify-end mt-3 gap-2">
                        <Button onClick={handleClose} disabled={isUploading}>
                            Cancel
                        </Button>
                        <Button
                            type="primary"
                            onClick={handleUpload}
                            disabled={loading['create-service-image'] || fileList.length === 0 || isUploading}
                            loading={loading['create-service-image'] || isUploading}
                        >
                            Upload ({fileList.length})
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default UploadImageForm;